// pages/Home.jsx
import { motion } from "framer-motion";
import "../styles/animated-bg.css";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 z-0 animated-gradient" />
      <motion.div
        className="relative z-10 p-6 max-w-3xl mx-auto text-white text-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-6">Offrez-vous une parenthèse de sérénité, sans quitter votre cocon.</h1>
        <p className="mb-4">
          Je suis praticien en massage bien-être à domicile, et je me déplace chez vous pour vous offrir un moment de détente profonde, adapté à vos besoins.
        </p>
        <p className="mb-4">
          Que vous souhaitiez relâcher les tensions du quotidien, apaiser votre esprit ou simplement prendre soin de vous, je crée une bulle de calme dans votre environnement.
        </p>
        <p>
          Chaque séance est pensée pour vous reconnecter à votre corps, dans une ambiance douce, moderne et apaisante. Respirez… vous êtes entre de bonnes mains.
        </p>
      </motion.div>
    </div>
  );
}
