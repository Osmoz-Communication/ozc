import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
              <div className="flex">
                <div className="w-8 h-8 bg-brand-500 rounded transform rotate-12"></div>
                <div className="w-8 h-8 bg-brand-600 rounded -ml-2"></div>
              </div>
              <div>
                <div className="text-xl font-bold">
                  OSMOZ<span className="text-brand-500">COM</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Communication Visuelle
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Spécialisés dans la création et la mise en œuvre de solutions de communication visuelle qui captivent et inspirent.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="https://www.facebook.com/osmozcom" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-500 transition-colors p-2 rounded-full hover:bg-brand-500/10">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/osmozcom/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-500 transition-colors p-2 rounded-full hover:bg-brand-500/10">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/osmoz-com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-500 transition-colors p-2 rounded-full hover:bg-brand-500/10">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6 text-brand-500">Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/qui-sommes-nous" className="text-gray-300 hover:text-white transition-colors block py-1">Qui sommes-nous</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors block py-1">Nos Services</Link></li>
              <li><Link to="/secteurs" className="text-gray-300 hover:text-white transition-colors block py-1">Secteurs d'activité</Link></li>
              <li><Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors block py-1">Portfolio</Link></li>
              <li><Link to="/actualites" className="text-gray-300 hover:text-white transition-colors block py-1">Actualités</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors block py-1">Contact</Link></li>
            </ul>
          </div>

          {/* Nos Sites */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6 text-brand-500">Nos Sites</h3>
            <ul className="space-y-3">
              <li><a href="https://www.ozc.fr/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors block py-1">OZC</a></li>
              <li><a href="https://ozc-web.fr/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors block py-1">OZC Web</a></li>
              <li><a href="https://www.ozc-signaletique.fr/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors block py-1">OZC Signalétique</a></li>
              <li><a href="https://www.ozc-agencement.fr/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors block py-1">OZC Agencement</a></li>
              <li><a href="https://www.stickerfrancais.fr/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors block py-1">Le Sticker Français</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-6 text-brand-500">Groupe Osmoz Communication</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 justify-center md:justify-start">
                <MapPin size={20} className="text-brand-500 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-left">
                  <p className='font-semibold'>Siège social :</p>
                  <p>3B Boulevard de la Marne</p>
                  <p>77120 Coulommiers, France</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <Phone size={20} className="text-brand-500 flex-shrink-0" />
                <a href="tel:0184190104" className="text-gray-300 hover:text-white transition-colors">01 84 19 01 04</a>
              </div>
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <Mail size={20} className="text-brand-500 flex-shrink-0" />
                <a href="mailto:contact@ozc.fr" className="text-gray-300 hover:text-white transition-colors">contact@ozc.fr</a>
              </div>
              <div className="flex items-start space-x-3 justify-center md:justify-start">
                <Clock size={20} className="text-brand-500 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-left">
                  <p className='font-semibold'>Horaires d'ouverture :</p>
                  <p>Du lundi au vendredi</p>
                  <p>8h30 - 18h30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Groupe Osmoz Communication. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <Link to="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">
                FAQ
              </Link>
              <Link to="/mentions-legales" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-de-confidentialite" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};