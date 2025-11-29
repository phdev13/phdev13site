import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Calendar, DollarSign, Briefcase } from 'lucide-react';
import { Button } from './Button';
import { SectionTitle } from './SectionTitle';
import { EMAIL_CONTACT, WHATSAPP_NUMBER } from '../constants';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({ 
      name: '', 
      email: '', 
      projectType: 'Site Institucional', 
      budget: 'Não tenho certeza', 
      message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Construct WhatsApp message with rich details
    const text = `*SOLICITAÇÃO VIA FORMULÁRIO*\n\n` +
                 `👤 *Nome:* ${formData.name}\n` +
                 `📧 *Email:* ${formData.email}\n` +
                 `🏗️ *Tipo:* ${formData.projectType}\n` +
                 `💰 *Investimento:* ${formData.budget}\n\n` +
                 `📝 *Mensagem:* ${formData.message}`;
                 
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_self');
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', projectType: 'Site Institucional', budget: 'Não tenho certeza', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/20 to-transparent pointer-events-none" />
      
      {/* Abstract circles */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionTitle 
          title="Vamos Conversar?" 
          subtitle="Seu projeto merece ser tratado com profissionalismo. Preencha o formulário para uma análise inicial sem compromisso."
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto mt-12">
          
          {/* Contact Info (Left - 2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-gray-600 transition-colors">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary-500 rounded-full"></span>
                  Canais Diretos
              </h3>
              
              <div className="space-y-6">
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                  target="_self"
                  className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-gray-700/50 p-3 rounded-xl transition-all group"
                >
                  <div className="p-3 bg-gray-700 rounded-xl group-hover:bg-green-600 transition-colors shadow-lg">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">WhatsApp (Recomendado)</p>
                    <p className="font-medium text-lg">+55 11 99999-9999</p>
                  </div>
                </a>
                
                <a 
                  href={`mailto:${EMAIL_CONTACT}`} 
                  target="_self"
                  className="flex items-center gap-4 text-gray-300 hover:text-white hover:bg-gray-700/50 p-3 rounded-xl transition-all group"
                >
                  <div className="p-3 bg-gray-700 rounded-xl group-hover:bg-primary-600 transition-colors shadow-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email</p>
                    <p className="font-medium text-lg">{EMAIL_CONTACT}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-primary-900 to-primary-800 border border-primary-700/50">
                <h4 className="font-bold text-white mb-2 text-lg">Por que trabalhar comigo?</h4>
                <ul className="space-y-3 text-sm text-primary-100/80">
                    <li className="flex gap-2"><span className="text-primary-400 font-bold">✓</span> Especialista em Frontend Moderno</li>
                    <li className="flex gap-2"><span className="text-primary-400 font-bold">✓</span> Foco em Performance (Google Vitals)</li>
                    <li className="flex gap-2"><span className="text-primary-400 font-bold">✓</span> Código Limpo e Escalável</li>
                    <li className="flex gap-2"><span className="text-primary-400 font-bold">✓</span> Entrega Pontual</li>
                </ul>
            </div>
          </div>

          {/* Form (Right - 3 Cols) */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl p-8 md:p-10 text-gray-900 shadow-2xl shadow-black/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Seu Nome</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all bg-gray-50 font-medium"
                    placeholder="Nome completo"
                    />
                </div>

                {/* Email */}
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Seu Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all bg-gray-50 font-medium"
                    placeholder="empresa@email.com"
                    />
                </div>

                {/* Project Type */}
                <div className="col-span-2 md:col-span-1 relative">
                    <label htmlFor="projectType" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <Briefcase size={14} className="text-primary-500"/> Tipo de Projeto
                    </label>
                    <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all bg-gray-50 appearance-none cursor-pointer font-medium"
                    >
                        <option>Landing Page (Alta Conversão)</option>
                        <option>Site Institucional (Empresa)</option>
                        <option>E-commerce (Frontend)</option>
                        <option>Dashboard / App Web</option>
                        <option>Outro / Sob Medida</option>
                    </select>
                </div>

                {/* Budget */}
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="budget" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                         <DollarSign size={14} className="text-green-600"/> Faixa de Orçamento
                    </label>
                    <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all bg-gray-50 appearance-none cursor-pointer font-medium"
                    >
                        <option>Não tenho certeza</option>
                        <option>Até R$ 1.500</option>
                        <option>R$ 2.000 - R$ 4.000</option>
                        <option>R$ 4.000 - R$ 8.000</option>
                        <option>Acima de R$ 8.000</option>
                    </select>
                </div>

                {/* Message */}
                <div className="col-span-2">
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Detalhes do Projeto</label>
                    <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all resize-none bg-gray-50 font-medium"
                    placeholder="Conte um pouco sobre o que você precisa..."
                    />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-4 text-lg shadow-xl shadow-primary-600/20" 
                size="lg" 
                isLoading={isSubmitting}
                rightIcon={<Send size={20} />}
              >
                Solicitar Orçamento
              </Button>
              <p className="text-center text-xs text-gray-400 mt-4">
                  Seus dados estão protegidos. Respondo geralmente em algumas horas.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};