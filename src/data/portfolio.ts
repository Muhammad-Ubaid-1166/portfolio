import type { SkillCategoryInfo, PortfolioConfig } from '@/types/portfolio';

export const skillCategories: SkillCategoryInfo[] = [
  {
    id: 'programming',
    label: 'Programming Languages',
    description: 'Core programming languages',
    color: 'from-emerald-500 to-teal-500',
    icon: 'Code2'
  },
  {
    id: 'backend',
    label: 'Backend Development',
    description: 'Server-side technologies',
    color: 'from-blue-600 to-blue-400',
    icon: 'Server'
  },
  {
    id: 'ai-ml',
    label: 'AI Tools & Platforms',
    description: 'AI development tools and platforms',
    color: 'from-cyan-500 to-blue-500',
    icon: 'Brain'
  },
  {
    id: 'databases',
    label: 'Databases',
    description: 'Database technologies',
    color: 'from-amber-500 to-orange-500',
    icon: 'Database'
  }
];

export const portfolioData: PortfolioConfig = {
  personal: {
    name: 'Muhammad Ubaid',
    title: 'AI/Backend Engineer',
    tagline: 'Building intelligent systems that don\'t just work in notebooks — they run in production.',
    status: 'First-year Student',
    field: 'Computer Science',
    specializations: ['Agentic AI', 'FastAPI', 'LangGraph', 'Multi-Agent Systems', 'Backend Engineering'],
    roleGoal: 'Full Stack AI Engineer',
    location: 'Karachi, Pakistan',
    email: 'chubaid224@gmail.com',
    phone: '+92 30112684971',
    bio: `I\'m Muhammad Ubaid, a first-year Computer Science student obsessed with one question: how can we build machines that actually think?

That curiosity didn\'t stay theoretical. I\'ve been independently building AI systems — multi-agent pipelines with LangGraph and the OpenAI Agents SDK, scalable backend APIs with FastAPI and Redis, and intelligent automation workflows with n8n. Not tutorials. Real projects, real problems.

My focus sits at the intersection of AI/ML research and backend engineering — I care about systems that don\'t just work in a notebook, but actually run in production.

When I\'m not coding, I\'m reading research papers, exploring the latest in deep learning, or pushing the boundaries of what I can build next.`,
    resume: '/resume.pdf'
  },

  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/Muhammad-Ubaid-1166',
      icon: 'Github',
      username: '@Muhammad-Ubaid-1166'
    },
    {
      name: 'Email',
      url: 'mailto:chubaid224@gmail.com',
      icon: 'Mail',
      username: 'chubaid224@gmail.com'
    }
  ],

  skills: [
    { name: 'Python', category: 'programming', level: 90 },
    { name: 'JavaScript', category: 'programming', level: 70 },
    { name: 'TypeScript', category: 'programming', level: 65 },
    { name: 'SQL', category: 'programming', level: 75 },

    { name: 'FastAPI', category: 'backend', level: 88 },
    { name: 'Next.js', category: 'backend', level: 72 },
    { name: 'REST APIs', category: 'backend', level: 85 },
    { name: 'Session Management', category: 'backend', level: 78 },

    { name: 'LangChain', category: 'ai-ml', level: 85 },
    { name: 'LangGraph', category: 'ai-ml', level: 82 },
    { name: 'OpenAI Agents SDK', category: 'ai-ml', level: 78 },
    { name: 'Streamlit', category: 'ai-ml', level: 80 },
    { name: 'n8n', category: 'ai-ml', level: 70 },
    { name: 'RAG Systems', category: 'ai-ml', level: 82 },
    { name: 'Vector Embeddings', category: 'ai-ml', level: 76 },
    { name: 'Docker', category: 'ai-ml', level: 72 },
    { name: 'Git & GitHub', category: 'ai-ml', level: 80 },
    { name: 'Linux', category: 'ai-ml', level: 75 },

    { name: 'PostgreSQL', category: 'databases', level: 78 },
    { name: 'Redis', category: 'databases', level: 75 },
    { name: 'Alembic', category: 'databases', level: 68 },
    { name: 'SQLite', category: 'databases', level: 72 },
  ],

  projects: [
    {
      id: 'blog-agent',
      title: 'Blog Agent',
      description: 'An AI-powered blog agent built with Streamlit that generates content using LLMs and intelligent workflows.',
      longDescription: 'A Streamlit-based application that leverages AI agents to research, write, and optimize blog content. Uses LangChain for orchestration and multiple LLM providers for content generation.',
      techStack: ['Streamlit', 'Python', 'LangChain', 'OpenAI', 'LLM'],
      category: 'ai',
      featured: true,
      demoUrl: 'https://blogagent-46jz5ce4woudgltdc5znoo.streamlit.app/',
      githubUrl: 'https://github.com/Muhammad-Ubaid-1166/Blog_agent',
      highlights: [
        'AI-powered content generation',
        'Multi-LLM provider support',
        'Streamlit interactive UI',
        'Research-to-blog pipeline'
      ],
      date: '2025-01',
      status: 'completed'
    },
    {
      id: 'rag-chatbot',
      title: 'RAG Chatbot',
      description: 'A Retrieval-Augmented Generation chatbot that answers questions using your own documents with vector search.',
      longDescription: 'Built with Next.js and LangChain, this RAG system lets users upload documents and ask questions. Uses vector embeddings for semantic search and LLMs for natural language answers with source citations.',
      techStack: ['Next.js', 'LangChain', 'Vector Embeddings', 'OpenAI', 'TypeScript', 'TailwindCSS'],
      category: 'ai',
      featured: true,
      demoUrl: 'https://self-rag-chatbot-8cn4-two.vercel.app/',
      frontendGithubUrl: 'https://github.com/Muhammad-Ubaid-1166/SELF_RAG_CHATBOT/tree/main',
      backendGithubUrl: 'https://github.com/Muhammad-Ubaid-1166/Self_RAG_chatbot_backend',
      highlights: [
        'Document upload & vector search',
        'Semantic understanding with RAG',
        'Source citation in responses',
        'Built with Next.js & LangChain'
      ],
      date: '2025-02',
      status: 'completed'
    },
    {
      id: 'research-app',
      title: 'Research App',
      description: 'An AI-powered research assistant that helps you find, analyze, and summarize academic papers and web content.',
      longDescription: 'A full-stack research assistant application that uses RAG and LLMs to help researchers quickly find relevant papers, extract key insights, and generate summaries.',
      techStack: ['Next.js', 'Python', 'LangChain', 'Vector Search', 'OpenAI', 'Vercel'],
      category: 'ai',
      featured: true,
      demoUrl: 'https://self-rag-chatbot-frontend.vercel.app/',
      frontendGithubUrl: 'https://github.com/Muhammad-Ubaid-1166/Research_app_frontend',
      backendGithubUrl: 'https://github.com/Muhammad-Ubaid-1166/Research_app_backend',
      highlights: [
        'AI-powered research analysis',
        'Paper summarization',
        'Semantic search across documents',
        'Modern responsive UI'
      ],
      date: '2025-03',
      status: 'completed'
    },
    {
      id: 'fullstack-auth',
      title: 'Full Stack Auth Project',
      description: 'A complete authentication system with user management, session handling, and secure API integration.',
      longDescription: 'A full-stack authentication solution featuring JWT-based auth, OAuth integration, role-based access control, and a modern React frontend with FastAPI backend.',
      techStack: ['React', 'FastAPI', 'PostgreSQL', 'JWT', 'Docker', 'Redis'],
      category: 'fullstack',
      featured: true,
      demoUrl: 'http://fullstack-project-frontend-git-main-ubaids-projects-f337c5ce.vercel.app/',
      frontendGithubUrl: 'https://github.com/Muhammad-Ubaid-1166/fullstack_project_frontend',
      backendGithubUrl: 'https://github.com/Muhammad-Ubaid-1166/fullstack_project_backend',
      highlights: [
        'JWT & OAuth authentication',
        'Role-based access control',
        'Session management with Redis',
        'Full-stack React + FastAPI'
      ],
      date: '2025-04',
      status: 'completed'
    }
  ],

  education: [
    {
      id: 'access-scholarship',
      institution: 'English Access Scholarship Program',
      degree: 'Scholarship Program',
      field: 'English Language & Leadership',
      startDate: '2024',
      endDate: '2026',
      current: false,
      description: 'Successfully completed the 2-year scholarship program sponsored by the U.S. Department of State, strengthening my English proficiency, leadership, communication, collaboration, and problem-solving skills.',
      location: 'Karachi, Pakistan'
    },
    {
      id: 'governor-house',
      institution: 'Governor House IT Initiative',
      degree: 'IT Education Program',
      field: 'Software Development',
      startDate: '2023',
      current: true,
      description: 'Actively learning modern software development, programming, and emerging technologies through a government-supported IT education program.',
      location: 'Karachi, Pakistan'
    }
  ],

  experience: [],

  certifications: [
    {
      id: 'react-next-ai',
      name: 'React & Next.js with AI Projects',
      issuer: 'Udemy',
      date: '2026-03',
      imageUrl: '/certificates/pasted_image_1774350374502.png'
    },
    {
      id: 'eng-career',
      name: 'English for Career Development',
      issuer: 'OPEN (Online Professional English Network)',
      date: '2025-12',
      imageUrl: '/certificates/pasted_image_1774349922296.png'
    }
  ],

  certificates: [
    {
      id: 'eng-career-dev',
      title: 'English for Career Development',
      image: '/certificates/pasted_image_1774349922296.png',
      issuer: 'OPEN (Online Professional English Network)',
      date: 'December 2025',
      description: 'Professional English language certification focused on career development skills, communication, and workplace English proficiency.'
    },
    {
      id: 'eng-access-scholarship',
      title: 'English Access Scholarship Program',
      image: '/certificates/pasted_image_1774349934011.png',
      issuer: 'U.S. Consulate General Karachi',
      date: '2024 - 2026',
      description: 'Two-year scholarship program sponsored by the U.S. Department of State, focusing on English language learning and cultural exchange.'
    },
    {
      id: 'appreciation-cert',
      title: 'Certificate of Appreciation',
      image: '/certificates/pasted_image_1774349943345.png',
      issuer: 'U.S. Consulate General Karachi',
      date: 'January 2026',
      description: 'Recognition for active and outstanding participation in co-curricular activities during the English Access Scholarship Program.'
    },
    {
      id: 'react-next-ai-cert',
      title: 'React & Next.js with AI Projects',
      image: '/certificates/pasted_image_1774350374502.png',
      issuer: 'Udemy',
      date: 'March 2026',
      description: 'Comprehensive course covering React, Next.js framework, and building AI-powered web applications with modern development practices.'
    }
  ],

  timeline: [
    {
      id: 't1',
      year: '2024',
      title: 'English Access Scholarship',
      description: 'Started the 2-year English Access Scholarship Program sponsored by the U.S. Embassy',
      type: 'education'
    },
    {
      id: 't2',
      year: '2025',
      title: 'First AI Agent Project',
      description: 'Built Blog Agent — an AI-powered content generation system',
      type: 'milestone'
    },
    {
      id: 't3',
      year: '2025',
      title: 'RAG Systems',
      description: 'Built production-ready RAG chatbot and research assistant',
      type: 'achievement'
    },
    {
      id: 't4',
      year: '2026',
      title: 'Full Stack AI Engineer',
      description: 'Building end-to-end AI-powered full stack applications',
      type: 'milestone'
    }
  ]
};

