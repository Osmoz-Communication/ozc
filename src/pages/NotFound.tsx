import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-32 h-32 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <FaExclamationTriangle className="w-16 h-16 text-brand-500" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              404
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
            Page Introuvable
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            Oups ! La page que vous recherchez n'existe pas.
          </p>
          <p className="text-lg text-slate-500">
            Elle a peut-être été déplacée, supprimée ou vous avez saisi une URL incorrecte.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-4 mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FaHome className="w-5 h-5 mr-2" />
              Retour à l'accueil
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaSearch className="w-5 h-5 mr-2" />
              Nous contacter
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Liens Utiles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <Link to="/services" className="text-brand-600 hover:text-brand-700 transition-colors">
              Nos Services
            </Link>
            <Link to="/secteurs" className="text-brand-600 hover:text-brand-700 transition-colors">
              Nos Secteurs
            </Link>
            <Link to="/portfolio" className="text-brand-600 hover:text-brand-700 transition-colors">
              Portfolio
            </Link>
            <Link to="/qui-sommes-nous" className="text-brand-600 hover:text-brand-700 transition-colors">
              Qui sommes-nous
            </Link>
            <Link to="/actualites" className="text-brand-600 hover:text-brand-700 transition-colors">
              Actualités
            </Link>
            <Link to="/contact" className="text-brand-600 hover:text-brand-700 transition-colors">
              Contact
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-500">
            Osmoz Communication - Votre agence de communication visuelle à Coulommiers
          </p>
        </motion.div>
      </div>
    </div>
  );
}; 