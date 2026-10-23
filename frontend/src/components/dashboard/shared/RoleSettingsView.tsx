import React from 'react';
import { Settings, Shield, Bell } from 'lucide-react';

interface RoleSettingsViewProps {
  roleTitle?: string;
}

export const RoleSettingsView: React.FC<RoleSettingsViewProps> = ({ roleTitle }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#00B8FF]" />
          <span>Workspace Settings ({roleTitle || 'Your Role'})</span>
        </h2>
        <p className="text-xs text-slate-400">Configure notifications, security options, and preferences for your role.</p>
      </div>

      <div className="space-y-4">
        {/* Security Settings */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00B8FF]" />
            <span>Security & Authentication</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <div>
                <span className="font-semibold text-white block">Multi-Factor Authentication (MFA)</span>
                <span className="text-slate-400 text-[11px]">Enforced for real platform accounts</span>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">ACTIVE</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <div>
                <span className="font-semibold text-white block">Session Management</span>
                <span className="text-slate-400 text-[11px]">Encrypted HttpOnly JWT cookie with jti revocation tracking</span>
              </div>
              <span className="px-2 py-1 rounded bg-[#00B8FF]/20 text-[#00B8FF] font-mono text-[10px] font-bold">PROTECTED</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <span className="font-semibold text-white block">Role Access Boundary</span>
                <span className="text-slate-400 text-[11px]">Backend API verification on every request</span>
              </div>
              <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold">ENFORCED</span>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#00B8FF]" />
            <span>Notification Preferences</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between py-2 border-b border-white/5 cursor-pointer">
              <span className="text-slate-300">Email alerts for urgent task assignments</span>
              <input type="checkbox" defaultChecked className="accent-[#00B8FF] w-4 h-4 rounded" />
            </label>
            <label className="flex items-center justify-between py-2 border-b border-white/5 cursor-pointer">
              <span className="text-slate-300">Case milestone & deadline updates</span>
              <input type="checkbox" defaultChecked className="accent-[#00B8FF] w-4 h-4 rounded" />
            </label>
            <label className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-slate-300">Security event notifications</span>
              <input type="checkbox" defaultChecked className="accent-[#00B8FF] w-4 h-4 rounded" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSettingsView;
