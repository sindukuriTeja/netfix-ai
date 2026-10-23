import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  CheckCircle2,
  Edit2
} from 'lucide-react';

interface TenantProfileSettingsViewProps {
  userProfile: {
    name: string;
    email: string;
    roleTitle: string;
    organization?: string;
    avatarInitials: string;
    phone?: string;
  };
}

export const TenantProfileSettingsView: React.FC<TenantProfileSettingsViewProps> = ({ userProfile }) => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [approvalNotifs, setApprovalNotifs] = useState(true);
  const [messageNotifs, setMessageNotifs] = useState(true);

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [userName, setUserName] = useState(userProfile.name);
  const [userPhone, setUserPhone] = useState(userProfile.phone || '+91 90000 00005');
  const [userOrg, setUserOrg] = useState(userProfile.organization || 'MARG Commercial Ventures');

  const handleSavePreferences = () => {
    setFeedback('Notification preferences saved successfully.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangePasswordOpen(false);
    setFeedback('Password changed successfully.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditProfileOpen(false);
    setFeedback('Profile details updated.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-3 border-b border-white/10">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <User className="w-6 h-6 text-[#00B8FF]" />
          <span>Profile & Settings — Account Management</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          View and update tenant profile, preferences, and security.
        </p>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Grid (Ref Panel 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tenant Identity Card (Ref Panel 12) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00B8FF] to-indigo-600 flex items-center justify-center font-extrabold text-xl text-white shadow-lg">
              {userProfile.avatarInitials}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">{userName}</h2>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                {userProfile.roleTitle}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs border-t border-white/10 pt-4">
            <div>
              <span className="text-slate-400 block mb-0.5">Full Name</span>
              <span className="font-bold text-white">{userName}</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Email</span>
              <span className="font-mono text-slate-200">{userProfile.email}</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Phone</span>
              <span className="font-mono text-slate-200">{userPhone}</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Organization</span>
              <span className="font-bold text-white">{userOrg}</span>
            </div>
          </div>

          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Right Column: Security & Preferences (Ref Panel 12) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Shield className="w-4 h-4 text-[#00B8FF]" />
              <span>Account Security</span>
            </h3>

            <div className="flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-white">Password Authentication</h4>
                <p className="text-slate-400 text-[11px]">Keep your account secure with a strong password.</p>
              </div>
              <button
                onClick={() => setIsChangePasswordOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 font-bold text-xs cursor-pointer"
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Bell className="w-4 h-4 text-purple-400" />
              <span>Notification Preferences</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#041828] border border-white/5">
                <span className="font-bold text-white">Email Notifications</span>
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#00B8FF] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#041828] border border-white/5">
                <span className="font-bold text-white">Deadline Reminders</span>
                <input
                  type="checkbox"
                  checked={deadlineReminders}
                  onChange={(e) => setDeadlineReminders(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#00B8FF] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#041828] border border-white/5">
                <span className="font-bold text-white">Approval Notifications</span>
                <input
                  type="checkbox"
                  checked={approvalNotifs}
                  onChange={(e) => setApprovalNotifs(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#00B8FF] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#041828] border border-white/5">
                <span className="font-bold text-white">Message Notifications</span>
                <input
                  type="checkbox"
                  checked={messageNotifs}
                  onChange={(e) => setMessageNotifs(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#00B8FF] cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs cursor-pointer shadow-lg shadow-sky-500/20"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <form onSubmit={handlePasswordSubmit} className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-white text-base border-b border-white/10 pb-3">Change Password</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">New Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsChangePasswordOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00B8FF] text-white font-bold text-xs"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <form onSubmit={handleProfileSubmit} className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-white text-base border-b border-white/10 pb-3">Edit Profile</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Organization</label>
                <input
                  type="text"
                  value={userOrg}
                  onChange={(e) => setUserOrg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00B8FF] text-white font-bold text-xs"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TenantProfileSettingsView;
