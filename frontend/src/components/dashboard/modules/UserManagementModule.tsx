import React, { useState } from 'react';
import { Search, Plus, ShieldCheck, CheckCircle } from 'lucide-react';

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Suspended' | 'Pending' | 'Deactivated';
  lastActive: string;
}

export const UserManagementModule: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([
    { id: 'usr_emp_amit', name: 'Amit Sharma', email: 'amit.sharma@marggroup.com', role: 'Employee', status: 'Active', lastActive: '22 Sep 2026' },
    { id: 'usr_cli_priya', name: 'Priya Nair', email: 'priya@marggroup.com', role: 'Client', status: 'Active', lastActive: '21 Sep 2026' },
    { id: 'usr_adv_rohan', name: 'Rohan Iyer', email: 'rohan.iyer@marggroup.com', role: 'Advocate', status: 'Suspended', lastActive: '18 Sep 2026' },
    { id: 'usr_cli_sneha', name: 'Sneha Reddy', email: 'sneha@marggroup.com', role: 'Management', status: 'Active', lastActive: '22 Sep 2026' },
  ]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Client');
  const [notification, setNotification] = useState<string | null>(null);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          setNotification(`User ${u.name} status changed to ${nextStatus}. Audit log recorded.`);
          setTimeout(() => setNotification(null), 4000);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    const newUser: UserItem = {
      id: `usr_${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active',
      lastActive: 'Just now',
    };
    setUsers([newUser, ...users]);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddModal(false);
    setNotification(`User ${newUser.name} created successfully.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Module Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-extrabold text-sm">
            1
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              User & Identity Management
            </h3>
            <p className="text-xs text-slate-400">Secure Access. Complete Control.</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add User</span>
        </button>
      </div>

      {notification && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Module Layout (Content Left, Feature Checklist Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Table & Controls (3 Cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.04] text-slate-400 border-b border-white/10 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Email</th>
                  <th className="p-2.5">Role</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5">Last Login</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-2.5 font-semibold text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold text-sky-400">
                        {u.name.charAt(0)}
                      </div>
                      <span>{u.name}</span>
                    </td>
                    <td className="p-2.5 text-slate-400 text-[11px]">{u.email}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/[0.06] text-slate-300 border border-white/10">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          u.status === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-400 text-[11px]">{u.lastActive}</td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                          u.status === 'Active'
                            ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20'
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
                        }`}
                      >
                        {u.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature List Column (Right) */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-2.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Identity Features</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>User lifecycle management</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Status control (Active/Suspend)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Password reset flow</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Session revocation tracking</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Role-based access control</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Audit logs on all actions</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1728] border border-white/20 rounded-2xl max-w-md w-full p-5 space-y-4 text-white shadow-2xl">
            <h3 className="text-base font-bold">Add Platform User</h3>
            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. Ramesh Varma"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                  placeholder="ramesh@example.com"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">User Role</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="Client">Client</option>
                  <option value="Employee">Employee</option>
                  <option value="Advocate">Advocate</option>
                  <option value="Management">Management</option>
                  <option value="Tenant">Tenant</option>
                  <option value="Regulator">Regulator</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
