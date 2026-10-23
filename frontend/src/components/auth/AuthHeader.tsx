import React from 'react';
import { BrandLogo } from '../BrandLogo';
import { ShieldCheck } from 'lucide-react';

interface AuthHeaderProps {
  onNavigateHome: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  onNavigateHome,
}) => {
  return (
    <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      {/* Brand Logo on Left */}
      <BrandLogo size="md" onClick={onNavigateHome} className="hover:opacity-90 transition-opacity" />

      {/* Security Indicator on Top Right */}
      <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-slate-300 font-medium select-none">
        <ShieldCheck className="w-3.5 h-3.5 text-[#00B8FF]" />
        <span>Secure</span>
        <span className="text-slate-600">|</span>
        <span>Intelligent</span>
        <span className="text-slate-600">|</span>
        <span>Compliant</span>
      </div>
    </header>
  );
};
