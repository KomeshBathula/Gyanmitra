import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Mail,
  HelpCircle,
  Globe,
  User,
  GraduationCap,
  Key,
  CheckSquare,
  Square,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthView = () => {
  const { loginUser, showToast, isAdminPortalMode, setIsAdminPortalMode, language, setLanguage, t } = useApp();

  // Mode: 'employee' | 'trainer' (for standard user login) or 'admin' (for URL-based admin gateway)
  const [userLoginType, setUserLoginType] = useState('employee'); // 'employee' or 'trainer'
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [email, setEmail] = useState('rajesh.kumar@gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [adminToken, setAdminToken] = useState('MOSPI-SEC-AUTH-2026');
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(true);

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
    showToast("Redirecting to Jan Parichay (National SSO Gateway)...", "info");
    setTimeout(() => {
      loginUser(userLoginType, { email });
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0E468A] text-slate-800 font-sans">
      {/* Left Instructions Panel (Matching iGOT Karmayogi Portal Login Design) */}
      <div className="lg:w-1/2 bg-gradient-to-b from-[#0E468A] via-[#104F9B] to-[#0A3972] p-8 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Subtle geometric pattern / circles background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative z-10 space-y-8">
          {/* Header Title */}
          <div>
            <p className="text-amber-300 font-semibold text-sm tracking-wide">Welcome to iGOT Karmayogi & GyanMitra</p>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-1">
              How To <span className="border-b-4 border-amber-400 pb-0.5">Login</span>
            </h1>
          </div>

          {/* Step 1: Email Login Guide */}
          <div className="flex items-start space-x-4">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-base flex-shrink-0 shadow-md">
              1
            </div>
            <div className="space-y-2 text-xs lg:text-sm text-slate-100">
              <h3 className="font-bold text-white text-sm lg:text-base">
                In case you face issues while logging in with your email ID
              </h3>
              <ul className="space-y-1.5 text-slate-200 list-disc list-inside text-xs leading-relaxed">
                <li>Clear the browser cache</li>
                <li>Open the browser's private window by pressing <strong className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">Ctrl+Shift+N</strong></li>
                <li>Login with mobile OTP after selecting the <span className="text-amber-300 font-semibold">'Log in with OTP'</span> option</li>
              </ul>
            </div>
          </div>

          {/* Step 2: Parichay SSO Guide */}
          <div className="flex items-start space-x-4 pt-2">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-base flex-shrink-0 shadow-md">
              2
            </div>
            <div className="space-y-2 text-xs lg:text-sm text-slate-100">
              <h3 className="font-bold text-white text-sm lg:text-base">
                In case you face issues while logging in with Parichay
              </h3>
              <ul className="space-y-1.5 text-slate-200 list-disc list-inside text-xs leading-relaxed">
                <li>Log out from all open Parichay websites/tabs</li>
                <li>Clear the browser cache</li>
                <li>Open the browser's private window by pressing <strong className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">Ctrl+Shift+N</strong></li>
                <li>Login to the iGOT Karmayogi portal with Parichay credentials and enter OTP</li>
                <li>Tick both the Mobile Number and Primary Email to continue</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Left Footer Badges */}
        <div className="relative z-10 pt-8 mt-8 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Ministry of Statistics & Programme Implementation (MoSPI)</span>
          </div>
          <span className="font-mono text-amber-300">NPCSCB 2026</span>
        </div>
      </div>

      {/* Right Login Form Panel (Crisp White matching iGOT Karmayogi Portal) */}
      <div className="lg:w-1/2 bg-white p-8 lg:p-14 flex flex-col justify-between relative shadow-2xl">
        {/* Top Controls: Multilingual switcher & Help icon */}
        <div className="flex items-center justify-between">
          {/* Multilingual Selector: English | हिन्दी | తెలుగు */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-blue-600 ml-1 mr-0.5" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'en' ? 'bg-[#1B365D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'hi' ? 'bg-[#1B365D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === 'te' ? 'bg-[#1B365D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              తెలుగు
            </button>
          </div>

          <button
            onClick={() => showToast("Helpdesk: helpdesk-igot@gov.in | MoSPI Toll-Free 1800-111-2026", "info")}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
            title="Help"
          >
            ?
          </button>
        </div>

        {/* Center Auth Form */}
        <div className="max-w-md w-full mx-auto my-6 space-y-6">
          {/* Karmayogi Bharat Official Logo & Tagline */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center justify-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-[#1B365D] flex items-center justify-center text-white shadow-md border border-blue-900">
                <div className="text-center leading-none">
                  <span className="text-[#FF9933] text-sm block font-serif font-black">iGOT</span>
                  <span className="text-white text-[9px] font-sans tracking-widest uppercase font-bold">Bharat</span>
                </div>
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-black text-[#1B365D] tracking-tight">
                  कर्मयोगी भारत
                </h2>
                <p className="text-[11px] font-serif text-slate-500 tracking-wider">
                  — लोकहितं मम करणीयम् —
                </p>
              </div>
            </div>
            <div className="inline-block px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1B365D] text-xs font-bold">
              GyanMitra • Official Statistical System Wing
            </div>
          </div>

          {/* User Mode Tabs (Official vs Trainer vs Admin) */}
          <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setUserLoginType('employee');
                setIsAdminPortalMode(false);
              }}
              className={`py-2 px-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                userLoginType === 'employee' && !isAdminPortalMode
                  ? 'bg-white text-[#1B365D] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span className="truncate">Officer / Learner</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUserLoginType('trainer');
                setIsAdminPortalMode(false);
              }}
              className={`py-2 px-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                userLoginType === 'trainer' && !isAdminPortalMode
                  ? 'bg-white text-[#1B365D] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate">NSSTA Faculty</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUserLoginType('admin');
                setIsAdminPortalMode(true);
              }}
              className={`py-2 px-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                userLoginType === 'admin' || isAdminPortalMode
                  ? 'bg-purple-900 text-white shadow-sm font-extrabold'
                  : 'text-purple-700 hover:text-purple-950 font-bold'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span className="truncate">Ministry Admin</span>
            </button>
          </div>

          {/* Form */}
          {!isAdminPortalMode ? (
            <form onSubmit={handleUserSignIn} className="space-y-4">
              {/* Radio options: Login with password vs Login with OTP */}
              <div className="flex items-center space-x-6 text-xs font-semibold text-slate-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="loginMethod"
                    checked={loginMethod === 'password'}
                    onChange={() => setLoginMethod('password')}
                    className="text-[#2087d8] focus:ring-[#2087d8] w-4 h-4"
                  />
                  <span>Login with password</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="loginMethod"
                    checked={loginMethod === 'otp'}
                    onChange={() => setLoginMethod('otp')}
                    className="text-[#2087d8] focus:ring-[#2087d8] w-4 h-4"
                  />
                  <span>Login with OTP</span>
                </label>
              </div>

              {/* Email field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gov.in"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2087d8] focus:border-transparent text-slate-900"
                />
              </div>

              {/* Password field or OTP field */}
              {loginMethod === 'password' ? (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Password
                    </label>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); showToast("Password reset link sent to official email.", "info"); }}
                      className="text-xs text-[#2087d8] hover:underline font-semibold"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2087d8] focus:border-transparent text-slate-900"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile / Email OTP
                  </label>
                  <input
                    type="text"
                    defaultValue="849201"
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2087d8] font-mono tracking-widest"
                  />
                </div>
              )}

              {/* reCAPTCHA Checkbox Box */}
              <div className="bg-[#f9f9f9] p-3 rounded-lg border border-slate-300 flex items-center justify-between">
                <label
                  onClick={() => setIsCaptchaChecked(!isCaptchaChecked)}
                  className="flex items-center space-x-3 cursor-pointer select-none"
                >
                  {isCaptchaChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                  <span className="text-xs text-slate-700 font-medium">I'm not a robot</span>
                </label>

                <div className="text-right">
                  <div className="w-7 h-7 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                    ♻
                  </div>
                  <span className="text-[9px] text-slate-400 block font-sans">reCAPTCHA</span>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#2087d8] hover:bg-[#1a74ba] text-white text-sm font-bold rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Login</span>
              </button>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Jan Parichay SSO Login */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-600 text-center">Login with Providers</p>
                <button
                  type="button"
                  onClick={handleSsoLogin}
                  className="w-full py-2.5 px-4 bg-[#1B365D] hover:bg-[#142947] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Select Provider (Jan Parichay SSO)</span>
                </button>
              </div>
            </form>
          ) : (
            /* Dedicated Admin Department Selection & Login Form */
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs">
                <p className="font-bold text-purple-950 flex items-center space-x-1.5">
                  <Shield className="w-4 h-4 text-purple-700" />
                  <span>Choose Administration Cadre Department:</span>
                </p>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  Select your governance authority to enter the dedicated administrative console.
                </p>
              </div>

              {/* 4 Department 1-Click Quick Login Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    id: 'admin_civil',
                    title: 'Civil Administration',
                    sub: 'DoPT / IAS / Central Ministries',
                    officer: 'Dr. Arvind Mehta (IAS/ISS)',
                    badge: 'Civil Cadre',
                    color: 'border-blue-300 hover:border-blue-500 bg-blue-50/50'
                  },
                  {
                    id: 'admin_municipal',
                    title: 'Municipal / ULB Admin',
                    sub: 'Urban Local Bodies & Smart Cities',
                    officer: 'Smt. Kavitha Reddy (Comm.)',
                    badge: 'Municipal Cadre',
                    color: 'border-emerald-300 hover:border-emerald-500 bg-emerald-50/50'
                  },
                  {
                    id: 'admin_statistical',
                    title: 'MoSPI Statistical Cadre',
                    sub: 'ISS / SSS / Survey Units & DES',
                    officer: 'Shri Rameshwar Rao (Chief DG)',
                    badge: 'MoSPI Central',
                    color: 'border-purple-300 hover:border-purple-500 bg-purple-50/50'
                  },
                  {
                    id: 'admin_revenue',
                    title: 'Revenue & Finance Admin',
                    sub: 'IRS & Commercial Tax Cadres',
                    officer: 'Dr. S. K. Mukherjee (Secy)',
                    badge: 'Revenue Cadre',
                    color: 'border-amber-300 hover:border-amber-500 bg-amber-50/50'
                  }
                ].map((dept) => (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => loginUser(dept.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between ${dept.color}`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-white text-slate-800 border border-slate-200">
                          {dept.badge}
                        </span>
                        <span className="text-[10px] text-purple-700 font-bold">1-Click Login →</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">{dept.title}</h4>
                      <p className="text-[10px] text-slate-500">{dept.sub}</p>
                    </div>
                    <p className="text-[10px] text-slate-600 font-semibold pt-1 border-t border-slate-200/60 mt-1">
                      👤 {dept.officer}
                    </p>
                  </button>
                ))}
              </div>

              {/* Or Standard Credentials Form */}
              <form onSubmit={handleAdminSignIn} className="space-y-3 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Administrator NIC ID
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Root Passkey
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Authenticate Custom Admin</span>
                </button>
              </form>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminPortalMode(false);
                    setUserLoginType('employee');
                    window.history.pushState(null, '', '/');
                  }}
                  className="text-xs text-blue-700 hover:underline cursor-pointer"
                >
                  ← Return to Official Learner Portal
                </button>
              </div>
            </div>
          )}

          {/* Footer Notice */}
          <div className="pt-2 text-center text-[11px] text-slate-400">
            <span>Powered by iGOT Karmayogi Bharat Framework & MoSPI</span>
          </div>
        </div>

        {/* Right Footer */}
        <div className="text-center text-[11px] text-slate-400 border-t border-slate-100 pt-3">
          © 2026 Karmayogi Bharat & Ministry of Statistics & Programme Implementation (MoSPI).
        </div>
      </div>
    </div>
  );
};


