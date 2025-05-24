// pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.main
      className="max-w-xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Contactez-moi
      </h2>
      <p className="mb-8 text-gray-700 text-center">
        Je suis disponible sur rendez-vous, à l’heure qui vous convient. Pour
        toute question ou pour planifier votre massage à domicile, n’hésitez
        pas à utiliser le formulaire ci-dessous ou à me contacter directement.
        Je me ferai un plaisir de vous répondre rapidement et avec
        bienveillance.
      </p>

      {submitted ? (
        <p className="text-green-600 font-semibold text-center">
          Merci pour votre message, je vous répondrai très vite !
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            fetch("https://formspree.io/f/xlezvopw", {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
              body: new FormData(form),
            }).then((res) => {
              if (res.ok) {
                setSubmitted(true);
                form.reset();
              } else {
                alert("Une erreur est survenue, merci de réessayer.");
              }
            });
          }}
          className="flex flex-col gap-5"
        >
          <label className="flex flex-col">
            <span className="mb-1 font-medium text-gray-800">Nom</span>
            <input
              type="text"
              name="name"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre nom"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium text-gray-800">Email</span>
            <input
              type="email"
              name="email"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="votre.email@example.com"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium text-gray-800">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              className="border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre message"
            ></textarea>
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition-colors"
          >
            Envoyer
          </button>
        </form>
      )}
    </motion.main>
  );
}