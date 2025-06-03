// pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/animated-bg.css";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relaxing-background min-h-screen flex items-center justify-center px-4">
        {/* Couches de couleurs pour l'effet de profondeur */}
        <div className="color-layer-1 pointer-events-none"></div>
        <div className="color-layer-2 pointer-events-none"></div>

      <motion.div
        className="bg-zen-cream/90 rounded-2xl shadow-zen p-10 max-w-xl w-full text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-sans font-bold mb-6 text-zen-forest">Contact</h2>
        {submitted ? (
          <div className="text-lg font-sans text-zen-forest mb-8">
            Merci pour votre message ! Je vous répondrai dans les plus brefs délais.
          </div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={e => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="text"
              placeholder="Nom"
              required
              className="w-full px-4 py-3 rounded-lg border border-zen-gray-light bg-white/90 font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-lg border border-zen-gray-light bg-white/90 font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
            />
            <textarea
              placeholder="Votre message"
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-zen-gray-light bg-white/90 font-sans text-zen-gray-dark focus:outline-none focus:ring-2 focus:ring-zen-sage"
            />
            <button
              type="submit"
              className="w-full bg-zen-sage text-white font-sans font-medium px-8 py-3 rounded-full hover:bg-zen-forest hover:shadow-zen transition-all duration-300"
            >
              Envoyer
            </button>
          </form>
        )}
      </motion.div>
      </main>
    </div>
  );
}