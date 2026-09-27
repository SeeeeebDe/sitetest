import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import satisfactionAPI from '../services/satisfactionAPI';
import authService from '../services/authService';
import "../styles/animated-bg.css";

export default function SatisfactionManage() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [surveyData, setSurveyData] = useState([]);
  const [selectedResponses, setSelectedResponses] = useState(new Set());
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterBy, setFilterBy] = useState('all');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const questions = [
    { id: 'communication', label: 'Communication' },
    { id: 'attentes', label: 'Prise en compte attentes' },
    { id: 'massage', label: 'Massage' },
    { id: 'intimite', label: 'Respect intimité' },
    { id: 'domicile', label: 'Massage à domicile' },
    { id: 'satisfaction', label: 'Satisfaction globale' }
  ];

  useEffect(() => {
    // Charger les données d'enquête depuis l'API si authentifié
    if (isAuthenticated) {
      loadSurveyData();
    }
  }, [isAuthenticated]);

  // Écouter les changements d'authentification
  useEffect(() => {
    const cleanup = authService.onAuthChange((authenticated) => {
      setIsAuthenticated(authenticated);
      if (!authenticated) {
        setSurveyData([]);
        setSelectedResponses(new Set());
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
    setSelectedResponses(new Set());
    setPassword('');
    setAuthError('');
  };

  const handleSelectResponse = (id) => {
    const newSelected = new Set(selectedResponses);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedResponses(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedResponses.size === filteredAndSortedData.length) {
      setSelectedResponses(new Set());
    } else {
      setSelectedResponses(new Set(filteredAndSortedData.map(r => r.id)));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedResponses.size === 0) return;
    
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer ${selectedResponses.size} réponse(s) ? Cette action est irréversible.`
    );
    
    if (confirmDelete) {
      try {
        const idsToDelete = Array.from(selectedResponses);
        await satisfactionAPI.deleteResponses(idsToDelete, authService.correctPassword);
        await loadSurveyData(); // Recharger les données
        setSelectedResponses(new Set());
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression des réponses.');
      }
    }
  };

  const handleDeleteSingle = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette réponse ? Cette action est irréversible.');
    
    if (confirmDelete) {
      try {
        await satisfactionAPI.deleteResponses([id], authService.correctPassword);
        await loadSurveyData(); // Recharger les données
        setSelectedResponses(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la réponse.');
      }
    }
  };

  const detectPotentialDuplicates = () => {
    const duplicates = [];
    const ipGroups = {};
    
    surveyData.forEach(response => {
      const ip = response.ip || 'unknown';
      if (!ipGroups[ip]) {
        ipGroups[ip] = [];
      }
      ipGroups[ip].push(response);
    });
    
    Object.values(ipGroups).forEach(group => {
      if (group.length > 1) {
        // Vérifier si les réponses sont identiques ou très similaires
        for (let i = 0; i < group.length - 1; i++) {
          for (let j = i + 1; j < group.length; j++) {
            const response1 = group[i];
            const response2 = group[j];
            
            // Comparer les réponses
            const similarity = questions.reduce((acc, q) => {
              return acc + (response1.responses[q.id] === response2.responses[q.id] ? 1 : 0);
            }, 0);
            
            if (similarity >= 4) { // Si 4 réponses sur 6 sont identiques
              duplicates.push({ response1, response2, similarity });
            }
          }
        }
      }
    });
    
    return duplicates;
  };

  const filteredAndSortedData = surveyData
    .filter(response => {
      if (filterBy === 'all') return true;
      if (filterBy === 'duplicates') {
        const duplicates = detectPotentialDuplicates();
        return duplicates.some(dup => 
          dup.response1.id === response.id || dup.response2.id === response.id
        );
      }
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.timestamp) - new Date(b.timestamp);
          break;
        case 'massage_date':
          const dateA = a.massageDate ? new Date(a.massageDate) : new Date(a.timestamp);
          const dateB = b.massageDate ? new Date(b.massageDate) : new Date(b.timestamp);
          comparison = dateA - dateB;
          break;
        case 'ip':
          comparison = (a.ip || '').localeCompare(b.ip || '');
          break;
        case 'satisfaction':
          comparison = a.responses.satisfaction - b.responses.satisfaction;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAverageScore = (responses) => {
    const scores = Object.values(responses);
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-sans font-bold text-zen-forest mb-6 text-center">
            🔐 Gestion des Réponses
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-zen-forest font-sans font-semibold mb-2">
                Mot de passe :
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-zen-gray-light focus:outline-none focus:ring-2 focus:ring-zen-sage"
                required
              />
            </div>
            
            {authError && (
              <div className="text-red-600 text-sm text-center">
                {authError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-zen-sage text-white py-2 px-4 rounded-lg hover:bg-zen-forest transition-colors font-sans font-semibold"
            >
              Se connecter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            {/* En-tête */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-sans font-bold text-zen-forest">
                🛠️ Gestion des Réponses
              </h1>
              <div className="flex gap-4">
                <button
                  onClick={() => window.location.href = '/satisfaction/stats'}
                  className="px-4 py-2 text-sm bg-zen-sage text-white rounded-lg hover:bg-zen-forest transition-colors"
                >
                  Retour aux stats
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-zen-gray-light text-zen-gray-dark rounded-lg hover:bg-zen-gray-dark hover:text-white transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </div>

            {/* Contrôles */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-zen-forest font-sans font-semibold mb-2">
                  Trier par :
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zen-gray-light bg-white font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
                >
                  <option value="date">Date de réponse</option>
                  <option value="massage_date">Date de massage</option>
                  <option value="ip">Adresse IP</option>
                  <option value="satisfaction">Satisfaction</option>
                </select>
              </div>
              
              <div>
                <label className="block text-zen-forest font-sans font-semibold mb-2">
                  Ordre :
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zen-gray-light bg-white font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
                >
                  <option value="desc">Décroissant</option>
                  <option value="asc">Croissant</option>
                </select>
              </div>
              
              <div>
                <label className="block text-zen-forest font-sans font-semibold mb-2">
                  Filtrer :
                </label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zen-gray-light bg-white font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
                >
                  <option value="all">Toutes les réponses</option>
                  <option value="duplicates">Doublons potentiels</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handleDeleteSelected}
                  disabled={selectedResponses.size === 0}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-sans font-semibold"
                >
                  Supprimer sélection ({selectedResponses.size})
                </button>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-zen-sage/10 rounded-lg p-4">
                <h3 className="font-sans font-semibold text-zen-forest mb-1">Total des réponses</h3>
                <p className="text-2xl font-bold text-zen-sage">{surveyData.length}</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-sans font-semibold text-zen-forest mb-1">Réponses affichées</h3>
                <p className="text-2xl font-bold text-blue-600">{filteredAndSortedData.length}</p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-sans font-semibold text-zen-forest mb-1">Doublons potentiels</h3>
                <p className="text-2xl font-bold text-orange-600">{detectPotentialDuplicates().length}</p>
              </div>
            </div>

            {/* Actions de sélection */}
            {filteredAndSortedData.length > 0 && (
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 text-sm bg-zen-gray-light text-zen-gray-dark rounded-lg hover:bg-zen-gray-dark hover:text-white transition-colors"
                >
                  {selectedResponses.size === filteredAndSortedData.length ? 'Désélectionner tout' : 'Sélectionner tout'}
                </button>
                
                <span className="text-sm text-zen-gray-dark">
                  {selectedResponses.size} réponse(s) sélectionnée(s)
                </span>
              </div>
            )}

            {/* Liste des réponses */}
            <div className="space-y-4">
              {filteredAndSortedData.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-sans font-semibold text-zen-gray-dark mb-2">
                    Aucune réponse trouvée
                  </h3>
                  <p className="text-zen-gray-dark">
                    {filterBy === 'duplicates' ? 'Aucun doublon détecté.' : 'Aucune réponse disponible.'}
                  </p>
                </div>
              ) : (
                filteredAndSortedData.map((response) => {
                  const duplicates = detectPotentialDuplicates();
                  const isDuplicate = duplicates.some(dup => 
                    dup.response1.id === response.id || dup.response2.id === response.id
                  );
                  
                  return (
                    <div
                      key={response.id}
                      className={`border rounded-lg p-4 ${isDuplicate ? 'border-orange-300 bg-orange-50' : 'border-zen-gray-light bg-white'} ${selectedResponses.has(response.id) ? 'ring-2 ring-zen-sage' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedResponses.has(response.id)}
                            onChange={() => handleSelectResponse(response.id)}
                            className="w-4 h-4 text-zen-sage focus:ring-zen-sage border-gray-300 rounded"
                          />
                          <div>
                            {response.firstName && (
                              <div className="text-sm font-semibold text-zen-forest">
                                {response.firstName}
                              </div>
                            )}
                            <div className="text-xs text-zen-gray-dark">
                              Réponse: {formatDate(response.timestamp)}
                            </div>
                            {response.massageDate && (
                              <div className="text-xs text-zen-gray-dark">
                                Massage: {formatDate(response.massageDate)}
                              </div>
                            )}
                            <div className="text-xs text-zen-gray-dark">
                              IP: {response.ip || 'Non disponible'}
                            </div>
                            {isDuplicate && (
                              <div className="text-xs text-orange-600 font-semibold">
                                ⚠️ Doublon potentiel
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm font-semibold text-zen-forest">
                              Moyenne: {getAverageScore(response.responses)}/5
                            </div>
                            <div className="text-xs text-zen-gray-dark">
                              Satisfaction: {response.responses.satisfaction}/5
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {response.feedback && response.feedback.trim() && (
                              <button
                                onClick={() => {
                                  setSelectedFeedback({
                                    feedback: response.feedback,
                                    firstName: response.firstName,
                                    massageDate: response.massageDate,
                                    timestamp: response.timestamp
                                  });
                                  setShowFeedbackModal(true);
                                }}
                                className="px-3 py-1 text-xs bg-zen-sage text-white rounded hover:bg-zen-forest transition-colors"
                                title="Voir le commentaire"
                              >
                                💬
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteSingle(response.id)}
                              className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        {questions.map(question => (
                          <div key={question.id} className="text-center">
                            <div className="text-xs text-zen-gray-dark mb-1">
                              {question.label}
                            </div>
                            <div className="text-lg font-bold text-zen-sage">
                              {response.responses[question.id]}/5
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Modal pour afficher les commentaires */}
      {showFeedbackModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-sans font-bold text-zen-forest mb-2">
                    💬 Commentaire client
                  </h3>
                  <div className="text-sm text-zen-gray-dark">
                    {selectedFeedback.firstName && (
                      <span className="font-semibold">{selectedFeedback.firstName}</span>
                    )}
                    {selectedFeedback.massageDate && (
                      <span className="ml-2">• Massage du {formatDate(selectedFeedback.massageDate)}</span>
                    )}
                    <span className="ml-2">• Réponse du {formatDate(selectedFeedback.timestamp)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setSelectedFeedback(null);
                  }}
                  className="text-zen-gray-dark hover:text-zen-forest text-2xl leading-none"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-zen-cream/50 rounded-lg p-4">
                <p className="text-zen-gray-dark font-sans leading-relaxed whitespace-pre-wrap">
                  {selectedFeedback.feedback}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}