import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Cpu, ShieldCheck, Database, AlertTriangle, BarChart3, 
  HelpCircle, Settings, LogOut, Search, Bell
} from 'lucide-react';

import { AdminDashboardView } from './admin/AdminDashboardView';
import { AdminUserManagementView } from './admin/AdminUserManagementView';
import { AdminUserDetailView } from './admin/AdminUserDetailView';
import { AdminAIAgentsView } from './admin/AdminAIAgentsView';
import { AdminAccessRequestsView } from './admin/AdminAccessRequestsView';
import { AdminAccessRequestDetailView } from './admin/AdminAccessRequestDetailView';
import { AdminAuditTrailView } from './admin/AdminAuditTrailView';
import { AdminFindingsView } from './admin/AdminFindingsView';
import { AdminReportsAnalyticsView } from './admin/AdminReportsAnalyticsView';
import { AdminSupportCenterView } from './admin/AdminSupportCenterView';
import { AdminSystemSettingsView } from './admin/AdminSystemSettingsView';

import { AddUserModal, ConfigureAgentModal, AddFindingModal } from './admin/AdminModals';

interface AdminDashboardProps {
  userContact?: string;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ userContact, onLogout }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'users' | 'agents' | 'access-requests' | 'audit' | 'findings' | 'reports' | 'support' | 'settings'
  >('overview');

  // Detail View Selections
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedAccessRequestId, setSelectedAccessRequestId] = useState<string | null>(null);

  // Modals state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isConfigureAgentOpen, setIsConfigureAgentOpen] = useState(false);
  const [isAddFindingOpen, setIsAddFindingOpen] = useState(false);

  // Search input in header
  const [headerSearch, setHeaderSearch] = useState('');

  // Handle sidebar navigation
  const handleNavClick = (
    tab: 'overview' | 'users' | 'agents' | 'access-requests' | 'audit' | 'findings' | 'reports' | 'support' | 'settings'
  ) => {
    setActiveTab(tab);
    // Reset detail selections when explicitly changing main tab
    if (tab !== 'users') setSelectedUserId(null);
    if (tab !== 'access-requests') setSelectedAccessRequestId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-cyan-500 selection:text-black">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-40 backdrop-blur-md">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-white">NETFIX <span className="text-cyan-400">AI</span></span>
              </div>
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
                MARG GROUP • <span className="text-cyan-400 font-semibold px-1 py-0.2 bg-cyan-950/60 rounded">ADMIN</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => handleNavClick('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-cyan-400" />
              Overview
            </button>

            <button
              onClick={() => handleNavClick('users')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'users'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Users className="w-4 h-4 text-cyan-400" />
              User Management
            </button>

            <button
              onClick={() => handleNavClick('agents')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'agents'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              AI Agents
            </button>

            <button
              onClick={() => handleNavClick('access-requests')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'access-requests'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Access Governance
            </button>

            <button
              onClick={() => handleNavClick('audit')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'audit'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Database className="w-4 h-4 text-cyan-400" />
              Audit & Compliance
            </button>

            <button
              onClick={() => handleNavClick('findings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'findings'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-cyan-400" />
              Regulatory Management
            </button>

            <button
              onClick={() => handleNavClick('reports')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'reports'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Reports & Analytics
            </button>

            <button
              onClick={() => handleNavClick('support')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'support'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              Support Center
            </button>

            <button
              onClick={() => handleNavClick('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Settings className="w-4 h-4 text-cyan-400" />
              System Settings
            </button>
          </nav>
        </div>

        {/* User Identity / Bottom Section */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-xs">
              AD
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-200 truncate">Admin</div>
              <div className="text-[10px] text-slate-400 truncate">{userContact || 'admin@marggroup.com'}</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/80 hover:bg-red-500/20 hover:text-red-300 text-slate-400 rounded-lg text-xs font-medium transition-all border border-slate-700/80"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* TOP NAVBAR */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
          {/* Header Search Bar */}
          <div className="relative w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search users, agents, requests, documents..."
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* System Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-800 rounded-lg transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400"></span>
            </button>

            {/* Admin Badge */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <div className="w-7 h-7 rounded-full bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold text-xs">
                AD
              </div>
              <span className="text-xs font-semibold text-slate-200">Admin</span>
            </div>
          </div>
        </header>

        {/* VIEW CONTAINER */}
        <div className="p-8 flex-1">
          {activeTab === 'overview' && (
            <AdminDashboardView
              onNavigateUsers={() => {
                setActiveTab('users');
                setSelectedUserId(null);
              }}
              onNavigateAccessRequests={() => {
                setActiveTab('access-requests');
                setSelectedAccessRequestId(null);
              }}
              onNavigateAudit={() => setActiveTab('audit')}
            />
          )}

          {activeTab === 'users' && (
            selectedUserId ? (
              <AdminUserDetailView
                userId={selectedUserId}
                onBack={() => setSelectedUserId(null)}
              />
            ) : (
              <AdminUserManagementView
                onSelectUser={(userId) => setSelectedUserId(userId)}
                onOpenAddUser={() => setIsAddUserOpen(true)}
              />
            )
          )}

          {activeTab === 'agents' && (
            <AdminAIAgentsView
              onOpenConfigureAgent={() => setIsConfigureAgentOpen(true)}
            />
          )}

          {activeTab === 'access-requests' && (
            selectedAccessRequestId ? (
              <AdminAccessRequestDetailView
                requestId={selectedAccessRequestId}
                onBack={() => setSelectedAccessRequestId(null)}
              />
            ) : (
              <AdminAccessRequestsView
                onSelectRequest={(reqId) => setSelectedAccessRequestId(reqId)}
              />
            )
          )}

          {activeTab === 'audit' && (
            <AdminAuditTrailView />
          )}

          {activeTab === 'findings' && (
            <AdminFindingsView
              onOpenAddFinding={() => setIsAddFindingOpen(true)}
            />
          )}

          {activeTab === 'reports' && (
            <AdminReportsAnalyticsView />
          )}

          {activeTab === 'support' && (
            <AdminSupportCenterView />
          )}

          {activeTab === 'settings' && (
            <AdminSystemSettingsView />
          )}
        </div>
      </main>

      {/* MODALS */}
      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onUserAdded={() => {
          setActiveTab('users');
        }}
      />

      <ConfigureAgentModal
        isOpen={isConfigureAgentOpen}
        onClose={() => setIsConfigureAgentOpen(false)}
        onAgentSaved={() => {}}
      />

      <AddFindingModal
        isOpen={isAddFindingOpen}
        onClose={() => setIsAddFindingOpen(false)}
        onFindingAdded={() => {}}
      />
    </div>
  );
};
