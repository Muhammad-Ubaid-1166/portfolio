'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { id: 'hero', label: 'Home', href: '/', isPage: false },
  { id: 'about', label: 'About', href: '/about', isPage: true },
  { id: 'skills', label: 'Skills', href: '/#skills', isPage: false },
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
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
            ? 'py-3 glass-glow' 
            : 'py-5 bg-transparent'
        )}
      >
        <nav className="container-portfolio flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.span
              className="text-xl font-bold cursor-pointer inline-block relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="gradient-text-animated">M</span>
              <span className="text-primary">.</span>
              <span className="gradient-text-animated">U</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {item.isPage ? (
                  <Link href={item.href}>
                    <motion.span
                      className={cn(
                        'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer inline-block nav-link',
                        pathname === item.href
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                ) : (
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer nav-link',
                      activeSection === item.id
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Chat Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setChatOpen(true)}
                className="hidden sm:flex gap-2 cursor-pointer btn-enhanced shimmer-button bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 border-0"
                size="sm"
              >
                <MessageCircle className="w-4 h-4" />
                Chat AI
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-40 md:hidden glass-glow border-b"
          >
            <nav className="container-portfolio py-4 flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.isPage ? (
                    <Link href={item.href}>
                      <motion.span
                        whileHover={{ x: 4 }}
                        className={cn(
                          'px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors cursor-pointer block',
                          pathname === item.href
                            ? 'text-primary bg-primary/10'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        )}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  ) : (
                    <motion.button
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ x: 4 }}
                      className={cn(
                        'px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors cursor-pointer w-full text-left',
                        activeSection === item.id
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      )}
                    >
                      {item.label}
                    </motion.button>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-2"
              >
                <Button
                  onClick={() => {
                    setChatOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full gap-2 cursor-pointer btn-enhanced bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 border-0"
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
