
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICE_PACKAGES } from '../constants';
import { SectionTitle } from './SectionTitle';
import { Check, AlertTriangle, ArrowRight, ShieldCheck, PlusCircle, FileEdit } from 'lucide-react';
import { Button } from './Button';
import { ServicePackage } from '../types';

interface ServicesProps {
  onSelectService?: (service: ServicePackage) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  
  const handleServiceClick = (pkg: ServicePackage) => {
    if (onSelectService) {
      onSelectService(pkg);
    }
  };

  return (
    <section id="services" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionTitle 
          title="Pacotes de Serviços" 
          subtitle="Soluções frontend especializadas. Sem backend, sem complexidade, apenas performance e design."
        />

        {/* Disclaimer Banner */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-16 p-5 bg-white border border-yellow-200 rounded-xl flex flex-col md:flex-row items-center md:items-start gap-4 text-sm text-gray-600 shadow-sm"
        >
            <div className="p-3 bg-yellow-50 rounded-full shrink-0 text-yellow-600">
                <AlertTriangle size={20} />
            </div>
            <div className="text-center md:text-left">
                <h4 className="font-bold text-gray-900 mb-1">Atenção ao Escopo (Frontend Only)</h4>
                <p>
                    Meu trabalho é focado na <strong>Interface Visual e Código do Site</strong>. 
                    Não desenvolvo sistemas com login, bancos de dados ou painéis administrativos (CMS). 
                    Para edição de textos, entrego um <strong>arquivo de configuração simples</strong> onde você mesmo pode alterar o conteúdo.
                </p>
            </div>
        </motion.div>

        {/* Updated Grid for 3 items (Centred on LG) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {SERVICE_PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col h-full rounded-3xl transition-all duration-300
                ${pkg.highlight 
                  ? 'bg-gray-900 text-white shadow-2xl shadow-gray-900/20 ring-1 ring-gray-900 transform lg:scale-105 z-10' 
                  : 'bg-white text-gray-900 border border-gray-100 hover:border-primary-200 hover:shadow-xl'
                }`}
            >
              {pkg.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wider uppercase flex items-center gap-2">
                      <ShieldCheck size={14} /> Recomendado
                  </div>
              )}

              <div className="p-8 flex-grow">
                {/* Icon & Title */}
                <div className="mb-6 flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-xl shadow-sm transition-transform group-hover:scale-110 duration-300 ${
                        pkg.highlight ? 'bg-gray-800 text-primary-400' : 'bg-primary-50 text-primary-600'
                    }`}>
                        <pkg.icon size={28} />
                    </div>
                    {pkg.features.some(f => f.includes('Edição Fácil')) && (
                       <div className="flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                         <FileEdit size={10} /> Editável
                       </div>
                    )}
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-2">{pkg.title}</h3>
                <p className={`text-sm font-medium ${pkg.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
                  {pkg.subtitle}
                </p>

                {/* Price */}
                <div className="mt-8 mb-8 pb-8 border-b border-gray-200/10">
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold tracking-tight">{pkg.price}</span>
                    </div>
                    <p className={`text-sm mt-4 leading-relaxed ${pkg.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                        {pkg.purpose}
                    </p>
                </div>

                {/* Features Preview */}
                <div className="space-y-4 mb-8">
                     {pkg.features.slice(0, 5).map((feature, i) => (
                       <div key={i} className="flex items-start gap-3 text-sm">
                         <div className={`mt-0.5 p-0.5 rounded-full shrink-0 ${pkg.highlight ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-600'}`}>
                             <Check size={12} strokeWidth={3} />
                         </div>
                         <span className={pkg.highlight ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                       </div>
                     ))}
                </div>
              </div>
              
              {/* Footer Button */}
              <div className="p-8 pt-0 mt-auto">
                  <Button 
                    className="w-full" 
                    variant={pkg.highlight ? 'primary' : 'outline'}
                    rightIcon={<PlusCircle size={16} />}
                    onClick={() => handleServiceClick(pkg)}
                  >
                      Ver Detalhes Completos
                  </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
