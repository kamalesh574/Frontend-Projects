import React from 'react';
import { SectionTitle } from './SectionTitle';
import { CERTIFICATIONS } from '../constants';
import { Certification } from '../types';
import { ExternalLink, Award, CheckCircle, Calendar } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const getCertIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('java') && !lowerTitle.includes('script')) return <i className="devicon-java-plain text-4xl text-[#f89820]"></i>;
  if (lowerTitle.includes('python')) return <i className="devicon-python-plain text-4xl text-[#3776ab]"></i>;
  if (lowerTitle.includes('spring')) return <i className="devicon-spring-original text-4xl text-[#6db33f]"></i>;
  if (lowerTitle.includes('javascript')) return <i className="devicon-javascript-plain text-4xl text-[#f7df1e]"></i>;
  if (lowerTitle.includes('react') || lowerTitle.includes('web')) return <i className="devicon-react-original text-4xl text-[#61DAFB]"></i>;
  return <Award className="w-10 h-10 text-primary" />;
};

const CertificationCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => (
  <ScrollReveal delay={index * 100}>
    <div className="group relative bg-surface/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 h-full flex flex-col overflow-hidden">
      
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Header with Icon and Badge */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 group-hover:border-primary/30 transition-colors shadow-lg">
           {getCertIcon(cert.title)}
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs font-semibold text-green-500 tracking-wide">
           <CheckCircle size={14} />
           <span>Verified</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors leading-tight">
            {cert.title}
          </h3>
          <p className="text-slate-400 text-sm font-medium mb-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            {cert.issuer}
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-6">
            <Calendar size={12} />
            <span>Issued {cert.date}</span>
          </div>
      </div>

      {/* Tags & Action */}
      <div className="relative z-10 mt-auto pt-4 border-t border-slate-700/50 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
            {cert.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-slate-800 text-slate-400 rounded-md border border-slate-700">
                    {tag}
                </span>
            ))}
        </div>
        
        <a 
          href={cert.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-800 text-sm font-semibold text-slate-300 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group-hover:border-transparent border border-slate-700"
        >
          View Credential <ExternalLink size={16} />
        </a>
      </div>
    </div>
  </ScrollReveal>
);

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 bg-background relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="Certifications" subtitle="Professional credentials and specialized training validating my technical expertise." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};