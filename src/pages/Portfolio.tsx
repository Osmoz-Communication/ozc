import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Filter, X } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { portfolioItems } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const categories = ['all', ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Notre Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez nos réalisations et laissez-vous inspirer par la diversité 
              et la qualité de nos projets de communication visuelle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-lime-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-slate-700 hover:bg-lime-100 hover:text-lime-700'
                }`}
              >
                {category === 'all' ? 'Tous les projets' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                        <div className="mt-3 inline-block bg-lime-500 text-white px-3 py-1 rounded-full text-xs">
                          {item.category}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                    <div className="mt-3 inline-block bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <Filter className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Aucun projet trouvé</h3>
              <p className="text-slate-600">Essayez de sélectionner une autre catégorie</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X size={20} />
                </button>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-96 object-cover rounded-t-xl"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-slate-800">{selectedItem.title}</h2>
                  <div className="bg-lime-100 text-lime-700 px-4 py-2 rounded-full text-sm font-medium">
                    {selectedItem.category}
                  </div>
                </div>
                <p className="text-xl text-slate-600 mb-8">{selectedItem.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Détails du projet</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li><strong>Secteur :</strong> {selectedItem.category}</li>
                      <li><strong>Services :</strong> Conception, Production, Installation</li>
                      <li><strong>Durée :</strong> 3 semaines</li>
                      <li><strong>Matériaux :</strong> Aluminium, Plexiglas, LED</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Objectifs atteints</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Amélioration de la visibilité</li>
                      <li>• Renforcement de l'image de marque</li>
                      <li>• Satisfaction client exceptionnelle</li>
                      <li>• Respect des délais et du budget</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Votre Projet, Notre Prochain Chef-d'œuvre</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Inspiré par nos réalisations ? Discutons de votre projet et créons ensemble 
              quelque chose d'exceptionnel pour votre entreprise.
            </p>
            <button className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Démarrer mon projet
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};