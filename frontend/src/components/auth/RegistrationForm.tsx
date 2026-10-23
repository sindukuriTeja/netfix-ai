import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import type { RoleItem, RegistrationFormData } from '../../types';
import { authService } from '../../services/authService';

interface RegistrationFormProps {
  selectedRole: RoleItem;
  onChangeRole: () => void;
  onNavigateLogin: () => void;
  onSuccessRegister: (maskedContact: string) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  selectedRole,
  onChangeRole,
  onNavigateLogin,
  onSuccessRegister,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    phoneCountryCode: '+91',
    phone: '',
    permanentAddress: '',
    temporaryAddress: '',
    sameAsPermanent: false,
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSameAsPermanentToggle = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      sameAsPermanent: checked,
      temporaryAddress: checked ? prev.permanentAddress : '',
    }));
  };

  const handlePermanentAddressChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      permanentAddress: value,
      temporaryAddress: prev.sameAsPermanent ? value : prev.temporaryAddress,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Inline field validations
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required.';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required.';
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Enter a valid email address.';
    if (!formData.phone || formData.phone.trim().length < 7) newErrors.phone = 'Enter a valid phone number.';
    if (!formData.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent Address is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.register(formData);
      if (res.success && res.maskedContact) {
        onSuccessRegister(res.maskedContact);
      }
    } catch (err: any) {
      setErrors({ global: err.message || 'Registration failed. Please check your entries.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4">
      {/* Auth Card Container */}
      <div className="p-6 sm:p-9 rounded-3xl bg-[#04121F]/85 border border-[#00B8FF]/35 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,184,255,0.14)] space-y-6 relative">
        {/* L-Shaped Corner Accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00B8FF]/80 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00B8FF]/80 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#00B8FF]/80 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#00B8FF]/80 pointer-events-none" />

        {/* Progress & Role Context */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {/* Step Indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="px-2.5 py-1 rounded-lg bg-[#00B8FF]/20 text-[#00B8FF] font-mono border border-[#00B8FF]/30">01 Details</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-500 font-mono">02 Verify</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-500 font-mono">03 Complete</span>
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-1">
              Create your NETFIX AI account
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Enter your details to get started with the platform.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-xs font-semibold text-[#00B8FF]">
                <span className="w-2 h-2 rounded-full bg-[#00B8FF] animate-pulse" />
                <span>● {selectedRole.title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Error Banner */}
        {errors.global && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-300 animate-in fade-in duration-200">
            {errors.global}
          </div>
        )}

        {/* 10 Fields Form in 2-Column Grid */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: First Name & Middle Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="reg-firstname" className="block text-xs font-semibold text-slate-300">
                First Name <span className="text-[#00B8FF]">*</span>
              </label>
              <input
                id="reg-firstname"
                type="text"
                required
                placeholder="Teja"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all"
              />
              {errors.firstName && <p className="text-[11px] text-rose-400">{errors.firstName}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="reg-middlename" className="block text-xs font-semibold text-slate-300">
                Middle Name <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                id="reg-middlename"
                type="text"
                placeholder="Kumar"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all"
              />
            </div>
          </div>

          {/* Row 2: Last Name & Date of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="reg-lastname" className="block text-xs font-semibold text-slate-300">
                Last Name <span className="text-[#00B8FF]">*</span>
              </label>
              <input
                id="reg-lastname"
                type="text"
                required
                placeholder="Reddy"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all"
              />
              {errors.lastName && <p className="text-[11px] text-rose-400">{errors.lastName}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="reg-dob" className="block text-xs font-semibold text-slate-300">
                Date of Birth <span className="text-[#00B8FF]">*</span>
              </label>
              <input
                id="reg-dob"
                type="date"
                required
                max={new Date().toISOString().split('T')[0]}
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all"
              />
              {errors.dob && <p className="text-[11px] text-rose-400">{errors.dob}</p>}
            </div>
          </div>

          {/* Row 3: Email ID & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-300">
                Email ID <span className="text-[#00B8FF]">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                required
                placeholder="teja@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all"
              />
              {errors.email && <p className="text-[11px] text-rose-400">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="reg-phone" className="block text-xs font-semibold text-slate-300">
                Phone Number <span className="text-[#00B8FF]">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  aria-label="Country code"
                  value={formData.phoneCountryCode}
                  onChange={(e) => setFormData({ ...formData, phoneCountryCode: e.target.value })}
                  className="px-3 py-2.5 rounded-xl bg-[#041828] border border-[#00B8FF]/25 text-sm text-slate-200 focus:outline-none focus:border-[#00B8FF]"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+971">🇦🇪 +971</option>
                </select>
                <input
                  id="reg-phone"
                  type="tel"
                  required
                  placeholder="98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all"
                />
              </div>
              {errors.phone && <p className="text-[11px] text-rose-400">{errors.phone}</p>}
            </div>
          </div>

          {/* Row 4: Permanent Address */}
          <div className="space-y-1.5">
            <label htmlFor="reg-permanent-addr" className="block text-xs font-semibold text-slate-300">
              Permanent Address <span className="text-[#00B8FF]">*</span>
            </label>
            <textarea
              id="reg-permanent-addr"
              rows={2}
              required
              placeholder="123, MG Road, Bengaluru, Karnataka - 560001"
              value={formData.permanentAddress}
              onChange={(e) => handlePermanentAddressChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all resize-none"
            />
            {errors.permanentAddress && <p className="text-[11px] text-rose-400">{errors.permanentAddress}</p>}
          </div>

          {/* Temporary Address */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="reg-temp-addr" className="block text-xs font-semibold text-slate-300">
                Temporary Address
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-[#00B8FF] hover:text-sky-300">
                <input
                  type="checkbox"
                  checked={formData.sameAsPermanent}
                  onChange={(e) => handleSameAsPermanentToggle(e.target.checked)}
                  className="rounded bg-white/10 border-white/20 text-[#00B8FF] focus:ring-[#00B8FF] focus:ring-offset-0"
                />
                <span>Same as permanent address</span>
              </label>
            </div>
            <textarea
              id="reg-temp-addr"
              rows={2}
              disabled={formData.sameAsPermanent}
              placeholder="123, MG Road, Bengaluru, Karnataka - 560001"
              value={formData.temporaryAddress}
              onChange={(e) => setFormData({ ...formData, temporaryAddress: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all resize-none ${
                formData.sameAsPermanent ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            />
          </div>

          {/* Row 5: Create Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-300">
                Create Password <span className="text-[#00B8FF]">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all"
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
              {errors.password && <p className="text-[11px] text-rose-400">{errors.password}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="reg-confirmpassword" className="block text-xs font-semibold text-slate-300">
                Confirm Password <span className="text-[#00B8FF]">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-confirmpassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-4 pr-11 py-2.5 rounded-xl bg-[#041828]/75 border border-[#00B8FF]/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF] focus:ring-2 focus:ring-[#00B8FF]/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[11px] text-rose-400">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#00B8FF] hover:bg-[#0098D4] shadow-[0_0_25px_rgba(0,184,255,0.4)] hover:shadow-[0_0_35px_rgba(0,184,255,0.6)] transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-70 cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Processing Registration...</span>
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

        {/* Single Change Role Action Directly Below Next Button */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onChangeRole}
            className="text-xs font-semibold text-[#00B8FF] hover:text-sky-300 transition-colors"
          >
            Change Role
          </button>
        </div>

        {/* Footer Login Link */}
        <div className="pt-3 border-t border-white/10 text-center text-xs text-slate-400">
          <span>Already registered? </span>
          <button
            type="button"
            onClick={onNavigateLogin}
            className="font-bold text-[#00B8FF] hover:text-sky-300 transition-colors ml-1"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
