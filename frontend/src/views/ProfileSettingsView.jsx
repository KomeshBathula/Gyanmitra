import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  MoreVertical,
  Edit2,
  Check,
  Award,
  FileText,
  MessageSquare,
  User,
  Clock,
  GraduationCap,
  Trophy,
  Info,
  ExternalLink,
  Shield,
  Smartphone,
  Mail,
  Building,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const ProfileSettingsView = () => {
  const { userProfile, setUserProfile, setCurrentScreen, showToast, t } = useApp();
  const [activeTab, setActiveTab] = useState('about'); // 'about', 'basic', 'service', 'education', 'achievements'
  const [isEditingModal, setIsEditingModal] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State for editing
  const [formData, setFormData] = useState({
    name: userProfile?.name || 'Rajeswari Malluri',
    designation: userProfile?.designation || 'Branch Postmaster',
    circle: userProfile?.cadre || 'Andhra Pradesh Postal Circle',
    group: userProfile?.group || 'GDS',
    email: userProfile?.email || 'mallurirajeswari8@gmail.com',
    phone: userProfile?.phone || '+91 6304299961',
    employeeId: userProfile?.employeeId || 'AP-GDS-89211',
    bio: userProfile?.bio || ''
  });

  // Fetch live profile from backend Express API
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    api.getProfile().then(res => {
      if (isMounted && res?.user) {
        setUserProfile(res.user);
        setFormData({
          name: res.user.name || 'Rajeswari Malluri',
          designation: res.user.designation || 'Branch Postmaster',
          circle: res.user.cadre || 'Andhra Pradesh Postal Circle',
          group: res.user.group || 'GDS',
          email: res.user.email || 'mallurirajeswari8@gmail.com',
          phone: res.user.phone || '+91 6304299961',
          employeeId: res.user.employeeId || 'AP-GDS-89211',
          bio: res.user.bio || ''
        });
      }
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const updatePayload = {
      name: formData.name,
      designation: formData.designation,
      cadre: formData.circle,
      group: formData.group,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio
    };

    // Save to backend
    const res = await api.updateProfile(updatePayload);
    if (res?.user) {
      setUserProfile(res.user);
    }
    setIsEditingModal(false);
    showToast("Profile details saved and synchronized with Karmayogi backend", "success");
  };

  // Recommended Communities from screenshot
  const recommendedCommunities = [
    {
      id: 'comm-1',
      title: 'AI for Governance: Transforming Public Services',
      members: '136.3K Members',
      posts: '13.8K Posts',
      publisher: 'Karmayogi Bharat',
      bgGradient: 'from-blue-600 to-indigo-900',
      badge: 'AI & Data Analytics'
    },
    {
      id: 'comm-2',
      title: 'Mission Karmayogi: Empowering Civil Servants',
      members: '74.5K Members',
      posts: '12.7K Posts',
      publisher: 'Karmayogi Bharat',
      bgGradient: 'from-amber-600 via-orange-600 to-amber-800',
      badge: 'Capacity Building'
    },
    {
      id: 'comm-3',
      title: 'Viksit Bharat: Vision 2047 Building a Developed India',
      members: '92.1K Members',
      posts: '18.4K Posts',
      publisher: 'Karmayogi Bharat',
      bgGradient: 'from-emerald-700 to-teal-900',
      badge: 'Viksit Bharat 2047'
    }
  ];

  return (
    <div className="space-y-6 pb-16 text-slate-100 select-none">
      {/* Breadcrumb Header */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="text-blue-400 hover:underline cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-300">Profile</span>
      </div>

      {isLoading && (
        <div className="py-4 flex items-center justify-center space-x-2 text-blue-400 text-xs font-bold">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Synchronizing Karmayogi Service Profile...</span>
        </div>
      )}

      {/* Main Grid: Left/Center Profile Content + Right Communities Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left & Center 2-Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Profile Hero Identity Banner Card */}
          <div className="bg-[#0B1528] rounded-3xl border border-[#1E2E4A] overflow-hidden shadow-xl relative">
            {/* Top Watermark Pattern Banner */}
            <div className="h-32 bg-gradient-to-r from-[#112140] via-[#162D55] to-[#112140] relative flex items-center justify-between px-6 border-b border-[#1E2E4A]/80">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                  Official GoI Karmayogi Profile
                </span>
              </div>
              <button
                onClick={() => {
                  setEditSection('all');
                  setIsEditingModal(true);
                }}
                className="relative z-10 w-8 h-8 rounded-full bg-[#080E1C]/80 hover:bg-[#080E1C] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#1E2E4A]"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Avatar & Info Row */}
            <div className="p-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12">
              <div className="flex items-end space-x-4">
                {/* Circular Avatar with Progress Ring & Percentage */}
                <div className="relative flex flex-col items-center flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-[#0F1E36] border-4 border-[#0B1528] ring-4 ring-emerald-500/80 flex items-center justify-center text-white font-black text-2xl shadow-2xl">
                    RM
                  </div>
                  <span className="mt-1 text-[11px] font-bold text-emerald-400 tracking-wide">
                    {userProfile?.profileCompletion || 36.7}%
                  </span>
                </div>

                {/* Name, Verification Check, and Cadre */}
                <div className="pb-3 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {formData.name}
                    </h2>
                    {/* Green Verified Circle Badge */}
                    <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    {formData.designation} | {formData.circle}
                  </p>
                </div>
              </div>

              {/* Action Menu */}
              <div className="pb-3 self-end sm:self-auto">
                <button
                  onClick={() => {
                    setEditSection('details');
                    setIsEditingModal(true);
                  }}
                  className="w-8 h-8 rounded-full bg-[#111F38] hover:bg-[#162544] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#1E2E4A]"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Metrics 4-Card Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Karma Points */}
            <div className="bg-[#0B1528] rounded-2xl border border-[#1E2E4A] p-4 flex flex-col justify-between space-y-3 shadow-md">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center space-x-1">
                  <span>My Karma Points</span>
                  <Info className="w-3 h-3 text-slate-500" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-amber-950 font-black text-xs shadow-xs">
                    🪙
                  </div>
                  <span className="text-lg font-black text-white">{userProfile?.karmayogiCredits || 799}</span>
                </div>
                <button
                  onClick={() => setCurrentScreen('progress')}
                  className="text-xs font-bold text-blue-400 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>
            </div>

            {/* My Certificates */}
            <div className="bg-[#0B1528] rounded-2xl border border-[#1E2E4A] p-4 flex flex-col justify-between space-y-3 shadow-md">
              <div className="text-xs font-bold text-slate-300">
                <span>My Certificates</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-amber-400 text-base">📜</span>
                  <span className="text-lg font-black text-white">{userProfile?.certificatesCount || 75}</span>
                </div>
                <button
                  onClick={() => setCurrentScreen('competencies')}
                  className="text-xs font-bold text-blue-400 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>
            </div>

            {/* My Badges */}
            <div className="bg-[#0B1528] rounded-2xl border border-[#1E2E4A] p-4 flex flex-col justify-between space-y-3 shadow-md">
              <div className="text-xs font-bold text-slate-300">
                <span>My Badges</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-red-400 text-base">🎖️</span>
                  <span className="text-lg font-black text-white">{userProfile?.badgesEarned || 0}</span>
                </div>
                <button
                  onClick={() => setCurrentScreen('progress')}
                  className="text-xs font-bold text-blue-400 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>
            </div>

            {/* My Posts */}
            <div className="bg-[#0B1528] rounded-2xl border border-[#1E2E4A] p-4 flex flex-col justify-between space-y-3 shadow-md">
              <div className="text-xs font-bold text-slate-300">
                <span>My Posts</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-amber-400 text-base">💬</span>
                  <span className="text-lg font-black text-white">{userProfile?.postsCount || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Two-Column Layout: Left Vertical Tabs + Right Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Vertical Navigation Menu */}
            <div className="md:col-span-1 space-y-1">
              {[
                { id: 'about', label: 'About me', icon: User },
                { id: 'basic', label: 'Basic Details', icon: FileText },
                { id: 'service', label: 'Service History', icon: Clock },
                { id: 'education', label: 'Educational', icon: GraduationCap },
                { id: 'achievements', label: 'Achievements', icon: Trophy }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1D4ED8] text-white shadow-md'
                        : 'bg-[#0B1528] text-slate-300 hover:text-white hover:bg-[#111F38] border border-[#1E2E4A]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Information Panels */}
            <div className="md:col-span-3 space-y-4">
              {/* About me Card */}
              <div className="bg-[#0B1528] rounded-2xl border border-[#1E2E4A] p-5 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white">About me</h3>
                  <button
                    onClick={() => {
                      setEditSection('about');
                      setIsEditingModal(true);
                    }}
                    className="text-blue-400 hover:text-blue-300 cursor-pointer p-1 rounded-lg hover:bg-[#162544] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {formData.bio ? (
                  <p className="text-xs text-slate-300 leading-relaxed">{formData.bio}</p>
                ) : (
                  /* Authentic Empty State Sign from Screenshot */
                  <div className="py-8 flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="w-16 h-10 border-2 border-dashed border-blue-500/60 rounded-lg flex items-center justify-center text-blue-400 text-xs font-black tracking-widest bg-blue-950/30">
                      EMPTY
                    </div>
                    <p className="text-[11px] text-slate-500">No bio added yet. Click edit to add a summary.</p>
                  </div>
                )}
              </div>

              {/* Primary Details Card */}
              <div className="bg-[#0B1528] rounded-2xl border border-[#1E2E4A] p-5 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white">Primary Details</h3>
                  <button
                    onClick={() => {
                      setEditSection('primary');
                      setIsEditingModal(true);
                    }}
                    className="text-blue-400 hover:text-blue-300 cursor-pointer p-1 rounded-lg hover:bg-[#162544] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Group</span>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <span className="font-bold text-white">{formData.group}</span>
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <Check className="w-2 h-2 stroke-[3]" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Designation</span>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <span className="font-bold text-white">{formData.designation}</span>
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <Check className="w-2 h-2 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Details Card */}
              <div className="bg-[#0B1528] rounded-2xl border border-[#1E2E4A] p-5 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white">Other Details</h3>
                  <button
                    onClick={() => {
                      setEditSection('other');
                      setIsEditingModal(true);
                    }}
                    className="text-blue-400 hover:text-blue-300 cursor-pointer p-1 rounded-lg hover:bg-[#162544] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Employee ID</span>
                    <span className="font-semibold text-slate-300 mt-0.5 block">{formData.employeeId || '-'}</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Email</span>
                    <span className="font-semibold text-slate-300 mt-0.5 block truncate" title={formData.email}>
                      {formData.email}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">Mobile Number</span>
                    <span className="font-semibold text-slate-300 mt-0.5 block">{formData.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Recommended Communities */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-white tracking-wide">
            Recommended Communities
          </h3>

          <div className="space-y-4">
            {recommendedCommunities.map((comm) => (
              <div
                key={comm.id}
                className="bg-[#0B1528] rounded-2xl border border-[#1E2E4A] overflow-hidden shadow-lg hover:border-blue-500 transition-all flex flex-col justify-between"
              >
                {/* Banner Thumbnail Art */}
                <div className={`h-24 bg-gradient-to-br ${comm.bgGradient} p-3 flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-black/40 text-white backdrop-blur-xs">
                      {comm.badge}
                    </span>
                  </div>
                  <div className="text-xs font-black text-white line-clamp-1 drop-shadow-md">
                    {comm.title}
                  </div>
                </div>

                {/* Community Body */}
                <div className="p-4 bg-white text-slate-900 rounded-b-2xl space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                      {comm.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 font-medium">
                      {comm.members} • {comm.posts}
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-600">
                    <span className="text-amber-600 font-bold">🏛️</span>
                    <span>{comm.publisher}</span>
                  </div>

                  <div className="pt-1 text-center">
                    <button
                      onClick={() => showToast(`Joined ${comm.title}`, "success")}
                      className="text-xs font-bold text-[#0074CB] hover:underline cursor-pointer"
                    >
                      View Community
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0B1528] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#1E2E4A] text-slate-200">
            <div className="p-5 bg-[#111F38] border-b border-[#1E2E4A] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Edit Profile Details</h3>
              <button
                onClick={() => setIsEditingModal(false)}
                className="w-7 h-7 rounded-full bg-[#162544] hover:bg-[#1E335A] text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto bg-[#080E1C] text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#111F38] border border-[#1E2E4A] rounded-xl text-white focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111F38] border border-[#1E2E4A] rounded-xl text-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Cadre / Circle</label>
                  <input
                    type="text"
                    value={formData.circle}
                    onChange={(e) => setFormData({ ...formData, circle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111F38] border border-[#1E2E4A] rounded-xl text-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111F38] border border-[#1E2E4A] rounded-xl text-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold">Mobile Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111F38] border border-[#1E2E4A] rounded-xl text-white focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">About Me Summary</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Share a brief overview of your public administration role and professional background..."
                  className="w-full px-3 py-2 bg-[#111F38] border border-[#1E2E4A] rounded-xl text-white focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-[#1E2E4A] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditingModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#162544] text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
