import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { NAV_LINKS } from '../data/landingData';

interface NavbarProps {
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050B14]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3.5'
          : 'bg-[#050B14]/40 backdrop-blur-md border-b border-white/5 py-4 sm:py-5'
      }`}
    >
      <div className="netfix-container">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo on Left */}
          <div className="flex items-center flex-shrink-0">
            <BrandLogo size="md" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          </div>

          {/* Desktop Navigation Links (Direct on dark background) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-sm font-medium text-slate-300 hover:text-[#00B8FF] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button (Login ONLY) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => onNavigate('/role-selection')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 border border-[#00B8FF]/30 hover:border-[#00B8FF]/60 shadow-[0_0_15px_rgba(0,184,255,0.2)] transition-all duration-200 focus:outline-none"
              aria-label="Login"
            >
              <User className="w-4 h-4 text-[#00B8FF]" />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:text-white bg-white/[0.05] border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00B8FF] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glass Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] p-4 bg-[#050B14]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2 py-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-[#00B8FF] hover:bg-white/[0.07] transition-all min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/role-selection');
                }}
                className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#00B8FF] hover:bg-[#0098D4] shadow-[0_0_20px_rgba(0,184,255,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-white" />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
