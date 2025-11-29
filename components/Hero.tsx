
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, MessageSquare, Zap, FileCode, Cpu, Palette } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewType } from '../types';
import { InteractiveBackground } from './InteractiveBackground';

interface HeroProps {
  onNavigate: (view: ViewType) => void;
  onOpenChat: () => void;
}

const DYNAMIC_WORDS = ["Rápidas", "Escaláveis", "Modernas", "Intuitivas"];

// --- Typewriter Data (Meta-Creation Concept) ---

interface Snippet {
    fileName: string;
    fileIcon: React.ReactNode;
    language: string;
    code: string; // Raw text for typing logic
    tokens: { text: string; color: string }[]; // Pre-parsed for coloring
}

const META_SNIPPETS: Snippet[] = [
    {
        fileName: "Hero.tsx",
        fileIcon: <FileCode size={14} className="text-blue-400" />,
        language: "typescript",
        code: `return (
  <motion.h1 
    className="text-7xl font-bold"
    animate={{ opacity: 1 }}
  >
    Crio experiências
    <GradientText>
      Digitais
    </GradientText>
  </motion.h1>
);`,
        tokens: [
            { text: "return", color: "text-purple-400" },
            { text: " (", color: "text-gray-400" },
            { text: "\n  ", color: "text-white" },
            { text: "<", color: "text-gray-500" },
            { text: "motion.h1", color: "text-red-400" },
            { text: " \n    ", color: "text-white" },
            { text: "className", color: "text-purple-300" },
            { text: "=", color: "text-white" },
            { text: "\"", color: "text-green-300" },
            { text: "text-7xl font-bold", color: "text-green-300" },
            { text: "\"", color: "text-green-300" },
            { text: "\n    ", color: "text-white" },
            { text: "animate", color: "text-purple-300" },
            { text: "=", color: "text-white" },
            { text: "{{", color: "text-yellow-300" },
            { text: " opacity", color: "text-blue-300" },
            { text: ":", color: "text-white" },
            { text: " 1", color: "text-orange-400" },
            { text: " }}", color: "text-yellow-300" },
            { text: "\n  ", color: "text-white" },
            { text: ">", color: "text-gray-500" },
            { text: "\n    Crio experiências", color: "text-white" },
            { text: "\n    ", color: "text-white" },
            { text: "<", color: "text-gray-500" },
            { text: "GradientText", color: "text-yellow-400" },
            { text: ">", color: "text-gray-500" },
            { text: "\n      Digitais", color: "text-white" },
            { text: "\n    ", color: "text-white" },
            { text: "</", color: "text-gray-500" },
            { text: "GradientText", color: "text-yellow-400" },
            { text: ">", color: "text-gray-500" },
            { text: "\n  ", color: "text-white" },
            { text: "</", color: "text-gray-500" },
            { text: "motion.h1", color: "text-red-400" },
            { text: ">", color: "text-gray-500" },
            { text: "\n);", color: "text-gray-400" },
        ]
    },
    {
        fileName: "particles.ts",
        fileIcon: <Cpu size={14} className="text-yellow-400" />,
        language: "typescript",
        code: `class Particle {
  connect(others) {
    const dist = Math.hypot(
      this.x - others.x,
      this.y - others.y
    );

    if (dist < 120) {
      ctx.strokeStyle = HEX_PRIMARY;
      ctx.stroke();
    }
  }
}`,
        tokens: [
            { text: "class", color: "text-purple-400" },
            { text: " ", color: "text-white" },
            { text: "Particle", color: "text-yellow-400" },
            { text: " {", color: "text-yellow-300" },
            { text: "\n  ", color: "text-white" },
            { text: "connect", color: "text-blue-400" },
            { text: "(", color: "text-yellow-300" },
            { text: "others", color: "text-orange-300" },
            { text: ")", color: "text-yellow-300" },
            { text: " {", color: "text-yellow-300" },
            { text: "\n    ", color: "text-white" },
            { text: "const", color: "text-purple-400" },
            { text: " ", color: "text-white" },
            { text: "dist", color: "text-blue-300" },
            { text: " ", color: "text-white" },
            { text: "=", color: "text-white" },
            { text: " ", color: "text-white" },
            { text: "Math", color: "text-green-400" },
            { text: ".", color: "text-white" },
            { text: "hypot", color: "text-blue-400" },
            { text: "(", color: "text-purple-300" },
            { text: "\n      this.x - others.x,", color: "text-white" },
            { text: "\n      this.y - others.y", color: "text-white" },
            { text: "\n    ", color: "text-white" },
            { text: ");", color: "text-purple-300" },
            { text: "\n\n    ", color: "text-white" },
            { text: "if", color: "text-purple-400" },
            { text: " (", color: "text-gray-400" },
            { text: "dist", color: "text-blue-300" },
            { text: " < ", color: "text-white" },
            { text: "120", color: "text-orange-400" },
            { text: ") {", color: "text-gray-400" },
            { text: "\n      ctx.", color: "text-white" },
            { text: "strokeStyle", color: "text-blue-300" },
            { text: " = ", color: "text-white" },
            { text: "HEX_PRIMARY", color: "text-purple-300" },
            { text: ";", color: "text-white" },
            { text: "\n      ctx.", color: "text-white" },
            { text: "stroke", color: "text-blue-400" },
            { text: "();", color: "text-white" },
            { text: "\n    }", color: "text-gray-400" },
            { text: "\n  }", color: "text-yellow-300" },
            { text: "\n}", color: "text-yellow-300" },
        ]
    },
    {
        fileName: "tailwind.config.js",
        fileIcon: <Palette size={14} className="text-cyan-400" />,
        language: "javascript",
        code: `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  }
}`,
        tokens: [
            { text: "module", color: "text-red-400" },
            { text: ".", color: "text-white" },
            { text: "exports", color: "text-red-400" },
            { text: " = {", color: "text-white" },
            { text: "\n  ", color: "text-white" },
            { text: "theme", color: "text-blue-300" },
            { text: ": {", color: "text-white" },
            { text: "\n    ", color: "text-white" },
            { text: "extend", color: "text-blue-300" },
            { text: ": {", color: "text-white" },
            { text: "\n      ", color: "text-white" },
            { text: "colors", color: "text-blue-300" },
            { text: ": {", color: "text-white" },
            { text: "\n        ", color: "text-white" },
            { text: "primary", color: "text-purple-300" },
            { text: ": {", color: "text-white" },
            { text: "\n          500: ", color: "text-white" },
            { text: "'#8b5cf6'", color: "text-green-300" },
            { text: ",", color: "text-white" },
            { text: "\n          600: ", color: "text-white" },
            { text: "'#7c3aed'", color: "text-green-300" },
            { text: ",", color: "text-white" },
            { text: "\n        }", color: "text-white" },
            { text: "\n      },", color: "text-white" },
            { text: "\n      ", color: "text-white" },
            { text: "fontFamily", color: "text-blue-300" },
            { text: ": {", color: "text-white" },
            { text: "\n        sans: [", color: "text-white" },
            { text: "'Inter'", color: "text-green-300" },
            { text: "]", color: "text-white" },
            { text: "\n      }", color: "text-white" },
            { text: "\n    }", color: "text-white" },
            { text: "\n  }", color: "text-white" },
            { text: "\n}", color: "text-white" },
        ]
    }
];

