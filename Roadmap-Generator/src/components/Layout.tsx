import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        >
          <Outlet />
        </motion.div>
      </main>
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                  <span className="text-lg font-bold">R</span>
                </div>
                <span className="text-xl font-bold tracking-tight font-display">RoadmapPro</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Empowering learners with structured, interactive roadmaps for modern career skills. 
                Proudly developed in Chennai.
              </p>
              <div className="mt-6 flex gap-4">
                <a href="https://github.com/kamalesh574" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-brand-500 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/kamalesh-p" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-brand-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-brand-500 transition-colors">Generator</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Library</a></li>
                <li><a href="#" className="hover:text-brand-500 transition-colors">Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-500" />
                  <a href="mailto:kamaleshp.004@gmail.com" className="hover:text-brand-500 transition-colors">
                    kamaleshp.004@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-500" />
                  <span>Chennai, India</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} RoadmapPro. Built with ❤️ by **Kamalesh** in Chennai.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;