import React, { useState, useEffect, useMemo } from 'react';
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import satisfactionAPI from '../services/satisfactionAPI';
import authService from '../services/authService';
import "../styles/animated-bg.css";

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function SatisfactionStats() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('current_month');
  const [surveyData, setSurveyData] = useState([]);

  const questions = [
    { id: 'communication', label: 'Communication' },
    { id: 'attentes', label: 'Prise en compte attentes' },
    { id: 'massage', label: 'Massage' },
    { id: 'intimite', label: 'Respect intimité' },
    { id: 'domicile', label: 'Massage à domicile' },
    { id: 'satisfaction', label: 'Satisfaction globale' }
  ];

  // Générer les options de filtre avec les noms de mois
  const filterOptions = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthNames = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    
    const options = [];
    
    // Mois actuel
    options.push({
      value: 'current_month',
      label: `${monthNames[currentMonth]} ${currentYear}`
    });
    
    // 11 mois précédents
    for (let i = 1; i <= 11; i++) {
      const targetDate = new Date(currentYear, currentMonth - i, 1);
      const targetMonth = targetDate.getMonth();
      const targetYear = targetDate.getFullYear();
      
      options.push({
        value: `last_${i}_months`,
        label: `${monthNames[targetMonth]} ${targetYear}`
      });
    }
    
    // Options cumulatives
    options.push(
      { value: 'cumulative_3', label: 'Cumulé 3 derniers mois' },
      { value: 'cumulative_6', label: 'Cumulé 6 derniers mois' },
      { value: 'cumulative_12', label: 'Cumulé 12 derniers mois' }
    );
    
    return options;
  }, []);

  useEffect(() => {
    // Charger les données d'enquête depuis l'API si authentifié
    if (isAuthenticated) {
      loadSurveyData();
    }
  }, [isAuthenticated]);

  // Scroll vers le haut lors du montage du composant
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Écouter les changements d'authentification
  useEffect(() => {
    const cleanup = authService.onAuthChange((authenticated) => {
      setIsAuthenticated(authenticated);
      if (!authenticated) {
        setSurveyData([]);
      }
    });
    
    return cleanup;
  }, []);

  const loadSurveyData = async () => {
    try {
      const data = await satisfactionAPI.getResponses(authService.correctPassword);
      setSurveyData(data);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      setSurveyData([]);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (authService.authenticate(password)) {
      setIsAuthenticated(true);
      setAuthError('');
      setPassword('');
      // Charger les données après authentification
      await loadSurveyData();
    } else {
      setAuthError('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setSurveyData([]);
    setPassword('');
    setAuthError('');
  };

  // Fonction pour filtrer les données selon la période sélectionnée
  const getFilteredData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return surveyData.filter(response => {
      // Utiliser la date du massage si disponible, sinon la date de réponse
      const dateToUse = response.massageDate ? new Date(response.massageDate) : new Date(response.timestamp);
      const responseMonth = dateToUse.getMonth();
      const responseYear = dateToUse.getFullYear();
      
      switch (selectedFilter) {
        case 'current_month':
          return responseMonth === currentMonth && responseYear === currentYear;
        
        case 'cumulative_3':
          const threeMonthsAgo = new Date(currentYear, currentMonth - 3, 1);
          return dateToUse >= threeMonthsAgo;
        
        case 'cumulative_6':
          const sixMonthsAgo = new Date(currentYear, currentMonth - 6, 1);
          return dateToUse >= sixMonthsAgo;
        
        case 'cumulative_12':
          const twelveMonthsAgo = new Date(currentYear, currentMonth - 12, 1);
          return dateToUse >= twelveMonthsAgo;
        
        default:
          if (selectedFilter.startsWith('last_') && selectedFilter.endsWith('_months')) {
            const monthsBack = parseInt(selectedFilter.split('_')[1]);
            const targetDate = new Date(currentYear, currentMonth - monthsBack, 1);
            const targetMonth = targetDate.getMonth();
            const targetYear = targetDate.getFullYear();
            return responseMonth === targetMonth && responseYear === targetYear;
          }
          return true;
      }
    });
  }, [surveyData, selectedFilter]);

  // Calculer les moyennes
  const averages = useMemo(() => {
    if (getFilteredData.length === 0) return {};
    
    const totals = {};
    questions.forEach(q => {
      totals[q.id] = getFilteredData.reduce((sum, response) => 
        sum + response.responses[q.id], 0
      ) / getFilteredData.length;
    });
    
    return totals;
  }, [getFilteredData, questions]);

  // Préparer les données pour les graphiques
  const chartData = useMemo(() => {
    if (selectedFilter.startsWith('cumulative_')) {
      // Pour les vues cumulatives, créer des courbes d'évolution
      const months = parseInt(selectedFilter.split('_')[1]);
      const monthlyData = {};
      
      // Grouper par mois
      getFilteredData.forEach(response => {
        // Utiliser la date de massage si disponible, sinon la date de réponse
        const dateToUse = response.massageDate ? new Date(response.massageDate) : new Date(response.timestamp);
        const monthKey = `${dateToUse.getFullYear()}-${String(dateToUse.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = [];
        }
        monthlyData[monthKey].push(response);
      });
      
      // Calculer les moyennes mensuelles
      const sortedMonths = Object.keys(monthlyData).sort();
      const datasets = questions.map((question, index) => ({
        label: question.label,
        data: sortedMonths.map(month => {
          const monthResponses = monthlyData[month];
          return monthResponses.reduce((sum, r) => sum + r.responses[question.id], 0) / monthResponses.length;
        }),
        borderColor: `hsl(${index * 60}, 70%, 50%)`,
        backgroundColor: `hsl(${index * 60}, 70%, 50%, 0.1)`,
        tension: 0.4
      }));
      
      return {
        labels: sortedMonths.map(month => {
          const [year, monthNum] = month.split('-');
          return new Date(year, monthNum - 1).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
        }),
        datasets
      };
    } else {
      // Pour les vues mensuelles, créer des histogrammes
      const histogramData = {};
      questions.forEach(q => {
        histogramData[q.id] = [0, 0, 0, 0, 0]; // Pour les notes 1-5
      });
      
      getFilteredData.forEach(response => {
        questions.forEach(q => {
          const rating = response.responses[q.id];
          if (rating >= 1 && rating <= 5) {
            histogramData[q.id][rating - 1]++;
          }
        });
      });
      
      return {
        labels: ['1', '2', '3', '4', '5'],
        datasets: questions.map((question, index) => ({
          label: question.label,
          data: histogramData[question.id],
          backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
          borderColor: `hsl(${index * 60}, 70%, 50%)`,
          borderWidth: 1
        }))
      };
    }
  }, [getFilteredData, selectedFilter, questions]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: selectedFilter.startsWith('cumulative_') 
          ? 'Évolution des moyennes par mois'
          : 'Distribution des notes'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative overflow-hidden min-h-screen">
        <main className="relaxing-background min-h-screen flex items-center justify-center px-4">
          <div className="color-layer-1 pointer-events-none"></div>
          <div className="color-layer-2 pointer-events-none"></div>

          <motion.div
            className="bg-zen-cream/95 rounded-2xl shadow-zen p-8 max-w-md w-full relative z-10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-sans font-bold mb-6 text-zen-forest text-center">
              🔒 Accès Statistiques
            </h1>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-4 py-3 rounded-lg border border-zen-gray-light bg-white/90 font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
                required
              />
              
              {authError && (
                <div className="text-red-600 text-sm text-center">
                  {authError}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full font-sans font-medium px-8 py-3 rounded-full bg-zen-sage text-white hover:bg-zen-forest hover:shadow-zen transition-all duration-300"
              >
                Accéder
              </button>
            </form>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relaxing-background min-h-screen px-4 py-8">
        <div className="color-layer-1 pointer-events-none"></div>
        <div className="color-layer-2 pointer-events-none"></div>

        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-zen-cream/95 rounded-2xl shadow-zen p-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
              <h1 className="text-3xl sm:text-4xl font-sans font-bold text-zen-forest">
                📊 Statistiques de Satisfaction
              </h1>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => window.location.href = '/satisfaction/manage'}
                  className="px-4 py-2 text-sm bg-zen-sage text-white rounded-lg hover:bg-zen-forest transition-colors w-full sm:w-auto"
                >
                  🛠️ Gérer les réponses
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-zen-gray-light text-zen-gray-dark rounded-lg hover:bg-zen-gray-dark hover:text-white transition-colors w-full sm:w-auto"
                >
                  Déconnexion
                </button>
              </div>
            </div>

            {/* Sélecteur de période */}
            <div className="mb-8">
              <label className="block text-zen-forest font-sans font-semibold mb-3">
                Période d'analyse :
              </label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-zen-gray-light bg-white font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Résumé des données */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/80 rounded-xl p-4 shadow-md">
                <h3 className="font-sans font-semibold text-zen-forest mb-2">Nombre de réponses</h3>
                <p className="text-2xl font-bold text-zen-sage">{getFilteredData.length}</p>
              </div>
              
              <div className="bg-white/80 rounded-xl p-4 shadow-md">
                <h3 className="font-sans font-semibold text-zen-forest mb-2">Satisfaction moyenne</h3>
                <p className="text-2xl font-bold text-zen-sage">
                  {averages.satisfaction ? averages.satisfaction.toFixed(1) : 'N/A'}/5
                </p>
              </div>
              
              <div className="bg-white/80 rounded-xl p-4 shadow-md">
                <h3 className="font-sans font-semibold text-zen-forest mb-2">Note globale</h3>
                <p className="text-2xl font-bold text-zen-sage">
                  {Object.keys(averages).length > 0 
                    ? (Object.values(averages).reduce((a, b) => a + b, 0) / Object.keys(averages).length).toFixed(1)
                    : 'N/A'
                  }/5
                </p>
              </div>
            </div>

            {/* Moyennes par question */}
            <div className="bg-white/80 rounded-xl p-6 shadow-md mb-8">
              <h2 className="text-2xl font-sans font-bold text-zen-forest mb-4">Moyennes par question</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {questions.map(question => (
                  <div key={question.id} className="text-center">
                    <h3 className="font-sans font-semibold text-zen-gray-dark mb-2 text-sm">
                      {question.label}
                    </h3>
                    <div className="text-3xl font-bold text-zen-sage">
                      {averages[question.id] ? averages[question.id].toFixed(1) : 'N/A'}
                    </div>
                    <div className="text-sm text-zen-gray-dark">/5</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Graphiques */}
            {getFilteredData.length > 0 && (
              <div className="space-y-6">
                {selectedFilter.startsWith('cumulative_') ? (
                  <div className="bg-white/80 rounded-xl p-6 shadow-md">
                    <div className="h-96">
                      <Line data={chartData} options={chartOptions} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {questions.map((question, index) => {
                      const questionData = {
                        labels: ['1', '2', '3', '4', '5'],
                        datasets: [{
                          label: 'Nombre de réponses',
                          data: (() => {
                            const counts = [0, 0, 0, 0, 0];
                            getFilteredData.forEach(response => {
                              const rating = response.responses[question.id];
                              if (rating >= 1 && rating <= 5) {
                                counts[rating - 1]++;
                              }
                            });
                            return counts;
                          })(),
                          backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
                          borderColor: `hsl(${index * 60}, 70%, 50%)`,
                          borderWidth: 1
                        }]
                      };
                      
                      const questionOptions = {
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false
                          },
                          title: {
                            display: true,
                            text: question.label,
                            font: {
                              size: 14,
                              weight: 'bold'
                            }
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              stepSize: 1
                            }
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Note'
                            }
                          }
                        }
                      };
                      
                      return (
                        <div key={question.id} className="bg-white/80 rounded-xl p-4 shadow-md">
                          <div className="h-64">
                            <Bar data={questionData} options={questionOptions} />
                          </div>
                          <div className="mt-2 text-center text-sm text-zen-gray-dark">
                            Moyenne: {averages[question.id] ? averages[question.id].toFixed(1) : 'N/A'}/5
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Section Livre d'or */}
            {getFilteredData.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-sans font-bold text-zen-forest mb-6 text-center">
                  📖 Livre d'or
                </h3>
                <div className="space-y-4">
                  {getFilteredData
                    .filter(response => response.feedback && response.feedback.trim())
                    .sort((a, b) => {
                      const dateA = a.massageDate ? new Date(a.massageDate) : new Date(a.timestamp);
                      const dateB = b.massageDate ? new Date(b.massageDate) : new Date(b.timestamp);
                      return dateB - dateA;
                    })
                    .map((response, index) => {
                      const displayDate = response.massageDate 
                        ? new Date(response.massageDate).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })
                        : new Date(response.timestamp).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          });
                      
                      return (
                        <div key={response.id || index} className="bg-white/90 rounded-xl p-6 shadow-md border-l-4 border-zen-sage">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-zen-forest font-semibold text-lg">
                                {response.firstName || 'Client'}
                              </span>
                              <span className="text-zen-gray-dark text-sm">
                                • {displayDate}
                              </span>
                            </div>
                            <div className="text-zen-sage text-xl">💬</div>
                          </div>
                          <p className="text-zen-gray-dark font-sans leading-relaxed whitespace-pre-wrap italic">
                            "{response.feedback}"
                          </p>
                        </div>
                      );
                    })
                  }
                  {getFilteredData.filter(response => response.feedback && response.feedback.trim()).length === 0 && (
                    <div className="bg-white/80 rounded-xl p-6 shadow-md text-center">
                      <div className="text-4xl mb-2">💭</div>
                      <p className="text-zen-gray-dark font-sans">
                        Aucun commentaire pour cette période
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {getFilteredData.length === 0 && (
              <div className="bg-white/80 rounded-xl p-8 shadow-md text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-sans font-semibold text-zen-gray-dark mb-2">
                  Aucune donnée pour cette période
                </h3>
                <p className="text-zen-gray-dark">
                  Sélectionnez une autre période ou attendez de nouvelles réponses.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}