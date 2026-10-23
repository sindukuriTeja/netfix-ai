import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  onClick,
}) => {
  const textSize = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  }[size];

  const margSize = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] sm:text-[11px] tracking-[0.28em]',
    lg: 'text-xs tracking-[0.3em]',
    hero: 'text-xs sm:text-sm tracking-[0.35em]',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-center gap-1.5 leading-none">
        <span className={`font-extrabold tracking-tight text-white ${textSize}`}>
          NETFIX
        </span>
        <span
          className={`font-black tracking-tight ${textSize} text-[#00B8FF] drop-shadow-[0_0_12px_rgba(0,184,255,0.5)]`}
        >
          AI
        </span>
      </div>

      <span
        className={`font-semibold uppercase text-slate-400/90 mt-1 transition-colors hover:text-slate-300 ${margSize}`}
      >
        MARG GROUP
      </span>

      {showTagline && (
        <span className="text-xs sm:text-sm text-slate-400 font-medium mt-1.5">
          Smarter Law. Stronger Decisions.
        </span>
      )}
    </div>
  );
};
