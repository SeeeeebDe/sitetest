import React from "react";
import { motion } from "framer-motion";

const massages = [
  {
    title: "Massage Découverte",
    description:
      `Un massage varié idéal pour découvrir le massage. Il combine plusieurs types de techniques et vous permet ainsi de découvrir vos préférences.\n\nMassage complet du corps en 3 temps et styles variés :\n- un massage musculaire du dos, offrant détente et drainage\n- suivi d’un massage énergétique des jambes, stimulant la circulation et la relaxation\n- et enfin un massage psychosensoriel du buste et des bras, contenant et invitant au relâchement des tensions`,
    image: "https://booking.myrezapp.com/uploads/services/medias/14025-37842-0-0.jpg",
    reservationLink:
      "https://booking.myrezapp.com/fr/online/booking/step1/14025/56960",
  },
  {
    title: "Massage Suédois",
    description:
      `Le massage pour la relaxation musculaire.\n\nLe Suédois est un massage modérément appuyé et ciblé sur les muscles. Il procure une sensation de relaxation idéale en fin de journée, ou dynamisante en début de journée.\n\nIl s’adresse à tout public : et oui, ce n’est pas réservé aux sportifs ! Chaque massage est adapté à celui qui le reçoit et le Suédois n’y échappe pas, je t’invite donc à l’essayer, et même à commencer par celui-ci s’il s’agit de ton premier massage !\n\nSkål !`,
    image: "https://booking.myrezapp.com/uploads/services/medias/14025-36569-0-33.jpeg",
    reservationLink:
      "https://booking.myrezapp.com/fr/online/booking/step1/14025/60058",
  },
  {
    title: "Massage Californien",
    description:
      `Le massage pour lâcher prise et se relaxer.\n\nLe Californien est un massage de bienveillance, très fluide et très enveloppant à la fois. Il s’adresse aussi bien aux personnes en quête de douceur qu’aux sportifs, aussi bien aux personnes à l’aise avec elles-mêmes qu’aux personnes plus réservées.\n\nLe Californien c’est la réunion du corps et de l’esprit, c’est se retrouver, s’accepter, lâcher ce qui te pèse sur le cœur et le corps. En somme, c’est spirituel et bon pour la santé !\n\nPetite note pour un premier massage :\nSi tu n’as jamais reçu de massage et que tu t’interroges sur ton rapport aux mains de l’autre, démarrer par le massage Classique peut être une bonne première étape. Au besoin écris ou appelle moi pour t’orienter.`,
    image: "https://booking.myrezapp.com/uploads/services/medias/14025-6754-0-4.jpg",
    reservationLink:
      "https://booking.myrezapp.com/fr/online/booking/step1/14025/59061",
  },
  {
    title: "Massage Enfant\n(4 à 12 ans)",
    description:
      `Massage découverte adapté aux enfants : d’une durée plus courte pour convenir à la disponibilité des plus jeunes, il est adapté selon l’âge et sur mesure pour répondre aux attentes et appréhensions de l’enfant.\n\nMassage à la carte pour les enfants, basé sur les 3 grands types de massages :\n- le massage musculaire (dos) pour une relaxation profonde et découvrir les sensations du massage tel que les petits sportifs se le représentent\n- le massage énergétique (jambes) pour stimuler la circulation et apaiser, une découverte toujours appréciée\n- le massage psychosensoriel (buste, bras, crâne) pour s’essayer à l’apaisement et au relâchement de l’esprit\n\nLes enfants ont comme particularité pour les plus jeunes de vivre leur éveil corporel et d’avoir un schéma corporel encore en construction : l’échange sur leur vision du corps et du massage est essentiel, et leurs attentes et appréhensions sont la base qui définît le massage idéal pour eux.\nComme pour les adultes, un temps d’échange précède donc toujours le massage !`,
    image: "https://booking.myrezapp.com/uploads/services/medias/14025-13096-0-17.jpeg",
    reservationLink:
      "https://booking.myrezapp.com/fr/online/booking/step1/14025/93908",
  },
];

export default function Massages() {
  return (
    <div className="pt-[calc(2rem+1.5rem)] min-h-screen bg-[#FAF7F0] py-12 px-6 md:px-16 font-poppins">
      <div className="min-h-screen bg-[#FAF7F0] py-16 px-6 md:px-20 font-poppins">
        <h1 className="text-5xl font-extrabold text-[#8B7D6B] mb-16 text-center tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Massages Bien-Être
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {massages.map((massage) => (
            <motion.article
              key={massage.title}
              className="relative rounded-3xl shadow-lg overflow-hidden flex flex-col h-full cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.03, boxShadow: "0 15px 25px rgba(139,125,107,0.3)" }}
            >
              {/* Image de fond subtile */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-center bg-cover filter saturate-75 brightness-90"
                style={{
                  backgroundImage: `url(${massage.image})`,
                  zIndex: 0,
                }}
              />

              {/* Overlay sombre très léger */}
              <div className="absolute inset-0 bg-black opacity-15 pointer-events-none" style={{ zIndex: 1 }} />

              {/* Contenu avec fond blanc semi-transparent et blur */}
              <div
                className="relative z-10 bg-white bg-opacity-[0.7] backdrop-blur-sm p-10 flex flex-col justify-between h-full min-h-full"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <header>
                  <h2
                    className="text-3xl font-extrabold mb-4 leading-snug text-center"
                    style={{
                      color: "#5a503d",
                      textShadow: "0 1px 2px rgba(0,0,0,0.15)",
                      fontFamily: "'Poppins', sans-serif",
                      whiteSpace: "pre-line", // pour respecter les sauts de ligne dans le texte
                    }}
                  >
                    {massage.title}
                  </h2>
                  <p
                    className="whitespace-pre-line leading-relaxed text-base md:text-lg"
                    style={{
                      color: "#5a503d",
                      textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {massage.description}
                  </p>
                </header>

                

                <motion.a
                  href={massage.reservationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-12 self-center bg-[#8B7D6B] text-[#FAF7F0] rounded-full px-14 py-3 font-semibold shadow-md select-none transition-colors duration-300 ease-in-out hover:bg-[#7A6B5C]"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Réserver ce massage
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}