'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Mail, Phone, MapPin, Send, Github, Twitter,
  Copy, Check, MessageCircle, X
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
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: portfolioData.personal.phone || '+92 30112684971',
    href: `tel:${portfolioData.personal.phone || '+15551234567'}`,
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: portfolioData.personal.location,
    color: 'from-cyan-500 to-blue-500',
  },
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/muhammad',
    username: '@muhammad',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/muhammad',
    username: '@muhammad',
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

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast({
        title: 'Message Sent!',
        description: 'Thank you for reaching out. I\'ll get back to you soon!',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      {/* Decorative gradient orbs */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container-portfolio relative z-10">
        {/* Section Header */}
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
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 mb-6"
          >
            Let&apos;s Connect
          </motion.span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Get In <span className="gradient-text-animated">Touch</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-semibold mb-6">
              Let&apos;s Connect
            </motion.h3>

            <motion.p variants={itemVariants} className="text-muted-foreground mb-10 leading-relaxed">
              I&apos;m always open to discussing new opportunities, interesting projects,
              or just having a chat about AI and technology. Feel free to reach out
              through any of the channels below!
            </motion.p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-10">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      className="flex items-center gap-4 p-5 rounded-xl glass card-hover group"
                    >
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={cn(
                          'w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg',
                          method.color
                        )}
                      >
                        <method.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{method.label}</p>
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-5 rounded-xl glass group">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={cn(
                          'w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg',
                          method.color
                        )}
                      >
                        <method.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{method.label}</p>
                        <p className="font-medium">{method.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-medium text-muted-foreground mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-xl glass card-hover glow-border"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Chat CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-10 p-6 rounded-2xl glass-glow relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5" />
              <div className="relative flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg"
                >
                  <MessageCircle className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h4 className="font-semibold mb-2">Chat with AI Assistant</h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Want quick answers? Chat with my AI assistant who knows everything about me!
                  </p>
                  <Button
                    onClick={() => setChatOpen(true)}
                    variant="secondary"
                    size="sm"
                    className="btn-enhanced cursor-pointer"
                  >
                    Start Chat
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl glass-glow relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500" />

              <h3 className="text-2xl font-semibold mb-8">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <motion.div
                    custom={0}
                    variants={formFieldVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                  >
                    <label htmlFor="name" className="text-sm font-medium mb-2 block">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        'input-glow transition-all duration-300',
                        focusedField === 'name' && 'ring-2 ring-cyan-500/20'
                      )}
                      required
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    custom={1}
                    variants={formFieldVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                  >
                    <label htmlFor="email" className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        'input-glow transition-all duration-300',
                        focusedField === 'email' && 'ring-2 ring-cyan-500/20'
                      )}
                      required
                    />
                  </motion.div>
                </div>

                {/* Subject Field */}
                <motion.div
                  custom={2}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <label htmlFor="subject" className="text-sm font-medium mb-2 block">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      'input-glow transition-all duration-300',
                      focusedField === 'subject' && 'ring-2 ring-cyan-500/20'
                    )}
                    required
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  custom={3}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <label htmlFor="message" className="text-sm font-medium mb-2 block">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or just say hi..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      'input-glow transition-all duration-300 resize-none',
                      focusedField === 'message' && 'ring-2 ring-cyan-500/20'
                    )}
                    required
                  />
                </motion.div>

                {/* Buttons */}
                <motion.div
                  custom={4}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="flex gap-3 pt-2"
                >
                  <motion.div
                    className="flex-1 relative group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="relative w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 border-0 shimmer-button"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
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
                    className="px-6 border-violet-500/30 hover:bg-violet-500/10 hover:border-violet-500/50"
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
