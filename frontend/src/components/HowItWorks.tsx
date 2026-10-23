import React from 'react';
import { ArrowRight, UserCheck, FileText, Cpu, CheckCircle2, Users } from 'lucide-react';
import { PROCESS_STEPS } from '../data/landingData';
import { NetfixCard } from './NetfixCard';

export const HowItWorks: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'user-check':
        return <UserCheck className="w-5 h-5 text-sky-400" />;
      case 'file-text':
        return <FileText className="w-5 h-5 text-sky-400" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'user-round-check':
        return <Users className="w-5 h-5 text-sky-400" />;
      case 'check-circle':
        return <CheckCircle2 className="w-5 h-5 text-sky-400" />;
      default:
        return <UserCheck className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="how-it-works" className="relative py-10 sm:py-12 lg:py-14 border-t border-sky-400/10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-96 bg-brand-electric/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="netfix-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
              FROM REQUEST TO DECISION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Simple, Powerful Process.
            </h2>
          </div>

          <div className="text-slate-400 text-sm max-w-md">
            <span>Get from a question or document to a reviewed, usable result in just a few steps.</span>
          </div>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-3 relative">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.step} className="relative flex flex-col h-full">
              <NetfixCard>
                <div className="h-full p-5 group flex flex-col">
                  {/* Step Header: Number pill + Icon */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono font-bold text-sky-300">
                      {step.step}
                    </span>
                    <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-400/20 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all">
                      {getStepIcon(step.iconName)}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug group-hover:text-sky-200 transition-colors">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs text-slate-300/80 leading-relaxed mt-auto">
                    {step.description}
                  </p>
                </div>
              </NetfixCard>

              {/* Connecting arrow for desktop between steps */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-sky-400/40 group-hover:text-sky-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
