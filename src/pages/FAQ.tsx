import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';

const faqItems = [
  {
    question: "Quelle est votre activité principale ?",
    answer: "Notre cœur de métier est la communication visuelle. Nous concevons, fabriquons et installons une large gamme de supports : signalétique, enseignes, habillages de vitrines et de véhicules, impressions numériques, gravures et bien plus encore."
  },
  {
    question: "Depuis combien de temps existez-vous ?",
    answer: "Fondée en 2014, notre agence possède plus de 10 ans d'expérience au service de l'image et du développement de nos clients."
  },
  {
    question: "La gravure est-elle réalisable sur-mesure ?",
    answer: "Absolument. Nous proposons des services de gravure laser de haute précision sur de nombreux supports (métal, bois, plastique...). Chaque projet est personnalisable pour répondre parfaitement à vos besoins."
  },
  {
    question: "Quels sont vos délais de fabrication ?",
    answer: "Nos délais varient en fonction de la complexité et de la nature du projet. Nous nous engageons cependant à optimiser chaque étape pour vous garantir une livraison rapide sans jamais compromettre la qualité."
  },
  {
    question: "Avez-vous la possibilité de gérer de grands volumes ?",
    answer: "Oui, notre atelier est équipé pour gérer des productions en grande série, que ce soit pour des flottes de véhicules, des réseaux de magasins ou de la signalétique pour de grands bâtiments."
  },
  {
    question: "Comment puis-je entrer en contact avec vous ?",
    answer: "C'est très simple ! Vous pouvez nous appeler au 01 84 19 01 04, nous envoyer un email à contact@ozc.fr, ou remplir le formulaire sur notre page de contact. Nous sommes très réactifs !"
  },
  {
    question: "Est-ce que la pose est possible en option ?",
    answer: "La pose n'est pas une option, c'est une partie intégrante de notre service pour la plupart de nos produits. Nos équipes de techniciens qualifiés assurent une installation professionnelle pour un rendu parfait."
  },
  {
    question: "Comment établir un devis avec vous ?",
    answer: "Il vous suffit de nous contacter avec les détails de votre projet. Nous discuterons de vos besoins et vous fournirons un devis détaillé et transparent dans les plus brefs délais."
  },
  {
    question: "Quels types de matériaux utilisez-vous ?",
    answer: "Nous travaillons avec une large gamme de matériaux de qualité : aluminium, PVC, plexiglas, bois, métal, vinyle, textile, et bien d'autres. Le choix dépend de votre projet et de son environnement d'usage."
  },
  {
    question: "Proposez-vous des solutions éco-responsables ?",
    answer: "Oui, nous sommes soucieux de l'environnement et proposons des matériaux recyclables, des encres écologiques et optimisons nos processus pour réduire notre empreinte carbone."
  },
  {
    question: "Intervenez-vous partout en France ?",
    answer: "Nous intervenons principalement en Île-de-France, mais selon la nature et l'importance du projet, nous pouvons nous déplacer dans toute la France. N'hésitez pas à nous consulter."
  },
  {
    question: "Avez-vous des références clients ?",
    answer: "Oui, nous avons travaillé pour de nombreux clients dans différents secteurs : hôtellerie, industrie, commerce, événementiel... Nous pouvons vous fournir des références sur demande."
  }
];

const FaqItem: React.FC<{ item: typeof faqItems[0]; isOpen: boolean; onClick: () => void; index: number }> = ({ item, isOpen, onClick, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md border border-gray-100 mb-4 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <button
        className="w-full flex justify-between items-center text-left gap-4 p-6 hover:bg-gray-50/50 transition-colors duration-200"
        onClick={onClick}
      >
        <span className="text-lg font-semibold text-slate-800 flex-1">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-6 h-6 text-brand-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.4,
              ease: "easeInOut",
              opacity: { duration: 0.3 }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="text-slate-600 leading-relaxed border-t border-gray-100 pt-4">
                {item.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection 
        page="faq"
        defaultTitle="Foire Aux Questions"
        defaultSubtitle="Toutes les réponses à vos questions"
        defaultImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
      />

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Questions Fréquemment Posées</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Retrouvez ici les réponses aux questions les plus fréquentes concernant nos services, 
              nos méthodes de travail et notre entreprise.
            </p>
          </motion.div>

          <div className="space-y-0">
            {faqItems.map((item, index) => (
              <FaqItem 
                key={index}
                item={item} 
                isOpen={openFaq === index} 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                index={index}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h3>
            <p className="text-brand-100 mb-6 text-lg">
              Notre équipe est là pour répondre à toutes vos questions spécifiques sur vos projets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-brand-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Nous contacter
              </a>
              <a
                href="tel:0184190104"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-600 px-8 py-3 rounded-lg font-semibold transition-colors"
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