'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ArrowDown, Github, Mail, Linkedin, Terminal, BrainCircuit, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';
import { usePortfolioStore } from '@/lib/store';

// Updated roles to match Ubaid's real identity
const roles = [
  'AI Agent Developer',
  'Backend Engineer',
  'ML Enthusiast',
  'CS Student → Builder',
];

// ─── Grid + Scanline Background ──────────────────────────────────────────────
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#080b12]" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #4ade80 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Top-left corner accent lines */}
      <svg
        className="absolute top-0 left-0 w-72 h-72 opacity-20"
        viewBox="0 0 300 300"
        fill="none"
      >
        <line x1="0" y1="60" x2="300" y2="60" stroke="#4ade80" strokeWidth="0.5" />
        <line x1="0" y1="120" x2="300" y2="120" stroke="#4ade80" strokeWidth="0.5" />
        <line x1="60" y1="0" x2="60" y2="300" stroke="#4ade80" strokeWidth="0.5" />
        <line x1="120" y1="0" x2="120" y2="300" stroke="#4ade80" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="3" fill="#4ade80" />
        <circle cx="120" cy="60" r="3" fill="#4ade80" />
        <circle cx="60" cy="120" r="3" fill="#4ade80" />
      </svg>

      {/* Bottom-right mirror */}
      <svg
        className="absolute bottom-0 right-0 w-72 h-72 opacity-20 rotate-180"
        viewBox="0 0 300 300"
        fill="none"
      >
        <line x1="0" y1="60" x2="300" y2="60" stroke="#4ade80" strokeWidth="0.5" />
        <line x1="0" y1="120" x2="300" y2="120" stroke="#4ade80" strokeWidth="0.5" />
        <line x1="60" y1="0" x2="60" y2="300" stroke="#4ade80" strokeWidth="0.5" />
        <line x1="120" y1="0" x2="120" y2="300" stroke="#4ade80" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="3" fill="#4ade80" />
        <circle cx="120" cy="60" r="3" fill="#4ade80" />
        <circle cx="60" cy="120" r="3" fill="#4ade80" />
      </svg>

      {/* Green ambient glow — subtle, not overdone */}
      <div
        className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
        style={{ background: '#4ade80' }}
      />
      <div
        className="absolute bottom-[-10%] right-[15%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-8"
        style={{ background: '#22d3ee' }}
      />
    </div>
  );
}

// ─── Cursor-tracking magnetic glow ───────────────────────────────────────────
function MagneticGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0"
      css-var="true"
      aria-hidden
    >
      <div
        className="w-full h-full rounded-full opacity-[0.06] blur-[80px]"
        style={{ background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)' }}
      />
    </motion.div>
  );
}

// ─── Floating Tech Tags (replaces generic Sparkles icons) ────────────────────
const floatingTags = [
  { label: 'LangGraph', icon: BrainCircuit, pos: 'top-[22%] left-[8%]', delay: 0 },
  { label: 'FastAPI', icon: Layers, pos: 'top-[30%] right-[9%]', delay: 0.6 },
  { label: 'n8n', icon: Terminal, pos: 'bottom-[30%] left-[7%]', delay: 1.2 },
  { label: 'Docker', icon: Layers, pos: 'bottom-[22%] right-[8%]', delay: 0.3 },
];

