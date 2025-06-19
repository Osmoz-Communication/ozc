import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, Euro, Shield, Phone, Mail } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { PortfolioGallery } from '../components/PortfolioGallery';

// Base template structure that can be easily managed from admin and stored in database
interface PageTemplate {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  content: {
    intro?: string;
    features?: string[];
    process?: {
      step: number;
      title: string;
      description: string;
    }[];
    gallery?: string[];
    specifications?: {
      label: string;
      value: string;
    }[];
    pricing?: {
      basic?: string;
      premium?: string;
      custom?: string;
    };
    duration?: string;
    warranty?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// Service data that can be easily managed from admin interface
const serviceTemplates: Record<string, PageTemplate> = {
  'signaletique': {
    slug: 'signaletique',
    title: 'Signalétique',
    subtitle: 'Solutions de signalétique intérieure et extérieure',
    description: 'Création et pose de signalétique sur-mesure pour optimiser l\'orientation et la communication dans vos espaces.',
    heroImage: 'https://images.pexels.com/photos/2422277/pexels-photo-2422277.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Notre expertise en signalétique vous garantit des solutions durables et esthétiques, parfaitement adaptées à votre image de marque et aux contraintes réglementaires.',
      features: [
        'Signalétique intérieure et extérieure',
        'Respect des normes d\'accessibilité',
        'Matériaux haute qualité et durables',
        'Conception sur-mesure',
        'Pose professionnelle incluse',
        'Maintenance et SAV assurés'
      ],
      process: [
        { step: 1, title: 'Analyse des besoins', description: 'Étude de votre environnement et de vos objectifs' },
        { step: 2, title: 'Conception graphique', description: 'Création des visuels en cohérence avec votre charte' },
        { step: 3, title: 'Validation technique', description: 'Vérification des contraintes et normes applicables' },
        { step: 4, title: 'Production', description: 'Fabrication avec des matériaux de qualité premium' },
        { step: 5, title: 'Installation', description: 'Pose professionnelle par nos équipes qualifiées' },
        { step: 6, title: 'Suivi', description: 'Maintenance et support technique continu' }
      ],
      gallery: [
        'https://images.pexels.com/photos/2422277/pexels-photo-2422277.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
      ],
      specifications: [
        { label: 'Matériaux', value: 'Aluminium, PVC, Dibond, Plexiglas' },
        { label: 'Finitions', value: 'Impression numérique, gravure laser, découpe' },
        { label: 'Fixations', value: 'Visserie inox, adhésif, système magnétique' },
        { label: 'Normes', value: 'ERP, PMR, sécurité incendie' }
      ],
      pricing: {
        basic: 'À partir de 150€',
        premium: 'À partir de 300€',
        custom: 'Devis sur mesure'
      },
      duration: '5 à 15 jours',
      warranty: '2 ans'
    },
    seo: {
      metaTitle: 'Signalétique professionnelle à Coulommiers - Osmoz Communication',
      metaDescription: 'Création et pose de signalétique intérieure et extérieure en Seine-et-Marne. Solutions sur-mesure conformes aux normes.',
      keywords: ['signalétique', 'coulommiers', 'seine-et-marne', 'signalisation', 'panneau']
    }
  },
  'enseigne': {
    slug: 'enseigne',
    title: 'Enseigne',
    subtitle: 'Enseignes lumineuses et non lumineuses',
    description: 'Conception et fabrication d\'enseignes sur-mesure pour valoriser votre image de marque et attirer votre clientèle.',
    heroImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Votre enseigne est le premier contact avec vos clients. Nous créons des enseignes impactantes qui reflètent votre professionnalisme et votre identité.',
      features: [
        'Enseignes lumineuses LED',
        'Enseignes rétro-éclairées',
        'Lettres découpées et relief',
        'Caissons lumineux',
        'Totems et pylônes',
        'Maintenance et dépannage'
      ],
      process: [
        { step: 1, title: 'Étude de faisabilité', description: 'Analyse du site et contraintes urbanistiques' },
        { step: 2, title: 'Création graphique', description: 'Design de l\'enseigne selon votre identité' },
        { step: 3, title: 'Validation administrative', description: 'Dossier de demande d\'autorisation si nécessaire' },
        { step: 4, title: 'Fabrication', description: 'Production en atelier avec matériaux premium' },
        { step: 5, title: 'Installation', description: 'Pose et raccordement électrique par nos équipes' },
        { step: 6, title: 'Mise en service', description: 'Tests et formation à l\'utilisation' }
      ],
      gallery: [
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
      ],
      specifications: [
        { label: 'Éclairage', value: 'LED haute efficacité, faible consommation' },
        { label: 'Structure', value: 'Aluminium, acier galvanisé' },
        { label: 'Contrôle', value: 'Programmation, variateur, capteur' },
        { label: 'Garantie', value: 'Structure 5 ans, électronique 2 ans' }
      ],
      pricing: {
        basic: 'À partir de 800€',
        premium: 'À partir de 2000€',
        custom: 'Projet sur mesure'
      },
      duration: '15 à 30 jours',
      warranty: '2 à 5 ans selon composants'
    },
    seo: {
      metaTitle: 'Enseigne lumineuse Coulommiers - Fabrication et pose - Osmoz Communication',
      metaDescription: 'Création d\'enseignes lumineuses et non lumineuses en Seine-et-Marne. Fabrication sur-mesure et pose professionnelle.',
      keywords: ['enseigne', 'enseigne lumineuse', 'coulommiers', 'seine-et-marne', 'led']
    }
  },
  // Add more services with the same structure...
  'gravure': {
    slug: 'gravure',
    title: 'Gravure',
    subtitle: 'Gravure laser et mécanique de précision',
    description: 'Service de gravure sur tous supports pour personnaliser vos objets et créer des plaques professionnelles.',
    heroImage: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Notre atelier de gravure équipé des dernières technologies vous garantit une précision et une qualité exceptionnelles.',
      features: [
        'Gravure laser haute précision',
        'Gravure mécanique traditionnelle',
        'Tous matériaux compatibles',
        'Personnalisation à l\'unité',
        'Plaques professionnelles',
        'Délais express disponibles'
      ],
      process: [
        { step: 1, title: 'Préparation fichier', description: 'Vectorisation et optimisation de votre design' },
        { step: 2, title: 'Choix du support', description: 'Sélection du matériau adapté à l\'usage' },
        { step: 3, title: 'Paramétrage machine', description: 'Réglage précis selon le matériau' },
        { step: 4, title: 'Gravure', description: 'Exécution avec contrôle qualité permanent' },
        { step: 5, title: 'Finition', description: 'Nettoyage et traitement de protection' },
        { step: 6, title: 'Contrôle final', description: 'Vérification qualité avant livraison' }
      ],
      pricing: {
        basic: 'À partir de 25€',
        premium: 'À partir de 50€',
        custom: 'Tarif selon quantité'
      },
      duration: '24h à 5 jours',
      warranty: '1 an'
    },
    seo: {
      metaTitle: 'Gravure laser Coulommiers - Service de gravure professionnel',
      metaDescription: 'Gravure laser et mécanique sur tous supports. Service professionnel en Seine-et-Marne.',
      keywords: ['gravure', 'gravure laser', 'coulommiers', 'plaque', 'personnalisation']
    }
  },
  'impression-numerique': {
    slug: 'impression-numerique',
    title: 'Impression Numérique',
    subtitle: 'Impression grand format et petite série',
    description: 'Solutions d\'impression numérique haute qualité pour tous vos supports de communication.',
    heroImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Notre parc d\'imprimantes numériques dernière génération vous garantit des rendus exceptionnels sur tous supports.',
      features: [
        'Impression grand format jusqu\'à 5m',
        'Tous supports et matériaux',
        'Qualité photo et graphique',
        'Encres écologiques UV',
        'Finitions multiples disponibles',
        'Délais courts garantis'
      ],
      pricing: {
        basic: 'À partir de 15€/m²',
        premium: 'À partir de 25€/m²',
        custom: 'Tarif dégressif'
      },
      duration: '24h à 72h',
      warranty: '6 mois'
    },
    seo: {
      metaTitle: 'Impression numérique grand format Coulommiers - Osmoz Communication',
      metaDescription: 'Impression numérique haute qualité en Seine-et-Marne. Grand format, tous supports.',
      keywords: ['impression numérique', 'grand format', 'coulommiers', 'bâche', 'panneau']
    }
  },
  'film-solaire-technique': {
    slug: 'film-solaire-technique',
    title: 'Film Solaire et Technique',
    subtitle: 'Films de protection et techniques',
    description: 'Installation de films solaires, de sécurité et techniques pour optimiser confort et sécurité de vos espaces.',
    heroImage: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Nos films techniques apportent protection solaire, sécurité et intimité tout en préservant l\'esthétique de vos surfaces vitrées.',
      features: [
        'Films anti-chaleur et UV',
        'Films de sécurité anti-effraction',
        'Films décoratifs et intimité',
        'Films one-way miroir',
        'Films anti-graffiti',
        'Garantie long terme'
      ],
      process: [
        { step: 1, title: 'Étude des surfaces', description: 'Analyse technique et mesures précises' },
        { step: 2, title: 'Sélection du film', description: 'Choix adapté selon vos besoins spécifiques' },
        { step: 3, title: 'Préparation', description: 'Nettoyage et préparation des surfaces' },
        { step: 4, title: 'Pose professionnelle', description: 'Installation par nos techniciens qualifiés' },
        { step: 5, title: 'Contrôle qualité', description: 'Vérification et finitions parfaites' },
        { step: 6, title: 'Garantie', description: 'Suivi et maintenance préventive' }
      ],
      specifications: [
        { label: 'Réduction chaleur', value: 'Jusqu\'à 85%' },
        { label: 'Protection UV', value: '99%' },
        { label: 'Épaisseur', value: '50 à 400 microns' },
        { label: 'Garantie', value: '10 à 15 ans' }
      ],
      pricing: {
        basic: 'À partir de 45€/m²',
        premium: 'À partir de 75€/m²',
        custom: 'Devis selon surface'
      },
      duration: '1 à 3 jours',
      warranty: '10 ans'
    },
    seo: {
      metaTitle: 'Film solaire et technique Coulommiers - Protection vitres',
      metaDescription: 'Installation de films solaires et techniques en Seine-et-Marne. Protection UV, sécurité, intimité.',
      keywords: ['film solaire', 'film technique', 'coulommiers', 'protection uv', 'sécurité']
    }
  },
  'habillage-decor': {
    slug: 'habillage-decor',
    title: 'Habillage et Décor',
    subtitle: 'Transformation d\'espaces et habillages',
    description: 'Transformez vos espaces avec nos solutions d\'habillage et de décoration adaptées à votre image de marque.',
    heroImage: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'De l\'habillage de véhicules à la décoration murale, nous créons des environnements visuels uniques qui renforcent votre identité.',
      features: [
        'Habillage de véhicules complet',
        'Décoration murale design',
        'Habillage de vitrines',
        'Décors événementiels',
        'Mobilier sur-mesure',
        'Effets visuels 3D'
      ],
      process: [
        { step: 1, title: 'Analyse de l\'espace', description: 'Étude des contraintes et opportunités' },
        { step: 2, title: 'Conception créative', description: 'Design personnalisé selon votre univers' },
        { step: 3, title: 'Choix des matériaux', description: 'Sélection adaptée à l\'usage et au budget' },
        { step: 4, title: 'Production', description: 'Fabrication des éléments sur-mesure' },
        { step: 5, title: 'Installation', description: 'Pose coordonnée par nos équipes' },
        { step: 6, title: 'Mise en scène', description: 'Finalisation et mise en valeur' }
      ],
      gallery: [
        'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
      ],
      specifications: [
        { label: 'Matériaux', value: 'Vinyle, textile, bois, métal' },
        { label: 'Techniques', value: 'Impression, découpe, relief' },
        { label: 'Durabilité', value: '5 à 10 ans selon usage' },
        { label: 'Entretien', value: 'Facile et économique' }
      ],
      pricing: {
        basic: 'À partir de 200€',
        premium: 'À partir de 500€',
        custom: 'Projet sur mesure'
      },
      duration: '3 à 10 jours',
      warranty: '3 ans'
    },
    seo: {
      metaTitle: 'Habillage et décor Coulommiers - Transformation d\'espaces',
      metaDescription: 'Habillage de véhicules et décoration d\'espaces en Seine-et-Marne. Solutions créatives sur-mesure.',
      keywords: ['habillage véhicule', 'décoration', 'coulommiers', 'vitrine', 'décor']
    }
  },
  'print': {
    slug: 'print',
    title: 'Print',
    subtitle: 'Impression offset et numérique',
    description: 'Solutions d\'impression pour tous vos documents et supports de communication, de la carte de visite au catalogue.',
    heroImage: 'https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Notre savoir-faire en impression traditionnelle et numérique vous garantit des documents de qualité professionnelle.',
      features: [
        'Cartes de visite premium',
        'Brochures et catalogues',
        'Affiches et posters',
        'Papeterie d\'entreprise',
        'PLV carton sur-mesure',
        'Finitions premium (dorure, gaufrage)'
      ],
      process: [
        { step: 1, title: 'Analyse du projet', description: 'Définition des besoins et contraintes' },
        { step: 2, title: 'Préparation fichiers', description: 'Optimisation et vérification technique' },
        { step: 3, title: 'Épreuvage BAT', description: 'Validation avant production finale' },
        { step: 4, title: 'Impression', description: 'Production avec contrôle qualité permanent' },
        { step: 5, title: 'Finitions', description: 'Façonnage et finitions spéciales' },
        { step: 6, title: 'Livraison', description: 'Conditionnement et expédition soignée' }
      ],
      gallery: [
        'https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
      ],
      specifications: [
        { label: 'Formats', value: 'A7 à A0 et formats spéciaux' },
        { label: 'Papiers', value: '80g à 400g, couchés, recyclés' },
        { label: 'Finitions', value: 'Pelliculage, vernis, découpe' },
        { label: 'Quantités', value: 'De 1 à 100 000 exemplaires' }
      ],
      pricing: {
        basic: 'À partir de 0.10€',
        premium: 'À partir de 0.50€',
        custom: 'Tarif selon quantité'
      },
      duration: '2 à 7 jours',
      warranty: 'Qualité garantie'
    },
    seo: {
      metaTitle: 'Impression print Coulommiers - Cartes, brochures, catalogues',
      metaDescription: 'Impression offset et numérique en Seine-et-Marne. Cartes de visite, brochures, catalogues professionnels.',
      keywords: ['impression', 'print', 'coulommiers', 'carte de visite', 'brochure']
    }
  },
  'objet': {
    slug: 'objet',
    title: 'Objet',
    subtitle: 'Objets publicitaires personnalisés',
    description: 'Large gamme d\'objets publicitaires personnalisables pour renforcer votre communication et fidéliser vos clients.',
    heroImage: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    content: {
      intro: 'Transformez vos idées en objets publicitaires mémorables qui véhiculent votre image de marque au quotidien.',
      features: [
        'Textiles personnalisés',
        'Objets high-tech et USB',
        'Bagagerie et maroquinerie',
        'Objets du quotidien',
        'Cadeaux d\'affaires premium',
        'Packaging sur-mesure'
      ],
      process: [
        { step: 1, title: 'Sélection produits', description: 'Choix dans notre catalogue ou sourcing spécial' },
        { step: 2, title: 'Conception marquage', description: 'Adaptation de votre logo aux contraintes' },
        { step: 3, title: 'Échantillon', description: 'Validation sur produit réel avant production' },
        { step: 4, title: 'Production', description: 'Marquage et personnalisation en série' },
        { step: 5, title: 'Contrôle qualité', description: 'Vérification systématique avant livraison' },
        { step: 6, title: 'Conditionnement', description: 'Emballage individuel ou en lots selon besoin' }
      ],
      gallery: [
        'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
      ],
      specifications: [
        { label: 'Techniques', value: 'Sérigraphie, broderie, gravure, impression' },
        { label: 'Quantités', value: 'À partir de 50 pièces' },
        { label: 'Délais', value: '5 à 20 jours selon complexité' },
        { label: 'Origine', value: 'Europe privilégiée, traçabilité assurée' }
      ],
      pricing: {
        basic: 'À partir de 2€/pièce',
        premium: 'À partir de 10€/pièce',
        custom: 'Tarif dégressif'
      },
      duration: '5 à 20 jours',
      warranty: 'Défauts de fabrication'
    },
    seo: {
      metaTitle: 'Objets publicitaires Coulommiers - Goodies personnalisés',
      metaDescription: 'Objets publicitaires personnalisés en Seine-et-Marne. Textile, high-tech, maroquinerie, cadeaux d\'affaires.',
      keywords: ['objet publicitaire', 'goodies', 'coulommiers', 'textile personnalisé', 'cadeau']
    }
  }
  // Can easily add more services here...
};