const CodeTypewriter = () => {
    const [snippetIndex, setSnippetIndex] = useState(0);
    const [displayedTokens, setDisplayedTokens] = useState<React.ReactNode[]>([]);
    const [charCount, setCharCount] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const currentSnippet = META_SNIPPETS[snippetIndex];

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        // Calculate total length of current snippet in chars
        const fullTextLength = currentSnippet.tokens.reduce((acc, token) => acc + token.text.length, 0);

        const type = () => {
            if (isPaused) {
                timeout = setTimeout(() => {
                    setIsPaused(false);
                    setIsDeleting(true);
                }, 3000); // Wait 3s before clearing
                return;
            }

            // Typing Speed
            const speed = isDeleting ? 20 : 40; 

            if (!isDeleting) {
                // TYPING
                if (charCount < fullTextLength) {
                    setCharCount(prev => prev + 1);
                    timeout = setTimeout(type, speed);
                } else {
                    setIsPaused(true);
                }
            } else {
                // DELETING
                if (charCount > 0) {
                    setCharCount(prev => prev - 2); // Delete faster
                    timeout = setTimeout(type, speed);
                } else {
                    // Don't pause between snippets, go straight to next
                    setIsDeleting(false);
                    setSnippetIndex(prev => (prev + 1) % META_SNIPPETS.length);
                    setCharCount(1); // Start with 1 char of the next snippet
                }
            }
        };

        timeout = setTimeout(type, 50);

        return () => clearTimeout(timeout);
    }, [charCount, isDeleting, isPaused, snippetIndex, currentSnippet]);

    // Optimize Rendering: Slice the tokens based on charCount
    // This avoids complex state logic inside the timer loop
    useEffect(() => {
        let currentCount = 0;
        const newTokens: React.ReactNode[] = [];

        for (let i = 0; i < currentSnippet.tokens.length; i++) {
            const token = currentSnippet.tokens[i];
            const tokenLength = token.text.length;

            if (currentCount + tokenLength <= charCount) {
                // Fully typed token
                newTokens.push(<span key={i} className={token.color}>{token.text}</span>);
                currentCount += tokenLength;
            } else {
                // Partially typed token
                const remaining = charCount - currentCount;
                if (remaining > 0) {
                    newTokens.push(<span key={i} className={token.color}>{token.text.slice(0, remaining)}</span>);
                }
                break; // Stop loop, we reached the cursor
            }
        }
        setDisplayedTokens(newTokens);
    }, [charCount, currentSnippet]);

    return (
        <div className="font-mono text-sm leading-relaxed min-h-[180px]">
            <div className="flex items-center justify-between border-b border-gray-700 pb-3 mb-3">
                <div className="flex items-center gap-2">
                    {currentSnippet.fileIcon}
                    <span className="text-gray-400 text-xs font-medium">{currentSnippet.fileName}</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
                </div>
            </div>
            
            <div className="whitespace-pre-wrap">
                {displayedTokens}
                <span className="inline-block w-2 h-4 bg-primary-400 ml-0.5 align-middle animate-pulse"></span>
            </div>
        </div>
    );
};


