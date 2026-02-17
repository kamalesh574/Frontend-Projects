import React from 'react';
import { SectionTitle } from './SectionTitle';
import { PROFILE_URLS } from '../constants';
import { Activity, Terminal, RefreshCw, Code2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const CodingProfiles: React.FC = () => {
  return (
    <section id="stats" className="py-20 bg-surface/50 relative border-t border-b border-white/5">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Live Coding Dashboard" subtitle="Real-time metrics tracking my problem-solving journey." />
        
        <ScrollReveal>
            {/* Dashboard Container */}
            <div className="w-full mx-auto bg-[#0d1117] rounded-xl border border-slate-700 shadow-2xl overflow-hidden relative group">
                
                {/* --- HEADER BAR MODIFICATIONS START --- */}
                {/* Increased vertical padding (py-4) and text size */}
                <div className="bg-slate-800/90 backdrop-blur-md px-6 py-4 border-b border-slate-700 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        {/* Increased Dots Size */}
                        <div className="flex gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-500/90 shadow-sm"></div>
                            <div className="w-4 h-4 rounded-full bg-yellow-500/90 shadow-sm"></div>
                            <div className="w-4 h-4 rounded-full bg-green-500/90 shadow-sm"></div>
                        </div>
                        {/* Increased Text and Icon Size */}
                        <div className="ml-2 flex items-center gap-3 px-4 py-1.5 bg-black/40 rounded-md text-sm text-slate-300 font-mono border border-white/10 shadow-inner">
                            <Terminal size={16} className="text-slate-400" />
                            <span className="tracking-wide">kamalesh@dev-dashboard:~</span>
                        </div>
                    </div>
                    
                    {/* Increased Status Text Size */}
                    <div className="flex items-center gap-2.5 text-sm font-bold text-primary font-mono animate-pulse">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                        SYSTEM ONLINE
                    </div>
                </div>
                {/* --- HEADER BAR MODIFICATIONS END --- */}

                {/* Dashboard Content */}
                <div className="p-6 md:p-8 flex flex-col gap-6 relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100">
                    
                    {/* GitHub Panel */}
                    <div className="relative rounded-xl bg-[#0f172a]/80 border border-slate-700/50 p-5 hover:border-primary/30 transition-all duration-300 w-full shadow-lg">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
                            <h3 className="text-base md:text-lg font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
                                <Activity size={18} className="text-green-500" /> GitHub Activity
                            </h3>
                            <span className="text-[10px] text-slate-500 font-mono bg-slate-800/50 px-2 py-0.5 rounded">ID: GH-574</span>
                        </div>
                        <div className="flex justify-center items-center min-h-[220px] md:min-h-[300px] w-full bg-[#0d1117]/50 rounded-lg p-2">
                            <img 
                                src={PROFILE_URLS.github} 
                                alt="GitHub Stats" 
                                className="w-full max-w-4xl h-auto object-contain filter drop-shadow-xl hover:scale-[1.01] transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* LeetCode Panel */}
                    <div className="relative rounded-xl bg-[#0f172a]/80 border border-slate-700/50 p-5 hover:border-primary/30 transition-all duration-300 w-full shadow-lg">
                         <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
                            <h3 className="text-base md:text-lg font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
                                <RefreshCw size={18} className="text-yellow-500" /> LeetCode Metrics
                            </h3>
                             <span className="text-[10px] text-slate-500 font-mono bg-slate-800/50 px-2 py-0.5 rounded">ID: LC-004</span>
                        </div>
                        <div className="flex justify-center items-center min-h-[220px] md:min-h-[300px] w-full bg-[#0d1117]/50 rounded-lg p-2">
                            <img 
                                src={PROFILE_URLS.leetcode} 
                                alt="LeetCode Stats" 
                                className="w-full max-w-4xl h-auto object-contain filter drop-shadow-xl hover:scale-[1.01] transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* GeeksForGeeks Panel */}
                    <div className="relative rounded-xl bg-[#0f172a]/80 border border-slate-700/50 p-5 hover:border-primary/30 transition-all duration-300 w-full shadow-lg">
                         <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
                            <h3 className="text-base md:text-lg font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
                                <Code2 size={18} className="text-green-600" /> GeeksForGeeks
                            </h3>
                             <span className="text-[10px] text-slate-500 font-mono bg-slate-800/50 px-2 py-0.5 rounded">ID: GFG-574</span>
                        </div>
                        <div className="flex justify-center items-center min-h-[220px] md:min-h-[300px] overflow-hidden w-full bg-[#0d1117]/50 rounded-lg p-2">
                            <img 
                                src={PROFILE_URLS.geeksforgeeks} 
                                alt="GeeksForGeeks Stats" 
                                className="w-full max-w-4xl h-auto object-contain filter drop-shadow-xl transform hover:scale-[1.01] transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                {/* Dashboard Footer */}
                <div className="bg-slate-900/80 px-4 py-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <div>CPU: 18% | MEM: 42% | NODES: 3</div>
                    <div>SYNCED: {new Date().toLocaleTimeString()}</div>
                </div>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};