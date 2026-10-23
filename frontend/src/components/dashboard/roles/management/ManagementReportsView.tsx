import React, { useState } from 'react';
import { FileText, Download, Plus, CheckCircle2, Eye, Sparkles, X } from 'lucide-react';

interface ManagementReportsViewProps {
  onAskAi?: (prompt?: string) => void;
}

export const ManagementReportsView: React.FC<ManagementReportsViewProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState('Executive Summary');
  const [timeRange, setTimeRange] = useState('Last 6 Months');
  const [departmentScope, setDepartmentScope] = useState('All Departments');
  const [reportFormat, setReportFormat] = useState<'PDF' | 'Excel'>('PDF');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<{ name: string; date: string; type: string } | null>(null);
  const [previewReportModal, setPreviewReportModal] = useState<boolean>(false);

  const recentReports = [
    { id: 'REP-EXEC-01', name: 'Executive Summary Q3 2026', generated: '24 Sep 2026', type: 'PDF' },
    { id: 'REP-RISK-02', name: 'Risk Analysis Report', generated: '20 Sep 2026', type: 'PDF' },
    { id: 'REP-PERF-03', name: 'Portfolio Performance', generated: '15 Sep 2026', type: 'PDF' },
    { id: 'REP-DOC-04', name: 'Document Summary', generated: '10 Sep 2026', type: 'PDF' },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setGeneratedReport(null);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport({
        name: `${selectedCategory} Q3 2026`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        type: reportFormat,
      });
    }, 1200);
  };

  const handleDownloadBlob = (reportName: string) => {
    const reportContent = `NETFIX AI — MARG GROUP EXECUTIVE REPORT\nTitle: ${reportName}\nCategory: ${selectedCategory}\nTime Range: ${timeRange}\nScope: ${departmentScope}\nGenerated: ${new Date().toISOString()}\n\nExecutive Summary:\n• All active matters (24) audited.\n• Risk exposure evaluated at ₹42.5 Cr.\n• 8 approvals pending executive signoff.`;
    const blob = new Blob([reportContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName.replace(/\s+/g, '_')}.${reportFormat === 'PDF' ? 'pdf' : 'xlsx'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00B8FF]" />
            <span>Reports (Generate & View)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Role-scoped report builder and downloadable executive report history.
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
        </button>
      </div>

      {/* SUCCESS STATE BANNER (Ref Panel 14) */}
      {generatedReport && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Report Generated Successfully!</h4>
              <p className="text-xs text-slate-300">
                <span className="font-bold text-emerald-300">{generatedReport.name}</span> ({generatedReport.type}) is ready for review.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewReportModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" /> View Report
            </button>
            <button
              onClick={() => handleDownloadBlob(generatedReport.name)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download {generatedReport.type}
            </button>
          </div>
        </div>
      )}

      {/* Report Generator Grid: Categories (Left) + Builder (Middle) + Recent Reports (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Export Categories Sidebar */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Export Categories</h3>
          <div className="space-y-1 text-xs">
            {[
              'Executive Summary',
              'Portfolio Report',
              'Risk Report',
              'Performance Report',
              'Compliance Report',
              'Financial Report',
              'Matter Report',
              'Approval Report',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00B8FF] text-white font-bold'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Report Builder Form */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
              Report Configurator — {selectedCategory}
            </h3>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              >
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Department Scope</label>
              <select
                value={departmentScope}
                onChange={(e) => setDepartmentScope(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              >
                <option>All Departments</option>
                <option>Legal</option>
                <option>Finance</option>
                <option>Compliance</option>
                <option>Tax</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1.5 font-semibold">Format</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 text-slate-200 cursor-pointer">
                  <input
                    type="radio"
                    name="fmt"
                    checked={reportFormat === 'PDF'}
                    onChange={() => setReportFormat('PDF')}
                    className="accent-[#00B8FF]"
                  />
                  <span>PDF Document</span>
                </label>
                <label className="flex items-center gap-1.5 text-slate-200 cursor-pointer">
                  <input
                    type="radio"
                    name="fmt"
                    checked={reportFormat === 'Excel'}
                    onChange={() => setReportFormat('Excel')}
                    className="accent-[#00B8FF]"
                  />
                  <span>Excel Spreadsheet</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold transition-all cursor-pointer mt-4 disabled:opacity-50"
          >
            {isGenerating ? 'Generating Executive Report...' : 'Generate Report'}
          </button>
        </div>

        {/* Recent Reports List */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Reports</h3>
            <span className="text-[10px] font-mono text-slate-400">View All</span>
          </div>

          <div className="space-y-3 text-xs">
            {recentReports.map((rep) => (
              <div
                key={rep.id}
                className="p-3.5 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <h4 className="font-bold text-white text-xs">{rep.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Generated: {rep.generated}</span>
                </div>
                <button
                  onClick={() => handleDownloadBlob(rep.name)}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" /> PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Preview Modal */}
      {previewReportModal && generatedReport && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#081525] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00B8FF]" />
                <span>Executive Report Viewer: {generatedReport.name}</span>
              </h3>
              <button onClick={() => setPreviewReportModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 rounded-xl bg-[#041828] border border-white/5 space-y-3 text-xs text-slate-200">
              <div className="flex justify-between border-b border-white/10 pb-2 text-[11px] text-slate-400">
                <span>Category: {selectedCategory}</span>
                <span>Time Range: {timeRange}</span>
                <span>Scope: {departmentScope}</span>
              </div>
              <h4 className="font-bold text-white text-sm">Key Executive Summary Highlights</h4>
              <p>• Portfolio Valuation: ₹42.5 Cr across 24 active corporate matters.</p>
              <p>• High-Risk Matters: 5 cases identified with pending statutory hearing deadlines.</p>
              <p>• Compliance Rating: 86% resolution compliance across Legal, Tax, and Audit teams.</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setPreviewReportModal(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold cursor-pointer">
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadBlob(generatedReport.name);
                  setPreviewReportModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#00B8FF] text-white text-xs font-bold cursor-pointer"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
