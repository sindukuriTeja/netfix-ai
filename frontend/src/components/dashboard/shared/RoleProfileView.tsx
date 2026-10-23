import React from 'react';
import { User, Mail, Phone, MapPin, Building, Shield, CheckCircle } from 'lucide-react';

interface RoleProfileViewProps {
  userProfile?: {
    name?: string;
    email?: string;
    role?: string;
    organization?: string;
    designation?: string;
    department?: string;
    employeeId?: string;
    barId?: string;
    clientId?: string;
    accountId?: string;
    auditorId?: string;
    phone?: string;
    location?: string;
  };
}

export const RoleProfileView: React.FC<RoleProfileViewProps> = ({ userProfile }) => {
  const profile = userProfile || {
    name: 'Enterprise User',
    email: 'user@netfixai.test',
    role: 'Authenticated Role',
    organization: 'MARG Group',
    phone: '+91 9000000000',
    location: 'Hyderabad',
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#081525] border border-[#00B8FF]/30 backdrop-blur-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,184,255,0.1)]">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#00B8FF] to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl shadow-lg ring-2 ring-[#00B8FF]/40">
            {getInitials(profile.name)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{profile.name}</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Verified Profile
              </span>
            </div>
            <p className="text-xs text-[#00B8FF] font-semibold">{profile.role}</p>
            <p className="text-xs text-slate-400">{profile.organization}</p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-right space-y-0.5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">Security Boundary</span>
          <span className="text-xs font-mono text-emerald-400 font-semibold block">RBAC Role Isolated</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Personal Details */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-[#00B8FF]" />
            <span>Account Details</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-slate-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                Email Address
              </span>
              <span className="font-mono text-white font-semibold">{profile.email}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-slate-400 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                Phone Number
              </span>
              <span className="font-mono text-slate-200">{profile.phone || '+91 9000000000'}</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-slate-400 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Primary Location
              </span>
              <span className="text-slate-200">{profile.location || 'Hyderabad'}</span>
            </div>
          </div>
        </div>

        {/* Role & Identifier Details */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00B8FF]" />
            <span>Role & Identification</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-slate-400 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                Organization
              </span>
              <span className="text-white font-semibold">{profile.organization}</span>
            </div>

            {profile.department && (
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Department</span>
                <span className="text-slate-200">{profile.department}</span>
              </div>
            )}

            {profile.designation && (
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Designation</span>
                <span className="text-slate-200">{profile.designation}</span>
              </div>
            )}

            {(profile.employeeId || profile.barId || profile.clientId || profile.accountId || profile.auditorId) && (
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-400">Role Identifier</span>
                <span className="font-mono text-[#00B8FF] font-bold">
                  {profile.employeeId || profile.barId || profile.clientId || profile.accountId || profile.auditorId}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleProfileView;
