import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search
} from 'lucide-react';

export interface AdminUserManagementViewProps {
  onOpenAddUserModal?: () => void;
  onOpenUserDetail?: (userId: string) => void;
  onSelectUser?: (userId: string) => void;
  onOpenAddUser?: () => void;
}

export const AdminUserManagementView: React.FC<AdminUserManagementViewProps> = ({
  onOpenAddUserModal,
  onOpenUserDetail,
  onSelectUser,
  onOpenAddUser,
}) => {
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const usersList = [
    { id: 'usr-1', name: 'Teja Reddy', avatar: 'TR', role: 'Client', email: 'teja@example.com', phone: '+91 98765 43210', status: 'Active', statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', lastLogin: '21 Sep 2026 14:26' },
    { id: 'usr-2', name: 'Priya Sharma', avatar: 'PS', role: 'Advocate', email: 'priya@example.com', phone: '+91 98123 45678', status: 'Active', statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', lastLogin: '21 Sep 2026 11:15' },
    { id: 'usr-3', name: 'Aman Verma', avatar: 'AV', role: 'Employee', email: 'aman@example.com', phone: '+91 97654 32109', status: 'Active', statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', lastLogin: '21 Sep 2026 10:45' },
    { id: 'usr-4', name: 'Rohan Mehta', avatar: 'RM', role: 'Management', email: 'rohan@example.com', phone: '+91 97756 54433', status: 'Suspended', statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30', lastLogin: '19 Sep 2026 09:12' },
    { id: 'usr-5', name: 'Sneha Iyer', avatar: 'SI', role: 'Tenant/Vendor', email: 'sneha@example.com', phone: '+91 95544 33221', status: 'Active', statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', lastLogin: '21 Sep 2026 12:05' },
  ];

  const filteredUsers = usersList.filter((u) => {
    if (roleFilter !== 'All' && u.role !== roleFilter) return false;
    if (statusFilter !== 'All' && u.status !== statusFilter) return false;
    if (
      searchQuery &&
      !u.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !u.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !u.role.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-[#00B8FF]" />
            <span>Users</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage platform users, roles, permissions, and access status.
          </p>
        </div>

        <button
          onClick={() => {
            if (onOpenAddUser) onOpenAddUser();
            if (onOpenAddUserModal) onOpenAddUserModal();
          }}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors flex items-center gap-2 shadow-lg shadow-[#00B8FF]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* 4 Top KPI Badges (Matching Panel 2) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Total Users</span>
          <div className="text-2xl font-extrabold text-white font-mono">12,482</div>
          <span className="text-[10px] text-slate-500 font-medium">All accounts</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Active</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">11,240</div>
          <span className="text-[10px] text-emerald-400/80 font-bold font-mono">90.1% active</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Suspended</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">842</div>
          <span className="text-[10px] text-rose-400/80 font-bold font-mono">6.7% suspended</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Pending Verification</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">400</div>
          <span className="text-[10px] text-amber-400/80 font-bold font-mono">3.2% pending</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-white font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Roles</option>
            <option value="Client">Client</option>
            <option value="Advocate">Advocate</option>
            <option value="Employee">Employee</option>
            <option value="Management">Management</option>
            <option value="Tenant/Vendor">Tenant/Vendor</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-white font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="relative flex-1 md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
        </div>
      </div>

      {/* Users Data Table (Matching Panel 2) */}
      <div className="rounded-2xl bg-[#081525]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">USER</th>
                <th className="p-3.5">ROLE</th>
                <th className="p-3.5">EMAIL / PHONE</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5">LAST LOGIN</th>
                <th className="p-3.5 pr-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 flex items-center justify-center font-bold text-[#00B8FF] font-mono shrink-0">
                      {u.avatar}
                    </div>
                    <div>
                      <span
                        onClick={() => {
                          if (onSelectUser) onSelectUser(u.id);
                          if (onOpenUserDetail) onOpenUserDetail(u.id);
                        }}
                        className="font-bold text-white hover:text-[#00B8FF] cursor-pointer block"
                      >
                        {u.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{u.role}</td>
                  <td className="p-3.5 font-mono text-slate-400">
                    <div className="text-white font-medium">{u.email}</div>
                    <div className="text-[10px] text-slate-500">{u.phone}</div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono border ${u.statusColor}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400">{u.lastLogin}</td>
                  <td className="p-3.5 pr-4 text-right">
                    <button
                      onClick={() => {
                        if (onSelectUser) onSelectUser(u.id);
                        if (onOpenUserDetail) onOpenUserDetail(u.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#00B8FF]/10 text-[#00B8FF] hover:bg-[#00B8FF]/20 text-xs font-bold transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
