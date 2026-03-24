'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';

const socialLinks = [
  { icon: Github, href: 'https://github.com/muhammad', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/muhammad', label: 'Twitter' },
  { icon: Mail, href: 'mailto:chubaid224@gmail.com', label: 'Email' },
];

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 mt-auto">
      {/* Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />

      <div className="container-portfolio py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <motion.button
              onClick={scrollToTop}
              className="text-2xl font-bold cursor-pointer inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="gradient-text-animated">M</span>
              <span className="text-violet-500">.</span>
              <span className="gradient-text-animated">U</span>
            </motion.button>
            <p className="text-sm text-muted-foreground mt-2">
              {portfolioData.personal.roleGoal}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-8"
          >
            {footerLinks.map((item, index) => (
              <Link key={item.label} href={item.href}>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="text-sm text-muted-foreground hover:text-violet-500 transition-colors cursor-pointer inline-block nav-link"
                >
                  {item.label}
                </motion.span>
              </Link>
            ))}
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center md:justify-end gap-3"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl glass hover:bg-violet-500/10 transition-all duration-300 glow-border"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border/50" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            © {currentYear} {portfolioData.personal.name}. All rights reserved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-muted-foreground flex items-center gap-1.5"
          >
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>{' '}
            using Next.js
          </motion.p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg cursor-pointer"
            style={{
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
