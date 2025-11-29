
import React from 'react';
import { SKILLS } from '../constants';
import { SectionTitle } from './SectionTitle';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';
import { ViewType } from '../types';

interface AboutProps {
  onNavigate: (view: ViewType) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="lg:w-1/2">
            <SectionTitle 
              title="Sobre Mim" 
              alignment="left"
            />
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-gray-600 text-lg leading-relaxed"
            >
              <p>
                Olá! Sou o PH, um desenvolvedor apaixonado por construir interfaces digitais que não são apenas bonitas, mas funcionais e acessíveis. Com mais de 5 anos de experiência, foco em entregar código limpo e soluções escaláveis.
              </p>
              <p>
                Minha especialidade é o ecossistema <strong>React & TypeScript</strong>. Acredito que a tecnologia deve servir ao propósito do negócio, por isso cada linha de código que escrevo é pensada na performance final e na experiência do usuário.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-1">Código Limpo</h4>
                  <p className="text-sm">Manutenibilidade e padrões da indústria.</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-1">Alta Performance</h4>
                  <p className="text-sm">Core Web Vitals otimizados.</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-1">Suporte Garantido</h4>
                  <p className="text-sm">30 dias de acompanhamento pós-entrega.</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors">
                  <h4 className="font-bold text-gray-900 mb-1">Mobile First</h4>
                  <p className="text-sm">Perfeito em qualquer tamanho de tela.</p>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                    onClick={() => onNavigate('services')}
                    rightIcon={<ArrowRight size={18} />}
                    className="shadow-lg shadow-primary-600/10"
                >
                    Ver Soluções e Pacotes
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <div className="lg:w-1/2 w-full">
            <h3 className="font-display font-bold text-2xl mb-8 text-center lg:text-left">Tech Stack</h3>
            <div className="grid grid-cols-3 gap-6">
              {SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 transition-shadow hover:shadow-lg"
                >
                  <skill.icon size={40} className={skill.color} strokeWidth={1.5} />
                  <span className="font-medium text-gray-700">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
