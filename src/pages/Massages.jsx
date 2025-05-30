// pages/Massages.jsx
import { motion } from "framer-motion";

const massages = [
  {
    title: "Massage Relaxant",
    description:
      "Un massage doux et enveloppant, idéal pour relâcher les tensions accumulées et calmer le mental. Il favorise la détente profonde et le recentrage, dans un rythme lent et fluide. Parfait pour se reconnecter à soi dans un moment de pleine sérénité.",
    url: "https://exemple.com/reserver-relaxant",
  },
  {
    title: "Massage Décontractant",
    description:
      "Ciblé sur les zones tendues (dos, épaules, nuque), ce massage soulage les douleurs musculaires et favorise la récupération. Les pressions sont ajustées à votre confort, pour une sensation d’allègement durable.",
    url: "https://exemple.com/reserver-decontractant",
  },
  {
    title: "Massage Énergisant",
    description:
      "Un massage rythmé et tonifiant pour relancer la circulation et réveiller le corps. Il redonne vitalité et légèreté, tout en respectant votre équilibre. Idéal en cas de fatigue ou de baisse d’énergie.",
    url: "https://exemple.com/reserver-energisant",
  },
  {
    title: "Massage Harmonisant",
    description:
      "Inspiré de différentes techniques douces, ce massage équilibre le corps et l’esprit. Il agit en profondeur tout en douceur, pour une sensation d’unité et de paix intérieure. Un soin global, apaisant et ressourçant.",
    url: "https://exemple.com/reserver-harmonisant",
  },
];

function MassageCard({ title, description, url }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl cursor-pointer"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white font-medium px-5 py-2 rounded hover:bg-blue-700 transition-colors text-center"
      >
        Réserver ce massage
      </a>
    </motion.div>
  );
}

export default function Massages() {
  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Nos massages à domicile
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {massages.map(({ title, description, url }) => (
          <MassageCard
            key={title}
            title={title}
            description={description}
            url={url}
          />
        ))}
      </div>
    </main>
  );
}