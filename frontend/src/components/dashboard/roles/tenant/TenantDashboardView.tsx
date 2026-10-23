import React from 'react';
import {
  Home,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface TenantDashboardViewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenProperty: (propertyId: string) => void;
}

export const TenantDashboardView: React.FC<TenantDashboardViewProps> = ({
  onNavigateTab,
  onOpenProperty,
}) => {
  const propertyPortfolio = [
    { id: 'PROP-01', name: 'Riverside Tower', unit: 'Unit 501', location: 'Mumbai', status: 'Active', agreement: 'Active Agreement (28 Sep 2025)' },
    { id: 'PROP-02', name: 'Maple Business Park', unit: 'Suite 12', location: 'Bengaluru', status: 'Pending', agreement: 'Draft Agreement (01 Sep 2025)' },
    { id: 'PROP-03', name: 'Skyline Plaza', unit: 'Retail 4', location: 'Hyderabad', status: 'Active', agreement: 'Document Expiry (15 Oct 2025)' },
  ];

  const upcomingDeadlines = [
    { title: 'Rent Payment Due', property: 'Riverside Tower - Unit 501', days: '2 days', status: 'High' },
    { title: 'Agreement Renewal', property: 'Skyline Plaza - Retail 4', days: '18 days', status: 'Medium' },
    { title: 'Document Expiry (Insurance)', property: 'Maple Business Park', days: '25 days', status: 'Medium' },
  ];

  const recentActivity = [
    { title: 'Agreement signed', detail: 'Riverside Tower - Unit 501', time: '2 hours ago', tab: 'agreements' },
    { title: 'Payment received', detail: '₹5,00,000 (Invoice #INV-204)', time: '1 day ago', tab: 'payments' },
    { title: 'New document uploaded', detail: 'Compliance Certificate', time: '2 days ago', tab: 'documents' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner (Ref Panel 1) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome, Arjun Patel 👋</h1>
            <span className="px-3 py-1 rounded-full bg-[#00B8FF]/10 text-[#00B8FF] border border-[#00B8FF]/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Tenant/Buyer Isolation Active</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage your properties, agreements, payments and requests from one workspace.
          </p>
        </div>
      </div>

      {/* 8 Executive KPI Metric Badges (Ref Panel 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div
          onClick={() => onNavigateTab('properties')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Properties</span>
          <span className="text-xl font-mono font-extrabold text-[#00B8FF]">3</span>
        </div>

        <div
          onClick={() => onNavigateTab('inquiries')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Inquiries</span>
          <span className="text-xl font-mono font-extrabold text-indigo-400">4</span>
        </div>

        <div
          onClick={() => onNavigateTab('agreements')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Agreements</span>
          <span className="text-xl font-mono font-extrabold text-emerald-400">2</span>
        </div>

        <div
          onClick={() => onNavigateTab('payments')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Pay</span>
          <span className="text-xs font-mono font-extrabold text-amber-400 block truncate">₹2,00,000</span>
        </div>

        <div
          onClick={() => onNavigateTab('requests')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Requests</span>
          <span className="text-xl font-mono font-extrabold text-purple-400">3</span>
        </div>

        <div
          onClick={() => onNavigateTab('agreements')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Renewals</span>
          <span className="text-xl font-mono font-extrabold text-cyan-400">1</span>
        </div>

        <div
          onClick={() => onNavigateTab('documents')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Expiring</span>
          <span className="text-xl font-mono font-extrabold text-rose-400">1</span>
        </div>

        <div
          onClick={() => onNavigateTab('messages')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Messages</span>
          <span className="text-xl font-mono font-extrabold text-[#00B8FF]">4</span>
        </div>
      </div>

      {/* Main Grid: Property Portfolio & Upcoming Deadlines / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Property Portfolio (Ref Panel 1) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Home className="w-4 h-4 text-[#00B8FF]" />
              <span>Property Portfolio</span>
            </h3>
            <button
              onClick={() => onNavigateTab('properties')}
              className="text-xs text-[#00B8FF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {propertyPortfolio.map((p) => (
              <div
                key={p.id}
                onClick={() => onOpenProperty(p.id)}
                className="p-4 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between gap-4 hover:border-[#00B8FF]/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00B8FF]/10 border border-[#00B8FF]/20 flex items-center justify-center text-[#00B8FF] font-bold text-xs shrink-0">
                    {p.id}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{p.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">{p.unit} • {p.location}</p>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{p.agreement}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                  p.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Deadlines & Activity (Ref Panel 1) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Deadlines Box */}
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-400" />
                <span>Upcoming Deadlines</span>
              </h3>
              <button
                onClick={() => onNavigateTab('agreements')}
                className="text-xs text-[#00B8FF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {upcomingDeadlines.map((d) => (
                <div key={d.title} className="p-3.5 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white">{d.title}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">{d.property}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded font-mono font-bold text-[10px] ${
                    d.status === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {d.days}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Box */}
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Recent Activity</span>
            </h3>

            <div className="space-y-2.5">
              {recentActivity.map((act) => (
                <div
                  key={act.title + act.time}
                  onClick={() => onNavigateTab(act.tab)}
                  className="p-3 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between text-xs hover:border-[#00B8FF]/30 transition-all cursor-pointer"
                >
                  <div>
                    <h4 className="font-bold text-white text-[11px]">{act.title}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{act.detail}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboardView;
