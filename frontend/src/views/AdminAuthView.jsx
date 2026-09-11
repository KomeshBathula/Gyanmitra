import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Landmark,
  Building2,
  BarChart3,
  Coins,
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Key
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminAuthView = () => {
  const { loginUser, showToast, setIsAdminPortalMode, setCurrentScreen, language, setLanguage } = useApp();

  const [adminEmail, setAdminEmail] = useState('admin.workforce@mospi.gov.in');
  const [adminPass, setAdminPass] = useState('••••••••••••');

  const handleAdminSignIn = (e) => {
    e.preventDefault();
    loginUser('admin', { email: adminEmail });
  };

  const handleCadreLogin = (presetKey) => {
    loginUser(presetKey);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#081326] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Left Instructions Panel: Official Government Governance Hub */}
      <div className="lg:w-1/2 bg-gradient-to-b from-[#091830] via-[#0E2448] to-[#071328] p-8 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden border-r border-[#1E2E4A]">
        {/* Geometric Background Accent */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative z-10 space-y-8">
          {/* Header Tag & Title */}
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/50 text-blue-300 text-xs font-extrabold mb-3">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Government of India • Ministry Administrative Gateway</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Cadre Governance & <span className="text-blue-400">Command Center</span>
            </h1>
            <p className="text-xs lg:text-sm text-slate-300 mt-2 leading-relaxed">
              Restricted portal for appointed Ministry Administrators, Cadre Directors, and Capacity Building Commission Officers.
            </p>
          </div>

          {/* Department Jurisdictions Overview */}
          <div className="space-y-4">
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

        {/* Security Tier Badge */}
        <div className="relative z-10 pt-8 mt-8 border-t border-[#1E2E4A] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-2">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>Dedicated Administrative URL Route (`/admin`)</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold">Secure Layer Level 4</span>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="lg:w-1/2 bg-[#0B1528] p-8 lg:p-14 flex flex-col justify-between relative shadow-2xl">
        {/* Top Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setIsAdminPortalMode(false);
              setCurrentScreen('login');
              window.history.pushState(null, '', '/login');
            }}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Learner & Employee Portal</span>
          </button>

          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-900/60 text-blue-300 border border-blue-600/40">
            ADMIN GATEWAY
          </span>
        </div>

        {/* Center Administrative Form */}
        <div className="max-w-md w-full mx-auto my-6 space-y-6">
          {/* Logo & Subtitle */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center justify-center space-x-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-black text-white tracking-tight leading-none">
                  GyanMitra Governance
                </h2>
                <p className="text-[10px] text-slate-400 font-serif">
                  Official Statistics & Public Cadre Administration
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Select your department administration cadre or enter official NIC admin credentials.
            </p>
          </div>

          {/* 4 Department 1-Click Login Cards */}
          <div className="space-y-2.5">
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              1-Click Cadre Administrator Sign-In:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
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
              ].map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => handleCadreLogin(dept.id)}
                  className="p-3 rounded-xl bg-[#111F38] hover:bg-[#162544] border border-[#1E2E4A] hover:border-blue-500/60 text-left transition-all shadow-md cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-950 text-blue-300 border border-blue-600/40">
                        {dept.badge}
                      </span>
                      <span className="text-[10px] text-blue-400 group-hover:text-blue-300 font-bold">Login →</span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1.5 group-hover:text-blue-300 transition-colors">
                      {dept.title}
                    </h4>
                    <p className="text-[10px] text-slate-400">{dept.sub}</p>
                  </div>
                  <p className="text-[10px] text-slate-300 font-semibold pt-1.5 border-t border-[#1E2E4A] mt-2">
                    👤 {dept.officer}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Standard Credentials Form */}
          <form onSubmit={handleAdminSignIn} className="space-y-3 pt-3 border-t border-[#1E2E4A]">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Administrator NIC ID
              </label>
              <input
                type="text"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs bg-[#080E1C] text-white border border-[#1E2E4A] rounded-xl focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Root Passkey
              </label>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs bg-[#080E1C] text-white border border-[#1E2E4A] rounded-xl focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Authenticate Custom Admin</span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-400 border-t border-[#1E2E4A] pt-3">
          © 2026 Ministry of Statistics & Programme Implementation (MoSPI) • Government of India.
        </div>
      </div>
    </div>
  );
};
