import React, { useState } from 'react';
import {
  Shield,
  Building2,
  Landmark,
  BarChart3,
  Coins,
  ChevronDown,
  Bell,
  User,
  LogOut,
  Sparkles,
  ArrowRightLeft,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminHeader = () => {
  const {
    userProfile,
    adminDepartment,
    switchAdminDepartment,
    adminDepartmentsConfig,
    loginUser,
    logoutUser,
    showToast
  } = useApp();

  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const activeDeptConfig = adminDepartmentsConfig?.find(d => d.id === adminDepartment) || adminDepartmentsConfig?.[0];

  const getDeptIcon = (iconName) => {
    switch (iconName) {
      case 'Landmark': return Landmark;
      case 'Building2': return Building2;
      case 'Coins': return Coins;
      case 'BarChart3':
      default:
        return BarChart3;
    }
  };

  const ActiveIcon = getDeptIcon(activeDeptConfig?.icon);

  return (
    <header className="bg-[#080E1C] border-b border-[#1E2E4A] text-slate-100 select-none z-30 sticky top-0 shadow-xl">
      {/* Top Official National Bar */}
      <div className="bg-[#050A14] border-b border-[#162544] px-4 sm:px-6 py-1 text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-slate-300">Government of India • Ministry Administrative Gateway</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-amber-400 font-medium">Mission Karmayogi Bharat (NPCSCB)</span>
        </div>
        <div className="flex items-center space-x-3 text-[10px]">
          <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold">
            ADMIN ROOT MODE
          </span>
          <span className="text-slate-500">Security Tier: Level 4 HAG</span>
        </div>
      </div>

      {/* Main Admin Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Ministry Governance Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-700 via-indigo-600 to-blue-600 p-0.5 shadow-lg flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full bg-[#0B1528] rounded-[14px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-black text-white tracking-tight leading-none">
                GyanMitra <span className="text-purple-400 font-extrabold">Governance Console</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-950 text-amber-400 border border-amber-500/40 hidden sm:inline-block">
                Ministry Admin
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Official Statistics & Public Cadre Competency Intelligence Portal
            </p>
          </div>
        </div>

        {/* Center: Admin Department Switcher Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsDeptDropdownOpen(!isDeptDropdownOpen)}
            className="flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-[#111F38] hover:bg-[#162A4D] border border-[#223963] text-xs font-bold text-slate-100 transition-all shadow-md cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-lg bg-purple-900/60 border border-purple-500/50 text-purple-300 flex items-center justify-center">
              <ActiveIcon className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-normal leading-none">Admin Cadre Department</p>
              <p className="text-xs font-black text-white mt-0.5">{activeDeptConfig?.name}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform" />
          </button>

          {/* Department Selection Menu */}
          {isDeptDropdownOpen && (
            <div className="absolute left-0 mt-2 w-80 bg-[#0F1E36] rounded-2xl border border-[#233B67] shadow-2xl p-2 z-50 animate-in fade-in">
              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Administration Cadre
              </p>
              <div className="space-y-1">
                {adminDepartmentsConfig?.map((dept) => {
                  const Icon = getDeptIcon(dept.icon);
                  const isSelected = dept.id === adminDepartment;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => {
                        switchAdminDepartment(dept.id);
                        setIsDeptDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center space-x-3 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-purple-900/60 border border-purple-500/50 text-white font-bold'
                          : 'hover:bg-[#162544] text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#0B1528] border border-[#1E2E4A] flex items-center justify-center text-purple-400 flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 truncate">
                        <p className="font-bold text-white truncate">{dept.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{dept.badge} • {dept.totalLearners} Learners</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Role Switcher & Profile Options */}
        <div className="flex items-center space-x-3">
          {/* Fast Switch to Employee / Learner View */}
          <button
            onClick={() => loginUser('employee')}
            className="px-3 py-1.5 rounded-xl bg-[#13233F] hover:bg-[#1A3158] text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
            title="Switch to Employee / Learner UI to test learner experience"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Switch to Learner View</span>
          </button>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 p-1.5 pl-2 rounded-xl bg-[#111F38] hover:bg-[#162544] border border-[#1E2E4A] cursor-pointer"
            >
              <img
                src={userProfile?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"}
                alt={userProfile?.name}
                className="w-7 h-7 rounded-lg object-cover border border-purple-400"
              />
              <div className="text-left hidden lg:block pr-1">
                <p className="text-xs font-bold text-white truncate max-w-[130px]">{userProfile?.name}</p>
                <p className="text-[10px] text-purple-300 truncate max-w-[130px]">{userProfile?.adminType || 'Director'}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0F1E36] rounded-2xl border border-[#233B67] shadow-2xl p-2 z-50 animate-in fade-in text-xs space-y-2">
                <div className="p-3 bg-[#0B1528] rounded-xl border border-[#1E2E4A]">
                  <p className="font-bold text-white">{userProfile?.name}</p>
                  <p className="text-[11px] text-purple-300">{userProfile?.designation}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{userProfile?.department}</p>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">{userProfile?.employeeId}</p>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      loginUser('trainer');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#162544] text-slate-300 hover:text-white flex items-center space-x-2 cursor-pointer"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 text-purple-400" />
                    <span>Switch to Trainer View</span>
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-rose-950/60 text-rose-300 hover:text-rose-200 flex items-center space-x-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Sign Out of Admin Console</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
