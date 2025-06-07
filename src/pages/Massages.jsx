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
  "Massage Enfant\n(4 à 12 ans)": enfant
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
    title: "Massage Enfant\n(4 à 12 ans)",
    description: "Massage découverte adapté aux enfants.\nD'une durée plus courte pour convenir à la disponibilité des plus jeunes, il est adapté selon l'âge et sur mesure pour répondre aux attentes et appréhensions de l'enfant.\n\nMassage à la carte pour les enfants, basé sur les 3 grands types de massages :\n- le massage musculaire (dos) pour une relaxation profonde et découvrir les sensations du massage tel que les petits sportifs se le représentent\n- le massage énergétique (jambes) pour stimuler la circulation et apaiser, une découverte toujours appréciée\n- le massage psychosensoriel (buste, bras, crâne) pour s'essayer à l'apaisement et au relâchement de l'esprit\n\nLes enfants ont comme particularité pour les plus jeunes de vivre leur éveil corporel et d'avoir un schéma corporel encore en construction : l'échange sur leur vision du corps et du massage est essentiel, et leurs attentes et appréhensions sont la base qui définît le massage idéal pour eux.\nComme pour les adultes, un temps d'échange précède donc toujours le massage !",
    url: "https://booking.myrezapp.com/fr/online/booking/step1/14025/93908",
  },
];

function MassageCard({ title, description, url, isExpanded, onToggle }) {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-zen-sage/20 hover:shadow-zen transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout
    >
      <div className="relative">
        <img
          src={imageMap[title]}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-zen-forest mb-4">{title}</h3>
        
        <div className="relative">
          <div 
            className={`text-gray-700 leading-relaxed transition-all duration-300 overflow-hidden ${
              isExpanded ? 'max-h-none' : 'max-h-24'
            }`}
            style={{
              WebkitMask: !isExpanded 
                ? 'linear-gradient(to bottom, black 60%, transparent 100%)' 
                : 'none',
              mask: !isExpanded 
                ? 'linear-gradient(to bottom, black 60%, transparent 100%)' 
                : 'none'
            }}
          >
            {description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < description.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2">
            {!isExpanded && (
              <div className="flex space-x-1 items-end">
                <motion.span
                  className="w-1 h-1 bg-zen-sage rounded-full"
                  animate={{ y: [0, -2, 0, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: 0, times: [0, 0.2, 0.4, 1] }}
                />
                <motion.span
                  className="w-1 h-1 bg-zen-sage rounded-full"
                  animate={{ y: [0, -2, 0, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: 0.2, times: [0, 0.2, 0.4, 1] }}
                />
                <motion.span
                  className="w-1 h-1 bg-zen-sage rounded-full"
                  animate={{ y: [0, -2, 0, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: 0.4, times: [0, 0.2, 0.4, 1] }}
                />
              </div>
            )}
            <button
              onClick={onToggle}
              className="text-zen-sage hover:text-zen-forest font-medium transition-colors duration-200"
            >
              {isExpanded ? 'Voir moins' : 'Voir plus'}
            </button>
          </div>
          
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zen-sage text-white font-medium px-6 py-2 rounded-full hover:bg-zen-forest hover:shadow-zen transition-all duration-300 transform hover:scale-105"
          >
            Réserver ce massage
          </a>
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
    <motion.div 
      className="relative overflow-hidden min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <main className="relaxing-background min-h-screen py-16 px-6">
        {/* Couches de couleurs pour l'effet de profondeur */}
        <div className="color-layer-1 pointer-events-none"></div>
        <div className="color-layer-2 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h1
            className="text-4xl font-sans font-bold text-center mb-16 text-zen-forest drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Les Massages
          </motion.h1>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {massages.map((massage, index) => (
              <MassageCard 
                key={index} 
                {...massage} 
                isExpanded={expandedCard === index}
                onToggle={() => handleCardToggle(index)}
              />
            ))}
          </motion.div>
          
          {/* Carte cadeau */}
          <motion.div
            className="mt-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-zen-sage/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
    </motion.div>
  );
}