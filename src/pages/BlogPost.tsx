import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { FaCalendar, FaUser, FaTag, FaArrowLeft, FaShare, FaBookmark, FaClock } from 'react-icons/fa';

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

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "L'évolution de la signalétique numérique en 2024",
    excerpt: "Découvrez les dernières tendances en signalétique numérique et comment elles transforment l'expérience client dans les espaces commerciaux de Seine-et-Marne.",
    content: `
      <h2>La révolution numérique dans la signalétique</h2>
      <p>La signalétique numérique représente aujourd'hui l'avenir de la communication visuelle. À <strong>Coulommiers</strong> et dans toute la <strong>Seine-et-Marne</strong>, les entreprises adoptent massivement ces solutions innovantes pour améliorer l'expérience client et optimiser leur communication.</p>
      
      <h3>Les technologies émergentes</h3>
      <p>Les écrans OLED, la réalité augmentée et l'intelligence artificielle transforment radicalement l'approche traditionnelle de la signalétique. Ces technologies permettent une communication dynamique et personnalisée.</p>
      
      <ul>
        <li>Écrans haute résolution avec consommation énergétique réduite</li>
        <li>Gestion de contenu à distance et en temps réel</li>
        <li>Interactivité tactile et reconnaissance faciale</li>
        <li>Intégration avec les systèmes IoT</li>
      </ul>
      
      <h3>Applications pratiques en Seine-et-Marne</h3>
      <p>Dans le département, nous observons une adoption croissante dans plusieurs secteurs :</p>
      
      <h4>Secteur retail</h4>
      <p>Les centres commerciaux de la région intègrent des totems interactifs pour guider les visiteurs et promouvoir les offres en temps réel. Cette approche permet d'augmenter le trafic de 25% en moyenne.</p>
      
      <h4>Hôtellerie-restauration</h4>
      <p>Les établissements hôteliers modernisent leur signalétique avec des écrans d'information dynamiques, offrant services météo, événements locaux et informations pratiques.</p>
      
      <h3>Avantages économiques</h3>
      <p>L'investissement dans la signalétique numérique génère un ROI significatif :</p>
      
      <ul>
        <li>Réduction des coûts d'impression et de maintenance</li>
        <li>Flexibilité dans la gestion des messages</li>
        <li>Amélioration de l'image de marque</li>
        <li>Mesure précise de l'efficacité</li>
      </ul>
      
      <h3>Défis et solutions</h3>
      <p>Malgré ses avantages, la signalétique numérique présente certains défis que nous accompagnons nos clients à surmonter :</p>
      
      <ul>
        <li>Coût initial d'investissement</li>
        <li>Formation des équipes</li>
        <li>Maintenance technique</li>
        <li>Gestion de contenu</li>
      </ul>
      
      <h3>L'avenir proche</h3>
      <p>Les prochaines innovations incluront l'intégration d'intelligence artificielle pour une personnalisation poussée et l'utilisation de matériaux éco-responsables pour répondre aux enjeux environnementaux.</p>
      
      <p><strong>Chez Osmoz Communication, nous accompagnons les entreprises de Coulommiers dans cette transition numérique. Notre expertise technique et notre connaissance du marché local garantissent des solutions adaptées à vos besoins spécifiques.</strong></p>
    `,
    author: "Marie Dubois",
    date: "2024-01-15",
    category: "Tendances",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["signalétique", "numérique", "innovation", "coulommiers"],
    readTime: "5 min",
    featured: true
  },
  {
    id: 2,
    title: "Guide réglementation enseignes Seine-et-Marne 2024",
    excerpt: "Tout savoir sur la réglementation des enseignes commerciales en Seine-et-Marne. Guide complet pour les entreprises de Coulommiers et environs.",
    content: `
      <h2>Réglementation des enseignes en Seine-et-Marne</h2>
      <p>La réglementation des <strong>enseignes commerciales</strong> en <strong>Seine-et-Marne</strong> est encadrée par le Code de l'environnement et les arrêtés préfectoraux. <strong>Osmoz Communication</strong> vous accompagne dans toutes vos démarches administratives.</p>
      
      <h3>Demandes d'autorisation obligatoires</h3>
      <p>Certaines enseignes nécessitent une autorisation préalable :</p>
      <ul>
        <li>Enseignes de plus de 7m² en zone urbaine</li>
        <li>Enseignes lumineuses de toute dimension</li>
        <li>Enseignes dérogatoires aux règles locales</li>
        <li>Enseignes en centre historique protégé</li>
      </ul>
      
      <h3>Spécificités locales Coulommiers</h3>
      <p>La ville de <strong>Coulommiers</strong> applique des règles particulières :</p>
      <ul>
        <li>Respect du patrimoine architectural</li>
        <li>Couleurs harmonisées avec l'environnement</li>
        <li>Dimensions limitées en centre-ville</li>
        <li>Éclairage LED privilégié pour l'économie d'énergie</li>
      </ul>
      
      <h3>Démarches administratives</h3>
      <p>Notre équipe vous accompagne pour :</p>
      <ul>
        <li>Constitution du dossier de demande</li>
        <li>Plans et études d'intégration</li>
        <li>Suivi de l'instruction</li>
        <li>Respect des délais de réponse</li>
      </ul>
      
      <p><strong>Conseil d'expert :</strong> Anticipez vos demandes d'autorisation avec un délai de 2 à 3 mois pour éviter tout retard dans votre projet.</p>
    `,
    author: "Pierre Martin",
    date: "2024-01-12",
    category: "Réglementation",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["réglementation", "enseignes", "seine-et-marne", "juridique", "coulommiers"],
    readTime: "8 min",
    featured: false
  },
  {
    id: 3,
    title: "5 conseils signalétique hôtelière performante",
    excerpt: "Optimisez l'expérience client de votre établissement hôtelier avec une signalétique adaptée. Conseils d'experts pour le secteur hôtelier.",
    content: `
      <h2>Signalétique hôtelière : 5 conseils d'experts</h2>
      <p>Dans le <strong>secteur hôtelier</strong>, la signalétique joue un rôle crucial dans l'expérience client. Voici nos 5 conseils pour une signalétique performante.</p>
      
      <h3>1. Créer un parcours client fluide</h3>
      <p>Dès l'entrée, votre signalétique doit guider naturellement vos clients :</p>
      <ul>
        <li>Signalétique d'accueil claire et accueillante</li>
        <li>Fléchage intuitif vers les services</li>
        <li>Numérotation cohérente des chambres</li>
        <li>Plans d'orientation aux points stratégiques</li>
      </ul>
      
      <h3>2. Respecter votre identité de marque</h3>
      <p>Votre signalétique doit refléter l'image de votre établissement :</p>
      <ul>
        <li>Utilisation de vos couleurs corporate</li>
        <li>Typographies cohérentes avec votre charte</li>
        <li>Matériaux en accord avec votre positionnement</li>
        <li>Style adapté à votre clientèle cible</li>
      </ul>
      
      <h3>3. Intégrer le multilinguisme</h3>
      <p>Essentiel pour l'accueil international :</p>
      <ul>
        <li>Français et anglais minimum</li>
        <li>Langues adaptées à votre clientèle</li>
        <li>Pictogrammes universels</li>
        <li>QR codes vers traductions digitales</li>
      </ul>
      
      <h3>4. Optimiser la lisibilité</h3>
      <p>Une signalétique efficace doit être facilement lisible :</p>
      <ul>
        <li>Contrastes suffisants</li>
        <li>Tailles de caractères adaptées</li>
        <li>Éclairage suffisant jour et nuit</li>
        <li>Hauteur d'installation optimale</li>
      </ul>
      
      <h3>5. Penser maintenance et évolutivité</h3>
      <p>Anticipez l'entretien et les modifications :</p>
      <ul>
        <li>Matériaux résistants et facilement nettoyables</li>
        <li>Système modulaire pour les changements</li>
        <li>Accès facile pour la maintenance</li>
        <li>Documentation technique complète</li>
      </ul>
      
      <p><strong>Notre expertise au service de votre hôtel :</strong> Osmoz Communication conçoit des solutions signalétiques sur-mesure pour plus de 50 établissements hôteliers en Seine-et-Marne.</p>
    `,
    author: "Sophie Laurent",
    date: "2024-01-10",
    category: "Conseils",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["hôtellerie", "signalétique", "conseils", "expérience client"],
    readTime: "6 min",
    featured: true
  }
];

