'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Server, Brain, Database, Layers, Cpu, Zap } from 'lucide-react';
import { portfolioData, skillCategories } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import type { SkillCategory } from '@/types/portfolio';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Code2, Server, Brain, Database };

const roleBadges = [
  { title: 'Full Stack Developer', icon: Layers, color: 'from-blue-600 to-blue-400', glowColor: 'rgba(37, 99, 235, 0.3)' },
  { title: 'Agentic AI Developer', icon: Cpu, color: 'from-cyan-600 to-blue-500', glowColor: 'rgba(6, 182, 212, 0.3)' },
];

function GradientBorder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('relative group', className)}>
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-500 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="relative rounded-2xl bg-[#121219]">{children}</div>
    </div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillsByCategory = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) { acc[skill.category] = []; }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<SkillCategory, string[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)' }} />

      <div className="container-portfolio relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
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
            Technical Expertise
          </motion.span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text-animated">Skills</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {roleBadges.map((role) => (
            <motion.div key={role.title} variants={badgeVariants} whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }} className="relative group">
              <motion.div
                className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: role.glowColor }}
              />
              <div
                className="relative flex items-center gap-4 px-8 py-5 rounded-2xl cursor-default"
                style={{
                  background: 'rgba(18, 18, 25, 0.6)',
                  border: '1px solid rgba(37, 99, 235, 0.12)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg', role.color)}>
                  <role.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-lg font-semibold text-white/90">{role.title}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => {
            const IconComponent = iconMap[category.icon];
            const skills = skillsByCategory[category.id] || [];
            return (
              <GradientBorder key={category.id}>
                <motion.div
                  variants={cardVariants}
                  className="relative p-8 rounded-2xl h-full"
                  style={{
                    background: 'rgba(18, 18, 25, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={cn('w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg', category.color)}
                    >
                      {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white/90">{category.label}</h3>
                      <p className="text-sm text-white/40">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, skillIndex) => {
                      const skillObj = portfolioData.skills.find(s => s.name === skill);
                      const level = skillObj?.level;
                      return (
                        <div key={skill} className="flex flex-col items-center">
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + catIndex * 0.1 + skillIndex * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className="px-4 py-2 rounded-lg text-sm font-medium cursor-default transition-all duration-200"
                            style={{
                              background: 'rgba(37, 99, 235, 0.08)',
                              color: 'rgba(96, 165, 250, 0.9)',
                              border: '1px solid rgba(37, 99, 235, 0.12)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(37, 99, 235, 0.18)';
                              e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)';
                              e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.12)';
                            }}
                          >
                            {skill}
                          </motion.span>
                          {level && (
                            <div className="w-full max-w-[100px] h-1 rounded-full mt-1.5 overflow-hidden" style={{ background: 'rgba(37, 99, 235, 0.1)' }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={isInView ? { width: `${level}%` } : {}}
                                transition={{ delay: 0.5 + catIndex * 0.1 + skillIndex * 0.03, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full rounded-full"
                                style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6)' }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </GradientBorder>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
