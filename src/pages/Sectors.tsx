import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { Building, Factory, Store, Calendar, Mouse as Museum, Hotel } from 'lucide-react';

export const Sectors: React.FC = () => {
  const { sectors } = useContent();

  const sectorDetails = {
    'Hôtellerie': {
      icon: Hotel,
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Créez une expérience client unique avec une signalétique élégante et fonctionnelle adaptée au secteur hôtelier.',
      services: ['Signalétique d\'accueil', 'Panneaux directionnels', 'Enseignes extérieures', 'Décoration d\'intérieur'],
      projects: ['Hôtel Intercontinental Lyon', 'Resort Les Deux Alpes', 'Château de Bagnols']
    },
    'Industrie': {
      icon: Factory,
      image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Sécurité et efficacité au cœur de nos solutions industrielles avec une signalétique robuste et conforme.',
      services: ['Signalétique de sécurité', 'Marquage au sol', 'Panneaux d\'information', 'Habillage de machines'],
      projects: ['Usine Michelin', 'Site Arkema', 'Plateforme logistique Amazon']
    },
    'Tertiaire': {
      icon: Building,
      image: 'https://images.pexels.com/photos/2977304/pexels-photo-2977304.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Valorisez votre image corporate avec des solutions de communication visuelle professionnelles.',
      services: ['Signalétique de bureaux', 'Enseignes d\'entreprise', 'Habillage de façades', 'Décoration d\'espaces'],
      projects: ['Siège social Crédit Agricole', 'Immeuble Part-Dieu Business', 'Campus Université Lyon 3']
    },
    'Commerce': {
      icon: Store,
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Attirez et guidez vos clients avec des solutions retail percutantes et attractives.',
      services: ['Enseignes de magasins', 'PLV et mobilier', 'Habillage de vitrines', 'Signalétique intérieure'],
      projects: ['Centre commercial Confluence', 'Boutique Hermès Lyon', 'Réseau pharmacies Giphar']
    },
    'Événementiel': {
      icon: Calendar,
      image: 'https://images.pexels.com/photos/2608513/pexels-photo-2608513.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Donnez de l\'impact à vos événements avec des supports de communication temporaires et mobiles.',
      services: ['Stands d\'exposition', 'Banderoles et kakémonos', 'Habillage d\'événements', 'Supports mobiles'],
      projects: ['Salon Pollutec', 'Festival Lumières Lyon', 'Congrès médical Part-Dieu']
    },
    'Musée et Parc à Thème': {
      icon: Museum,
      image: 'https://images.pexels.com/photos/2563917/pexels-photo-2563917.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Créez des parcours immersifs et pédagogiques avec une signalétique adaptée au secteur culturel.',
      services: ['Signalétique muséale', 'Panneaux pédagogiques', 'Mobilier d\'exposition', 'Habillage thématique'],
      projects: ['Musée des Confluences', 'Parc Walibi Rhône-Alpes', 'Aquarium de Lyon']
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
              Secteurs d'Activité
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nous adaptons nos solutions de communication visuelle aux spécificités 
              et aux enjeux de chaque secteur d'activité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sectors Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {sectors.map((sector, index) => {
              const details = sectorDetails[sector.title as keyof typeof sectorDetails];
              if (!details) return null;

              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={details.image}
                      alt={sector.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center">
                      <details.icon className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{sector.title}</h3>
                    <p className="text-slate-600 mb-4">{details.description}</p>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-lime-600">Services principaux :</div>
                      <ul className="text-sm text-slate-600 space-y-1">
                        {details.services.slice(0, 2).map((service, serviceIndex) => (
                          <li key={serviceIndex}>• {service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Sectors */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {sectors.map((sector, index) => {
              const details = sectorDetails[sector.title as keyof typeof sectorDetails];
              if (!details) return null;

              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 bg-white rounded-2xl p-8 shadow-lg`}
                >
                  <div className="flex-1">
                    <img
                      src={details.image}
                      alt={sector.title}
                      className="w-full h-96 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center">
                        <details.icon className="text-white" size={32} />
                      </div>
                      <h2 className="text-4xl font-bold text-slate-800">{sector.title}</h2>
                    </div>
                    <p className="text-xl text-slate-600 mb-8">{details.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Nos services</h4>
                        <ul className="space-y-2">
                          {details.services.map((service, serviceIndex) => (
                            <li key={serviceIndex} className="text-slate-600 flex items-center">
                              <div className="w-2 h-2 bg-lime-500 rounded-full mr-3"></div>
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Références</h4>
                        <ul className="space-y-2">
                          {details.projects.map((project, projectIndex) => (
                            <li key={projectIndex} className="text-slate-600 flex items-center">
                              <div className="w-2 h-2 bg-lime-500 rounded-full mr-3"></div>
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-lime-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">Une Expertise Transversale</h2>
            <p className="text-xl text-lime-100 max-w-4xl mx-auto mb-12">
              Quel que soit votre secteur d'activité, nous mettons notre expertise technique et créative 
              au service de vos projets de communication visuelle. Notre connaissance approfondie des 
              contraintes et opportunités de chaque secteur nous permet de vous proposer des solutions 
              parfaitement adaptées.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-lime-100">Clients multi-secteurs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">15</div>
                <div className="text-lime-100">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-lime-100">Solutions sur-mesure</div>
              </div>
            </div>
          </motion.div>
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
            <h2 className="text-4xl font-bold mb-6">Votre Secteur, Notre Expertise</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discutons de vos enjeux sectoriels et découvrez comment nous pouvons adapter 
              nos solutions à vos besoins spécifiques.
            </p>
            <button className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Parler à un expert
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};