export const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <Navigate to="/blog" replace />;
  }

  const post = blogPosts.find(p => p.id === parseInt(id));
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* SEO Meta Tags */}
      <title>{post.title} - Blog Osmoz Communication</title>
      <meta name="description" content={post.excerpt} />
      <meta name="keywords" content={post.tags.join(', ')} />
      <meta name="author" content={post.author} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.image} />
      <meta property="og:type" content="article" />

      {/* Breadcrumb */}
      <section className="py-6 bg-slate-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-slate-600 hover:text-brand-600">Accueil</Link>
            <span className="text-slate-400">/</span>
            <Link to="/blog" className="text-slate-600 hover:text-brand-600">Blog</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900">{post.category}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium mb-8 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>

            <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1">
                <FaCalendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1">
                <FaUser className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="w-4 h-4" />
                {post.readTime} de lecture
              </span>
              <span className="flex items-center gap-1">
                <FaTag className="w-4 h-4" />
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-8">
              <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
                <FaShare className="w-4 h-4" />
                Partager
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                <FaBookmark className="w-4 h-4" />
                Sauvegarder
              </button>
            </div>

            {/* Featured Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl mb-12">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg prose-slate max-w-none"
            style={{
              '--tw-prose-headings': '#1e293b',
              '--tw-prose-links': '#22c55e',
              '--tw-prose-strong': '#1e293b',
              '--tw-prose-code': '#22c55e'
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-slate-200"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-6 bg-slate-50 rounded-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-800">{post.author}</h4>
                <p className="text-slate-600">Expert en communication visuelle chez Osmoz Communication</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Articles similaires</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span>{new Date(relatedPost.date).toLocaleDateString('fr-FR')}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    <Link
                      to={`/blog/${relatedPost.id}`}
                      className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
                    >
                      Lire l'article →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-brand-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Besoin d'accompagnement pour votre projet ?
            </h2>
            <p className="text-brand-100 mb-8 text-lg">
              Notre équipe d'experts est à votre disposition pour étudier vos besoins en communication visuelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-brand-600 px-8 py-3 rounded-xl font-semibold hover:bg-brand-50 transition-colors"
              >
                Nous contacter
              </Link>
              <Link
                to="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-brand-600 transition-colors"
              >
                Découvrir nos services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}; 