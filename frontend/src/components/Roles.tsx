import React from 'react';
import { ArrowRight, Users, TrendingUp, Scale, Building2, Home, ShieldCheck } from 'lucide-react';
import { USER_ROLES } from '../data/landingData';
import { NetfixCard } from './NetfixCard';
import type { RoleItem } from '../types';

interface RolesProps {
  onNavigate: (route: string) => void;
  onSelectRole: (role: RoleItem) => void;
}

export const Roles: React.FC<RolesProps> = ({ onNavigate, onSelectRole }) => {
  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-6 h-6 text-[#00B8FF]" />;
      case 'trending-up':
        return <TrendingUp className="w-6 h-6 text-[#00B8FF]" />;
      case 'scale':
        return <Scale className="w-6 h-6 text-[#00B8FF]" />;
      case 'building':
        return <Building2 className="w-6 h-6 text-[#00B8FF]" />;
      case 'home':
        return <Home className="w-6 h-6 text-[#00B8FF]" />;
      case 'shield-check':
        return <ShieldCheck className="w-6 h-6 text-[#00B8FF]" />;
      default:
        return <Users className="w-6 h-6 text-[#00B8FF]" />;
    }
  };

  return (
    <section id="roles" className="relative py-10 sm:py-12 lg:py-14 border-t border-sky-400/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 bg-gradient-to-r from-sky-500/5 via-brand-cyan/5 to-sky-500/5 blur-3xl pointer-events-none" />

      <div className="netfix-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#00B8FF] uppercase">
              BUILT FOR EVERY STAKEHOLDER
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Different Roles. A Unified Platform.
            </h2>
          </div>

          <div className="text-slate-400 text-sm max-w-md">
            <span>A tailored experience for everyone in the MARG Group ecosystem.</span>
          </div>
        </div>

        {/* 6 Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3">
          {USER_ROLES.map((role) => (
            <NetfixCard
              key={role.id}
              onClick={() => {
                onSelectRole(role);
                onNavigate('/login');
              }}
            >
              <div className="group relative flex flex-col p-5 h-full cursor-pointer">
                {/* Top Icon Badge */}
                <div className="w-12 h-12 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#00B8FF]/20 group-hover:border-[#00B8FF]/40 transition-all">
                  {getRoleIcon(role.iconName)}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#00B8FF] transition-colors">
                  {role.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300/80 leading-relaxed mb-6 flex-grow">
                  {role.description}
                </p>

                {/* Bottom Circular Action Arrow */}
                <div className="mt-auto pt-2">
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:bg-[#00B8FF] group-hover:border-[#00B8FF] transition-all">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </NetfixCard>
          ))}
        </div>
      </div>
    </section>
  );
};
