'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Calendar } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import type { CertificateImage } from '@/types/portfolio';

interface CertificateModalProps {
  certificate: CertificateImage | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(10, 10, 15, 0.98)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{
              background: 'rgba(18, 18, 25, 0.95)',
              border: '1px solid rgba(37, 99, 235, 0.15)',
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-3 rounded-full cursor-pointer group"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <X className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors" />
            </button>

            <div className="flex-1 flex items-center justify-center p-8 min-h-0" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <ImageWithFallback
                src={certificate.image}
                alt={certificate.title}
                className="max-w-full max-h-full object-contain rounded-lg"
                containerClassName="max-w-full max-h-full"
              />
            </div>

            <div className="p-6 shrink-0" style={{ borderTop: '1px solid rgba(37, 99, 235, 0.1)' }}>
              <h3 className="text-xl font-semibold mb-1 text-white/90">{certificate.title}</h3>
              <div className="flex flex-wrap items-center gap-3 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" style={{ color: 'rgba(96, 165, 250, 0.7)' }} />
                  {certificate.issuer}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" style={{ color: 'rgba(96, 165, 250, 0.7)' }} />
                  {certificate.date}
                </span>
              </div>
              <p className="text-white/50">{certificate.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
