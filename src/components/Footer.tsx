import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedButton } from './AnimatedButton';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulation de l'envoi
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <footer className="bg-slate-800 text-white">
      {/* Newsletter Section */}
      <div className="bg-white relative overflow-hidden border-t border-gray-100">
        {/* Fond décoratif moderne */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-brand-50/30"></div>
          
          {/* Éléments décoratifs géométriques */}
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-100/20 to-transparent rounded-full -translate-y-32 translate-x-32"
            animate={{ 
              scale: [1, 1.05, 1], 
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-brand-200/15 to-transparent rounded-full translate-y-24 -translate-x-24"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Lignes connectrices subtiles */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-32 h-px bg-gradient-to-r from-brand-200/60 to-transparent"
            animate={{ 
              scaleX: [0.5, 1, 0.5],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-24 h-px bg-gradient-to-l from-brand-300/50 to-transparent"
            animate={{ 
              scaleX: [0.8, 1, 0.8],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          
          {/* Points décoratifs */}
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={`newsletter-dot-${i}`}
              className="absolute w-2 h-2 bg-brand-300/40 rounded-full"
              style={{
                left: `${20 + (i * 15) % 60}%`,
                top: `${25 + (i * 10) % 50}%`
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge moderne */}
            <motion.div 
              className="inline-flex items-center bg-brand-100/80 backdrop-blur-sm text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-brand-200/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Mail size={16} className="mr-2" />
              Newsletter Osmoz Communication
            </motion.div>
            
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Restez informé de nos{' '}
              <span className="text-brand-600 relative">
                dernières réalisations
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-brand-200/60"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Recevez nos actualités, conseils d'experts et projets inspirants directement dans votre boîte mail
            </motion.p>
            
            <motion.div 
              className="max-w-lg mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    onSubmit={handleNewsletterSubmit}
                    className="relative"
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative flex rounded-2xl bg-white shadow-lg border border-gray-200/50 overflow-hidden backdrop-blur-sm">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre.email@exemple.com"
                        className="flex-1 px-6 py-4 text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none text-lg"
                        required
                      />
                      <AnimatedButton
                        type="submit"
                        disabled={isLoading}
                        variant="primary"
                        className="px-8 py-4"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Send size={18} />
                        )}
                        <span className="hidden sm:inline font-semibold">S'abonner</span>
                      </AnimatedButton>
                    </div>
                    
                    {/* Bordure animée */}
                    <motion.div
                      className="absolute inset-0 border-2 border-brand-300/0 rounded-2xl pointer-events-none"
                      whileHover={{ 
                        borderColor: "rgba(152, 194, 29, 0.3)",
                        boxShadow: "0 0 20px rgba(152, 194, 29, 0.1)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg border border-green-200/50 p-8"
                  >
                    <div className="flex items-center justify-center gap-3 text-green-700 mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle size={32} className="text-green-500" />
                      </motion.div>
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Inscription confirmée !</h4>
                    <p className="text-slate-600">Merci pour votre confiance. Vous recevrez bientôt nos actualités.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Note de confidentialité */}
              <motion.p 
                className="text-xs text-slate-500 mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                🔒 Vos données sont protégées. Pas de spam, désinscription en un clic.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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
            <ul className="space-y-1">
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
            <ul className='space-y-1'>
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
            <div className='space-y-2'>
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
        <div className="border-t border-gray-700 mt-12 py-4">
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
              <Link to="/politique-confidentialite" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};