
import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { 
  CheckCircle2, 
  Search, 
  LayoutTemplate, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  Handshake, 
  CreditCard, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { Button } from './Button';

interface ProcessProps {
  onOpenChat: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onOpenChat }) => {
  
  const steps = [
    {
      id: 1,
      title: 'Briefing & Descoberta',
      subtitle: 'Onde tudo começa',
      description: 'Uma conversa focada para entender seu negócio, suas referências visuais e o objetivo do site. Aqui definimos o escopo exato para evitar surpresas.',
      icon: Search,
      color: 'bg-blue-100 text-blue-600',
      details: ['Reunião de alinhamento', 'Análise de concorrentes', 'Definição de objetivos']
    },
    {
      id: 2,
      title: 'Proposta & Sinal',
      subtitle: 'Compromisso Mútuo',
      description: 'Apresento o orçamento detalhado e o cronograma. Para garantir a reserva da sua data na minha agenda e iniciar o projeto, trabalhamos com um sinal de 50%.',
      icon: Handshake,
      color: 'bg-green-100 text-green-600',
      details: ['Contrato de prestação', 'Pagamento da entrada (50%)', 'Reserva de agenda garantida'],
      highlight: true
    },
    {
      id: 3,
      title: 'Design & Estrutura',
      subtitle: 'A mágica visual',
      description: 'Crio a estrutura visual (wireframes/layout) baseada na sua identidade. Você aprova a "cara" do site antes de eu escrever qualquer linha de código.',
      icon: LayoutTemplate,
      color: 'bg-purple-100 text-purple-600',
      details: ['Definição de cores/tipos', 'Layout das páginas', 'Aprovação visual']
    },
    {
      id: 4,
      title: 'Codificação (Dev)',
      subtitle: 'Mão na massa',
      description: 'Transformo o design aprovado em código React de alta performance. Aqui o site ganha vida, animações e responsividade para celulares.',
      icon: Code2,
      color: 'bg-indigo-100 text-indigo-600',
      details: ['Desenvolvimento React', 'Otimização Mobile', 'Configuração de SEO']
    },
    {
      id: 5,
      title: 'Entrega & Publicação',
      subtitle: 'O Grande Dia',
      description: 'Após sua aprovação final e o pagamento do restante (50%), coloco seu site no ar, configuro o domínio e te ensino a alterar os textos.',
      icon: Rocket,
      color: 'bg-rose-100 text-rose-600',
      details: ['Pagamento final (50%)', 'Configuração de Domínio', 'Entrega dos arquivos']
    }
  ];

  return (
    <section id="process" className="py-24 bg-gray-50 relative overflow-hidden font-sans">
       {/* Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
       </div>
       
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionTitle 
          title="Metodologia PH.Dev" 
          subtitle="Um processo linear, transparente e seguro. Do primeiro 'oi' até o site no ar, você sabe exatamente o que está acontecendo."
        />

        {/* Introduction Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {[
                {
                    icon: ShieldCheck,
                    title: "Segurança Total",
                    desc: "Trabalho com etapas de aprovação. Nada avança sem o seu 'ok'.",
                    color: "text-green-600 bg-green-50"
                },
                {
                    icon: CreditCard,
                    title: "Transparência Financeira",
                    desc: "Sem custos ocultos. O valor combinado é o valor final.",
                    color: "text-blue-600 bg-blue-50"
                },
                {
                    icon: Lock,
                    title: "Código de Propriedade",
                    desc: "Ao final, o código é 100% seu. Sem mensalidades eternas.",
                    color: "text-primary-600 bg-primary-50"
                }
            ].map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                    <div className={`p-4 rounded-full mb-4 ${item.color}`}>
                        <item.icon size={28} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
            ))}
        </div>

        {/* Main Process Steps Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Text Side */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                      <div className={`bg-white p-8 rounded-2xl shadow-sm border transition-all duration-300 relative group overflow-hidden ${step.highlight ? 'border-primary-200 shadow-xl shadow-primary-900/5 ring-1 ring-primary-100' : 'border-gray-100 hover:border-gray-300'}`}>
                          
                          {/* Highlight Badge */}
                          {step.highlight && (
                              <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider z-10">
                                  Etapa Financeira
                              </div>
                          )}

                          <div className="flex items-center gap-4 mb-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${step.color}`}>
                                  <step.icon size={24} />
                              </div>
                              <div>
                                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Passo 0{step.id}</span>
                                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                              </div>
                          </div>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                              {step.description}
                          </p>

                          <ul className="space-y-2">
                              {step.details.map((detail, i) => (
                                  <li key={i} className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                      <CheckCircle2 size={14} className="text-primary-500" />
                                      {detail}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  </div>

                  {/* Center Marker */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div className={`w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center text-sm font-bold ${step.highlight ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {step.id}
                      </div>
                  </div>

                  {/* Empty Side */}
                  <div className="w-full md:w-1/2 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Payment Policy Section */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 max-w-4xl mx-auto"
        >
            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
                {/* Decorative BG */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4 text-primary-400">
                             <CreditCard size={24} />
                             <span className="font-bold text-sm tracking-wider uppercase">Política de Pagamento</span>
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-4">Investimento & Segurança</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Para garantir a seriedade do projeto e a reserva exclusiva da minha agenda, trabalhamos com um modelo seguro para ambas as partes.
                        </p>
                        <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
                            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Contrato Formal</span>
                            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Nota Fiscal</span>
                        </div>
                    </div>

                    <div className="flex-1 w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                             <span className="text-gray-300 text-sm">Entrada (Sinal)</span>
                             <span className="text-xl font-bold text-white">50%</span>
                        </div>
                        <div className="flex items-center justify-between mb-8">
                             <span className="text-gray-300 text-sm">Na Entrega Final</span>
                             <span className="text-xl font-bold text-white">50%</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-4 italic">
                            * O projeto só inicia após a confirmação do sinal. Isso garante o comprometimento mútuo e a alocação de horas de desenvolvimento.
                        </p>
                         <Button 
                            variant="primary" 
                            className="w-full !bg-white !text-gray-900 hover:!bg-gray-100 border-none"
                            onClick={onOpenChat}
                            rightIcon={<ArrowRight size={18} />}
                        >
                             Solicitar Proposta
                         </Button>
                    </div>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
};
