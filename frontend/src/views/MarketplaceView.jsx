import React, { useState } from 'react';
import {
  Search,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Award,
  Zap,
  Globe,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MarketplaceView = () => {
  const { setCurrentScreen, showToast, t } = useApp();
  const [activeTab, setActiveTab] = useState('providers'); // 'providers', 'ar'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProviderModal, setActiveProviderModal] = useState(null);

  // Exact 5 providers matching iGOT Marketplace screenshot (media_1789127554352.png)
  const marketplaceProviders = [
    {
      id: 'p-1',
      name: 'SIMPLILEARN',
      bannerColor: 'bg-[#0097A7]',
      logoText: 'simplilearn',
      logoTextColor: 'text-blue-600',
      category: 'EdTech & Certifications',
      description: 'Global digital skills provider offering curated masterclasses in Python, Cloud Computing, Data Science, and Public Sector AI Governance.',
      activeCoursesCount: 42,
      courses: [
        'Post Graduate Program in Data Engineering',
        'Python for Data Science & Predictive Analytics',
        'Certified Cloud Solutions Architect',
        'AI for Public Administrators'
      ]
    },
    {
      id: 'p-2',
      name: 'National Urban Learning Platform',
      bannerColor: 'bg-[#0097A7]',
      logoText: 'NULP / NIUA',
      logoTextColor: 'text-teal-700',
      category: 'Urban Governance & Municipal Systems',
      description: 'National Institute of Urban Affairs platform delivering municipal capacity, GIS city mapping, urban data analytics, and AMRUT mission planning.',
      activeCoursesCount: 28,
      courses: [
        'Urban GIS Mapping & Spatial Analytics',
        'Municipal Finance & Revenue Mobilization',
        'Smart Cities Digital Infrastructure',
        'Sustainable Urban Water Management'
      ]
    },
    {
      id: 'p-3',
      name: 'eCornell',
      bannerColor: 'bg-[#94612A]',
      logoText: 'eCornell',
      logoTextColor: 'text-red-700',
      category: 'Executive Education & Leadership',
      description: 'Cornell University professional certificates in Strategic Leadership, Public Policy, Data-Driven Decision Making, and Administrative Excellence.',
      activeCoursesCount: 35,
      courses: [
        'Executive Leadership in Public Administration',
        'Data-Driven Decision Making for Policy Makers',
        'Strategic HR & Performance Management',
        'Public Sector Negotiation Strategies'
      ]
    },
    {
      id: 'p-4',
      name: 'Coursera',
      bannerColor: 'bg-[#4163E9]',
      logoText: 'coursera',
      logoTextColor: 'text-blue-600',
      category: 'Global University Consortium',
      description: 'World-leading universities offering official government-subsidized specializations in Econometrics, Statistics, Machine Learning, and Public Finance.',
      activeCoursesCount: 110,
      courses: [
        'Applied Econometrics & Time Series Analysis (Yale)',
        'Machine Learning for Public Sector (Stanford)',
        'Survey Analysis with R & Python (Johns Hopkins)',
        'Public Financial Management (IMF)'
      ]
    },
    {
      id: 'p-5',
      name: 'Harvard Business Impact',
      bannerColor: 'bg-[#4163E9]',
      logoText: 'HARVARD BUSINESS IMPACT',
      logoTextColor: 'text-red-900',
      category: 'Strategic Leadership & Governance',
      description: 'Harvard Business Publishing programs focused on adaptive leadership, crisis communication, inter-ministerial coordination, and transformational public governance.',
      activeCoursesCount: 19,
      courses: [
        'Adaptive Leadership in Times of Crisis',
        'Driving Transformational Public Innovation',
        'Effective Stakeholder Management',
        'Strategic Governance & Policy Execution'
      ]
    }
  ];

  // Augmented Reality AR/VR Modules
  const arModules = [
    {
      id: 'ar-1',
      title: 'AR 3D Field Survey Simulation: NSS Household Listing',
      provider: 'NSSTA Greater Noida',
      duration: '45m',
      device: 'WebXR / Mobile AR',
      description: 'Interactive 3D walkthrough of physical FSU village listing, boundary demarcation, and randomized second-stage sampling.'
    },
    {
      id: 'ar-2',
      title: 'VR Disaster Management & Census Evacuation Protocol',
      provider: 'National Disaster Management Authority',
      duration: '30m',
      device: 'VR Headset / Web 3D',
      description: 'Simulated flood and emergency evacuation route planning aligned with geospatial Census GIS mapping.'
    }
  ];

  const filteredProviders = marketplaceProviders.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-16 text-slate-100 select-none">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          The iGOT Marketplace
        </h1>
      </div>

      {/* Tabs Switcher: Providers | Augmented Reality */}
      <div className="flex items-center space-x-6 border-b border-[#1E2E4A] pb-0 text-sm font-bold">
        <button
          onClick={() => setActiveTab('providers')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'providers'
              ? 'border-blue-500 text-blue-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Providers
        </button>
        <button
          onClick={() => setActiveTab('ar')}
          className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'ar'
              ? 'border-blue-500 text-blue-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Augmented Reality</span>
        </button>
      </div>

      {/* Search Input Pill */}
      <div className="relative max-w-xl">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs bg-[#080E1C] border border-[#1E2E4A] rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
        />
      </div>

      {/* Content Rendering based on Tab */}
      {activeTab === 'providers' ? (
        /* Provider Cards Grid matching the 4-column layout in the screenshot */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              onClick={() => setActiveProviderModal(provider)}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-200 flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1 border border-slate-200 shadow-md"
            >
              {/* Top Colored Header Banner with Centered Circular Logo */}
              <div className={`h-24 ${provider.bannerColor} relative flex items-center justify-center p-3`}>
                {/* Overlapping Round White Logo Container */}
                <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center p-2 border border-slate-100 absolute -bottom-8">
                  <span className={`text-[8px] font-black text-center leading-tight uppercase ${provider.logoTextColor}`}>
                    {provider.logoText}
                  </span>
                </div>
              </div>

              {/* Bottom White Body Card */}
              <div className="pt-10 p-5 bg-white text-slate-900 rounded-b-2xl flex-1 flex flex-col justify-between text-center space-y-4">
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight leading-snug">
                    {provider.name}
                  </h3>
                </div>

                <div className="pt-2 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#0074CB] group-hover:underline flex items-center">
                    <span>View Provider</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Augmented Reality Modules */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {arModules.map((ar) => (
            <div
              key={ar.id}
              className="bg-[#0B1528] rounded-3xl border border-[#1E2E4A] p-6 space-y-4 hover:border-blue-500 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{ar.device}</span>
                </span>
                <span className="text-xs font-mono text-slate-400">{ar.duration}</span>
              </div>
              <h3 className="text-base font-extrabold text-white">{ar.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{ar.description}</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">{ar.provider}</span>
                <button
                  onClick={() => showToast(`Launching ${ar.title} in WebXR Simulator`, "success")}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Launch AR Simulator
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Provider Details & Catalog Modal */}
      {activeProviderModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0B1528] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#1E2E4A] space-y-0 animate-in zoom-in-95 text-slate-200">
            {/* Header */}
            <div className={`p-6 ${activeProviderModal.bannerColor} text-white relative`}>
              <button
                onClick={() => setActiveProviderModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                {activeProviderModal.category}
              </span>
              <h3 className="text-xl font-black text-white mt-1 tracking-tight">
                {activeProviderModal.name}
              </h3>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto bg-[#080E1C]">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeProviderModal.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Available Courses ({activeProviderModal.activeCoursesCount}):</span>
                </h4>
                <div className="space-y-2">
                  {activeProviderModal.courses.map((crs, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#111F38] rounded-2xl border border-[#1E2E4A] text-xs text-slate-200 flex items-center justify-between shadow-xs"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-[11px] flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-semibold">{crs}</span>
                      </div>
                      <button
                        onClick={() => {
                          setActiveProviderModal(null);
                          showToast(`Enrolled in ${crs}`, "success");
                          setCurrentScreen('learning-path');
                        }}
                        className="text-[11px] font-bold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer ml-2 flex-shrink-0"
                      >
                        Enroll
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-[#111F38] border-t border-[#1E2E4A] flex items-center justify-between">
              <button
                onClick={() => setActiveProviderModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveProviderModal(null);
                  setCurrentScreen('courses');
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-lg transition-all cursor-pointer"
              >
                Browse Full Provider Catalog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
