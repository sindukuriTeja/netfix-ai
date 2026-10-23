import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Loader2, Lock, Mail, FlaskConical, X, Info, Copy, Check } from 'lucide-react';
import type { RoleItem, LoginFormData } from '../../types';
import { authService } from '../../services/authService';

interface LoginFormProps {
  selectedRole: RoleItem;
  onChangeRole: () => void;
  onNavigateRegister: () => void;
  onSuccessLogin: (maskedContact: string) => void;
  onSuccessDemoLogin?: (user: any) => void;
}

const getDemoCredentialsForRole = (roleId: string) => {
  switch (roleId) {
    case 'employee':
      return { email: 'demo.employee@netfixai.test', password: 'Demo123' };
    case 'management':
      return { email: 'demo.management@netfixai.test', password: 'Demo123' };
    case 'advocate':
      return { email: 'demo.advocate@netfixai.test', password: 'Demo123' };
    case 'client':
      return { email: 'demo.client@netfixai.test', password: 'Demo123' };
    case 'tenant':
    case 'tenant-vendor':
      return { email: 'demo.tenant@netfixai.test', password: 'Demo123' };
    case 'regulator':
      return { email: 'demo.regulator@netfixai.test', password: 'Demo123' };
    default:
      return { email: 'demo.client@netfixai.test', password: 'Demo123' };
  }
};

export const LoginForm: React.FC<LoginFormProps> = ({
  selectedRole,
  onChangeRole,
  onNavigateRegister,
  onSuccessLogin,
  onSuccessDemoLogin,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Demo Login Modal State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPassword, setDemoPassword] = useState('');
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [demoError, setDemoError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const openDemoModal = () => {
    const creds = getDemoCredentialsForRole(selectedRole.id);
    setDemoEmail(creds.email);
    setDemoPassword(creds.password);
    setDemoError(null);
    setIsDemoModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      setIsLoading(true);
      const res = await authService.login(formData);
      if (res.success && res.maskedContact) {
        onSuccessLogin(res.maskedContact);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'The email or password is incorrect.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDemoError(null);

    try {
      setIsDemoLoading(true);
      // Call dedicated demo authentication API endpoint (/api/v1/auth/demo-login)
      const res = await authService.demoLogin(demoEmail, demoPassword, selectedRole.id);
      if (res.success) {
        setIsDemoModalOpen(false);
        if (onSuccessDemoLogin) {
          onSuccessDemoLogin(res.user);
        }
      }
    } catch (err: any) {
      setDemoError(err.message || 'Demo authentication failed. Please verify credentials.');
    } finally {
      setIsDemoLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: 'email' | 'password') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPassword(true);
      setTimeout(() => setCopiedPassword(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4">
      {/* Auth Card Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#04121F]/85 border border-[#00B8FF]/35 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,184,255,0.14)] space-y-5 relative">
        {/* L-Shaped Corner Accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00B8FF]/80 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00B8FF]/80 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#00B8FF]/80 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#00B8FF]/80 pointer-events-none" />

        {/* Card Header & Selected Role Display */}
        <div className="space-y-3">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Sign in to your NETFIX AI workspace.
            </p>
          </div>

          {/* Dynamic Role Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-xs font-semibold text-[#00B8FF]">
            <span className="w-2 h-2 rounded-full bg-[#00B8FF] animate-pulse" />
            <span>● {selectedRole.title}</span>
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-300 animate-in fade-in duration-200">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="block text-xs font-semibold text-slate-300">
              Email ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-email"
                type="email"
                required
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all min-h-[44px]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="block text-xs font-semibold text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setErrorMessage('Please contact system administrator to reset password.')}
                className="text-[11px] font-medium text-[#00B8FF] hover:text-sky-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errorMessage) setErrorMessage(null);
                }}
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Next Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#00B8FF] hover:bg-[#0098D4] shadow-[0_0_25px_rgba(0,184,255,0.4)] hover:shadow-[0_0_35px_rgba(0,184,255,0.6)] transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-70 cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Single Change Role Option Directly Below Next Button */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onChangeRole}
            className="text-xs font-semibold text-[#00B8FF] hover:text-sky-300 transition-colors"
          >
            Change Role
          </button>
        </div>

        {/* Divider & New User Register Footer Link */}
        <div className="pt-3 border-t border-white/10 text-center text-xs text-slate-400">
          <span>New user? </span>
          <button
            type="button"
            onClick={onNavigateRegister}
            className="font-bold text-[#00B8FF] hover:text-sky-300 transition-colors ml-1"
          >
            Register
          </button>
        </div>

        {/* OR Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative px-3 bg-[#04121F] text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            OR
          </span>
        </div>

        {/* Demo Login Button */}
        <div>
          <button
            type="button"
            onClick={openDemoModal}
            className="w-full py-3 px-5 rounded-xl font-bold text-xs text-sky-200 bg-sky-500/10 hover:bg-sky-500/20 border border-[#00B8FF]/40 hover:border-[#00B8FF] shadow-[0_0_15px_rgba(0,184,255,0.15)] transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer hover:scale-[1.01]"
          >
            <FlaskConical className="w-4 h-4 text-[#00B8FF]" />
            <span>Demo Login</span>
          </button>
        </div>
      </div>

      {/* Demo Login Modal Dialog */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#04121F] border border-[#00B8FF]/50 shadow-[0_0_50px_rgba(0,184,255,0.25)] space-y-5 text-left">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#00B8FF]/20 border border-[#00B8FF]/40 flex items-center justify-center text-[#00B8FF]">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Demo Login</h2>
                  <p className="text-xs text-slate-300">
                    Use the demo credentials below to sign in as a{' '}
                    <span className="text-[#00B8FF] font-semibold">{selectedRole.title}</span>.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role Display Field (Locked to Selected Role) */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">Role</label>
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#041828] border border-[#00B8FF]/30 text-sm text-white font-medium">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#00B8FF]" />
                  <span>{selectedRole.title}</span>
                </div>
                <span className="text-[10px] font-mono text-sky-400 uppercase bg-sky-500/10 px-2 py-0.5 rounded">Locked</span>
              </div>
            </div>

            {/* Dev Test Account Security Notice */}
            <div className="p-3 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/25 flex items-start gap-2 text-xs text-sky-200">
              <Info className="w-4 h-4 text-[#00B8FF] shrink-0 mt-0.5" />
              <span>
                These are development accounts for testing only. All authentication and role permissions are enforced.
              </span>
            </div>

            {/* Demo Error Banner */}
            {demoError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-300">
                {demoError}
              </div>
            )}

            {/* Demo Login Form */}
            <form onSubmit={handleDemoSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#041828] border border-[#00B8FF]/30 text-sm text-white focus:outline-none focus:border-[#00B8FF] font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(demoEmail, 'email')}
                    title="Copy Email"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={demoPassword}
                    onChange={(e) => setDemoPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#041828] border border-[#00B8FF]/30 text-sm text-white focus:outline-none focus:border-[#00B8FF] font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(demoPassword, 'password')}
                    title="Copy Password"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                  >
                    {copiedPassword ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Real Login Trigger */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isDemoLoading}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#00B8FF] hover:bg-[#0098D4] shadow-[0_0_25px_rgba(0,184,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isDemoLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
