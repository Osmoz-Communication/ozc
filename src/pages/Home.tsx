import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaPalette, FaRocket, FaCertificate, FaUsers, FaEye, FaBullhorn, FaQuoteLeft, FaMapSigns, FaLightbulb, FaCog, FaPrint, FaShieldAlt, FaBrush } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { AnimatedButton } from '../components/AnimatedButton';

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
  const [currentPortfolioSlide, setCurrentPortfolioSlide] = useState(0);
  const [sliderTransitioning, setSliderTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length, isHovered]);

  // Auto-défilement du carrousel portfolio avec boucle infinie
  useEffect(() => {
    const portfolioTimer = setInterval(() => {
      nextPortfolioSlide();
    }, 3000);
    return () => clearInterval(portfolioTimer);
  }, []);

  const nextSlide = () => {
    if (sliderTransitioning) return;
    setSliderTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setSliderTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (sliderTransitioning) return;
    setSliderTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setSliderTransitioning(false), 1000);
  };

  const nextPortfolioSlide = () => {
    setCurrentPortfolioSlide((prev) => {
      if (prev >= 4) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevPortfolioSlide = () => {
    setCurrentPortfolioSlide((prev) => {
      if (prev <= 0) {
        return 4;
      }
      return prev - 1;
    });
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
        className="relative h-[58vh] md:h-[55vh] overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full h-full">
          {/* Slides avec défilement infini sans blancs */}
          {slides.map((slide, index) => {
            let position = index - currentSlide;
            if (position < 0) position += slides.length;
            
            return (
              <motion.div
                key={`${slide.id}-${currentSlide}`}
                className="absolute inset-0"
                initial={{ x: `${position * 100}%`, opacity: position === 0 ? 1 : 0 }}
                animate={{
                  x: `${position * 100}%`,
                  opacity: position === 0 ? 1 : 0
                }}
                transition={{ 
                  duration: sliderTransitioning ? 1.0 : 0.8, 
                  ease: [0.25, 0.1, 0.25, 1], // Easing très doux et naturel
                  opacity: { duration: 0.6 }
                }}
                style={{
                  left: `${position * 100}%`,
                  width: '100%'
                }}
              >
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40"></div>
                </div>

                <div className="relative h-full flex items-start sm:items-center pt-8 sm:pt-0">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 sm:pb-0">
                    <div className="max-w-3xl">
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ 
                          opacity: position === 0 ? 1 : 0, 
                          y: position === 0 ? 0 : 30 
                        }}
                        transition={{ 
                          duration: 0.7, 
                          delay: position === 0 ? 0.3 : 0,
                          ease: "easeOut"
                        }}
                        className="text-brand-300 text-lg font-medium mb-4"
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ 
                          opacity: position === 0 ? 1 : 0, 
                          y: position === 0 ? 0 : 50 
                        }}
                        transition={{ 
                          duration: 0.8, 
                          delay: position === 0 ? 0.4 : 0,
                          ease: "easeOut"
                        }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ 
                          opacity: position === 0 ? 1 : 0, 
                          y: position === 0 ? 0 : 30 
                        }}
                        transition={{ 
                          duration: 0.7, 
                          delay: position === 0 ? 0.6 : 0,
                          ease: "easeOut"
                        }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ 
                          opacity: position === 0 ? 1 : 0, 
                          y: position === 0 ? 0 : 30 
                        }}
                        transition={{ 
                          duration: 0.7, 
                          delay: position === 0 ? 0.8 : 0,
                          ease: "easeOut"
                        }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <AnimatedButton to={slide.buttonLink} variant="primary" size="md" className="sm:size-lg">
                          {slide.buttonText}
                          <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                        </AnimatedButton>
                        <AnimatedButton to="/contact" variant="outline" size="md" className="sm:size-lg border-white text-white hover:bg-white hover:text-slate-800">
                          Devis gratuit 24h
                        </AnimatedButton>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
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

        {/* Navigation arrows - only visible on hover and desktop */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hidden md:block"
          aria-label="Slide précédent"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hidden md:block"
          aria-label="Slide suivant"
        >
          <ChevronRight size={24} />
        </motion.button>
      </section>

      {/* Introduction SEO Section */}
      <section className="py-16 relative">
        {/* Fond dégradé subtil */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-brand-50/20"></div>
        
        {/* Éléments décoratifs continus */}
        <div className="absolute inset-0">
          {/* Formes étendues qui se prolongent dans les sections suivantes */}
          <motion.div 
            className="absolute top-0 right-0 w-96 h-[130%] bg-gradient-to-br from-brand-100/25 to-transparent rounded-full -translate-y-1/6 translate-x-24"
            animate={{ 
              scale: [1, 1.08, 1], 
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-80 h-[140%] bg-gradient-to-tr from-brand-200/18 to-transparent rounded-full translate-y-1/5 -translate-x-16"
            animate={{ 
              scale: [1, 1.12, 1],
              rotate: [0, 120, 240]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Lignes connectrices subtiles */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-32 h-px bg-gradient-to-r from-brand-200/40 to-transparent"
            animate={{ 
              scaleX: [0.5, 1, 0.5],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-24 h-px bg-gradient-to-l from-brand-300/40 to-transparent"
            animate={{ 
              scaleX: [0.8, 1, 0.8],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-slate-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Votre agence de <motion.span 
                className="text-brand-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                communication visuelle
              </motion.span> à Coulommiers (77)
            </motion.h2>
            <motion.p 
              className="text-xl text-slate-600 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <strong>Osmoz Communication</strong> est votre partenaire de confiance en Seine-et-Marne pour tous vos projets de 
              <strong> signalétique</strong>, <strong>enseignes lumineuses</strong>, <strong>impression grand format</strong> et 
              <strong> gravure laser</strong>. Basés à Coulommiers, nous intervenons dans tout le département 77 
              avec un service de qualité et des délais respectés.
            </motion.p>
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
              className="group"
            >
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src="/images/ozc-signaletique.webp"
                  alt="Signalétique professionnelle Osmoz Communication - Panneaux directionnels Seine-et-Marne"
                  className="w-full h-96 object-contain rounded-2xl shadow-2xl bg-white"
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-brand-600/20 to-transparent rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
                <motion.div 
                  className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.95)"
                  }}
                >
                  <p className="text-sm font-semibold text-slate-800">Signalétique directionnelle</p>
                  <p className="text-xs text-slate-600">Installation récente - Coulommiers 77</p>
                </motion.div>
                
                {/* Effet de brillance au hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
                            <div className="inline-block bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium">
                Notre expertise signalétique
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                <span className="text-brand-600">Signalétique</span> sur-mesure en Seine-et-Marne
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
                <AnimatedButton to="/services/signaletique" variant="primary">
                  Découvrir nos solutions signalétique
                  <ArrowRight className="ml-2 w-4 h-4" />
                </AnimatedButton>
                <AnimatedButton href="https://ozc-signaletique.fr" variant="secondary">
                  OZC Signalétique
                  <ArrowRight className="ml-2 w-4 h-4" />
                </AnimatedButton>
                <AnimatedButton to="/contact" variant="outline">
                  Devis gratuit
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        {/* Background moderne avec dégradés et formes */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-brand-50/30"></div>
        
        {/* Bulles décoratives subtiles et légères */}
        <div className="absolute inset-0">
          {/* Petites bulles flottantes dispersées */}
          <motion.div className="absolute top-20 left-16 w-2 h-2 bg-brand-400/50 rounded-full"
            animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div className="absolute top-32 right-24 w-3 h-3 bg-brand-300/40 rounded-full"
            animate={{ x: [0, 10, 0], scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-brand-400/60 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div className="absolute bottom-20 right-16 w-2.5 h-2.5 bg-brand-300/35 rounded-full"
            animate={{ y: [0, 8, 0], x: [0, -5, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div className="absolute top-1/2 left-20 w-1 h-1 bg-brand-400/70 rounded-full"
            animate={{ scale: [1, 2, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
          <motion.div className="absolute top-3/4 right-32 w-2 h-2 bg-brand-300/45 rounded-full"
            animate={{ x: [0, -8, 0], y: [0, -6, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
          {/* Bulles principales qui flottent */}
          <motion.div 
            className="absolute top-20 right-20 w-32 h-32 bg-brand-100/20 rounded-full"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-32 left-16 w-24 h-24 bg-emerald-100/15 rounded-full"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-teal-100/25 rounded-full"
            animate={{
              x: [0, 10, 0],
              y: [0, -10, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
          
          {/* Petites bulles flottantes */}
          <motion.div className="absolute top-1/4 left-1/3 w-3 h-3 bg-brand-300/40 rounded-full"
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-emerald-300/50 rounded-full"
            animate={{ x: [0, 12, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div className="absolute top-3/4 left-1/5 w-4 h-4 bg-teal-200/30 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-brand-100 text-brand-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
              Nos atouts
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Pourquoi choisir <span className="text-brand-600">Osmoz Communication</span> ?
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
                className="group"
              >
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-brand-50/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icône avec effet moderne */}
                  <motion.div 
                    className="relative w-20 h-20 bg-gradient-to-br from-brand-100 to-brand-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-brand-500 group-hover:to-brand-600 transition-all duration-500"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="w-10 h-10 text-brand-500 group-hover:text-white transition-colors duration-500" />
                    {/* Effet de lueur */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 group-hover:text-brand-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with SEO content */}
      <section className="py-20 bg-white relative">
        {/* Éléments décoratifs pour les services */}
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
              Nos <span className="text-brand-600">services de communication visuelle</span> en Seine-et-Marne
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              De la conception à l'installation, découvrez notre gamme complète de services professionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => {
              // Définir les icônes spécifiques pour chaque service
                             const getServiceIcon = (title: string) => {
                 switch(title) {
                   case 'Signalétique': return FaMapSigns;
                   case 'Enseigne': return FaLightbulb;
                   case 'Gravure': return FaCog;
                   case 'Impression Numérique': return FaPrint;
                   case 'Film Solaire et Technique': return FaShieldAlt;
                   case 'Habillage et Décor': return FaBrush;
                   default: return FaBullhorn;
                 }
               };
              
              const ServiceIcon = getServiceIcon(service.title);
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                >
                  {/* Effet de brillance séquentiel */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0"
                    animate={{ 
                      x: ['-100%', '100%'],
                      opacity: [0, 0.7, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: index * 0.5 // Délai séquentiel basé sur l'index
                    }}
                  />
                  
                  <motion.div 
                    className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-500 transition-all duration-300 relative z-10"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <ServiceIcon className="w-8 h-8 text-brand-500 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-semibold text-slate-800 mb-4 relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-slate-600 mb-6 leading-relaxed flex-grow relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {service.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="mt-auto relative z-10"
                  >
                    <Link
                      to="/services"
                      className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-all duration-300 group-hover:translate-x-1"
                    >
                      Découvrir ce service
                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight size={16} className="ml-2" />
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
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
      <section className="py-20 relative overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
            alt="Osmoz Communication - Arrière-plan section statistiques"
            className="w-full h-full object-cover"
          />
          {/* Overlay comme le slider */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40"></div>
        </div>
        
        {/* Éléments décoratifs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-3 h-3 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-white/15 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/25 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Notre performance
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              <span className="text-brand-400">Osmoz Communication</span> en chiffres
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              La confiance de nos clients en Seine-et-Marne depuis 2014
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.3, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 120
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="text-center text-white group"
              >
                <motion.div 
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-all duration-300 relative"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                  
                  {/* Cercle d'effet au hover */}
                  <motion.div
                    className="absolute inset-0 border-2 border-white/40 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ 
                      scale: 1.3, 
                      opacity: [0, 0.5, 0],
                      transition: { duration: 0.6 }
                    }}
                  />
                </motion.div>
                
                <motion.div 
                  className="text-4xl lg:text-5xl font-bold mb-2 drop-shadow-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                
                <motion.div 
                  className="text-white/90 font-medium drop-shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  {stat.label}
                </motion.div>
                
                <motion.div 
                  className="text-white/70 text-sm drop-shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  {stat.sublabel}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        {/* Éléments décoratifs testimonials */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-24 left-24 w-3 h-3 bg-brand-300/50 rounded-full"
            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-16 right-24 w-2 h-2 bg-brand-400/60 rounded-full"
            animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
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
              Ils nous font <span className="text-brand-600">confiance</span> en Seine-et-Marne
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
      <section className="py-20 bg-white relative">
        {/* Éléments décoratifs portfolio */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-16 right-16 w-4 h-4 bg-brand-200/60 rounded-full"
            animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-6 h-6 bg-brand-100/40 rounded-full"
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
              Nos <span className="text-brand-600">réalisations</span> en Seine-et-Marne
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Découvrez nos projets de signalétique et communication visuelle dans le 77
            </p>
          </motion.div>

          {/* Carrousel Portfolio */}
          <div className="relative max-w-6xl mx-auto">
            {/* Flèches de navigation discrètes */}
            <button
              onClick={prevPortfolioSlide}
              className="absolute -left-12 lg:-left-16 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 p-2 lg:p-3 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 z-10 hidden md:block border border-gray-200/50"
              aria-label="Réalisation précédente"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextPortfolioSlide}
              className="absolute -right-12 lg:-right-16 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 p-2 lg:p-3 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 z-10 hidden md:block border border-gray-200/50"
              aria-label="Réalisation suivante"
            >
              <ChevronRight size={18} />
            </button>
            
            <div className="overflow-hidden rounded-2xl">
              <motion.div 
                className="flex"
                animate={{ 
                  x: `${-currentPortfolioSlide * (100 / 3)}%` 
                }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut" 
                }}
              >
                {/* Créer un carrousel infini avec duplication */}
                {portfolioItems.slice(0, 5).concat(portfolioItems.slice(0, 5)).map((item, index) => {
                  const isOriginal = index < 5;
                  return (
                    <Link
                      key={`portfolio-${isOriginal ? index : `${index}-duplicate`}`}
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
                  );
                })}
              </motion.div>
            </div>
            
            {/* Indicateurs */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPortfolioSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentPortfolioSlide ? 'bg-brand-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Aller à la réalisation ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <AnimatedButton to="/portfolio" variant="secondary" size="lg">
              Voir toutes nos réalisations
            </AnimatedButton>
          </motion.div>
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
        {/* Fond moderne avec couleurs brand */}
        <div className="absolute inset-0">
          {/* Dégradé de base avec couleurs brand */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700"
            animate={{
              background: [
                "linear-gradient(135deg, #98c21d 0%, #7fb069 50%, #65a30d 100%)",
                "linear-gradient(225deg, #7fb069 0%, #98c21d 50%, #65a30d 100%)",
                "linear-gradient(135deg, #98c21d 0%, #7fb069 50%, #65a30d 100%)"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Formes géométriques subtiles */}
          <motion.div 
            className="absolute -top-20 -right-20 w-64 h-64 bg-brand-400/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-300/15 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Points décoratifs */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${20 + (i * 10) % 60}%`,
                top: `${20 + (i * 8) % 60}%`
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Effet de brillance subtil */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, 
                transparent 40%, 
                rgba(255,255,255,0.1) 50%, 
                transparent 60%)`
            }}
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
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


      </section>
    </div>
  );
};