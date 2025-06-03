// pages/Massages.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import californien from "../images/massages/californien.jpg";
import suedois from "../images/massages/suedois.jpeg";
import decouverte from "../images/massages/decouverte.jpg";
import enfant from "../images/massages/enfant.jpeg";
import "../styles/animated-bg.css";

const imageMap = {
  "Massage Californien": californien,
  "Massage Suédois": suedois,
  "Massage Découverte": decouverte,
  "Massage Enfant (4 à 12 ans)": enfant
};

const massages = [
  {
    title: "Massage Découverte",
    description: "Une approche variée idéale pour découvrir le massage.\nCe massage combine plusieurs types de techniques et vous permet ainsi de découvrir vos préférences.\n\nMassage complet du corps en 3 temps et styles variés :\n- un massage musculaire du dos, offrant détente et drainage\n- suivi d'un massage énergétique des jambes, stimulant la circulation et la relaxation\n- et enfin un massage psychosensoriel du buste et des bras, contenant et invitant au relâchement des tensions",
    url: "https://booking.myrezapp.com/fr/online/booking/step1/14025/56960",
  },
  {
    title: "Massage Suédois",
    description: "Le massage pour la relaxation musculaire.\nLe Suédois est un massage modérément appuyé et ciblé sur les muscles. Il procure une sensation de relaxation idéale en fin de journée, ou dynamisante en début de journée.\n\nIl s'adresse à tout public : et oui, ce n'est pas réservé aux sportifs ! Chaque massage est adapté à celui qui le reçoit et le Suédois n'y échappe pas, je t'invite donc à l'essayer, et même à commencer par celui-ci s'il s'agit de ton premier massage !\n\nSkål !",
    url: "https://booking.myrezapp.com/fr/online/booking/step1/14025/60058",
  },
  {
    title: "Massage Californien",
    description: "Le massage pour lâcher prise et se relaxer.\nLe Californien est un massage de bienveillance, très fluide et très enveloppant à la fois. Il s'adresse aussi bien aux personnes en quête de douceur qu'aux sportifs, aussi bien aux personnes à l'aise avec elles-mêmes qu'aux personnes plus réservées.\n\nLe Californien c'est la réunion du corps et de l'esprit, c'est se retrouver, s'accepter, lâcher ce qui te pèse sur le cœur et le corps. En somme, c'est spirituel et bon pour la santé !\n\nPetite note pour un premier massage :\nSi tu n'as jamais reçu de massage et que tu t'interroge sur ton rapport aux mains de l'autre, démarrer par le massage Découverte peut être une bonne première étape. Au besoin écris ou appelle moi pour t'orienter.",
    url: "https://booking.myrezapp.com/fr/online/booking/step1/14025/59061",
  },
  {
    title: "Massage Enfant (4 à 12 ans)",
    description: "Massage découverte adapté aux enfants.\nD'une durée plus courte pour convenir à la disponibilité des plus jeunes, il est adapté selon l'âge et sur mesure pour répondre aux attentes et appréhensions de l'enfant.\n\nMassage à la carte pour les enfants, basé sur les 3 grands types de massages :\n- le massage musculaire (dos) pour une relaxation profonde et découvrir les sensations du massage tel que les petits sportifs se le représentent\n- le massage énergétique (jambes) pour stimuler la circulation et apaiser, une découverte toujours appréciée\n- le massage psychosensoriel (buste, bras, crâne) pour s'essayer à l'apaisement et au relâchement de l'esprit\n\nLes enfants ont comme particularité pour les plus jeunes de vivre leur éveil corporel et d'avoir un schéma corporel encore en construction : l'échange sur leur vision du corps et du massage est essentiel, et leurs attentes et appréhensions sont la base qui définît le massage idéal pour eux.\nComme pour les adultes, un temps d'échange précède donc toujours le massage !",
    url: "https://booking.myrezapp.com/fr/online/booking/step1/14025/93908",
  },
];


