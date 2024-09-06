import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Description */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left">
          <img 
            src="./logo.png" 
            alt="Max Delivery Logo" 
            className="w-32 mb-4 mx-auto md:mx-0" 
          />
          <p className="text-lg font-semibold">Max Delivery</p>
          <p className="mt-2 text-gray-400">
            Votre partenaire de confiance pour des solutions de livraison rapides et fiables au Maroc.
          </p>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left">
          <h4 className="text-xl font-semibold mb-4">Contactez-Nous</h4>
          <p className="text-gray-400">Adresse : Rue des Livraisons, Casablanca, Maroc</p>
          <p className="text-gray-400">Téléphone : +212 123-456-789</p>
          <p className="text-gray-400">Email : contact@maxdelivery.ma</p>
        </div>

        {/* Social Media Links */}
        <div className="w-full md:w-1/3 text-center">
          <h4 className="text-xl font-semibold mb-4">Suivez-Nous</h4>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white flex items-center"
            >
              <FontAwesomeIcon icon={faFacebookF} className="mr-2" /> Facebook
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white flex items-center"
            >
              <FontAwesomeIcon icon={faInstagram} className="mr-2" /> Instagram
            </a>
            <a 
              href="mailto:contact@maxdelivery.ma" 
              className="text-gray-400 hover:text-white flex items-center"
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Gmail
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-gray-400 text-sm">&copy; 2024 Max Delivery. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
