import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaPalette, FaRocket, FaCertificate, FaUsers, FaEye, FaBullhorn, FaQuoteLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const logos = [
  '/logos/logo_aviva.png',
  '/logos/logo_disney-1.png',
  '/logos/logo_ikea.png',
  '/logos/logo_ineo_equans.png',
  '/logos/logo_intermarche.png',
  '/logos/logo_jean_lefebvre-1.png',
  '/logos/logo_kms.png',
  '/logos/logo_lancaster-1.png',
  '/logos/logo_louvre.png',
  '/logos/logo_mairie_de_paris.png',
  '/logos/logo_mama_shelter.png',
  '/logos/logo_meilleur_taux.png',
  '/logos/logo_slysmile.png'
];

export const Home: React.FC = () => {
  const { slides, services, portfolioItems } = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const features = [
    {
      icon: FaPalette,
      title: "Créativité & Design",
      description: "Nos graphistes créent des visuels uniques qui marquent les esprits et renforcent votre identité de marque."
    },
    {
      icon: FaRocket,
      title: "Réactivité & Efficacité",
      description: "Délais courts respectés, service express disponible et équipe réactive pour tous vos projets urgents."
    },
    {
      icon: FaCertificate,
      title: "Qualité Premium",
      description: "Matériaux haut de gamme, finitions soignées et garanties étendues pour des réalisations durables."
    },
    {
      icon: FaUsers,
      title: "Accompagnement Expert",
      description: "Conseil personnalisé de A à Z : étude, création, production, pose et service après-vente."
    }
  ];

  const stats = [
    { number: "500+", label: "Projets réalisés", sublabel: "en Seine-et-Marne", icon: FaRocket },
    { number: "15+", label: "Années d'expérience", sublabel: "à Coulommiers", icon: FaCertificate },
    { number: "98%", label: "Clients satisfaits", sublabel: "nous recommandent", icon: FaUsers },
    { number: "24h", label: "Délai de réponse", sublabel: "garanti", icon: FaEye }
  ];

  const testimonials = [
    {
      text: "Osmoz Communication a transformé notre identité visuelle. Un travail exceptionnel et un service irréprochable !",
      author: "Marie Dubois",
      company: "Restaurant Le Gourmet",
      location: "Coulommiers"
    },
    {
      text: "Réactivité, qualité et conseils d'experts. Nous recommandons vivement pour tous vos projets de signalétique.",
      author: "Pierre Martin",
      company: "Garage Martin Auto",
      location: "Meaux"
    },
    {
      text: "Équipe professionnelle et créative. Nos enseignes attirent désormais tous les regards !",
      author: "Sophie Laurent",
      company: "Boutique Tendance",
      location: "Provins"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      <title>Osmoz Communication Coulommiers - Signalétique, Enseignes, Impression 77</title>
      <meta name="description" content="Agence de communication visuelle à Coulommiers (77). Signalétique, enseignes lumineuses, impression grand format, gravure laser. Devis gratuit 24h." />
      <meta name="keywords" content="signalétique coulommiers, enseigne lumineuse 77, impression numérique seine-et-marne, communication visuelle coulommiers, gravure laser 77" />

      {/* Hero Slider */}
      <section 
        className="relative h-[50vh] md:h-[55vh] overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40"></div>
                </div>

                <div className="relative h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-3xl">
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-brand-300 text-lg font-medium mb-4"
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <Link
                          to={slide.buttonLink}
                          className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group inline-flex items-center justify-center"
                        >
                          {slide.buttonText}
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                          to="/contact"
                          className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
                        >
                          Devis gratuit 24h
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-brand-500 w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows - only visible on hover */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
          aria-label="Slide précédent"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
          aria-label="Slide suivant"
        >
          <ChevronRight size={24} />
        </motion.button>
      </section>

      {/* Introduction SEO Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Votre Agence de Communication Visuelle à Coulommiers (77)
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              <strong>Osmoz Communication</strong> est votre partenaire de confiance en Seine-et-Marne pour tous vos projets de 
              <strong> signalétique</strong>, <strong>enseignes lumineuses</strong>, <strong>impression grand format</strong> et 
              <strong> gravure laser</strong>. Basés à Coulommiers, nous intervenons dans tout le département 77 
              avec un service de qualité et des délais respectés.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Signalétique Showcase Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src="/images/ozc-signaletique.webp"
                  alt="Signalétique professionnelle Osmoz Communication - Panneaux directionnels Seine-et-Marne"
                  className="w-full h-96 object-contain rounded-2xl shadow-2xl bg-white"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-600/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm font-semibold text-slate-800">Signalétique directionnelle</p>
                  <p className="text-xs text-slate-600">Installation récente - Coulommiers 77</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-block bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium">
                Notre Expertise Signalétique
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                Signalétique sur-mesure en Seine-et-Marne
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Spécialistes de la <strong>signalétique extérieure et intérieure</strong>, nous concevons et réalisons 
                vos panneaux directionnels, d'information et de sécurité. De l'étude à la pose, 
                notre équipe vous accompagne pour des solutions durables et conformes aux normes.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-slate-800">Étude personnalisée</p>
                    <p className="text-sm text-slate-600">Analyse de vos besoins</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-slate-800">Pose professionnelle</p>
                    <p className="text-sm text-slate-600">Installation par nos équipes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-slate-800">Matériaux premium</p>
                    <p className="text-sm text-slate-600">Durabilité garantie</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-slate-800">SAV réactif</p>
                    <p className="text-sm text-slate-600">Maintenance incluse</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/services/signaletique"
                  className="inline-flex items-center bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-brand-600 transform hover:scale-105"
                >
                  Découvrir nos solutions signalétique
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <a
                  href="https://ozc-signaletique.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-slate-900 transform hover:scale-105"
                >
                  OZC Signalétique
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Devis gratuit
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100 rounded-full -translate-y-48 translate-x-48 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-50 rounded-full translate-y-32 -translate-x-32"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Pourquoi Choisir Osmoz Communication ?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Une expertise reconnue en Seine-et-Marne pour votre communication visuelle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-500 transition-all duration-300 transform group-hover:scale-110">
                  <feature.icon className="w-10 h-10 text-brand-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with SEO content */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Nos Services de Communication Visuelle en Seine-et-Marne
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              De la conception à l'installation, découvrez notre gamme complète de services professionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 group hover:scale-105"
              >
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-500 transition-colors">
                  <FaBullhorn className="w-8 h-8 text-brand-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-colors group"
                >
                  Découvrir ce service
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Voir tous nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section with local SEO */}
      <section className="py-20 bg-brand-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-3 h-3 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-white/15 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/25 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Osmoz Communication en Chiffres
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              La confiance de nos clients en Seine-et-Marne depuis 2014
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
                <div className="text-white/70 text-sm">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Ils Nous Font Confiance en Seine-et-Marne
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits dans le 77
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 relative"
              >
                <FaQuoteLeft className="w-8 h-8 text-brand-500 mb-4" />
                <p className="text-slate-600 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-gray-100 pt-6">
                  <p className="font-semibold text-slate-800">{testimonial.author}</p>
                  <p className="text-brand-600 text-sm">{testimonial.company}</p>
                  <p className="text-slate-500 text-sm">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview with local SEO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Nos Réalisations en Seine-et-Marne
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Découvrez nos projets de signalétique et communication visuelle dans le 77
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={item.image}
                    alt={`${item.title} - Réalisation Osmoz Communication`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-600/80 to-brand-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Voir toutes nos réalisations
            </Link>
          </div>
        </div>
      </section>

      {/* Client Logos Section - Slower animation */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-xl font-medium text-brand-600 mb-2">
                  Vous n'êtes pas les premiers à nous faire confiance...
                </h2>
                <p className="text-4xl font-bold text-slate-800">
                  ...Ils l'ont fait avant tout le monde !
                </p>
            </motion.div>
            <div className="relative h-40 overflow-hidden">
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
                
                <motion.div
                    className="absolute flex"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        ease: 'linear',
                        duration: 60,
                        repeat: Infinity,
                        repeatType: 'loop'
                    }}
                >
                    {[...logos, ...logos].map((logo, index) => (
                        <div key={index} className="flex-shrink-0 w-56 h-40 flex items-center justify-center mx-8">
                            <img 
                                src={logo} 
                                alt={`Logo client ${index + 1} - Osmoz Communication`} 
                                className="max-h-24 max-w-full object-contain hover:scale-110 transition-transform duration-300" 
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
      </section>

      {/* CTA Section with local SEO */}
      <section className="relative bg-brand-500 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-400 rounded-full opacity-60"></div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-brand-600 rounded-full opacity-50"></div>
          <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-white/15 rounded-full"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-400 transform rotate-45 translate-x-16 -translate-y-16 opacity-40"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px] py-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white z-10 relative"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Votre Projet de Communication Visuelle à Coulommiers
              </h2>
              <p className="text-xl lg:text-2xl mb-8 text-white/90 font-light">
                Devis gratuit sous 24h • Intervention en Seine-et-Marne • Qualité garantie
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-white text-brand-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group"
                >
                  Demander un devis gratuit
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:0184190104"
                  className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  01 84 19 01 04
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
                  alt="Équipe Osmoz Communication Coulommiers - Experts signalétique Seine-et-Marne"
                  className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-600/20 to-transparent rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative bg-slate-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-1 h-12 bg-brand-500 mr-4"></div>
                <p className="text-white text-lg italic max-w-4xl">
                  "La communication visuelle, c'est notre passion. Votre satisfaction, notre priorité."
                </p>
              </div>
              <p className="text-white/70 text-sm">
                Osmoz Communication - 3B Boulevard de la Marne, 77120 Coulommiers - Seine-et-Marne
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};