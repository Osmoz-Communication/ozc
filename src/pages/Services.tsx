import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const Services: React.FC = () => {
  const { services } = useContent();

  const serviceDetails = {
    'Signalétique': {
      image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Signalétique directionnelle', 'Panneaux d\'information', 'Signalétique de sécurité', 'Totem et mobilier urbain'],
      description: 'Créez une signalétique claire et efficace pour guider vos visiteurs et valoriser votre image.'
    },
    'Enseigne': {
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Enseignes lumineuses LED', 'Enseignes non-lumineuses', 'Caissons lumineux', 'Lettres découpées'],
      description: 'Donnez de la visibilité à votre entreprise avec des enseignes attractives et durables.'
    },
    'Gravure': {
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Gravure laser', 'Gravure mécanique', 'Marquage industriel', 'Plaques professionnelles'],
      description: 'Précision et finition parfaite pour tous vos besoins de gravure et marquage.'
    },
    'Impression Numérique': {
      image: 'https://images.pexels.com/photos/1043458/pexels-photo-1043458.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Grand format', 'Bâches publicitaires', 'Adhésifs muraux', 'Supports rigides'],
      description: 'Impression haute qualité sur tous supports pour vos campagnes de communication.'
    },
    'Film Solaire et Technique': {
      image: 'https://images.pexels.com/photos/2177009/pexels-photo-2177009.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Films de protection solaire', 'Films décoratifs', 'Films de sécurité', 'Vitrophanie'],
      description: 'Protection, décoration et personnalisation de vos surfaces vitrées.'
    },
    'Habillage et Décor': {
      image: 'https://images.pexels.com/photos/1029614/pexels-photo-1029614.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Habillage de véhicules', 'Décoration murale', 'Habillage de vitrine', 'Aménagement d\'espace'],
      description: 'Transformez vos espaces et véhicules en supports de communication percutants.'
    }
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
              Nos Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez notre gamme complète de services en communication visuelle, 
              de la conception à la réalisation de vos projets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const details = serviceDetails[service.title as keyof typeof serviceDetails];
              if (!details) return null;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                >
                  <div className="flex-1">
                    <img
                      src={details.image}
                      alt={service.title}
                      className="w-full h-96 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold text-slate-800 mb-6">{service.title}</h2>
                    <p className="text-xl text-slate-600 mb-8">{details.description}</p>
                    <div className="space-y-4 mb-8">
                      {details.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="text-lime-500 flex-shrink-0" size={20} />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center">
                      Demander un devis
                      <ArrowRight size={20} className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-lime-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Notre Processus</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              De l'idée à la réalisation, découvrez les étapes de notre collaboration pour garantir le succès de votre projet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Étude', description: 'Analyse de vos besoins et étude de faisabilité' },
              { step: '02', title: 'Conception', description: 'Création graphique et validation des maquettes' },
              { step: '03', title: 'Production', description: 'Fabrication en atelier avec contrôle qualité' },
              { step: '04', title: 'Installation', description: 'Pose et mise en service par nos équipes' }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-lime-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{process.title}</h3>
                <p className="text-slate-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Un projet en tête ?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Nos experts sont à votre disposition pour étudier votre projet et vous proposer 
              la solution la plus adaptée à vos besoins et votre budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Demander un devis gratuit
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                Nous appeler
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};