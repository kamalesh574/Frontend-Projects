import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></span>
      </h2>
      {subtitle && <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};