'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, MessageCircle, Sparkles, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const navItems = [
  { id: 'hero', label: 'Home', href: '/', isPage: false },
  { id: 'about', label: 'About', href: '/about', isPage: true },
  { id: 'skills', label: 'Skills', href: '/#skills', isPage: false },
  { id: 'projects', label: 'Projects', href: '/#projects', isPage: false },
  { id: 'certificates', label: 'Certificates', href: '/#certificates', isPage: false },
  { id: 'contact', label: 'Contact', href: '/#contact', isPage: false },
];

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);
  return mounted;
}

export function Navigation() {
  const mounted = useMounted();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobileMenuOpen, setMobileMenuOpen, setChatOpen, activeSection } = usePortfolioStore();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const handleScroll = useCallback(() => { setIsScrolled(window.scrollY > 50); }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const sectionIds = ['hero', 'skills', 'projects', 'certificates', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            usePortfolioStore.getState().setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
    setMobileMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'py-3'
            : 'py-5 bg-transparent'
        )}
        style={isScrolled ? {
          background: 'rgba(8, 8, 22, 0.7)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(37, 99, 235, 0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        } : {}}
      >
        <nav className="container-portfolio flex items-center justify-between">
          <Link href="/">
            <motion.span
              className="text-xl font-bold cursor-pointer inline-block relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="gradient-text-animated">M</span>
              <span className="text-blue-400">.</span>
              <span className="gradient-text-animated">U</span>
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-1 relative">
            {navItems.map((item, index) => {
              const isActive = item.isPage ? pathname === item.href : activeSection === item.id;
              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} className="relative">
                  {item.isPage ? (
                    <Link href={item.href}>
                      <motion.span
                        className={cn(
                          'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer inline-block',
                          isActive ? 'text-blue-300' : 'text-white/50 hover:text-white/80'
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                        {isActive && (
                          <motion.div
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-lg -z-10"
                            style={{ background: 'rgba(37, 99, 235, 0.12)' }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </motion.span>
                    </Link>
                  ) : (
                    <motion.button
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer',
                        isActive ? 'text-blue-300' : 'text-white/50 hover:text-white/80'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-lg -z-10"
                          style={{ background: 'rgba(37, 99, 235, 0.12)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl cursor-pointer transition-colors text-white/50 hover:text-white/80 hover:bg-white/5"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setChatOpen(true)}
                className="hidden sm:flex gap-2 cursor-pointer border-0 text-white relative overflow-hidden group"
                size="sm"
                style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
              >
                <Sparkles className="w-4 h-4" />
                Chat AI
              </Button>
            </motion.div>

            <motion.button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl transition-colors cursor-pointer text-white/60 hover:text-white/90"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
            style={{
              background: 'rgba(8, 8, 22, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(37, 99, 235, 0.1)',
            }}
          >
            <nav className="container-portfolio py-4 flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  {item.isPage ? (
                    <Link href={item.href}>
                      <motion.span
                        whileHover={{ x: 4 }}
                        className={cn(
                          'px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors cursor-pointer block',
                          pathname === item.href
                            ? 'text-blue-300'
                            : 'text-white/50 hover:text-white/80'
                        )}
                        style={pathname === item.href ? { background: 'rgba(37, 99, 235, 0.1)' } : {}}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  ) : (
                    <motion.button
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ x: 4 }}
                      className={cn(
                        'px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors cursor-pointer w-full',
                        activeSection === item.id
                          ? 'text-blue-300'
                          : 'text-white/50 hover:text-white/80'
                      )}
                      style={activeSection === item.id ? { background: 'rgba(37, 99, 235, 0.1)' } : {}}
                    >
                      {item.label}
                    </motion.button>
                  )}
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navItems.length * 0.05 }} className="pt-2">
                <Button
                  onClick={() => { setChatOpen(true); setMobileMenuOpen(false); }}
                  className="w-full gap-2 cursor-pointer border-0 text-white"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with AI
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
