import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, LayoutDashboard, History, PlusCircle, Moon, Sun, Menu, X } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapProvider';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Compass },
    { name: 'Generator', path: '/generate', icon: PlusCircle },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Library', path: '/library', icon: History },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
              <Compass size={24} />
            </div>
            <span className="hidden text-xl font-bold tracking-tight sm:block font-display">
              Roadmap<span className="text-brand-500">Pro</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-accent ${
                  isActive ? 'text-brand-500' : 'text-muted-foreground'
                }`}
              >
                <Icon size={18} />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-brand-500/10 text-brand-500' : 'text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
