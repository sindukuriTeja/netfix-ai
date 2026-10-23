import { ArrowLeft, Sparkles, Shield } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface RoleSelectionPlaceholderProps {
  onBack: () => void;
}

export const RoleSelectionPlaceholder: React.FC<RoleSelectionPlaceholderProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#050B14]">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="NETFIX AI Environment"
          className="w-full h-full object-cover opacity-25 filter blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/85 to-[#050B14]/90" />
      </div>

      <div className="relative z-10 max-w-xl w-full p-8 sm:p-10 rounded-3xl bg-[#091527]/80 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80 text-center space-y-6">
        <BrandLogo size="lg" className="mx-auto" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Phase 2 Route Destination</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Role Selection Platform
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            This route (<code className="text-sky-300 font-mono text-xs px-1.5 py-0.5 rounded bg-white/5">/role-selection</code>) is configured and wired for Phase 2 onboarding and stakeholder authentication.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-400 text-left space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <Shield className="w-4 h-4 text-sky-400" />
            <span>Planned Phase 2 Capabilities:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-400">
            <li>Internal Employee Portal & Case Processing</li>
            <li>Executive Intelligence & Risk Oversight</li>
            <li>Advocate / Counsel Legal Workspace</li>
            <li>Client Portal & Document Submissions</li>
            <li>Vendor, Tenant & Property Access</li>
            <li>Regulatory Audit & Compliance View</li>
          </ul>
        </div>

        <div className="pt-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 to-brand-cyan hover:from-sky-400 hover:to-brand-cyan shadow-lg shadow-sky-500/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Landing Page</span>
          </button>
        </div>
      </div>
    </div>
  );
};
