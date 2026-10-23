import React, { useState } from 'react';
import { ShieldAlert, Search, Sparkles, X } from 'lucide-react';

interface RiskItem {
  id: string;
  matterId: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  exposure: string;
  deadline: string;
  status: 'Open' | 'Mitigating' | 'Monitoring';
  department: string;
}

interface ManagementRiskOverviewProps {
  onAskAi: (prompt?: string) => void;
  onOpenMatter: (matterId: string) => void;
}

export const ManagementRiskOverview: React.FC<ManagementRiskOverviewProps> = ({ onAskAi, onOpenMatter }) => {
  const [risks] = useState<RiskItem[]>([
    { id: 'RISK-001', matterId: 'CASE-102', type: 'Tax', severity: 'Critical', exposure: '₹9.2 Cr', deadline: '3 days', status: 'Open', department: 'Tax' },
    { id: 'RISK-002', matterId: 'CASE-087', type: 'Litigation', severity: 'High', exposure: '₹1.2 Cr', deadline: '7 days', status: 'Open', department: 'Legal' },
    { id: 'RISK-003', matterId: 'CASE-095', type: 'Compliance', severity: 'Medium', exposure: '₹45 L', deadline: '12 days', status: 'Mitigating', department: 'Compliance' },
    { id: 'RISK-004', matterId: 'CASE-[#721', type: 'Financial', severity: 'Medium', exposure: '₹80 L', deadline: '25 days', status: 'Monitoring', department: 'Finance' },
    { id: 'RISK-005', matterId: 'CASE-032', type: 'Operational', severity: 'Low', exposure: '₹20 L', deadline: '30 days', status: 'Monitoring', department: 'Corporate' },
  ]);

  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>Risk Overview (Firm-wide Risk Register)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Centralized statutory exposure monitoring, department risk heatmaps & mitigation tracking.
          </p>
        </div>
      </div>

      {/* Risk Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
          <span className="font-semibold block text-slate-400">Critical</span>
          <span className="text-2xl font-extrabold font-mono text-rose-400 block mt-1">3</span>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
          <span className="font-semibold block text-slate-400">High</span>
          <span className="text-2xl font-extrabold font-mono text-amber-400 block mt-1">5</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 text-slate-300">
          <span className="font-semibold block text-slate-400">Medium</span>
          <span className="text-2xl font-extrabold font-mono text-white block mt-1">12</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 text-slate-300">
          <span className="font-semibold block text-slate-400">Low</span>
          <span className="text-2xl font-extrabold font-mono text-emerald-400 block mt-1">8</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 text-slate-300">
          <span className="font-semibold block text-slate-400">Total Risks</span>
          <span className="text-2xl font-extrabold font-mono text-[#00B8FF] block mt-1">28</span>
        </div>
      </div>

      {/* Risk Register Table */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white">Risk Register</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search risks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Risk ID</th>
                <th className="pb-3 font-semibold">Related Matter</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Severity</th>
                <th className="pb-3 font-semibold">Exposure</th>
                <th className="pb-3 font-semibold">Deadline</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {risks.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-mono font-bold text-rose-400">{r.id}</td>
                  <td
                    onClick={() => onOpenMatter(r.matterId)}
                    className="py-3 font-mono text-[#00B8FF] font-bold hover:underline cursor-pointer"
                  >
                    {r.matterId}
                  </td>
                  <td className="py-3 text-slate-300">{r.type}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.severity === 'Critical' || r.severity === 'High'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {r.severity}
                    </span>
                  </td>
                  <td className="py-3 font-mono font-bold text-emerald-400">{r.exposure}</td>
                  <td className="py-3 font-mono text-rose-400">{r.deadline}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-300">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelectedRisk(r)}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold cursor-pointer"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Heatmap & Risk AI Analyst */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Heatmap (Departments Matrix) */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Risk Heatmap (Departments)</h3>
          <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono">
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300">
              <span className="text-[10px] font-sans block text-slate-400">Legal</span>
              <span className="font-bold text-base">3 Critical</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <span className="text-[10px] font-sans block text-slate-400">Finance</span>
              <span className="font-bold text-base">2 High</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <span className="text-[10px] font-sans block text-slate-400">Compliance</span>
              <span className="font-bold text-base">4 Med</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">
              <span className="text-[10px] font-sans block text-slate-400">Corporate</span>
              <span className="font-bold text-base">1 Low</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300">
              <span className="text-[10px] font-sans block text-slate-400">Tax</span>
              <span className="font-bold text-base">2 Critical</span>
            </div>
          </div>
        </div>

        {/* Risk AI Analyst */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-[#00B8FF]/30 space-y-3 flex flex-col justify-between">
          <div className="space-y-2 text-xs">
            <span className="font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#00B8FF]" /> Risk AI Analyst
            </span>
            <p className="text-slate-200 leading-relaxed">
              3 critical risks require immediate management intervention, mainly in tax and litigation matters.
            </p>
          </div>

          <button
            onClick={() => onAskAi('Summarize top statutory risks and provide mitigation advice')}
            className="w-full py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold transition-all cursor-pointer"
          >
            Ask AI About Risks
          </button>
        </div>
      </div>

      {/* Risk Detail Modal */}
      {selectedRisk && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#081525] border border-white/10 p-6 space-y-4 shadow-2xl relative text-xs">
            <button
              onClick={() => setSelectedRisk(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-bold text-white">Risk Detail — {selectedRisk.id}</h3>
            </div>

            <div className="space-y-2 text-slate-200">
              <p>Related Matter: <span className="font-mono text-[#00B8FF] font-bold">{selectedRisk.matterId}</span></p>
              <p>Risk Type: <span className="font-semibold text-white">{selectedRisk.type}</span></p>
              <p>Severity: <span className="font-bold text-rose-400">{selectedRisk.severity}</span></p>
              <p>Exposure: <span className="font-mono font-bold text-emerald-400">{selectedRisk.exposure}</span></p>
              <p>Deadline: <span className="font-mono text-rose-400">{selectedRisk.deadline}</span></p>
            </div>

            <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-1">
              <span className="font-bold text-white">Contributing Factors</span>
              <p className="text-slate-400">
                Supplier ITC mismatch under CGST Act Section 16(2) and approaching 30-day notice response window.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => { setSelectedRisk(null); onOpenMatter(selectedRisk.matterId); }}
                className="px-4 py-2 rounded-xl bg-[#00B8FF] text-white font-bold cursor-pointer"
              >
                Go to Related Matter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
