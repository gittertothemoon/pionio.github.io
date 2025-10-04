import React, { memo } from 'react';
import pionioLogo from '../../assets/pionio-logo.svg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = memo(({ 
  className = '', 
  size = 'md',
  onClick
}) => {
  const sizeClasses = {
    sm: 'w-40 h-40',
    md: 'w-48 h-48',
    lg: 'w-56 h-56',
    xl: 'w-72 h-72'
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: scroll to hero section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <img 
      src={pionioLogo} 
      alt="Pionio Logo" 
      className={`${sizeClasses[size]} ${className} object-contain logo-image cursor-pointer transition-transform hover:scale-105`}
      onClick={handleClick}
    />
  );
});
