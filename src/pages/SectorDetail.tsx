import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Users, TrendingUp, MapPin, Phone } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { PortfolioGallery } from '../components/PortfolioGallery';

// Base template structure that can be easily managed from admin and stored in database
interface SectorTemplate {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  content: {
    intro?: string;
    features?: string[];
    specialties?: string[];
    gallery?: string[];
    statistics?: {
      label: string;
      value: string;
      icon?: string;
    }[];
    testimonial?: {
      text: string;
      author: string;
      company: string;
    };
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// Sector data that can be easily managed from admin interface
const sectorTemplates: Record<string, SectorTemplate> = {
  'hotellerie': {
    slug: 'hotellerie',
    title: 'Hôtellerie',
    subtitle: 'Solutions de communication visuelle pour l\'hôtellerie',
    description: 'Créez une expérience client mémorable avec nos solutions de signalétique et communication visuelle dédiées au secteur hôtelier.',
    heroImage: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Du hall d\'accueil aux chambres, en passant par les espaces de restauration, nous créons une identité visuelle cohérente qui valorise votre établissement.',
      features: [
        'Signalétique directionnelle et d\'information',
        'Enseignes lumineuses et façades',
        'Habillage des espaces et décoration',
        'Cartes et menus personnalisés',
        'Signalétique multilingue',
        'Solutions digitales interactives'
      ],
      specialties: [
        'Respect des normes d\'accessibilité ERP',
        'Matériaux adaptés aux environnements publics',
        'Design haut de gamme et élégant',
        'Installation avec contraintes d\'exploitation',
        'Maintenance préventive programmée'
      ],
      gallery: [
        'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
      ],
      statistics: [
        { label: 'Hôtels équipés', value: '50+', icon: 'building' },
        { label: 'Années d\'expérience', value: '15+', icon: 'calendar' },
        { label: 'Taux de satisfaction', value: '98%', icon: 'star' }
      ],
      testimonial: {
        text: 'Osmoz Communication a transformé notre hôtel avec une signalétique élégante et fonctionnelle. Nos clients s\'orientent facilement et apprécient l\'esthétique.',
        author: 'Marie Dubois',
        company: 'Directrice - Hotel Le Grand Coulommiers'
      }
    },
    seo: {
      metaTitle: 'Signalétique hôtelière Coulommiers - Solutions pour hôtels',
      metaDescription: 'Signalétique et communication visuelle pour hôtels en Seine-et-Marne. Solutions sur-mesure pour l\'hôtellerie.',
      keywords: ['signalétique hôtel', 'coulommiers', 'hôtellerie', 'seine-et-marne', 'enseigne hôtel']
    }
  },
  'industrie': {
    slug: 'industrie',
    title: 'Industrie',
    subtitle: 'Signalétique industrielle et sécurité',
    description: 'Solutions robustes et conformes aux normes pour l\'industrie : signalétique de sécurité, marquage au sol, enseignes industrielles.',
    heroImage: 'https://images.pexels.com/photos/236722/pexels-photo-236722.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Dans l\'environnement industriel, la signalétique est cruciale pour la sécurité et l\'efficacité. Nos solutions résistent aux conditions les plus exigeantes.',
      features: [
        'Signalétique de sécurité réglementaire',
        'Marquage au sol antidérapant',
        'Enseignes industrielles robustes',
        'Étiquetage et traçabilité',
        'Signalétique temporaire de chantier',
        'Solutions anti-vandalisme'
      ],
      specialties: [
        'Conformité aux normes ISO et OSHA',
        'Matériaux résistants aux agressions',
        'Installation en milieu industriel actif',
        'Signalétique photoluminescente',
        'Solutions ATEX pour zones explosives'
      ],
      statistics: [
        { label: 'Sites industriels', value: '80+' },
        { label: 'Conformité normes', value: '100%' },
        { label: 'Durabilité garantie', value: '10 ans' }
      ]
    },
    seo: {
      metaTitle: 'Signalétique industrielle Coulommiers - Sécurité et marquage',
      metaDescription: 'Signalétique industrielle conforme aux normes en Seine-et-Marne. Sécurité, marquage au sol, enseignes industrielles.',
      keywords: ['signalétique industrielle', 'marquage sol', 'sécurité', 'coulommiers', 'industrie']
    }
  },
  'tertiaire': {
    slug: 'tertiaire',
    title: 'Tertiaire',
    subtitle: 'Communication visuelle pour bureaux et services',
    description: 'Renforcez votre image professionnelle avec nos solutions de communication visuelle adaptées aux espaces tertiaires.',
    heroImage: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Bureaux, centres d\'affaires, administrations : créez un environnement professionnel avec une signalétique moderne et efficace.',
      features: [
        'Signalétique directionnelle corporate',
        'Plaques de porte et bureau',
        'Enseignes de façade professionnelles',
        'Totems d\'accueil et d\'information',
        'Habillage de vitres et cloisons',
        'Signalétique digitale interactive'
      ],
      specialties: [
        'Design corporate et moderne',
        'Installation en horaires décalés',
        'Matériaux haut de gamme',
        'Respect de l\'image de marque',
        'Solutions modulaires évolutives'
      ],
      statistics: [
        { label: 'Entreprises équipées', value: '120+' },
        { label: 'Projets tertiaires', value: '200+' },
        { label: 'Délai moyen', value: '7 jours' }
      ]
    },
    seo: {
      metaTitle: 'Signalétique tertiaire Coulommiers - Bureaux et services',
      metaDescription: 'Signalétique professionnelle pour espaces tertiaires en Seine-et-Marne. Solutions corporate et modernes.',
      keywords: ['signalétique bureau', 'tertiaire', 'coulommiers', 'corporate', 'professionnel']
    }
  },
  'commerce': {
    slug: 'commerce',
    title: 'Commerce',
    subtitle: 'Signalétique commerciale et retail',
    description: 'Attirez et guidez vos clients avec des solutions visuelles impact pour magasins, centres commerciaux et points de vente.',
    heroImage: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Dans le commerce, chaque détail compte pour l\'expérience client. Nos solutions maximisent votre visibilité et optimisent le parcours d\'achat.',
      features: [
        'Enseignes commerciales attractives',
        'PLV et mobilier sur-mesure',
        'Signalétique promotionnelle',
        'Habillage de vitrines',
        'Bornes et totems informatifs',
        'Signalétique prix et étiquetage'
      ],
      specialties: [
        'Design attractif et commercial',
        'Solutions temporaires et permanentes',
        'Matériaux adaptés au passage intensif',
        'Installation express weekend',
        'Maintenance réactive'
      ],
      statistics: [
        { label: 'Magasins équipés', value: '150+' },
        { label: 'Centres commerciaux', value: '25+' },
        { label: 'ROI moyen constaté', value: '+30%' }
      ]
    },
    seo: {
      metaTitle: 'Signalétique commerciale Coulommiers - Magasins et retail',
      metaDescription: 'Signalétique pour commerces et magasins en Seine-et-Marne. PLV, enseignes, solutions retail.',
      keywords: ['signalétique magasin', 'commerce', 'retail', 'coulommiers', 'PLV']
    }
  },
  'evenementiel': {
    slug: 'evenementiel',
    title: 'Événementiel',
    subtitle: 'Solutions pour événements et manifestations',
    description: 'Créez l\'impact visuel de vos événements avec nos solutions temporaires et permanentes adaptées à l\'événementiel.',
    heroImage: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Salons, congrès, festivals, événements corporate : nous créons l\'identité visuelle qui marquera vos participants.',
      features: [
        'Signalétique événementielle temporaire',
        'Stands et présentoirs mobiles',
        'Bâches et supports grand format',
        'Fléchage et signalétique directionnelle',
        'Kakémonos et oriflammes',
        'Solutions d\'accueil et accès'
      ],
      specialties: [
        'Montage/démontage express',
        'Solutions réutilisables',
        'Résistance aux intempéries',
        'Transport et logistique inclus',
        'Service 24h/24 pendant l\'événement'
      ],
      statistics: [
        { label: 'Événements réalisés', value: '300+' },
        { label: 'Festivals équipés', value: '50+' },
        { label: 'Délai d\'intervention', value: '24h' }
      ]
    },
    seo: {
      metaTitle: 'Signalétique événementielle Coulommiers - Salons et festivals',
      metaDescription: 'Signalétique pour événements en Seine-et-Marne. Solutions temporaires pour salons, festivals, congrès.',
      keywords: ['signalétique événement', 'salon', 'festival', 'coulommiers', 'événementiel']
    }
  },
  'musee-parc': {
    slug: 'musee-parc',
    title: 'Musée et Parc à Thème',
    subtitle: 'Signalétique culturelle et thématique',
    description: 'Guidez et informez vos visiteurs avec des solutions sur-mesure pour musées, parcs et sites culturels.',
    heroImage: 'https://images.pexels.com/photos/1927639/pexels-photo-1927639.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Créez une expérience immersive pour vos visiteurs avec une signalétique qui raconte votre histoire et valorise vos collections.',
      features: [
        'Signalétique muséographique',
        'Panneaux pédagogiques et informatifs',
        'Signalétique thématique immersive',
        'Plans et cartographie interactive',
        'Supports multimédia intégrés',
        'Signalétique multilingue'
      ],
      specialties: [
        'Respect du patrimoine et de l\'architecture',
        'Matériaux nobles et durables',
        'Design sur-mesure et créatif',
        'Installation sans dommage',
        'Solutions évolutives pour expositions'
      ],
      statistics: [
        { label: 'Sites culturels', value: '40+' },
        { label: 'Musées équipés', value: '20+' },
        { label: 'Langues disponibles', value: '10+' }
      ]
    },
    seo: {
      metaTitle: 'Signalétique muséale Coulommiers - Musées et sites culturels',
      metaDescription: 'Signalétique pour musées et parcs thématiques en Seine-et-Marne. Solutions culturelles sur-mesure.',
      keywords: ['signalétique musée', 'muséographie', 'culturel', 'coulommiers', 'patrimoine']
    }
  }
};