// --- Tech Icons ---
const TechIcon = ({ children, label, color, hoverColor }: { children: React.ReactNode; label: string; color: string; hoverColor: string }) => (
  <div className="flex items-center gap-2 group cursor-default relative">
    {/* Glow Effect */}
    <div className={`absolute inset-0 blur-lg rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500`} style={{ backgroundColor: color }}></div>
    
    <div className={`relative z-10 transition-colors duration-300`} style={{ color: color }}>
      {children}
    </div>
    <span className={`text-sm font-semibold text-gray-400 transition-colors duration-300 hidden sm:block group-hover:text-gray-900`}>
      {label}
    </span>
  </div>
);

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenChat }) => {
  const [wordIndex, setWordIndex] = useState(0);

  // Rotate words effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col pt-32 pb-10 overflow-hidden font-sans">
      <InteractiveBackground />
      
      <div className="container mx-auto px-4 md:px-8 flex-grow flex flex-col justify-center relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content (Text) */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold tracking-wide uppercase mb-8 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Disponível para novos projetos
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-[1.1] mb-6 tracking-tight"
            >
              Crio experiências <br className="hidden lg:block"/> digitais{' '}
              <div className="inline-block relative min-w-[280px] text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-0 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600 pb-2"
                  >
                    {DYNAMIC_WORDS[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
                {/* Invisible copy to hold width */}
                <span className="invisible">{DYNAMIC_WORDS[0]}.</span>
              </div>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Desenvolvedor Frontend Especialista. Transformo conceitos complexos em interfaces <strong className="text-gray-900 font-medium">Pixel-Perfect</strong>, acessíveis e de alta performance usando <strong className="text-gray-900 font-medium">React</strong> e <strong className="text-gray-900 font-medium">TypeScript</strong>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button 
                size="lg" 
                rightIcon={<MessageSquare size={20} />} 
                onClick={onOpenChat}
                className="shadow-xl shadow-primary-600/20 w-full sm:w-auto"
              >
                Solicitar Orçamento
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                leftIcon={<ArrowRight size={20} />}
                onClick={() => onNavigate('portfolio')}
                className="bg-white/80 backdrop-blur-sm hover:bg-white w-full sm:w-auto"
              >
                Ver Projetos
              </Button>
            </motion.div>
          </div>

          {/* Right Content (Visual Hook / Floating Card) */}
          <div className="flex-1 hidden lg:flex justify-center relative min-h-[400px] w-full items-center">
            
             {/* Floating Code Card */}
             <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
                transition={{ 
                   opacity: { duration: 0.8, delay: 0.4 },
                   x: { duration: 0.8, delay: 0.4 },
                   y: { duration: 6, repeat: Infinity, ease: "easeInOut" } 
                }}
                className="relative z-10 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700 p-6 shadow-2xl w-full max-w-md -rotate-2 hover:rotate-0 transition-transform duration-500 group"
             >
                {/* Window Controls */}
                <div className="flex gap-2 mb-6 border-b border-gray-800 pb-4">
                   <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>

                {/* Dynamic Typewriter */}
                <CodeTypewriter />
                
                {/* Floating Badge attached to card */}
                <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-xl border border-gray-100 flex items-center gap-2 font-bold text-xs animate-bounce" style={{ animationDuration: '3s' }}>
                   <Zap size={14} className="text-yellow-500 fill-yellow-500"/> Fast Delivery
                </div>
             </motion.div>

             {/* Decorative Elements Behind Card */}
             <div className="absolute top-10 right-10 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
          </div>
        </div>

        {/* Footer Tech Stack Bar */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="mt-20 md:mt-32 border-t border-gray-100 pt-10"
        >
           <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">
              Stack de Alta Performance
           </p>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-90">
              
{/* React - Official Symbol */}
            <TechIcon label="React" color="#61DAFB" hoverColor="#61DAFB">
                <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <title>React</title>
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2.204c3.486 0 6.643 1.516 8.847 3.966-2.585 1.15-5.599 1.83-8.847 1.83-3.249 0-6.262-.68-8.847-1.83 2.204-2.45 5.361-3.966 8.847-3.966zm-7.616 1.34c2.204 1.15 4.975 1.83 7.616 1.83 2.641 0 5.412-.68 7.616-1.83 1.484 2.16 2.384 4.79 2.384 7.656 0 2.866-.9 5.496-2.384 7.656-2.204-1.15-4.975-1.83-7.616-1.83-2.641 0-5.412.68-7.616 1.83-1.484-2.16-2.384-4.79-2.384-7.656 0-2.866.9-5.496 2.384-7.656zm7.616 9.856c-2.376 0-4.576-.56-6.576-1.56 1.584-3.56 4.384-6.36 7.944-7.944.9.48 1.864.84 2.864 1.08-1.056 3.12-2.376 5.88-4.232 8.424zm0-1.8c1.392-1.992 2.448-4.224 3.168-6.624 1.992 1.392 4.224 2.448 6.624 3.168-1.392 1.992-2.448 4.224-3.168 6.624-1.992-1.392-4.224-2.448-6.624-3.168zm0-13.824c-1.632 0-3.168.288-4.632.792 1.8-2.616 4.44-4.512 7.512-5.256-.792 1.464-1.872 2.952-2.88 4.464z"/>
                    <circle cx="12" cy="12" r="2" />
                </svg>
            </TechIcon>

            {/* TypeScript - Official Logo */}
            <TechIcon label="TypeScript" color="#3178C6" hoverColor="#3178C6">
                <svg role="img" viewBox="0 0 24 24" className="w-9 h-9 fill-current rounded" xmlns="http://www.w3.org/2000/svg">
                    <title>TypeScript</title>
                    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.085-.246.057-.428.145-.562.261-.134.117-.2.255-.2.413 0 .145.056.269.167.371.114.102.327.202.643.3.318.096.696.196 1.134.3.438.104.895.228 1.366.37.47.142.864.33 1.176.564.312.235.539.522.68.86.142.338.213.755.213 1.25 0 .597-.112 1.135-.334 1.613-.222.478-.553.882-.99 1.213-.437.331-.967.581-1.589.75a7.863 7.863 0 0 1-2.115.254c-.604 0-1.222-.054-1.85-.162a9.125 9.125 0 0 1-1.636-.425v-2.647c.278.139.638.293 1.083.461.445.167.923.25 1.434.25.32 0 .584-.035.791-.104.207-.07.361-.161.462-.273.102-.112.153-.25.153-.413 0-.156-.056-.289-.167-.399-.111-.11-.322-.22-.629-.331-.307-.11-.689-.222-1.144-.336a10.233 10.233 0 0 1-1.411-.422 3.224 3.224 0 0 1-1.127-.68 2.651 2.651 0 0 1-.722-1.076c-.149-.447-.223-.996-.223-1.644 0-.578.117-1.088.351-1.531.234-.442.584-.805 1.049-1.09.464-.285 1.05-.49 1.756-.615.706-.125 1.547-.188 2.525-.188zm-7.564 3.284v7.794H8.816v-7.794H5.986V9.99h8.487v2.923h-3.549z"/>
                </svg>
            </TechIcon>

            {/* Tailwind - Official Wave */}
            <TechIcon label="Tailwind" color="#38BDF8" hoverColor="#38BDF8">
                <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <title>Tailwind CSS</title>
                    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                </svg>
            </TechIcon>

            {/* Next.js - Official "N" Icon */}
            <TechIcon label="Next.js" color="#262626" hoverColor="#000000">
                <svg role="img" viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <title>Next.js</title>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM9.5 6h2.096l6.904 11.233A9.957 9.957 0 0 1 12 22C6.477 22 2 17.523 2 12s4.477-10 10-10c2.275 0 4.375.76 6.096 2.036L9.5 17.5V6zm8 11V6h2v11h-2z"/>
                </svg>
            </TechIcon>

           </div>
        </motion.div>
      </div>
    </section>
  );
};
