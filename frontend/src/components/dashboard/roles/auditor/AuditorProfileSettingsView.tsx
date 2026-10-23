import React from 'react';
import { ShieldCheck, Mail, Phone, Building, MapPin } from 'lucide-react';

export const AuditorProfileSettingsView: React.FC = () => {
  const profile = {
    name: 'Priya Nair',
    email: 'demo.regulator@netfixai.test',
    role: 'Regulator / Auditor',
    title: 'Compliance Auditor',
    auditorId: 'AUD-001',
    organization: 'MARG Compliance Division',
    location: 'Hyderabad, India',
    phone: '+91 9000000006',
    assignedScope: 'GST, Income Tax, Corporate Governance & Financial Filings',
    accessLevel: 'Level 4 — Regulatory Auditor & Oversight',
    mfaStatus: 'Active & Enforced (TOTP Hardware Key)',
    lastLogin: 'Today at 09:15 AM (IP: 182.74.92.14)'
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 flex items-center justify-center text-xl font-extrabold text-[#00B8FF] font-mono">
            PN
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-extrabold text-white">{profile.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                {profile.auditorId}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">{profile.title} — {profile.organization}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="w-4 h-4 text-[#00B8FF]" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Phone className="w-4 h-4 text-[#00B8FF]" />
            <span>{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-[#00B8FF]" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Building className="w-4 h-4 text-[#00B8FF]" />
            <span>{profile.organization}</span>
          </div>
        </div>
      </div>

      {/* Security & Scope Details */}
      <div className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Security & Auditor Scope Credentials</span>
        </h3>

        <div className="space-y-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold">Assigned Audit Scope</span>
            <span className="text-white font-bold">{profile.assignedScope}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold">Access Level</span>
            <span className="text-emerald-400 font-bold">{profile.accessLevel}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold">MFA / Security Status</span>
            <span className="text-emerald-400 font-bold">{profile.mfaStatus}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold">Last Session Login</span>
            <span className="text-slate-300">{profile.lastLogin}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
