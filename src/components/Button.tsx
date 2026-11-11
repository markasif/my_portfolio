import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  arrowDirection?: 'right' | 'down' | 'none';
  href?: string;
  onClick?: (e?: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

interface ArrowIconProps {
  className?: string;
  direction?: 'right' | 'down';
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ 
  className = "size-4", 
  direction = 'right' 
}) => {
  // When direction === 'down' (e.g., View All Projects / Expand):
  // Arrow is straight vertical pointing down, and on hover moves down!
  if (direction === 'down') {
    return (
      <svg 
        className={`${className} rotate-90 group-hover:translate-y-1.5 transition-all duration-300 origin-center`} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    );
  }

  // When direction === 'right' (Default for CTA links):
  // Resting: -rotate-45 (tilted). Hover: rotate-0 (straight right) + translate-x-1.
  return (
    <svg 
      className={`${className} -rotate-45 group-hover:rotate-0 group-hover:translate-x-1 transition-all duration-300 origin-center`} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  arrowDirection = 'right',
  href,
  onClick,
  type = 'button',
  className = '',
  target,
  rel,
  disabled = false,
}) => {
  const isPrimary = variant === 'primary';

  // Size variations
  const sizeStyles = {
    sm: {
      pill: 'h-9 md:h-10 pl-4 pr-1.5 text-[10px] md:text-[11px] gap-2.5',
      badge: 'size-6 md:size-7',
      arrow: 'size-3 md:size-3.5',
    },
    md: {
      pill: 'h-10 sm:h-12 md:h-13 pl-4 sm:pl-6 pr-1.5 sm:pr-2 text-[11px] sm:text-xs md:text-[13px] gap-2.5 sm:gap-3',
      badge: 'size-7 sm:size-8 md:size-9',
      arrow: 'size-3 sm:size-3.5 md:size-4',
    },
    lg: {
      pill: 'h-14 md:h-16 pl-7 pr-2.5 text-xs md:text-sm gap-4',
      badge: 'size-9 md:size-10',
      arrow: 'size-4 md:size-4.5',
    },
  }[size];

  // Base Pill Styles
  const basePillStyles = `group relative inline-flex items-center justify-between rounded-full font-display font-black uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer select-none ${sizeStyles.pill} ${
    isPrimary
      ? 'bg-[#00F0FF] text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)]'
      : 'bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.45)]'
  } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;

  // Circular Badge Styles
  const circleBadgeStyles = `${sizeStyles.badge} rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 shadow-sm ${
    isPrimary
      ? 'bg-white text-slate-950'
      : 'bg-slate-950 text-[#00F0FF]'
  }`;

  const content = (
    <>
      <span className="truncate">{children}</span>
      {arrowDirection !== 'none' && (
        <div className={circleBadgeStyles}>
          <ArrowIcon 
            className={sizeStyles.arrow} 
            direction={arrowDirection} 
          />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={rel} 
        className={basePillStyles} 
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled} 
      className={basePillStyles}
    >
      {content}
    </button>
  );
};

export default Button;
