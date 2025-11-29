
import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { NavigationProps, ViewType } from '../types';

export const Header: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3 border-gray-100' 
          : 'bg-transparent py-5 border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="bg-primary-600 text-white p-2 rounded-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary-600/20">
            <Code2 size={22} />
          </div>
          <span className="font-display font-bold text-xl md:text-2xl text-gray-900 tracking-tight group-hover:text-primary-600 transition-colors">
            PH<span className="text-primary-600">.dev</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
             if (item.id === 'contact') return null; // Render contact as button separately
             const isActive = currentView === item.id;
             return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                  isActive 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
                {/* Smooth Animated Underline */}
                <span className={`absolute bottom-1 left-4 h-0.5 bg-primary-600 rounded-full transition-all duration-300 ease-out ${
                  isActive ? 'w-[calc(100%-2rem)] opacity-100' : 'w-0 opacity-0 group-hover:w-[calc(100%-2rem)] group-hover:opacity-100'
                }`} />
              </button>
            );
          })}
          
          <div className="w-px h-5 bg-gray-200 mx-4"></div>

          <button 
            onClick={() => handleNavClick('contact')}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-primary-600 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-primary-600/30 active:scale-95"
          >
            Orçamento
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center items-center transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-center w-full max-w-xs">
          {NAV_ITEMS.map((item) => (
             item.id !== 'contact' ? (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-2xl font-display font-semibold transition-all duration-300 hover:scale-105 ${
                    currentView === item.id ? 'text-primary-600' : 'text-gray-800 hover:text-primary-600'
                  }`}
                >
                  {item.label}
                </button>
             ) : null
          ))}
          <div className="h-px w-16 bg-gray-200 mx-auto my-4"></div>
          <button 
            onClick={() => handleNavClick('contact')}
            className="w-full py-4 bg-primary-600 text-white rounded-2xl text-lg font-medium shadow-xl shadow-primary-600/20 active:scale-95 transition-all"
          >
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </header>
  );
};
