
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '../projectsData';
import { SectionTitle } from './SectionTitle';
import { ExternalLink, Github, MessageSquare, Lock, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { Project } from '../types';

interface PortfolioProps {
  onOpenChat: () => void;
}

// Sub-componente isolado para gerenciar o carregamento de cada Iframe individualmente
const ProjectCard: React.FC<{ project: Project; index: number; onNavigation: (url: string) => void }> = ({ project, index, onNavigation }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Intersection Observer: Só carrega o iframe quando o card aparecer na tela
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoadIframe(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 } // Carrega quando 10% do card estiver visível
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative rounded-3xl transition-all duration-500 bg-white border border-gray-200 shadow-xl hover:shadow-2xl hover:shadow-primary-900/10 ${project.featured ? 'lg:col-span-2' : ''}`}
        >
            {/* Browser Window Chrome */}
            <div className="bg-gray-100 border-b border-gray-200 rounded-t-3xl px-4 py-3 flex items-center gap-4 select-none z-20 relative">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80 border border-green-500/50"></div>
                </div>
                {/* Fake Address Bar */}
                <div className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 flex items-center justify-center text-xs text-gray-500 font-mono gap-2 shadow-sm">
                    <Lock size={10} className="text-green-600" />
                    <span className="truncate max-w-[200px] md:max-w-xs">{project.liveUrl?.replace('https://', '') || 'loading...'}</span>
                </div>
                <div className="w-10"></div>
            </div>

            {/* Content Area */}
            <div className="relative overflow-hidden bg-gray-50 h-[300px] md:h-[450px]">
                
                {/* 1. Static Image (Placeholder until iframe loads OR fallback for mobile) */}
                <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${iframeLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                    />
                    {/* Loading Spinner centered if it should load but hasn't finished */}
                    {shouldLoadIframe && !iframeLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 backdrop-blur-sm">
                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                    )}
                </div>

                {/* 2. LIVE PREVIEW IFRAME (Desktop Only) */}
                {/* Always visible logic, but lazy loaded via 'shouldLoadIframe' */}
                {project.liveUrl && shouldLoadIframe && (
                        <div className="absolute inset-0 z-0 hidden md:block w-full h-full bg-white">
                            {/* Scale Container: 
                                We make a container 200% width/height to render a "Desktop" view (1920px approx)
                                Then scale it down by 0.5 to fit the card. 
                            */}
                            <div className="w-[200%] h-[200%] origin-top-left transform scale-50">
                                <iframe 
                                src={project.liveUrl}
                                title={`Preview of ${project.title}`}
                                className="w-full h-full border-0"
                                loading="lazy"
                                onLoad={() => setIframeLoaded(true)}
                                style={{ pointerEvents: 'none' }} // Crucial: Prevents scroll jacking
                                sandbox="allow-scripts allow-same-origin"
                                />
                            </div>
                            {/* Protection Layer to capture clicks */}
                            <div className="absolute inset-0 z-10 bg-transparent"></div>
                        </div>
                )}

                {/* 3. Project Info Overlay (Bottom) */}
                {/* Always present but styled to be readable over the site */}
                <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
                    <div className={`p-6 md:p-8 bg-gradient-to-t from-gray-950 via-gray-900/90 to-transparent pt-24 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-2'}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold tracking-wider text-primary-300 uppercase bg-primary-900/80 backdrop-blur-md px-2 py-1 rounded border border-primary-500/30 shadow-lg">
                                {project.category}
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 shadow-sm drop-shadow-md">
                            {project.title}
                        </h3>
                        <p className={`text-gray-200 text-sm md:text-base max-w-xl mb-6 leading-relaxed transition-all duration-300 ${isHovered ? 'opacity-100 line-clamp-none' : 'opacity-90 line-clamp-2'}`}>
                            {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm">
                                #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3 pointer-events-auto">
                            <Button 
                                variant="primary" 
                                size="sm" 
                                className="!bg-white !text-gray-900 hover:!bg-gray-100 border-none shadow-xl"
                                leftIcon={<ExternalLink size={16} />}
                                onClick={() => onNavigation(project.demoUrl)}
                            >
                                Visitar Site
                            </Button>
                            {!project.liveUrl?.includes('hce') && (
                                <Button 
                                    variant="secondary" 
                                    size="sm" 
                                    className="bg-gray-800/80 backdrop-blur-md hover:bg-gray-800 border border-gray-700"
                                    leftIcon={<Github size={16} />}
                                    onClick={() => onNavigation('https://github.com')}
                                >
                                    Código
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenChat }) => {
  const handleNavigation = (url: string) => {
    if (!url || url === '#') return;
    window.open(url, '_blank');
  };

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionTitle 
          title="Portfólio Selecionado" 
          subtitle="Projetos reais, resultados reais. Veja o código e a interface em ação."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                onNavigation={handleNavigation} 
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
            <div className="inline-block p-1 rounded-2xl bg-gray-100 border border-gray-200 shadow-sm">
                <div className="flex gap-2">
                    <Button 
                        variant="ghost" 
                        size="lg" 
                        onClick={() => handleNavigation('https://github.com')}
                        leftIcon={<Github size={20} />}
                    >
                        Ver Repositório Completo
                    </Button>
                    <Button 
                        variant="primary" 
                        size="lg" 
                        onClick={onOpenChat}
                        rightIcon={<MessageSquare size={18} />}
                        className="shadow-lg shadow-primary-600/20"
                    >
                        Iniciar Meu Projeto
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
