import React from 'react';
import { SectionTitle } from './SectionTitle';
import { PROJECTS, PERSONAL_INFO } from '../constants';
import { Project } from '../types';
import { FolderGit2, Github, ExternalLink, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Button } from './Button';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <ScrollReveal delay={index * 100}>
    <div className="bg-surface rounded-xl overflow-hidden shadow-lg border border-slate-700/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 flex flex-col h-full group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="p-8 flex-1 relative z-10">
        <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                <FolderGit2 className="h-8 w-8 text-primary" />
            </div>
            
            <div className="flex gap-4">
                {/* Source Code Link */}
                <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-500 hover:text-white transition-colors tooltip"
                    title="View Source Code"
                >
                    <Github className="h-6 w-6" />
                </a>
                
                {/* Live Demo Link */}
                {project.demoLink && (
                    <a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-500 hover:text-primary transition-colors"
                        title="View Live Demo"
                    >
                        <ExternalLink className="h-6 w-6" />
                    </a>
                )}
            </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
            {project.title}
        </h3>
        
        <p className="text-slate-400 text-lg leading-relaxed mb-6">
            {project.description}
        </p>
        </div>
        
        <div className="px-8 pb-8 pt-0 mt-auto relative z-10">
            <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                <span 
                    key={tech} 
                    className="px-3 py-1 bg-slate-800 text-primary text-sm font-medium rounded-full border border-slate-700/50"
                >
                    {tech}
                </span>
                ))}
            </div>

            <div className="flex gap-3">
                 <a 
                    href={project.demoLink || '#'} 
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold border border-primary/20 hover:bg-primary hover:text-background transition-all duration-300"
                 >
                    <ExternalLink size={18} /> View Demo
                 </a>
                 <a 
                    href={project.link || '#'} 
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-semibold border border-slate-700 hover:bg-slate-700 hover:text-white transition-all duration-300"
                 >
                    <Github size={18} /> Code
                 </a>
            </div>
        </div>
    </div>
  </ScrollReveal>
);

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-background relative">
       {/* Background Decoration */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[5%] w-72 h-72 bg-blue-500/5 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-[20%] right-[5%] w-72 h-72 bg-green-500/5 rounded-full blur-[80px]"></div>
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="Featured Projects" subtitle="A collection of backend systems and APIs I've architected and deployed." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View More Projects Button */}
        <div className="flex justify-center">
            <Button 
                href={`https://github.com/kamalesh574?tab=repositories`} 
                variant="outline" 
                className="px-8 py-4 text-lg border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-white transition-all"
                target="_blank"
                rel="noopener noreferrer"
            >
                View More Projects on GitHub <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
      </div>
    </section>
  );
};