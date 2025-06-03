// pages/MentionsLegales.jsx
import { motion } from "framer-motion";

export default function MentionsLegales() {
  return (
    <motion.main 
      className="max-w-4xl mx-auto py-16 px-8 text-zen-gray-dark font-sans leading-relaxed space-y-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-4xl font-sans font-bold mb-12 text-center text-zen-taupe">
        Mentions légales
      </h1>
      <section className="mb-8">
            <h2 className="text-2xl font-sans font-semibold mb-4 text-zen-taupe">Conditions d'exercice et réservations</h2>
            <div className="text-zen-gray-dark space-y-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <p className="leading-relaxed">
                Mon Instant Zen propose des prestations de massage bien-être à domicile, exclusivement destinées à la relaxation et au bien-être. Ces massages sont pratiqués uniquement au domicile du client, dans le respect des conditions suivantes :
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>Les massages proposés sont strictement non thérapeutiques et ne peuvent en aucun cas être assimilés à des actes médicaux, paramédicaux ou relevant de la kinésithérapie.</li>
                <li>Toute contre-indication médicale doit impérativement être signalée lors de la réservation ou au plus tard le jour du rendez-vous. Je décline toute responsabilité pour tout dommage résultant d'une information médicale non communiquée.</li>
                <li>La confirmation définitive de la réservation est conditionnée par la réception du paiement.</li>
                <li>Vous disposez de la possibilité de modifier ou d'annuler votre réservation jusqu'à 24 heures avant l'heure du rendez-vous, avec remboursement intégral.</li>
                <li>En cas de circonstances exceptionnelles, je me réserve le droit de reporter un rendez-vous, avec proposition d'un nouveau créneau dans les meilleurs délais.</li>
              </ul>
            </div>
      </section>

      <section className="bg-zen-beige p-8 rounded-lg shadow-zen">
        <p className="italic text-zen-gray-light text-center">
          Activité exclue du champ de la réglementation médicale.<br />
          Les massages proposés sont non thérapeutiques et ne s'apparentent à aucun acte médical.
        </p>
      </section>

      <section className="mb-8">
        <p className="text-lg">
          Conformément aux dispositions des articles 6-III et 19 de la loi n°2004-575
          du 21 juin 2004 pour la Confiance dans l'économie numérique (LCEN), il est
          précisé ci-dessous l'identité des différents intervenants dans le cadre de
          la réalisation et du suivi du site.
        </p>
      </section>


      <section className="mb-8 bg-zen-beige p-8 rounded-lg shadow-zen">
        <h2 className="text-2xl font-sans font-semibold mb-4 text-zen-taupe">Éditeur du site</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><span className="font-medium">Nom :</span> Sébastien Dréano</li>
          <li><span className="font-medium">Statut :</span> Micro-entrepreneur</li>
          <li><span className="font-medium">Activité :</span> Massages bien-être à domicile (activité non médicale)</li>
          <li><span className="font-medium">SIREN :</span> 944154657</li>
          <li><span className="font-medium">Adresse :</span> 77240 Cesson – France</li>
          <li><span className="font-medium">E-mail :</span> contact@moninstantzen.fr</li>
          <li><span className="font-medium">Responsable de la publication :</span> Sébastien Dréano</li>
        </ul>
      </section>

      <section className="mb-8 bg-zen-beige p-8 rounded-lg shadow-zen">
        <h2 className="text-2xl font-sans font-semibold mb-4 text-zen-taupe">Hébergement</h2>
        <p>
          Le site est hébergé par :
          <br />
          OVHCloud<br />
          2 rue Kellermann<br />
          59100 Roubaix, France<br />
          Site : <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-zen-taupe hover:text-zen-gray-light underline transition-colors">https://www.ovhcloud.com</a>
        </p>
      </section>

      <section className="mb-8 bg-zen-beige p-8 rounded-lg shadow-zen">
        <h2 className="text-2xl font-sans font-semibold mb-4 text-zen-taupe">Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu présent sur ce site (textes, graphismes, logo)
          est la propriété exclusive de Sébastien Dréano, sauf mention contraire. Images libres de droits. Toute
          reproduction, distribution ou utilisation sans autorisation préalable est interdite.
        </p>
      </section>

      <section className="mb-8 bg-zen-beige p-8 rounded-lg shadow-zen">
        <h2 className="text-2xl font-sans font-semibold mb-4 text-zen-taupe">Traitement des données personnelles</h2>
        <p>
          Les informations collectées via le formulaire de contact sont utilisées
          uniquement pour répondre à vos demandes. Conformément à la loi "Informatique
          et Libertés" et au RGPD, vous disposez d'un droit d'accès, de rectification
          et de suppression des données vous concernant. Pour exercer ce droit,
          contactez : <a href="mailto:contact@moninstantzen.fr" className="text-zen-taupe hover:text-zen-gray-light underline transition-colors">contact@moninstantzen.fr</a>
        </p>
      </section>

    </motion.main>
  );
}