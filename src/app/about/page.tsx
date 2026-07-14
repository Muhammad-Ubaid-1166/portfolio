'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { ArrowLeft, ZoomIn, Sparkles, Code2, Rocket, Brain, MapPin, Target, GraduationCap } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CertificateModal } from '@/components/portfolio/certificate-modal';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import type { CertificateImage } from '@/types/portfolio';

const infoCards = [
  { icon: GraduationCap, label: 'Field', value: 'Computer Science', color: 'from-blue-600 to-blue-400' },
  { icon: Brain, label: 'Status', value: 'First-year Student', color: 'from-cyan-500 to-blue-500' },
  { icon: Target, label: 'Goal', value: 'Full Stack AI Engineer', color: 'from-amber-500 to-orange-500' },
  { icon: MapPin, label: 'Location', value: 'Karachi, Pakistan', color: 'from-emerald-500 to-teal-500' },
];

const techHighlights = [
  { name: 'Next.js', description: 'React framework' },
  { name: 'LangChain', description: 'LLM framework' },
  { name: 'LangGraph', description: 'Multi-agent pipelines' },
  { name: 'OpenAI Agents SDK', description: 'AI agents' },
  { name: 'FastAPI', description: 'Backend APIs' },
  { name: 'Streamlit', description: 'ML apps' },
  { name: 'Redis', description: 'Session management' },
  { name: 'n8n', description: 'Automation workflows' },
];

function GradientOrb({ className, size, color }: { className?: string; size: number; color: string }) {
  return (
    <motion.div
      className={cn('absolute rounded-full blur-3xl pointer-events-none', className)}
      style={{ width: size, height: size, background: color }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function AboutPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateImage | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const bioParagraphs = portfolioData.personal.bio.split('\n\n');

  return (
    <main className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <div ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0"         style={{ background: 'linear-gradient(-45deg, #0a0a0f, #121219, #1a1a2e, #0d0d14)', backgroundSize: '400% 400%' }} />

        <GradientOrb className="absolute top-0 left-1/4" size={400} color="#2563eb" />
        <GradientOrb className="absolute bottom-0 right-1/4" size={300} color="#3b82f6" />
        <GradientOrb className="absolute top-1/2 right-10" size={250} color="#06b6d4" />

        <header className="relative z-50 sticky top-0" style={{ background: 'rgba(10, 10, 15, 0.7)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(37, 99, 235, 0.1)' }}>
          <div className="container-portfolio py-4 flex items-center justify-between">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 cursor-pointer group"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hover:text-white/80 transition-colors">Back to Home</span>
              </motion.button>
            </Link>
            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-xl font-bold gradient-text">
              M<span className="text-blue-400">.U</span>
            </motion.h1>
          </div>
        </header>

        <div className="relative z-10 container-portfolio py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                border: '1px solid rgba(37, 99, 235, 0.2)',
                background: 'rgba(37, 99, 235, 0.08)',
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: 'rgba(96, 165, 250, 0.8)' }} />
              <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Get to know me</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h1>

            <p className="text-lg sm:text-xl max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Building intelligent systems that don&apos;t just work in notebooks — they run in production.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-portfolio py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div
            className="p-8 sm:p-10 rounded-3xl"
            style={{
              background: 'rgba(15, 15, 38, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}>
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white/90">Who I Am</h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {bioParagraphs.map((paragraph, index) => (
                <motion.p key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mt-8 pt-8"
              style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
            >
              {techHighlights.map((tech, index) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-full text-sm font-medium cursor-default transition-colors"
                  style={{
                    background: 'rgba(37, 99, 235, 0.08)',
                    color: 'rgba(96, 165, 250, 0.8)',
                    border: '1px solid rgba(37, 99, 235, 0.12)',
                  }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

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
                className="p-6 rounded-2xl cursor-default transition-all duration-300"
                style={{
                  background: 'rgba(15, 15, 38, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br shadow-lg', item.color)}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>{item.label}</p>
                <p className="font-medium text-white/80">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              My <span className="gradient-text-alt">Certificates</span>
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Proof of continuous learning and professional growth
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.certificates.map((cert, index) => (
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
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    background: 'rgba(15, 15, 38, 0.4)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="w-full h-full bg-[#0a0a1a]/50 flex items-center justify-center p-2">
                    <ImageWithFallback
                      src={cert.image}
                      alt={cert.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080816]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: 'rgba(96, 165, 250, 0.9)' }}>
                        <ZoomIn className="w-4 h-4" />
                        <span>Click to preview</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="mt-4 font-medium text-center group-hover:text-transparent transition-all text-sm leading-tight text-white/80"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #a78bfa, #f472b6)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.webkitBackgroundClip = 'unset';
                    e.currentTarget.style.webkitTextFillColor = 'rgba(255,255,255,0.8)';
                  }}
                >
                  {cert.title}
                </h3>
                <p className="text-xs text-center mt-1 font-medium" style={{ color: 'rgba(96, 165, 250, 0.7)' }}>
                  {cert.issuer}
                </p>
                <p className="text-xs text-center mt-0.5" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>
                  {cert.date}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative p-8 rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(236, 72, 153, 0.04), rgba(6, 182, 212, 0.06))',
              border: '1px solid rgba(37, 99, 235, 0.15)',
            }}
          >
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl" style={{ background: 'rgba(37, 99, 235, 0.2)' }} />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-2xl" style={{ background: 'rgba(236, 72, 153, 0.2)' }} />
            </div>

            <div className="relative flex items-start gap-5">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
              >
                <Rocket className="w-7 h-7 text-white" />
              </motion.div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#34d399',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                    }}
                  >
                    <span className="relative flex h-2 w-2 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    Currently Learning
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white/90">
                  Complete Data Science, Machine Learning, DL, NLP Bootcamp
                </h3>
                <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  <span className="font-medium text-white/70">Instructors:</span> Krish Naik, KRISHAI Technologies Private
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Progress</span>
                    <span className="font-medium" style={{ color: 'rgba(96, 165, 250, 0.9)' }}>In Progress</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '65%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />

      <footer className="relative border-t" style={{ borderColor: 'rgba(37, 99, 235, 0.1)', marginTop: '3rem', padding: '2.5rem 0' }}>
        <div className="container-portfolio text-center">
          <p className="text-lg font-medium gradient-text mb-2">M<span className="text-blue-400">.U</span></p>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>
            © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
