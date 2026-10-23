import React, { useState } from 'react';
import { Building2, Plus, CheckCircle2, MapPin } from 'lucide-react';

export interface EntityItem {
  id: string;
  name: string;
  type: 'Company' | 'Proprietorship' | 'Firm' | 'Individual';
  gstin?: string;
  pan?: string;
  address: string;
  status: 'Active' | 'Inactive';
}

export const EntityManagementModule: React.FC = () => {
  const [entities, setEntities] = useState<EntityItem[]>([
    {
      id: 'ent_marg_tech',
      name: 'MARG Technologies Pvt Ltd',
      type: 'Company',
      gstin: '29ABCDE1234F1Z5',
      pan: 'ABCDE1234F',
      address: 'Bengaluru, Karnataka',
      status: 'Active',
    },
    {
      id: 'ent_teja_ent',
      name: 'Teja Enterprises',
      type: 'Proprietorship',
      pan: 'BCFPT1234K',
      address: 'Vijayawada, Andhra Pradesh',
      status: 'Active',
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<'Company' | 'Proprietorship' | 'Firm' | 'Individual'>('Company');
  const [gstin, setGstin] = useState('');
  const [pan, setPan] = useState('');
  const [address, setAddress] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddEntity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;
    const newEnt: EntityItem = {
      id: `ent_${Date.now()}`,
      name,
      type,
      gstin: gstin ? gstin.toUpperCase() : undefined,
      pan: pan ? pan.toUpperCase() : undefined,
      address,
      status: 'Active',
    };
    setEntities([...entities, newEnt]);
    setName('');
    setGstin('');
    setPan('');
    setAddress('');
    setShowAddModal(false);
    setNotification(`Entity "${newEnt.name}" successfully registered and linked to client scope.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-extrabold text-sm">
            2
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              Company & Entity Management
            </h3>
            <p className="text-xs text-slate-400">Your Businesses. Organized.</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Entity</span>
        </button>
      </div>

      {notification && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Grid Content Left, Feature Checklist Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Entity Cards List (3 Cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>My Entities ({entities.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {entities.map((e) => (
              <div
                key={e.id}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/40 transition-all space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      {e.name}
                    </h4>
                    <span className="inline-block mt-0.5 text-[10px] font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
                      {e.type}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {e.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300">
                  {e.gstin && (
                    <p className="flex items-center gap-2">
                      <span className="text-slate-500 font-mono text-[10px]">GSTIN:</span>
                      <span className="font-mono text-slate-200">{e.gstin}</span>
                    </p>
                  )}
                  {e.pan && (
                    <p className="flex items-center gap-2">
                      <span className="text-slate-500 font-mono text-[10px]">PAN:</span>
                      <span className="font-mono text-slate-200">{e.pan}</span>
                    </p>
                  )}
                  <p className="flex items-center gap-1.5 text-slate-400 text-[11px] pt-1 border-t border-white/5">
                    <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                    <span>{e.address}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature List Column (Right) */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-2.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            <span>Entity Capabilities</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Manage your entities</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Add / Edit entity profiles</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>GSTIN / PAN details</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Authorized entity members</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Entity selector for filings</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Secure access control</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Add Entity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1728] border border-white/20 rounded-2xl max-w-md w-full p-5 space-y-4 text-white shadow-2xl">
            <h3 className="text-base font-bold">Register Company / Entity</h3>
            <form onSubmit={handleAddEntity} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Entity Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                  placeholder="MARG Infrastructure Ltd"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Entity Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="Company">Company</option>
                  <option value="Proprietorship">Proprietorship</option>
                  <option value="Firm">Partnership Firm</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none uppercase font-mono"
                    placeholder="29ABCDE1234F1Z5"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">PAN</label>
                  <input
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none uppercase font-mono"
                    placeholder="ABCDE1234F"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Registered Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                  placeholder="City, State"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold"
                >
                  Save Entity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
