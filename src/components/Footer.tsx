import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex">
                <div className="w-8 h-8 bg-lime-500 rounded transform rotate-12"></div>
                <div className="w-8 h-8 bg-lime-600 rounded -ml-2"></div>
              </div>
              <div>
                <div className="text-xl font-bold">
                  OSMOZ<span className="text-lime-500">COM</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Communication Visuelle
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Spécialisés dans la création et la mise en œuvre de solutions de communication visuelle qui captivent et inspirent.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-lime-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-lime-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-lime-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-lime-500">Nos Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Signalétique</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Enseigne</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Gravure</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Impression Numérique</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Habillage & Décor</Link></li>
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-lime-500">Secteurs d'Activité</h3>
            <ul className="space-y-3">
              <li><Link to="/secteurs" className="text-gray-300 hover:text-white transition-colors">Hôtellerie</Link></li>
              <li><Link to="/secteurs" className="text-gray-300 hover:text-white transition-colors">Industrie</Link></li>
              <li><Link to="/secteurs" className="text-gray-300 hover:text-white transition-colors">Tertiaire</Link></li>
              <li><Link to="/secteurs" className="text-gray-300 hover:text-white transition-colors">Commerce</Link></li>
              <li><Link to="/secteurs" className="text-gray-300 hover:text-white transition-colors">Événementiel</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-lime-500">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-lime-500 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>123 Rue de l'Innovation</p>
                  <p>69000 Lyon, France</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-lime-500 flex-shrink-0" />
                <span className="text-gray-300">04 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-lime-500 flex-shrink-0" />
                <span className="text-gray-300">contact@osmozcom.fr</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={20} className="text-lime-500 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Lun - Ven: 8h30 - 18h00</p>
                  <p>Sam - Dim: Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Osmoz Communication. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions légales
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};