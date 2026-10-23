import React from 'react';
import { ArrowRight, ArrowDown, Sparkles, ShieldCheck, Building } from 'lucide-react';

interface HeroProps {
  onNavigate: (route: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-4 pb-6 sm:pt-6 sm:pb-8 lg:pt-8 lg:pb-10 flex flex-col justify-between overflow-hidden">
      {/* Subtle Atmospheric Gradient Overlay (Lets underlying video shine through) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B14]/30 to-[#050B14]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,184,255,0.15),transparent_70%)]" />
      </div>

      <div className="relative z-10 netfix-container w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/25 backdrop-blur-md w-fit">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-sky-300 uppercase">
                ONE PLATFORM. INFINITE POSSIBILITIES.
              </span>
            </div>

            {/* Main Brand Title & Tagline */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
                  NETFIX{' '}
                  <span className="text-[#00B8FF] drop-shadow-[0_0_20px_rgba(0,184,255,0.4)]">
                    AI
                  </span>
                </h1>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
                Smarter Law. Stronger Decisions.
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              AI-powered intelligence for <span className="text-white font-medium">Tax</span>,{' '}
              <span className="text-white font-medium">Legal</span>,{' '}
              <span className="text-white font-medium">Litigation</span>,{' '}
              <span className="text-white font-medium">Corporate</span>,{' '}
              <span className="text-white font-medium">Property</span>,{' '}
              <span className="text-white font-medium">Projects</span> and{' '}
              <span className="text-white font-medium">Compliance</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => onNavigate('/role-selection')}
                className="gradient-button group focus:outline-none focus:ring-2 focus:ring-[#00B8FF]"
                aria-label="Get Started"
              >
                <span className="gradient-text !py-3 sm:!py-3.5 !px-6 sm:!px-7 !text-sm sm:!text-base">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-sky-300" />
                </span>
              </button>

              <button
                onClick={scrollToAbout}
                className="netfix-explore-btn group focus:outline-none focus:ring-2 focus:ring-[#00B8FF]/50"
                aria-label="Explore Platform"
              >
                <span className="netfix-explore-inner !py-3 sm:!py-3.5 !px-6 sm:!px-7 !text-sm sm:!text-base">
                  <span>Explore Platform</span>
                  <ArrowDown className="w-4 h-4 text-[#00B8FF] group-hover:translate-y-0.5 transition-transform" />
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs font-medium text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-[#00B8FF]" />
                <span>Trusted Intelligence</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00B8FF]" />
                <span>Secure & Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs font-medium text-slate-300">
                <Building className="w-3.5 h-3.5 text-[#00B8FF]" />
                <span>Built for Real Businesses</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Robot Visual (Sized ~20% larger, anchored to touch Hero bottom boundary) */}
          <div className="lg:col-span-5 relative flex items-end justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] max-h-[540px] w-full overflow-hidden self-end">
            {/* Ambient Cyan Radial Glow Behind Robot */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(0,184,255,0.22),transparent_70%)] pointer-events-none" />

            {/* Transparent Robot Image Visual - Anchored to Bottom Boundary */}
            <div className="relative z-10 w-full flex items-end justify-center">
              <img
                src="/ai_robot_transparent.png"
                alt="NETFIX AI Cybernetic Enterprise Assistant"
                className="max-h-[460px] sm:max-h-[500px] lg:max-h-[530px] w-auto object-contain object-bottom drop-shadow-[0_0_45px_rgba(0,184,255,0.45)] transition-transform duration-700 hover:scale-[1.02] pointer-events-none"
              />

              {/* Floating Holographic Glass Card: Top-Right "ANALYZE / RESEARCH / COMPLIANCE / BETTER DECISIONS" */}
              <div className="absolute top-2 right-0 sm:right-2 z-20 p-3 rounded-2xl bg-[#04121F]/85 border border-[#00B8FF]/40 backdrop-blur-md shadow-xl max-w-[170px] space-y-1 text-right select-none">
                <div className="text-[10px] font-bold text-white tracking-wider">ANALYZE</div>
                <div className="text-[10px] font-medium text-[#00B8FF]">RESEARCH</div>
                <div className="text-[10px] font-medium text-slate-300">COMPLIANCE</div>
                <div className="text-[9px] font-mono text-sky-400/90 pt-0.5">BETTER DECISIONS</div>
              </div>

              {/* Floating Holographic Glass Card: Mid-Left Scale of Justice / Document Hologram */}
              <div className="absolute top-10 left-0 sm:left-2 z-20 p-2.5 rounded-2xl bg-[#04121F]/85 border border-[#00B8FF]/40 backdrop-blur-md shadow-xl flex items-center gap-2 select-none">
                <div className="w-8 h-8 rounded-xl bg-[#00B8FF]/15 border border-[#00B8FF]/40 flex items-center justify-center text-[#00B8FF]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-[10px] font-bold text-white leading-tight">
                  <div>LEGAL & TAX</div>
                  <div className="text-[9px] font-normal text-[#00B8FF]">AI INTELLIGENCE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Tagline Divider */}
      <div className="relative z-10 w-full pt-4 pb-1 text-center">
        <div className="inline-flex items-center gap-4">
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-sky-500/40" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-400/80 uppercase">
            HUMAN-CENTRIC AI. REAL-WORLD IMPACT.
          </span>
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-sky-500/40" />
        </div>
      </div>
    </section>
  );
};
