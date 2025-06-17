import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Calendar, ArrowRight } from 'lucide-react';

export const News: React.FC = () => {
  const { newsArticles } = useContent();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
              Actualités
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Restez informé de nos dernières actualités, nouveautés et réalisations. 
              Découvrez l'évolution de notre entreprise et de notre secteur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {newsArticles.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-lime-50 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 text-lime-600 mb-4">
                    <Calendar size={20} />
                    <span className="text-sm font-medium">À la une</span>
                  </div>
                  <h2 className="text-4xl font-bold text-slate-800 mb-6">
                    {newsArticles[0].title}
                  </h2>
                  <p className="text-xl text-slate-600 mb-8">
                    {newsArticles[0].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      {formatDate(newsArticles[0].date || '')}
                    </span>
                    <button className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center">
                      Lire la suite
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
                <div className="relative h-96 lg:h-auto">
                  <img
                    src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt={newsArticles[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Toutes nos actualités</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Suivez l'évolution de notre entreprise, nos innovations et nos projets marquants.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`https://images.pexels.com/photos/${1043458 + index}/pexels-photo-${1043458 + index}.jpeg?auto=compress&cs=tinysrgb&w=800`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-lime-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Nouveauté
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-slate-500 mb-3">
                    <Calendar size={16} />
                    <span className="text-sm">{formatDate(article.date || '')}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-lime-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <button className="text-lime-600 hover:text-lime-700 font-medium transition-colors inline-flex items-center">
                    Lire l'article
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Charger plus d'articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-lime-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Restez informé</h2>
            <p className="text-xl text-lime-100 mb-8 max-w-3xl mx-auto">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités, 
              conseils et réalisations directement dans votre boîte mail.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                S'inscrire
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};