function FloatingTag({
  label,
  icon: Icon,
  pos,
  delay,
}: {
  label: string;
  icon: React.ElementType;
  pos: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0.45, 0.7, 0.45], y: [0, -8, 0] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute ${pos} hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-green-500/20 bg-green-500/5 backdrop-blur-sm text-green-400/60 text-xs font-mono`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </motion.div>
  );
}

// ─── Terminal Status Badge ────────────────────────────────────────────────────
function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-md mb-8 border border-green-500/25 bg-green-500/8 font-mono"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
      </span>
      <span className="text-xs text-green-400/80 tracking-widest uppercase">
        {portfolioData.personal.status} &nbsp;·&nbsp; {portfolioData.personal.field}
      </span>
    </motion.div>
  );
}

// ─── Typing Animation ─────────────────────────────────────────────────────────
function useTypingEffect(items: string[]) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const charRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = items[roleIndex];
    if (!isDeleting) charRef.current = 0;

    const tick = () => {
      if (!isDeleting) {
        if (charRef.current < current.length) {
          charRef.current++;
          setDisplayed(current.slice(0, charRef.current));
          timerRef.current = setTimeout(tick, 80);
        } else {
          timerRef.current = setTimeout(() => {
            setIsDeleting(true);
            tick();
          }, 2200);
        }
      } else {
        if (charRef.current > 0) {
          charRef.current--;
          setDisplayed(current.slice(0, charRef.current));
          timerRef.current = setTimeout(tick, 45);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % items.length);
        }
      }
    };

    timerRef.current = setTimeout(tick, 400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [roleIndex, isDeleting, items]);

  return displayed;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function HeroSection() {
  const displayedRole = useTypingEffect(roles);
  const { setChatOpen } = usePortfolioStore();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Muhammad-Ubaid-1166',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/muhammad-ubaid',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:chubaid224@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GridBackground />
      <MagneticGlow />

      {/* Floating tech tags — replaces generic sparkle icons */}
      {floatingTags.map((t) => (
        <FloatingTag key={t.label} {...t} />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <StatusBadge />

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight leading-none"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span className="text-white/90">Hi, I&apos;m </span>
          <span
            className="relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #22d3ee 60%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {portfolioData.personal.name}
          </span>
        </motion.h1>

        {/* Typing Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-mono mb-6 h-12 flex items-center justify-center gap-1"
        >
          <span className="text-green-400/90">&gt;&nbsp;</span>
          <span className="text-green-300">{displayedRole}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-[2px] h-7 bg-green-400 rounded-full ml-0.5"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-base sm:text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed font-mono"
        >
          {portfolioData.personal.tagline ??
            "Building intelligent systems that don't just run in notebooks — they run in production."}
        </motion.p>

        {/* Specialization chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {(
            portfolioData.personal.specializations ?? [
              'Agentic AI',
              'FastAPI',
              'LangGraph',
              'Multi-Agent Systems',
              'Backend Engineering',
            ]
          ).map((spec: string, i: number) => (
            <motion.span
              key={spec}
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.35 }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="px-4 py-1.5 rounded-full text-xs font-mono tracking-wide border border-green-500/20 bg-green-500/8 text-green-400/80 hover:bg-green-500/15 hover:border-green-500/35 hover:text-green-300 transition-all duration-200 cursor-default"
            >
              {spec}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Button
              size="lg"
              className="px-8 font-mono text-sm tracking-wide border-0 text-black"
              style={{
                background: 'linear-gradient(135deg, #4ade80, #22d3ee)',
              }}
              onClick={() => scrollTo('contact')}
            >
              Contact Me
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setChatOpen(true)}
              className="px-8 font-mono text-sm tracking-wide border-green-500/25 text-green-400/80 hover:bg-green-500/8 hover:border-green-500/40 hover:text-green-300 bg-transparent"
            >
              <Terminal className="w-4 h-4 mr-2" />
              Chat with AI
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-3"
        >
          {socialLinks.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.08, type: 'spring', stiffness: 220 }}
              whileHover={{ scale: 1.12, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-lg border border-white/10 bg-white/4 hover:border-green-500/30 hover:bg-green-500/8 text-white/40 hover:text-green-400 transition-all duration-200"
              aria-label={s.label}
            >
              <s.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => scrollTo('skills')}
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 group-hover:text-green-400/60 transition-colors">
            scroll
          </span>
          <div className="p-1.5 rounded border border-white/10 group-hover:border-green-500/30 transition-colors">
            <ArrowDown className="w-3 h-3 text-white/25 group-hover:text-green-400/60 transition-colors" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
