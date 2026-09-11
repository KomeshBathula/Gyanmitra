import React, { useState } from 'react';
import {
  Search,
  ArrowUpDown,
  ChevronRight,
  BookOpen,
  Zap,
  Layers,
  Award,
  Clock,
  Play,
  CheckCircle2,
  Share2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CoursesView = () => {
  const { setCurrentScreen, showToast, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  // Exact 8 Programs from the official iGOT Karmayogi Bharat portal + MoSPI Statistical track
  const karmaPrograms = [
    {
      id: 'kp-1',
      title: 'FORESTRY TRAINING PROGRAMME FOR INDIAN FOREST SERVICE (IFS) OFFICERS',
      code: 'IFS-FOR-2024',
      provider: 'IGNFA Dehradun & MoEFCC',
      category: 'Specialized Service',
      duration: '40 Hours (4 Weeks)',
      karmaPoints: 250,
      competency: 'Forestry & Environmental Governance',
      bgGradient: 'from-emerald-800 via-teal-900 to-slate-900',
      bannerTheme: 'nature',
      badge: 'In-Service',
      syllabus: [
        'Module 1: Principles of Modern Silviculture & Forest Management',
        'Module 2: Wildlife Protection Act & Biodiversity Conservation',
        'Module 3: Geospatial GIS & Remote Sensing in Forest Mapping',
        'Module 4: Community Forest Rights & Carbon Accounting'
      ],
      description: 'Comprehensive in-service capacity building program tailored for IFS officers focusing on sustainable forestry, ecosystem valuation, and wildlife conservation policies.'
    },
    {
      id: 'kp-2',
      title: 'NIC IN-SERVICE TRAINING PROGRAMME 2024-25',
      code: 'NIC-TECH-2024',
      provider: 'National Informatics Centre (NIC)',
      category: 'Digital Governance',
      duration: '32 Hours (3 Weeks)',
      karmaPoints: 200,
      competency: 'Cloud Infrastructure & Public Tech Stacks',
      bgGradient: 'from-blue-900 via-indigo-950 to-slate-900',
      bannerTheme: 'tech',
      badge: 'Certified',
      syllabus: [
        'Module 1: e-Office 7.0 & Government Workflow Automation',
        'Module 2: MeghRaj Cloud & Cyber Security Best Practices',
        'Module 3: API-first Architecture & National Data Governance',
        'Module 4: AI/ML Adoption in Public Service Delivery'
      ],
      description: 'National Informatics Centre capacity building module designed for IT officers and administrators managing e-Governance systems, cyber security, and cloud workloads.'
    },
    {
      id: 'kp-3',
      title: 'JAN KARMAYOGI',
      code: 'JK-PUB-2024',
      provider: 'Karmayogi Bharat Foundation',
      category: 'Citizen Centric',
      duration: '18 Hours (2 Weeks)',
      karmaPoints: 150,
      competency: 'Citizen Centricity & Public Service Delivery',
      bgGradient: 'from-amber-700 via-orange-900 to-slate-900',
      bannerTheme: 'citizen',
      badge: 'Flagship',
      syllabus: [
        'Module 1: Citizen Charters & Service Delivery Standards',
        'Module 2: Empathy, Active Listening, and Grievance Redressal',
        'Module 3: CPGRAMS 7.0 Case Management',
        'Module 4: Ethical Leadership in Public Interface Roles'
      ],
      description: 'Flagship behavioral transformation program cultivating a citizen-first mindset, empathy, active listening, and responsive grievance handling among civil servants.'
    },
    {
      id: 'kp-4',
      title: 'SAMARTH (GOVERNMENT OF INDIA)',
      code: 'SAMARTH-GOI-2024',
      provider: 'DoPT & CBC',
      category: 'Core Administrative',
      duration: '24 Hours (3 Weeks)',
      karmaPoints: 180,
      competency: 'Administrative Efficiency & Procurement',
      bgGradient: 'from-cyan-900 via-sky-950 to-slate-900',
      bannerTheme: 'admin',
      badge: 'Core Track',
      syllabus: [
        'Module 1: General Financial Rules (GFR 2017) & GeM Procurement',
        'Module 2: Noting, Drafting, and Inter-Ministerial Consultations',
        'Module 3: Right to Information (RTI Act) Compliance',
        'Module 4: Conduct Rules & Disciplinary Proceedings'
      ],
      description: 'Foundational administrative competence module covering GFR 2017 procurement guidelines, GeM portal workflows, official noting/drafting, and RTI procedures.'
    },
    {
      id: 'kp-5',
      title: 'DAKSHTA - ATTITUDE, KNOWLEDGE, SKILLS FOR HOLISTIC TRANSFORMATION',
      code: 'DAKSHTA-2024',
      provider: 'Capacity Building Commission (CBC)',
      category: 'Behavioral & Functional',
      duration: '30 Hours (3 Weeks)',
      karmaPoints: 220,
      competency: 'Holistic Administrative Transformation',
      bgGradient: 'from-purple-900 via-indigo-950 to-slate-900',
      bannerTheme: 'transformation',
      badge: 'CBC Certified',
      syllabus: [
        'Module 1: Stress Management & Workplace Well-being',
        'Module 2: Data-Driven Decision Making in Policy',
        'Module 3: Communication & Negotiation in Government',
        'Module 4: Project Monitoring via PRAGATI Framework'
      ],
      description: 'Development of Attitude, Knowledge, Skills for Holistic Transformation in Administration (DAKSHTA), an all-inclusive framework for dynamic civil servants.'
    },
    {
      id: 'kp-6',
      title: 'KNOW YOUR MINISTRY: MoSPI & OFFICIAL STATISTICAL SYSTEM',
      code: 'KYM-MOSPI-2024',
      provider: 'MoSPI & NSSTA Greater Noida',
      category: 'Domain Statistics',
      duration: '20 Hours (2 Weeks)',
      karmaPoints: 200,
      competency: 'National Statistical Framework (FRAC-MoSPI)',
      bgGradient: 'from-blue-800 via-slate-900 to-indigo-950',
      bannerTheme: 'mospi',
      badge: 'MoSPI Special',
      syllabus: [
        'Module 1: Organizational Structure of MoSPI, NSO & NSC',
        'Module 2: National Accounts Statistics (GDP, GVA, Base Years)',
        'Module 3: Index of Industrial Production (IIP) & CPI Inflation',
        'Module 4: Sustainable Development Goals (SDG) National Indicator Framework'
      ],
      description: 'Essential orientation to the Indian Official Statistical System, the mandate of MoSPI, National Accounts, Price Indices, and the SDG National Indicator Framework.'
    },
    {
      id: 'kp-7',
      title: 'MoSPI IN-SERVICE STATISTICAL METHODOLOGY & DATA ANALYTICS',
      code: 'NSSTA-STAT-2024',
      provider: 'National Statistical Systems Training Academy (NSSTA)',
      category: 'Advanced Domain',
      duration: '45 Hours (4 Weeks)',
      karmaPoints: 300,
      competency: 'NSS Sampling Methodology & Python Analytics',
      bgGradient: 'from-teal-900 via-emerald-950 to-slate-900',
      bannerTheme: 'analytics',
      badge: 'ISS / SSS Track',
      syllabus: [
        'Module 1: Stratified Multistage Sampling (NSS 79th/80th Rounds)',
        'Module 2: Python for Statistical Data Analysis (Pandas, NumPy, SciPy)',
        'Module 3: Non-Sampling Errors, Imputation & Weighting Techniques',
        'Module 4: Big Data & Geospatial Integration in Official Surveys'
      ],
      description: 'Specialized technical curriculum for Indian Statistical Service (ISS) and Subordinate Statistical Service (SSS) officers in survey design, sampling, and computational analytics.'
    },
    {
      id: 'kp-8',
      title: 'MISSION KARMAYOGI FOUNDATION (NPCSCB)',
      code: 'MK-FOUND-2024',
      provider: 'DoPT, Government of India',
      category: 'National Framework',
      duration: '15 Hours (1.5 Weeks)',
      karmaPoints: 120,
      competency: 'Competency-Based Capacity Building',
      bgGradient: 'from-slate-900 via-blue-950 to-slate-950',
      bannerTheme: 'foundation',
      badge: 'Mandatory',
      syllabus: [
        'Module 1: Vision and Pillars of Mission Karmayogi (NPCSCB)',
        'Module 2: FRAC Framework (Roles, Activities, Competencies)',
        'Module 3: 70:20:10 Learning Model in Civil Services',
        'Module 4: Annual Capacity Building Plans (ACBP) Integration'
      ],
      description: 'Foundational introduction to Mission Karmayogi, transitioning Indian civil services from rule-based to role-based capacity development.'
    }
  ];

  // Filter & Sort
  const filteredPrograms = karmaPrograms
    .filter((p) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(query) ||
        p.provider.toLowerCase().includes(query) ||
        p.competency.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

  // Render Graphic Banner Visual
  const renderBannerGraphic = (theme, title) => {
    switch (theme) {
      case 'nature':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-950 flex flex-col justify-between p-3.5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-emerald-500/20 blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                IGNFA
              </span>
              <span className="text-[10px] font-mono text-emerald-200">MoEFCC</span>
            </div>
            <div className="z-10">
              <span className="text-xl font-black text-white/90 tracking-wide block">IFS</span>
              <span className="text-[11px] text-emerald-200 font-semibold">Forestry In-Service 2024</span>
            </div>
          </div>
        );
      case 'tech':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950 flex flex-col justify-between p-3.5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-blue-500/20 blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                NIC
              </span>
              <span className="text-[10px] font-mono text-blue-200">MeitY</span>
            </div>
            <div className="z-10">
              <span className="text-xl font-black text-white/90 tracking-wide block">NIC TECH</span>
              <span className="text-[11px] text-blue-200 font-semibold">In-Service Training 2024-25</span>
            </div>
          </div>
        );
      case 'citizen':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-amber-600 via-orange-700 to-slate-950 flex flex-col justify-between p-3.5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-amber-400/20 blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                CITIZEN FIRST
              </span>
              <span className="text-[10px] font-mono text-amber-200">Gov.in</span>
            </div>
            <div className="z-10">
              <span className="text-xl font-black text-white/90 tracking-wide block">JAN KARMAYOGI</span>
              <span className="text-[11px] text-amber-200 font-semibold">Public Service Excellence</span>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-cyan-700 via-sky-800 to-slate-950 flex flex-col justify-between p-3.5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-cyan-400/20 blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                DoPT
              </span>
              <span className="text-[10px] font-mono text-sky-200">GFR & GeM</span>
            </div>
            <div className="z-10">
              <span className="text-xl font-black text-white/90 tracking-wide block">SAMARTH</span>
              <span className="text-[11px] text-sky-200 font-semibold">Administrative Competencies</span>
            </div>
          </div>
        );
      case 'transformation':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-purple-800 via-indigo-900 to-slate-950 flex flex-col justify-between p-3.5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-purple-400/20 blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                CBC
              </span>
              <span className="text-[10px] font-mono text-purple-200">DAKSHTA</span>
            </div>
            <div className="z-10">
              <span className="text-xl font-black text-white/90 tracking-wide block">DAKSHTA</span>
              <span className="text-[11px] text-purple-200 font-semibold">Holistic Transformation</span>
            </div>
          </div>
        );
      case 'mospi':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-blue-800 via-slate-900 to-indigo-950 flex flex-col justify-between p-3.5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-blue-400/20 blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                MoSPI
              </span>
              <span className="text-[10px] font-mono text-blue-200">NSSTA</span>
            </div>
            <div className="z-10">
              <span className="text-xl font-black text-white/90 tracking-wide block">KNOW YOUR MINISTRY</span>
              <span className="text-[11px] text-blue-200 font-semibold">Official Statistics & SDG NIF</span>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="w-full h-36 bg-gradient-to-br from-teal-800 via-emerald-900 to-slate-950 flex flex-col justify-between p-3.5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-teal-400/20 blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                NSSTA GREATER NOIDA
              </span>
              <span className="text-[10px] font-mono text-teal-200">ISS / SSS</span>
            </div>
            <div className="z-10">
              <span className="text-xl font-black text-white/90 tracking-wide block">STATISTICAL METHODOLOGY</span>
              <span className="text-[11px] text-teal-200 font-semibold">NSS Sampling & Python</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-36 bg-gradient-to-br from-slate-800 via-blue-950 to-slate-950 flex flex-col justify-between p-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                NPCSCB
              </span>
              <span className="text-[10px] font-mono text-slate-300">DoPT</span>
            </div>
            <div className="z-10">
              <span className="text-xl font-black text-white/90 tracking-wide block">MISSION KARMAYOGI</span>
              <span className="text-[11px] text-slate-300 font-semibold">Capacity Building Framework</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb matching official iGOT portal */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="hover:text-blue-600 cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">Karma Programs</span>
      </div>

      {/* Title & Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#1B365D] tracking-tight">
            All Programs ({filteredPrograms.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Role-based and specialized capacity building tracks curated under Mission Karmayogi
          </p>
        </div>

        {/* Filter Controls: Search & Ascending Sort */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Search Pill */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2087d8] text-slate-800 shadow-2xs"
            />
          </div>

          {/* Sort Selector: Ascending (A - Z) */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-full shadow-2xs transition-colors cursor-pointer"
          >
            <span>{sortOrder === 'asc' ? 'Ascending (A - Z)' : 'Descending (Z - A)'}</span>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>

      {/* 4-Column Card Grid matching iGOT portal layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPrograms.map((program) => (
          <div
            key={program.id}
            onClick={() => setActiveCourseModal(program)}
            className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 border border-slate-200 bg-white flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
          >
            {/* Upper Graphic Art Area */}
            <div className="relative">
              {renderBannerGraphic(program.bannerTheme, program.title)}
            </div>

            {/* Bottom Solid Deep Blue Container matching iGOT portal */}
            <div className="bg-[#0B2B5C] p-4 flex flex-col justify-between flex-1 min-h-[140px] text-white">
              <h3 className="text-xs font-black uppercase tracking-wider leading-snug line-clamp-3 text-slate-100 group-hover:text-amber-300 transition-colors">
                {program.title}
              </h3>

              <div className="mt-4 pt-2 border-t border-blue-900/60 flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center text-amber-300 font-bold">
                  <Zap className="w-3 h-3 mr-1 fill-amber-400 text-amber-400" />
                  +{program.karmaPoints} Pts
                </span>
                <span className="font-semibold text-sky-200 flex items-center group-hover:underline">
                  View Track <ChevronRight className="w-3 h-3 ml-0.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail / Syllabus Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 space-y-0 animate-in zoom-in-95">
            {/* Modal Header Banner */}
            <div className="bg-[#0B2B5C] p-6 text-white relative">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
              <div className="flex items-center space-x-2 text-xs text-amber-300 font-bold uppercase tracking-wider mb-2">
                <span>{activeCourseModal.provider}</span>
                <span>•</span>
                <span>{activeCourseModal.badge}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                {activeCourseModal.title}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto bg-slate-50">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeCourseModal.description}
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Duration</span>
                  <span className="text-xs font-bold text-slate-800">{activeCourseModal.duration}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Reward</span>
                  <span className="text-xs font-bold text-amber-600 flex items-center justify-center">
                    <Zap className="w-3 h-3 mr-0.5 fill-amber-500" />
                    +{activeCourseModal.karmaPoints} KarmaPoints
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Code</span>
                  <span className="text-xs font-mono font-bold text-blue-700">{activeCourseModal.code}</span>
                </div>
              </div>

              {/* Syllabus Modules */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Program Modules & Curriculum:</span>
                </h4>
                <div className="space-y-2">
                  {activeCourseModal.syllabus?.map((mod, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 flex items-center space-x-3 shadow-2xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#1B365D] text-white font-black text-[11px] flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-semibold">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveCourseModal(null);
                  showToast(`Enrolled in ${activeCourseModal.title}`, "success");
                  setCurrentScreen('learning-path');
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#2087d8] hover:bg-[#1872b8] rounded-xl shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Enroll & Start Track</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
