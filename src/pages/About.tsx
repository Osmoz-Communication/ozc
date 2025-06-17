import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Lightbulb } from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque projet, en alliant créativité et technicité pour des résultats exceptionnels.'
    },
    {
      icon: Users,
      title: 'Proximité',
      description: 'Notre approche humaine privilégie l\'écoute et l\'accompagnement personnalisé de nos clients.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Nous investissons constamment dans les nouvelles technologies et techniques pour rester à la pointe.'
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'La qualité est au cœur de nos préoccupations, de la conception à la livraison finale.'
    }
  ];

  const team = [
    {
      name: 'Pierre Martin',
      role: 'Directeur Général',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: '15 ans d\'expérience dans la communication visuelle'
    },
    {
      name: 'Sophie Dubois',
      role: 'Directrice Créative',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Experte en design graphique et signalétique'
    },
    {
      name: 'Marc Leroy',
      role: 'Responsable Production',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Maître dans l\'art de la fabrication et de l\'installation'
    }
  ];

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
              Qui sommes-nous ?
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez l'histoire, les valeurs et l'équipe qui font la force d'Osmoz Communication depuis plus de 15 ans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Notre Histoire</h2>
              <div className="space-y-6 text-slate-600 text-lg">
                <p>
                  Fondée en 2009 par Pierre Martin, Osmoz Communication est née d'une vision claire : 
                  révolutionner la communication visuelle en alliant créativité, innovation et savoir-faire technique.
                </p>
                <p>
                  Depuis nos débuts modestes dans un petit atelier lyonnais, nous avons grandi pour devenir 
                  l'une des références régionales en matière de signalétique, d'enseignes et de communication visuelle.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers de compter plus de 500 clients satisfaits et d'avoir réalisé 
                  plus de 1000 projets dans toute la région Auvergne-Rhône-Alpes.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Notre atelier"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-lime-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Années d'expérience</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-lime-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Nos Valeurs</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ces valeurs guident chacune de nos actions et nous permettent de construire des relations durables avec nos clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-500 text-white rounded-full mb-6">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Notre Équipe</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Une équipe passionnée et expérimentée, dédiée à la réussite de vos projets de communication visuelle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{member.name}</h3>
                  <div className="text-lime-600 font-medium mb-3">{member.role}</div>
                  <p className="text-slate-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8">Notre Mission</h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              "Accompagner nos clients dans leur stratégie de communication visuelle en créant des solutions 
              innovantes, durables et impactantes qui renforcent leur image de marque et leur visibilité."
            </p>
            <div className="mt-8 text-lime-400 text-lg font-medium">
              - Pierre Martin, Directeur Général
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};