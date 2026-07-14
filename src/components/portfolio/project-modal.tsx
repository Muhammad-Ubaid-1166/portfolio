'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  ai: { label: 'AI/ML', color: 'from-blue-600 to-blue-400' },
  backend: { label: 'Backend', color: 'from-cyan-600 to-blue-500' },
  fullstack: { label: 'Full Stack', color: 'from-blue-500 to-indigo-500' },
  tools: { label: 'Tools', color: 'from-emerald-500 to-teal-500' },
  other: { label: 'Other', color: 'from-yellow-500 to-orange-500' },
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;
  const cat = categoryConfig[project.category];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(10, 10, 15, 0.95)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl overflow-y-auto shadow-2xl"
            style={{
              background: 'rgba(18, 18, 25, 0.95)',
              border: '1px solid rgba(37, 99, 235, 0.15)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <button
              onClick={onClose}
              className="fixed top-4 right-4 z-10 p-3 rounded-full cursor-pointer group"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <X className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors" />
            </button>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br', cat.color)}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm" style={{ color: 'rgba(96, 165, 250, 0.8)' }}>{cat.label}</span>
                {project.featured && (
                  <span className="px-2 py-0.5 text-xs rounded-full" style={{ background: 'rgba(37, 99, 235, 0.15)', color: 'rgba(96, 165, 250, 0.9)' }}>
                    Featured
                  </span>
                )}
              </div>

              <h2 className="text-3xl font-bold mb-3 text-white/90">{project.title}</h2>

              <p className="text-lg mb-6 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {(project as any).longDescription || project.description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>Highlights</h3>
                  <div className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'rgba(96, 165, 250, 0.7)' }} />
                        <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium"
                      style={{
                        background: 'rgba(37, 99, 235, 0.08)',
                        color: 'rgba(96, 165, 250, 0.9)',
                        border: '1px solid rgba(37, 99, 235, 0.12)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {project.demoUrl && (
                  <Button asChild className="border-0 text-white" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" asChild style={{ border: '1px solid rgba(37, 99, 235, 0.3)', color: 'rgba(96, 165, 250, 0.9)' }}>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.frontendGithubUrl && (
                  <Button variant="outline" asChild style={{ border: '1px solid rgba(37, 99, 235, 0.3)', color: 'rgba(96, 165, 250, 0.9)' }}>
                    <a href={project.frontendGithubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Frontend Code
                    </a>
                  </Button>
                )}
                {project.backendGithubUrl && (
                  <Button variant="outline" asChild style={{ border: '1px solid rgba(37, 99, 235, 0.3)', color: 'rgba(96, 165, 250, 0.9)' }}>
                    <a href={project.backendGithubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Backend Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
