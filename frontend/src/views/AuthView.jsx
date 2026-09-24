import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Mail,
  HelpCircle,
  Globe,
  User,
  Key,
  CheckSquare,
  Square,
  ArrowRight,
  Landmark,
  Building2,
  BarChart3,
  Coins
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// 4 Cadre Administrator Quick Sign-In Options (from the governance gateway)
const CADRE_ADMIN_OPTIONS = [
  {
    id: 'admin_civil',
    title: 'Civil Administration',
    sub: 'DoPT / IAS / Central Secretariat',
    officer: 'Dr. Arvind Mehta, IAS',
    badge: 'Civil Cadre'
  },
  {
    id: 'admin_municipal',
    title: 'Municipal / ULB Admin',
    sub: 'Urban Local Bodies & Smart Cities',
    officer: 'Smt. Kavitha Reddy',
    badge: 'Municipal Cadre'
  },
  {
    id: 'admin_statistical',
    title: 'MoSPI Statistical Cadre',
    sub: 'ISS / SSS / Survey Units & DES',
    officer: 'Shri Rameshwar Rao, ISS',
    badge: 'MoSPI Central'
  },
  {
    id: 'admin_revenue',
    title: 'Revenue & Finance Admin',
    sub: 'IRS & Commercial Tax Cadres',
    officer: 'Dr. S. K. Mukherjee, IRS',
    badge: 'Revenue Cadre'
  }
];

