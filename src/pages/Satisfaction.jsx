import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import satisfactionAPI from '../services/satisfactionAPI';
import "../styles/animated-bg.css";

export default function Satisfaction() {
  const [firstName, setFirstName] = useState('');
  const [massageDate, setMassageDate] = useState('');
  const [responses, setResponses] = useState({
    communication: 0,
    attentes: 0,
    massage: 0,
    intimite: 0,
    domicile: 0,
    satisfaction: 0
  });
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [canSubmit, setCanSubmit] = useState(true);

  const questions = [
    {
      id: 'communication',
      text: 'La qualité de la communication ?',
      subtitle: '(lors de la réservation et le jour du massage)'
    },
    {
      id: 'attentes',
      text: 'La prise en compte de vos attentes ?'
    },
    {
      id: 'massage',
      text: 'Le massage en lui-même ?'
    },
    {
      id: 'intimite',
      text: 'Le respect de votre intimité ?'
    },
    {
      id: 'domicile',
      text: 'Le fait d\'avoir reçu un massage à votre domicile ?'
    },
    {
      id: 'satisfaction',
      text: 'Votre satisfaction globale ?'
    }
  ];

  // Vérifier la limitation IP (une réponse par jour)
  useEffect(() => {
    const checkSubmissionLimit = async () => {
      try {
        const canSubmit = await satisfactionAPI.canSubmitToday();
        if (!canSubmit) {
          setCanSubmit(false);
          setError('Vous avez déjà répondu à cette enquête aujourd\'hui. Merci de revenir demain.');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification:', error);
        // En cas d'erreur, on autorise la soumission
      }
    };
    
    checkSubmissionLimit();
  }, []);

  const handleRatingChange = (questionId, rating) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!canSubmit) return;
    
    // Vérifier que le prénom et la date sont renseignés et toutes les questions ont une réponse
     if (!firstName.trim()) {
       setError('Veuillez renseigner votre prénom.');
       return;
     }
     
     if (!massageDate) {
       setError('Veuillez renseigner la date de votre massage.');
       return;
     }
    
    const allAnswered = Object.values(responses).every(rating => rating > 0);
    if (!allAnswered) {
      setError('Veuillez répondre à toutes les questions.');
      return;
    }
    
    // Vérifier la limite de mots pour le commentaire
    const wordCount = feedback.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount > 300) {
      setError('Le commentaire ne peut pas dépasser 300 mots.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Préparer les données pour l'API
      const surveyData = {
        firstName: firstName.trim(),
        massageDate: massageDate,
        responses,
        feedback: feedback.trim()
      };
      
      // Envoyer les données à l'API
      await satisfactionAPI.submitResponse(surveyData);

      // Envoyer l'email de notification
      const emailData = {
        to_email: 'sebastien.dreano@gmail.com', // Remplacez par votre email
        subject: 'Mon Instant Zen - Nouvelle réponse à l\'enquête de satisfaction',
        message: `Nouvelle réponse à l'enquête de satisfaction :\n\n` +
          `Prénom: ${firstName.trim()}\n` +
          `Date du massage: ${new Date(massageDate).toLocaleDateString('fr-FR')}\n\n` +
          `Communication (réservation/jour J): ${responses.communication}/5\n` +
          `Prise en compte des attentes: ${responses.attentes}/5\n` +
          `Le massage en lui-même: ${responses.massage}/5\n` +
          `Respect de l'intimité: ${responses.intimite}/5\n` +
          `Massage à domicile: ${responses.domicile}/5\n` +
          `Satisfaction globale: ${responses.satisfaction}/5\n\n` +
          (feedback.trim() ? `Commentaire:\n${feedback.trim()}\n\n` : '') +
           `Date: ${new Date().toLocaleDateString('fr-FR')}\n` +
           `Heure: ${new Date().toLocaleTimeString('fr-FR')}`
       };

      await emailjs.send(
        'service_orbgw8n',
        'template_2tbvnfw',
        emailData,
        'wvxl3buP95b69mirG'
      );
      
      setSubmitted(true);
      setCanSubmit(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const RatingStars = ({ questionId, currentRating }) => {
    return (
      <div className="flex justify-center space-x-2 mt-3">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => handleRatingChange(questionId, rating)}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
              currentRating >= rating
                ? 'bg-zen-sage border-zen-sage text-white'
                : 'border-zen-gray-light text-zen-gray-dark hover:border-zen-sage'
            }`}
            disabled={!canSubmit}
          >
            {rating}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relaxing-background min-h-screen flex items-center justify-center px-4 py-8">
        {/* Couches de couleurs pour l'effet de profondeur */}
        <div className="color-layer-1 pointer-events-none"></div>
        <div className="color-layer-2 pointer-events-none"></div>

        <motion.div
          className="bg-zen-cream/95 rounded-2xl shadow-zen p-8 max-w-2xl w-full relative z-10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-sans font-bold mb-6 text-zen-forest text-center">
            Enquête de Satisfaction
          </h1>
          
          <p className="text-zen-gray-dark text-center mb-8 font-sans">
            Votre avis nous aide à améliorer nos services. Merci de prendre quelques minutes pour évaluer votre expérience.
          </p>

          {submitted ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🙏</div>
              <h2 className="text-2xl font-sans font-bold text-zen-forest mb-4">
                Merci pour votre retour !
              </h2>
              <p className="text-zen-gray-dark font-sans">
                Vos réponses ont été enregistrées et nous aident à améliorer nos services.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Champs Prénom et Date du massage */}
              <motion.div
                className="bg-white/80 rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-sans font-semibold text-zen-forest text-center mb-4">
                  Informations générales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zen-gray-dark mb-2">
                      Votre prénom *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Entrez votre prénom"
                      className="w-full px-4 py-3 border border-zen-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-zen-sage focus:border-transparent font-sans"
                      disabled={!canSubmit}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zen-gray-dark mb-2">
                      Date de votre massage *
                    </label>
                    <input
                      type="date"
                      value={massageDate}
                      onChange={(e) => setMassageDate(e.target.value)}
                      className="w-full px-4 py-3 border border-zen-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-zen-sage focus:border-transparent font-sans"
                      disabled={!canSubmit}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </motion.div>

              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  className="bg-white/80 rounded-xl p-6 shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                >
                  <h3 className="text-lg font-sans font-semibold text-zen-forest text-center mb-2">
                    {question.text}
                  </h3>
                  {question.subtitle && (
                    <p className="text-sm text-zen-gray-dark text-center mb-3">
                      {question.subtitle}
                    </p>
                  )}
                  <RatingStars 
                    questionId={question.id} 
                    currentRating={responses[question.id]} 
                  />
                  <div className="flex justify-between text-xs text-zen-gray-dark mt-2 px-2">
                    <span>Très insatisfait</span>
                    <span>Très satisfait</span>
                  </div>
                </motion.div>
              ))}

              {/* Champ Commentaire libre */}
              <motion.div
                className="bg-white/80 rounded-xl p-6 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (questions.length + 1) * 0.1 }}
              >
                <h3 className="text-lg font-sans font-semibold text-zen-forest text-center mb-2">
                  Vos impressions et suggestions
                </h3>
                <p className="text-sm text-zen-gray-dark text-center mb-4">
                  Partagez votre avis, vos impressions ou tout ce qui pourrait nous aider à améliorer votre expérience (optionnel, maximum 300 mots)
                </p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Votre message nous encourage et nous aide à nous améliorer..."
                  className="w-full px-4 py-3 border border-zen-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-zen-sage focus:border-transparent font-sans resize-none"
                  rows={6}
                  disabled={!canSubmit}
                />
                <div className="text-right text-xs text-zen-gray-dark mt-2">
                  {feedback.trim().split(/\s+/).filter(word => word.length > 0).length}/300 mots
                </div>
              </motion.div>
              
              {error && (
                <motion.div
                  className="text-red-600 text-center bg-red-50 p-3 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}
              
              <motion.button
                type="submit"
                disabled={isLoading || !canSubmit}
                className={`w-full font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 ${
                  isLoading || !canSubmit
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-zen-sage text-white hover:bg-zen-forest hover:shadow-zen'
                }`}
                whileHover={canSubmit ? { scale: 1.02 } : {}}
                whileTap={canSubmit ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer mes réponses'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
}