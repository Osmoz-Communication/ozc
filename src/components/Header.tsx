import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    'Signalétique',
    'Enseigne',
    'Gravure',
    'Impression Numérique',
    'Film Solaire et Technique',
    'Habillage et Décor',
    'Print',
    'Objet'
  ];

  const sectors = [
    'Hôtellerie',
    'Industrie',
    'Tertiaire',
    'Commerce',
    'Événementiel',
    'Musée et Parc à Thème'
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-800 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="text-lime-400">OUVERTURE DE L'AGENCE DU LUNDI AU VENDREDI DE 8H30 À 18H00</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>04 XX XX XX XX</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>contact@osmozcom.fr</span>
            </div>
            <Link
              to="/contact"
              className="bg-lime-500 hover:bg-lime-600 px-4 py-1 rounded transition-colors"
            >
              NOUS APPELER
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex">
                <div className="w-8 h-8 bg-lime-500 rounded transform rotate-12"></div>
                <div className="w-8 h-8 bg-lime-600 rounded -ml-2"></div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  OSMOZ<span className="text-lime-500">COM</span>
                </div>
                <div className="text-xs text-slate-600 uppercase tracking-wider">
                  Agence de Communication Visuelle
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/qui-sommes-nous"
                className={`text-slate-700 hover:text-lime-500 transition-colors ${
                  location.pathname === '/qui-sommes-nous' ? 'text-lime-500 font-medium' : ''
                }`}
              >
                QUI SOMMES-NOUS
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center space-x-1 text-slate-700 hover:text-lime-500 transition-colors ${
                  location.pathname === '/services' ? 'text-lime-500 font-medium' : ''
                }`}>
                  <span>NOS SERVICES</span>
                  <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                    >
                      {services.map((service, index) => (
                        <Link
                          key={index}
                          to="/services"
                          className="block px-4 py-2 text-slate-700 hover:bg-lime-50 hover:text-lime-600 transition-colors"
                        >
                          {service}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sectors Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('sectors')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center space-x-1 text-slate-700 hover:text-lime-500 transition-colors ${
                  location.pathname === '/secteurs' ? 'text-lime-500 font-medium' : ''
                }`}>
                  <span>SECTEURS D'ACTIVITÉ</span>
                  <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'sectors' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                    >
                      {sectors.map((sector, index) => (
                        <Link
                          key={index}
                          to="/secteurs"
                          className="block px-4 py-2 text-slate-700 hover:bg-lime-50 hover:text-lime-600 transition-colors"
                        >
                          {sector}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/portfolio"
                className={`text-slate-700 hover:text-lime-500 transition-colors ${
                  location.pathname === '/portfolio' ? 'text-lime-500 font-medium' : ''
                }`}
              >
                PORTFOLIO
              </Link>

              <Link
                to="/actualites"
                className={`text-slate-700 hover:text-lime-500 transition-colors ${
                  location.pathname === '/actualites' ? 'text-lime-500 font-medium' : ''
                }`}
              >
                ACTUALITÉS
              </Link>

              <Link
                to="/contact"
                className={`text-slate-700 hover:text-lime-500 transition-colors ${
                  location.pathname === '/contact' ? 'text-lime-500 font-medium' : ''
                }`}
              >
                CONTACT
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-700 hover:text-lime-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-2 space-y-1">
                <Link
                  to="/qui-sommes-nous"
                  className="block px-3 py-2 text-slate-700 hover:bg-lime-50 hover:text-lime-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  QUI SOMMES-NOUS
                </Link>
                <Link
                  to="/services"
                  className="block px-3 py-2 text-slate-700 hover:bg-lime-50 hover:text-lime-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  NOS SERVICES
                </Link>
                <Link
                  to="/secteurs"
                  className="block px-3 py-2 text-slate-700 hover:bg-lime-50 hover:text-lime-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SECTEURS D'ACTIVITÉ
                </Link>
                <Link
                  to="/portfolio"
                  className="block px-3 py-2 text-slate-700 hover:bg-lime-50 hover:text-lime-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PORTFOLIO
                </Link>
                <Link
                  to="/actualites"
                  className="block px-3 py-2 text-slate-700 hover:bg-lime-50 hover:text-lime-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ACTUALITÉS
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-slate-700 hover:bg-lime-50 hover:text-lime-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};