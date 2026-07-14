'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Star, ArrowRight, Cpu, Server, Globe, Wrench, Sparkles } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectModal } from '@/components/portfolio/project-modal';
import type { ProjectCategory, Project } from '@/types/portfolio';

const categoryConfig: Record<ProjectCategory, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  ai: { label: 'AI/ML', icon: Cpu, color: 'from-blue-600 to-blue-400' },
  backend: { label: 'Backend', icon: Server, color: 'from-cyan-600 to-blue-500' },
  fullstack: { label: 'Full Stack', icon: Globe, color: 'from-blue-500 to-indigo-500' },
  tools: { label: 'Tools', icon: Wrench, color: 'from-emerald-500 to-teal-500' },
  other: { label: 'Other', icon: Star, color: 'from-yellow-500 to-orange-500' },
};

interface ProjectCardProps { project: typeof portfolioData.projects[0]; index: number; }

function GradientBorderCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('relative group h-full', className)}>
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-500 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
      <div className="relative rounded-2xl bg-[#121219] h-full">{children}</div>
    </div>
  );
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps & { onSelect: (p: typeof project) => void }) {
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
      onClick={() => onSelect(project)}
      className="cursor-pointer"
    >
      <GradientBorderCard>
        <div className="relative rounded-2xl overflow-hidden h-full flex flex-col" style={{ border: '1px solid rgba(255, 255, 255, 0.04)' }}>
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="default" className="gap-1 bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Sparkles className="w-3 h-3" />
                Featured
              </Badge>
            </div>
          )}

          <div className="relative h-48 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(6, 182, 212, 0.1))' }}>
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <CategoryIcon className="w-20 h-20 text-white/10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-[#121219] to-transparent flex items-end p-4"
            >
              <div className="flex gap-2">
                {project.demoUrl && (
                  <Button size="sm" asChild className="gap-1 border-0 text-white" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-3 h-3" />Live Demo</a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size="sm" variant="secondary" asChild className="gap-1" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' }}>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="w-3 h-3" />Code</a>
                  </Button>
                )}
                {project.frontendGithubUrl && (
                  <Button size="sm" variant="secondary" asChild className="gap-1" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' }}>
                    <a href={project.frontendGithubUrl} target="_blank" rel="noopener noreferrer"><Github className="w-3 h-3" />Frontend</a>
                  </Button>
                )}
                {project.backendGithubUrl && (
                  <Button size="sm" variant="secondary" asChild className="gap-1" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' }}>
                    <a href={project.backendGithubUrl} target="_blank" rel="noopener noreferrer"><Github className="w-3 h-3" />Backend</a>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          <div className="flex-1 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className={cn('w-6 h-6 rounded flex items-center justify-center bg-gradient-to-br', category.color)}>
                <CategoryIcon className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs text-white/40">{category.label}</span>
              <span className="text-xs text-white/40 ml-auto">
                {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-white/90 group-hover:text-transparent transition-all">{project.title}</h3>
            <p className="text-sm text-white/50 mb-4 flex-1">{project.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="px-2 py-1 text-xs rounded-md" style={{ background: 'rgba(37, 99, 235, 0.08)', color: 'rgba(96, 165, 250, 0.8)' }}>
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 text-xs rounded-md" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)' }}>
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {project.demoUrl && !isHovered && (
              <Button
                size="sm"
                asChild
                className="w-full gap-2 border-0 text-white"
                style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Visit Project
                </a>
              </Button>
            )}
          </div>
        </div>
      </GradientBorderCard>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(37, 99, 235, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)' }} />

      <div className="container-portfolio relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              border: '1px solid rgba(37, 99, 235, 0.2)',
              background: 'rgba(37, 99, 235, 0.08)',
              color: 'rgba(96, 165, 250, 0.9)',
            }}
          >
            My Work
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            A showcase of my work in AI, Backend Development, and Full Stack applications
          </p>
        </motion.div>

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
              className="px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
              style={
                activeFilter === filter
                  ? { background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: 'white' }
                  : {
                      background: 'rgba(255,255,255,0.04)',
                      color: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }
              }
            >
              {filter === 'all' ? 'All Projects' : categoryConfig[filter].label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onSelect={setSelectedProject} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            asChild
            style={{
              border: '1px solid rgba(37, 99, 235, 0.3)',
              color: 'rgba(96, 165, 250, 0.9)',
              background: 'transparent',
            }}
            className="hover:bg-blue-500/10"
          >
            <a href="https://github.com/Muhammad-Ubaid-1166" target="_blank" rel="noopener noreferrer" className="gap-2 cursor-pointer">
              <Github className="w-4 h-4" />
              View All on GitHub
            </a>
          </Button>
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
