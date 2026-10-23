import React from 'react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';

interface RoleGuardProps {
  authenticatedUserRole?: string | null;
  targetRole: string;
  onNavigateWorkspace?: (userRole: string) => void;
  onLogout?: () => void;
  children: React.ReactNode;
}

const getRoleDisplayName = (role: string): string => {
  switch (role) {
    case 'employee':
      return 'Internal Employee';
    case 'management':
      return 'Management / Executive';
    case 'advocate':
      return 'Advocate / External Counsel';
    case 'client':
      return 'Client';
    case 'tenant':
    case 'tenant-vendor':
      return 'Tenant / Buyer / Vendor';
    case 'regulator':
      return 'Regulator / Auditor';
    case 'admin':
    case 'super-admin':
      return 'Admin / System Administrator';
    default:
      return role.toUpperCase();
  }
};

export const RoleGuard: React.FC<RoleGuardProps> = ({
  authenticatedUserRole,
  targetRole,
  onNavigateWorkspace,
  onLogout,
  children,
}) => {
  // Normalize role keys for check
  const normUser = (authenticatedUserRole || '').toLowerCase().replace('-vendor', '');
  const normTarget = targetRole.toLowerCase().replace('-vendor', '');

  const isAuthorized = normUser && normTarget && (normUser === normTarget || normUser === 'admin' || normUser === 'superadmin' || (normTarget === 'admin' && normUser.includes('admin')));

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-sky-500/30 font-sans">
        <div className="w-full max-w-lg p-8 rounded-3xl bg-[#04121F]/90 border border-rose-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(244,63,94,0.15)] text-center space-y-6 relative overflow-hidden">
          {/* Top L-shaped accents */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-rose-500/70" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-rose-500/70" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-rose-500/70" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-rose-500/70" />

          {/* Logo */}
          <div className="flex justify-center">
            <BrandLogo size="md" />
          </div>

          {/* Icon Badge */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>

          {/* Error Message Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-bold text-rose-400 uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5" />
              <span>403 FORBIDDEN</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">ACCESS RESTRICTED</h1>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              You do not have permission to access the{' '}
              <span className="text-rose-400 font-semibold">{getRoleDisplayName(normTarget)}</span> workspace.
            </p>
          </div>

          {/* Current Auth Context Info */}
          <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Authenticated Role:</span>
              <span className="font-bold text-sky-400 font-mono">
                {authenticatedUserRole ? getRoleDisplayName(normUser) : 'Unauthenticated'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Security Boundary:</span>
              <span className="font-mono text-emerald-400 text-[11px]">Strict Backend RBAC Enforced</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {authenticatedUserRole && onNavigateWorkspace && (
              <button
                onClick={() => onNavigateWorkspace(normUser)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Your Workspace</span>
              </button>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs border border-white/10 transition-all cursor-pointer"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
