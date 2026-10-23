import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Loader2, ShieldCheck, RefreshCw } from 'lucide-react';
import type { RoleItem } from '../../types';
import { authService } from '../../services/authService';

interface OTPVerificationProps {
  mode: 'login' | 'registration';
  selectedRole: RoleItem;
  maskedContact: string;
  onBack: () => void;
  onSuccessVerify: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  mode,
  selectedRole,
  maskedContact,
  onBack,
  onSuccessVerify,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(59);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // 60-second countdown timer
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerSeconds]);

  const handleChange = (index: number, value: string) => {
    // Only accept numeric single digit
    const digit = value.replace(/[^0-9]/g, '');
    if (!digit && value !== '') return;

    const newOtp = [...otp];
    newOtp[index] = digit.slice(-1);
    setOtp(newOtp);
    if (errorMessage) setErrorMessage(null);

    // Auto-advance to next box if available
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const nextFocus = Math.min(pastedData.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setErrorMessage('Enter the complete 6-digit verification code.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await authService.verifyOtp(otpCode, mode);
      if (res.success) {
        onSuccessVerify();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'The verification code is incorrect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setErrorMessage(null);
      setResendSuccess(null);
      await authService.resendOtp(maskedContact);
      setOtp(['', '', '', '', '', '']);
      setTimerSeconds(59);
      setIsTimerActive(true);
      setResendSuccess('New verification code sent.');
      inputRefs.current[0]?.focus();
      setTimeout(() => setResendSuccess(null), 3000);
    } catch (err: any) {
      setErrorMessage('Failed to resend code. Please try again.');
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#091527]/80 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Header Back & Role */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {mode === 'login' ? 'Login' : 'Registration'}</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-300">
            <span>{selectedRole.title}</span>
          </div>
        </div>

        {/* Shield Icon & Title */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-400/30 text-sky-400 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(0,163,255,0.25)]">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight pt-1">
            {mode === 'login' ? 'Verify Your Login' : 'Verify Your Account'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto">
            We've sent a verification code to your registered contact:
          </p>

          <div className="font-mono text-xs font-bold text-sky-300 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-lg inline-block my-1">
            {maskedContact || 't***@example.com'}
          </div>
        </div>

        {/* Error / Resend Banners */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-300 text-center animate-in fade-in duration-200">
            {errorMessage}
          </div>
        )}

        {resendSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300 text-center animate-in fade-in duration-200">
            {resendSuccess}
          </div>
        )}

        {/* 6 OTP Input Boxes Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono text-white bg-white/[0.04] border border-white/10 rounded-xl focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 transition-all shadow-inner"
              />
            ))}
          </div>

          {/* Timer & Resend Controls */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              {isTimerActive ? (
                <>Code expires in <span className="font-mono font-bold text-sky-400">{formatTimer(timerSeconds)}</span></>
              ) : (
                <span className="text-rose-400 font-medium">Code expired</span>
              )}
            </span>

            <button
              type="button"
              onClick={handleResend}
              disabled={isTimerActive}
              className={`inline-flex items-center gap-1 font-semibold transition-colors ${
                isTimerActive
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-sky-400 hover:text-sky-300 cursor-pointer underline underline-offset-2'
              }`}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Resend code</span>
            </button>
          </div>

          {/* Primary Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-brand-electric to-brand-cyan hover:from-sky-400 hover:to-brand-cyan shadow-[0_0_30px_rgba(0,163,255,0.35)] hover:shadow-[0_0_40px_rgba(0,210,255,0.5)] transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify & Continue</span>
            )}
          </button>
        </form>

        {/* Footnote */}
        <div className="pt-2 text-center text-[11px] text-slate-500">
          Your account will be authenticated upon successful verification.
        </div>
      </div>
    </div>
  );
};
