import React, { useState } from 'react';
import { Users, Search, UserPlus, CheckCircle } from 'lucide-react';

export interface ClientItem {
  id: string;
  name: string;
  type: 'Company' | 'Firm' | 'Individual';
  assignedTo: string;
  status: 'Active' | 'Pending' | 'Onboarding';
}

export const ClientManagementModule: React.FC = () => {
  const [clients, setClients] = useState<ClientItem[]>([
    { id: 'cli_1', name: 'Sri Venkatesh Builders', type: 'Company', assignedTo: 'Amit Sharma', status: 'Active' },
    { id: 'cli_2', name: 'Reddy Logistics', type: 'Firm', assignedTo: 'Priya Nair', status: 'Active' },
    { id: 'cli_3', name: 'Kumar & Co', type: 'Individual', assignedTo: 'Not Assigned', status: 'Pending' },
    { id: 'cli_4', name: 'Green Infra Projects', type: 'Company', assignedTo: 'Rohit Menon', status: 'Active' },
  ]);
  const [search, setSearch] = useState('');
  const [assigningClient, setAssigningClient] = useState<ClientItem | null>(null);
  const [newAssignee, setNewAssignee] = useState('Amit Sharma');
  const [notification, setNotification] = useState<string | null>(null);

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase()) ||
      c.assignedTo.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningClient) return;
    setClients((prev) =>
      prev.map((c) => (c.id === assigningClient.id ? { ...c, assignedTo: newAssignee, status: 'Active' } : c))
    );
    setNotification(`Client "${assigningClient.name}" assigned to ${newAssignee}. Scope updated.`);
    setAssigningClient(null);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-extrabold text-sm">
            3
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              Client Management
            </h3>
            <p className="text-xs text-slate-400">Clients at the Core.</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Grid Content Left, Feature Checklist Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Table Column (3 Cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.04] text-slate-400 border-b border-white/10 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-2.5">Client Name</th>
                  <th className="p-2.5">Type</th>
                  <th className="p-2.5">Assigned To</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredClients.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-2.5 font-semibold text-white">{c.name}</td>
                    <td className="p-2.5 text-slate-400">{c.type}</td>
                    <td className="p-2.5 font-medium text-sky-300">{c.assignedTo}</td>
                    <td className="p-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          c.status === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => setAssigningClient(c)}
                        className="px-2 py-1 rounded text-[10px] font-bold bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/20 transition-all flex items-center gap-1 ml-auto"
                      >
                        <UserPlus className="w-3 h-3" />
                        <span>Assign Staff</span>
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
            <Users className="w-3.5 h-3.5" />
            <span>Client Features</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Complete client view</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Assign employees</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Assign advocates</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>View related entities</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Case overview</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Search & filters</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Assign Staff Modal */}
      {assigningClient && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1728] border border-white/20 rounded-2xl max-w-md w-full p-5 space-y-4 text-white shadow-2xl">
            <h3 className="text-base font-bold">Assign Staff to {assigningClient.name}</h3>
            <form onSubmit={handleAssignSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Select Employee / Advocate</label>
                <select
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="Amit Sharma">Amit Sharma (Employee - Tax Lead)</option>
                  <option value="Priya Nair">Priya Nair (Employee - Legal Senior)</option>
                  <option value="Sanjay Prakash">Sanjay Prakash (External Advocate)</option>
                  <option value="Rohit Menon">Rohit Menon (Employee - Corporate)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssigningClient(null)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
