// pages/Home.jsx
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/animated-bg.css";
import logo from "../images/LOGO.png";

export default function Accueil() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDiscoverButton, setShowDiscoverButton] = useState(true);

  // Variables pour ajuster facilement le logo et l'effet de fade
  const logoBaseWidth = 120;
  const fadeOpacityMultiplier = 0.9;

  // Utilisation de useMotionValue pour des animations plus fluides
  const scrollYMotion = useMotionValue(0);
  const logoScale = useTransform(scrollYMotion, [0, 150], [3, 1]);
  const logoOpacity = useTransform(scrollYMotion, [0, 300], [1, 0.9]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          scrollYMotion.set(currentScrollY); // Mise à jour du MotionValue
          setIsScrolled(currentScrollY > 100);
          
          if (currentScrollY > 50) {
            setShowDiscoverButton(false);
          } else {
            setShowDiscoverButton(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollYMotion]);

  // Paramètres ajustables pour l'effet du logo
  const fadeEffectColor = '235, 220, 190';

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
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            marginTop: '8vh',
            marginBottom: scrollY > 150 ? '3vh' : `${4 + Math.max(0, (3 - scrollY / 75)) * 5}vh` // Augmenté l'espace en dessous
          }}
        >
          <motion.img 
            src={logo} 
            alt="Mon Instant Zen" 
            className="w-auto mx-auto"
            style={{ 
              opacity: logoOpacity,
              scale: logoScale,
              width: `${logoBaseWidth}px`,
              height: 'auto',
              maxWidth: '50vw', // Changé de 25vw à 50vw pour limiter à 50% de l'écran
              borderRadius: '12px',
              filter: scrollY > 150 ? 'none' : `drop-shadow(0 0 ${Math.max(0, (3 - scrollY / 75)) * 10}px rgba(${fadeEffectColor}, 0.3))`
            }}
          />
        </motion.div>
  
        {/* Phrase d'accroche - toujours visible et taille fixe */}
        <motion.h1 
          className="text-4xl font-bold mb-6 drop-shadow-lg max-w-3xl text-white text-center relative z-10"
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



  