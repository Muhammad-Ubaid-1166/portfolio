import type { SkillCategoryInfo } from '@/types/portfolio';

// Simplified Skill Categories
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
    color: 'from-orange-500 to-red-500',
    icon: 'Server'
  },
  {
    id: 'ai-ml',
    label: 'AI Tools & Platforms',
    description: 'AI development tools and platforms',
    color: 'from-purple-500 to-pink-500',
    icon: 'Brain'
  },
  {
    id: 'databases',
    label: 'Databases',
    description: 'Database technologies',
    color: 'from-cyan-500 to-blue-500',
    icon: 'Database'
  }
];

// Main Portfolio Data - Dynamic Configuration
export const portfolioData: PortfolioConfig = {
  personal: {
    name: 'Muhammad Ubaid',
    title: 'AI/Backend Engineer',
    tagline: 'Building Intelligent Systems, One Model at a Time',
    status: 'First-year Student',
    field: 'Computer Science',
    specializations: ['Machine Learning', 'Deep Learning', 'Natural Language Processing'],
    roleGoal: 'Full Stack Ai Engineer',
    location: 'Karachi, Pakistan',
    email: 'chubaid224@gmail.com',
    phone: '+92 30112684971',
    bio: `I'm Muhammad Ubaid, a first-year Computer Science student obsessed with one question: how can we build machines that actually think?

That curiosity didn't stay theoretical. I've been independently building AI systems — multi-agent pipelines with LangGraph and the OpenAI Agents SDK, scalable backend APIs with FastAPI and Redis, and intelligent automation workflows with n8n. Not tutorials. Real projects, real problems.

My focus sits at the intersection of AI/ML research and backend engineering — I care about systems that don't just work in a notebook, but actually run in production.

When I'm not coding, I'm reading research papers, exploring the latest in deep learning, or pushing the boundaries of what I can build next.`,
    resume: '/resume.pdf'
  },

  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/muhammad',
      icon: 'Github',
      username: '@muhammad'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/muhammad',
      icon: 'Twitter',
      username: '@muhammad'
    },
    {
      name: 'Email',
      url: 'mailto:chubaid224@gmail.com',
      icon: 'Mail',
      username: 'chubaid224@gmail.com'
    }
  ],

  skills: [
    // Programming Languages
    { name: 'Python', category: 'programming' },
    { name: 'JavaScript', category: 'programming' },

    // Backend Development
    { name: 'FastAPI', category: 'backend' },

    // AI Tools & Platforms
    { name: 'n8n', category: 'ai-ml' },
    { name: 'OpenAI Agents SDK', category: 'ai-ml' },
    { name: 'LangChain', category: 'ai-ml' },
    { name: 'LangGraph', category: 'ai-ml' },
    { name: 'Streamlit', category: 'ai-ml' },
    { name: 'GitHub', category: 'ai-ml' },
    { name: 'Linux (Hyprland)', category: 'ai-ml' },
    { name: 'Docker', category: 'ai-ml' },
    { name: 'VS Code', category: 'ai-ml' },
    { name: 'Antigravity', category: 'ai-ml' },

    // Databases
    { name: 'PostgreSQL', category: 'databases' },
    { name: 'Redis & Session Management', category: 'databases' },
    { name: 'Alembic', category: 'databases' },
  ],

  projects: [
    {
      id: 'ai-assistant',
      title: 'AI Personal Assistant',
      description: 'An intelligent personal assistant powered by LangChain and GPT-4 that can handle complex multi-step tasks.',
      longDescription: 'Built a sophisticated AI assistant that leverages LangChain for orchestration and GPT-4 for natural language understanding. The assistant can perform web searches, manage calendars, send emails, and execute complex workflows.',
      techStack: ['Python', 'LangChain', 'LangGraph', 'OpenAI', 'FastAPI', 'Redis'],
      category: 'ai',
      featured: true,
      imageUrl: '/projects/ai-assistant.png',
      demoUrl: 'https://ai-assistant.demo.com',
      githubUrl: 'https://github.com/muhammad/ai-assistant',
      highlights: [
        'Multi-agent orchestration with LangGraph',
        'Persistent memory with Redis',
        'Streaming responses for better UX',
        'Tool calling for external actions'
      ],
      architecture: 'Microservices architecture with FastAPI backend, Redis for caching and session management, and a React frontend for the chat interface.',
      date: '2024-01',
      status: 'completed'
    },
    {
      id: 'nlp-sentiment',
      title: 'Sentiment Analysis Engine',
      description: 'Production-ready sentiment analysis system processing 10K+ tweets daily with 94% accuracy.',
      longDescription: 'Developed a real-time sentiment analysis engine that processes social media data to provide insights into public opinion. The system uses transformer models fine-tuned on domain-specific data.',
      techStack: ['Python', 'PyTorch', 'Hugging Face', 'FastAPI', 'PostgreSQL', 'Docker'],
      category: 'ai',
      featured: true,
      imageUrl: '/projects/sentiment.png',
      githubUrl: 'https://github.com/muhammad/sentiment-engine',
      highlights: [
        '94% accuracy on benchmark datasets',
        'Real-time processing pipeline',
        'Multi-language support',
        'RESTful API with rate limiting'
      ],
      architecture: 'Event-driven architecture using FastAPI for the API layer, PostgreSQL for data persistence, and Docker containers for easy deployment.',
      date: '2024-02',
      status: 'completed'
    },
    {
      id: 'rag-chatbot',
      title: 'RAG Document Chat',
      description: 'Retrieval-Augmented Generation system for intelligent document Q&A.',
      longDescription: 'Built a RAG system that allows users to upload documents and ask questions about their content. Uses vector embeddings for semantic search and GPT-4 for answer generation.',
      techStack: ['Python', 'LangChain', 'Pinecone', 'OpenAI', 'Next.js', 'TailwindCSS'],
      category: 'ai',
      featured: true,
      imageUrl: '/projects/rag-chat.png',
      demoUrl: 'https://rag-chat.demo.com',
      githubUrl: 'https://github.com/muhammad/rag-chat',
      highlights: [
        'Semantic search with Pinecone',
        'Document chunking and embedding',
        'Source citation in responses',
        'Support for PDF, DOCX, TXT'
      ],
      architecture: 'Full-stack application with Next.js frontend, Python backend with LangChain, and Pinecone for vector storage.',
      date: '2024-03',
      status: 'completed'
    },
    {
      id: 'api-gateway',
      title: 'Smart API Gateway',
      description: 'High-performance API gateway with intelligent routing and rate limiting.',
      longDescription: 'Designed and implemented a custom API gateway that handles authentication, rate limiting, and intelligent request routing for microservices architecture.',
      techStack: ['Node.js', 'Express', 'Redis', 'Docker', 'Nginx'],
      category: 'backend',
      featured: false,
      imageUrl: '/projects/api-gateway.png',
      githubUrl: 'https://github.com/muhammad/api-gateway',
      highlights: [
        '10K+ requests per second',
        'JWT authentication',
        'Dynamic rate limiting',
        'Health monitoring'
      ],
      architecture: 'Event-driven architecture using FastAPI for the API layer, PostgreSQL for data persistence, and Docker containers for easy deployment.',
      date: '2023-11',
      status: 'completed'
    },
    {
      id: 'portfolio-v2',
      title: 'AI-Powered Portfolio',
      description: 'This portfolio you\'re viewing right now - featuring an AI assistant that knows everything about me.',
      longDescription: 'A modern, performant portfolio built with Next.js 16, featuring a custom AI assistant that can answer questions about my skills, projects, and experience.',
      techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'OpenAI'],
      category: 'fullstack',
      featured: true,
      imageUrl: '/projects/portfolio.png',
      demoUrl: 'https://muhammad.dev',
      githubUrl: 'https://github.com/muhammad/portfolio',
      highlights: [
        'AI assistant with streaming responses',
        'Dark/Light mode',
        'Smooth animations',
        'Responsive design'
      ],
      architecture: 'Next.js App Router with server components, API routes for the chatbot, and client components for interactive features.',
      date: '2024-04',
      status: 'in-progress'
    },
    {
      id: 'ml-pipeline',
      title: 'ML Training Pipeline',
      description: 'Automated machine learning pipeline for model training and deployment.',
      longDescription: 'Built an end-to-end ML pipeline that automates data preprocessing, model training, hyperparameter tuning, and deployment.',
      techStack: ['Python', 'TensorFlow', 'MLflow', 'Docker', 'AWS'],
      category: 'ai',
      featured: false,
      imageUrl: '/projects/ml-pipeline.png',
      githubUrl: 'https://github.com/muhammad/ml-pipeline',
      highlights: [
        'Automated hyperparameter tuning',
        'Model versioning with MLflow',
        'A/B testing framework',
        'Auto-scaling deployment'
      ],
      architecture: 'End-to-end ML pipeline with automated training and deployment.',
      date: '2024-01',
      status: 'completed'
    }
  ],

  education: [
    {
      id: 'university',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2023-09',
      current: true,
      description: 'Pursuing a degree in Computer Science with focus on Machine Learning and Artificial Intelligence.',
      achievements: [
        'Dean\'s List - Fall 2023',
        'AI Club President',
        'Hackathon Winner - AI Track'
      ],
      gpa: '3.8/4.0',
      location: 'San Francisco, CA'
    },
    {
      id: 'cert-tensorflow',
      institution: 'Google',
      degree: 'Professional Certificate',
      field: 'TensorFlow Developer',
      startDate: '2023-06',
      endDate: '2023-08',
      current: false,
      description: 'Comprehensive training in TensorFlow for deep learning applications.'
    }
  ],

  experience: [
    {
      id: 'intern-ai',
      company: 'TechStartup AI',
      role: 'AI/ML Intern',
      type: 'internship',
      startDate: '2024-01',
      current: true,
      description: 'Working on production ML systems, implementing NLP models, and contributing to the AI infrastructure.',
      technologies: ['Python', 'TensorFlow', 'LangChain', 'AWS'],
      achievements: [
        'Improved model accuracy by 15%',
        'Built automated data pipeline',
        'Contributed to open-source ML tools'
      ],
      location: 'Remote'
    },
    {
      id: 'freelance',
      company: 'Freelance',
      role: 'Backend Developer',
      type: 'freelance',
      startDate: '2023-06',
      endDate: '2023-12',
      current: false,
      description: 'Developed backend APIs and ML integrations for various clients.',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
      achievements: [
        'Delivered 5+ projects',
        '100% client satisfaction',
        'Long-term contract extensions'
      ]
    }
  ],

  certifications: [
    {
      id: 'tf-developer',
      name: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      date: '2023-08',
      credentialUrl: 'https://credential.google.com/tf-developer'
    },
    {
      id: 'aws-ml',
      name: 'AWS Machine Learning Specialty',
      issuer: 'Amazon',
      date: '2024-02',
      credentialUrl: 'https://aws.amazon.com/certification'
    }
  ],

  timeline: [
    {
      id: 't1',
      year: '2023',
      title: 'Started University',
      description: 'Began pursuing a degree in Computer Science',
      type: 'education'
    },
    {
      id: 't2',
      year: '2023',
      title: 'First AI Project',
      description: 'Built my first production ML model',
      type: 'milestone'
    },
    {
      id: 't3',
      year: '2024',
      title: 'AI/ML Intern',
      description: 'Started internship at TechStartup AI',
      type: 'experience'
    },
    {
      id: 't4',
      year: '2024',
      title: 'LangChain Expert',
      description: 'Mastered LLM application development',
      type: 'achievement'
    }
  ]
};

