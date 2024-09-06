import React from 'react';
import NavbarHome from './NavbarHome';
import Footer from './Footer';

const ContactUs = () => {
  return (
 <>
 <NavbarHome />
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start p-8 bg-gray-100 min-h-screen">
      {/* Contact Information Box */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/3 mb-8 lg:mb-0 lg:mr-8">
        <h2 className="text-2xl font-bold mb-4">Informations de Contact</h2>
        <p className="text-gray-700 mb-2">
          <strong>Adresse:</strong> 123 Rue de l'Exemple, Ville, Pays
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Téléphone:</strong> +212 6 12 34 56 78
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> contact@exemple.com
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Heures d'ouverture:</strong> Lundi - Vendredi: 9h00 - 18h00
        </p>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-2/3">
        <h2 className="text-2xl font-bold mb-4">Envoyez-nous un message</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Votre nom complet"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Votre adresse email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Votre message"
              rows="5"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />

 </>
  );
};

export default ContactUs;
