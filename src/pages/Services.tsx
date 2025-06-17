import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';

export const Services: React.FC = () => {
  const { services } = useContent();

  const serviceDetails = {
    'Signalétique': {
      slug: 'signaletique',
      image: 'https://images.pexels.com/photos/2422277/pexels-photo-2422277.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Signalétique directionnelle', 'Panneaux d\'information', 'Signalétique de sécurité', 'Totem et mobilier urbain'],
      description: 'Créez une signalétique claire et efficace pour guider vos visiteurs et valoriser votre image.'
    },
    'Enseigne': {
      slug: 'enseigne',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Enseignes lumineuses LED', 'Enseignes non-lumineuses', 'Caissons lumineux', 'Lettres découpées'],
      description: 'Donnez de la visibilité à votre entreprise avec des enseignes attractives et durables.'
    },
    'Gravure': {
      slug: 'gravure',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Gravure laser', 'Gravure mécanique', 'Marquage industriel', 'Plaques professionnelles'],
      description: 'Précision et finition parfaite pour tous vos besoins de gravure et marquage.'
    },
    'Impression Numérique': {
      slug: 'impression-numerique',
      image: 'https://images.pexels.com/photos/1043458/pexels-photo-1043458.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Grand format', 'Bâches publicitaires', 'Adhésifs muraux', 'Supports rigides'],
      description: 'Impression haute qualité sur tous supports pour vos campagnes de communication.'
    },
    'Film Solaire et Technique': {
      slug: 'film-solaire',
      image: 'https://images.pexels.com/photos/2177009/pexels-photo-2177009.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Films de protection solaire', 'Films décoratifs', 'Films de sécurité', 'Vitrophanie'],
      description: 'Protection, décoration et personnalisation de vos surfaces vitrées.'
    },
    'Habillage et Décor': {
      slug: 'habillage-decor',
      image: 'https://images.pexels.com/photos/1029614/pexels-photo-1029614.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Habillage de véhicules', 'Décoration murale', 'Habillage de vitrine', 'Aménagement d\'espace'],
      description: 'Transformez vos espaces et véhicules en supports de communication percutants.'
    },
    'Print': {
      slug: 'print',
      image: 'https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Cartes de visite', 'Brochures', 'Affiches', 'Supports marketing'],
      description: 'Solutions d\'impression complètes pour tous vos supports de communication.'
    },
    'Objet': {
      slug: 'objet',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Objets publicitaires', 'Cadeaux d\'entreprise', 'Goodies personnalisés', 'Textiles'],
      description: 'Objets promotionnels personnalisés pour renforcer votre image de marque.'
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection 
        page="services"
        defaultTitle="Nos Services"
        defaultSubtitle="Solutions complètes en communication visuelle"
        defaultImage="https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
      />

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
                          <CheckCircle className="text-brand-500 flex-shrink-0" size={20} />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        to={`/services/${details.slug}`}
                        className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                      >
                        En savoir plus
                        <ArrowRight size={20} className="ml-2" />
                      </Link>
                      {service.title === 'Signalétique' && (
                        <a 
                          href="https://ozc-signaletique.fr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                        >
                          OZC Signalétique
                          <ArrowRight size={20} className="ml-2" />
                        </a>
                      )}
                      <Link 
                        to="/contact"
                        className="border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center"
                      >
                        Demander un devis
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-brand-50">
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
                <div className="w-16 h-16 bg-brand-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
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
              <Link 
                to="/contact"
                className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Demander un devis gratuit
              </Link>
              <a 
                href="tel:0184190104"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Nous appeler
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};