import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaTag, FaArrowRight, FaSearch } from 'react-icons/fa';
import { HeroSection } from '../components/HeroSection';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  readTime: string;
  featured: boolean;
}

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "L'évolution de la signalétique numérique en 2024",
      excerpt: "Découvrez les dernières tendances en signalétique numérique et comment elles transforment l'expérience client dans les espaces commerciaux de Seine-et-Marne.",
      content: "La signalétique numérique révolutionne la communication visuelle...",
      author: "Marie Dubois",
      date: "2024-01-15",
      category: "Tendances",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["signalétique", "numérique", "innovation", "coulommiers"],
      readTime: "5 min",
      featured: true
    },
    {
      id: 2,
      title: "Réglementation des enseignes en Seine-et-Marne : ce qu'il faut savoir",
      excerpt: "Guide complet sur la réglementation des enseignes commerciales dans le département de Seine-et-Marne pour les entreprises de Coulommiers et environs.",
      content: "La réglementation des enseignes en Seine-et-Marne...",
      author: "Pierre Martin",
      date: "2024-01-12",
      category: "Réglementation",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["réglementation", "enseignes", "seine-et-marne", "juridique"],
      readTime: "8 min",
      featured: false
    },
    {
      id: 3,
      title: "5 conseils pour choisir la signalétique parfaite pour votre hôtel",
      excerpt: "Optimisez l'expérience client de votre établissement hôtelier avec une signalétique adaptée. Conseils d'experts pour le secteur hôtelier.",
      content: "Dans le secteur hôtelier, la signalétique joue un rôle crucial...",
      author: "Sophie Laurent",
      date: "2024-01-10",
      category: "Conseils",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["hôtellerie", "signalétique", "conseils", "expérience client"],
      readTime: "6 min",
      featured: true
    },
    {
      id: 4,
      title: "L'impression grand format : techniques et applications",
      excerpt: "Explorez les possibilités offertes par l'impression grand format pour vos projets de communication visuelle. Technologies et applications pratiques.",
      content: "L'impression grand format ouvre de nombreuses possibilités...",
      author: "Thomas Bernard",
      date: "2024-01-08",
      category: "Techniques",
      image: "https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["impression", "grand format", "techniques", "communication"],
      readTime: "7 min",
      featured: false
    },
    {
      id: 5,
      title: "Signalétique écologique : matériaux durables et innovation",
      excerpt: "Découvrez les solutions éco-responsables en signalétique. Matériaux recyclables, processus durables et innovation environnementale.",
      content: "L'écologie devient un enjeu majeur dans la signalétique...",
      author: "Élise Moreau",
      date: "2024-01-05",
      category: "Écologie",
      image: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["écologie", "durable", "innovation", "environnement"],
      readTime: "5 min",
      featured: false
    },
    {
      id: 6,
      title: "Retail : comment optimiser votre signalétique pour augmenter les ventes",
      excerpt: "Stratégies de signalétique retail pour améliorer le parcours client et booster vos ventes. Analyses et cas pratiques dans le commerce.",
      content: "Dans le secteur du retail, la signalétique est un levier commercial...",
      author: "Antoine Rousseau",
      date: "2024-01-03",
      category: "Retail",
      image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["retail", "commerce", "ventes", "stratégie"],
      readTime: "9 min",
      featured: true
    }
  ];

  const categories = ['Tous', 'Tendances', 'Conseils', 'Techniques', 'Réglementation', 'Écologie', 'Retail'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection 
        page="blog"
        defaultTitle="Blog & Actualités"
        defaultSubtitle="Expertise et conseils en communication visuelle"
        defaultImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
      />

      {/* Introduction SEO */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-800 mb-6">
              Actualités & Conseils en Communication Visuelle
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Découvrez nos derniers articles sur la <strong>signalétique</strong>, les <strong>enseignes</strong> et l'<strong>impression numérique</strong>. 
              Notre équipe d'experts partage conseils, tendances et actualités pour les professionnels de <strong>Coulommiers</strong> et de <strong>Seine-et-Marne</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Filtres et recherche */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Barre de recherche */}
            <div className="relative w-full lg:w-96">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-200"
              />
            </div>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-brand-500 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles en vedette */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Articles en vedette</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Vedette
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUser className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-brand-600">
                        <FaTag className="w-4 h-4" />
                        {post.category}
                      </span>
                      <Link
                        to={`/blog/${post.id}`}
                        className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors"
                      >
                        Lire la suite
                        <FaArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tous les articles */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              {selectedCategory === 'Tous' ? 'Tous les articles' : `Articles - ${selectedCategory}`}
            </h2>
            <p className="text-slate-600">
              {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''} trouvé{filteredPosts.length > 1 ? 's' : ''}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-brand-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-600 font-medium">{post.category}</span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
                    >
                      Lire →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-slate-600 text-lg">
                Aucun article trouvé pour votre recherche.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tous');
                }}
                className="mt-4 text-brand-600 hover:text-brand-700 font-semibold"
              >
                Réinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-brand-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Restez informé de nos actualités
            </h2>
            <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
              Recevez nos derniers articles et conseils d'experts directement dans votre boîte mail. 
              Une newsletter mensuelle dédiée aux professionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-500"
              />
              <button className="bg-white text-brand-600 px-6 py-3 rounded-xl font-semibold hover:bg-brand-50 transition-colors">
                S'abonner
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 