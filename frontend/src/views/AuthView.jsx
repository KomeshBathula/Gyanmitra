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
  const { loginUser, showToast, language, setLanguage, t } = useApp();

  // Mode: 'employee' | 'trainer' (strictly for public official & faculty login)
  const [userLoginType, setUserLoginType] = useState('employee'); // 'employee' or 'trainer'
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [email, setEmail] = useState('rajesh.kumar@gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(true);

  // Sync email defaults when login type changes
  useEffect(() => {
    if (userLoginType === 'trainer') {
      setEmail('dr.meenakshi@nssta.gov.in');
    } else {
      setEmail('rajesh.kumar@gov.in');
    }
  }, [userLoginType]);

  const handleUserSignIn = (e) => {
    e.preventDefault();
    loginUser(userLoginType, { email });
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
                <li>{t('stepParichayCredentials', 'Login to the iGOT Karmayogi portal with Parichay credentials and enter OTP')}</li>
                <li>{t('stepTickBoth', 'Tick both the Mobile Number and Primary Email to continue')}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Left Footer Badges */}
        <div className="relative z-10 pt-8 mt-8 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>{t('mospiMinistry', 'Ministry of Statistics & Programme Implementation (MoSPI)')}</span>
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
            title={t('helpDesk', 'Help')}
          >
            ?
          </button>
        </div>

        {/* Center Auth Form */}
        <div className="max-w-md w-full mx-auto my-6 space-y-6">
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
              {t('gyanmitraWing', 'GyanMitra • Official Statistical System Wing')}
            </div>
          </div>

          {/* User Mode Tabs (Official vs Trainer) */}
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
              onClick={() => setUserLoginType('trainer')}
              className={`py-2 px-1.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                userLoginType === 'trainer'
                  ? 'bg-white text-[#1B365D] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate">{t('nsstaFaculty', 'NSSTA Faculty')}</span>
            </button>
          </div>

          {/* Form */}
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
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2087d8] focus:border-transparent text-slate-900"
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



