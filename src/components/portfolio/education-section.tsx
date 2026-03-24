'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  GraduationCap, Award, Calendar, MapPin, 
  ExternalLink, CheckCircle2
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="section-padding relative bg-muted/30">
      <div className="container-portfolio">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and professional certifications
          </p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-3 gap-8">
          {/* Education */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Education
            </h3>

            <div className="space-y-6">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="relative pl-8 pb-8 last:pb-0"
                >
                  {/* Timeline Line */}
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  {index < portfolioData.education.length - 1 && (
                    <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-border" />
                  )}

                  <div className="p-6 rounded-2xl glass">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-lg font-semibold">{edu.institution}</h4>
                        <p className="text-primary font-medium">
                          {edu.degree} in {edu.field}
                        </p>
                      </div>
                      <Badge variant={edu.current ? 'default' : 'secondary'}>
                        {edu.current ? 'Current' : 'Completed'}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {edu.current ? (
                          <span>Started {edu.startDate}</span>
                        ) : (
                          <span>{edu.startDate} - {edu.endDate}</span>
                        )}
                      </div>
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                      )}
                      {edu.gpa && (
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>

                    {edu.description && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {edu.description}
                      </p>
                    )}

                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Achievements:</p>
                        <div className="flex flex-wrap gap-2">
                          {edu.achievements.map((achievement, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications & Experience */}
          <div className="space-y-8">
            {/* Certifications */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certifications
              </h3>

              <div className="space-y-4">
                {portfolioData.certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl glass"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Issued {cert.date}
                        </p>
                      </div>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience Preview */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                Experience
              </h3>

              <div className="space-y-4">
                {portfolioData.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-xl glass"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{exp.role}</h4>
                        <p className="text-sm text-primary">{exp.company}</p>
                      </div>
                      <Badge variant={exp.current ? 'default' : 'secondary'} className="shrink-0">
                        {exp.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {exp.current ? 'Present' : exp.endDate} • {exp.location}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