export const SectorDetail: React.FC = () => {
  const { sector } = useParams<{ sector: string }>();
  
  if (!sector || !sectorTemplates[sector]) {
    return <Navigate to="/secteurs" replace />;
  }

  const template = sectorTemplates[sector];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection 
        title={template.title}
        subtitle={template.subtitle}
        backgroundImage={template.heroImage}
      />

      {/* Breadcrumb */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-slate-600 hover:text-brand-600">Accueil</Link>
            <span className="text-slate-400">/</span>
            <Link to="/secteurs" className="text-slate-600 hover:text-brand-600">Secteurs</Link>
            <span className="text-slate-400">/</span>
            <span className="text-brand-600 font-medium">{template.title}</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-6">À propos de ce secteur</h2>
              <p className="text-lg text-slate-600 mb-6">{template.description}</p>
              {template.content.intro && (
                <p className="text-slate-600">{template.content.intro}</p>
              )}
            </motion.div>

            {/* Features */}
            {template.content.features && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Nos solutions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {template.content.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Specialties */}
            {template.content.specialties && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Nos spécialités</h3>
                <div className="space-y-3">
                  {template.content.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{specialty}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonial */}
            {template.content.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-brand-50 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Témoignage client</h3>
                <blockquote className="text-lg text-slate-600 italic mb-4">
                  "{template.content.testimonial.text}"
                </blockquote>
                <div className="flex items-center space-x-2">
                  <div>
                    <div className="font-semibold text-slate-800">{template.content.testimonial.author}</div>
                    <div className="text-sm text-slate-600">{template.content.testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Gallery */}
            {template.content.gallery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Nos réalisations</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {template.content.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Réalisation ${template.title}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Statistics */}
            {template.content.statistics && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-6">Nos chiffres</h3>
                <div className="space-y-4">
                  {template.content.statistics.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-slate-600">{stat.label}</span>
                      <span className="text-2xl font-bold text-brand-500">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-brand-500 rounded-xl p-6 text-white text-center"
            >
              <h3 className="text-xl font-bold mb-4">Un projet dans ce secteur ?</h3>
              <p className="mb-6">Contactez-nous pour discuter de vos besoins spécifiques</p>
              <div className="space-y-3">
                <Link 
                  to="/contact"
                  className="block bg-white text-brand-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Nous contacter
                </Link>
                <a 
                  href="tel:0184190104"
                  className="flex items-center justify-center space-x-2 border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-brand-600 transition-colors"
                >
                  <Phone size={16} />
                  <span>01 84 19 01 04</span>
                </a>
              </div>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                to="/secteurs"
                className="flex items-center space-x-2 text-slate-600 hover:text-brand-600 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Retour aux secteurs</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Portfolio Gallery */}
      <PortfolioGallery 
        category={template.slug}
        title={`Nos réalisations dans le secteur ${template.title}`}
        subtitle={`Découvrez nos projets ${template.title.toLowerCase()} en Seine-et-Marne`}
      />
    </div>
  );
}; 