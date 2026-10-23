import React, { useState } from 'react';
import { 
  Settings, Shield, Database, Cpu, Lock, Server, Key, Save, CheckCircle2, AlertCircle
} from 'lucide-react';

export const AdminSystemSettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'security' | 'ai' | 'general' | 'audit'>('security');
  const [isSaved, setIsSaved] = useState(false);

  // System settings state
  const [settings, setSettings] = useState({
    mfaRequired: true,
    sessionTimeoutMins: 30,
    maxFailedLogins: 5,
    lockoutDurationMins: 15,
    passwordExpirationDays: 90,
    
    defaultAiModel: 'Ultron-v4-Enterprise',
    vectorDbSyncIntervalMins: 5,
    maxTokensPerQuery: 8192,
    enableAutonomousAgentActions: true,

    auditRetentionDays: 365,
    cryptographicHashingEnabled: true,
    realTimeAlertsThreshold: 'high',
    exportEncryption: 'AES-256-GCM',

    orgName: 'MARG GROUP ENTERPRISE',
    systemDomain: 'netfix.marggroup.internal',
    maintenanceMode: false,
  });

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-400" />
            System Configuration & Security Settings
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Global administrative parameters, RBAC enforcement policies, AI infrastructure thresholds, and security parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/20"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          {isSaved ? 'Settings Applied!' : 'Save System Settings'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'security'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          Security & Authentication
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'ai'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          AI & Infrastructure
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'audit'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          Audit & Compliance Governance
        </button>

        <button
          onClick={() => setActiveTab('general')}
          className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'general'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-4 h-4" />
          General Platform Setup
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Lock className="w-4 h-4 text-cyan-400" />
              Multi-Factor Authentication & Sessions
            </h3>

            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <div>
                <span className="text-sm font-medium text-slate-200 block">Enforce Mandatory MFA</span>
                <span className="text-xs text-slate-400">Require OTP verification for all administrative accounts</span>
              </div>
              <input
                type="checkbox"
                checked={settings.mfaRequired}
                onChange={(e) => setSettings({ ...settings, mfaRequired: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Session Idle Timeout (Minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeoutMins}
                onChange={(e) => setSettings({ ...settings, sessionTimeoutMins: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Max Password Expiration (Days)</label>
              <input
                type="number"
                value={settings.passwordExpirationDays}
                onChange={(e) => setSettings({ ...settings, passwordExpirationDays: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Key className="w-4 h-4 text-purple-400" />
              Account Lockout & Threat Prevention
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Max Failed Login Attempts Threshold</label>
              <input
                type="number"
                value={settings.maxFailedLogins}
                onChange={(e) => setSettings({ ...settings, maxFailedLogins: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Account Lockout Duration (Minutes)</label>
              <input
                type="number"
                value={settings.lockoutDurationMins}
                onChange={(e) => setSettings({ ...settings, lockoutDurationMins: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-300/90 leading-relaxed">
                Changes to security threshold rules apply immediately across all active API gateway endpoints. Active sessions exceeding the new timeout will require re-authentication.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Cpu className="w-4 h-4 text-cyan-400" />
            AI Model Orchestration & Execution Limits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Default Model Engine</label>
              <select
                value={settings.defaultAiModel}
                onChange={(e) => setSettings({ ...settings, defaultAiModel: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Ultron-v4-Enterprise">Ultron-v4-Enterprise (Recommended)</option>
                <option value="Gemini-1.5-Pro-Legal">Gemini-1.5-Pro-Legal</option>
                <option value="Claude-3.5-Sonnet-Reg">Claude-3.5-Sonnet-Reg</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Vector Index Sync Frequency (Mins)</label>
              <input
                type="number"
                value={settings.vectorDbSyncIntervalMins}
                onChange={(e) => setSettings({ ...settings, vectorDbSyncIntervalMins: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Max Token Limit Per Request</label>
              <input
                type="number"
                value={settings.maxTokensPerQuery}
                onChange={(e) => setSettings({ ...settings, maxTokensPerQuery: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-lg border border-slate-800 self-end">
              <div>
                <span className="text-sm font-medium text-slate-200 block">Autonomous Agent Actions</span>
                <span className="text-xs text-slate-400">Allow AI agents to execute low-risk document processing tasks</span>
              </div>
              <input
                type="checkbox"
                checked={settings.enableAutonomousAgentActions}
                onChange={(e) => setSettings({ ...settings, enableAutonomousAgentActions: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Database className="w-4 h-4 text-emerald-400" />
            Audit Logging & Compliance Policy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Audit Log Retention Period (Days)</label>
              <input
                type="number"
                value={settings.auditRetentionDays}
                onChange={(e) => setSettings({ ...settings, auditRetentionDays: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Export Encryption Algorithm</label>
              <select
                value={settings.exportEncryption}
                onChange={(e) => setSettings({ ...settings, exportEncryption: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="AES-256-GCM">AES-256-GCM (FIPS 140-2 Compliant)</option>
                <option value="RSA-4096">RSA-4096 / SHA-256</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-lg border border-slate-800 col-span-2">
              <div>
                <span className="text-sm font-medium text-slate-200 block">Cryptographic Immutability Hashing</span>
                <span className="text-xs text-slate-400">Generate Merkle tree hash chain for every recorded system event</span>
              </div>
              <input
                type="checkbox"
                checked={settings.cryptographicHashingEnabled}
                onChange={(e) => setSettings({ ...settings, cryptographicHashingEnabled: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'general' && (
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Server className="w-4 h-4 text-cyan-400" />
            General Platform Setup & Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Organization Name</label>
              <input
                type="text"
                value={settings.orgName}
                onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">System Domain Endpoint</label>
              <input
                type="text"
                value={settings.systemDomain}
                onChange={(e) => setSettings({ ...settings, systemDomain: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-red-950/30 border border-red-500/20 rounded-lg col-span-2">
              <div>
                <span className="text-sm font-medium text-red-300 block">Maintenance Mode</span>
                <span className="text-xs text-red-400/80">Restrict platform access exclusively to Super Administrators</span>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="w-4 h-4 accent-red-500 rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
