import React from 'react';
import { Mail, Linkedin, Github, Twitter, Send } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { Button } from './Button';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-surface pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Get In Touch" subtitle="Open to new opportunities and collaborations." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white">Let's Chat!</h3>
            <p className="text-xl text-slate-400 leading-relaxed">
              Whether you have a question about my stack, want to collaborate on a project, or just want to say hi, my inbox is always open.
            </p>
            
            <div className="space-y-6">
                <a href="mailto:kamaleshp.004@gmail.com" className="flex items-center space-x-4 group transition-colors">
                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Mail className="h-6 w-6" />
                    </div>
                    <span className="text-lg text-slate-300 group-hover:text-white transition-colors">kamaleshp.004@gmail.com</span>
                </a>
            </div>

            <div className="flex space-x-6 pt-6">
               {/* GitHub Link */}
               <a 
                 href="https://github.com/kamalesh574" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-slate-400 hover:text-white transition-transform hover:scale-110"
                 aria-label="GitHub Profile"
               >
                 <Github className="h-8 w-8" />
               </a>

               {/* LinkedIn Link - REPLACE with your actual profile URL */}
               <a 
                 href="https://www.linkedin.com/in/kamalesh-p-996300291/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-slate-400 hover:text-[#0A66C2] transition-transform hover:scale-110"
                 aria-label="LinkedIn Profile"
               >
                 <Linkedin className="h-8 w-8" />
               </a>

               {/* Twitter/X Link */}
               <a 
                 href="https://twitter.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-slate-400 hover:text-[#1DA1F2] transition-transform hover:scale-110"
                 aria-label="Twitter Profile"
               >
                 <Twitter className="h-8 w-8" />
               </a>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6 bg-background/50 p-8 rounded-2xl border border-slate-700/50 shadow-xl">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <Button variant="primary" className="w-full">
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
          </form>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Kamalesh. All rights reserved.</p>
          <p className="text-sm mt-2">Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};