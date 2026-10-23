import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Download,
  CheckCircle2,
  BarChart2
} from 'lucide-react';

export interface AdminReportsAnalyticsViewProps {
  onOpenGenerateReportModal?: () => void;
}

export const AdminReportsAnalyticsView: React.FC<AdminReportsAnalyticsViewProps> = ({ onOpenGenerateReportModal }) => {
  const [subTab, setSubTab] = useState<'compliance' | 'activity' | 'agent' | 'access'>('compliance');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const recentReports = [
    { name: 'Q3-Compliance Report', type: 'Compliance', generatedOn: '20 Sep 2026', status: 'Completed' },
    { name: 'User-Activity-Summary', type: 'User Activity', generatedOn: '18 Sep 2026', status: 'Completed' },
    { name: 'Audit-Findings-Report', type: 'Findings', generatedOn: '15 Sep 2026', status: 'Completed' },
    { name: 'Access-Control-Export', type: 'Security', generatedOn: '12 Sep 2026', status: 'Completed' },
  ];

  const handleDownload = (reportName: string) => {
    const content = `NETFIX AI — PLATFORM EXECUTIVE REPORT\nReport Name: ${reportName}\nGenerated: ${new Date().toLocaleDateString()}\nStatus: Official Verified Export\n`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloaded ${reportName}.pdf`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast */}
      {downloadToast && (
        <div className="p-3 rounded-xl bg-[#00B8FF]/20 border border-[#00B8FF]/40 text-[#00B8FF] text-xs font-bold font-mono animate-bounce flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <BarChart2 className="w-6 h-6 text-[#00B8FF]" />
            <span>Reports & Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate compliance, audit, and operational reports.
          </p>
        </div>

        <button
          onClick={onOpenGenerateReportModal}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors flex items-center gap-2 shadow-lg shadow-[#00B8FF]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Sub Tabs (Matching Panel 9) */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
        {[
          { id: 'compliance', label: 'Compliance Reports' },
          { id: 'activity', label: 'User Activity Reports' },
          { id: 'agent', label: 'Agent Performance' },
          { id: 'access', label: 'Access Reports' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id as any)}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              subTab === t.id ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 4 Report Generator Cards (Matching Panel 9) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Audit Compliance Report</h3>
            <p className="text-[11px] text-slate-400">Regulatory compliance score and status breakdown.</p>
          </div>
          <button
            onClick={onOpenGenerateReportModal}
            className="w-full py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors shadow-md"
          >
            Generate
          </button>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">User Activity Report</h3>
            <p className="text-[11px] text-slate-400">Login, access and session usage logs.</p>
          </div>
          <button
            onClick={onOpenGenerateReportModal}
            className="w-full py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors shadow-md"
          >
            Generate
          </button>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Findings Report</h3>
            <p className="text-[11px] text-slate-400">Open and resolved audit findings overview.</p>
          </div>
          <button
            onClick={onOpenGenerateReportModal}
            className="w-full py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors shadow-md"
          >
            Generate
          </button>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Risk Assessment Report</h3>
            <p className="text-[11px] text-slate-400">Risk and control matrix status report.</p>
          </div>
          <button
            onClick={onOpenGenerateReportModal}
            className="w-full py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors shadow-md"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Recent Reports Table (Matching Panel 9) */}
      <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3">
        <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">Recent Reports</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">REPORT NAME</th>
                <th className="p-3.5">TYPE</th>
                <th className="p-3.5">GENERATED ON</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5 pr-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {recentReports.map((r, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-4 font-mono font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00B8FF]" />
                    <span>{r.name}</span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{r.type}</td>
                  <td className="p-3.5 font-mono text-slate-400">{r.generatedOn}</td>
                  <td className="p-3.5 font-mono">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3.5 pr-4 text-right">
                    <button
                      onClick={() => handleDownload(r.name)}
                      className="px-3 py-1.5 rounded-xl bg-[#00B8FF]/10 text-[#00B8FF] hover:bg-[#00B8FF]/20 text-xs font-bold transition-colors flex items-center gap-1.5 ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
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
