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
  {
    id: '1',
    title: 'Projet Hôtel Luxe',
    description: 'Signalétique complète pour hôtel 5 étoiles',
    image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'hôtellerie'
  },
  {
    id: '2',
    title: 'Enseigne Restaurant',
    description: 'Enseigne lumineuse pour restaurant gastronomique',
    image: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'commerce'
  },
  {
    id: '3',
    title: 'Signalétique Industrielle',
    description: 'Panneaux de sécurité et directionnels',
    image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'industrie'
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