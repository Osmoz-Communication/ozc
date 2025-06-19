import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  href?: string;
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  href,
  to,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'relative overflow-hidden font-semibold transition-all duration-300 inline-flex items-center justify-center group';
  
  const variantClasses = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg',
    secondary: 'bg-slate-800 hover:bg-slate-900 text-white shadow-lg',
    outline: 'border-2 border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-lg'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      
      {/* Effet de brillance */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Bordure animée */}
      <motion.div
        className="absolute inset-0 border-2 border-brand-400/0 rounded-lg"
        whileHover={{ 
          borderColor: "rgba(152, 194, 29, 0.4)",
          boxShadow: "0 0 15px rgba(152, 194, 29, 0.2)"
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
  
  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.05 },
    whileTap: disabled ? {} : { scale: 0.98 },
    className: classes,
    disabled
  };
  
  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className="contents">
          {buttonContent}
        </Link>
      </motion.div>
    );
  }
  
  if (href) {
    return (
      <motion.a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
      >
        {buttonContent}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
}; 