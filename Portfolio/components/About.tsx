import React from 'react';
import { SectionTitle } from './SectionTitle';
import { PERSONAL_INFO } from '../constants';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-surface/50 overflow-hidden">
      {/* Add custom keyframe for smooth floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="About Me" />
        
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
          
          {/* Profile Image Section */}
          <div className="w-full md:w-5/12 flex justify-center relative">
              {/* Abstract blurred background shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
              
              {/* Image Container with Floating Animation */}
              <div className="relative animate-float group">
                {/* Soft blue glow ring & Smooth shadow */}
                <div className="relative w-72 h-72 rounded-full p-1 bg-gradient-to-b from-blue-500/50 to-transparent shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)]">
                    {/* Inner Circle to mask image */}
                    <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-slate-900 bg-slate-800 relative">
                        <img 
                            src="/images/profile.png" 
                            alt={PERSONAL_INFO.name}
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
              </div>
          </div>
          
          {/* Text Content */}
          <div className="w-full md:w-7/12 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-white mb-6">
                Passionate about <span className="text-blue-400">Clean Code</span> & <span className="text-green-400">Performance</span>
            </h3>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light mb-8">
              {PERSONAL_INFO.about}
            </p>
            
            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto md:mx-0">
               {/* <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all shadow-lg hover:shadow-blue-500/10">
                  <h4 className="text-4xl font-extrabold text-white mb-1">1+</h4>
                  <p className="text-slate-400 font-medium uppercase tracking-wider text-xs">Years Coding</p>
               </div> */}
               <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-green-500/30 transition-all shadow-lg hover:shadow-green-500/10">
                  <h4 className="text-4xl font-extrabold text-white mb-1">4+</h4>
                  <p className="text-slate-400 font-medium uppercase tracking-wider text-xs">Projects Built</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};