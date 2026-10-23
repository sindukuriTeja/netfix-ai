import React, { useState } from 'react';
import { ArrowRight, Check, Users, TrendingUp, Scale, Building2, Home, ShieldCheck, HelpCircle } from 'lucide-react';
import { USER_ROLES } from '../../data/landingData';
import type { RoleItem } from '../../types';
import { QuickGuideModal } from './QuickGuideModal';

interface RoleSelectionProps {
  selectedRole: RoleItem | null;
  onSelectRole: (role: RoleItem) => void;
  onContinue: (targetFlow: 'login' | 'register') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  selectedRole,
  onSelectRole,
  onContinue,
}) => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [showPromptError, setShowPromptError] = useState(false);

  const getRoleIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = `w-6 h-6 transition-transform group-hover:scale-110 ${
      isSelected ? 'text-brand-cyan' : 'text-sky-400'
    }`;

    switch (iconName) {
      case 'users':
        return <Users className={iconClass} />;
      case 'trending-up':
        return <TrendingUp className={iconClass} />;
      case 'scale':
        return <Scale className={iconClass} />;
      case 'building':
        return <Building2 className={iconClass} />;
      case 'home':
        return <Home className={iconClass} />;
      case 'shield-check':
        return <ShieldCheck className={iconClass} />;
      default:
        return <Users className={iconClass} />;
    }
  };

  const handleContinueClick = () => {
    if (!selectedRole) {
      setShowPromptError(true);
      return;
    }
    setShowPromptError(false);
    onContinue('login');
  };



  return (
    <div className="netfix-container py-4 sm:py-6 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      {/* Title & Eyebrow */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/25 backdrop-blur-md w-fit mx-auto">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-sky-300 uppercase">
            GET STARTED
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Choose Your Role
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Select the role that best describes how you'll use NETFIX AI.
        </p>
      </div>

      {/* 6 Role Cards Compact 3x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 w-full mb-6 max-w-6xl">
        {USER_ROLES.map((role) => {
          const isSelected = selectedRole?.id === role.id;

          return (
            <div
              key={role.id}
              tabIndex={0}
              role="button"
              aria-selected={isSelected}
              onClick={() => {
                onSelectRole(role);
                setShowPromptError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectRole(role);
                  setShowPromptError(false);
                }
              }}
              className={`group relative flex flex-col p-5 rounded-2xl backdrop-blur-2xl transition-all duration-300 cursor-pointer outline-none ${
                isSelected
                  ? 'bg-[#04121F]/90 border-2 border-[#00B8FF] shadow-[0_0_30px_rgba(0,184,255,0.25)] -translate-y-1'
                  : 'bg-[#04121F]/60 hover:bg-[#04121F]/90 border border-white/[0.1] hover:border-[#00B8FF]/40 shadow-xl hover:-translate-y-1'
              } focus-visible:ring-2 focus-visible:ring-[#00B8FF]`}
            >
              {/* Selected Checkmark Indicator on Top Right */}
              {isSelected && (
                <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-[#00B8FF] text-[#050B14] flex items-center justify-center font-bold shadow-md animate-in zoom-in-50 duration-200">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              {/* Icon Container */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3.5 transition-all ${
                  isSelected
                    ? 'bg-[#00B8FF]/20 border border-[#00B8FF]/50 shadow-[0_0_15px_rgba(0,184,255,0.3)]'
                    : 'bg-[#00B8FF]/10 border border-[#00B8FF]/20 group-hover:bg-[#00B8FF]/20 group-hover:border-[#00B8FF]/40'
                }`}
              >
                {getRoleIcon(role.iconName, isSelected)}
              </div>

              {/* Role Title */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug group-hover:text-[#00B8FF] transition-colors">
                {role.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-4 flex-grow">
                {role.description}
              </p>

              {/* Card Bottom Indicator */}
              <div className="mt-auto pt-2 flex items-center justify-between border-t border-white/5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider group-hover:text-[#00B8FF]">
                  {isSelected ? 'Selected' : 'Select Role'}
                </span>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#00B8FF] text-white'
                      : 'bg-white/[0.04] text-slate-400 group-hover:bg-[#00B8FF]/20 group-hover:text-[#00B8FF]'
                  }`}
                >
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle Role Prompt Error Message */}
      {showPromptError && (
        <div className="mb-3 text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-xl animate-in fade-in duration-200">
          Please select a role to continue.
        </div>
      )}

      {/* Main Continue Action Button */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleContinueClick}
          disabled={!selectedRole}
          className={`w-full py-3 px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 min-h-[46px] ${
            selectedRole
              ? 'text-white bg-[#00B8FF] hover:bg-[#0098D4] shadow-[0_0_25px_rgba(0,184,255,0.4)] hover:shadow-[0_0_35px_rgba(0,184,255,0.6)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
              : 'text-slate-500 bg-white/[0.04] border border-white/10 cursor-not-allowed opacity-60'
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Quick Guide Trigger */}
        <div className="flex items-center gap-2 text-xs text-slate-400 pt-0.5">
          <span>Don't know how to register?</span>
          <button
            type="button"
            onClick={() => setGuideOpen(true)}
            className="inline-flex items-center gap-1 font-semibold text-[#00B8FF] hover:text-sky-300 transition-colors focus:outline-none focus:underline"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Use Quick Guide</span>
          </button>
        </div>
      </div>

      {/* Quick Guide Walkthrough Modal */}
      <QuickGuideModal
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
      />
    </div>
  );
};
