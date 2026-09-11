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
  ExternalLink,
  Search,
  Globe,
  Sun,
  Moon,
  Menu,
  Check
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
    notifications,
    language,
    setLanguage,
    toggleSidebar,
    isSidebarOpen,
    showToast,
    setCurrentScreen,
    t,
    theme,
    toggleTheme
  } = useApp();

  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeDeptConfig = adminDepartmentsConfig?.find(d => d.id === adminDepartment) || adminDepartmentsConfig?.[0];
  const unreadCount = notifications.filter(n => !n.read).length;

  const getInitials = (name) => {
    if (!name) return 'AD';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

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
    <header className="sticky top-0 z-40 bg-[#0B1528] text-white border-b border-[#1E2E4A] select-none">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Emblem, GyanMitra Brand & Hamburger */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentScreen('admin-dashboard')}
          >
            {/* Orange iGOT Emblem */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center text-[#FF9933]">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 8.5H21.5L16 12.5L18 19L12 15L6 19L8 12.5L2.5 8.5H9.5L12 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[#FF9933] font-black text-sm tracking-tight leading-none font-serif">
                    कर्मयोगी भारत
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-900/60 text-blue-300 border border-blue-600/40">
                    ADMIN
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-sans tracking-wide">
                  GyanMitra Governance
                </span>
              </div>
            </div>
          </div>

          {/* Hamburger Menu Box Button */}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg bg-[#162544] hover:bg-[#1E335A] text-slate-300 hover:text-white border border-[#1E3A6D] transition-all cursor-pointer"
            title={isSidebarOpen ? "Collapse Menu" : "Open Menu"}
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Admin Department Switcher */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsDeptDropdownOpen(!isDeptDropdownOpen)}
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-[#111F38] hover:bg-[#162A4D] border border-[#1E3A6D] text-xs font-bold text-slate-100 transition-all cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-900/60 border border-blue-500/40 text-blue-300 flex items-center justify-center">
              <ActiveIcon className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-[9px] text-slate-400 font-normal leading-none">Cadre Department</p>
              <p className="text-xs font-bold text-white mt-0.5">{activeDeptConfig?.name}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform" />
          </button>

          {/* Department Selection Menu */}
          {isDeptDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsDeptDropdownOpen(false)}></div>
              <div className="absolute left-0 mt-2 w-80 bg-[#111F38] rounded-2xl border border-[#1E3A6D] shadow-2xl p-2 z-50 animate-in fade-in">
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
                            ? 'bg-blue-900/60 border border-blue-500/50 text-white font-bold'
                            : 'hover:bg-[#162544] text-slate-300 border border-transparent'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#0B1528] border border-[#1E2E4A] flex items-center justify-center text-blue-400 flex-shrink-0">
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
            </>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Fast Switch to Employee / Learner View */}
          <button
            onClick={() => loginUser('employee')}
            className="px-3 py-1.5 rounded-xl bg-[#162544] hover:bg-[#1E3A6D] text-blue-300 hover:text-white border border-[#1E3A6D] text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Switch to Learner View"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Learner View</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#162544] hover:bg-[#1E335A] text-slate-200 border border-[#1E3A6D] transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-36 bg-[#111F38] rounded-xl shadow-xl border border-[#1E3A6D] py-1 z-50">
                  {[
                    { code: 'en', label: 'English (EN)' },
                    { code: 'hi', label: 'हिन्दी (HI)' },
                    { code: 'te', label: 'తెలుగు (TE)' }
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-[#162544] cursor-pointer ${
                        language === l.code ? 'text-blue-400 bg-[#162544]' : 'text-slate-300'
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-blue-400" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme Sun/Moon Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-[#162544] transition-all cursor-pointer flex items-center justify-center"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-purple-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifMenuOpen(!isNotifMenuOpen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#162544] relative transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-[#E11D48] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full flex items-center justify-center border-2 border-[#0B1528] shadow-xs">
                {unreadCount > 7 ? '7+' : unreadCount > 0 ? unreadCount : '3'}
              </span>
            </button>

            {isNotifMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsNotifMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#111F38] text-slate-200 rounded-2xl shadow-2xl border border-[#1E3A6D] py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-[#1E3A6D] flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Cadre Notifications</span>
                    <button
                      onClick={() => {
                        setCurrentScreen('notifications');
                        setIsNotifMenuOpen(false);
                      }}
                      className="text-[11px] text-blue-400 font-bold hover:underline cursor-pointer"
                    >
                      View All
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#1E3A6D]">
                    {notifications.slice(0, 4).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setCurrentScreen(n.actionLink || 'notifications');
                          setIsNotifMenuOpen(false);
                        }}
                        className="p-3 hover:bg-[#162544] cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-semibold text-white">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Avatar with Emerald Dot */}
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 p-0.5 rounded-full hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center font-bold text-xs shadow-xs border-2 border-[#1E3A6D]">
                  {getInitials(userProfile?.name)}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B1528]"></span>
              </div>
            </button>

            {isProfileDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-64 bg-[#111F38] text-slate-200 rounded-2xl shadow-2xl border border-[#1E3A6D] py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-3 border-b border-[#1E3A6D] bg-[#0A1324] rounded-t-2xl">
                    <p className="text-xs font-bold text-white">{userProfile?.name}</p>
                    <p className="text-[11px] text-slate-400">{userProfile?.email}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-900/60 text-blue-200 border border-blue-700">
                        {userProfile?.adminType || 'Cadre Director'}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        {activeDeptConfig?.name.split('&')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        loginUser('employee');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-[#162544] flex items-center space-x-2 cursor-pointer"
                    >
                      <ArrowRightLeft className="w-4 h-4 text-blue-400" />
                      <span>Switch to Learner View</span>
                    </button>
                    <button
                      onClick={() => {
                        loginUser('trainer');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-[#162544] flex items-center space-x-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Switch to Trainer View</span>
                    </button>
                  </div>

                  <div className="border-t border-[#1E3A6D] pt-1">
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        logoutUser();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 flex items-center space-x-2 font-medium cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
