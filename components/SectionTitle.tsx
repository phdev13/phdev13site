import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  light?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center',
  light = false
}) => {
  return (
    <div className={`mb-12 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}
      >
        {title}
        <span className="block h-1.5 w-24 bg-primary-600 mt-2 rounded-full mx-auto md:mx-0 opacity-80" 
              style={{ marginLeft: alignment === 'center' ? 'auto' : 0, marginRight: alignment === 'center' ? 'auto' : 0 }} 
        />
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-lg md:text-xl max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};