export const AuthView = ({ initialTab = 'employee' }) => {
  const { loginUser, showToast, language, setLanguage, t } = useApp();

  // Mode: 'employee' | 'admin' (strictly using the GUI tabs; no separate URL admin login)
  const [userLoginType, setUserLoginType] = useState(() => {
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/admin') || window.location.hash.startsWith('#admin'))) {
      window.history.replaceState(null, '', '/login');
      return 'admin';
    }
    return initialTab;
  });

  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [email, setEmail] = useState('rajeswari.malluri@gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [adminEmail, setAdminEmail] = useState('admin.workforce@mospi.gov.in');
  const [adminPassword, setAdminPassword] = useState('••••••••••••');
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(true);

  // Sync state if initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setUserLoginType(initialTab);
    }
  }, [initialTab]);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (userLoginType === 'admin') {
      loginUser('admin', { email: adminEmail });
    } else {
      loginUser('employee', { email });
    }
  };

  const handleCadreAdminLogin = (cadreId) => {
    loginUser(cadreId);
  };

  const handleSsoLogin = () => {
    showToast("Redirecting to Jan Parichay (National SSO Gateway)...", "info");
    setTimeout(() => {
      if (userLoginType === 'admin') {
        loginUser('admin', { email: adminEmail });
      } else {
        loginUser('employee', { email });
      }
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0E468A] text-slate-800 font-sans">
      {/* Left Instructions Panel: Dynamically switches between Learner Guide and Cadre Governance Hub */}
      <div
        className={`lg:w-1/2 p-8 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
          userLoginType === 'admin'
            ? 'bg-gradient-to-b from-[#091830] via-[#0E2448] to-[#071328] border-r border-[#1E2E4A]'
            : 'bg-gradient-to-b from-[#0E468A] via-[#104F9B] to-[#0A3972]'
        }`}
      >
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {userLoginType === 'admin' ? (
          <div className="relative z-10 space-y-7 animate-in fade-in duration-200">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/50 text-blue-300 text-xs font-extrabold mb-3">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Government of India • Ministry Administrative Gateway</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                Cadre Governance & <span className="text-blue-400">Command Center</span>
              </h1>
              <p className="text-xs lg:text-sm text-slate-300 mt-2 leading-relaxed">
                Restricted administrative portal for appointed Ministry Administrators, Cadre Directors, and Capacity Building Commission Officers.
              </p>
            </div>

            <div className="space-y-3.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Authorized Governance Jurisdictions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#0B172E] border border-[#1E2E4A] space-y-1">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Landmark className="w-4 h-4" />
                    <span className="text-xs font-bold text-white">Civil Administration</span>
                  </div>
                  <p className="text-[11px] text-slate-400">DoPT, IAS, CSS, and Central Ministry Cadres</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#0B172E] border border-[#1E2E4A] space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <Building2 className="w-4 h-4" />
                    <span className="text-xs font-bold text-white">Municipal & ULB</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Urban Local Bodies, Smart Cities, Town Planners</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#0B172E] border border-[#1E2E4A] space-y-1">
                  <div className="flex items-center space-x-2 text-purple-400">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-xs font-bold text-white">Statistical Cadre</span>
                  </div>
                  <p className="text-[11px] text-slate-400">MoSPI, ISS, SSS, NSSO, and State DES</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#0B172E] border border-[#1E2E4A] space-y-1">
                  <div className="flex items-center space-x-2 text-amber-400">
                    <Coins className="w-4 h-4" />
                    <span className="text-xs font-bold text-white">Revenue & Finance</span>
                  </div>
                  <p className="text-[11px] text-slate-400">IRS, Commercial Taxes, Treasuries, and CBIC</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 space-y-8 animate-in fade-in duration-200">
            <div>
              <p className="text-amber-300 font-semibold text-sm tracking-wide">{t('authWelcome', 'Welcome to GyanMitra')}</p>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-1">
                {t('howToLogin', 'How To Login')}
              </h1>
            </div>

            {/* Step 1: Email Login Guide */}
            <div className="flex items-start space-x-4">
              <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-base flex-shrink-0 shadow-md">
                1
              </div>
              <div className="space-y-2 text-xs lg:text-sm text-slate-100">
                <h3 className="font-bold text-white text-sm lg:text-base">
                  {t('emailIssueTitle', 'In case you face issues while logging in with your email ID')}
                </h3>
                <ul className="space-y-1.5 text-slate-200 list-disc list-inside text-xs leading-relaxed">
                  <li>{t('stepClearCache', 'Clear the browser cache')}</li>
                  <li>{t('stepPrivateWindow', "Open the browser's private window by pressing")} <strong className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">Ctrl+Shift+N</strong></li>
                  <li>{t('stepOtpOption', "Login with mobile OTP after selecting the 'Log in with OTP' option")}</li>
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
                  {t('parichayIssueTitle', 'In case you face issues while logging in with Parichay')}
                </h3>
                <ul className="space-y-1.5 text-slate-200 list-disc list-inside text-xs leading-relaxed">
                  <li>{t('stepLogoutParichay', 'Log out from all open Parichay websites/tabs')}</li>
                  <li>{t('stepClearCache', 'Clear the browser cache')}</li>
                  <li>{t('stepPrivateWindow', "Open the browser's private window by pressing")} <strong className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">Ctrl+Shift+N</strong></li>
                  <li>{t('stepParichayCredentials', 'Login to the GyanMitra portal with official credentials and enter OTP')}</li>
                  <li>{t('stepTickBoth', 'Tick both the Mobile Number and Primary Email to continue')}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Left Footer Badges */}
        <div className="relative z-10 pt-8 mt-8 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>{t('mospiMinistry', 'Ministry of Statistics & Programme Implementation (MoSPI)')}</span>
          </div>
          <span className="font-mono text-amber-300">
            {userLoginType === 'admin' ? 'SECURE LEVEL 4' : 'NPCSCB 2026'}
          </span>
        </div>
      </div>

      {/* Right Login Form Panel (Crisp White matching iGOT Karmayogi Portal) */}
      <div className="lg:w-1/2 bg-white p-8 lg:p-14 flex flex-col justify-between relative shadow-2xl">
        {/* Top Controls: Multilingual switcher & Help icon */}
        <div className="flex items-center justify-between">
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
            title={t('helpDesk', 'Help')}
          >
            ?
          </button>
        </div>

        {/* Center Auth Form */}
        <div className="max-w-md w-full mx-auto my-6 space-y-5">
          {/* GyanMitra Official Logo & Tagline */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center justify-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-[#1B365D] flex items-center justify-center text-white shadow-md border border-blue-900">
                <div className="text-center leading-none">
                  <span className="text-[#FF9933] text-xs block font-sans font-black tracking-tight">ज्ञान</span>
                  <span className="text-white text-[9px] font-sans tracking-widest uppercase font-bold">Mitra</span>
                </div>
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-black text-[#1B365D] tracking-tight">
                  GyanMitra (ज्ञानमित्र)
                </h2>
                <p className="text-[11px] font-serif text-slate-500 tracking-wider">
                  — National Capacity Building Platform —
                </p>
              </div>
            </div>
            <div className="inline-block px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1B365D] text-xs font-bold">
              {userLoginType === 'admin'
                ? 'GyanMitra • Official Cadre Administration Gateway'
                : t('gyanmitraWing', 'GyanMitra • Official Statistical System Wing')}
            </div>
          </div>

          {/* User Mode Tabs (Officer / Learner vs Admin Login - All in GUI) */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setUserLoginType('employee')}
              className={`py-2 px-1.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                userLoginType === 'employee'
                  ? 'bg-white text-[#1B365D] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span className="truncate">{t('officerLearner', 'Officer / Learner')}</span>
            </button>

            <button
              type="button"
              onClick={() => setUserLoginType('admin')}
              className={`py-2 px-1.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                userLoginType === 'admin'
                  ? 'bg-white text-[#1B365D] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-[#1B365D]" />
              <span className="truncate">{t('adminLoginTab', 'Admin Login')}</span>
            </button>
          </div>

          {/* Render based on selected GUI login mode */}
          {userLoginType === 'admin' ? (
            /* ADMIN LOGIN VIEW (Containing ALL features from previous /admin URL) */
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* 1-Click Cadre Administrator Sign-In */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    1-Click Cadre Administrator Sign-In:
                  </span>
                  <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Direct Console Access
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CADRE_ADMIN_OPTIONS.map((dept) => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => handleCadreAdminLogin(dept.id)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-400 text-left transition-all shadow-2xs cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                            {dept.badge}
                          </span>
                          <span className="text-[10px] text-blue-600 group-hover:text-blue-800 font-bold">Sign In →</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-1 group-hover:text-blue-900 transition-colors">
                          {dept.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-tight">{dept.sub}</p>
                      </div>
                      <p className="text-[10px] text-slate-600 font-semibold pt-1 border-t border-slate-200/80 mt-1.5">
                        Officer: {dept.officer}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Standard Admin Credentials Form */}
              <form onSubmit={handleSignIn} className="space-y-3 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Administrator NIC ID / Official Email
                  </label>
                  <input
                    type="text"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin.workforce@mospi.gov.in"
                    required
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B365D] text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Root Passkey
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">Level 4 Clearance</span>
                  </div>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B365D] text-slate-900"
                  />
                </div>

                {/* reCAPTCHA Checkbox */}
                <div className="bg-[#f9f9f9] p-2.5 rounded-lg border border-slate-300 flex items-center justify-between">
                  <label
                    onClick={() => setIsCaptchaChecked(!isCaptchaChecked)}
                    className="flex items-center space-x-3 cursor-pointer select-none"
                  >
                    {isCaptchaChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                    <span className="text-xs text-slate-700 font-medium">{t('notRobot', "I'm not a robot")}</span>
                  </label>

                  <div className="text-right">
                    <div className="w-6 h-6 mx-auto bg-blue-600 rounded flex items-center justify-center text-white text-[8px] font-bold">
                      CAPTCHA
                    </div>
                    <span className="text-[9px] text-slate-400 block font-sans">Security Check</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#1B365D] hover:bg-[#142947] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Authenticate Admin Console</span>
                </button>

                <div className="relative flex py-0.5 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">{t('orDivider', 'or')}</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button
                  type="button"
                  onClick={handleSsoLogin}
                  className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-2 border border-slate-300 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Jan Parichay Official SSO Gateway</span>
                </button>
              </form>
            </div>
          ) : (
            /* EMPLOYEE / LEARNER LOGIN VIEW */
            <form onSubmit={handleSignIn} className="space-y-4 animate-in fade-in duration-200">
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
                  <span>{t('loginWithPassword', 'Login with password')}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="loginMethod"
                    checked={loginMethod === 'otp'}
                    onChange={() => setLoginMethod('otp')}
                    className="text-[#2087d8] focus:ring-[#2087d8] w-4 h-4"
                  />
                  <span>{t('loginWithOtp', 'Login with OTP')}</span>
                </label>
              </div>

              {/* Email field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('emailLabel', 'Email')}
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gov.in"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2087d8] focus:border-transparent text-slate-900 font-medium"
                />
              </div>

              {/* Password field or OTP field */}
              {loginMethod === 'password' ? (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      {t('passwordLabel', 'Password')}
                    </label>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); showToast("Password reset link sent to official email.", "info"); }}
                      className="text-xs text-[#2087d8] hover:underline font-semibold"
                    >
                      {t('forgotPassword', 'Forgot Password?')}
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
                    {t('mobileEmailOtp', 'Mobile / Email OTP')}
                  </label>
                  <input
                    type="text"
                    defaultValue="849201"
                    placeholder={t('enterOtpPlaceholder', 'Enter 6-digit OTP')}
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
                  <span className="text-xs text-slate-700 font-medium">{t('notRobot', "I'm not a robot")}</span>
                </label>

                <div className="text-right">
                  <div className="w-6 h-6 mx-auto bg-blue-600 rounded flex items-center justify-center text-white text-[8px] font-bold">
                    CAPTCHA
                  </div>
                  <span className="text-[9px] text-slate-400 block font-sans">Security Check</span>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#2087d8] hover:bg-[#1a74ba] text-white text-sm font-bold rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t('loginBtn', 'Login')}</span>
              </button>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">{t('orDivider', 'or')}</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Jan Parichay SSO Login */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-600 text-center">{t('loginWithProviders', 'Login with Providers')}</p>
                <button
                  type="button"
                  onClick={handleSsoLogin}
                  className="w-full py-2.5 px-4 bg-[#1B365D] hover:bg-[#142947] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>{t('selectJanParichay', 'Select Provider (Jan Parichay SSO)')}</span>
                </button>
              </div>
            </form>
          )}

          {/* Footer Notice */}
          <div className="pt-2 text-center text-[11px] text-slate-400">
            <span>{t('poweredByGov', 'Powered by GyanMitra Platform & MoSPI')}</span>
          </div>
        </div>

        {/* Right Footer */}
        <div className="text-center text-[11px] text-slate-400 border-t border-slate-100 pt-3">
          {t('copyrightNotice', '© 2026 GyanMitra • Ministry of Statistics & Programme Implementation (MoSPI).')}
        </div>
      </div>
    </div>
  );
};



