import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout, Zap, Shield, BarChart3, ArrowRight, CheckCircle2, Layers, MousePointer2 } from 'lucide-react';
  import { Mail, MapPin, Github, Linkedin } from 'lucide-react';
export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Layout className="text-white" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-800 dark:text-white">TaskFlow<span className="text-indigo-600">Pro</span></span>
        </div>
        <button
          onClick={() => navigate('/boards')}
          className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:scale-105 transition-all active:scale-95"
        >
          Launch App
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100 dark:border-indigo-900/30"
          >
            <Zap size={14} />
            The Future of Productivity
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.9]"
          >
            Organize. Prioritize.<br />
            <span className="text-indigo-600">Execute.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400 mb-12"
          >
            A professional, production-grade Kanban board designed for high-performance teams. 
            Experience seamless drag-and-drop, advanced analytics, and offline-first persistence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate('/boards')}
              className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              Get Started for Free
              <ArrowRight size={20} />
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              View Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-8 bg-slate-100/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MousePointer2, title: 'Fluid Drag & Drop', desc: 'Smooth, animated task movement with intelligent collision detection powered by @dnd-kit.' },
              { icon: BarChart3, title: 'Advanced Analytics', desc: 'Track your productivity with beautiful, interactive charts and real-time performance metrics.' },
              { icon: Shield, title: 'Offline Persistence', desc: 'Your data stays with you. Everything is saved locally in your browser for instant access anywhere.' },
              { icon: Layers, title: 'Multi-Board Support', desc: 'Manage multiple projects simultaneously with dedicated boards and custom workflows.' },
              { icon: CheckCircle2, title: 'Task Details', desc: 'Rich task management with priorities, labels, checklists, and due dates.' },
              { icon: Zap, title: 'Blazing Fast', desc: 'Built with Vite and React 18 for an ultra-responsive experience that never slows you down.' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    

{/* Footer */}
<footer className="py-20 px-8 border-t border-slate-200 dark:border-slate-800">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
      {/* Brand Section */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Layout className="text-white" size={18} />
        </div>
        <span className="text-lg font-black tracking-tighter text-slate-800 dark:text-white">
          TaskFlow<span className="text-indigo-600">Pro</span>
        </span>
      </div>

      {/* Center Copyright */}
      <div className="text-center">
        <p className="text-slate-400 text-sm font-medium">
          © 2026 TaskFlow Pro. Built with ❤️ by Kamalesh.
        </p>
        <div className="flex items-center justify-center gap-2 mt-1 text-slate-400 text-xs">
          <MapPin size={12} className="text-indigo-600" />
          <span>Chennai, India</span>
        </div>
      </div>

      {/* Links & Contact Section */}
      <div className="flex flex-col items-center md:items-end gap-3">
        <div className="flex gap-6">
          <a 
            href="https://www.linkedin.com/in/kamalesh-p-996300291/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-sm"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://github.com/kamalesh574" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-sm"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
        
        <a 
          href="mailto:kamaleshp.004@gmail.com" 
          className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2 text-sm"
        >
          <Mail size={16} className="text-indigo-600" />
          <span>kamaleshp.004@gmail.com</span>
        </a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};