export const ServiceDetail: React.FC = () => {
  const { service } = useParams<{ service: string }>();
  
  if (!service || !serviceTemplates[service]) {
    return <Navigate to="/services" replace />;
  }

  const template = serviceTemplates[service];

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
            <Link to="/services" className="text-slate-600 hover:text-brand-600">Services</Link>
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
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Description du service</h2>
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
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Nos prestations</h3>
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

            {/* Process */}
            {template.content.process && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Notre processus</h3>
                <div className="space-y-6">
                  {template.content.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">{step.title}</h4>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}


          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Service Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-6">Informations pratiques</h3>
              <div className="space-y-4">
                {template.content.pricing && (
                  <div className="flex items-start space-x-3">
                    <Euro className="w-5 h-5 text-brand-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-800">Tarifs</div>
                      <div className="text-sm text-slate-600">
                        {template.content.pricing.basic && <div>Basic: {template.content.pricing.basic}</div>}
                        {template.content.pricing.premium && <div>Premium: {template.content.pricing.premium}</div>}
                        {template.content.pricing.custom && <div>{template.content.pricing.custom}</div>}
                      </div>
                    </div>
                  </div>
                )}
                
                {template.content.duration && (
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-brand-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-800">Délai</div>
                      <div className="text-sm text-slate-600">{template.content.duration}</div>
                    </div>
                  </div>
                )}
                
                {template.content.warranty && (
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-brand-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-800">Garantie</div>
                      <div className="text-sm text-slate-600">{template.content.warranty}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Specifications */}
            {template.content.specifications && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-4">Spécifications</h3>
                <div className="space-y-3">
                  {template.content.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium text-slate-700">{spec.label}:</span>
                      <span className="text-slate-600 text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-brand-500 rounded-xl p-6 text-white text-center"
            >
              <h3 className="text-xl font-bold mb-4">Intéressé par ce service ?</h3>
              <p className="mb-6">Contactez-nous pour un devis personnalisé</p>
              <div className="space-y-3">
                <Link 
                  to="/contact"
                  className="block bg-white text-brand-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Demander un devis
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
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link 
                to="/services"
                className="flex items-center space-x-2 text-slate-600 hover:text-brand-600 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Retour aux services</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Portfolio Gallery */}
      <PortfolioGallery 
        category={template.slug}
        title={`Nos réalisations en ${template.title}`}
        subtitle={`Découvrez nos projets ${template.title.toLowerCase()} en Seine-et-Marne`}
      />
    </div>
  );
}; 