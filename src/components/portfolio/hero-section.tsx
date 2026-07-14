'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ArrowDown, Github, Mail, Sparkles, Zap, BrainCircuit, Layers, Cpu, Globe } from 'lucide-react';
import { useParticleField } from '@/lib/particles';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';
import { usePortfolioStore } from '@/lib/store';

const roles = [
  'AI Agent Developer',
  'Backend Engineer',
  'ML Enthusiast',
  'CS Student → Builder',
];

function GridOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

const floatingTags = [
  { label: 'LangGraph', icon: BrainCircuit, pos: 'top-[20%] left-[6%]', delay: 0, color: '#2563eb' },
  { label: 'FastAPI', icon: Zap, pos: 'top-[28%] right-[7%]', delay: 0.6, color: '#3b82f6' },
  { label: 'Streamlit', icon: Globe, pos: 'bottom-[28%] left-[5%]', delay: 1.2, color: '#06b6d4' },
  { label: 'Next.js', icon: Layers, pos: 'bottom-[20%] right-[6%]', delay: 0.3, color: '#10b981' },
];

function FloatingTag({ label, icon: Icon, pos, delay, color, style }: { label: string; icon: React.ElementType; pos: string; delay: number; color: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0.5, 0.8, 0.5], y: [0, -8, 0] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute ${pos} hidden lg:flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm text-xs font-semibold tracking-wide`}
      style={{
        border: `1px solid ${color}33`,
        background: `${color}0d`,
        color: color,
        boxShadow: `0 0 20px ${color}1a`,
        ...style,
      }}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </motion.div>
  );
}

function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
      style={{
        border: '1px solid rgba(37, 99, 235, 0.25)',
        background: 'rgba(37, 99, 235, 0.08)',
        boxShadow: '0 0 30px rgba(37, 99, 235, 0.08)',
      }}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400" />
      </span>
      <span className="text-xs font-semibold tracking-widest uppercase text-blue-300/90">
        {portfolioData.personal.status} · {portfolioData.personal.field}
      </span>
    </motion.div>
  );
}

function useTypingEffect(items: string[]) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const charRef = useRef(0);

  useEffect(() => {
    const current = items[roleIndex];
    if (!isDeleting) charRef.current = 0;
    let timer: NodeJS.Timeout;
    const tick = () => {
      if (!isDeleting) {
        if (charRef.current < current.length) {
          charRef.current++;
          setDisplayed(current.slice(0, charRef.current));
          timer = setTimeout(tick, 80);
        } else {
          timer = setTimeout(() => { setIsDeleting(true); tick(); }, 2200);
        }
      } else {
        if (charRef.current > 0) {
          charRef.current--;
          setDisplayed(current.slice(0, charRef.current));
          timer = setTimeout(tick, 45);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % items.length);
        }
      }
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [roleIndex, isDeleting, items]);
  return displayed;
}

export function HeroSection() {
  const displayedRole = useTypingEffect(roles);
  const { setChatOpen } = usePortfolioStore();
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleField(canvasRef);
  const { scrollY } = useScroll();
  const tagParallax = useTransform(scrollY, [0, 500], [0, -60]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Muhammad-Ubaid-1166', label: 'GitHub' },
    { icon: Mail, href: 'mailto:chubaid224@gmail.com', label: 'Email' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />
      <GridOverlay />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f] z-[1]" />

      {floatingTags.map((t) => (<FloatingTag key={t.label} {...t} style={{ y: tagParallax }} />))}

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <StatusBadge />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight leading-none">
            <span className="text-white/90">Hi, I&apos;m </span>
            <span className="gradient-text">{portfolioData.personal.name}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-mono mb-6 h-12 flex items-center justify-center gap-1"
        >
          <span className="text-blue-400/90">&gt;&nbsp;</span>
          <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {displayedRole}
          </span>
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block w-[2px] h-7 bg-blue-400 rounded-full ml-0.5" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {portfolioData.personal.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {(portfolioData.personal.specializations ?? []).map((spec: string, i: number) => (
            <motion.span
              key={spec}
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.35 }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide cursor-default"
              style={{
                border: '1px solid rgba(37, 99, 235, 0.2)',
                background: 'rgba(37, 99, 235, 0.06)',
                color: 'rgba(37, 99, 235, 0.8)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.4)';
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.12)';
                e.currentTarget.style.color = 'rgba(96, 165, 250, 1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.2)';
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.06)';
                e.currentTarget.style.color = 'rgba(37, 99, 235, 0.8)';
              }}
            >
              {spec}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Button
              size="lg"
              onClick={() => scrollTo('contact')}
              className="px-8 font-semibold text-sm tracking-wide border-0 text-white relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
            >
              <span className="relative z-10">Contact Me</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }} />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setChatOpen(true)}
              className="px-8 font-semibold text-sm tracking-wide bg-transparent relative overflow-hidden group"
              style={{
                border: '1px solid rgba(37, 99, 235, 0.3)',
                color: 'rgba(96, 165, 250, 0.9)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.5)';
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.3)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Chat with AI
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-3"
        >
          {socialLinks.map((s, i) => (
            <motion.a
              key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.08, type: 'spring', stiffness: 220 }}
              whileHover={{ scale: 1.12, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-lg cursor-pointer"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.3)';
                e.currentTarget.style.background = 'rgba(37, 99, 235, 0.08)';
                e.currentTarget.style.color = 'rgba(96, 165, 250, 0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
              }}
              aria-label={s.label}
            >
              <s.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => scrollTo('skills')}
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 group-hover:text-blue-400/60 transition-colors">scroll</span>
          <div className="p-1.5 rounded border border-white/10 group-hover:border-blue-500/30 transition-colors">
            <ArrowDown className="w-3 h-3 text-white/25 group-hover:text-blue-400/60 transition-colors" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
