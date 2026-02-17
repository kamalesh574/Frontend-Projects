import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { CodingProfiles } from './components/CodingProfiles';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { ScrollReveal } from './components/ScrollReveal';
import { Certifications } from './components/Certifications';

function App() {
  return (
    <div className="bg-background min-h-screen text-slate-200 font-sans selection:bg-primary/30 selection:text-white">
      {/* Inject custom animation styles */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .animate-shine {
          animation: shine 3s linear infinite;
        }
      `}</style>
      
      <Navbar />
      <main>
        <Hero />
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <Skills />
        <Certifications />
        <ScrollReveal>
          <CodingProfiles />
        </ScrollReveal>
        <Projects />
      </main>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </div>
  );
}

export default App;