export const knowledgeBase = `
# About Muhammad Ubaid

## Personal Information
- Name: Muhammad Ubaid
- Status: First-year student
- Field: Computer Science at University of Karachi
- Specializations: Agentic AI, FastAPI, LangGraph, Multi-Agent Systems, Backend Engineering
- Goal: Full Stack AI Engineer
- Location: Karachi, Pakistan

## Who I Am
Muhammad Ubaid is a first-year Computer Science student obsessed with building machines that actually think.

He builds production-ready AI systems — multi-agent pipelines with LangGraph and OpenAI Agents SDK, scalable backend APIs with FastAPI and Redis, and intelligent automation workflows with n8n.

His focus sits at the intersection of AI/ML research and backend engineering — production-ready systems, not just notebooks.

## Skills
### Programming Languages
- Python, JavaScript, TypeScript, SQL

### Backend Development
- FastAPI, Next.js, REST APIs, Session Management

### AI Tools & Platforms
- LangChain, LangGraph, OpenAI Agents SDK, Streamlit, n8n
- RAG Systems, Vector Embeddings
- Docker, Git & GitHub, Linux

### Databases
- PostgreSQL, Redis, Alembic, SQLite

## Projects
1. **Blog Agent** - AI-powered blog content generator built with Streamlit and LangChain
   - Live: https://blogagent-46jz5ce4woudgltdc5znoo.streamlit.app/
   - Code: https://github.com/Muhammad-Ubaid-1166/Blog_agent

2. **RAG Chatbot** - RAG system for document Q&A with vector search
   - Live: https://self-rag-chatbot-8cn4-two.vercel.app/
   - Frontend Code: https://github.com/Muhammad-Ubaid-1166/SELF_RAG_CHATBOT/tree/main
   - Backend Code: https://github.com/Muhammad-Ubaid-1166/Self_RAG_chatbot_backend

3. **Research App** - AI research assistant for paper analysis and summarization
   - Live: https://self-rag-chatbot-frontend.vercel.app/
   - Frontend Code: https://github.com/Muhammad-Ubaid-1166/Research_app_frontend
   - Backend Code: https://github.com/Muhammad-Ubaid-1166/Research_app_backend

4. **Full Stack Auth Project** - Complete auth system with JWT, OAuth, FastAPI + React
   - Live: http://fullstack-project-frontend-git-main-ubaids-projects-f337c5ce.vercel.app/
   - Frontend Code: https://github.com/Muhammad-Ubaid-1166/fullstack_project_frontend
   - Backend Code: https://github.com/Muhammad-Ubaid-1166/fullstack_project_backend

## Education
- **English Access Scholarship Program (U.S. Embassy)** — Successfully completed the 2-year scholarship program, strengthening my English proficiency, leadership, communication, collaboration, and problem-solving skills.
- **Governor House IT Initiative (2023 – Present)** — Actively learning modern software development, programming, and emerging technologies through a government-supported IT education program.

## Certificates
1. English for Career Development - OPEN (Online Professional English Network) - Dec 2025
2. English Access Scholarship Program - U.S. Consulate General Karachi - 2024-2026
3. Certificate of Appreciation - U.S. Consulate General Karachi - Jan 2026
4. React & Next.js with AI Projects - Udemy - Mar 2026

## Availability
- Currently open to opportunities
- Preferred roles: AI/ML Engineer, Backend Engineer, Full Stack AI Engineer
- Location: Karachi, Pakistan (Open to remote)
- Contact: chubaid224@gmail.com
- GitHub: https://github.com/Muhammad-Ubaid-1166

## Personal Traits
- Obsessed with building thinking machines
- Independent builder — real projects, not tutorials
- Production-focused mindset
- Research enthusiast
- Continuous learner
`;

export default portfolioData;
