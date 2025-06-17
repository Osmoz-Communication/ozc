import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCertificate, FaLightbulb, FaHandshake, FaPalette, FaRocket, FaUsers, FaEye, FaHeart, FaStar } from 'react-icons/fa';
import { HeroSection } from '../components/HeroSection';

export const About: React.FC = () => {
  const values = [
    {
      icon: FaPalette,
      title: "Créativité",
      description: "Nous transformons vos idées en créations visuelles uniques et mémorables"
    },
    {
      icon: FaCertificate,
      title: "Qualité",
      description: "Des matériaux premium et des finitions irréprochables pour un résultat durable"
    },
    {
      icon: FaRocket,
      title: "Innovation",
      description: "Technologies de pointe et techniques avant-gardistes au service de vos projets"
    },
    {
      icon: FaHandshake,
      title: "Engagement",
      description: "Un partenariat de confiance basé sur l'écoute et la réactivité"
    }
  ];

  const stats = [
    { number: "500+", label: "Projets réalisés", icon: FaEye },
    { number: "15+", label: "Années d'expérience", icon: FaCertificate },
    { number: "98%", label: "Clients satisfaits", icon: FaHeart },
    { number: "24h", label: "Délai de réponse", icon: FaRocket }
  ];

  const team = [
    {
      name: "Équipe Créative",
      role: "Conception & Design",
      description: "Notre équipe de designers expérimentés transforme vos idées en concepts visuels innovants.",
      image: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    },
    {
      name: "Équipe Production",
      role: "Fabrication & Réalisation",
      description: "Nos techniciens qualifiés maîtrisent les dernières technologies pour une production de qualité.",
      image: "https://images.pexels.com/photos/5691607/pexels-photo-5691607.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    },
    {
      name: "Équipe Pose",
      role: "Installation & Service",
      description: "Nos équipes de pose garantissent une installation professionnelle sur tous types de supports.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
    }
  ];

  const expertise = [
    {
      title: "Signalétique sur-mesure",
      description: "Conception et fabrication de signalétique intérieure et extérieure adaptée à votre image de marque.",
      features: ["Design personnalisé", "Matériaux durables", "Installation professionnelle"]
    },
    {
      title: "Communication visuelle",
      description: "Solutions complètes pour valoriser votre entreprise : de la création à la réalisation.",
      features: ["Identité visuelle", "Supports print", "Habillage d'espaces"]
    },
    {
      title: "Innovation technique",
      description: "Technologies de pointe pour des réalisations qui marquent les esprits.",
      features: ["Gravure laser", "Impression numérique", "Films techniques"]
    }
  ];

  return (
    <div>
      <HeroSection page="about" />
      
      {/* Introduction Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full -translate-y-48 translate-x-48 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <FaMapMarkerAlt className="text-brand-500 text-2xl mr-3" />
                <span className="text-brand-600 font-semibold text-lg">Made in Coulommiers, Seine-et-Marne</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Votre partenaire en communication visuelle depuis 2014
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Basée à Coulommiers en Seine-et-Marne, <strong>Osmoz Communication</strong> est votre agence spécialisée 
                dans la communication visuelle. Nous concevons, fabriquons et installons tous vos supports de communication 
                avec un savoir-faire artisanal et des technologies de pointe.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaLightbulb className="text-brand-500 text-xl mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Innovation constante</h3>
                    <p className="text-slate-600">Nous investissons régulièrement dans les dernières technologies pour vous offrir des solutions toujours plus performantes.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUsers className="text-brand-500 text-xl mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Équipe dédiée</h3>
                    <p className="text-slate-600">Une équipe passionnée et expérimentée qui vous accompagne de la conception à la réalisation de vos projets.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
                  alt="Équipe Osmoz Communication"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-600/20 to-transparent rounded-2xl"></div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 text-2xl mr-3" />
                    <div>
                      <div className="font-bold text-slate-800">98% satisfaction</div>
                      <div className="text-sm text-slate-600">clients satisfaits</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Nos Valeurs</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Les principes qui guident notre travail au quotidien et font la différence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-500 transition-all duration-300 transform group-hover:scale-110">
                  <value.icon className="w-10 h-10 text-brand-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-3 h-3 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-white/15 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/25 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-400 rounded-full -translate-x-32 translate-y-32 opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Osmoz en chiffres</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Des résultats qui témoignent de notre expertise et de votre confiance
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Notre Expertise</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Des domaines de compétence complémentaires pour répondre à tous vos besoins
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="text-2xl font-semibold text-slate-800 mb-4 group-hover:text-brand-600 transition-colors">{item.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{item.description}</p>
                <ul className="space-y-3">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-700">
                      <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Notre Équipe</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Des professionnels passionnés qui donnent vie à vos projets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{member.name}</h3>
                  <p className="text-brand-600 font-medium mb-4">{member.role}</p>
                  <p className="text-slate-600 leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à donner vie à votre projet ?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons vous accompagner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Demander un devis
              </a>
              <a
                href="tel:0184190104"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                01 84 19 01 04
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;