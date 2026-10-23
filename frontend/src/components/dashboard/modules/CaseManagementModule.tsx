import React, { useState } from 'react';
import { Briefcase, Plus, CheckCircle } from 'lucide-react';

export interface CaseItem {
  id: string;
  name: string;
  entityName: string;
  type: 'Tax' | 'Property' | 'Legal' | 'Corporate' | 'Litigation';
  status: 'Open' | 'In Review' | 'Awaiting Approval' | 'Completed';
  updated: string;
}

export const CaseManagementModule: React.FC = () => {
  const [cases, setCases] = useState<CaseItem[]>([
    { id: 'c_1', name: 'GST Compliance Filing', entityName: 'MARG Technologies Pvt Ltd', type: 'Tax', status: 'In Review', updated: '22 Sep 2026' },
    { id: 'c_2', name: 'Property Agreement', entityName: 'Teja Enterprises', type: 'Property', status: 'Open', updated: '21 Sep 2026' },
    { id: 'c_3', name: 'Legal Notice Response', entityName: 'Reddy Logistics', type: 'Legal', status: 'Awaiting Approval', updated: '20 Sep 2026' },
  ]);
  const [activeTab, setActiveTab] = useState<'All' | 'Open' | 'In Review' | 'Awaiting Approval' | 'Completed'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [caseTitle, setCaseTitle] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('MARG Technologies Pvt Ltd');
  const [caseType, setCaseType] = useState<'Tax' | 'Property' | 'Legal' | 'Corporate' | 'Litigation'>('Tax');
  const [notification, setNotification] = useState<string | null>(null);

  const filteredCases = cases.filter((c) => {
    if (activeTab === 'All') return true;
    return c.status === activeTab;
  });

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseTitle) return;
    const newCase: CaseItem = {
      id: `case_${Date.now()}`,
      name: caseTitle,
      entityName: selectedEntity,
      type: caseType,
      status: 'Open',
      updated: 'Today',
    };
    setCases([newCase, ...cases]);
    setCaseTitle('');
    setShowAddModal(false);
    setNotification(`Case "${newCase.name}" opened. Verified entity ownership and scope.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-extrabold text-sm">
            4
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              Case Management
            </h3>
            <p className="text-xs text-slate-400">Every Matter. In One Place.</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Case</span>
        </button>
      </div>

      {notification && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Grid Content Left, Feature Checklist Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Cases Table & Filter Tabs (3 Cols) */}
        <div className="lg:col-span-3 space-y-3">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/10 text-xs overflow-x-auto">
            {(['All', 'Open', 'In Review', 'Awaiting Approval', 'Completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.04] text-slate-400 border-b border-white/10 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-2.5">Case Name</th>
                  <th className="p-2.5">Type</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-2.5">
                      <div className="font-semibold text-white">{c.name}</div>
                      <div className="text-[10px] text-slate-400">Entity: {c.entityName}</div>
                    </td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/[0.06] text-slate-300 border border-white/10">
                        {c.type}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          c.status === 'Open'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : c.status === 'In Review'
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                            : c.status === 'Awaiting Approval'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-right text-slate-400 text-[11px]">{c.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature List Column (Right) */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-2.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Case Capabilities</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Create & manage cases</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Status tracking</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Case notes (internal)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Status history</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Role-based visibility</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Central hub for all modules</span>
            </li>
          </ul>
        </div>
      </div>

      {/* New Case Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1728] border border-white/20 rounded-2xl max-w-md w-full p-5 space-y-4 text-white shadow-2xl">
            <h3 className="text-base font-bold">Open New Case / Matter</h3>
            <form onSubmit={handleCreateCase} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Case Title</label>
                <input
                  type="text"
                  required
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                  placeholder="e.g. GST Annual Audit 2026"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Associated Entity</label>
                <select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="MARG Technologies Pvt Ltd">MARG Technologies Pvt Ltd</option>
                  <option value="Teja Enterprises">Teja Enterprises</option>
                  <option value="Reddy Logistics">Reddy Logistics</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Module / Matter Type</label>
                <select
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="Tax">Tax</option>
                  <option value="Property">Property</option>
                  <option value="Legal">Legal</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Litigation">Litigation</option>
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
                  Create Matter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
