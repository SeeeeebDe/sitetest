// pages/MentionsLegales.jsx
export default function MentionsLegales() {
  return (
    <main className="max-w-3xl mx-auto p-8 text-gray-800 font-sans leading-relaxed">
      <h1 className="text-4xl font-semibold mb-8 text-center text-gray-900">
        Mentions légales
      </h1>

      <section className="mb-6">
        <p>
          Conformément aux dispositions des articles 6-III et 19 de la loi n°2004-575
          du 21 juin 2004 pour la Confiance dans l’économie numérique (LCEN), il est
          précisé ci-dessous l’identité des différents intervenants dans le cadre de
          la réalisation et du suivi du site.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Éditeur du site</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Nom :</strong> Julien Morel</li>
          <li><strong>Statut :</strong> Auto-entrepreneur</li>
          <li><strong>Activité :</strong> Massages bien-être à domicile (activité non médicale)</li>
          <li><strong>SIRET :</strong> 123 456 789 00012</li>
          <li><strong>Adresse :</strong> 10 rue des Tilleuls, 44000 Nantes – France</li>
          <li><strong>E-mail :</strong> contact@julienmassage.fr</li>
          <li><strong>Responsable de la publication :</strong> Julien Morel</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Hébergement</h2>
        <p>
          Le site est hébergé par :
          <br />
          Vercel Inc.<br />
          340 S Lemon Ave #4133<br />
          Walnut, CA 91789 – États-Unis<br />
          Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://vercel.com</a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Propriété intellectuelle</h2>
        <p>
          L’ensemble du contenu présent sur ce site (textes, images, graphismes, logo)
          est la propriété exclusive de Julien Morel, sauf mention contraire. Toute
          reproduction, distribution ou utilisation sans autorisation préalable est interdite.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Traitement des données personnelles</h2>
        <p>
          Les informations collectées via le formulaire de contact sont utilisées
          uniquement pour répondre à vos demandes. Conformément à la loi “Informatique
          et Libertés” et au RGPD, vous disposez d’un droit d’accès, de rectification
          et de suppression des données vous concernant. Pour exercer ce droit,
          contactez : <a href="mailto:contact@julienmassage.fr" className="text-blue-600 underline">contact@julienmassage.fr</a>
        </p>
      </section>

      <section>
        <p className="italic text-gray-600">
          Activité exclue du champ de la réglementation médicale.<br />
          Les massages proposés sont non thérapeutiques et ne s’apparentent à aucun acte médical.
        </p>
      </section>
    </main>
  );
}