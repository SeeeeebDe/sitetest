// pages/Massages.jsx
import { motion } from "framer-motion";
import californien from "../images/massages/californien.jpg";
import suedois from "../images/massages/suedois.jpeg";
import decouverte from "../images/massages/decouverte.jpg";
import enfant from "../images/massages/enfant.jpeg";

const imageMap = {
  "Massage Californien": californien,
  "Massage Suédois": suedois,
  "Massage Découverte": decouverte,
  "Massage Enfant (4 à 12 ans)": enfant
};

const massages = [
  {
    title: "Massage Découverte",
    description: "Un massage varié idéal pour découvrir le massage. Il combine plusieurs types de techniques et vous permet ainsi de découvrir vos préférences.\n\nMassage complet du corps en 3 temps et styles variés :\n- un massage musculaire du dos, offrant détente et drainage\n- suivi d’un massage énergétique des jambes, stimulant la circulation et la relaxation\n- et enfin un massage psychosensoriel du buste et des bras, contenant et invitant au relâchement des tensions",
    url: "#",
  },
  {
    title: "Massage Suédois",
    description: "Le massage pour la relaxation musculaire.\nLe Suédois est un massage modérément appuyé et ciblé sur les muscles. Il procure une sensation de relaxation idéale en fin de journée, ou dynamisante en début de journée.\n\nIl s’adresse à tout public : et oui, ce n’est pas réservé aux sportifs ! Chaque massage est adapté à celui qui le reçoit et le Suédois n’y échappe pas, je t’invite donc à l’essayer, et même à commencer par celui-ci s’il s’agit de ton premier massage !\n\nSkål !",
    url: "#",
  },
  {
    title: "Massage Californien",
    description: "Le massage pour lâcher prise et se relaxer.\n\nLe Californien est un massage de bienveillance, très fluide et très enveloppant à la fois. Il s’adresse aussi bien aux personnes en quête de douceur qu’aux sportifs, aussi bien aux personnes à l’aise avec elles-mêmes qu’aux personnes plus réservées.\n\nLe Californien c’est la réunion du corps et de l’esprit, c’est se retrouver, s’accepter, lâcher ce qui te pèse sur le cœur et le corps. En somme, c’est spirituel et bon pour la santé !\n\nPetite note pour un premier massage :\nSi tu n’as jamais reçu de massage et que tu t’interroge sur ton rapport aux mains de l’autre, démarrer par le massage Découverte peut être une bonne première étape. Au besoin écris ou appelle moi pour t’orienter.",
    url: "#",
  },
  {
    title: "Massage Enfant (4 à 12 ans)",
    description: "Massage découverte adapté aux enfants : d’une durée plus courte pour convenir à la disponibilité des plus jeunes, il est adapté selon l’âge et sur mesure pour répondre aux attentes et appréhensions de l’enfant.\n\nMassage à la carte pour les enfants, basé sur les 3 grands types de massages :\n- le massage musculaire (dos) pour une relaxation profonde et découvrir les sensations du massage tel que les petits sportifs se le représentent\n- le massage énergétique (jambes) pour stimuler la circulation et apaiser, une découverte toujours appréciée\n- le massage psychosensoriel (buste, bras, crâne) pour s’essayer à l’apaisement et au relâchement de l’esprit\n\nLes enfants ont comme particularité pour les plus jeunes de vivre leur éveil corporel et d’avoir un schéma corporel encore en construction : l’échange sur leur vision du corps et du massage est essentiel, et leurs attentes et appréhensions sont la base qui définît le massage idéal pour eux.\nComme pour les adultes, un temps d’échange précède donc toujours le massage !",
    url: "#",
  },
];


function MassageCard({ title, description, url }) {
  const backgroundImage = `url(${imageMap[title]})`;
  return (
    <motion.div
      className="rounded-lg shadow-zen p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-700 relative overflow-hidden"
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5EBE0]/90 via-[#F5EBE0]/70 to-[#F5EBE0]/50 pointer-events-none" />
      <div className="relative z-10 text-center">
        <h3 className="text-2xl font-sans font-semibold mb-4 text-zen-taupe">{title}</h3>
        <p className="font-sans text-zen-gray-dark text-base leading-relaxed mb-8 whitespace-pre-line">{description}</p>
      </div>
      <a
        href={url}
        className="relative z-10 inline-block bg-zen-taupe text-white font-sans font-medium px-8 py-3 rounded-full hover:bg-zen-gray-dark hover:shadow-zen transition-all duration-300 text-center"
      >
        Réserver ce massage
      </a>
    </motion.div>
  );
}

export default function Massages() {
  return (
    <section className="bg-zen-beige min-h-screen py-12">
      <h2 className="text-4xl font-sans font-bold mb-12 text-center text-zen-taupe">
        Massages Bien-être
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {massages.map(({ title, description, url }) => (
          <MassageCard
            key={title}
            title={title}
            description={description}
            url={url}
          />
        ))}
      </div>
    </section>
  );
}