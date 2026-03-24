'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  ExternalLink, Github, Star, ArrowRight,
  Cpu, Server, Globe, Wrench
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ProjectCategory } from '@/types/portfolio';

const categoryConfig: Record<ProjectCategory, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  ai: { label: 'AI/ML', icon: Cpu, color: 'from-purple-500 to-pink-500' },
  backend: { label: 'Backend', icon: Server, color: 'from-orange-500 to-red-500' },
  fullstack: { label: 'Full Stack', icon: Globe, color: 'from-cyan-500 to-blue-500' },
  tools: { label: 'Tools', icon: Wrench, color: 'from-emerald-500 to-teal-500' },
  other: { label: 'Other', icon: Star, color: 'from-yellow-500 to-orange-500' },
};

interface ProjectCardProps {
  project: typeof portfolioData.projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const category = categoryConfig[project.category];
  const CategoryIcon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden glass h-full flex flex-col"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="default" className="gap-1">
            <Star className="w-3 h-3" />
            Featured
          </Badge>
        </div>
      )}

      {/* Project Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <CategoryIcon className="w-20 h-20 text-primary/30" />
        </motion.div>
        
        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end p-4"
        >
          <div className="flex gap-2">
            {project.demoUrl && (
              <Button size="sm" asChild className="gap-1">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3" />
                  Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button size="sm" variant="secondary" asChild className="gap-1">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-3 h-3" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <div className={cn('w-6 h-6 rounded flex items-center justify-center bg-gradient-to-br', category.color)}>
            <CategoryIcon className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs text-muted-foreground">{category.label}</span>
          <span className="text-xs text-muted-foreground ml-auto">
            {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md bg-muted"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-border">
            <p className="text-xs font-medium mb-2">Key Features:</p>
            <ul className="space-y-1">
              {project.highlights.slice(0, 3).map((highlight, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Bottom Action */}
      <div className="p-4 pt-0">
        <Button variant="ghost" className="w-full group/btn cursor-pointer">
          View Details
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = activeFilter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-portfolio">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work in AI, Backend Development, and Full Stack applications
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {(['all', 'ai', 'backend', 'fullstack'] as const).map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer',
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'glass hover:bg-primary/10'
              )}
            >
              {filter === 'all' ? 'All Projects' : categoryConfig[filter].label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <a 
              href="https://github.com/muhammad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="gap-2 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              View All on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
