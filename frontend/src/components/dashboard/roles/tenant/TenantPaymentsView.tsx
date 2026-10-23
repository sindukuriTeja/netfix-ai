import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  RotateCcw,
  Download,
  CheckCircle2
} from 'lucide-react';

interface TenantPaymentsViewProps {
  onOpenProperty: (propertyId: string) => void;
}

export const TenantPaymentsView: React.FC<TenantPaymentsViewProps> = ({ onOpenProperty }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [feedback, setFeedback] = useState<string | null>(null);

  const payments = [
    { id: 'INV-204', propertyId: 'PROP-01', propertyName: 'Riverside Tower', amount: '₹5,00,000', dueDate: '28 Sep 2025', payDate: '--', status: 'Pending' },
    { id: 'INV-203', propertyId: 'PROP-01', propertyName: 'Riverside Tower', amount: '₹5,00,000', dueDate: '20 Aug 2025', payDate: '20 Aug 2025', status: 'Paid' },
    { id: 'INV-198', propertyId: 'PROP-03', propertyName: 'Skyline Plaza', amount: '₹2,50,000', dueDate: '15 Oct 2025', payDate: '--', status: 'Upcoming' },
  ];

  const filteredPayments = payments.filter((p) => {
    const matchesSearch = p.id.toLowerCase().includes(searchQuery.toLowerCase()) || p.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePayNow = (invId: string, amount: string) => {
    setFeedback(`Payment process initiated for ${invId} (${amount}). Redirecting to secure gateway...`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleDownloadReceipt = (invId: string) => {
    const element = document.createElement('a');
    const file = new Blob([`NETFIX AI MARG GROUP - RECEIPT FOR ${invId}\nStatus: Paid\nAmount Received.\nDate: ${new Date().toLocaleDateString()}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Receipt_${invId}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setFeedback(`Receipt for ${invId} downloaded successfully.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-amber-400" />
            <span>Payment Records & Receipts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View your invoices, payment history and upcoming dues.
          </p>
        </div>
        <button
          onClick={() => handlePayNow('INV-204', '₹5,00,000')}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
        >
          <CreditCard className="w-4 h-4" />
          <span>Make Payment</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* 4 Financial KPI Badges (Ref Panel 7) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Total Paid</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">₹12,50,000</div>
          <span className="text-[10px] text-emerald-400/80 font-bold">Cleared transactions</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Pending</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">₹2,00,000</div>
          <span className="text-[10px] text-amber-400/80 font-bold">Due for processing</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Overdue</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">₹50,000</div>
          <span className="text-[10px] text-rose-400/80 font-bold">Requires attention</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-xs font-semibold text-slate-400">Upcoming</span>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">₹2,00,000</div>
          <span className="text-[10px] text-[#00B8FF]/80 font-bold">Next billing cycle</span>
        </div>
      </div>

      {/* Filter Bar (Ref Panel 7) */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            placeholder="Search by invoice ID or property..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Upcoming">Upcoming</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('All');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Payment Table (Ref Panel 7) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">Invoice ID</th>
                <th className="p-3.5">Property</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Payment Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="p-3.5 font-mono font-bold text-[#00B8FF]">{p.id}</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => onOpenProperty(p.propertyId)}
                      className="font-bold text-white hover:text-[#00B8FF] hover:underline cursor-pointer"
                    >
                      {p.propertyName}
                    </button>
                  </td>
                  <td className="p-3.5 font-mono text-white font-bold">{p.amount}</td>
                  <td className="p-3.5 font-mono text-slate-300">{p.dueDate}</td>
                  <td className="p-3.5 font-mono text-slate-400">{p.payDate}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                      p.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : p.status === 'Pending' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {p.status === 'Pending' ? (
                      <button
                        onClick={() => handlePayNow(p.id, p.amount)}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs ml-auto cursor-pointer shadow-sm"
                      >
                        Pay Now
                      </button>
                    ) : p.status === 'Paid' ? (
                      <button
                        onClick={() => handleDownloadReceipt(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 font-bold text-xs flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Receipt</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`View Details for ${p.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs ml-auto cursor-pointer"
                      >
                        View
                      </button>
                    )}
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

export default TenantPaymentsView;
