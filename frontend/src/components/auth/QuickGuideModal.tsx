import React, { useEffect } from 'react';
import { X, CheckCircle2, UserCheck, FileText, ShieldCheck, ArrowRight } from 'lucide-react';
import { QUICK_GUIDE_STEPS } from '../../data/landingData';

interface QuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoleFirst?: () => void;
}

export const QuickGuideModal: React.FC<QuickGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectRoleFirst,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getStepIcon = (stepNum: string) => {
    switch (stepNum) {
      case '01':
        return <UserCheck className="w-4 h-4 text-sky-400" />;
      case '02':
        return <FileText className="w-4 h-4 text-sky-400" />;
      case '03':
        return <ShieldCheck className="w-4 h-4 text-sky-400" />;
      case '04':
        return <CheckCircle2 className="w-4 h-4 text-sky-400" />;
      default:
        return <UserCheck className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="quick-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl bg-[#081525]/95 border border-white/15 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
              QUICK ONBOARDING GUIDE
            </span>
            <h3 id="quick-guide-title" className="text-xl sm:text-2xl font-extrabold text-white">
              New to NETFIX AI?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Follow these simple steps to get started with the platform.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close guide"
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Steps Vertical Grid */}
        <div className="space-y-3 pt-2">
          {QUICK_GUIDE_STEPS.map((s) => (
            <div
              key={s.step}
              className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-sky-400/25 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-400/25 flex items-center justify-center font-mono font-bold text-xs text-sky-300">
                {getStepIcon(s.step)}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">Step {s.step}</span>
                  <h4 className="text-sm font-bold text-white">{s.title}</h4>
                </div>
                <p className="text-xs text-slate-300/90 leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors min-h-[40px]"
          >
            Got it, Thanks
          </button>

          {onSelectRoleFirst && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectRoleFirst();
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-brand-cyan hover:from-sky-400 hover:to-brand-cyan shadow-md shadow-sky-500/25 transition-all flex items-center gap-1.5 min-h-[40px]"
            >
              <span>Back to Role Selection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
