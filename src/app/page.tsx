'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Navigation } from '@/components/portfolio/navigation';
import { HeroSection } from '@/components/portfolio/hero-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { CertificatesSection } from '@/components/portfolio/certificates-section';
import { ContactSection } from '@/components/portfolio/contact-section';
import { Footer } from '@/components/portfolio/footer';
import { ChatWidget } from '@/components/chat/chat-widget';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { usePortfolioStore } from '@/lib/store';

export default function PortfolioPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main className="relative min-h-screen flex flex-col page-fade-in">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Noise Overlay */}
      <div className="noise" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="flex-1">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* AI Chat Widget */}
      <ChatWidget />

      {/* Floating Chat Button (when closed) */}
      <FloatingChatButton />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll to Top Button - Positioned in the CENTER */}
      <ScrollToTopButton />
    </main>
  );
}

function FloatingChatButton() {
  const { isChatOpen, setChatOpen } = usePortfolioStore();

  if (isChatOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setChatOpen(true)}
      className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg flex items-center justify-center z-40 cursor-pointer"
      style={{
        boxShadow: '0 0 30px rgba(37, 99, 235, 0.4)',
      }}
      aria-label="Open chat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </motion.button>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full glass-glow text-foreground flex items-center justify-center z-40 cursor-pointer card-hover"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
