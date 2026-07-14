'use client';

import { motion } from 'framer-motion';
import { Github, Mail, ArrowUp, FileText } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Muhammad-Ubaid-1166', label: 'GitHub' },
  { icon: Mail, href: 'mailto:chubaid224@gmail.com', label: 'Email' },
];

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Certificates', href: '/#certificates' },
  { label: 'Contact', href: '/#contact' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t mt-auto" style={{ borderColor: 'rgba(37, 99, 235, 0.1)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, #3b82f6, #06b6d4, transparent)' }} />

      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(37, 99, 235, 0.03), transparent)' }} />

      <div className="container-portfolio py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <motion.button
              onClick={scrollToTop}
              className="text-2xl font-bold cursor-pointer inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="gradient-text-animated">M</span>
              <span className="text-blue-400">.</span>
              <span className="gradient-text-animated">U</span>
            </motion.button>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              {portfolioData.personal.tagline}
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mt-4 text-xs font-medium"
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Available for opportunities
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>Navigate</h4>
            <div className="space-y-3">
              {footerLinks.map((item) => (
                <Link key={item.label} href={item.href}>
                  <motion.span
                    whileHover={{ x: 4 }}
                    className="block text-sm cursor-pointer nav-link"
                    style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(96, 165, 250, 0.9)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'; }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>Connect</h4>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-sm cursor-pointer group"
                  style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(96, 165, 250, 0.9)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'; }}
                >
                  <social.icon className="w-4 h-4" />
                  {social.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Resume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>Resume</h4>
            {portfolioData.personal.resume && (
              <motion.a
                href={portfolioData.personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                  color: 'white',
                }}
              >
                <FileText className="w-4 h-4" />
                Download CV
              </motion.a>
            )}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm mt-3 cursor-pointer border-0"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.4)',
              }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </motion.button>
          </motion.div>
        </div>

        <div className="my-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)' }} />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm"
            style={{ color: 'rgba(255, 255, 255, 0.3)' }}
          >
            © {currentYear} {portfolioData.personal.name}. All rights reserved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm"
            style={{ color: 'rgba(255, 255, 255, 0.3)' }}
          >
            Built with Next.js
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
