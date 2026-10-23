import React, { useState } from 'react';
import { FileText, Download, Plus, CheckCircle2, Eye, Sparkles, X, Loader2 } from 'lucide-react';

export const AdvocateReportsView: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState('Matter Report');
  const [selectedMatter, setSelectedMatter] = useState('MAT-204 - Client vs ABC Corp');
  const [dateRange, setDateRange] = useState('01 Sep 2026 – 24 Sep 2026');
  const [reportFormat, setReportFormat] = useState<'PDF' | 'Excel'>('PDF');

  const [sections, setSections] = useState({
    summary: true,
    documents: true,
    evidence: true,
    timeline: true,
    deadlines: true,
    research: true,
    aiAnalysis: true,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generatedReport, setGeneratedReport] = useState<{ name: string; date: string; type: string } | null>(null);
  const [previewReportModal, setPreviewReportModal] = useState<boolean>(false);

  const [recentReports] = useState([
    { id: 'REP-MAT-204', name: 'MAT-204_Matter_Report.pdf', generated: '24 Sep 2026', type: 'PDF', status: 'Completed' },
    { id: 'REP-EVI-204', name: 'Evidence_Report_MAT-204.pdf', generated: '20 Sep 2026', type: 'PDF', status: 'Completed' },
    { id: 'REP-AI-204', name: 'AI_Analysis_Report_MAT-204.pdf', generated: '18 Sep 2026', type: 'PDF', status: 'Completed' },
  ]);

  const handleToggleSection = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setGenerationProgress(25);
    setGeneratedReport(null);

    setTimeout(() => setGenerationProgress(50), 400);
    setTimeout(() => setGenerationProgress(75), 800);
    setTimeout(() => {
      setGenerationProgress(100);
      setIsGenerating(false);
      setGeneratedReport({
        name: `${selectedMatter.split(' ')[0]}_${selectedReportType.replace(/\s+/g, '_')}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        type: reportFormat,
      });
    }, 1200);
  };

  const handleDownloadBlob = (reportName: string) => {
    const reportContent = `NETFIX AI — ADVOCATE WORKSPACE REPORT\nTitle: ${reportName}\nMatter: ${selectedMatter}\nDate Range: ${dateRange}\nFormat: ${reportFormat}\nGenerated: ${new Date().toISOString()}\n\nIncluded Sections:\n• Matter Summary\n• Attached Documents (6)\n• Evidence Dossier (4)\n• Case Timeline & Hearings\n• Legal Precedents & Citations\n• AI Analysis Grounding`;
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
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00B8FF]" />
            <span>Reports — Generate, View, Download</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Role-isolated report builder for authorized matters, evidence, and research notes.
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-lg shadow-[#00B8FF]/20"
        >
          <Plus className="w-4 h-4" />
          <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
        </button>
      </div>

      {/* Main 3-Column Grid matching Ref Panel 11 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col: Report Configurator */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00B8FF]" /> Generate Report
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Report Type</label>
              <select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              >
                <option>Matter Report</option>
                <option>Case Activity Report</option>
                <option>Evidence Report</option>
                <option>Deadline Report</option>
                <option>Legal Research Report</option>
                <option>AI Analysis Report</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Matter</label>
              <select
                value={selectedMatter}
                onChange={(e) => setSelectedMatter(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              >
                <option>MAT-204 - Client vs ABC Corp</option>
                <option>MAT-178 - Tax Appeal</option>
                <option>MAT-166 - Property Partition</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Date Range</label>
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider text-[10px]">Include Sections</label>
              <div className="space-y-1.5">
                {[
                  { key: 'summary', label: 'Matter Summary' },
                  { key: 'documents', label: 'Documents' },
                  { key: 'evidence', label: 'Evidence' },
                  { key: 'timeline', label: 'Timeline' },
                  { key: 'deadlines', label: 'Deadlines & Hearings' },
                  { key: 'research', label: 'Legal Research' },
                  { key: 'aiAnalysis', label: 'AI Analysis' },
                ].map((s) => (
                  <label key={s.key} className="flex items-center gap-2 p-2 rounded-xl bg-[#041828] border border-white/5 cursor-pointer text-slate-200 hover:border-white/20">
                    <input
                      type="checkbox"
                      checked={sections[s.key as keyof typeof sections]}
                      onChange={() => handleToggleSection(s.key as keyof typeof sections)}
                      className="accent-[#00B8FF]"
                    />
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>
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

            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full py-2.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold transition-all cursor-pointer mt-2 disabled:opacity-50"
            >
              {isGenerating ? 'Generating Formal Report...' : 'Generate Report'}
            </button>
          </div>
        </div>

        {/* Middle Col: Real-time Report Generation Progress (Ref Panel 11) */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 flex flex-col justify-between space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00B8FF]" /> Report Generation
          </h3>

          {isGenerating ? (
            <div className="space-y-4 text-center my-auto p-6 rounded-xl bg-[#041828] border border-[#00B8FF]/30">
              <Loader2 className="w-8 h-8 text-[#00B8FF] animate-spin mx-auto" />
              <div className="space-y-1">
                <span className="font-bold text-white block">Analyzing matter data... {generationProgress}%</span>
                <span className="text-[10px] text-slate-400 font-mono">Collecting authorized records</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[#00B8FF] h-full transition-all duration-300" style={{ width: `${generationProgress}%` }} />
              </div>
            </div>
          ) : generatedReport ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 my-auto">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-white">Report Generated Successfully!</h4>
              </div>
              <p className="text-slate-300 text-[11px] font-mono">{generatedReport.name} ({generatedReport.type})</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewReportModal(true)}
                  className="flex-1 py-2 rounded-xl bg-[#00B8FF] text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> View Report
                </button>
                <button
                  onClick={() => handleDownloadBlob(generatedReport.name)}
                  className="flex-1 py-2 rounded-xl bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 font-mono my-auto p-8 border border-dashed border-white/10 rounded-xl space-y-2">
              <FileText className="w-8 h-8 text-[#00B8FF] mx-auto opacity-50" />
              <p className="text-xs">Select options and click "Generate Report" to build formal PDF document.</p>
            </div>
          )}
        </div>

        {/* Right Col: Generated Reports History List (Ref Panel 11) */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Generated Reports</h3>
            <span className="text-[10px] font-mono text-slate-400">View All</span>
          </div>

          <div className="space-y-3">
            {recentReports.map((rep) => (
              <div
                key={rep.id}
                className="p-3.5 rounded-xl bg-[#041828] border border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs">{rep.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {rep.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{rep.generated}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadBlob(rep.name)}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" /> PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewReportModal && generatedReport && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#081525] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00B8FF]" /> Report Viewer: {generatedReport.name}
              </h3>
              <button onClick={() => setPreviewReportModal(false)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 rounded-xl bg-[#041828] border border-white/5 space-y-3 text-xs text-slate-200">
              <div className="flex justify-between border-b border-white/10 pb-2 text-[11px] text-slate-400">
                <span>Matter: {selectedMatter}</span>
                <span>Date Range: {dateRange}</span>
              </div>
              <h4 className="font-bold text-white text-sm">Advocate Legal Report Executive Summary</h4>
              <p>• Case MAT-204 verified evidence score: 4/4 items validated.</p>
              <p>• Upcoming filing: Written Submission due on 28 Sep 2026 before High Court.</p>
              <p>• Precedent analysis: Arnesh Kumar vs State applied.</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setPreviewReportModal(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold cursor-pointer">Close</button>
              <button onClick={() => handleDownloadBlob(generatedReport.name)} className="px-4 py-2 rounded-xl bg-[#00B8FF] text-white text-xs font-bold cursor-pointer">Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
