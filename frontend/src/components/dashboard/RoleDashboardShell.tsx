import React, { useState } from 'react';
import {
  Search,
  Bell,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';

export interface NavMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

interface UserProfileSummary {
  name: string;
  roleTitle: string;
  email?: string;
  avatarInitials: string;
  organization?: string;
}

interface RoleDashboardShellProps {
  roleId: string;
  roleTitle: string;
  userProfile: UserProfileSummary;
  navItems: NavMenuItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const RoleDashboardShell: React.FC<RoleDashboardShellProps> = ({
  roleTitle,
  userProfile,
  navItems,
  activeTab,
  onTabChange,
  onLogout,
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Application Bar */}
      <header className="bg-[#04121F]/90 border-b border-[#00B8FF]/25 px-4 sm:px-6 py-3.5 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        {/* Brand Logo & Role Badge */}
        <div className="flex items-center gap-4">
          <BrandLogo size="sm" />
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-xs font-semibold text-[#00B8FF]">
            <span className="w-2 h-2 rounded-full bg-[#00B8FF] animate-pulse" />
            <span>● {roleTitle}</span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search matters, documents, citations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#041828] border border-[#00B8FF]/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] transition-all"
            />
          </div>
        </div>

        {/* Right User Controls */}
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <button
            onClick={() => onTabChange('notifications')}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#00B8FF]/10 border border-white/10 text-slate-300 hover:text-[#00B8FF] transition-all relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00B8FF] animate-pulse" />
          </button>

          {/* User Profile Badge */}
          <button
            onClick={() => onTabChange('profile')}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00B8FF] to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-sm">
              {userProfile.avatarInitials}
            </div>
            <div className="hidden lg:block text-left leading-tight">
              <span className="text-xs font-bold text-white block truncate max-w-[120px]">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-slate-400 block truncate max-w-[120px]">
                {userProfile.roleTitle}
              </span>
            </div>
          </button>

          {/* Sign Out Button */}
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1920px] w-full mx-auto">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-64 bg-[#04121F]/80 border-b lg:border-b-0 lg:border-r border-[#00B8FF]/20 p-4 flex flex-col justify-between shrink-0 backdrop-blur-xl">
          <div className="space-y-4">
            {/* Sidebar Role Banner */}
            <div className="px-3 py-2 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/25">
              <span className="text-[11px] font-extrabold text-[#00B8FF] block uppercase tracking-wider">
                {roleTitle}
              </span>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                Role-Isolated Workspace
              </span>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab.toLowerCase() === item.id.toLowerCase() || activeTab.toLowerCase() === item.label.toLowerCase();

                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00B8FF] to-indigo-600 text-white shadow-lg shadow-sky-500/20 ring-1 ring-sky-300'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#00B8FF] text-slate-950 font-extrabold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer User Card */}
          <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00B8FF] flex items-center justify-center font-bold text-xs text-white shadow-sm">
                {userProfile.avatarInitials}
              </div>
              <div className="leading-tight">
                <span className="text-xs font-bold text-white block truncate max-w-[130px]">
                  {userProfile.name}
                </span>
                <span className="text-[10px] text-slate-400 block truncate max-w-[130px]">
                  {userProfile.organization || 'MARG Group'}
                </span>
              </div>
            </div>
            <button
              onClick={() => onTabChange('profile')}
              className="text-slate-400 hover:text-[#00B8FF] p-1.5 rounded-lg hover:bg-white/5 transition-all"
              title="View Profile"
            >
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RoleDashboardShell;
