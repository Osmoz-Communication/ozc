import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

interface PortfolioGalleryProps {
  category: string;
  title: string;
  subtitle: string;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ 
  category, 
  title, 
  subtitle 
}) => {
  const { portfolioItems } = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filtrer les items par catégorie avec une recherche plus flexible
  let filteredItems = portfolioItems.filter(item => item.category === category);
  
  // Si aucun élément ne correspond exactement, essayer une correspondance partielle
  if (filteredItems.length === 0) {
    filteredItems = portfolioItems.filter(item => 
      item.category && item.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  
  // Si toujours rien, prendre des éléments génériques
  if (filteredItems.length === 0) {
    filteredItems = portfolioItems.slice(0, 5);
  }
  
  // Prendre les 5 premiers items
  const displayItems = filteredItems.slice(0, 5);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, displayItems.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? Math.max(0, displayItems.length - 3) : prev - 1
    );
  };

  return (
    <section className="py-20 bg-slate-50 relative">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 w-2 h-2 bg-brand-400/60 rounded-full"
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 right-32 w-3 h-3 bg-brand-300/50 rounded-full"
          animate={{ x: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Carrousel Portfolio */}
        <div className="relative max-w-6xl mx-auto">
          {/* Flèches de navigation discrètes */}
          {displayItems.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-12 lg:-left-16 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 p-2 lg:p-3 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 z-10 hidden md:block border border-gray-200/50"
                aria-label="Réalisation précédente"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-12 lg:-right-16 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 p-2 lg:p-3 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 z-10 hidden md:block border border-gray-200/50"
                aria-label="Réalisation suivante"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
          
          <div className="overflow-hidden rounded-2xl">
            <motion.div 
              className="flex"
              animate={{ 
                x: `${-currentSlide * (100 / 3)}%` 
              }}
              transition={{ 
                duration: 0.6,
                ease: "easeInOut" 
              }}
            >
              {displayItems.map((item, index) => (
                <Link
                  key={`gallery-${item.id}`}
                  to="/portfolio"
                  className="w-1/3 flex-shrink-0 px-3 group cursor-pointer"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
                      <img
                        src={item.image}
                        alt={`${item.title} - Réalisation Osmoz Communication`}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <div className="text-white text-center">
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-gray-300">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>
          
          {/* Indicateurs */}
          {displayItems.length > 3 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.max(1, displayItems.length - 2) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-brand-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Aller à la réalisation ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="/portfolio"
            className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            Voir toutes nos réalisations
          </Link>
        </motion.div>
      </div>
    </section>
  );
}; 