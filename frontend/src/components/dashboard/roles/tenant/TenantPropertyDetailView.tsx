import React, { useState } from 'react';
import {
  ArrowLeft,
  Building,
  FileCheck2,
  FileText,
  CreditCard,
  HelpCircle,
  Send,
  Activity,
  MoreHorizontal
} from 'lucide-react';

interface TenantPropertyDetailViewProps {
  propertyId: string;
  onBack: () => void;
}

export const TenantPropertyDetailView: React.FC<TenantPropertyDetailViewProps> = ({
  propertyId,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'agreement' | 'documents' | 'payments' | 'inquiries' | 'requests' | 'activity'>('overview');

  const propData = {
    id: propertyId,
    name: 'Riverside Tower — Unit 501',
    status: 'Active',
    type: 'Office',
    location: 'Mumbai, Maharashtra',
    project: 'Riverside Tower',
    unit: '501',
    role: 'Tenant',
    agreementStatus: 'Active',
    nextRentDue: '28 Sep 2025',
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00B8FF] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Properties</span>
        </button>

        <button
          onClick={() => alert(`More Actions for ${propData.name}`)}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs flex items-center gap-1 border border-white/10 cursor-pointer"
        >
          <span>More Actions</span>
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Main Title Banner */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">{propData.name}</h1>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {propData.status}
          </span>
        </div>
      </div>

      {/* 7 Property Sub-Tabs (Ref Panel 3) */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 pb-2">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'agreement', label: 'Agreement' },
          { id: 'documents', label: 'Documents' },
          { id: 'payments', label: 'Payments' },
          { id: 'inquiries', label: 'Inquiries' },
          { id: 'requests', label: 'Requests' },
          { id: 'activity', label: 'Activity' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#00B8FF] text-slate-950 font-extrabold shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Areas */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Pane: Property Photo Card (Ref Panel 3) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#081525] border border-white/10 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-full h-48 rounded-xl bg-gradient-to-br from-slate-800 to-[#041828] border border-white/10 flex flex-col items-center justify-center p-4">
              <Building className="w-12 h-12 text-[#00B8FF] mb-2" />
              <span className="font-extrabold text-white text-base">{propData.name}</span>
              <span className="text-xs text-slate-400 font-mono">{propData.location}</span>
            </div>
          </div>

          {/* Right Pane: Property Details Grid (Ref Panel 3) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Building className="w-4 h-4 text-[#00B8FF]" />
              <span>Property Overview</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Property ID</span>
                <span className="font-mono font-bold text-[#00B8FF]">{propData.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Type</span>
                <span className="text-white font-bold">{propData.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Project</span>
                <span className="text-white font-bold">{propData.project}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Location</span>
                <span className="text-slate-200 font-medium">{propData.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Unit / Suite</span>
                <span className="font-mono text-slate-200 font-bold">{propData.unit}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Your Role</span>
                <span className="text-[#00B8FF] font-bold">{propData.role}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Agreement Status</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  {propData.agreementStatus}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Next Rent Due</span>
                <span className="font-mono text-rose-400 font-bold">{propData.nextRentDue}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'agreement' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-3">
            <FileCheck2 className="w-4 h-4 text-[#00B8FF]" />
            <span>Associated Agreement for {propData.name}</span>
          </h3>
          <p className="text-slate-300">Active Commercial Lease Agreement (AGR-001). Valid through 31 Dec 2026.</p>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-3">
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Property Documents</span>
          </h3>
          <p className="text-slate-300">Contract_Agreement_2025.pdf, Compliance_Certificate.pdf</p>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-3">
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>Payment History & Invoices</span>
          </h3>
          <p className="text-slate-300">Invoice #INV-204 (₹5,00,000 Due 28 Sep 2025)</p>
        </div>
      )}

      {activeTab === 'inquiries' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-3">
            <HelpCircle className="w-4 h-4 text-[#00B8FF]" />
            <span>Property Inquiries</span>
          </h3>
          <p className="text-slate-300">INQ-101: Clarification on renewal terms</p>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-3">
            <Send className="w-4 h-4 text-emerald-400" />
            <span>Service Requests</span>
          </h3>
          <p className="text-slate-300">REQ-101: Maintenance access request</p>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
          <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-3">
            <Activity className="w-4 h-4 text-[#00B8FF]" />
            <span>Property Audit Log</span>
          </h3>
          <p className="text-slate-300">Agreement executed on 01 Jan 2025.</p>
        </div>
      )}
    </div>
  );
};

export default TenantPropertyDetailView;
