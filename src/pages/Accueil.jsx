// pages/Home.jsx
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/animated-bg.css";
import logo from "../images/LOGO.png";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDiscoverButton, setShowDiscoverButton] = useState(true);

  // Variables pour ajuster facilement le logo et l'effet de fade
  const logoBaseWidth = 120; // Largeur de base du logo en pixels (taille quand scrollé)
  const fadeOpacityMultiplier = 0.9; // Multiplicateur pour réduire l'opacité dans les coins

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 100);
      
      // Masquer le bouton dès qu'on scroll un peu
      if (currentScrollY > 50) {
        setShowDiscoverButton(false);
      } else {
        setShowDiscoverButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcul de la taille du logo basé sur le scroll
  const logoScale = Math.max(1, 3 - (scrollY / 150) * 2);
  const logoOpacity = Math.max(0.9, 1 - (scrollY / 300));
  
  // Calcul de la largeur adaptative du logo basé sur la fenêtre du navigateur
  const browserWindowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const maxLogoWidth = browserWindowWidth * 0.7; // 70% de la largeur de la fenêtre du navigateur
  const scaledLogoWidth = logoBaseWidth * logoScale;
  const logoWidth = Math.min(scaledLogoWidth, maxLogoWidth / logoScale * logoScale);
  
  // Paramètres ajustables pour l'effet du logo
  const fadeEffectColor = '235, 220, 190'; // RGB values for rgba()

  return (
    <div className="relative overflow-hidden min-h-screen">
      <motion.main
        className="relaxing-background min-h-screen flex flex-col items-center justify-center px-6 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Couches de couleurs pour l'effet de profondeur */}
        <div className="color-layer-1 pointer-events-none"></div>
        <div className="color-layer-2 pointer-events-none"></div>
        
        {/* Logo avec animation douce et comportement de scroll */}
        <motion.div 
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: logoOpacity, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            marginBottom: logoScale > 1 ? `${5 + (logoScale - 1) * 7}vh` : '2vh'
          }}
        >
          <img 
            src={logo} 
            alt="Mon Instant Zen" 
            className="w-auto mx-auto transition-all duration-500"
            style={{ 
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
              width: `${logoBaseWidth}px`,
              height: 'auto',
              maxWidth: '70vw', // 70% de la largeur de la fenêtre (viewport width)
              borderRadius: '12px',
              boxShadow: logoScale > 1 ? `
                0 0 0 ${(logoScale - 1) * 1}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(1*1)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 2}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(1.5*1.5)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 3}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(2*2)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 4}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(2.5*2.5)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 5}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(3*3)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 6}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(3.5*3.5)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 7}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(4*4)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 8}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(4.5*4.5)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 9}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(5*5)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 10}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(5.5*5.5)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 11}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(6*6)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 12}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(6.5*6.5)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 13}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(7*7)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 14}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(7.5*7.5)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 15}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(8*8)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 16}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(8.5*8.5)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 17}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(9*9)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 18}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(9.5*9.5)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 19}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(10*10)) * fadeOpacityMultiplier}),
                0 0 0 ${(logoScale - 1) * 20}px rgba(${fadeEffectColor}, ${(logoScale - 1) * (1/(10.5*10.5)) * fadeOpacityMultiplier})
              ` : 'none'
            }}
          />
        </motion.div>

        {/* Phrase d'accroche - toujours visible et taille fixe */}
        <motion.h1 
          className="text-4xl font-bold mb-8 drop-shadow-lg max-w-3xl text-white text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Offrez-vous une parenthèse de sérénité, sans quitter votre cocon.
        </motion.h1>

        {/* Bouton de scroll vers le bas - visible seulement en haut */}
        <AnimatePresence>
          {showDiscoverButton && (
            <motion.div
              className="mb-12 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => {
                  // Masquer le bouton immédiatement au clic
                  setShowDiscoverButton(false);
                  
                  const scrollTarget = window.innerHeight * 0.8;
                  window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth'
                  });
                }}
                className="text-white hover:text-gray-200 transition-all duration-300 transform hover:scale-110 mx-auto group cursor-pointer bg-transparent border-none p-4"
              >
                <svg 
                  className="w-8 h-8 transform transition-transform duration-300 group-hover:translate-y-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-3xl text-white text-center relative z-10">
          
          {/* Contenu qui apparaît au scroll */}
          <motion.div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? 'translateY(0)' : 'translateY(30px)',
              maxHeight: isScrolled ? '1000px' : '0px',
              overflow: 'hidden'
            }}
          >
            <motion.p 
              className="mb-6 text-lg drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 20 }}
              transition={{ duration: 0.8, delay: isScrolled ? 0.2 : 0 }}
            >
              Je suis praticien en massage bien-être à domicile, et je me déplace chez vous pour vous offrir un moment de détente profonde, adapté à vos besoins.
            </motion.p>
            <motion.p 
              className="mb-6 text-lg drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 20 }}
              transition={{ duration: 0.8, delay: isScrolled ? 0.4 : 0 }}
            >
              Que vous souhaitiez relâcher les tensions du quotidien, apaiser votre esprit ou simplement prendre soin de vous, je crée une bulle de calme dans votre environnement.
            </motion.p>
            <motion.p 
              className="mb-10 text-lg drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 20 }}
              transition={{ duration: 0.8, delay: isScrolled ? 0.6 : 0 }}
            >
              Chaque séance est pensée pour vous reconnecter à votre corps, dans une ambiance douce, moderne et apaisante. Respirez… vous êtes entre de bonnes mains.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 20 }}
              transition={{ duration: 0.8, delay: isScrolled ? 0.8 : 0 }}
              className="mb-16"
            >
              <Link to="/massages" className="inline-block bg-zen-sage hover:bg-zen-forest text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Découvrir les massages
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}

  