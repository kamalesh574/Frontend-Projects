import React from 'react';
import { SectionTitle } from './SectionTitle';
import { SKILL_CATEGORIES } from '../constants';
import { SkillCategory, SkillItem } from '../types';
import { Globe, Database, Cpu, Box, Monitor, Terminal, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const getSkillIcon = (skillName: string) => {
  const name = skillName.toLowerCase();
  
  // Icon mapping logic
  if (name.includes('java') && !name.includes('script')) return <i className="devicon-java-plain text-5xl group-hover:text-[#f89820] transition-colors duration-300"></i>;
  if (name.includes('python')) return <i className="devicon-python-plain text-5xl group-hover:text-[#3776ab] transition-colors duration-300"></i>;
  if (name.includes('spring')) return <i className="devicon-spring-original text-5xl group-hover:text-[#6db33f] transition-colors duration-300"></i>;
  if (name.includes('html')) return <i className="devicon-html5-plain text-5xl group-hover:text-[#e34f26] transition-colors duration-300"></i>;
  if (name.includes('css')) return <i className="devicon-css3-plain text-5xl group-hover:text-[#1572b6] transition-colors duration-300"></i>;
  if (name.includes('javascript')) return <i className="devicon-javascript-plain text-5xl group-hover:text-[#f7df1e] transition-colors duration-300"></i>;
  if (name.includes('react')) return <i className="devicon-react-original text-5xl group-hover:text-[#61DAFB] transition-colors duration-300"></i>;
  if (name.includes('mysql')) return <i className="devicon-mysql-plain text-5xl group-hover:text-[#00758f] transition-colors duration-300"></i>;
  if (name.includes('mongo')) return <i className="devicon-mongodb-plain text-5xl group-hover:text-[#47a248] transition-colors duration-300"></i>;
  if (name.includes('git')) return <i className="devicon-git-plain text-5xl group-hover:text-[#f05032] transition-colors duration-300"></i>;
  if (name.includes('postman')) return <i className="devicon-postman-plain text-5xl group-hover:text-[#ff6c37] transition-colors duration-300"></i>;
  if (name.includes('redis')) return <i className="devicon-redis-plain text-5xl group-hover:text-[#d82c20] transition-colors duration-300"></i>;
  if (name.includes('docker')) return <i className="devicon-docker-plain text-5xl group-hover:text-[#2496ed] transition-colors duration-300"></i>;
  if (name.includes('vs code')) return <i className="devicon-vscode-plain text-5xl group-hover:text-[#007acc] transition-colors duration-300"></i>;
  
  // Lucide icons
  const iconClass = "w-12 h-12 text-slate-400 group-hover:text-primary transition-colors duration-300";
  if (name.includes('rest')) return <Globe className={iconClass} />;
  if (name.includes('jdbc')) return <Database className={iconClass} />;
  if (name.includes('dsa')) return <Cpu className={iconClass} />;
  if (name.includes('oop')) return <Box className={iconClass} />;
  if (name.includes('dbms')) return <Layers className={iconClass} />;
  if (name.includes('os')) return <Monitor className={iconClass} />;
  
  return <Terminal className={iconClass} />;
};

const SkillTile: React.FC<{ skill: SkillItem; index: number }> = ({ skill, index }) => {
  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center gap-4 border border-slate-700/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] overflow-hidden">
        {/* Hover Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="relative z-10 text-slate-400 group-hover:scale-110 transition-transform duration-300">
            {getSkillIcon(skill.name)}
        </div>
        
        <h4 className="relative z-10 text-lg font-semibold text-slate-300 group-hover:text-white transition-colors">
            {skill.name}
        </h4>
    </div>
  );
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[20%] left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="Technical Arsenal" subtitle="A curated stack of technologies I use to build performant and scalable systems." />
        
        <div className="space-y-16">
            {SKILL_CATEGORIES.map((category, catIndex) => (
                <ScrollReveal key={category.title} delay={catIndex * 100}>
                    <div className="relative">
                        {/* Category Title with Line */}
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-2xl font-bold text-white whitespace-nowrap">{category.title}</h3>
                            <div className="h-[1px] w-full bg-gradient-to-r from-slate-700 to-transparent"></div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {category.skills.map((skill, index) => (
                                <SkillTile key={skill.name} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            ))}
        </div>
      </div>
    </section>
  );
};