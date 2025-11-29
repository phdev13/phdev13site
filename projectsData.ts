
import { Project } from './types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'hce-esquadrias',
    title: 'HCE Esquadrias',
    category: 'Indústria / Corporativo',
    description: 'Site institucional robusto para uma das maiores indústrias de esquadrias. Foco em catálogo de obras, SEO técnico e performance de carregamento.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    tags: ['React', 'Tailwind CSS', 'SEO', 'Catálogo'],
    demoUrl: 'https://www.hceesquadrias.com.br',
    liveUrl: 'https://www.hceesquadrias.com.br',
    featured: true
  },
  {
    id: 'fintech-dashboard',
    title: 'Nexus Fintech Dashboard',
    category: 'SaaS / Interface',
    description: 'Interface administrativa para gestão financeira com gráficos em tempo real, dark mode nativo e componentes complexos de dados.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    tags: ['Next.js', 'TypeScript', 'Recharts', 'Radix UI'],
    demoUrl: 'https://stripe.com/br', // Using Stripe as a high-quality visual reference for the preview
    liveUrl: 'https://stripe.com/br', 
    featured: false
  },
  {
    id: 'dev-platform',
    title: 'DevSpace Platform',
    category: 'Plataforma Web',
    description: 'Ambiente de documentação e blog para desenvolvedores. Utiliza MDX para renderização de conteúdo e otimização extrema (Lighthouse 100).',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    tags: ['Astro', 'React', 'Tailwind', 'Performance'],
    demoUrl: 'https://vercel.com/templates', // Using Vercel templates as visual reference
    liveUrl: 'https://vercel.com/templates',
    featured: false
  },
  {
    id: 'task-manager',
    title: 'Flow Task Manager',
    category: 'Aplicação Web (PWA)',
    description: 'App de produtividade focado em fluidez. Drag-and-drop, atualizações otimistas e funcionamento offline (PWA).',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    tags: ['React', 'Zustand', 'PWA', 'Framer Motion'],
    demoUrl: 'https://linear.app', // Using Linear as visual reference
    liveUrl: 'https://linear.app',
    featured: false
  }
];
