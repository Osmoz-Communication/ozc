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

  // Mapping for slugs
  const servicesSlugs = {
    'Signalétique': 'signaletique',
    'Enseigne': 'enseigne',
    'Gravure': 'gravure',
    'Impression Numérique': 'impression-numerique',
    'Film Solaire et Technique': 'film-solaire-technique',
    'Habillage et Décor': 'habillage-decor',
    'Print': 'print',
    'Objet': 'objet'
  };

  const sectorsSlugs = {
    'Hôtellerie': 'hotellerie',
    'Industrie': 'industrie',
    'Tertiaire': 'tertiaire',
    'Commerce': 'commerce',
    'Événementiel': 'evenementiel',
    'Musée et Parc à Thème': 'musee-parc'
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-800 text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="text-brand-400">DU LUNDI AU VENDREDI DE 8H30 À 18H30</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>01 84 19 01 04</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>contact@ozc.fr</span>
            </div>
            <a
              href="tel:0184190104"
              className="bg-brand-500 hover:bg-brand-600 px-4 py-1 rounded transition-colors"
            >
              NOUS APPELER
            </a>
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
            <Link to="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="flex">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-brand-500 rounded transform rotate-12"></div>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-brand-600 rounded -ml-2"></div>
              </div>
              <div>
                <div className="text-lg md:text-2xl font-bold text-slate-800">
                  OSMOZ<span className="text-brand-500">COM</span>
                </div>
                <div className="text-xs text-slate-600 uppercase tracking-wider hidden md:block">
                  Agence de Communication Visuelle
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center space-x-6 xl:space-x-8 mx-auto">
                <Link
                  to="/qui-sommes-nous"
                  className={`font-semibold text-slate-700 hover:text-brand-500 transition-colors ${
                    location.pathname === '/qui-sommes-nous' ? 'text-brand-500' : ''
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
                  <Link to="/services" className={`flex items-center space-x-1 font-semibold text-slate-700 hover:text-brand-500 transition-colors ${
                    location.pathname.startsWith('/services') ? 'text-brand-500' : ''
                  }`}>
                    <span>NOS SERVICES</span>
                    <ChevronDown size={16} />
                  </Link>
                  <AnimatePresence>
                    {activeDropdown === 'services' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                      >
                        {services.map((service, index) => (
                          <Link
                            key={index}
                            to={`/services/${servicesSlugs[service as keyof typeof servicesSlugs]}`}
                            className="block px-4 py-2 text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
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
                  <Link to="/secteurs" className={`flex items-center space-x-1 font-semibold text-slate-700 hover:text-brand-500 transition-colors ${
                    location.pathname.startsWith('/secteurs') ? 'text-brand-500' : ''
                  }`}>
                    <span>SECTEURS D'ACTIVITÉ</span>
                    <ChevronDown size={16} />
                  </Link>
                  <AnimatePresence>
                    {activeDropdown === 'sectors' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                      >
                        {sectors.map((sector, index) => (
                          <Link
                            key={index}
                            to={`/secteurs/${sectorsSlugs[sector as keyof typeof sectorsSlugs]}`}
                            className="block px-4 py-2 text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
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
                  className={`font-semibold text-slate-700 hover:text-brand-500 transition-colors ${
                    location.pathname === '/portfolio' ? 'text-brand-500' : ''
                  }`}
                >
                  PORTFOLIO
                </Link>

                <Link
                  to="/blog"
                  className={`font-semibold text-slate-700 hover:text-brand-500 transition-colors ${
                    location.pathname.startsWith('/blog') ? 'text-brand-500' : ''
                  }`}
                >
                  BLOG
                </Link>

                <Link
                  to="/contact"
                  className={`font-semibold text-slate-700 hover:text-brand-500 transition-colors ${
                    location.pathname === '/contact' ? 'text-brand-500' : ''
                  }`}
                >
                  CONTACT
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-700 hover:text-brand-500"
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
              className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
            >
              <div className="px-4 py-4 space-y-2">
                <Link
                  to="/qui-sommes-nous"
                  className="block px-4 py-3 text-center text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  QUI SOMMES-NOUS
                </Link>
                <Link
                  to="/services"
                  className="block px-4 py-3 text-center text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  NOS SERVICES
                </Link>
                <Link
                  to="/secteurs"
                  className="block px-4 py-3 text-center text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SECTEURS D'ACTIVITÉ
                </Link>
                <Link
                  to="/portfolio"
                  className="block px-4 py-3 text-center text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PORTFOLIO
                </Link>
                <Link
                  to="/blog"
                  className="block px-4 py-3 text-center text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BLOG
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-3 text-center text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </Link>
                
                {/* Mobile Contact Info */}
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-slate-600 mb-2">
                      <Phone size={16} />
                      <span className="font-medium">01 84 19 01 04</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-slate-600 mb-3">
                      <Mail size={16} />
                      <span>contact@ozc.fr</span>
                    </div>
                    <div className="text-sm text-brand-600 font-medium">
                      Du lundi au vendredi de 8h30 à 18h30
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};