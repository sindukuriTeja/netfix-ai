import React, { useState } from 'react';
import { FileCheck2, Search } from 'lucide-react';

interface ApprovalItem {
  id: string;
  title: string;
  category: string;
  relatedMatter: string;
  requester: string;
  department: string;
  value: string;
  priority: 'High' | 'Medium' | 'Low';
  submittedDate: string;
  dueDate: string;
  status: 'Pending' | 'Due Soon' | 'Approved' | 'Rejected';
}

interface ManagementApprovalsListProps {
  onSelectApproval: (approvalId: string) => void;
}

export const ManagementApprovalsList: React.FC<ManagementApprovalsListProps> = ({ onSelectApproval }) => {
  const [approvals] = useState<ApprovalItem[]>([
    {
      id: 'APP-204',
      title: 'Approve Q3 Financial Compliance Report',
      category: 'Audit',
      relatedMatter: 'CASE-102',
      requester: 'Amit Sharma',
      department: 'Audit',
      value: '₹1.2 Cr',
      priority: 'High',
      submittedDate: '20 Sep 2026',
      dueDate: '28 Sep 2026',
      status: 'Pending',
    },
    {
      id: 'APP-198',
      title: 'Legal Counsel Budget Allocation',
      category: 'Finance',
      relatedMatter: 'CASE-087',
      requester: 'Prakash Rao',
      department: 'Finance',
      value: '₹40 L',
      priority: 'High',
      submittedDate: '22 Sep 2026',
      dueDate: '03 Oct 2026',
      status: 'Pending',
    },
    {
      id: 'APP-195',
      title: 'Settlement Authorization Sign-off',
      category: 'Corporate',
      relatedMatter: 'CASE-091',
      requester: 'Anjali Verma',
      department: 'Corporate',
      value: '₹85 L',
      priority: 'Medium',
      submittedDate: '23 Sep 2026',
      dueDate: '05 Oct 2026',
      status: 'Pending',
    },
    {
      id: 'APP-190',
      title: 'Document Processing Clearance',
      category: 'Legal',
      relatedMatter: 'CASE-068',
      requester: 'Suresh Kumar',
      department: 'Legal',
      value: '₹25 L',
      priority: 'Low',
      submittedDate: '24 Sep 2026',
      dueDate: '10 Oct 2026',
      status: 'Pending',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'Pending' | 'Due Soon' | 'Approved' | 'Rejected'>('Pending');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApprovals = approvals.filter((a) => {
    if (activeTab === 'Due Soon' && a.dueDate !== '28 Sep 2026') return false;
    if (
      searchQuery &&
      !a.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !a.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-[#00B8FF]" />
            <span>Approvals (Executive Decision Queue)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Review and decide on executive requests, financial allocations & compliance sign-offs.
          </p>
        </div>

        <div className="flex bg-[#041828] p-1 rounded-xl border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('Pending')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'Pending' ? 'bg-[#00B8FF] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending (8)
          </button>
          <button
            onClick={() => setActiveTab('Due Soon')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'Due Soon' ? 'bg-[#00B8FF] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Due Soon (3)
          </button>
          <button
            onClick={() => setActiveTab('Approved')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'Approved' ? 'bg-[#00B8FF] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setActiveTab('Rejected')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'Rejected' ? 'bg-[#00B8FF] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white">Pending Approval Queue</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search approvals..."
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
                <th className="pb-3 font-semibold">ID</th>
                <th className="pb-3 font-semibold">Approval Title</th>
                <th className="pb-3 font-semibold">Related Matter</th>
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold">Value</th>
                <th className="pb-3 font-semibold">Due Date</th>
                <th className="pb-3 font-semibold">Priority</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredApprovals.map((app) => (
                <tr key={app.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 font-mono font-bold text-[#00B8FF]">{app.id}</td>
                  <td className="py-3.5 font-bold text-white max-w-xs">{app.title}</td>
                  <td className="py-3.5 font-mono text-purple-300 font-bold">{app.relatedMatter}</td>
                  <td className="py-3.5 text-slate-300">{app.department}</td>
                  <td className="py-3.5 font-mono font-bold text-emerald-400">{app.value}</td>
                  <td className="py-3.5 font-mono text-rose-400">{app.dueDate}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        app.priority === 'High'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {app.priority} Priority
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onSelectApproval(app.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Review
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
