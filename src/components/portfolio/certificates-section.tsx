'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ZoomIn, Award } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { CertificateModal } from '@/components/portfolio/certificate-modal';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import type { CertificateImage } from '@/types/portfolio';

export function CertificatesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState<CertificateImage | null>(null);
  const certificates = portfolioData.certificates;

  return (
    <section id="certificates" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(37, 99, 235, 0.06) 0%, transparent 50%)' }} />

      <div className="container-portfolio relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              border: '1px solid rgba(37, 99, 235, 0.2)',
              background: 'rgba(37, 99, 235, 0.08)',
              color: 'rgba(96, 165, 250, 0.9)',
            }}
          >
            Continuous Learning
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text-alt">Certificates</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Proof of continuous learning and professional growth
          </p>
        </motion.div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(cert)}
              className="group cursor-pointer"
            >
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  background: 'rgba(18, 18, 25, 0.4)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="w-full h-full bg-[#0a0a0f]/50 flex items-center justify-center p-2">
                  <ImageWithFallback
                    src={cert.image}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-center gap-2 text-sm font-medium" style={{ color: 'rgba(96, 165, 250, 0.9)' }}>
                      <ZoomIn className="w-4 h-4" />
                      <span>Click to preview</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="mt-4 font-medium text-center group-hover:text-transparent transition-all text-sm leading-tight text-white/80"
                style={{}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #60a5fa, #3b82f6)';
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
              <p className="text-xs text-center mt-0.5 text-white/30">
                {cert.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <CertificateModal certificate={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
