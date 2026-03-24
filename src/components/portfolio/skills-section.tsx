'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Server, Brain, Database, Layers, Cpu } from 'lucide-react';
import { portfolioData, skillCategories } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import type { SkillCategory } from '@/types/portfolio';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Server,
  Brain,
  Database,
};

// Role badges to display at top
const roleBadges = [
  {
    title: 'Full Stack Developer',
    icon: Layers,
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.3)',
  },
  {
    title: 'Agentic AI Developer',
    icon: Cpu,
    color: 'from-violet-500 to-purple-500',
    glowColor: 'rgba(139, 92, 246, 0.3)',
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Group skills by category
  const skillsByCategory = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<SkillCategory, string[]>);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container-portfolio relative z-10">
        {/* Section Header */}
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
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 text-violet-500 border border-violet-500/20 mb-6"
          >
            Technical Expertise
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            My <span className="gradient-text-animated">Skills</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Role Badges */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {roleBadges.map((role, index) => (
            <motion.div
              key={role.title}
              variants={badgeVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: role.glowColor }}
              />
              
              <div className="relative flex items-center gap-4 px-8 py-5 rounded-2xl glass card-hover cursor-default">
                <div className={cn(
                  'w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg',
                  role.color
                )}>
                  <role.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-lg font-semibold">{role.title}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category, catIndex) => {
            const IconComponent = iconMap[category.icon];
            const skills = skillsByCategory[category.id] || [];

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                {/* Gradient border on hover */}
                <motion.div
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${category.id === 'programming' ? '#10b981' : category.id === 'backend' ? '#f97316' : category.id === 'ai-ml' ? '#8b5cf6' : '#06b6d4'}, transparent)`,
                  }}
                />
                
                <div className="relative p-8 rounded-2xl glass h-full card-hover">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={cn(
                        'w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg',
                        category.color
                      )}
                    >
                      {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold">{category.label}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ 
                          delay: 0.3 + catIndex * 0.1 + skillIndex * 0.03,
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary border border-primary/15 hover:bg-primary/20 hover:border-primary/30 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
