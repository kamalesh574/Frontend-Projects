import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, href, className = '', ...props }) => {
  const baseStyles = "px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 text-lg inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-primary text-background hover:bg-sky-300 shadow-lg shadow-primary/20",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};