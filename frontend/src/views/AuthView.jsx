import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  User,
  GraduationCap,
  Building2,
  Key,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthView = () => {
  const { loginUser, showToast, isAdminPortalMode, setIsAdminPortalMode } = useApp();

  // Mode: 'employee' | 'trainer' (for standard user login) or 'admin' (for URL-based admin gateway)
  const [userLoginType, setUserLoginType] = useState('employee'); // 'employee' or 'trainer'
  const [email, setEmail] = useState('rajesh.kumar@gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [adminToken, setAdminToken] = useState('MOSPI-SEC-AUTH-2026');
  const [captchaInput, setCaptchaInput] = useState('7N9KP');
  const [rememberMe, setRememberMe] = useState(true);

  // Sync email defaults when login type changes
  useEffect(() => {
    if (isAdminPortalMode) {
      setEmail('admin.workforce@mospi.gov.in');
    } else if (userLoginType === 'trainer') {
      setEmail('dr.meenakshi@nssta.gov.in');
    } else {
      setEmail('rajesh.kumar@gov.in');
    }
  }, [userLoginType, isAdminPortalMode]);

  const handleUserSignIn = (e) => {
    e.preventDefault();
    loginUser(userLoginType, { email });
  };

  const handleAdminSignIn = (e) => {
    e.preventDefault();
    loginUser('admin', { email: 'admin.workforce@mospi.gov.in' });
  };

  const handleSsoLogin = () => {
    showToast("Connecting to Jan Parichay (National SSO Gateway)...", "info");
    setTimeout(() => {
      loginUser(userLoginType, { email });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-gov-navy to-slate-900 flex flex-col justify-between text-slate-100 relative">
      {/* Tricolor Top Bar */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      {/* Top Government Strip */}
      <div className="py-2.5 px-6 flex items-center justify-between border-b border-white/10 text-xs">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="font-semibold tracking-wide">भारत सरकार | Government of India</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Ministry of Statistics & Programme Implementation (MoSPI)</span>
        </div>

        <div className="flex items-center space-x-3">
          {isAdminPortalMode ? (
            <span className="px-2.5 py-0.5 rounded bg-purple-900/80 text-purple-200 border border-purple-600 text-[10px] font-mono font-bold">
              🔐 System Admin Gateway Active
            </span>
          ) : (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/10 text-amber-300 text-[10px] font-mono">
              Parichay SSO Gateway
            </span>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-md bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header Banner */}
          <div className={`p-6 text-white text-center relative ${
            isAdminPortalMode
              ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950'
              : 'bg-gradient-to-r from-gov-navy to-gov-blue'
          }`}>
            <div className="w-14 h-14 mx-auto rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner mb-3">
              {isAdminPortalMode ? (
                <Shield className="w-7 h-7 text-purple-300" />
              ) : (
                <span className="text-amber-400 font-serif font-black text-xl">ज्ञान</span>
              )}
            </div>

            <h2 className="text-xl font-bold tracking-tight">
              {isAdminPortalMode ? "MoSPI System Admin Gateway" : "GyanMitra | ज्ञानमित्र"}
            </h2>
            <p className="text-xs text-blue-200 mt-1">
              {isAdminPortalMode
                ? "National Workforce Competency Intelligence Administration"
                : "AI-Powered Capacity Building for India's Official Statistical System"}
            </p>
          </div>

          {/* If NOT Admin Mode: User Login Tabs (Official vs Trainer) */}
          {!isAdminPortalMode ? (
            <div>
              {/* User Role Switch Tabs */}
              <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setUserLoginType('employee')}
                  className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                    userLoginType === 'employee'
                      ? 'bg-white text-gov-navy shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Official / ISS Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUserLoginType('trainer')}
                  className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                    userLoginType === 'trainer'
                      ? 'bg-white text-gov-navy shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Trainer / Faculty Login</span>
                </button>
              </div>

              {/* Login Form for Official / Trainer */}
              <form onSubmit={handleUserSignIn} className="p-6 sm:p-8 space-y-4">
                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[11px] text-blue-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>
                    Logging in as: <strong>{userLoginType === 'employee' ? 'Government Employee / ISS Officer' : 'NSSTA Faculty / Course Trainer'}</strong>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    {userLoginType === 'employee' ? 'Official NIC Email / ISS ID' : 'Faculty Email / NSSTA ID'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Password / Security PIN
                    </label>
                    <a href="#" onClick={(e) => { e.preventDefault(); showToast("Password reset OTP sent to registered NIC mail.", "info"); }} className="text-[11px] text-blue-700 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Simulated Captcha */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs tracking-widest px-2.5 py-1 bg-slate-200 text-slate-800 font-bold rounded select-none line-through">
                      7 N 9 K P
                    </span>
                    <span className="text-[10px] text-slate-500">Security Check</span>
                  </div>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="w-20 px-2 py-1 text-xs border border-slate-300 rounded text-center uppercase font-mono font-bold"
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>Remember terminal</span>
                  </label>
                  <span className="text-[11px] text-slate-400">SSL 256-Bit</span>
                </div>

                {/* Sign In Buttons */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold rounded-lg shadow-gov hover:shadow-gov-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Sign In as {userLoginType === 'employee' ? 'Official' : 'Trainer'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-medium">OR</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Parichay SSO Button */}
                <button
                  type="button"
                  onClick={handleSsoLogin}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-colors flex items-center justify-center space-x-2"
                >
                  <Shield className="w-4 h-4 text-blue-700" />
                  <span>Single Sign-On (Parichay SSO)</span>
                </button>
              </form>
            </div>
          ) : (
            /* Dedicated Admin URL Gateway Form (/admin or #admin) */
            <form onSubmit={handleAdminSignIn} className="p-6 sm:p-8 space-y-4 animate-in fade-in">
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-900 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold">
                  <Lock className="w-3.5 h-3.5 text-purple-700" />
                  <span>Restricted Access: System Administrator</span>
                </div>
                <p className="text-[11px] text-purple-800 leading-relaxed">
                  Authorized exclusively for MoSPI Headquarter Workforce Planning Officers. All logins are audit-logged.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admin NIC Account
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Root Admin Passkey & 2FA
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  MoSPI Security Token
                </label>
                <input
                  type="text"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-300 rounded-lg font-mono text-purple-900 font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold rounded-lg shadow-gov transition-all flex items-center justify-center space-x-2"
              >
                <Shield className="w-4 h-4 text-purple-300" />
                <span>Authenticate as System Administrator</span>
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminPortalMode(false);
                    window.location.hash = '';
                  }}
                  className="text-xs text-blue-700 hover:underline"
                >
                  ← Return to Official / Trainer Login Portal
                </button>
              </div>
            </form>
          )}

          {/* Footer Notice */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
            <p className="flex items-center justify-center space-x-1">
              <Lock className="w-3 h-3 text-emerald-600 inline" />
              <span>Authorized for Government of India Official Statistical System</span>
            </p>
            {!isAdminPortalMode && (
              <p className="mt-2 text-[10px] text-slate-400">
                System Administrator access is restricted to official gateway: <a href="#admin" onClick={() => setIsAdminPortalMode(true)} className="text-blue-600 hover:underline">/admin URL Gateway</a>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="py-3 px-6 text-center text-[11px] text-slate-400 border-t border-white/10">
        <p>© 2026 Ministry of Statistics & Programme Implementation (MoSPI), Government of India. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
