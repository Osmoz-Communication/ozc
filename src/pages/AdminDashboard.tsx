import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaHome, FaCog, FaUsers, FaImages, FaNewspaper, FaServicestack, FaIndustry, FaEye, FaUpload, FaImage, FaSignOutAlt, FaBlog, FaRobot, FaClock, FaEnvelope, FaMailBulk, FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Button, IconButton, Tooltip } from '@mui/material';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'delete'>('add');
  const [modalContent, setModalContent] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [publishDateTime, setPublishDateTime] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(1);


  // Données fictives pour les utilisateurs
  const [users, setUsers] = useState([
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@ozc.fr', role: 'Administrateur', status: 'Actif', lastLogin: '2024-01-15', phone: '01 84 19 01 04' },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@ozc.fr', role: 'Éditeur', status: 'Actif', lastLogin: '2024-01-14', phone: '01 84 19 01 05' },
    { id: 3, name: 'Pierre Bernard', email: 'pierre.bernard@ozc.fr', role: 'Commercial', status: 'Inactif', lastLogin: '2024-01-10', phone: '01 84 19 01 06' },
    { id: 4, name: 'Sophie Durand', email: 'sophie.durand@ozc.fr', role: 'Designer', status: 'Actif', lastLogin: '2024-01-15', phone: '01 84 19 01 07' },
    { id: 5, name: 'Thomas Robert', email: 'thomas.robert@ozc.fr', role: 'Technicien', status: 'Actif', lastLogin: '2024-01-13', phone: '01 84 19 01 08' }
  ]);

  // Thème MUI personnalisé
  const muiTheme = createTheme({
    palette: {
      primary: {
        main: '#22c55e', // brand-500
      },
    },
  });

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: FaHome },
    { id: 'slides', label: 'Slider de l\'accueil', icon: FaImages },
    { id: 'services', label: 'Services', icon: FaServicestack },
    { id: 'secteurs', label: 'Secteurs', icon: FaIndustry },
    { id: 'portfolio', label: 'Portfolio', icon: FaEye },
    { id: 'articles', label: 'Articles de blog', icon: FaBlog },
    { id: 'messages', label: 'Messages', icon: FaEnvelope },
    { id: 'newsletter', label: 'Newsletter', icon: FaMailBulk },
    { id: 'users', label: 'Utilisateurs', icon: FaUsers },
    { id: 'settings', label: 'Paramètres', icon: FaCog }
  ];

  const [slides, setSlides] = useState([
    { id: 1, title: 'Communication Visuelle', subtitle: 'Excellence & Innovation', image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800', status: 'Actif', order: 1 },
    { id: 2, title: 'Signalétique', subtitle: 'Sur-mesure', image: 'https://images.pexels.com/photos/2422277/pexels-photo-2422277.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800', status: 'Actif', order: 2 },
    { id: 3, title: 'Impression', subtitle: 'Haute Qualité', image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800', status: 'Inactif', order: 3 }
  ]);

  // Fonctions pour le drag & drop des slides
  const handleDragStart = (e: React.DragEvent, slideId: number) => {
    const slide = slides.find(s => s.id === slideId);
    // Empêcher le drag des slides inactives
    if (slide?.status === 'Inactif') {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', slideId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    
    const draggedSlide = slides.find(slide => slide.id === draggedId);
    const targetSlide = slides.find(slide => slide.id === targetId);
    
    // Empêcher le drop sur ou depuis des slides inactives
    if (draggedSlide?.status === 'Inactif' || targetSlide?.status === 'Inactif') {
      return;
    }
    
    if (draggedId !== targetId && draggedSlide && targetSlide) {
      const newSlides = [...slides];
      const draggedIndex = newSlides.findIndex(slide => slide.id === draggedId);
      const targetIndex = newSlides.findIndex(slide => slide.id === targetId);
      
      // Échanger les positions seulement entre slides actives
      [newSlides[draggedIndex], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[draggedIndex]];
      
      // Réorganiser les ordres : slides actives d'abord, puis inactives
      const activeSlides = newSlides.filter(slide => slide.status === 'Actif');
      const inactiveSlides = newSlides.filter(slide => slide.status === 'Inactif');
      
      // Assigner les ordres
      activeSlides.forEach((slide, index) => {
        slide.order = index + 1;
      });
      inactiveSlides.forEach((slide, index) => {
        slide.order = activeSlides.length + index + 1;
      });
      
      setSlides([...activeSlides, ...inactiveSlides]);
    }
  };

  // État pour le drag & drop des services
  const [draggedServiceId, setDraggedServiceId] = useState<number | null>(null);
  const [dragOverServiceId, setDragOverServiceId] = useState<number | null>(null);

  // État pour le drag & drop des secteurs
  const [draggedSecteurId, setDraggedSecteurId] = useState<number | null>(null);
  const [dragOverSecteurId, setDragOverSecteurId] = useState<number | null>(null);

  // Fonctions pour le drag & drop des services
  const handleServiceDragStart = (e: React.DragEvent, serviceId: number) => {
    e.dataTransfer.setData('text/plain', serviceId.toString());
    setDraggedServiceId(serviceId);
    
    // Créer une image de drag plus visible
    const dragElement = e.currentTarget as HTMLElement;
    const rect = dragElement.getBoundingClientRect();
    
    // Cloner l'élément pour créer l'image de drag
    const clone = dragElement.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.transform = 'scale(0.8)';
    clone.style.opacity = '0.9';
    clone.style.border = '2px solid #22c55e';
    clone.style.borderRadius = '12px';
    clone.style.backgroundColor = '#ffffff';
    clone.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    
    document.body.appendChild(clone);
    
    // Utiliser le clone comme image de drag
    e.dataTransfer.setDragImage(clone, rect.width / 2, rect.height / 2);
    
    // Nettoyer le clone après un délai
    setTimeout(() => {
      if (document.body.contains(clone)) {
        document.body.removeChild(clone);
      }
    }, 0);
  };

  const handleServiceDragOver = (e: React.DragEvent, serviceId: number) => {
    e.preventDefault();
    setDragOverServiceId(serviceId);
  };

  const handleServiceDragLeave = () => {
    setDragOverServiceId(null);
  };

  const handleServiceDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    
    setDraggedServiceId(null);
    setDragOverServiceId(null);
    
    if (draggedId !== targetId) {
      const draggedService = services.find(service => service.id === draggedId);
      const targetService = services.find(service => service.id === targetId);
      
      if (draggedService && targetService) {
        const newServices = [...services];
        const draggedIndex = newServices.findIndex(service => service.id === draggedId);
        const targetIndex = newServices.findIndex(service => service.id === targetId);
        
        // Échanger les positions
        [newServices[draggedIndex], newServices[targetIndex]] = [newServices[targetIndex], newServices[draggedIndex]];
        
        // Mettre à jour les ordres
        newServices.forEach((service, index) => {
          service.order = index + 1;
        });
        
        setServices(newServices);
      }
    }
  };

  const handleServiceDragEnd = () => {
    setDraggedServiceId(null);
    setDragOverServiceId(null);
  };

  // Fonctions pour le drag & drop des secteurs
  const handleSecteurDragStart = (e: React.DragEvent, secteurId: number) => {
    e.dataTransfer.setData('text/plain', secteurId.toString());
    setDraggedSecteurId(secteurId);
    
    // Créer une image de drag plus visible
    const dragElement = e.currentTarget as HTMLElement;
    const rect = dragElement.getBoundingClientRect();
    
    // Cloner l'élément pour créer l'image de drag
    const clone = dragElement.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.transform = 'scale(0.8)';
    clone.style.opacity = '0.9';
    clone.style.border = '2px solid #22c55e';
    clone.style.borderRadius = '12px';
    clone.style.backgroundColor = '#ffffff';
    clone.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    
    document.body.appendChild(clone);
    
    // Utiliser le clone comme image de drag
    e.dataTransfer.setDragImage(clone, rect.width / 2, rect.height / 2);
    
    // Nettoyer le clone après un délai
    setTimeout(() => {
      if (document.body.contains(clone)) {
        document.body.removeChild(clone);
      }
    }, 0);
  };

  const handleSecteurDragOver = (e: React.DragEvent, secteurId: number) => {
    e.preventDefault();
    setDragOverSecteurId(secteurId);
  };

  const handleSecteurDragLeave = () => {
    setDragOverSecteurId(null);
  };

  const handleSecteurDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    
    setDraggedSecteurId(null);
    setDragOverSecteurId(null);
    
    if (draggedId !== targetId) {
      const draggedSecteur = secteurs.find(secteur => secteur.id === draggedId);
      const targetSecteur = secteurs.find(secteur => secteur.id === targetId);
      
      if (draggedSecteur && targetSecteur) {
        const newSecteurs = [...secteurs];
        const draggedIndex = newSecteurs.findIndex(secteur => secteur.id === draggedId);
        const targetIndex = newSecteurs.findIndex(secteur => secteur.id === targetId);
        
        // Échanger les positions
        [newSecteurs[draggedIndex], newSecteurs[targetIndex]] = [newSecteurs[targetIndex], newSecteurs[draggedIndex]];
        
        // Mettre à jour les ordres
        newSecteurs.forEach((secteur, index) => {
          secteur.order = index + 1;
        });
        
        setSecteurs(newSecteurs);
      }
    }
  };

  const handleSecteurDragEnd = () => {
    setDraggedSecteurId(null);
    setDragOverSecteurId(null);
  };

  const [services, setServices] = useState([
    { 
      id: 1, 
      name: 'Signalétique', 
      description: 'Solutions de signalétique intérieure et extérieure sur-mesure', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/2422277/pexels-photo-2422277.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'signaletique',
      portfolioProjects: [],
      order: 1
    },
    { 
      id: 2, 
      name: 'Enseigne', 
      description: 'Conception et installation d\'enseignes lumineuses et non-lumineuses', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'enseigne',
      portfolioProjects: [],
      order: 2
    },
    { 
      id: 3, 
      name: 'Gravure', 
      description: 'Gravure laser haute précision sur tous matériaux', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'gravure',
      portfolioProjects: [],
      order: 3
    },
    { 
      id: 4, 
      name: 'Impression', 
      description: 'Impression grand format et petit format haute qualité', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'impression',
      portfolioProjects: [],
      order: 4
    },
    { 
      id: 5, 
      name: 'Marquage Véhicule', 
      description: 'Marquage publicitaire et habillage de véhicules', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'marquage-vehicule',
      portfolioProjects: [],
      order: 5
    },
    { 
      id: 6, 
      name: 'Stands & PLV', 
      description: 'Stands d\'exposition et publicité sur lieu de vente', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'stands-plv',
      portfolioProjects: [],
      order: 6
    },
    { 
      id: 7, 
      name: 'Bâches & Banderoles', 
      description: 'Bâches publicitaires et banderoles événementielles', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'baches-banderoles',
      portfolioProjects: [],
      order: 7
    },
    { 
      id: 8, 
      name: 'Adhésifs & Stickers', 
      description: 'Adhésifs décoratifs et stickers personnalisés', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'adhesifs-stickers',
      portfolioProjects: [],
      order: 8
    }
  ]);

  const [secteurs, setSecteurs] = useState([
    { 
      id: 1, 
      name: 'Hôtellerie', 
      description: 'Solutions signalétiques pour hôtels, restaurants et établissements touristiques', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'hotellerie',
      order: 1
    },
    { 
      id: 2, 
      name: 'Commerce', 
      description: 'Signalétique commerciale pour magasins, centres commerciaux et points de vente', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'commerce',
      order: 2
    },
    { 
      id: 3, 
      name: 'Industrie', 
      description: 'Signalétique industrielle, sécurité et marquage d\'usines', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'industrie',
      order: 3
    },
    { 
      id: 4, 
      name: 'Santé', 
      description: 'Signalétique médicale pour hôpitaux, cliniques et cabinets médicaux', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'sante',
      order: 4
    },
    { 
      id: 5, 
      name: 'Éducation', 
      description: 'Signalétique éducative pour écoles, universités et centres de formation', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'education',
      order: 5
    },
    { 
      id: 6, 
      name: 'Transport', 
      description: 'Signalétique de transport pour gares, aéroports et transports en commun', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'transport',
      order: 6
    },
    { 
      id: 7, 
      name: 'Bureaux', 
      description: 'Signalétique de bureaux et espaces de travail', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'bureaux',
      order: 7
    },
    { 
      id: 8, 
      name: 'Événementiel', 
      description: 'Signalétique événementielle temporaire et stands', 
      status: 'Visible',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      slug: 'evenementiel',
      order: 8
    }
  ]);

  const mockPortfolio = [
    { id: 1, title: 'Hotel Mama Shelter', category: 'Hôtellerie', image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', date: '2024-01-15', description: 'Signalétique complète pour hôtel' },
    { id: 2, title: 'Enseigne Intermarché', category: 'Commerce', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', date: '2024-01-10', description: 'Enseigne lumineuse et signalétique' },
    { id: 3, title: 'Signalétique IKEA', category: 'Commerce', image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', date: '2024-01-05', description: 'Signalétique directionnelle' },
    { id: 4, title: 'Mairie de Paris', category: 'Bureaux', image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', date: '2024-01-03', description: 'Signalétique institutionnelle' },
    { id: 5, title: 'Hôpital Saint-Louis', category: 'Santé', image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', date: '2024-01-01', description: 'Signalétique médicale' },
    { id: 6, title: 'Usine Renault', category: 'Industrie', image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', date: '2023-12-28', description: 'Signalétique de sécurité' },
    { id: 7, title: 'Gare de Lyon', category: 'Transport', image: 'https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', date: '2023-12-25', description: 'Signalétique de transport' },
    { id: 8, title: 'Salon du Meuble', category: 'Événementiel', image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', date: '2023-12-20', description: 'Stand événementiel' },
    { id: 9, title: 'École Polytechnique', category: 'Éducation', image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', date: '2023-12-15', description: 'Signalétique éducative' },
    { id: 10, title: 'Disney Village', category: 'Commerce', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800&h=600', date: '2023-12-10', description: 'Signalétique thématique' }
  ];

  const [articles, setArticles] = useState([
    { 
      id: 1, 
      title: "L'évolution de la signalétique numérique en 2024", 
      excerpt: "Découvrez les dernières tendances en signalétique numérique...", 
      status: 'Publié', 
      author: 'Marie Dubois', 
      date: '2024-01-15',
      publishDate: '2024-01-15',
      category: 'Tendances',
      readTime: '5 min'
    },
    { 
      id: 2, 
      title: "Guide réglementation enseignes Seine-et-Marne 2024", 
      excerpt: "Tout savoir sur la réglementation des enseignes commerciales...", 
      status: 'Publié', 
      author: 'Pierre Martin', 
      date: '2024-01-12',
      publishDate: '2024-01-12',
      category: 'Réglementation',
      readTime: '8 min'
    },
    { 
      id: 3, 
      title: "5 conseils signalétique hôtelière performante", 
      excerpt: "Optimisez l'expérience client de votre établissement hôtelier...", 
      status: 'Brouillon', 
      author: 'Sophie Laurent', 
      date: '2024-01-10',
      publishDate: null,
      category: 'Conseils',
      readTime: '6 min'
    },
    { 
      id: 4, 
      title: "Tendances design signalétique 2024", 
      excerpt: "Les nouvelles tendances en matière de design de signalétique...", 
      status: 'Programmé', 
      author: 'Jean Dupont', 
      date: '2024-01-16',
      publishDate: '2024-01-20',
      category: 'Design',
      readTime: '7 min'
    }
  ]);

  // Données pour les messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Jean Mercier',
      email: 'jean.mercier@email.com',
      phone: '01 23 45 67 89',
      subject: 'Demande devis signalétique',
      message: 'Bonjour, je souhaiterais un devis pour la signalétique de mon hôtel de 50 chambres...',
      date: '2024-01-15',
      status: 'Non lu'
    },
    {
      id: 2,
      name: 'Marie Petit',
      email: 'marie.petit@entreprise.fr',
      phone: '01 98 76 54 32',
      subject: 'Renseignement enseigne lumineuse',
      message: 'Nous cherchons à installer une enseigne lumineuse pour notre magasin...',
      date: '2024-01-14',
      status: 'Lu'
    },
    {
      id: 3,
      name: 'Pierre Durand',
      email: 'p.durand@gmail.com',
      phone: '06 12 34 56 78',
      subject: 'Projet signalétique entreprise',
      message: 'Nous souhaitons refaire toute la signalétique de nos bureaux...',
      date: '2024-01-13',
      status: 'Répondu'
    }
  ]);

  // Données pour la newsletter
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([
    {
      id: 1,
      email: 'contact@hotel-luxe.fr',
      name: 'Hôtel Le Luxe',
      dateSubscription: '2024-01-10',
      status: 'Actif',
      source: 'Site web'
    },
    {
      id: 2,
      email: 'info@restaurant-paris.com',
      name: 'Restaurant Paris',
      dateSubscription: '2024-01-08',
      status: 'Actif',
      source: 'Formulaire contact'
    },
    {
      id: 3,
      email: 'commercial@magasin77.fr',
      name: 'Magasin 77',
      dateSubscription: '2024-01-05',
      status: 'Inactif',
      source: 'Salon professionnel'
    },
    {
      id: 4,
      email: 'direction@clinique-seine.fr',
      name: 'Clinique Seine',
      dateSubscription: '2024-01-03',
      status: 'Actif',
      source: 'Recommandation'
    }
  ]);

  const openModal = (type: 'add' | 'edit' | 'delete', content: string, item?: any) => {
    setModalType(type);
    setModalContent(content);
    setSelectedItem(item);
    
    // Pour les services, s'assurer que l'image est bien chargée
    if (content === 'service' && item) {
      setFormData({
        ...item,
        heroImage: item.heroImage || item.image || '' // Utiliser heroImage en priorité, sinon image
      });
    } else if (content === 'secteur' && item) {
      setFormData({
        ...item,
        heroImage: item.heroImage || item.image || '', // Utiliser heroImage en priorité, sinon image
        title: item.name || item.title || '', // Compatibilité avec les deux formats
        features: item.features || [],
        specialties: item.specialties || [],
        statistics: item.statistics || [],
        testimonialText: item.testimonialText || '',
        testimonialAuthor: item.testimonialAuthor || '',
        testimonialCompany: item.testimonialCompany || ''
      });
    } else {
      setFormData(item || {});
    }
    
    setPreviewImage(item?.image || '');
    setCurrentStep(1);
    
    // Définir le nombre d'étapes selon le type de contenu
    if (content === 'service' && type !== 'delete') {
      setTotalSteps(7); // Infos de base, Prestations, Processus, Informations pratiques, Spécifications, Projets portfolio, SEO
    } else if (content === 'secteur' && type !== 'delete') {
      setTotalSteps(6); // Infos de base, Solutions, Spécialités, Statistiques, Témoignage, SEO
    } else {
      setTotalSteps(1);
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setFormData({});
    setPreviewImage('');
    setIsScheduling(false);
    setPublishDateTime('');
    setCurrentStep(1);
    setTotalSteps(1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        setFormData((prev: any) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saving:', modalType, modalContent, formData);
    // Ici vous intégreriez avec votre backend
    closeModal();
  };

  // Colonnes pour le tableau des utilisateurs
  const userColumns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nom',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'role',
        header: 'Rôle',
        size: 120,
      },
      {
        accessorKey: 'status',
        header: 'Statut',
        size: 100,
        Cell: ({ cell }) => (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            cell.getValue<string>() === 'Actif' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {cell.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'phone',
        header: 'Téléphone',
        size: 120,
      },
      {
        accessorKey: 'lastLogin',
        header: 'Dernière connexion',
        size: 150,
      },

    ],
    [],
  );

  // Colonnes pour le tableau des articles
  const articleColumns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Titre',
        size: 300,
      },
      {
        accessorKey: 'category',
        header: 'Catégorie',
        size: 120,
      },
      {
        accessorKey: 'author',
        header: 'Auteur',
        size: 120,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 120,
      },
      {
        accessorKey: 'status',
        header: 'Statut',
        size: 100,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          let colorClass = '';
          if (status === 'Publié') colorClass = 'bg-green-100 text-green-800';
          else if (status === 'Brouillon') colorClass = 'bg-yellow-100 text-yellow-800';
          else if (status === 'Programmé') colorClass = 'bg-blue-100 text-blue-800';
          else colorClass = 'bg-gray-100 text-gray-800';
          
          return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: 'publishDate',
        header: 'Publication',
        size: 120,
        Cell: ({ cell, row }) => {
          const publishDate = cell.getValue<string>();
          const status = row.original.status;
          
          if (status === 'Brouillon') {
            return <span className="text-xs text-gray-500">-</span>;
          } else if (status === 'Programmé' && publishDate) {
            return <span className="text-xs text-blue-600">{new Date(publishDate).toLocaleDateString('fr-FR')}</span>;
          } else if (publishDate) {
            return <span className="text-xs text-gray-600">{new Date(publishDate).toLocaleDateString('fr-FR')}</span>;
          }
          return <span className="text-xs text-gray-500">-</span>;
        },
      },
      {
        accessorKey: 'readTime',
        header: 'Temps de lecture',
        size: 120,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        size: 120,
        Cell: ({ row }) => (
          <div className="flex gap-1">
            <button
              onClick={() => openModal('edit', 'article', row.original)}
              className="p-1 text-brand-600 hover:text-brand-800 transition-colors"
              title="Modifier"
            >
              <FaEdit size={14} />
            </button>
            <button
              onClick={() => generateArticleWithAI(row.original.title)}
              className="p-1 text-purple-600 hover:text-purple-800 transition-colors"
              title="Générer avec IA"
            >
              <FaRobot size={14} />
            </button>
            {row.original.status === 'Brouillon' && (
              <button
                onClick={() => handlePublishArticle(row.original)}
                className="p-1 text-green-600 hover:text-green-800 transition-colors"
                title="Publier maintenant"
              >
                <FaUpload size={14} />
              </button>
            )}
            {row.original.status === 'Programmé' && (
              <button
                onClick={() => handleCancelSchedule(row.original)}
                className="p-1 text-orange-600 hover:text-orange-800 transition-colors"
                title="Annuler programmation"
              >
                <FaTimes size={14} />
              </button>
            )}
            <button
              onClick={() => openModal('delete', 'article', row.original)}
              className="p-1 text-red-600 hover:text-red-800 transition-colors"
              title="Supprimer"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  // Colonnes pour le tableau des messages
  const messageColumns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nom',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'phone',
        header: 'Téléphone',
        size: 130,
      },
      {
        accessorKey: 'subject',
        header: 'Sujet',
        size: 200,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 120,
      },
      {
        accessorKey: 'status',
        header: 'Statut',
        size: 100,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          let colorClass = '';
          if (status === 'Non lu') colorClass = 'bg-red-100 text-red-800';
          else if (status === 'Lu') colorClass = 'bg-yellow-100 text-yellow-800';
          else if (status === 'Répondu') colorClass = 'bg-green-100 text-green-800';
          else colorClass = 'bg-gray-100 text-gray-800';
          
          return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        size: 120,
        Cell: ({ row }) => (
          <div className="flex gap-1">
            <button
              onClick={() => openModal('edit', 'message', row.original)}
              className="p-1 text-brand-600 hover:text-brand-800 transition-colors"
              title="Voir le message"
            >
              <FaEye size={14} />
            </button>
            <button
              onClick={() => openModal('delete', 'message', row.original)}
              className="p-1 text-red-600 hover:text-red-800 transition-colors"
              title="Supprimer"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  // Colonnes pour le tableau de la newsletter
  const newsletterColumns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
      },
      {
        accessorKey: 'name',
        header: 'Nom/Entreprise',
        size: 200,
      },
      {
        accessorKey: 'dateSubscription',
        header: 'Date inscription',
        size: 130,
      },
      {
        accessorKey: 'source',
        header: 'Source',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Statut',
        size: 100,
        Cell: ({ cell }) => (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            cell.getValue<string>() === 'Actif' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {cell.getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        enableSorting: false,
        size: 120,
        Cell: ({ row }) => (
          <div className="flex gap-1">
            <button
              onClick={() => openModal('edit', 'newsletter', row.original)}
              className="p-1 text-brand-600 hover:text-brand-800 transition-colors"
              title="Modifier"
            >
              <FaEdit size={14} />
            </button>
            <button
              onClick={() => openModal('delete', 'newsletter', row.original)}
              className="p-1 text-red-600 hover:text-red-800 transition-colors"
              title="Supprimer"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  // Fonction pour générer l'article avec IA
  const generateArticleWithAI = (title: string) => {
    alert(`Génération IA pour: "${title}"\n\nCette fonctionnalité permettra de générer automatiquement le contenu de l'article en utilisant l'IA. L'utilisateur pourra donner des consignes supplémentaires.`);
  };

  // Fonction pour publier un article
  const handlePublishArticle = (article: any) => {
    const updatedArticles = articles.map(a => 
      a.id === article.id 
        ? { ...a, status: 'Publié', publishDate: new Date().toISOString().split('T')[0] }
        : a
    );
    setArticles(updatedArticles);
    alert(`Article "${article.title}" publié avec succès !`);
  };

  // Fonction pour annuler la programmation
  const handleCancelSchedule = (article: any) => {
    const updatedArticles = articles.map(a => 
      a.id === article.id 
        ? { ...a, status: 'Brouillon', publishDate: null }
        : a
    );
    setArticles(updatedArticles);
    alert(`Programmation annulée pour "${article.title}"`);
  };

  // Fonction pour sauvegarder en brouillon
  const handleSaveDraft = () => {
    const newArticle = {
      id: articles.length + 1,
      ...formData,
      status: 'Brouillon',
      publishDate: null,
      date: new Date().toISOString().split('T')[0],
      author: 'Utilisateur Actuel'
    };
    
    if (modalType === 'edit' && selectedItem) {
      const updatedArticles = articles.map(a => 
        a.id === selectedItem.id 
          ? { ...a, ...formData, status: 'Brouillon', publishDate: null }
          : a
      );
      setArticles(updatedArticles);
    } else {
      setArticles([...articles, newArticle]);
    }
    
    closeModal();
    alert('Article sauvegardé en brouillon !');
  };

  // Fonction pour programmer la publication
  const handleSchedulePublication = () => {
    if (!publishDateTime) {
      alert('Veuillez sélectionner une date et heure de publication');
      return;
    }

    const newArticle = {
      id: articles.length + 1,
      ...formData,
      status: 'Programmé',
      publishDate: publishDateTime,
      date: new Date().toISOString().split('T')[0],
      author: 'Utilisateur Actuel'
    };
    
    if (modalType === 'edit' && selectedItem) {
      const updatedArticles = articles.map(a => 
        a.id === selectedItem.id 
          ? { ...a, ...formData, status: 'Programmé', publishDate: publishDateTime }
          : a
      );
      setArticles(updatedArticles);
    } else {
      setArticles([...articles, newArticle]);
    }
    
    closeModal();
    alert(`Article programmé pour publication le ${new Date(publishDateTime).toLocaleDateString('fr-FR')} !`);
  };

  // Fonction pour exporter la newsletter en Excel
  const exportNewsletterToExcel = () => {
    // Préparer les données pour l'export
    const exportData = newsletterSubscribers.map(subscriber => ({
      'Email': subscriber.email,
      'Nom/Entreprise': subscriber.name,
      'Date inscription': new Date(subscriber.dateSubscription).toLocaleDateString('fr-FR'),
      'Source': subscriber.source,
      'Statut': subscriber.status
    }));

    // Créer le contenu CSV
    const csvHeaders = ['Email', 'Nom/Entreprise', 'Date inscription', 'Source', 'Statut'];
    const csvContent = [
      csvHeaders.join(';'),
      ...exportData.map(row => 
        csvHeaders.map(header => `"${row[header as keyof typeof row] || ''}"`).join(';')
      )
    ].join('\n');

    // Créer le fichier et le télécharger
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter_abonnes_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Notification de succès
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        Export terminé ! ${newsletterSubscribers.length} abonnés exportés.
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  const renderSecteurModalContent = () => {
    const stepTitles = [
      'Informations de base',
      'Solutions',
      'Spécialités',
      'Statistiques',
      'Témoignage',
      'SEO'
    ];

    const nextStep = () => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    };

    const prevStep = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    const handleArrayInputChange = (field: string, index: number, value: string) => {
      const array = formData[field] || [];
      const newArray = [...array];
      newArray[index] = value;
      setFormData((prev: any) => ({ ...prev, [field]: newArray }));
    };

    const addArrayItem = (field: string) => {
      const array = formData[field] || [];
      setFormData((prev: any) => ({ ...prev, [field]: [...array, ''] }));
    };

    const removeArrayItem = (field: string, index: number) => {
      const array = formData[field] || [];
      const newArray = array.filter((_: any, i: number) => i !== index);
      setFormData((prev: any) => ({ ...prev, [field]: newArray }));
    };

    return (
      <div className="space-y-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              {selectedItem ? 'Modifier le secteur' : 'Créer un nouveau secteur'}
            </h2>
            <div className="bg-brand-100 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-brand-700">Étape {currentStep} sur {totalSteps}</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (stepTitles.length - 1)) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between relative z-10">
              {stepTitles.map((title, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    index + 1 === currentStep 
                      ? 'bg-brand-500 text-white shadow-lg' 
                      : index + 1 < currentStep 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  title={title}
                >
                  {index + 1 < currentStep ? '✓' : index + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 text-sm font-medium text-slate-700">{stepTitles[currentStep - 1]}</div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {stepTitles[currentStep - 1]}
        </h3>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nom du secteur</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Ex: Hôtellerie"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sous-titre</label>
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Ex: Solutions de communication visuelle pour l'hôtellerie"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Slug URL</label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Ex: hotellerie"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
                placeholder="Description du secteur"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Image Hero</label>
              
              {/* Affichage de l'image actuelle si elle existe */}
              {formData.heroImage && (
                <div className="relative mb-4">
                  <img 
                    src={formData.heroImage} 
                    alt="Image Hero actuelle" 
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleInputChange('heroImage', '')}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Image Hero actuelle
                  </div>
                </div>
              )}
              
              {/* Zone de drag & drop - toujours visible */}
              <div
                className="w-full h-32 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-all duration-200"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const result = event.target?.result as string;
                      handleInputChange('heroImage', result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                onClick={() => document.getElementById('secteurHeroImageInput')?.click()}
              >
                <div className="text-center">
                  <div className="text-4xl text-slate-400 mb-2">📷</div>
                  <p className="text-sm text-slate-600">
                    {formData.heroImage ? 'Glissez une nouvelle image ici ou cliquez' : 'Glissez une image ici ou cliquez pour sélectionner'}
                  </p>
                </div>
              </div>
              <input
                id="secteurHeroImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const result = event.target?.result as string;
                      handleInputChange('heroImage', result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
              <select
                value={formData.status || 'Visible'}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              >
                <option value="Visible">Visible</option>
                <option value="Masqué">Masqué</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Solutions proposées</label>
              {(formData.features || []).map((feature: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayInputChange('features', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    placeholder="Solution proposée"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('features', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('features')}
                className="w-full px-4 py-2 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter une solution
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Spécialités</label>
              {(formData.specialties || []).map((specialty: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => handleArrayInputChange('specialties', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    placeholder="Spécialité"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('specialties', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('specialties')}
                className="w-full px-4 py-2 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter une spécialité
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Statistiques</label>
              {(formData.statistics || []).map((stat: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={stat.label || ''}
                      onChange={(e) => {
                        const newStats = [...(formData.statistics || [])];
                        newStats[index] = { ...newStats[index], label: e.target.value };
                        setFormData((prev: any) => ({ ...prev, statistics: newStats }));
                      }}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                      placeholder="Libellé de la statistique"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newStats = (formData.statistics || []).filter((_: any, i: number) => i !== index);
                        setFormData((prev: any) => ({ ...prev, statistics: newStats }));
                      }}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={stat.value || ''}
                    onChange={(e) => {
                      const newStats = [...(formData.statistics || [])];
                      newStats[index] = { ...newStats[index], value: e.target.value };
                      setFormData((prev: any) => ({ ...prev, statistics: newStats }));
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    placeholder="Valeur (ex: 50+, 100%, 15 ans)"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newStats = [...(formData.statistics || []), { label: '', value: '' }];
                  setFormData((prev: any) => ({ ...prev, statistics: newStats }));
                }}
                className="w-full px-4 py-2 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter une statistique
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Témoignage client</label>
              <textarea
                rows={4}
                value={formData.testimonialText || ''}
                onChange={(e) => handleInputChange('testimonialText', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
                placeholder="Texte du témoignage"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Auteur</label>
                <input
                  type="text"
                  value={formData.testimonialAuthor || ''}
                  onChange={(e) => handleInputChange('testimonialAuthor', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                  placeholder="Nom de l'auteur"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Entreprise</label>
                <input
                  type="text"
                  value={formData.testimonialCompany || ''}
                  onChange={(e) => handleInputChange('testimonialCompany', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                  placeholder="Nom de l'entreprise"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Titre SEO</label>
              <input
                type="text"
                value={formData.metaTitle || ''}
                onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Titre optimisé pour les moteurs de recherche"
              />
              <p className="text-xs text-gray-500 mt-1">Recommandé : 50-60 caractères</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description SEO</label>
              <textarea
                rows={3}
                value={formData.metaDescription || ''}
                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
                placeholder="Description pour les résultats de recherche"
              />
              <p className="text-xs text-gray-500 mt-1">Recommandé : 150-160 caractères</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mots-clés</label>
              <input
                type="text"
                value={(formData.keywords || []).join(', ')}
                onChange={(e) => {
                  setFormData((prev: any) => ({ 
                    ...prev, 
                    keywords: e.target.value.split(',').map((k: string) => k.trim()).filter((k: string) => k)
                  }));
                }}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="mot-clé1, mot-clé2, mot-clé3..."
              />
              <p className="text-xs text-gray-500 mt-1">Séparez les mots-clés par des virgules</p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={currentStep === 1 ? closeModal : prevStep}
            className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium flex items-center gap-2"
          >
            {currentStep === 1 ? (
              <>
                <FaTimes className="w-4 h-4" />
                Annuler
              </>
            ) : (
              <>
                <FaChevronLeft className="w-4 h-4" />
                Précédent
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={currentStep === totalSteps ? handleSave : nextStep}
            className="px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
          >
            {currentStep === totalSteps ? (
              <>
                <FaSave className="w-4 h-4" />
                Enregistrer
              </>
            ) : (
              <>
                Suivant
                <FaChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderServiceModalContent = () => {
    const stepTitles = [
      'Informations de base',
      'Prestations',
      'Processus',
      'Informations pratiques',
      'Spécifications',
      'Projets portfolio',
      'SEO'
    ];

    const nextStep = () => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    };

    const prevStep = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    const handleArrayInputChange = (field: string, index: number, value: string) => {
      const array = formData[field] || [];
      const newArray = [...array];
      newArray[index] = value;
      setFormData((prev: any) => ({ ...prev, [field]: newArray }));
    };

    const addArrayItem = (field: string) => {
      const array = formData[field] || [];
      setFormData((prev: any) => ({ ...prev, [field]: [...array, ''] }));
    };

    const removeArrayItem = (field: string, index: number) => {
      const array = formData[field] || [];
      const newArray = array.filter((_: any, i: number) => i !== index);
      setFormData((prev: any) => ({ ...prev, [field]: newArray }));
    };

    return (
      <div className="space-y-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              {selectedItem ? 'Modifier le service' : 'Créer un nouveau service'}
            </h2>
            <div className="bg-brand-100 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-brand-700">Étape {currentStep} sur {totalSteps}</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (stepTitles.length - 1)) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between relative z-10">
              {stepTitles.map((title, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    index + 1 === currentStep 
                      ? 'bg-brand-500 text-white shadow-lg' 
                      : index + 1 < currentStep 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  title={title}
                >
                  {index + 1 < currentStep ? '✓' : index + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 text-sm font-medium text-slate-700">{stepTitles[currentStep - 1]}</div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {stepTitles[currentStep - 1]}
        </h3>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Titre complet</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Ex: Signalétique"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sous-titre</label>
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Ex: Solutions de signalétique intérieure et extérieure"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Slug URL</label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Ex: signaletique"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
                placeholder="Description du service"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Image Hero</label>
              
              {/* Affichage de l'image actuelle si elle existe */}
              {formData.heroImage && (
                <div className="relative mb-4">
                  <img 
                    src={formData.heroImage} 
                    alt="Image Hero actuelle" 
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleInputChange('heroImage', '')}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Image Hero actuelle
                  </div>
                </div>
              )}
              
              {/* Zone de drag & drop - toujours visible */}
              <div
                className="w-full h-32 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-all duration-200"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const result = event.target?.result as string;
                      handleInputChange('heroImage', result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                onClick={() => document.getElementById('heroImageInput')?.click()}
              >
                <div className="text-center">
                  <div className="text-4xl text-slate-400 mb-2">📷</div>
                  <p className="text-sm text-slate-600">
                    {formData.heroImage ? 'Glissez une nouvelle image ici ou cliquez' : 'Glissez une image ici ou cliquez pour sélectionner'}
                  </p>
                </div>
              </div>
              <input
                id="heroImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const result = event.target?.result as string;
                      handleInputChange('heroImage', result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
              <select
                value={formData.status || 'Visible'}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              >
                <option value="Visible">Visible</option>
                <option value="Masqué">Masqué</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Prestations</label>
              {(formData.prestations || []).map((prestation: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={prestation}
                    onChange={(e) => handleArrayInputChange('prestations', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    placeholder="Prestation"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('prestations', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('prestations')}
                className="w-full px-4 py-2 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter une prestation
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Étapes du processus</label>
              {(formData.process || []).map((step: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={step.title || ''}
                      onChange={(e) => {
                        const newProcess = [...(formData.process || [])];
                        newProcess[index] = { ...newProcess[index], title: e.target.value };
                        setFormData((prev: any) => ({ ...prev, process: newProcess }));
                      }}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                      placeholder="Titre de l'étape"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newProcess = (formData.process || []).filter((_: any, i: number) => i !== index);
                        setFormData((prev: any) => ({ ...prev, process: newProcess }));
                      }}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={step.description || ''}
                    onChange={(e) => {
                      const newProcess = [...(formData.process || [])];
                      newProcess[index] = { ...newProcess[index], description: e.target.value };
                      setFormData((prev: any) => ({ ...prev, process: newProcess }));
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
                    placeholder="Description de l'étape"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newProcess = [...(formData.process || []), { step: (formData.process || []).length + 1, title: '', description: '' }];
                  setFormData((prev: any) => ({ ...prev, process: newProcess }));
                }}
                className="w-full px-4 py-2 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter une étape
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Délai de réalisation</label>
                <input
                  type="text"
                  value={formData.duration || ''}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                  placeholder="Ex: 5 à 15 jours"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Garantie</label>
                <input
                  type="text"
                  value={formData.warranty || ''}
                  onChange={(e) => handleInputChange('warranty', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                  placeholder="Ex: 2 ans"
                />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">💰</span>
                </div>
                <h4 className="font-medium text-blue-800">Tarification</h4>
              </div>
              <p className="text-blue-700 text-sm">
                Politique tarifaire : <strong>Devis sur mesure uniquement</strong>. Aucun tarif fixe n'est affiché sur le site.
              </p>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Spécifications techniques</label>
              {(formData.specifications || []).map((spec: any, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={spec.label || ''}
                    onChange={(e) => {
                      const newSpecs = [...(formData.specifications || [])];
                      newSpecs[index] = { ...newSpecs[index], label: e.target.value };
                      setFormData((prev: any) => ({ ...prev, specifications: newSpecs }));
                    }}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    placeholder="Nom de la spécification"
                  />
                  <input
                    type="text"
                    value={spec.value || ''}
                    onChange={(e) => {
                      const newSpecs = [...(formData.specifications || [])];
                      newSpecs[index] = { ...newSpecs[index], value: e.target.value };
                      setFormData((prev: any) => ({ ...prev, specifications: newSpecs }));
                    }}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    placeholder="Valeur"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSpecs = (formData.specifications || []).filter((_: any, i: number) => i !== index);
                      setFormData((prev: any) => ({ ...prev, specifications: newSpecs }));
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newSpecs = [...(formData.specifications || []), { label: '', value: '' }];
                  setFormData((prev: any) => ({ ...prev, specifications: newSpecs }));
                }}
                className="w-full px-4 py-2 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter une spécification
              </button>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Rechercher un projet</label>
              <input
                type="text"
                value={formData.projectSearch || ''}
                onChange={(e) => handleInputChange('projectSearch', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Tapez pour rechercher un projet..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Projets portfolio à afficher (5 max)</label>
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto border border-slate-200 rounded-xl p-4">
                {mockPortfolio
                  .filter((project) => 
                    !formData.projectSearch || 
                    project.title.toLowerCase().includes((formData.projectSearch || '').toLowerCase()) ||
                    project.category.toLowerCase().includes((formData.projectSearch || '').toLowerCase()) ||
                    project.description.toLowerCase().includes((formData.projectSearch || '').toLowerCase())
                  )
                  .map((project) => (
                  <label key={project.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(formData.portfolioProjects || []).includes(project.id)}
                      onChange={(e) => {
                        const currentProjects = formData.portfolioProjects || [];
                        if (e.target.checked && currentProjects.length < 5) {
                          setFormData((prev: any) => ({
                            ...prev,
                            portfolioProjects: [...currentProjects, project.id]
                          }));
                        } else if (!e.target.checked) {
                          setFormData((prev: any) => ({
                            ...prev,
                            portfolioProjects: currentProjects.filter((id: number) => id !== project.id)
                          }));
                        }
                      }}
                      disabled={(formData.portfolioProjects || []).length >= 5 && !(formData.portfolioProjects || []).includes(project.id)}
                      className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                    />
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{project.title}</h4>
                      <p className="text-sm text-slate-600">{project.category}</p>
                      <p className="text-xs text-slate-500">{project.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Sélectionnés: {(formData.portfolioProjects || []).length}/5
              </p>
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Titre SEO</label>
              <input
                type="text"
                value={formData.metaTitle || ''}
                onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Titre optimisé pour les moteurs de recherche"
              />
              <p className="text-xs text-gray-500 mt-1">Recommandé : 50-60 caractères</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description SEO</label>
              <textarea
                rows={3}
                value={formData.metaDescription || ''}
                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
                placeholder="Description pour les résultats de recherche"
              />
              <p className="text-xs text-gray-500 mt-1">Recommandé : 150-160 caractères</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mots-clés</label>
              <input
                type="text"
                value={(formData.keywords || []).join(', ')}
                onChange={(e) => {
                  setFormData((prev: any) => ({ 
                    ...prev, 
                    keywords: e.target.value.split(',').map((k: string) => k.trim()).filter((k: string) => k)
                  }));
                }}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="mot-clé1, mot-clé2, mot-clé3..."
              />
              <p className="text-xs text-gray-500 mt-1">Séparez les mots-clés par des virgules</p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={currentStep === 1 ? closeModal : prevStep}
            className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium flex items-center gap-2"
          >
            {currentStep === 1 ? (
              <>
                <FaTimes className="w-4 h-4" />
                Annuler
              </>
            ) : (
              <>
                <FaChevronLeft className="w-4 h-4" />
                Précédent
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={currentStep === totalSteps ? handleSave : nextStep}
            className="px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
          >
            {currentStep === totalSteps ? (
              <>
                <FaSave className="w-4 h-4" />
                Enregistrer
              </>
            ) : (
              <>
                Suivant
                <FaChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderModalContent = () => {
    if (modalType === 'delete') {
      return (
        <div className="text-center">
          <div className="mb-6">
            <FaTrash className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-slate-600">
              Êtes-vous sûr de vouloir supprimer cet élément ?
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Cette action est irréversible.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={closeModal}
              className="px-6 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                console.log('Deleting:', selectedItem);
                closeModal();
              }}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              Supprimer
            </button>
          </div>
        </div>
      );
    }

    const isEdit = modalType === 'edit';
    const title = isEdit ? 'Modifier' : 'Ajouter';

    if (modalContent === 'slide') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Titre</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              placeholder="Titre du slide"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Sous-titre</label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              placeholder="Sous-titre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              rows={4}
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
              placeholder="Description du slide"
            />
          </div>
          
          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Image</label>
            
            {/* Preview Image */}
            {previewImage && (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Aperçu"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage('');
                    setFormData((prev: any) => ({ ...prev, image: '' }));
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {/* Upload Button */}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-brand-300 rounded-xl bg-brand-50 hover:bg-brand-100 transition-colors cursor-pointer group"
              >
                <FaUpload className="w-8 h-8 text-brand-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-brand-600 font-medium">Cliquez pour télécharger une image</span>
                <span className="text-brand-400 text-sm">PNG, JPG, WebP jusqu'à 10MB</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
            >
              <FaSave className="w-4 h-4" />
              {title}
            </button>
          </div>
        </div>
      );
    }

    if (modalContent === 'service') {
      return renderServiceModalContent();
    }

    if (modalContent === 'secteur') {
      return renderSecteurModalContent();
    }

    if (modalContent === 'portfolio') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Titre du projet</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              placeholder="Ex: Signalétique Hotel Luxe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
            <input
              type="text"
              value={formData.category || ''}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              placeholder="Ex: Hôtellerie"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
            />
          </div>
          
          {/* Image Upload for Portfolio */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Image du projet</label>
            
            {previewImage && (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Aperçu projet"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage('');
                    setFormData((prev: any) => ({ ...prev, image: '' }));
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            )}
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="portfolio-image-upload"
              />
              <label
                htmlFor="portfolio-image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-brand-300 rounded-xl bg-brand-50 hover:bg-brand-100 transition-colors cursor-pointer group"
              >
                <FaImage className="w-8 h-8 text-brand-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-brand-600 font-medium">Ajouter une image</span>
                <span className="text-brand-400 text-sm">Format recommandé : 800x600px</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
            >
              <FaSave className="w-4 h-4" />
              {title}
            </button>
          </div>
        </div>
      );
    }

    if (modalContent === 'user') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              placeholder="Ex: Jean Dupont"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              placeholder="jean.dupont@ozc.fr"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              placeholder="01 84 19 01 04"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Rôle</label>
            <select
              value={formData.role || 'Utilisateur'}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
            >
              <option value="Utilisateur">Utilisateur</option>
              <option value="Éditeur">Éditeur</option>
              <option value="Commercial">Commercial</option>
              <option value="Designer">Designer</option>
              <option value="Technicien">Technicien</option>
              <option value="Administrateur">Administrateur</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
            <select
              value={formData.status || 'Actif'}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
            >
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>

          <div className="flex gap-4 justify-end pt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
            >
              <FaSave className="w-4 h-4" />
              {title}
            </button>
          </div>
        </div>
      );
    }

    if (modalContent === 'article') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Titre de l'article</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              placeholder="Ex: L'avenir de la signalétique numérique"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Extrait</label>
            <textarea
              rows={3}
              value={formData.excerpt || ''}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
              placeholder="Résumé court de l'article pour l'aperçu"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
              <select
                value={formData.category || 'Général'}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              >
                <option value="Général">Général</option>
                <option value="Tendances">Tendances</option>
                <option value="Réglementation">Réglementation</option>
                <option value="Conseils">Conseils</option>
                <option value="Technologie">Technologie</option>
                <option value="Cas d'étude">Cas d'étude</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
              <select
                value={formData.status || 'Brouillon'}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
              >
                <option value="Brouillon">Brouillon</option>
                <option value="Publié">Publié</option>
                <option value="Archivé">Archivé</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Auteur</label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Nom de l'auteur"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Temps de lecture</label>
              <input
                type="text"
                value={formData.readTime || ''}
                onChange={(e) => handleInputChange('readTime', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                placeholder="Ex: 5 min"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Contenu de l'article</label>
            <textarea
              rows={8}
              value={formData.content || ''}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
              placeholder="Contenu complet de l'article en HTML..."
            />
          </div>
          
          {/* Bouton IA pour générer le contenu */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <FaRobot className="w-6 h-6 text-purple-600" />
              <h4 className="font-semibold text-purple-800">Génération automatique avec IA</h4>
            </div>
            <p className="text-purple-700 text-sm mb-4">
              Laissez l'IA rédiger votre article automatiquement à partir du titre et de vos consignes.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">Consignes supplémentaires (optionnel)</label>
                <textarea
                  rows={3}
                  value={formData.aiInstructions || ''}
                  onChange={(e) => handleInputChange('aiInstructions', e.target.value)}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm"
                  placeholder="Ex: Insister sur l'aspect écologique, inclure des exemples concrets de Seine-et-Marne..."
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!formData.title) {
                    alert('Veuillez saisir un titre avant de générer le contenu.');
                    return;
                  }
                  generateArticleWithAI(formData.title);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
              >
                <FaRobot className="w-4 h-4" />
                Générer l'article avec IA
              </button>
            </div>
          </div>

          {/* Section de programmation */}
          {isScheduling && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-3">Programmer la publication</h4>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">Date et heure de publication</label>
                <input
                  type="datetime-local"
                  value={publishDateTime}
                  onChange={(e) => setPublishDateTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-between pt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Annuler
            </button>
            
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium flex items-center gap-2"
              >
                <FaSave className="w-4 h-4" />
                Sauvegarder en brouillon
              </button>
              
              {!isScheduling ? (
                <button
                  type="button"
                  onClick={() => setIsScheduling(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
                >
                  <FaClock className="w-4 h-4" />
                  Programmer publication
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsScheduling(false);
                      setPublishDateTime('');
                    }}
                    className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Annuler programmation
                  </button>
                  <button
                    type="button"
                    onClick={handleSchedulePublication}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <FaClock className="w-4 h-4" />
                    Confirmer programmation
                  </button>
                </>
              )}
              
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-all duration-200 font-medium flex items-center gap-2"
              >
                <FaUpload className="w-4 h-4" />
                Publier maintenant
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (modalContent === 'message') {
      return (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Détails du message</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>De :</strong> {selectedItem?.name || 'Nom'}
              </div>
              <div>
                <strong>Email :</strong> {selectedItem?.email || 'email@example.com'}
              </div>
              <div>
                <strong>Téléphone :</strong> {selectedItem?.phone || 'N/A'}
              </div>
              <div>
                <strong>Date :</strong> {selectedItem?.date || new Date().toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Sujet</label>
            <input
              type="text"
              value={selectedItem?.subject || ''}
              readOnly
              className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-gray-50 text-slate-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
            <textarea
              rows={6}
              value={selectedItem?.message || ''}
              readOnly
              className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-gray-50 text-slate-600 resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
            <select
              value={formData.status || selectedItem?.status || 'Non lu'}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200"
            >
              <option value="Non lu">Non lu</option>
              <option value="Lu">Lu</option>
              <option value="Répondu">Répondu</option>
            </select>
          </div>

          <div className="flex gap-4 justify-end pt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all duration-200 font-medium flex items-center gap-2"
            >
              <FaSave className="w-4 h-4" />
              Mettre à jour
            </button>
          </div>
        </div>
      );
    }

    if (modalContent === 'newsletter') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200"
              placeholder="email@exemple.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nom/Entreprise</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200"
              placeholder="Nom ou nom d'entreprise"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Source</label>
              <select
                value={formData.source || 'Site web'}
                onChange={(e) => handleInputChange('source', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200"
              >
                <option value="Site web">Site web</option>
                <option value="Formulaire contact">Formulaire contact</option>
                <option value="Salon professionnel">Salon professionnel</option>
                <option value="Recommandation">Recommandation</option>
                <option value="Réseaux sociaux">Réseaux sociaux</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
              <select
                value={formData.status || 'Actif'}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200"
              >
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all duration-200 font-medium flex items-center gap-2"
            >
              <FaSave className="w-4 h-4" />
              {modalType === 'edit' ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <p className="text-slate-600">Formulaire pour {modalContent}</p>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">Tableau de bord</h1>
              <div className="text-sm text-slate-500">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </div>
            </div>
            
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Services</p>
                    <p className="text-3xl font-bold text-slate-800">{services.length}</p>
                    <p className="text-xs text-green-600 mt-1">{services.filter((s: any) => s.status === 'Visible').length} visibles</p>
                  </div>
                  <FaServicestack className="w-8 h-8 text-brand-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Secteurs</p>
                    <p className="text-3xl font-bold text-slate-800">{secteurs.length}</p>
                    <p className="text-xs text-blue-600 mt-1">{secteurs.filter((s: any) => s.status === 'Visible').length} visibles</p>
                  </div>
                  <FaIndustry className="w-8 h-8 text-brand-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Réalisations</p>
                    <p className="text-3xl font-bold text-slate-800">{mockPortfolio.length}</p>
                    <p className="text-xs text-purple-600 mt-1">Portfolio projets</p>
                  </div>
                  <FaEye className="w-8 h-8 text-brand-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Articles</p>
                    <p className="text-3xl font-bold text-slate-800">{articles.length}</p>
                    <p className="text-xs text-orange-600 mt-1">
                      {(() => {
                        const brouillons = articles.filter(a => a.status === 'Brouillon').length;
                        const programmes = articles.filter(a => a.status === 'Programmé').length;
                        return `${brouillons} ${brouillons === 1 ? 'brouillon' : 'brouillons'}, ${programmes} ${programmes === 1 ? 'programmé' : 'programmés'}`;
                      })()}
                    </p>
                  </div>
                  <FaNewspaper className="w-8 h-8 text-brand-500" />
                </div>
              </div>
            </div>

            {/* Activité récente et aperçus */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Actions rapides */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Actions rapides</h2>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('articles');
                      openModal('add', 'article');
                    }}
                    className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FaPlus className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-800">Nouvel article</p>
                      <p className="text-xs text-slate-500">Créer un article de blog</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      setActiveTab('slides');
                      openModal('add', 'slide');
                    }}
                    className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FaImages className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-800">Nouveau slide</p>
                      <p className="text-xs text-slate-500">Ajouter un slide d'accueil</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      setActiveTab('portfolio');
                      openModal('add', 'portfolio');
                    }}
                    className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                  >
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FaEye className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-800">Nouveau projet</p>
                      <p className="text-xs text-slate-500">Ajouter au portfolio</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('users')}
                    className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
                  >
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FaUsers className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-800">Gérer utilisateurs</p>
                      <p className="text-xs text-slate-500">{users.filter(u => u.status === 'Actif').length} utilisateurs actifs</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Aperçu des slides */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-800">Slides d'accueil</h2>
                  <Link
                    to="#"
                    onClick={() => setActiveTab('slides')}
                    className="text-brand-600 hover:text-brand-700 text-sm font-medium"
                  >
                    Voir tout →
                  </Link>
                </div>
                <div className="space-y-3">
                  {slides.slice(0, 3).map((slide) => (
                    <div 
                      key={slide.id} 
                      className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors group"
                      onClick={() => openModal('edit', 'slide', slide)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-brand-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div>
                          <p className="text-sm font-medium text-slate-800 group-hover:text-brand-600 transition-colors">
                            {slide.title}
                          </p>
                          <p className="text-xs text-slate-500">{slide.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          slide.status === 'Actif' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {slide.status}
                        </span>
                        <FaEdit className="w-4 h-4 text-gray-400 group-hover:text-brand-500 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Statistiques des articles */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Statistiques des articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Répartition par statut */}
                <div>
                  <h3 className="text-md font-medium text-slate-700 mb-4">Répartition par statut</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">Articles publiés</span>
                      </div>
                      <span className="text-lg font-bold text-green-700">
                        {articles.filter(a => a.status === 'Publié').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">Brouillons</span>
                      </div>
                      <span className="text-lg font-bold text-yellow-700">
                        {articles.filter(a => a.status === 'Brouillon').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">Total articles</span>
                      </div>
                      <span className="text-lg font-bold text-slate-700">{articles.length}</span>
                    </div>
                  </div>
                </div>

                {/* Répartition par catégorie */}
                <div>
                  <h3 className="text-md font-medium text-slate-700 mb-4">Répartition par catégorie</h3>
                  <div className="space-y-3">
                    {Array.from(new Set(articles.map(a => a.category))).map((category, index) => {
                      const count = articles.filter(a => a.category === category).length;
                      const colors = [
                        { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
                        { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
                        { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
                        { bg: 'bg-pink-50', text: 'text-pink-700', dot: 'bg-pink-500' }
                      ];
                      const color = colors[index % colors.length];
                      
                      return (
                        <div key={category} className={`flex items-center justify-between p-3 ${color.bg} rounded-lg`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 ${color.dot} rounded-full`}></div>
                            <span className="text-sm font-medium text-slate-700">{category}</span>
                          </div>
                          <span className={`text-lg font-bold ${color.text}`}>{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Temps de lecture moyen */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-md font-medium text-slate-700 mb-4">Informations supplémentaires</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
                    <FaBlog className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-indigo-800">
                      {Math.round(articles.reduce((acc, a) => acc + parseInt(a.readTime), 0) / articles.length)} min
                    </p>
                    <p className="text-xs text-indigo-600">Temps de lecture moyen</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
                    <FaUsers className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-teal-800">
                      {Array.from(new Set(articles.map(a => a.author))).length}
                    </p>
                    <p className="text-xs text-teal-600">Auteurs actifs</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                    <FaNewspaper className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-emerald-800">
                      {articles.filter(a => {
                        const articleDate = new Date(a.date);
                        const now = new Date();
                        const diffTime = Math.abs(now.getTime() - articleDate.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        return diffDays <= 30;
                      }).length}
                    </p>
                    <p className="text-xs text-emerald-600">Articles ce mois</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'slides':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Slider de l'accueil</h1>
                <p className="text-sm text-slate-600 mt-1">Glissez-déposez pour réorganiser l'ordre d'affichage</p>
              </div>
              <button
                onClick={() => openModal('add', 'slide')}
                className="bg-brand-500 text-white px-6 py-3 rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter un slide
              </button>
            </div>
            
            <div className="space-y-4">
              {slides.sort((a, b) => a.order - b.order).map((slide) => (
                <div
                  key={slide.id}
                  draggable={slide.status === 'Actif'}
                  onDragStart={(e) => handleDragStart(e, slide.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, slide.id)}
                  className={`bg-white rounded-xl shadow-lg border overflow-hidden transition-all duration-200 group hover:shadow-xl ${
                    slide.status === 'Inactif' 
                      ? 'border-gray-200 cursor-default' 
                      : 'border-gray-100 cursor-move hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center p-6 gap-6">
                    {/* Badge d'ordre et indicateur de drag */}
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-colors ${
                        slide.status === 'Inactif'
                          ? 'bg-gray-400 text-white'
                          : 'bg-brand-500 text-white group-hover:bg-brand-600'
                      }`}>
                        {slide.order}
                      </div>
                      {slide.status === 'Actif' && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-gray-100 p-1 rounded">
                            <div className="grid grid-cols-3 gap-0.5">
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Image du slide - format horizontal */}
                    <div className={`w-48 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative ${
                      slide.status === 'Inactif' ? 'opacity-60' : ''
                    }`}>
                      {slide.image ? (
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaImages className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Contenu du slide */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-semibold mb-1 truncate ${
                        slide.status === 'Inactif' ? 'text-gray-500' : 'text-slate-800'
                      }`}>
                        {slide.title}
                      </h3>
                      <p className={`text-sm mb-2 ${
                        slide.status === 'Inactif' ? 'text-gray-400' : 'text-slate-600'
                      }`}>
                        {slide.subtitle}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          slide.status === 'Actif' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {slide.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('edit', 'slide', slide);
                        }}
                        className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-all duration-200 shadow-md text-sm flex items-center gap-2 font-medium"
                      >
                        <FaEdit className="w-3 h-3" />
                        Modifier
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('delete', 'slide', slide);
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md text-sm font-medium"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Services</h1>
                <p className="text-sm text-slate-600 mt-1">Glissez-déposez pour réorganiser l'ordre d'affichage</p>
              </div>
              <button
                onClick={() => openModal('add', 'service')}
                className="bg-brand-500 text-white px-6 py-3 rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter un service
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.sort((a, b) => a.order - b.order).map((service: any) => (
                <div 
                  key={service.id} 
                  draggable
                  onDragStart={(e) => handleServiceDragStart(e, service.id)}
                  onDragOver={(e) => handleServiceDragOver(e, service.id)}
                  onDragLeave={handleServiceDragLeave}
                  onDrop={(e) => handleServiceDrop(e, service.id)}
                  onDragEnd={handleServiceDragEnd}
                  className={`bg-white rounded-xl shadow-lg border overflow-hidden cursor-move transition-all duration-200 group relative drag-card flex flex-col ${
                    draggedServiceId === service.id 
                      ? 'opacity-50 scale-95 border-brand-500' 
                      : dragOverServiceId === service.id 
                        ? 'border-brand-400 bg-brand-50 shadow-xl scale-105' 
                        : 'border-gray-100 hover:shadow-xl hover:border-brand-300'
                  }`}
                >
                  {/* Badge d'ordre */}
                  <div className="absolute top-3 left-3 z-10 w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:bg-brand-600 transition-colors">
                    {service.order}
                  </div>
                  
                  {/* Indicateur de drag */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm p-1 rounded-lg shadow-md">
                      <div className="flex flex-col gap-0.5">
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image du service */}
                  <div className="h-48 bg-gray-200 relative">
                    {service.image ? (
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaServicestack className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        service.status === 'Visible' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-1 mb-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{service.name}</h3>
                      <p className="text-sm text-slate-600">{service.description}</p>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('edit', 'service', service);
                        }}
                        className="flex-1 bg-brand-500 text-white px-3 py-2 rounded-xl hover:bg-brand-600 transition-all duration-200 shadow-md text-sm flex items-center justify-center gap-2 font-medium"
                      >
                        <FaEdit className="w-3 h-3" />
                        Modifier
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('delete', 'service', service);
                        }}
                        className="bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md text-sm font-medium"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'secteurs':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Secteurs</h1>
                <p className="text-sm text-slate-600 mt-1">Glissez-déposez pour réorganiser l'ordre d'affichage</p>
              </div>
              <button
                onClick={() => openModal('add', 'secteur')}
                className="bg-brand-500 text-white px-6 py-3 rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
              >
                <FaPlus className="w-4 h-4" />
                Ajouter un secteur
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secteurs.sort((a, b) => a.order - b.order).map((secteur: any) => (
                <div 
                  key={secteur.id} 
                  draggable
                  onDragStart={(e) => handleSecteurDragStart(e, secteur.id)}
                  onDragOver={(e) => handleSecteurDragOver(e, secteur.id)}
                  onDragLeave={handleSecteurDragLeave}
                  onDrop={(e) => handleSecteurDrop(e, secteur.id)}
                  onDragEnd={handleSecteurDragEnd}
                  className={`bg-white rounded-xl shadow-lg border overflow-hidden cursor-move transition-all duration-200 group relative drag-card flex flex-col ${
                    draggedSecteurId === secteur.id 
                      ? 'opacity-50 scale-95 border-brand-500' 
                      : dragOverSecteurId === secteur.id 
                        ? 'border-brand-400 bg-brand-50 shadow-xl scale-105' 
                        : 'border-gray-100 hover:shadow-xl hover:border-brand-300'
                  }`}
                >
                  {/* Badge d'ordre */}
                  <div className="absolute top-3 left-3 z-10 w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:bg-brand-600 transition-colors">
                    {secteur.order}
                  </div>
                  
                  {/* Indicateur de drag */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm p-1 rounded-lg shadow-md">
                      <div className="flex flex-col gap-0.5">
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image du secteur */}
                  <div className="h-48 bg-gray-200 relative">
                    {secteur.image ? (
                      <img 
                        src={secteur.image} 
                        alt={secteur.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaIndustry className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        secteur.status === 'Visible' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {secteur.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-1 mb-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{secteur.name}</h3>
                      <p className="text-sm text-slate-600">{secteur.description}</p>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('edit', 'secteur', secteur);
                        }}
                        className="flex-1 bg-brand-500 text-white px-3 py-2 rounded-xl hover:bg-brand-600 transition-all duration-200 shadow-md text-sm flex items-center justify-center gap-2 font-medium"
                      >
                        <FaEdit className="w-3 h-3" />
                        Modifier
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('delete', 'secteur', secteur);
                        }}
                        className="bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md text-sm font-medium"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-slate-800">Portfolio</h1>
                             <button
                 onClick={() => openModal('add', 'portfolio')}
                 className="bg-brand-500 text-white px-6 py-3 rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
               >
                 <FaPlus className="w-4 h-4" />
                 Ajouter un projet
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPortfolio.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <FaImages className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{item.category}</p>
                    <p className="text-xs text-slate-500 mb-4">
                      {(() => {
                        const date = new Date(item.date);
                        const day = date.getDate();
                        const months = [
                          'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
                          'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
                        ];
                        const month = months[date.getMonth()];
                        const year = date.getFullYear();
                        return `le ${day} ${month} ${year}`;
                      })()}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('edit', 'portfolio', item)}
                        className="flex-1 bg-brand-500 text-white px-3 py-2 rounded-xl hover:bg-brand-600 transition-all duration-200 shadow-md text-sm flex items-center justify-center gap-2 font-medium"
                      >
                        <FaEdit className="w-3 h-3" />
                        Modifier
                      </button>
                      <button
                        onClick={() => openModal('delete', 'portfolio', item)}
                        className="bg-red-500 text-white px-3 py-2 rounded-xl hover:bg-red-600 transition-all duration-200 shadow-md text-sm font-medium"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'articles':
        return (
          <ThemeProvider theme={muiTheme}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Articles du Blog</h1>
                <button
                  onClick={() => openModal('add', 'article')}
                  className="bg-brand-500 text-white px-6 py-3 rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
                >
                  <FaPlus className="w-4 h-4" />
                  Nouvel article
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <MaterialReactTable
                  columns={articleColumns}
                  data={articles}
                  muiTableContainerProps={{
                    sx: { maxHeight: '600px' }
                  }}
                  muiTopToolbarProps={{
                    sx: {
                      backgroundColor: '#f8fafc',
                      borderBottom: '1px solid #e2e8f0'
                    }
                  }}
                  enableGlobalFilter
                  enableColumnFilters
                  enableSorting
                  initialState={{
                    sorting: [{ id: 'date', desc: true }]
                  }}
                />
              </div>
            </div>
          </ThemeProvider>
        );

      case 'users':
        return (
          <ThemeProvider theme={muiTheme}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Utilisateurs</h1>
                <button
                  onClick={() => openModal('add', 'user')}
                  className="bg-brand-500 text-white px-6 py-3 rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
                >
                  <FaPlus className="w-4 h-4" />
                  Ajouter un utilisateur
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <MaterialReactTable
                  columns={userColumns}
                  data={users}
                  enableRowActions
                  renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                      <Tooltip title="Modifier">
                        <IconButton 
                          onClick={() => openModal('edit', 'user', row.original)}
                          size="small"
                          sx={{ 
                            color: '#98c21d',
                            backgroundColor: '#f7fee7',
                            borderRadius: '8px',
                            padding: '6px',
                            '&:hover': {
                              backgroundColor: '#ecfccb',
                              transform: 'scale(1.05)'
                            }
                          }}
                        >
                          <FaEdit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton 
                          onClick={() => openModal('delete', 'user', row.original)}
                          size="small"
                          sx={{ 
                            color: '#ef4444',
                            backgroundColor: '#fef2f2',
                            borderRadius: '8px',
                            padding: '6px',
                            '&:hover': {
                              backgroundColor: '#fee2e2',
                              transform: 'scale(1.05)'
                            }
                          }}
                        >
                          <FaTrash />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                  positionActionsColumn="last"
                  enableGlobalFilter
                  enableColumnFilters
                  enableSorting
                  initialState={{
                    sorting: [{ id: 'nom', desc: false }]
                  }}
                  muiTableContainerProps={{
                    sx: { maxHeight: '600px' }
                  }}
                  muiTopToolbarProps={{
                    sx: {
                      backgroundColor: '#f8fafc',
                      borderBottom: '1px solid #e2e8f0'
                    }
                  }}
                />
              </div>
            </div>
          </ThemeProvider>
        );

      case 'messages':
        return (
          <ThemeProvider theme={muiTheme}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Messages reçus</h1>
                <div className="text-sm text-slate-600">
                  {(() => {
                    const nonLus = messages.filter(m => m.status === 'Non lu').length;
                    return `${nonLus} ${nonLus === 1 ? 'message non lu' : 'messages non lus'}`;
                  })()}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <MaterialReactTable
                  columns={messageColumns}
                  data={messages}
                  muiTableContainerProps={{
                    sx: { maxHeight: '600px' }
                  }}
                  muiTopToolbarProps={{
                    sx: {
                      backgroundColor: '#f8fafc',
                      borderBottom: '1px solid #e2e8f0'
                    }
                  }}
                  enableGlobalFilter
                  enableColumnFilters
                  enableSorting
                  initialState={{
                    sorting: [{ id: 'date', desc: true }]
                  }}
                />
              </div>
            </div>
          </ThemeProvider>
        );

      case 'newsletter':
        return (
          <ThemeProvider theme={muiTheme}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Newsletter</h1>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-slate-600">
                    {newsletterSubscribers.filter(s => s.status === 'Actif').length} abonnés actifs
                  </div>
                  <button
                    onClick={() => exportNewsletterToExcel()}
                    className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
                  >
                    <FaUpload className="w-4 h-4" />
                    Exporter Excel
                  </button>
                  <button
                    onClick={() => openModal('add', 'newsletter')}
                    className="bg-brand-500 text-white px-6 py-3 rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium"
                  >
                    <FaPlus className="w-4 h-4" />
                    Ajouter un abonné
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <MaterialReactTable
                  columns={newsletterColumns}
                  data={newsletterSubscribers}
                  muiTableContainerProps={{
                    sx: { maxHeight: '600px' }
                  }}
                  muiTopToolbarProps={{
                    sx: {
                      backgroundColor: '#f8fafc',
                      borderBottom: '1px solid #e2e8f0'
                    }
                  }}
                  enableGlobalFilter
                  enableColumnFilters
                  enableSorting
                  initialState={{
                    sorting: [{ id: 'dateSubscription', desc: true }]
                  }}
                />
              </div>
            </div>
          </ThemeProvider>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-slate-800">Paramètres</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Paramètres généraux */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Paramètres Généraux</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom de l'entreprise</label>
                    <input
                      type="text"
                      defaultValue="Osmoz Communication"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email principal</label>
                    <input
                      type="email"
                      defaultValue="contact@osmoz-communication.fr"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      defaultValue="01 84 19 01 04"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Adresse</label>
                    <textarea
                      rows={3}
                      defaultValue="ZAC du Gâtinais, 8 rue Marcel Dassault, 77120 Coulommiers"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Logo et Favicon */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Logo et Favicon</h2>
                <div className="space-y-8">
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Logo actuel */}
                                              <div className="space-y-3">
                          <h4 className="text-sm font-medium text-slate-600">Logo actuel</h4>
                          <div className="flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 min-h-[140px]">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-brand-500 rounded transform rotate-12 shadow-lg"></div>
                                <div className="w-10 h-10 bg-brand-600 rounded -ml-3 shadow-lg"></div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-slate-800">
                                  OSMOZ<span className="text-brand-500">COM</span>
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">
                                  Communication Visuelle
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Upload nouveau logo */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-slate-600">Télécharger un nouveau logo</h4>
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              id="logo-upload"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              onChange={handleImageUpload}
                            />
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-brand-500 hover:bg-brand-50/50 transition-all duration-200 cursor-pointer group min-h-[140px] flex items-center justify-center">
                              <div className="space-y-2">
                                <div className="mx-auto w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                                  <FaUpload className="w-5 h-5 text-brand-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700">Cliquer ou glisser votre logo ici</p>
                                  <p className="text-xs text-slate-500">PNG, JPG, SVG jusqu'à 10MB</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        {previewImage && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                            <h5 className="text-xs font-medium text-slate-600 mb-2">Aperçu :</h5>
                            <img src={previewImage} alt="Aperçu logo" className="max-h-20 mx-auto rounded border shadow-sm" />
                          </div>
                        )}
                        <p className="text-xs text-slate-500">Format recommandé : PNG avec fond transparent, 200x80px minimum</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">Favicon</label>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Favicon actuel */}
                                              <div className="space-y-3">
                          <h4 className="text-sm font-medium text-slate-600">Favicon actuel</h4>
                          <div className="flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 min-h-[140px]">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">O</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-slate-800">Favicon du site</div>
                                <div className="text-xs text-gray-500">16x16px - 32x32px</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Upload nouveau favicon */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-slate-600">Télécharger un nouveau favicon</h4>
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/x-icon,image/png,image/svg+xml"
                              id="favicon-upload"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-brand-500 hover:bg-brand-50/50 transition-all duration-200 cursor-pointer group min-h-[140px] flex items-center justify-center">
                              <div className="space-y-2">
                                <div className="mx-auto w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                                  <FaImage className="w-5 h-5 text-brand-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700">Cliquer ou glisser votre favicon ici</p>
                                  <p className="text-xs text-slate-500">ICO, PNG, SVG jusqu'à 1MB</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        <p className="text-xs text-slate-500">Format requis : ICO, PNG ou SVG, 16x16px, 32x32px ou 64x64px</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Paramètres SEO */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Paramètres SEO</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Titre du site</label>
                    <input
                      type="text"
                      defaultValue="Osmoz Communication - Communication Visuelle Coulommiers"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      rows={3}
                      defaultValue="Spécialiste en communication visuelle à Coulommiers. Signalétique, enseignes, impression numérique et solutions sur-mesure en Seine-et-Marne."
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Mots-clés</label>
                    <input
                      type="text"
                      defaultValue="signalétique, enseigne, communication visuelle, coulommiers, seine-et-marne"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Réseaux Sociaux</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Facebook</label>
                    <input
                      type="url"
                      placeholder="https://facebook.com/osmoz-communication"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/company/osmoz-communication"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Instagram</label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/osmoz_communication"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Sécurité */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Sécurité</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Changer le mot de passe</label>
                    <input
                      type="password"
                      placeholder="Nouveau mot de passe"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      placeholder="Confirmer le mot de passe"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="two-factor"
                      className="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500"
                    />
                    <label htmlFor="two-factor" className="text-sm text-slate-700">
                      Activer l'authentification à deux facteurs
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons d'action globaux */}
            <div className="flex gap-4 justify-end">
              <button className="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium">
                Annuler les modifications
              </button>
              <button className="px-6 py-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium">
                <FaSave className="w-4 h-4" />
                Enregistrer les paramètres
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-slate-600">Section en développement</p>
          </div>
        );
    }
  };

  return (
    <>
      <style>{`
        .drag-card {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        
        .drag-card img {
          pointer-events: none;
        }
        
        .drag-card:active {
          transform: scale(0.98);
        }

        /* Barres de défilement personnalisées */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #98c21d;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #7fb069;
        }

        ::-webkit-scrollbar-corner {
          background: #f1f5f9;
        }

        /* Pour Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #98c21d #f1f5f9;
        }
      `}</style>
      <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-slate-800">Administration</h1>
          <p className="text-sm text-slate-600">Osmoz Communication</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-brand-500 text-white'
                  : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 space-y-2">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-brand-600 hover:bg-brand-50"
          >
            <FaHome className="w-5 h-5" />
            Retour au site
          </a>
          <button
            onClick={() => {
              // Logique de déconnexion ici
              sessionStorage.removeItem('admin_authenticated');
              window.location.href = '/login';
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50"
          >
            <FaSignOutAlt className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        {renderContent()}
      </div>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={`${modalType === 'add' ? 'Ajouter' : modalType === 'edit' ? 'Modifier' : 'Supprimer'} ${modalContent}`}
      >
        {renderModalContent()}
      </Modal>
    </div>
    </>
  );
};