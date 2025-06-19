import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Phone, Mail, ArrowRight, Search, Zap } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { AnimatedButton } from '../components/AnimatedButton';

const faqItems = [
  {
    question: "Quelle est votre activité principale ?",
    answer: "Notre cœur de métier est la communication visuelle. Nous concevons, fabriquons et installons une large gamme de supports : signalétique, enseignes, habillages de vitrines et de véhicules, impressions numériques, gravures et bien plus encore.",
    category: "Activité"
  },
  {
    question: "Depuis combien de temps existez-vous ?",
    answer: "Fondée en 2014, notre agence possède plus de 10 ans d'expérience au service de l'image et du développement de nos clients.",
    category: "Entreprise"
  },
  {
    question: "La gravure est-elle réalisable sur-mesure ?",
    answer: "Absolument. Nous proposons des services de gravure laser de haute précision sur de nombreux supports (métal, bois, plastique...). Chaque projet est personnalisable pour répondre parfaitement à vos besoins.",
    category: "Services"
  },
  {
    question: "Quels sont vos délais de fabrication ?",
    answer: "Nos délais varient en fonction de la complexité et de la nature du projet. Nous nous engageons cependant à optimiser chaque étape pour vous garantir une livraison rapide sans jamais compromettre la qualité.",
    category: "Production"
  },
  {
    question: "Avez-vous la possibilité de gérer de grands volumes ?",
    answer: "Oui, notre atelier est équipé pour gérer des productions en grande série, que ce soit pour des flottes de véhicules, des réseaux de magasins ou de la signalétique pour de grands bâtiments.",
    category: "Production"
  },
  {
    question: "Comment puis-je entrer en contact avec vous ?",
    answer: "C'est très simple ! Vous pouvez nous appeler au 01 84 19 01 04, nous envoyer un email à contact@ozc.fr, ou remplir le formulaire sur notre page de contact. Nous sommes très réactifs !",
    category: "Contact"
  },
  {
    question: "Est-ce que la pose est possible en option ?",
    answer: "La pose n'est pas une option, c'est une partie intégrante de notre service pour la plupart de nos produits. Nos équipes de techniciens qualifiés assurent une installation professionnelle pour un rendu parfait.",
    category: "Services"
  },
  {
    question: "Comment établir un devis avec vous ?",
    answer: "Il vous suffit de nous contacter avec les détails de votre projet. Nous discuterons de vos besoins et vous fournirons un devis détaillé et transparent dans les plus brefs délais.",
    category: "Devis"
  },
  {
    question: "Quels types de matériaux utilisez-vous ?",
    answer: "Nous travaillons avec une large gamme de matériaux de qualité : aluminium, PVC, plexiglas, bois, métal, vinyle, textile, et bien d'autres. Le choix dépend de votre projet et de son environnement d'usage.",
    category: "Matériaux"
  },
  {
    question: "Proposez-vous des solutions éco-responsables ?",
    answer: "Oui, nous sommes soucieux de l'environnement et proposons des matériaux recyclables, des encres écologiques et optimisons nos processus pour réduire notre empreinte carbone.",
    category: "Écologie"
  },
  {
    question: "Intervenez-vous partout en France ?",
    answer: "Nous intervenons principalement en Île-de-France, mais selon la nature et l'importance du projet, nous pouvons nous déplacer dans toute la France. N'hésitez pas à nous consulter.",
    category: "Zone d'intervention"
  },
  {
    question: "Avez-vous des références clients ?",
    answer: "Oui, nous avons travaillé pour de nombreux clients dans différents secteurs : hôtellerie, industrie, commerce, événementiel... Nous pouvons vous fournir des références sur demande.",
    category: "Références"
  }
];

