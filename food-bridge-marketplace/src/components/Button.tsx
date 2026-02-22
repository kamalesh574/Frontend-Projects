/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  ...props
}) => {
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200',
    outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50',
    ghost: 'text-gray-600 hover:bg-gray-100',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-sm',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};
