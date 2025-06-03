// pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import "../styles/animated-bg.css";
import moiImage from "../images/MOI.jpeg";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await emailjs.sendForm(
        'service_orbgw8n', // Remplacez par votre Service ID
        'template_2tbvnfw', // Remplacez par votre Template ID
        e.target,
        'wvxl3buP95b69mirG' // Remplacez par votre Public Key
      );
      
      console.log('Email envoyé avec succès:', result.text);
      setSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relaxing-background min-h-screen flex items-center justify-center px-4">
        {/* Couches de couleurs pour l'effet de profondeur */}
        <div className="color-layer-1 pointer-events-none"></div>
        <div className="color-layer-2 pointer-events-none"></div>

        {/* Photo subtile en arrière-plan */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url(${moiImage})`,
            backgroundPosition: 'center 30%',
            filter: 'blur(1px)'
          }}
        ></div>

        <motion.div
          className="bg-zen-cream/95 rounded-2xl shadow-zen p-10 max-w-xl w-full text-center relative z-10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-sans font-bold mb-6 text-zen-forest">Contact</h2>
          {submitted ? (
            <div className="text-lg font-sans text-zen-forest mb-8">
              ✅ Merci pour votre message ! Je vous répondrai dans les plus brefs délais.
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="user_name"
                placeholder="Nom"
                required
                className="w-full px-4 py-3 rounded-lg border border-zen-gray-light bg-white/90 font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
              />
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg border border-zen-gray-light bg-white/90 font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
              />
              <textarea
                name="message"
                placeholder="Votre message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-zen-gray-light bg-white/90 font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
              />
              
              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-sans font-medium px-8 py-3 rounded-full transition-all duration-300 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-zen-sage text-white hover:bg-zen-forest hover:shadow-zen'
                }`}
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
}