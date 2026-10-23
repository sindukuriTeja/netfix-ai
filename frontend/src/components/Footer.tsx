import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { FOOTER_LINKS } from '../data/landingData';
import { X } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const handleLinkClick = (link: typeof FOOTER_LINKS[0]) => {
    if (link.isRoute) {
      onNavigate(link.href);
    } else if (link.href.startsWith('#')) {
      if (link.href === '#privacy') {
        setActiveModal('privacy');
      } else if (link.href === '#terms') {
        setActiveModal('terms');
      } else {
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <footer className="relative bg-[#030712]/70 backdrop-blur-lg border-t border-sky-400/10 pt-10 pb-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-80 h-32 bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="netfix-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Left: Brand Presentation */}
          <div className="md:col-span-4 space-y-3">
            <BrandLogo size="md" showTagline={true} />
            <p className="text-xs text-slate-500 max-w-sm pt-1 leading-relaxed">
              Enterprise AI intelligence platform for Tax, Legal, Litigation, Corporate, Property, Projects and Compliance.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="md:col-span-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                  className="text-xs sm:text-sm text-slate-400 hover:text-sky-300 transition-colors py-0.5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Social Channels */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Follow Us
            </h4>
            <div className="flex items-center space-x-3">
              <a
                href="#contact"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/40 flex items-center justify-center text-slate-400 hover:text-sky-300 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="#contact"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/40 flex items-center justify-center text-slate-400 hover:text-sky-300 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#contact"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/40 flex items-center justify-center text-slate-400 hover:text-sky-300 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <p className="text-[11px] text-slate-500">
              Stay connected with MARG Group digital initiatives and enterprise updates.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NETFIX AI. All rights reserved.</p>
          <p className="font-semibold text-slate-400 tracking-wider">
            A MARG GROUP Initiative
          </p>
        </div>
      </div>

      {/* Policy Placeholder Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#091527] border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              This document is being prepared for upcoming Phase releases in alignment with MARG Group enterprise governance standards and applicable regulatory compliance guidelines.
            </p>
            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
