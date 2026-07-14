'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Mail, Phone, MapPin, Send, Github,
  Copy, Check, MessageCircle, X, Sparkles, Zap, AlertCircle, CheckCircle2
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { usePortfolioStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: portfolioData.personal.email,
    href: `mailto:${portfolioData.personal.email}`,
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: portfolioData.personal.phone || '+92 30112684971',
    href: `tel:${portfolioData.personal.phone || '+15551234567'}`,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: portfolioData.personal.location,
    color: 'from-amber-500 to-orange-500',
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();
  const { setChatOpen } = usePortfolioStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email' : '';
      case 'subject':
        return value.trim().length < 3 ? 'Subject must be at least 3 characters' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    toast({
      title: 'Copied!',
      description: `${label} copied to clipboard`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    toast({
      title: 'Form Cleared',
      description: 'All fields have been reset',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');
      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. I\'ll get back to you soon!',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)' }} />

      <div className="container-portfolio relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              border: '1px solid rgba(6, 182, 212, 0.2)',
              background: 'rgba(6, 182, 212, 0.08)',
              color: 'rgba(34, 211, 238, 0.9)',
            }}
          >
            Let&apos;s Connect
          </motion.span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>

          <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-6 text-white/90">
              Let&apos;s Connect
            </motion.h3>

            <motion.p variants={itemVariants} className="text-white/40 mb-10 leading-relaxed">
              I&apos;m always open to discussing new opportunities, interesting projects,
              or just having a chat about AI and technology.
            </motion.p>

            <div className="space-y-4 mb-10">
              {contactMethods.map((method) => (
                <motion.div key={method.label} variants={itemVariants} whileHover={{ x: 4 }}>
                  {method.href ? (
                    <a
                      href={method.href}
                      className="flex items-center gap-4 p-5 rounded-xl group cursor-pointer"
                      style={{
                        background: 'rgba(15, 15, 38, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={cn(
                          'w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg shrink-0',
                          method.color
                        )}
                      >
                        <method.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/40">{method.label}</p>
                        <p className="font-medium text-white/80 truncate">{method.value}</p>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); handleCopy(method.value, method.label); }}
                        className="p-2 rounded-lg shrink-0"
                        style={{ color: 'rgba(167, 139, 250, 0.6)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37, 99, 235, 0.1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        {copied === method.label ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </a>
                  ) : (
                    <div
                      className="flex items-center gap-4 p-5 rounded-xl group"
                      style={{
                        background: 'rgba(15, 15, 38, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={cn(
                          'w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg shrink-0',
                          method.color
                        )}
                      >
                        <method.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/40">{method.label}</p>
                        <p className="font-medium text-white/80">{method.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-medium text-white/40 mb-4">Follow Me</h4>
              <div className="flex gap-3">
                <motion.a
                  href="https://github.com/Muhammad-Ubaid-1166"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-xl cursor-pointer glow-border"
                  style={{
                    background: 'rgba(15, 15, 38, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: 'rgba(15, 15, 38, 0.4)',
                border: '1px solid rgba(37, 99, 235, 0.12)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(37, 99, 235, 0.05))' }} />
              <div className="relative flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
                >
                  <MessageCircle className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h4 className="font-semibold mb-2 text-white/90">Chat with AI Assistant</h4>
                  <p className="text-sm text-white/40 mb-4 leading-relaxed">
                    Want quick answers? Chat with my AI assistant who knows everything about me!
                  </p>
                  <Button
                    onClick={() => setChatOpen(true)}
                    size="sm"
                    className="border-0 text-white cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: 'rgba(15, 15, 38, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6, #06b6d4)' }} />

              <h3 className="text-2xl font-semibold mb-8 text-white/90">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div custom={0} variants={formFieldVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                    <label htmlFor="name" className="text-sm font-medium mb-2 block text-white/60">Name</label>
                    <div className="relative">
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => { setFocusedField(null); handleBlur('name'); }}
                        className={cn(
                          'input-glow transition-all duration-300 bg-white/5 border-white/10 text-white placeholder:text-white/30 pr-10',
                          focusedField === 'name' && 'ring-2 ring-blue-500/20',
                          touched.name && !errors.name && formData.name && 'border-emerald-500/50',
                          touched.name && errors.name && 'border-red-500/50'
                        )}
                        required
                      />
                      {touched.name && !errors.name && formData.name && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                      )}
                      {touched.name && errors.name && (
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                      )}
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-xs mt-1 text-red-400">{errors.name}</p>
                    )}
                  </motion.div>

                  <motion.div custom={1} variants={formFieldVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                    <label htmlFor="email" className="text-sm font-medium mb-2 block text-white/60">Email</label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => { setFocusedField(null); handleBlur('email'); }}
                        className={cn(
                          'input-glow transition-all duration-300 bg-white/5 border-white/10 text-white placeholder:text-white/30 pr-10',
                          focusedField === 'email' && 'ring-2 ring-blue-500/20',
                          touched.email && !errors.email && formData.email && 'border-emerald-500/50',
                          touched.email && errors.email && 'border-red-500/50'
                        )}
                        required
                      />
                      {touched.email && !errors.email && formData.email && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                      )}
                      {touched.email && errors.email && (
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                      )}
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-xs mt-1 text-red-400">{errors.email}</p>
                    )}
                  </motion.div>
                </div>

                <motion.div custom={2} variants={formFieldVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                  <label htmlFor="subject" className="text-sm font-medium mb-2 block text-white/60">Subject</label>
                  <div className="relative">
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => { setFocusedField(null); handleBlur('subject'); }}
                      className={cn(
                        'input-glow transition-all duration-300 bg-white/5 border-white/10 text-white placeholder:text-white/30 pr-10',
                        focusedField === 'subject' && 'ring-2 ring-blue-500/20',
                        touched.subject && !errors.subject && formData.subject && 'border-emerald-500/50',
                        touched.subject && errors.subject && 'border-red-500/50'
                      )}
                      required
                    />
                    {touched.subject && !errors.subject && formData.subject && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                    )}
                    {touched.subject && errors.subject && (
                      <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                    )}
                  </div>
                  {touched.subject && errors.subject && (
                    <p className="text-xs mt-1 text-red-400">{errors.subject}</p>
                  )}
                </motion.div>

                <motion.div custom={3} variants={formFieldVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                  <label htmlFor="message" className="text-sm font-medium mb-2 block text-white/60">Message</label>
                  <div className="relative">
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project or just say hi..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => { setFocusedField(null); handleBlur('message'); }}
                      className={cn(
                        'input-glow transition-all duration-300 resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30 pr-10',
                        focusedField === 'message' && 'ring-2 ring-blue-500/20',
                        touched.message && !errors.message && formData.message && 'border-emerald-500/50',
                        touched.message && errors.message && 'border-red-500/50'
                      )}
                      required
                    />
                    {touched.message && !errors.message && formData.message && (
                      <CheckCircle2 className="absolute right-3 top-3 w-4 h-4 text-emerald-400" />
                    )}
                    {touched.message && errors.message && (
                      <AlertCircle className="absolute right-3 top-3 w-4 h-4 text-red-400" />
                    )}
                  </div>
                  {touched.message && errors.message && (
                    <p className="text-xs mt-1 text-red-400">{errors.message}</p>
                  )}
                </motion.div>

                <motion.div custom={4} variants={formFieldVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="flex gap-3 pt-2">
                  <motion.div className="flex-1 relative group" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div className="absolute -inset-0.5 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }} />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="relative w-full border-0 text-white shimmer-button"
                      style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleClear}
                    disabled={isSubmitting}
                    className="px-6 cursor-pointer"
                    style={{ border: '1px solid rgba(37, 99, 235, 0.3)', color: 'rgba(167, 139, 250, 0.7)' }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
