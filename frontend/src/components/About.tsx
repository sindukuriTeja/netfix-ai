import React from 'react';
import { ArrowRight, FileText, Brain, UserCheck, CheckSquare } from 'lucide-react';
import { ABOUT_WORKFLOW } from '../data/landingData';
import { NetfixCard } from './NetfixCard';

export const About: React.FC = () => {
  const getWorkflowIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-6 h-6 text-sky-400" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-sky-400" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-sky-400" />;
      case 'CheckSquare':
        return <CheckSquare className="w-6 h-6 text-sky-400" />;
      default:
        return <FileText className="w-6 h-6 text-sky-400" />;
    }
  };

  const scrollToRoles = () => {
    const el = document.getElementById('roles');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative py-10 sm:py-12 lg:py-14 border-t border-sky-400/10 overflow-hidden">
      {/* Subtle Background Radial Depth */}
      <div className="absolute top-1/2 -left-48 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-48 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="netfix-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
                ABOUT NETFIX AI
              </span>
              <span className="w-8 h-[1px] bg-sky-400/40" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              One Intelligence Layer.{' '}
              <span className="bg-gradient-to-r from-sky-300 via-brand-cyan to-white bg-clip-text text-transparent">
                Every Business Decision.
              </span>
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                NETFIX AI brings Tax, Legal, Litigation, Corporate, Property, Project and Compliance intelligence into one integrated platform.
              </p>
              <p className="text-slate-400">
                You submit a question or document, our specialized AI agents research and analyze the relevant information, a human expert reviews the output, and you receive a final, reliable answer, report or draft.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToRoles}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-sky-400/30 transition-all duration-200 group min-h-[44px]"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Workflow Step Cards */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 relative">
              {ABOUT_WORKFLOW.map((item, index) => (
                <div key={item.step} className="relative flex flex-col h-full">
                  {/* Image 5 Style 3D Card */}
                  <NetfixCard>
                    <div className="h-full p-5 flex flex-col items-center text-center group">
                      {/* Icon Container */}
                      <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,163,255,0.25)] transition-all">
                        {getWorkflowIcon(item.icon)}
                      </div>

                      <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-[#00B8FF] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-300/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </NetfixCard>

                  {/* Horizontal Connector Arrow (hidden on mobile and last item) */}
                  {index < ABOUT_WORKFLOW.length - 1 && (
                    <div className="hidden xl:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-sky-400/50">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Subtitle / Tagline Divider */}
            <div className="flex items-center justify-center gap-3 pt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              <span className="w-12 h-[1px] bg-slate-700" />
              <span>HUMAN-CENTRIC AI. REAL-WORLD IMPACT.</span>
              <span className="w-12 h-[1px] bg-slate-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
