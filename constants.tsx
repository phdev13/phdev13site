
import { 
  Code2, 
  Globe, 
  Rocket, 
  Zap,
  CheckCircle2,
  Palette,
  Terminal,
  Server,
  Briefcase,
  Search,
  LayoutTemplate,
  FileCode,
  Settings,
  FileEdit
} from 'lucide-react';
import { NavItem, ProcessStep, ServicePackage, Skill } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'Sobre', id: 'about' },
  { label: 'Serviços', id: 'services' },
  { label: 'Portfólio', id: 'portfolio' },
  { label: 'Processo', id: 'process' },
  { label: 'Contato', id: 'contact' },
];

export const SKILLS: Skill[] = [
  { name: 'HTML5/CSS3', icon: Code2, color: 'text-orange-500' },
  { name: 'React.js', icon: Zap, color: 'text-blue-500' },
  { name: 'Tailwind CSS', icon: Palette, color: 'text-cyan-500' },
  { name: 'JavaScript', icon: Terminal, color: 'text-yellow-500' },
  { name: 'Responsividade', icon: Globe, color: 'text-green-600' },
  { name: 'Git/GitHub', icon: Server, color: 'text-black' },
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'essential',
    title: 'Landing Page Express',
    subtitle: 'Página Única de Vendas',
    purpose: 'Ideal para lançar seu produto ou serviço rapidamente na internet.',
    recommendedFor: 'Autônomos, Pequenos Negócios, Promoções.',
    details: 'Uma página focada em conversão, leve e direta ao ponto.',
    price: 'A partir de R$ 900',
    techStack: ['React', 'TailwindCSS', 'Vite'],
    features: [
      'Site de Página Única (One Page)',
      'Totalmente Adaptado para Celular',
      'Arquivo de Edição Fácil (Textos)',
      'Botões de WhatsApp/Contato',
      'Hospedagem Gratuita'
    ],
    icon: Rocket,
    highlight: false,
    fullDescription: "A Landing Page Express é a solução perfeita para quem está começando e precisa de presença digital \"para ontem\". Eu crio uma página limpa, bonita e organizada, onde seu cliente entende o que você vende e clica no botão de comprar ou chamar no WhatsApp. Sem enrolação técnica, foco no resultado.",
    deliverables: [
      "Desenvolvimento em React (Tecnologia moderna)",
      "Até 4 seções (Ex: Capa, Sobre, Serviços, Contato)",
      "Arquivo de Configuração para editar textos facilmente",
      "Configuração do seu Domínio (.com.br)",
      "Links testados para suas redes sociais"
    ],
    notIncluded: [
      "Painel Administrativo (Wordpress/CMS)",
      "Criação de Logo ou Identidade Visual",
      "Banco de Dados ou Login de Usuário"
    ],
    timeline: "3 a 7 dias úteis.",
    faqs: [
      {
        question: "Como edito os textos sem painel?",
        answer: "Eu entrego um arquivo de configuração simples. Você altera o texto lá e o site atualiza. Não precisa saber programar, é só mudar as frases entre aspas!"
      },
      {
        question: "Preciso pagar mensalidade?",
        answer: "Pela minha parte, não! O código é seu. Você terá custos apenas anuais do domínio (aprox. R$ 40/ano)."
      },
      {
        question: "Funciona no celular?",
        answer: "Sim! Desenvolvo pensando primeiro no celular (Mobile First), garantindo que fique perfeito em qualquer tela."
      }
    ]
  },
  {
    id: 'business',
    title: 'Site Profissional',
    subtitle: 'Presença Digital Completa',
    purpose: 'Para empresas que precisam passar mais credibilidade e informações.',
    recommendedFor: 'Consultórios, Escritórios, Agências, Prestadores de Serviço.',
    details: 'Site com múltiplas páginas (Home, Sobre, Serviços, Contato).',
    price: 'A partir de R$ 1.800',
    techStack: ['React', 'Next.js', 'Tailwind', 'Forms'],
    features: [
      'Até 5 Páginas Internas',
      'Arquivo de Edição Fácil (Textos)',
      'Formulário de Contato Funcional',
      'Mapa de Localização',
      'Boas práticas de SEO'
    ],
    icon: Briefcase,
    highlight: true,
    fullDescription: "O Site Profissional é o cartão de visitas digital da sua empresa. Diferente da Landing Page, aqui temos espaço para contar sua história, detalhar cada serviço em páginas separadas e criar uma estrutura mais robusta. Ideal para quem quer passar autoridade e ser encontrado no Google.",
    deliverables: [
      "Estrutura Multi-páginas (Rotas)",
      "Páginas: Início, Sobre, Serviços, Galeria, Contato",
      "Arquivo centralizado para edição de textos e preços",
      "Formulário que envia para seu e-mail",
      "Botão flutuante do WhatsApp",
      "Deploy e Configuração de SSL (Cadeado de segurança)"
    ],
    notIncluded: [
      "Painel Administrativo (Wordpress/CMS)",
      "Sistema de Login ou Área do Cliente",
      "E-commerce (Carrinho de compras)"
    ],
    timeline: "10 a 15 dias úteis.",
    faqs: [
      {
        question: "O site aparece no Google?",
        answer: "Construo o site seguindo as boas práticas (semântica HTML) para que o Google consiga ler e indexar seu site corretamente."
      },
      {
        question: "Consigo alterar fotos e textos?",
        answer: "Sim, através do arquivo de configuração que deixo preparado. Para trocas de imagens, basta substituir o arquivo na pasta correta."
      }
    ]
  },
  {
    id: 'custom',
    title: 'Sob Medida',
    subtitle: 'Projetos Específicos',
    purpose: 'Para demandas que fogem do padrão ou ajustes pontuais.',
    recommendedFor: 'Refatoração, Novas Seções, Ideias Específicas.',
    details: 'Orçamento flexível baseado na complexidade.',
    price: 'A Combinar',
    techStack: ['React', 'JS/TS', 'Tailwind'],
    features: [
      'Desenvolvimento de Interface (Front)',
      'Componentes Customizados',
      'Ajustes em Sites React Existentes',
      'Atualização de Conteúdo',
      'Consultoria Técnica de Front'
    ],
    icon: Settings,
    highlight: false,
    fullDescription: "Se o seu projeto não se encaixa nos pacotes anteriores, o 'Sob Medida' é para você. Aqui analisamos sua necessidade específica. Pode ser uma página com um design muito diferenciado, uma manutenção em um site React que você já tem, ou apenas a criação do Frontend para um sistema que outra pessoa fará o Backend.",
    deliverables: [
      "Definidos caso a caso",
      "Código limpo e documentado",
      "Entrega via Repositório (GitHub) ou Arquivos Zip"
    ],
    notIncluded: [
      "Backend (Banco de dados, Login, Painel Admin)",
      "Integrações complexas de API (foco apenas no visual)"
    ],
    timeline: "Definido conforme a demanda.",
    faqs: [
      {
        question: "Você faz sistemas com login?",
        answer: "Não. Meu foco é exclusivamente o Frontend (a parte visual e interativa). Não configuro servidores ou banco de dados."
      },
      {
        question: "Como funciona o orçamento?",
        answer: "Conversamos sobre o que você precisa, eu estimo as horas de trabalho e te passo um valor fechado."
      }
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Briefing & Conversa',
    description: 'Vou entender o que você precisa e quais são seus gostos.',
    checklist: [
      'Reunião rápida ou conversa por chat',
      'Envio de referências (sites que você gosta)',
      'Definição do conteúdo (textos/fotos)',
      'Acordo de prazos e valores'
    ],
    icon: Search
  },
  {
    id: 2,
    title: 'Estrutura Visual',
    description: 'Definimos a "cara" do site antes de codificar.',
    checklist: [
      'Criação baseada nas suas referências',
      'Definição de cores e tipografia',
      'Aprovação do layout básico',
      'Organização do conteúdo'
    ],
    icon: LayoutTemplate
  },
  {
    id: 3,
    title: 'Codificação',
    description: 'Mão na massa! Transformo o visual em site real.',
    checklist: [
      'Criação das páginas em React',
      'Adaptação para celular (Responsivo)',
      'Configuração do arquivo de edição de textos',
      'Otimização para carregar rápido'
    ],
    icon: Code2
  },
  {
    id: 4,
    title: 'Entrega & Publicação',
    description: 'Seu site no ar, pronto para receber visitas.',
    checklist: [
      'Testes finais em celular e computador',
      'Configuração do seu domínio (.com.br)',
      'Entrega dos arquivos do projeto',
      'Tutorial de como editar os textos'
    ],
    icon: Rocket
  }
];

export const WHATSAPP_NUMBER = "5511999999999"; 
export const EMAIL_CONTACT = "contato@phdev.com";
