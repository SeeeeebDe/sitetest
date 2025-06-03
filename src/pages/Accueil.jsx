// pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/animated-bg.css";

export default function Home() {
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
        
        <div className="max-w-3xl text-white text-center relative z-10">
          <h1 className="text-4xl font-bold mb-8 drop-shadow-lg">Offrez-vous une parenthèse de sérénité, sans quitter votre cocon.</h1>
          <p className="mb-6 text-lg drop-shadow-md">
            Je suis praticien en massage bien-être à domicile, et je me déplace chez vous pour vous offrir un moment de détente profonde, adapté à vos besoins.
          </p>
          <p className="mb-6 text-lg drop-shadow-md">
            Que vous souhaitiez relâcher les tensions du quotidien, apaiser votre esprit ou simplement prendre soin de vous, je crée une bulle de calme dans votre environnement.
          </p>
          <p className="mb-10 text-lg drop-shadow-md">
            Chaque séance est pensée pour vous reconnecter à votre corps, dans une ambiance douce, moderne et apaisante. Respirez… vous êtes entre de bonnes mains.
          </p>
          <Link to="/massages" className="inline-block bg-zen-taupe hover:bg-zen-taupe/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Découvrir les massages
          </Link>
        </div>
      </motion.main>
    </div>
  );
}