function MassageCard({ title, description, url, isExpanded, onToggle }) {
  return (
    <motion.div
      className="rounded-lg overflow-hidden relative transition-all duration-700 cursor-pointer"
      style={{
        position: 'relative',
        height: isExpanded ? 'auto' : 'clamp(30vh, 35vh, 40vh)',
        minHeight: isExpanded ? 'auto' : 'clamp(30vh, 35vh, 40vh)'
      }}
      whileHover={{ 
        scale: 1.02
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      onClick={onToggle}
    >
      {/* Image de fond */}
      <img 
        src={imageMap[title]} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Effet de bordure vaporeuse très douce */}
      <div 
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 20px, transparent 40px),
            radial-gradient(circle at 100% 0%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 20px, transparent 40px),
            radial-gradient(circle at 0% 100%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 20px, transparent 40px),
            radial-gradient(circle at 100% 100%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 20px, transparent 40px),
            linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.06) 15px, transparent 30px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.06) 15px, transparent 30px),
            linear-gradient(180deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.06) 15px, transparent 30px),
            linear-gradient(270deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.06) 15px, transparent 30px)
          `,
          filter: 'blur(0.5px)'
        }}
      />
      
      {/* Overlay pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5EBE0]/90 via-[#F5EBE0]/70 to-[#F5EBE0]/50 pointer-events-none" />
      
      {/* Contenu */}
       <div className="relative z-10 h-full flex flex-col">
         {/* Titre fixe en haut */}
         <div className="p-8 pb-4">
           <h3 className="text-2xl font-sans font-semibold text-center text-zen-forest">{title}</h3>
         </div>
         
         {/* Zone de contenu avec hauteur flexible */}
         <div className="flex-1 px-8 flex flex-col justify-between min-h-0">
           {/* Zone de texte - flexible et peut se réduire */}
            <div className="text-center flex-1 min-h-0 overflow-hidden">
              {/* Phrase d'accroche - visible sur tous les écrans */}
              <div>
                <p className="font-sans text-zen-earth text-base leading-relaxed italic mb-1 font-medium px-4 py-2 rounded-lg" style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(2px)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                }}>
                  {description.split('\n')[0]}
                </p>
              </div>
              
              {/* Reste de la description - adaptatif selon la taille d'écran */}
              <p className={`font-sans text-zen-gray-dark text-base leading-relaxed whitespace-pre-line ${
                !isExpanded ? 'line-clamp-3 sm:line-clamp-4 md:line-clamp-5 lg:line-clamp-6' : ''
              }`}>
                {description.split('\n').slice(1).join('\n')}
              </p>
            </div>
           
           {/* Points de suspension et bouton - toujours en bas */}
           <div className="text-center pb-8 flex-shrink-0">
             {!isExpanded && (
               <>
                 <div className="mb-2 sm:mb-4 flex justify-center items-end space-x-1">
                    <span className="text-6xl text-zen-sage font-bold animated-dot-1">.</span>
                    <span className="text-6xl text-zen-sage font-bold animated-dot-2">.</span>
                    <span className="text-6xl text-zen-sage font-bold animated-dot-3">.</span>
                  </div>
               </>
             )}
             <a
               href={url}
               className="inline-block bg-zen-sage text-white font-sans font-medium px-8 py-3 rounded-full hover:bg-zen-forest hover:shadow-zen transition-all duration-300 text-center"
               onClick={(e) => e.stopPropagation()}
             >
               Réserver ce massage
             </a>
           </div>
         </div>
       </div>
    </motion.div>
  );
}

export default function Massages() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardToggle = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <main className="relaxing-background min-h-screen py-16 px-6">
        {/* Couches de couleurs pour l'effet de profondeur */}
        <div className="color-layer-1 pointer-events-none"></div>
        <div className="color-layer-2 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-4xl font-sans font-bold text-center mb-16 text-zen-forest drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Les Massages
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {massages.map((massage, index) => (
              <MassageCard 
                key={index} 
                {...massage} 
                isExpanded={expandedCard === index}
                onToggle={() => handleCardToggle(index)}
              />
            ))}
          </div>
          
          {/* Carte cadeau */}
          <motion.div
            className="mt-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-zen-sage/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-zen-forest mb-4">
                Carte cadeau : offrez un Instant Zen
              </h2>
              <p className="text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
                Vous souhaitez offrir un cadeau attentionné, un moment de détente et de bien être ?<br/>
                Cartes cadeaux avec un mot personnalisé, envoyées par email ou par courrier. 
                Contactez-moi pour toute demande.
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-zen-sage text-white font-medium px-8 py-3 rounded-full hover:bg-zen-forest hover:shadow-zen transition-all duration-300 transform hover:scale-105"
              >
                Me contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}