import React, { useState } from 'react';
import { FileText, Search, Download, Eye, RotateCcw, X } from 'lucide-react';

interface AccessibleLegalDoc {
  id: string;
  caseName: string;
  citation: string;
  date: string;
  court: string;
  jurisdiction: string;
  type: string;
  accessStatus: 'Granted' | 'Pending' | 'Locked';
}

export const AdvocateLegalDocumentsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Accessible' | 'Waiting'>('Accessible');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<AccessibleLegalDoc | null>(null);

  const [documents] = useState<AccessibleLegalDoc[]>([
    { id: 'LD-001', caseName: 'Arnesh Kumar vs State of Bihar (2014)', citation: 'AIR 2014 SC 2756', date: '2014', court: 'Supreme Court', jurisdiction: 'India', type: 'Judgment', accessStatus: 'Granted' },
    { id: 'LD-002', caseName: 'State of Maharashtra vs XYZ', citation: '2018 BM 102', date: '2018', court: 'Bombay High Court', jurisdiction: 'Maharashtra', type: 'Order', accessStatus: 'Granted' },
    { id: 'LD-003', caseName: 'ICICI Bank vs Debtors', citation: '9 SCC 1', date: '2001', court: 'Supreme Court', jurisdiction: 'India', type: 'Judgment', accessStatus: 'Granted' },
    { id: 'LD-004', caseName: 'Tata Sons vs Mistry', citation: '11 SCC 128', date: '2021', court: 'NCLT Mumbai', jurisdiction: 'Corporate', type: 'Order', accessStatus: 'Granted' },
    { id: 'LD-005', caseName: 'Union of India vs Unitech', citation: '2017 SC 100', date: '2017', court: 'Supreme Court', jurisdiction: 'India', type: 'Judgment', accessStatus: 'Granted' },
  ]);

  const [waitingDocs] = useState<AccessibleLegalDoc[]>([
    { id: 'LD-006', caseName: 'Anvesh Kumar vs State.pdf', citation: '2026 SC 1386', date: '2026', court: 'Supreme Court', jurisdiction: 'India', type: 'Filing', accessStatus: 'Pending' },
    { id: 'LD-007', caseName: 'ABC Ltd vs Telangana.pdf', citation: '2026 HC 402', date: '2026', court: 'High Court', jurisdiction: 'Telangana', type: 'Order', accessStatus: 'Pending' },
  ]);

  const currentDocs = activeTab === 'Accessible' ? documents : waitingDocs;

  const filteredDocs = currentDocs.filter((d) =>
    d.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.citation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.court.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00B8FF]" />
            <span>Legal Document Library — Accessible Case Documents</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Documents available to you based on matter assignment and approved access permissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('Accessible')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
              activeTab === 'Accessible' ? 'bg-[#00B8FF] text-white shadow-lg shadow-[#00B8FF]/20' : 'bg-white/5 text-slate-400'
            }`}
          >
            Accessible Documents ({documents.length})
          </button>
          <button
            onClick={() => setActiveTab('Waiting')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
              activeTab === 'Waiting' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-white/5 text-slate-400'
            }`}
          >
            Waiting Approval ({waitingDocs.length})
          </button>
        </div>
      </div>

      {/* Filter Bar matching Panel 7 */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-2">
          <div className="relative sm:col-span-2">
            <input
              type="text"
              placeholder="Search case name, citation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>

          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Court — All</option>
            <option>Supreme Court</option>
            <option>High Court</option>
          </select>

          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Year — All</option>
            <option>2026</option>
            <option>2021</option>
            <option>2018</option>
          </select>

          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Jurisdiction — All</option>
            <option>India</option>
            <option>Telangana</option>
          </select>

          <button
            onClick={() => setSearchQuery('')}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Table matching Panel 7 */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Case Name</th>
                <th className="pb-3 font-semibold">Citation</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Court / Location</th>
                <th className="pb-3 font-semibold">Jurisdiction</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Access</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDocs.map((d) => (
                <tr key={d.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00B8FF]" />
                    {d.caseName}
                  </td>
                  <td className="py-3.5 font-mono text-purple-300 font-bold">{d.citation}</td>
                  <td className="py-3.5 font-mono text-slate-400">{d.date}</td>
                  <td className="py-3.5 text-slate-300">{d.court}</td>
                  <td className="py-3.5 text-slate-300">{d.jurisdiction}</td>
                  <td className="py-3.5 text-slate-300">{d.type}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.accessStatus === 'Granted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {d.accessStatus}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedDoc(d)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                      <button
                        onClick={() => {
                          const blob = new Blob([`Content of ${d.caseName}`], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${d.id}.txt`;
                          a.click();
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#00B8FF] cursor-pointer"
                        title="Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Document Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#081525] border border-white/10 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00B8FF]" /> Case Document: {selectedDoc.caseName}
              </h3>
              <button onClick={() => setSelectedDoc(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 rounded-xl bg-[#041828] border border-white/5 space-y-2">
              <div className="flex justify-between text-slate-300"><span>Case Name:</span><span className="font-bold text-white">{selectedDoc.caseName}</span></div>
              <div className="flex justify-between text-slate-300"><span>Citation:</span><span className="font-mono text-purple-300 font-bold">{selectedDoc.citation}</span></div>
              <div className="flex justify-between text-slate-300"><span>Court:</span><span className="font-bold text-white">{selectedDoc.court}</span></div>
              <div className="flex justify-between text-slate-300"><span>Access Status:</span><span className="font-bold text-emerald-400">{selectedDoc.accessStatus}</span></div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setSelectedDoc(null)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-bold cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
