
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
                    setIsDeleting(false);
                    setSnippetIndex(prev => (prev + 1) % META_SNIPPETS.length);
                    setCharCount(0);
                }
            }
        };

        timeout = setTimeout(type, 50);

        return () => clearTimeout(timeout);
    }, [charCount, isDeleting, isPaused, snippetIndex, currentSnippet]);

    // Optimize Rendering: Slice the tokens based on charCount
    // This avoids complex state logic inside the timer loop
    useMemo(() => {
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
              
              {/* React - Official #61DAFB */}
              <TechIcon label="React" color="#61DAFB" hoverColor="#61DAFB">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.36c-1.68 0-3.32-.42-4.76-1.12-1.39-.68-2.67-1.74-3.64-3.03-.96-1.28-1.55-2.82-1.55-4.49 0-1.67.59-3.21 1.55-4.49.97-1.29 2.25-2.35 3.64-3.03 1.44-.7 3.08-1.12 4.76-1.12 1.68 0 3.32.42 4.76 1.12 1.39.68 2.67 1.74 3.64 3.03.96 1.28 1.55 2.82 1.55 4.49 0 1.67-.59 3.21-1.55 4.49-.97 1.29-2.25 2.35-3.64 3.03-1.44.7-3.08 1.12-4.76 1.12zM12 4.86c-1.35 0-2.67.33-3.82.88-1.11.53-2.12 1.37-2.89 2.38-.76 1.01-1.23 2.22-1.23 3.59 0 1.36.46 2.58 1.23 3.59.77 1.01 1.78 1.85 2.89 2.38 1.15.55 2.47.88 3.82.88s2.67-.33 3.82-.88c1.11-.53 2.12-1.37 2.89-2.38.76-1.01 1.23-2.22 1.23-3.59 0-1.36-.46-2.58-1.23-3.59-.77-1.01-1.78-1.85-2.89-2.38-1.15-.55-2.47-.88-3.82-.88z"/><circle cx="12" cy="12" r="2.05"/></svg>
              </TechIcon>

              {/* TypeScript - Official #3178C6 */}
              <TechIcon label="TypeScript" color="#3178C6" hoverColor="#3178C6">
                  <svg viewBox="0 0 24 24" className="w-9 h-9 fill-current rounded" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 0h19.5c1.24 0 2.25 1.01 2.25 2.25v19.5c0 1.24-1.01 2.25-2.25 2.25H2.25C1.01 24 0 22.99 0 21.75V2.25C0 1.01 1.01 0 2.25 0zm10.12 11.62L11 16.85h1.9c.7.01 1.26-.25 1.69-.76.43-.52.65-1.18.65-1.99 0-.85-.21-1.53-.63-2.05-.42-.51-1.01-.77-1.78-.77h-2.47v6.62H15.6v-1.63h-2.8v-1.6h2.64v-1.6h-2.64v-1.45h2.8V9.99h-3.23v1.63zm-4.7 5.23h1.64v-6.86h2.15v-1.63h-5.94v1.63h2.15v6.86z"/></svg>
              </TechIcon>

              {/* Tailwind - Official #38BDF8 */}
              <TechIcon label="Tailwind" color="#38BDF8" hoverColor="#38BDF8">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>
              </TechIcon>

              {/* Next.js - Official Black (or dark gray for visibility) */}
              <TechIcon label="Next.js" color="#262626" hoverColor="#000000">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10 0 2.275-.76 4.375-2.036 6.096L9.5 6.005h2.096l6.904 11.233A9.957 9.957 0 0112 22C6.477 22 2 17.523 2 12S6.477 2 12 2zM7.5 17.5v-11h-2v11h2z"/></svg>
              </TechIcon>

           </div>
        </motion.div>
      </div>
    </section>
  );
};
