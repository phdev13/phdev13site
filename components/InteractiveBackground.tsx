import React, { useEffect, useRef, useState } from 'react';
// Adicionamos useMotionValue, useSpring e useTransform
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- Hook utilitário para pegar dimensões da tela (pode mover para outro arquivo) ---
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
// ------------------------------------------------------------------------------------


// O componente ParticleNetwork permanece EXATAMENTE o mesmo do exemplo anterior.
// Vou omiti-lo aqui para economizar espaço, mas certifique-se de mantê-lo no seu código.
const ParticleNetwork = () => {
    // ... (Copie o código do ParticleNetwork da resposta anterior aqui) ...
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      let w = canvas.width = window.innerWidth;
      let h = canvas.height = window.innerHeight;
      
      // Configurações
      const particleCount = Math.min(Math.floor((w * h) / 10000), 100);
      const connectionDistance = 160;
      const mouseDistance = 250;
      
      let particles: any[] = [];
      let mouse = { x: -1000, y: -1000 };
  
      class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        alpha: number;
  
        constructor() {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.vx = (Math.random() - 0.5) * 0.3;
          this.vy = (Math.random() - 0.5) * 0.3;
          this.size = Math.random() * 2.5 + 1.5; 
          this.alpha = 1;
        }
  
        update() {
          this.alpha = 1;
  
          this.x += this.vx;
          this.y += this.vy;
  
          if (this.x < 0 || this.x > w) this.vx *= -1;
          if (this.y < 0 || this.y > h) this.vy *= -1;
  
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < mouseDistance) {
              const forceDirectionX = dx / distance;
              const forceDirectionY = dy / distance;
              const force = (mouseDistance - distance) / mouseDistance;
              
              const directionX = forceDirectionX * force * 3;
              const directionY = forceDirectionY * force * 3;
  
              this.x -= directionX;
              this.y -= directionY;
          }
        }
  
        draw() {
          if (!ctx) return;
          ctx.save();
          ctx.globalAlpha = this.alpha * 0.5; 
          ctx.fillStyle = 'rgba(124, 58, 237, 1)';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
  
      const init = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      };
  
      const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, w, h);
        
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
  
          for (let j = i; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);
  
              if (distance < connectionDistance) {
                  ctx.beginPath();
                  const opacity = (1 - (distance / connectionDistance)) * Math.min(particles[i].alpha, particles[j].alpha);
                  
                  if (opacity > 0) {
                      ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.12})`; 
                      ctx.lineWidth = 0.8;
                      ctx.moveTo(particles[i].x, particles[i].y);
                      ctx.lineTo(particles[j].x, particles[j].y);
                      ctx.stroke();
                  }
              }
          }
        }
        requestAnimationFrame(animate);
      };
  
      const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        init();
      };
  
      const handleMouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
      };
  
      const handleMouseLeave = () => {
          mouse.x = -1000;
          mouse.y = -1000;
      };
  
      init();
      animate();
  
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseout', handleMouseLeave);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseout', handleMouseLeave);
      };
    }, []);
  
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};


export const InteractiveBackground: React.FC = () => {
  const { width, height } = useWindowDimensions();

  // 1. Motion Values para posição bruta do mouse
  // Inicializamos no centro da tela
  const mouseX = useMotionValue(width / 2);
  const mouseY = useMotionValue(height / 2);

  // 2. Configuração da "Mola" (Spring) para o Delay Suave
  // stiffness: rigidez (menor = mais lento)
  // damping: fricção (maior = mais arrastado/atrasado)
  const springConfig = { damping: 50, stiffness: 100, mass: 3 }; 
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3. Transformação para Sutileza
  // Mapeia o movimento total do mouse na tela (0 a width)
  // Para um movimento muito pequeno das auroras (-60px a 60px)
  const moveX = useTransform(smoothX, [0, width], [-60, 60]);
  const moveY = useTransform(smoothY, [0, height], [-60, 60]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Atualiza os valores brutos do mouse
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);


  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-white select-none pointer-events-none">
      
      {/* Grid Pattern (Fixo) */}
      <div 
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* WRAPPER DAS AURORAS QUE SEGUE O MOUSE 
        Aplicamos o movimento suave (moveX, moveY) neste container.
      */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ x: moveX, y: moveY }} // O container inteiro se move sutilmente
      >
          {/* Aurora 1 (Roxa) - Mantém sua animação de loop interna */}
          <motion.div 
            animate={{ 
              x: [-50, 50, -50],
              y: [-30, 30, -30],
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary-400/30 blur-[100px] mix-blend-multiply"
          />
          
          {/* Aurora 2 (Azul) */}
          <motion.div 
            animate={{ 
              x: [50, -50, 50],
              y: [20, -20, 20],
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-400/30 blur-[100px] mix-blend-multiply"
          />

          {/* Aurora 3 (Rosa/Roxo inferior) */}
          <motion.div 
            animate={{ 
              x: [-20, 20, -20],
              y: [50, -50, 50],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full bg-purple-400/30 blur-[120px] mix-blend-multiply"
          />
      </motion.div>

      {/* Neural Network Particles (Fixo, já tem sua própria interação) */}
      <div className="absolute inset-0 z-0">
         <ParticleNetwork />
      </div>

      {/* Vignette (Fixo) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.6)_70%,#fff_100%)] z-10" />
    </div>
  );
};
