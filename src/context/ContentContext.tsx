import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  date?: string;
  content?: string;
}

interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroImage {
  id: string;
  page: string;
  image: string;
  title?: string;
  subtitle?: string;
}

interface ContentContextType {
  services: ContentItem[];
  sectors: ContentItem[];
  portfolioItems: ContentItem[];
  newsArticles: ContentItem[];
  slides: SlideItem[];
  heroImages: HeroImage[];
  updateContent: (type: string, items: ContentItem[]) => void;
  addContentItem: (type: string, item: ContentItem) => void;
  deleteContentItem: (type: string, id: string) => void;
  updateSlides: (slides: SlideItem[]) => void;
  addSlide: (slide: SlideItem) => void;
  deleteSlide: (id: string) => void;
  updateHeroImages: (heroImages: HeroImage[]) => void;
  updateHeroImage: (page: string, image: string, title?: string, subtitle?: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

const initialServices: ContentItem[] = [
  {
    id: '1',
    title: 'Signalétique',
    description: 'Solutions de signalétique sur mesure pour votre entreprise',
    category: 'service'
  },
  {
    id: '2',
    title: 'Enseigne',
    description: 'Création d\'enseignes lumineuses et non-lumineuses',
    category: 'service'
  },
  {
    id: '3',
    title: 'Gravure',
    description: 'Gravure laser et mécanique de précision',
    category: 'service'
  },
  {
    id: '4',
    title: 'Impression Numérique',
    description: 'Impression grand format haute qualité',
    category: 'service'
  },
  {
    id: '5',
    title: 'Film Solaire et Technique',
    description: 'Pose de films de protection et décoratifs',
    category: 'service'
  },
  {
    id: '6',
    title: 'Habillage et Décor',
    description: 'Habillage de véhicules et décoration d\'espaces',
    category: 'service'
  }
];

const initialSectors: ContentItem[] = [
  {
    id: '1',
    title: 'Hôtellerie',
    description: 'Solutions adaptées au secteur hôtelier',
    category: 'sector'
  },
  {
    id: '2',
    title: 'Industrie',
    description: 'Signalétique industrielle et de sécurité',
    category: 'sector'
  },
  {
    id: '3',
    title: 'Tertiaire',
    description: 'Communication visuelle pour bureaux et commerces',
    category: 'sector'
  },
  {
    id: '4',
    title: 'Commerce',
    description: 'Solutions retail et points de vente',
    category: 'sector'
  },
  {
    id: '5',
    title: 'Événementiel',
    description: 'Supports de communication événementielle',
    category: 'sector'
  }
];

const initialPortfolio: ContentItem[] = [
  // Réalisations principales
  {
    id: '1',
    title: 'Hôtel Le Coulommiers Palace',
    description: 'Signalétique complète et enseigne lumineuse pour hôtel 4 étoiles - Coulommiers',
    image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'hôtellerie'
  },
  {
    id: '2',
    title: 'Restaurant Le Brie Gourmand',
    description: 'Enseigne lumineuse LED et vitrophanie - Meaux (77)',
    image: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'commerce'
  },
  {
    id: '3',
    title: 'Zone Industrielle Provins',
    description: 'Signalétique directionnelle et panneaux de sécurité - Provins (77)',
    image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'industrie'
  },
  {
    id: '4',
    title: 'Mairie de Coulommiers',
    description: 'Signalétique institutionnelle et totem d\'accueil - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/8313183/pexels-photo-8313183.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'institutionnel'
  },
  {
    id: '5',
    title: 'Centre Commercial Val d\'Europe',
    description: 'Enseignes magasins et signalétique directionnelle - Chessy (77)',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'commerce'
  },
  
  // Services - Signalétique
  {
    id: 'sign1',
    title: 'Cabinet Médical Seine & Santé',
    description: 'Signalétique directionnelle et d\'information - Lagny-sur-Marne (77)',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'signalétique'
  },
  {
    id: 'sign2',
    title: 'Lycée Jean Vilar Meaux',
    description: 'Panneaux directionnels et signalétique d\'urgence - Meaux (77)',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'signalétique'
  },
  {
    id: 'sign3',
    title: 'Parc d\'Activités de Chessy',
    description: 'Totems d\'accueil et signalétique extérieure - Chessy (77)',
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'signalétique'
  },
  {
    id: 'sign4',
    title: 'Résidence Les Jardins de Brie',
    description: 'Signalétique résidentielle et panneaux informatifs - Brie-Comte-Robert (77)',
    image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'signalétique'
  },
  {
    id: 'sign5',
    title: 'Clinique Vétérinaire du Morin',
    description: 'Enseigne et signalétique intérieure - Crécy-la-Chapelle (77)',
    image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'signalétique'
  },

  // Services - Enseignes
  {
    id: 'enseigne1',
    title: 'Boulangerie Artisanale du Terroir',
    description: 'Enseigne lumineuse LED et caisson rétroéclairé - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'enseigne'
  },
  {
    id: 'enseigne2',
    title: 'Garage Automobile Expert',
    description: 'Enseigne totem et bandeau façade - Fontainebleau (77)',
    image: 'https://images.pexels.com/photos/13861/IMG_3803.jpg?auto=compress&cs=tinysrgb&w=800',
    category: 'enseigne'
  },
  {
    id: 'enseigne3',
    title: 'Pharmacie de la Gare',
    description: 'Croix LED pharmacie et enseigne drapeau - Melun (77)',
    image: 'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'enseigne'
  },
  {
    id: 'enseigne4',
    title: 'Salon de Coiffure Tendance & Style',
    description: 'Enseigne lumineuse et vitrophanie - Torcy (77)',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'enseigne'
  },
  {
    id: 'enseigne5',
    title: 'Restaurant Pizzeria Bella Vista',
    description: 'Enseigne néon et habillage vitrine - Chelles (77)',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'enseigne'
  },

  // Services - Gravure
  {
    id: 'gravure1',
    title: 'Plaques Professionnelles Brie',
    description: 'Gravure laser sur plaques aluminium - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'gravure'
  },
  {
    id: 'gravure2',
    title: 'Marquage Industriel Seine-et-Marne',
    description: 'Gravure mécanique sur acier inoxydable - Meaux (77)',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'gravure'
  },
  {
    id: 'gravure3',
    title: 'Plaques Commémoratives Provins',
    description: 'Gravure laser sur pierre et marbre - Provins (77)',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'gravure'
  },
  {
    id: 'gravure4',
    title: 'Étiquettes Techniques Fontainebleau',
    description: 'Gravure sur plastique et métal - Fontainebleau (77)',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'gravure'
  },
  {
    id: 'gravure5',
    title: 'Plaques Directionnelles Melun',
    description: 'Gravure sur plexiglas et aluminium - Melun (77)',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'gravure'
  },

  // Services - Impression Numérique
  {
    id: 'impression-numerique1',
    title: 'Bâches Publicitaires Grand Format',
    description: 'Impression numérique jusqu\'à 5m de large - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'impression-numerique'
  },
  {
    id: 'impression-numerique2',
    title: 'Panneaux Rigides Meaux',
    description: 'Impression sur Dibond et PVC - Meaux (77)',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'impression-numerique'
  },
  {
    id: 'impression-numerique3',
    title: 'Adhésifs Vitres Provins',
    description: 'Impression sur film adhésif transparent - Provins (77)',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'impression-numerique'
  },
  {
    id: 'impression-numerique4',
    title: 'Roll-ups Événementiels',
    description: 'Supports d\'exposition imprimés - Fontainebleau (77)',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'impression-numerique'
  },
  {
    id: 'impression-numerique5',
    title: 'Kakémonos Professionnels',
    description: 'Bannières verticales grand format - Melun (77)',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'impression-numerique'
  },

  // Services - Film Solaire et Technique
  {
    id: 'film-solaire-technique1',
    title: 'Protection Solaire Hôtel Brie',
    description: 'Films anti-chaleur et UV - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'film-solaire-technique'
  },
  {
    id: 'film-solaire-technique2',
    title: 'Sécurité Vitres Centre Commercial',
    description: 'Films anti-effraction et anti-vandalisme - Meaux (77)',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'film-solaire-technique'
  },
  {
    id: 'film-solaire-technique3',
    title: 'Intimité Bureaux Provins',
    description: 'Films décoratifs et one-way - Provins (77)',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'film-solaire-technique'
  },
  {
    id: 'film-solaire-technique4',
    title: 'Protection Graffiti Fontainebleau',
    description: 'Films anti-graffiti et protection - Fontainebleau (77)',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'film-solaire-technique'
  },
  {
    id: 'film-solaire-technique5',
    title: 'Décoration Vitres Melun',
    description: 'Films décoratifs et motifs - Melun (77)',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'film-solaire-technique'
  },

  // Services - Habillage et Décor
  {
    id: 'habillage-decor1',
    title: 'Habillage Véhicule Commercial',
    description: 'Vinyle adhésif complet - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'habillage-decor'
  },
  {
    id: 'habillage-decor2',
    title: 'Décoration Murale Meaux',
    description: 'Habillage mural et fresques - Meaux (77)',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'habillage-decor'
  },
  {
    id: 'habillage-decor3',
    title: 'Vitrine Boutique Provins',
    description: 'Habillage de vitrine et décoration - Provins (77)',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'habillage-decor'
  },
  {
    id: 'habillage-decor4',
    title: 'Décor Événementiel Fontainebleau',
    description: 'Décors et habillages temporaires - Fontainebleau (77)',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'habillage-decor'
  },
  {
    id: 'habillage-decor5',
    title: 'Mobilier Sur-mesure Melun',
    description: 'Mobilier décoratif personnalisé - Melun (77)',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'habillage-decor'
  },

  // Services - Print
  {
    id: 'print1',
    title: 'Cartes de Visite Premium',
    description: 'Impression offset haute qualité - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'print'
  },
  {
    id: 'print2',
    title: 'Brochures Entreprises Meaux',
    description: 'Catalogues et brochures professionnelles - Meaux (77)',
    image: 'https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'print'
  },
  {
    id: 'print3',
    title: 'Affiches Événementielles Provins',
    description: 'Affiches et posters grand format - Provins (77)',
    image: 'https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'print'
  },
  {
    id: 'print4',
    title: 'Papeterie Corporate Fontainebleau',
    description: 'Papeterie d\'entreprise complète - Fontainebleau (77)',
    image: 'https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'print'
  },
  {
    id: 'print5',
    title: 'PLV Carton Melun',
    description: 'Supports de vente carton - Melun (77)',
    image: 'https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'print'
  },

  // Services - Objet
  {
    id: 'objet1',
    title: 'Textiles Personnalisés Brie',
    description: 'T-shirts et polos brodés - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'objet'
  },
  {
    id: 'objet2',
    title: 'Objets High-Tech Meaux',
    description: 'Clés USB et powerbanks gravés - Meaux (77)',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'objet'
  },
  {
    id: 'objet3',
    title: 'Bagagerie Provins',
    description: 'Sacs et bagagerie personnalisés - Provins (77)',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'objet'
  },
  {
    id: 'objet4',
    title: 'Cadeaux d\'Affaires Fontainebleau',
    description: 'Objets promotionnels premium - Fontainebleau (77)',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'objet'
  },
  {
    id: 'objet5',
    title: 'Packaging Sur-mesure Melun',
    description: 'Emballages personnalisés - Melun (77)',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'objet'
  },

  // Secteurs - Tertiaire
  {
    id: 'tertiaire1',
    title: 'Centre d\'Affaires Brie',
    description: 'Signalétique directionnelle corporate - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'tertiaire'
  },
  {
    id: 'tertiaire2',
    title: 'Administration Meaux',
    description: 'Plaques de porte et totems - Meaux (77)',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'tertiaire'
  },
  {
    id: 'tertiaire3',
    title: 'Bureaux Provins',
    description: 'Signalétique intérieure professionnelle - Provins (77)',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'tertiaire'
  },
  {
    id: 'tertiaire4',
    title: 'Cabinet Conseil Fontainebleau',
    description: 'Enseignes de façade élégantes - Fontainebleau (77)',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'tertiaire'
  },
  {
    id: 'tertiaire5',
    title: 'Agence Immobilière Melun',
    description: 'Vitrophanie et signalétique - Melun (77)',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'tertiaire'
  },

  // Secteurs - Événementiel
  {
    id: 'evenementiel1',
    title: 'Festival Jazz en Brie',
    description: 'Signalétique événementielle complète - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'evenementiel'
  },
  {
    id: 'evenementiel2',
    title: 'Salon Professionnel Meaux',
    description: 'Stands et supports d\'exposition - Meaux (77)',
    image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'evenementiel'
  },
  {
    id: 'evenementiel3',
    title: 'Congrès Provins',
    description: 'Signalétique directionnelle temporaire - Provins (77)',
    image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'evenementiel'
  },
  {
    id: 'evenementiel4',
    title: 'Mariage Château Fontainebleau',
    description: 'Décoration événementielle - Fontainebleau (77)',
    image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'evenementiel'
  },
  {
    id: 'evenementiel5',
    title: 'Événement Sportif Melun',
    description: 'Banderoles et kakémonos - Melun (77)',
    image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'evenementiel'
  },

  // Secteurs - Musée et Parc à Thème
  {
    id: 'musee-parc1',
    title: 'Musée de la Brie',
    description: 'Signalétique muséographique - Coulommiers (77)',
    image: 'https://images.pexels.com/photos/1927639/pexels-photo-1927639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'musee-parc'
  },
  {
    id: 'musee-parc2',
    title: 'Parc d\'Attractions Meaux',
    description: 'Signalétique thématique et directionnelle - Meaux (77)',
    image: 'https://images.pexels.com/photos/1927639/pexels-photo-1927639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'musee-parc'
  },
  {
    id: 'musee-parc3',
    title: 'Site Historique Provins',
    description: 'Panneaux pédagogiques et informatifs - Provins (77)',
    image: 'https://images.pexels.com/photos/1927639/pexels-photo-1927639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'musee-parc'
  },
  {
    id: 'musee-parc4',
    title: 'Château Fontainebleau',
    description: 'Signalétique patrimoniale - Fontainebleau (77)',
    image: 'https://images.pexels.com/photos/1927639/pexels-photo-1927639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'musee-parc'
  },
  {
    id: 'musee-parc5',
    title: 'Parc Naturel Melun',
    description: 'Signalétique environnementale - Melun (77)',
    image: 'https://images.pexels.com/photos/1927639/pexels-photo-1927639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'musee-parc'
  }
];

const initialNews: ContentItem[] = [
  {
    id: '1',
    title: 'Nouvelle machine de découpe laser',
    description: 'Nous avons investi dans une nouvelle machine de découpe laser pour améliorer notre précision',
    date: '2024-01-15',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
  },
  {
    id: '2',
    title: 'Partenariat avec éco-responsable',
    description: 'Osmoz Communication s\'engage dans une démarche éco-responsable',
    date: '2024-01-10',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
  }
];

const initialSlides: SlideItem[] = [
  {
    id: '1',
    title: 'Se faire voir, connaître et reconnaître',
    subtitle: 'Expert en Communication Visuelle',
    description: 'Spécialisés dans la création et la mise en œuvre de solutions de communication visuelle qui captivent et inspirent.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    buttonText: 'Découvrir nos réalisations',
    buttonLink: '/portfolio'
  },
  {
    id: '2',
    title: 'Innovation et Créativité',
    subtitle: 'Technologies de Pointe',
    description: 'Nous utilisons les dernières technologies pour créer des solutions visuelles innovantes et percutantes.',
    image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    buttonText: 'Nos services',
    buttonLink: '/services'
  },
  {
    id: '3',
    title: 'Votre Partenaire de Confiance',
    subtitle: 'Plus de 10 ans d\'Expérience',
    description: 'Une expertise reconnue au service de votre image et de votre développement commercial.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    buttonText: 'Nous contacter',
    buttonLink: '/contact'
  }
];

const initialHeroImages: HeroImage[] = [
  {
    id: '1',
    page: 'about',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'À Propos d\'Osmoz Communication',
    subtitle: 'Votre expertise en communication visuelle'
  },
  {
    id: '2',
    page: 'services',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Nos Services',
    subtitle: 'Solutions complètes de communication visuelle'
  },
  {
    id: '3',
    page: 'sectors',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Nos Secteurs d\'Activité',
    subtitle: 'Des solutions adaptées à chaque métier'
  },
  {
    id: '4',
    page: 'portfolio',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Notre Portfolio',
    subtitle: 'Découvrez nos plus belles réalisations'
  },
  {
    id: '5',
    page: 'news',
    image: 'https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Actualités',
    subtitle: 'Restez informé de nos dernières nouveautés'
  },
  {
    id: '6',
    page: 'contact',
    image: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    title: 'Contactez-nous',
    subtitle: 'Démarrons votre projet ensemble'
  }
];

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ContentItem[]>(initialServices);
  const [sectors, setSectors] = useState<ContentItem[]>(initialSectors);
  const [portfolioItems, setPortfolioItems] = useState<ContentItem[]>(initialPortfolio);
  const [newsArticles, setNewsArticles] = useState<ContentItem[]>(initialNews);
  const [slides, setSlides] = useState<SlideItem[]>(initialSlides);
  const [heroImages, setHeroImages] = useState<HeroImage[]>(initialHeroImages);

  const updateContent = (type: string, items: ContentItem[]) => {
    switch (type) {
      case 'services':
        setServices(items);
        break;
      case 'sectors':
        setSectors(items);
        break;
      case 'portfolio':
        setPortfolioItems(items);
        break;
      case 'news':
        setNewsArticles(items);
        break;
    }
  };

  const addContentItem = (type: string, item: ContentItem) => {
    const newItem = { ...item, id: Date.now().toString() };
    switch (type) {
      case 'services':
        setServices(prev => [...prev, newItem]);
        break;
      case 'sectors':
        setSectors(prev => [...prev, newItem]);
        break;
      case 'portfolio':
        setPortfolioItems(prev => [...prev, newItem]);
        break;
      case 'news':
        setNewsArticles(prev => [...prev, newItem]);
        break;
    }
  };

  const deleteContentItem = (type: string, id: string) => {
    switch (type) {
      case 'services':
        setServices(prev => prev.filter(item => item.id !== id));
        break;
      case 'sectors':
        setSectors(prev => prev.filter(item => item.id !== id));
        break;
      case 'portfolio':
        setPortfolioItems(prev => prev.filter(item => item.id !== id));
        break;
      case 'news':
        setNewsArticles(prev => prev.filter(item => item.id !== id));
        break;
    }
  };

  const updateSlides = (newSlides: SlideItem[]) => {
    setSlides(newSlides);
  };

  const addSlide = (slide: SlideItem) => {
    const newSlide = { ...slide, id: Date.now().toString() };
    setSlides(prev => [...prev, newSlide]);
  };

  const deleteSlide = (id: string) => {
    setSlides(prev => prev.filter(slide => slide.id !== id));
  };

  const updateHeroImages = (newHeroImages: HeroImage[]) => {
    setHeroImages(newHeroImages);
  };

  const updateHeroImage = (page: string, image: string, title?: string, subtitle?: string) => {
    setHeroImages(prev => prev.map(hero => 
      hero.page === page 
        ? { ...hero, image, title: title || hero.title, subtitle: subtitle || hero.subtitle }
        : hero
    ));
  };

  return (
    <ContentContext.Provider value={{
      services,
      sectors,
      portfolioItems,
      newsArticles,
      slides,
      heroImages,
      updateContent,
      addContentItem,
      deleteContentItem,
      updateSlides,
      addSlide,
      deleteSlide,
      updateHeroImages,
      updateHeroImage
    }}>
      {children}
    </ContentContext.Provider>
  );
};