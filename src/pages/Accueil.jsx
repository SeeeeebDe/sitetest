import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="pt-[calc(4rem+1.5rem)] min-h-screen bg-[#FAF7F0] py-12 px-6 md:px-16 font-poppins">
      <div className="relative min-h-screen bg-gradient-to-b from-[#FAF7F0] to-[#F2E9DF] flex items-center justify-center px-6 py-20">
        <motion.main
          className="max-w-xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            className="text-5xl font-extrabold mb-10 text-[#8B7D6B] drop-shadow-sm"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Offrez-vous une parenthèse de sérénité, sans quitter votre cocon.
          </h1>

          {[
            "Je suis praticien en massage bien-être à domicile, et je me déplace chez vous pour vous offrir un moment de détente profonde, adapté à vos besoins.",
            "Que vous souhaitiez relâcher les tensions du quotidien, apaiser votre esprit ou simplement prendre soin de vous, je crée une bulle de calme dans votre environnement.",
            "Chaque séance est pensée pour vous reconnecter à votre corps, dans une ambiance douce, moderne et apaisante. Respirez… vous êtes entre de bonnes mains."
          ].map((text, i) => (
            <motion.p
              key={i}
              className="mb-8 text-lg leading-relaxed text-[#A7987A] max-w-prose mx-auto"
              whileHover={{ scale: 1.03, color: "#8B7D6B" }}
              transition={{ type: "spring", stiffness: 120 }}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {text}
            </motion.p>
          ))}

          <motion.div
            className="mt-8 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/massages"
              className="bg-[#8B7D6B] text-[#FAF7F0] rounded-full px-8 py-3 font-semibold shadow-md hover:bg-[#7A6B5C] transition-colors duration-300 ease-in-out inline-block"
            >
              Découvrir les massages
            </Link>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}