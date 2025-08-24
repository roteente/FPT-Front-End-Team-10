import React from 'react';

interface FadeTransitionProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  show,
  children,
  className = ''
}) => {
  return (
    <div
      className={`transition-all duration-300 ${
        show 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-2 pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin text-blue-600 ${sizeClasses[size]}`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};
