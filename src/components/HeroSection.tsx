import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

interface HeroSectionProps {
  page?: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  defaultTitle?: string;
  defaultSubtitle?: string;
  defaultImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  page,
  title: directTitle,
  subtitle: directSubtitle,
  backgroundImage: directImage,
  defaultTitle, 
  defaultSubtitle, 
  defaultImage 
}) => {
  const { heroImages } = useContent();
  
  // If page is provided, try to get data from context
  const heroData = page ? heroImages.find(hero => hero.page === page) : null;
  
  // Use direct props first, then context data, then defaults
  const title = directTitle || heroData?.title || defaultTitle;
  const subtitle = directSubtitle || heroData?.subtitle || defaultSubtitle;
  const image = directImage || heroData?.image || defaultImage;

  return (
    <section className="relative h-96 lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-slate-900/20"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/15 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-brand-300/30 rounded-full"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-brand-300 text-lg font-medium mb-4"
              >
                {subtitle}
              </motion.p>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {title}
            </motion.h1>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}; 