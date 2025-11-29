import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- CONTROLE GERAL ---
// TRUE: Auroras fortes e visíveis (Modo Construção)
// FALSE: Auroras sutis e elegantes (Modo Site Final)
const IS_DEV_MODE = true; 

// Hook para pegar dimensões da tela
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}

export const InteractiveBackground: React.FC = () => {
  const { width, height } = useWindowDimensions();

  // Valores brutos do mouse
  const mouseX = useMotionValue(width / 2);
  const mouseY = useMotionValue(height / 2);

  // --- FÍSICA DAS AURORAS (O Segredo da "Deformação") ---
  
  // Mola 1 (Para a Aurora Roxa - Mais lenta e pesada)
  const spring1 = useSpring(mouseX, { damping: 40, stiffness: 60, mass: 2 });
  const springY1 = useSpring(mouseY, { damping: 40, stiffness: 60, mass: 2 });

  // Mola 2 (Para a Aurora Azul - Mais rápida e elástica)
  const spring2 = useSpring(mouseX, { damping: 25, stiffness: 120, mass: 0.5 });
  const springY2 = useSpring(mouseY, { damping: 25, stiffness: 120, mass: 0.5 });

  // --- TRANSFORMAÇÕES DE DEFORMAÇÃO ---
  // Mapeamos o movimento do mouse para esticar (scale) e mover as auroras

  // Aurora 1: Move-se pouco (-100px a 100px) mas deforma bastante
  const x1 = useTransform(spring1, [0, width], [-100, 100]);
  const y1 = useTransform(springY1, [0, height], [-100, 100]);
  // Deformação: Se o mouse vai pra direita, ela estica horizontalmente
  const scaleX1 = useTransform(spring1, [0, width], [1.2, 0.8]); 
  const skew1 = useTransform(spring1, [0, width], [10, -10]); // Inclina levemente

  // Aurora 2: Move-se OPOSTO ao mouse (efeito paralaxe) e estica verticalmente
  const x2 = useTransform(spring2, [0, width], [150, -150]); // Invertido
  const y2 = useTransform(springY2, [0, height], [100, -100]); // Invertido
  const scaleY2 = useTransform(springY2, [0, height], [0.8, 1.3]); // Estica na vertical

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Configuração visual baseada no modo DEV
  const blobOpacity = IS_DEV_MODE ? 0.85 : 0.35; // Muito visível no DEV
  const blobBlur = IS_DEV_MODE ? 'blur-[60px]' : 'blur-[100px]'; // Menos blur no dev para ver a forma
  // No modo DEV, usamos mix-blend-normal para ver a cor real. Em prod, multiply para fundir.
  const blendMode = IS_DEV_MODE ? 'mix-blend-normal' : 'mix-blend-multiply'; 

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-white select-none pointer-events-none">
      
      {/* 1. Grid Pattern (Fixo) */}
      <div 
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* --- AURORAS QUE SE DEFORMAM --- */}
      
      {/* Aurora 1 (Roxa Principal) */}
      <motion.div 
        style={{ 
            x: x1, 
            y: y1, 
            scaleX: scaleX1, // Aqui acontece a deformação elástica
            skewX: skew1 
        }}
        animate={{ 
            // Mantemos uma animação de "respiração" sutil além do mouse
            rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`absolute top-[10%] left-[20%] w-[600px] h-[500px] rounded-[40%] bg-purple-600 ${blobBlur} ${blendMode}`}
        initial={{ opacity: blobOpacity }}
      />
      
      {/* Aurora 2 (Azul Secundária - Resposta rápida e estica na vertical) */}
      <motion.div 
        style={{ 
            x: x2, 
            y: y2, 
            scaleY: scaleY2 
        }}
        animate={{ 
            rotate: [0, -20, 20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[30%] right-[10%] w-[500px] h-[600px] rounded-[100%] bg-blue-500 ${blobBlur} ${blendMode}`}
        initial={{ opacity: blobOpacity }}
      />

      {/* Aurora 3 (Rosa de fundo - Segue levemente para preencher) */}
      <motion.div 
         style={{ x: x1, y: y2 }} // Mistura o movimento das duas
         className={`absolute bottom-[-10%] left-[30%] w-[800px] h-[400px] rounded-full bg-pink-500 ${blobBlur} ${blendMode}`}
         initial={{ opacity: blobOpacity * 0.8 }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.5)_70%,#fff_100%)] z-10" />
    </div>
  );
};
