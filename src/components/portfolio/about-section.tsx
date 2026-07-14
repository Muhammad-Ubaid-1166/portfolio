'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Target, MapPin, Code2, Rocket, Brain, Cpu } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';

const infoCards = [
  {
    icon: GraduationCap,
    label: 'Field',
    value: 'Computer Science',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Briefcase,
    label: 'Status',
    value: 'First-year Student',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    label: 'Goal',
    value: 'Full Stack Ai Engineer',
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Karachi, Pakistan',
    color: 'from-orange-500 to-red-500',
  },
];

const timeline = [
  { year: '2021', title: 'Started Coding', description: 'Discovered programming and fell in love with Python', icon: Code2 },
  { year: '2022', title: 'First ML Project', description: 'Built my first machine learning model for image classification', icon: Rocket },
  { year: '2023', title: 'University Journey', description: 'Started pursuing Computer Science degree', icon: GraduationCap },
  { year: '2024', title: 'Production AI Systems', description: 'Building multi-agent pipelines with LangGraph & OpenAI Agents SDK', icon: Brain },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const bioParagraphs = portfolioData.personal.bio.split('\n\n');

  return (
    <section id="about" className="section-padding relative">
      <div className="container-portfolio">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </motion.div>

        {/* Bio Section */}
        <div ref={ref} className="grid lg:grid-cols-5 gap-12 items-start mb-20">
          {/* Bio Text - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-muted-foreground mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {['LangGraph', 'OpenAI Agents SDK', 'FastAPI', 'Redis', 'n8n', 'Production AI'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Info Cards - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 grid grid-cols-2 gap-3"
          >
            {infoCards.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="p-4 rounded-xl glass hover:glow-sm transition-all duration-300 cursor-default"
              >
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-gradient-to-br', item.color)}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            My <span className="gradient-text">Journey</span>
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-cyan-500" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.2 }}
                className={cn(
                  'relative flex items-start mb-8 last:mb-0',
                  'md:justify-center'
                )}
              >
                <div className={cn(
                  'flex items-start gap-4 w-full',
                  'md:w-1/2',
                  index % 2 === 0 ? 'md:pr-12 md:justify-end' : 'md:pl-12 md:justify-start'
                )}>
                  {/* Content */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={cn(
                      'flex-1 p-4 rounded-xl glass',
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    )}
                  >
                    <span className="text-sm font-bold text-primary">{item.year}</span>
                    <h4 className="font-semibold mt-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 z-10"
                  >
                    <item.icon className="w-4 h-4 text-primary-foreground" />
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
