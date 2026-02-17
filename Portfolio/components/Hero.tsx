import React, { useState, useEffect } from 'react';
import { Download, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { PERSONAL_INFO } from '../constants';

export const Hero: React.FC = () => {
  // Tilt Effect State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  // Typing Effect State
  const [displayText, setDisplayText] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const fullText = "Java Developer";

  // Typing Effect Logic (Continuous Loop) & Mount Animation
  useEffect(() => {
    // Trigger entrance animation immediately
    setIsMounted(true);

    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const current = fullText;
      
      if (isDeleting) {
        setDisplayText(current.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setDisplayText(current.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = 100;

      if (!isDeleting && charIndex === current.length) {
        // Finished typing, pause then delete
        isDeleting = true;
        typeSpeed = 2000; 
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, pause then type
        isDeleting = false;
        typeSpeed = 500;
      } else if (isDeleting) {
         typeSpeed = 50; // Delete faster
      }

      timeout = setTimeout(type, typeSpeed);
    };

    timeout = setTimeout(type, 500);

    return () => clearTimeout(timeout);
  }, []);

  // Tilt Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    
    // Calculate mouse position relative to center of element (-0.5 to 0.5)
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    // Max tilt 35 degrees for high sensitivity
    setTilt({ x: y * 35, y: -x * 35 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite_1s]"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Replaced ScrollReveal with direct CSS transition controlled by isMounted state for immediate load */}
        <div className={`transition-all duration-1000 ease-out transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex flex-col items-center gap-6">
            
            {/* Greeting Pill */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm mb-4 animate-bounce hover:bg-slate-800/80 transition-colors cursor-default shadow-lg shadow-primary/10">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-ping"></span>
                <span className="text-slate-200 text-lg md:text-xl font-bold tracking-wide uppercase">Hello, I'm</span>
            </div>

            {/* Massive Name with Tilt Effect */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
              className="cursor-default"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 drop-shadow-2xl inline-block">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
            </div>

            {/* Title with Typing Effect */}
            <h2 className="text-2xl md:text-4xl font-bold flex items-center gap-3 h-12">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {displayText}
              </span>
              <span className="w-1 h-8 bg-primary animate-pulse"></span>
            </h2>
            
            {/* Description with Light Reflection Shimmer */}
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed bg-gradient-to-r from-slate-400 via-white to-slate-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-shine">
               Building Robust and scalable systems with clean architecture.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <Button href="components/certificates/Kamalesh P Resume (1) (2).pdf" target="_blank" variant="primary" className="w-full sm:w-auto group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                    <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    Download Resume
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Button>
              
              <Button href="#projects" variant="outline" className="w-full sm:w-auto group">
                <span className="flex items-center">
                    View Projects <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};