// Knowledge base for AI chatbot
export const knowledgeBase = `
# About Muhammad Ubaid

## Personal Information
- Name: Muhammad Ubaid
- Status: First-year student
- Field: Computer Science
- Specializations: Machine Learning (ML), Deep Learning (DL), Natural Language Processing (NLP)
- Goal: Full Stack Ai Engineer
- Location: Karachi, Pakistan

## Who I Am
Muhammad Ubaid is a first-year Computer Science student obsessed with one question: how can we build machines that actually think?

That curiosity didn't stay theoretical. He's been independently building AI systems — multi-agent pipelines with LangGraph and the OpenAI Agents SDK, scalable backend APIs with FastAPI and Redis, and intelligent automation workflows with n8n. Not tutorials. Real projects, real problems.

His focus sits at the intersection of AI/ML research and backend engineering — he cares about systems that don't just work in a notebook, but actually run in production.

When he's not coding, he's reading research papers, exploring the latest in deep learning, or pushing the boundaries of what he can build next.

## Roles
- Full Stack Developer
- Agentic AI Developer

## Skills Overview

### Programming Languages
- Python
- JavaScript

### Backend Development
- FastAPI

### AI Tools & Platforms
- n8n - Intelligent automation workflows
- OpenAI Agents SDK - Building AI agents
- LangChain - LLM application framework
- LangGraph - Multi-agent pipelines
- Streamlit - ML app development
- GitHub - Version control
- Linux (Hyprland) - Operating system
- Docker - Containerization
- VS Code - IDE
- Antigravity

### Databases
- PostgreSQL - Relational database
- Redis & Session Management
- Alembic - Database migrations

## Projects
Muhammad Ubaid has built several impressive projects:

1. **AI Personal Assistant** - Intelligent assistant using LangChain and GPT-4
2. **Sentiment Analysis Engine** - Real-time sentiment analysis with 94% accuracy
3. **RAG Document Chat** - Document Q&A system with vector search
4. **Smart API Gateway** - High-performance API gateway
5. **AI-Powered Portfolio** - This portfolio with an AI assistant
6. **ML Training Pipeline** - Automated ML pipeline

## Education
- Currently pursuing Bachelor of Science in Computer Science
- Expected graduation: 2027
- Current GPA: 3.8/4.0
- Achievements: Dean's List, AI Club President, Hackathon Winner

## Experience
- AI/ML Intern at TechStartup AI (2024-Present)
  - Working on production ML systems
  - Improved model accuracy by 15%
  - Building NLP models

- Freelance Backend Developer (2023-2024)
  - Developed APIs and ML integrations
  - 100% client satisfaction

## Availability
- Currently open to opportunities
- Preferred roles: AI/ML Research, Backend Engineer, ML Engineer
- Location: Karachi, Pakistan (Open to remote)
- Contact: chubaid224@gmail.com

## Personal Traits
- Obsessed with building thinking machines
- Independent builder - real projects, not tutorials
- Production-focused mindset
- Research enthusiast
- Continuous learner
- Open-source contributor
`;

export default portfolioData;
