import React, { useState } from 'react';
import { FileText, Download, Sparkles } from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  caseId: string;
  type: string;
  generatedDate: string;
  aiSource: string;
  reviewStatus: string;
}

export const EmployeeReportsView: React.FC = () => {
  const [reports] = useState<ReportItem[]>([
    {
      id: 'REP-102-01',
      title: 'Case Comprehensive Summary & Tax Mismatch Analysis',
      caseId: 'CASE-102',
      type: 'Case Summary',
      generatedDate: '24 Sep 2026',
      aiSource: 'Gemini (Communication & Reporting Agent)',
      reviewStatus: 'Employee Reviewed',
    },
    {
      id: 'REP-102-02',
      title: 'Legal Research & Precedent Citation Report',
      caseId: 'CASE-102',
      type: 'Research Report',
      generatedDate: '24 Sep 2026',
      aiSource: 'Gemini (Legal Research Agent)',
      reviewStatus: 'Employee Reviewed',
    },
    {
      id: 'REP-102-03',
      title: 'Risk Score & Exposure Compliance Audit',
      caseId: 'CASE-102',
      type: 'Risk Report',
      generatedDate: '24 Sep 2026',
      aiSource: 'Gemini (Risk & Compliance Agent)',
      reviewStatus: 'Employee Reviewed',
    },
  ]);

  const handleDownload = (reportId: string) => {
    window.open(`/api/agent/reports/download/${reportId}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00B8FF]" />
            <span>Reporting System (Module 28)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Role-scoped PDF report builder with MARG Group header branding & citation verification log.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((rep) => (
          <div key={rep.id} className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#00B8FF]">{rep.caseId}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {rep.reviewStatus}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{rep.title}</h3>
              <p className="text-xs text-slate-400">
                Type: <span className="text-slate-200 font-semibold">{rep.type}</span> | Generated: {rep.generatedDate}
              </p>
              <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#00B8FF]" />
                <span>AI Source: {rep.aiSource}</span>
              </div>
            </div>

            <button
              onClick={() => handleDownload(rep.id)}
              className="w-full py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Report</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
