'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { ArrowLeft, X, ZoomIn, ExternalLink, Sparkles, Code2, Rocket, Brain, MapPin, Target, GraduationCap, Calendar } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const certificates = [
  {
    id: 1,
    title: 'English for Career Development',
    image: '/certificates/pasted_image_1774349922296.png',
    issuer: 'OPEN (Online Professional English Network)',
    date: 'December 2025',
    description: 'Professional English language certification focused on career development skills, communication, and workplace English proficiency.',
  },
  {
    id: 2,
    title: 'English Access Scholarship Program',
    image: '/certificates/pasted_image_1774349934011.png',
    issuer: 'U.S. Consulate General Karachi',
    date: '2024 - 2026',
    description: 'Two-year scholarship program sponsored by the U.S. Department of State, focusing on English language learning and cultural exchange.',
  },
  {
    id: 3,
    title: 'Certificate of Appreciation',
    image: '/certificates/pasted_image_1774349943345.png',
    issuer: 'U.S. Consulate General Karachi',
    date: 'January 2026',
    description: 'Recognition for active and outstanding participation in co-curricular activities during the English Access Scholarship Program.',
  },
  {
    id: 4,
    title: 'React & Next.js with AI Projects',
    image: '/certificates/pasted_image_1774350374502.png',
    issuer: 'Udemy',
    date: 'March 2026',
    description: 'Comprehensive course covering React, Next.js framework, and building AI-powered web applications with modern development practices.',
  },
];

const infoCards = [
  {
    icon: GraduationCap,
    label: 'Field',
    value: 'Computer Science',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Brain,
    label: 'Status',
    value: 'First-year Student',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    label: 'Goal',
    value: 'Full Stack Ai Engineer',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Karachi, Pakistan',
    color: 'from-orange-500 to-red-500',
  },
];

const techHighlights = [
  { name: 'Next.js', description: 'Automation workflows' },
  { name: 'Langchain', description: 'Automation workflows' },
  { name: 'SQL', description: 'Automation workflows' },
  { name: 'LangGraph', description: 'Multi-agent pipelines' },
  { name: 'OpenAI Agents SDK', description: 'AI agents' },
  { name: 'FastAPI', description: 'Backend APIs' },
  { name: 'Redis', description: 'Session management' },
  { name: 'n8n', description: 'Automation workflows' },
];

export default function AboutPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const bioParagraphs = portfolioData.personal.bio.split('\n\n');

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-bg" />

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Header */}
        <header className="relative z-50 sticky top-0 glass border-b border-border/50">
          <div className="container-portfolio py-4 flex items-center justify-between">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </motion.button>
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold gradient-text"
            >
              M<span className="text-primary">.U</span>
            </motion.h1>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 container-portfolio py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Get to know me</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Building intelligent systems that don&apos;t just work in notebooks — they run in production.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container-portfolio py-16">
        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="p-8 sm:p-10 rounded-3xl glass">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Who I Am</h2>
            </div>

            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              {bioParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border"
            >
              {techHighlights.map((tech, index) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                  title={tech.description}
                >
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Info Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {infoCards.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="p-6 rounded-2xl glass hover:glow-sm transition-all duration-300 cursor-default"
              >
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br',
                  item.color
                )}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificates Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              My <span className="gradient-text">Certificates</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Proof of continuous learning and professional growth
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCertificate(cert)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <div className="w-full h-full bg-muted/50 flex items-center justify-center p-2">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                        <ZoomIn className="w-4 h-4" />
                        <span>Click to preview</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="mt-4 font-medium text-center group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-primary text-center mt-1 font-medium">
                  {cert.issuer}
                </p>
                <p className="text-xs text-muted-foreground text-center mt-0.5">
                  {cert.date}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Course Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10 border border-primary/20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-purple-500/20 blur-2xl" />
            </div>

            <div className="relative flex items-start gap-5">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shrink-0 shadow-lg"
              >
                <Rocket className="w-7 h-7 text-white" />
              </motion.div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                    <span className="relative flex h-2 w-2 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Currently Learning
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">
                  Complete Data Science, Machine Learning, DL, NLP Bootcamp
                </h3>
                <p className="text-muted-foreground mb-4">
                  <span className="font-medium text-foreground">Instructors:</span> Krish Naik, KRISHAI Technologies Private
                </p>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-primary">In Progress</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '65%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] bg-card rounded-3xl overflow-hidden shadow-2xl border border-border flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full glass hover:bg-primary/10 transition-colors cursor-pointer group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Certificate Image - Centered and Straight */}
              <div className="flex-1 flex items-center justify-center p-8 bg-muted/20 min-h-0">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  style={{ imageOrientation: 'from-image' }}
                />
              </div>

              {/* Certificate Info */}
              <div className="p-6 border-t border-border bg-card shrink-0">
                <h3 className="text-xl font-semibold mb-1">{selectedCertificate.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {selectedCertificate.issuer}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedCertificate.date}
                  </span>
                </div>
                <p className="text-muted-foreground">{selectedCertificate.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative border-t border-border mt-12 py-10 bg-muted/20">
        <div className="container-portfolio text-center">
          <p className="text-lg font-medium gradient-text mb-2">
            M<span className="text-primary">.U</span>
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