const FaqItem: React.FC<{ item: typeof faqItems[0]; isOpen: boolean; onClick: () => void; index: number }> = ({ item, isOpen, onClick, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      {/* Effet de lueur au hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand-500/0 via-brand-500/5 to-brand-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ filter: 'blur(8px)' }}
      />
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 mb-6 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:border-brand-200/50">
        <button
          className="w-full flex justify-between items-center text-left gap-6 p-8 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-brand-50/30 transition-all duration-300"
          onClick={onClick}
        >
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <span className="text-lg font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                  {item.question}
                </span>
                <div className="text-xs font-medium text-brand-600 mt-2 bg-brand-50 px-3 py-1 rounded-full inline-block">
                  {item.category}
                </div>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <ChevronDown className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                duration: 0.4,
                ease: "easeInOut",
                opacity: { duration: 0.3 }
              }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-8">
                <div className="bg-gradient-to-r from-slate-50 to-brand-50/50 p-6 rounded-xl border-l-4 border-brand-500">
                  <div className="text-slate-700 leading-relaxed text-lg">
                    {item.answer}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const FAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les FAQ basé sur la recherche
  const filteredFaqItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-brand-50/20 relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0">
        {/* Formes géométriques animées */}
        <motion.div 
          className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-brand-100/20 to-transparent rounded-full -translate-y-32 translate-x-48"
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-brand-200/15 to-transparent rounded-full translate-y-32 -translate-x-40"
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Lignes connectrices */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-40 h-px bg-gradient-to-r from-brand-200/40 to-transparent"
          animate={{ 
            scaleX: [0.5, 1, 0.5],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-32 h-px bg-gradient-to-l from-brand-300/40 to-transparent"
          animate={{ 
            scaleX: [0.8, 1, 0.8],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        
        {/* Points décoratifs */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`faq-dot-${i}`}
            className="absolute w-2 h-2 bg-brand-400/30 rounded-full"
            style={{
              left: `${15 + (i * 12) % 70}%`,
              top: `${20 + (i * 8) % 60}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <HeroSection 
        page="faq"
        defaultTitle="Foire Aux Questions"
        defaultSubtitle="Toutes les réponses à vos questions"
        defaultImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
      />

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête modernisé */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center bg-brand-100/80 backdrop-blur-sm text-brand-700 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-brand-200/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HelpCircle size={18} className="mr-2" />
              Centre d'Aide Osmoz Communication
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              Questions{' '}
              <span className="text-brand-600 relative">
                fréquemment posées
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-brand-200/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Retrouvez ici les réponses aux questions les plus fréquentes concernant nos services, 
              nos méthodes de travail et notre entreprise. Notre équipe a compilé ces informations 
              pour vous aider à mieux comprendre notre approche.
            </p>
          </motion.div>

          {/* Barre de recherche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
                <Search className="h-6 w-6 text-brand-600" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une question, réponse ou catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-4 text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 transition-all duration-300 placeholder-gray-400"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-brand-500 transition-colors"
                >
                  <div className="w-6 h-6 bg-gray-200 hover:bg-brand-100 rounded-full flex items-center justify-center text-xs font-bold">
                    ×
                  </div>
                </motion.button>
              )}
            </div>
            
            {/* Statistiques de recherche */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center"
              >
                <p className="text-sm text-slate-600">
                  {filteredFaqItems.length} question{filteredFaqItems.length !== 1 ? 's' : ''} trouvée{filteredFaqItems.length !== 1 ? 's' : ''} 
                  {searchQuery && (
                    <span className="font-medium text-brand-600"> pour "{searchQuery}"</span>
                  )}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Liste des FAQ modernisée */}
          <div className="relative">
            {filteredFaqItems.length > 0 ? (
              filteredFaqItems.map((item, index) => (
                <FaqItem 
                  key={index}
                  item={item} 
                  isOpen={openFaq === index} 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  index={index}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  Aucun résultat trouvé
                </h3>
                <p className="text-slate-600 mb-6">
                  Essayez d'autres termes de recherche ou parcourez toutes nos questions.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-brand-600 hover:text-brand-700 font-medium transition-colors"
                >
                  Afficher toutes les questions
                </button>
              </motion.div>
            )}
          </div>

          {/* Contact CTA modernisé */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-24 relative"
          >
            {/* Fond avec dégradé vert et éléments décoratifs */}
            <div className="relative bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 rounded-3xl p-12 text-center text-white overflow-hidden">
              {/* Fond décoratif moderne */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-600/90 via-brand-500/95 to-brand-700/90"></div>
                
                {/* Éléments décoratifs géométriques - style page d'accueil */}
                <motion.div 
                  className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"
                  animate={{ 
                    scale: [1, 1.05, 1], 
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/8 to-transparent rounded-full translate-y-24 -translate-x-24"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 90, 180]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Lignes connectrices subtiles */}
                <motion.div
                  className="absolute top-1/3 left-1/4 w-32 h-px bg-gradient-to-r from-white/30 to-transparent"
                  animate={{ 
                    scaleX: [0.5, 1, 0.5],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-1/3 right-1/4 w-24 h-px bg-gradient-to-l from-white/25 to-transparent"
                  animate={{ 
                    scaleX: [0.8, 1, 0.8],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                
                {/* Points décoratifs - style bulles */}
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.div
                    key={`cta-bubble-${i}`}
                    className="absolute w-3 h-3 bg-white/20 rounded-full"
                    style={{
                      left: `${20 + (i * 15) % 60}%`,
                      top: `${25 + (i * 12) % 50}%`
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.3, 0.7, 0.3],
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Bulles plus grandes qui flottent */}
                <motion.div
                  className="absolute top-1/4 right-1/3 w-6 h-6 bg-white/15 rounded-full"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-white/20 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    x: [0, -8, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </div>
              
              <div className="relative z-10">
                {/* Icône centrale */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border border-white/30"
                >
                  <HelpCircle className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Vous n'avez pas trouvé votre réponse ?
                </h3>
                <p className="text-white/90 mb-10 text-xl leading-relaxed max-w-2xl mx-auto">
                  Notre équipe d'experts est là pour répondre à toutes vos questions spécifiques 
                  sur vos projets de communication visuelle.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <AnimatedButton
                    to="/contact"
                    variant="primary"
                    size="lg"
                    className="bg-brand-800 text-white hover:bg-brand-900 shadow-lg hover:shadow-xl border-0"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Nous contacter
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </AnimatedButton>
                  
                  <AnimatedButton
                    href="tel:0184190104"
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-brand-600 backdrop-blur-sm bg-white/10"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    01 84 19 01 04
                  </AnimatedButton>
                </div>
                
                {/* Badge de réactivité */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/30"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Réponse garantie sous 24h
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 