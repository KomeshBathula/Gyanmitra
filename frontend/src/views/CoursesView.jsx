import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Play,
  Clock,
  Award,
  Zap,
  BookOpen,
  Filter,
  Check,
  Building2,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CoursesView = () => {
  const { setCurrentScreen, showToast, t } = useApp();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedSubSector, setSelectedSubSector] = useState('all');
  const [sectorSearch, setSectorSearch] = useState('');
  const [subSectorSearch, setSubSectorSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  // Exact dataset matching iGOT Karmayogi "Explore all the contents" screenshot
  const allContents = [
    {
      id: 'cnt-1',
      title: 'Understanding Corporate Insolvency Resolution Process',
      code: 'IBC-CIRP-2024',
      type: 'Course',
      level: 'Intermediate',
      duration: '1h 10m',
      language: 'English',
      provider: 'Ministry of Communications- Department of Telecommunications',
      category: 'Course',
      sector: 'Information Technology',
      subSector: 'Administration',
      isNew: true,
      bannerBg: 'from-amber-900 via-slate-900 to-blue-950',
      bannerBadge: 'IBC 2016: Corporate Insolvency Resolution Process',
      karmaPoints: 120,
      description: 'An exhaustive regulatory guide covering CIRP processes, Committee of Creditors (CoC) voting thresholds, Resolution Professional obligations, and NCLT jurisprudence.',
      syllabus: [
        'Module 1: Overview of IBC 2016 & Legislative Intent',
        'Module 2: Admission of CIRP & Moratorium Provisions (Section 14)',
        'Module 3: CoC Constitution, Voting Rights & Resolution Plans',
        'Module 4: Liquidation Process & Priority Waterfall Mechanism'
      ]
    },
    {
      id: 'cnt-2',
      title: 'Central Civil Services (Conduct) Rules 1964',
      code: 'CCS-COND-1964',
      type: 'Course',
      level: 'Beginner',
      duration: '25m 17s',
      language: 'English',
      provider: 'National Academy of Defence Financial Management (NADFM)',
      category: 'Course',
      sector: 'Defence',
      subSector: 'Administration',
      isNew: true,
      bannerBg: 'from-blue-950 via-slate-900 to-indigo-950',
      bannerBadge: 'Central Civil Services (Conduct) Rules 1964',
      karmaPoints: 80,
      description: 'Essential orientation to CCS (Conduct) Rules 1964 governing public servants, integrity maintenance, political non-partisanship, and prevention of conflict of interest.',
      syllabus: [
        'Module 1: General Principles of Official Integrity (Rule 3)',
        'Module 2: Acceptance of Gifts, Hospitality & Awards (Rule 13)',
        'Module 3: Movable and Immovable Property Disclosures (Rule 18)',
        'Module 4: Disciplinary Action & Inquiries under CCA Rules'
      ]
    },
    {
      id: 'cnt-3',
      title: 'Introduction to Personalized Cheque Books in India Post',
      code: 'IP-CHQ-2024',
      type: 'Moderated Course',
      level: 'Beginner',
      duration: '32m 23s',
      language: 'English',
      provider: 'Department of Posts',
      category: 'Moderated Course',
      sector: 'Education',
      subSector: 'Data',
      isNew: true,
      bannerBg: 'from-rose-950 via-slate-900 to-amber-950',
      bannerBadge: 'Department of Posts, India: Personalized Cheque Books',
      karmaPoints: 90,
      description: 'Comprehensive operational manual for postal officers on issuing, personalizing, and validating MICR cheque books for Post Office Savings Bank (POSB) account holders.',
      syllabus: [
        'Module 1: POSB Account Regulations & Cheque Facility Eligibility',
        'Module 2: Finacle CBS Workflow for Cheque Book Requisition',
        'Module 3: CTS-2010 Clearing Standards & Safety Features',
        'Module 4: Stop Payment Protocol & Fraud Mitigation'
      ]
    },
    {
      id: 'cnt-4',
      title: 'Understanding the Defence Export Import Portal',
      code: 'DEF-EXIM-2024',
      type: 'Course',
      level: 'Beginner',
      duration: '1h 09m',
      language: 'English',
      provider: 'National Academy of Defence Production (NADP) Nagpur',
      category: 'Course',
      sector: 'Defence',
      subSector: 'Heavy Industry',
      isNew: true,
      bannerBg: 'from-cyan-950 via-slate-900 to-blue-950',
      bannerBadge: 'Defence Export Import Portal',
      karmaPoints: 110,
      description: 'Step-by-step user walkthrough of the Defence EXIM online portal facilitating authorisations, end-user certification, and SCOMET licensing under Make in India.',
      syllabus: [
        'Module 1: Defence Production & Export Policy Framework',
        'Module 2: Portal Registration & Digital Signature (DSC) Integration',
        'Module 3: Processing In-Principle Export Authorisations',
        'Module 4: End-User Certificate (EUC) Verification Workflows'
      ]
    },
    {
      id: 'cnt-5',
      title: 'MoSPI NSS 79th Round: Sampling Methodology & Field Guidelines',
      code: 'MOSPI-NSS79-2024',
      type: 'Course',
      level: 'Intermediate',
      duration: '2h 15m',
      language: 'English',
      provider: 'National Statistical Systems Training Academy (NSSTA) Greater Noida',
      category: 'Course',
      sector: 'Information Technology',
      subSector: 'Data',
      isNew: true,
      bannerBg: 'from-emerald-950 via-slate-900 to-teal-950',
      bannerBadge: 'MoSPI NSS 79th Round Sampling Methodology',
      karmaPoints: 200,
      description: 'Official NSSTA training module on multi-stage stratified sampling design, circular systematic household selection, and CAPI survey data collection.',
      syllabus: [
        'Module 1: NSS Sampling Frame: Census Villages & UFS Blocks',
        'Module 2: Household Listing, Stratification & Sub-Sample Selection',
        'Module 3: CAPI Digital Questionnaire Validation Rules',
        'Module 4: Multiplier Computation & Non-Sampling Error Adjustments'
      ]
    },
    {
      id: 'cnt-6',
      title: 'National Accounts Statistics: GDP & GVA Computation Framework',
      code: 'MOSPI-NAS-2024',
      type: 'Blended Program',
      level: 'Intermediate',
      duration: '3h 40m',
      language: 'English',
      provider: 'Ministry of Statistics & Programme Implementation (MoSPI)',
      category: 'Blended Program',
      sector: 'Information Technology',
      subSector: 'Data',
      isNew: true,
      bannerBg: 'from-indigo-950 via-slate-900 to-blue-950',
      bannerBadge: 'National Accounts Statistics: GDP & GVA Framework',
      karmaPoints: 250,
      description: 'Methodological framework for compiling Gross Domestic Product (GDP), Gross Value Added (GVA), and Gross Fixed Capital Formation (GFCF) based on SNA 2008 standards.',
      syllabus: [
        'Module 1: Production, Income & Expenditure Approaches to GDP',
        'Module 2: MCA-21 Corporate Database Integration in GVA',
        'Module 3: Price Indices & Constant Price Deflators (CPI, WPI)',
        'Module 4: Quarterly GDP Estimation & Advance Release Calendars'
      ]
    }
  ];

  // Filtering Logic
  const filteredContents = allContents.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedSector !== 'all' && item.sector !== selectedSector) return false;
    if (selectedSubSector !== 'all' && item.subSector !== selectedSubSector) return false;
    return true;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-16 text-slate-100 select-none">
      {/* 1. Left Filter Sidebar (Filter By) matching screenshot */}
      <div className="w-full lg:w-72 bg-[#0B1528] rounded-3xl border border-[#1E2E4A] p-5 space-y-6 flex-shrink-0 self-start shadow-xl">
        <h3 className="text-sm font-extrabold text-white tracking-wide border-b border-[#1E2E4A] pb-3">
          Filter By
        </h3>

        {/* Category Type */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-extrabold text-white">
            <span>Category Type</span>
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            {[
              { id: 'all', label: 'All Contents', count: '9159' },
              { id: 'Blended Program', label: 'Blended Program', count: '199' },
              { id: 'Moderated Course', label: 'Moderated Course', count: '47' },
              { id: 'Learning Pathway', label: 'Learning Pathway', count: '3' },
              { id: 'Course', label: 'Course', count: '5325' }
            ].map((cat) => (
              <label
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition-colors"
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'border-slate-600 bg-[#111F38]'
                  }`}
                >
                  {selectedCategory === cat.id && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="truncate">
                  {cat.label} ({cat.count})
                </span>
              </label>
            ))}
          </div>

          <button
            onClick={() => showToast("Showing all available Karmayogi categories", "info")}
            className="text-[11px] font-bold text-blue-400 hover:underline cursor-pointer"
          >
            See More
          </button>
        </div>

        {/* Sectors */}
        <div className="space-y-3 pt-2 border-t border-[#1E2E4A]">
          <h4 className="text-xs font-extrabold text-white">Sectors</h4>

          {/* Sector Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              value={sectorSearch}
              onChange={(e) => setSectorSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#080E1C] border border-[#1E2E4A] rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            {[
              { id: 'Education', label: 'Education', count: '3' },
              { id: 'Information Technology', label: 'Information Technology', count: '19' },
              { id: 'Defence', label: 'Defence', count: '2' },
              { id: 'Skill Development', label: 'Skill Development', count: '2' }
            ]
              .filter((s) => s.label.toLowerCase().includes(sectorSearch.toLowerCase()))
              .map((sec) => (
                <label
                  key={sec.id}
                  onClick={() => setSelectedSector(selectedSector === sec.id ? 'all' : sec.id)}
                  className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      selectedSector === sec.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'border-slate-600 bg-[#111F38]'
                    }`}
                  >
                    {selectedSector === sec.id && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate">
                    {sec.label} ({sec.count})
                  </span>
                </label>
              ))}
          </div>

          <button
            onClick={() => showToast("Showing all 34 Government Sectors", "info")}
            className="text-[11px] font-bold text-blue-400 hover:underline cursor-pointer"
          >
            See More
          </button>
        </div>

        {/* Sub Sectors */}
        <div className="space-y-3 pt-2 border-t border-[#1E2E4A]">
          <h4 className="text-xs font-extrabold text-white">Sub Sectors</h4>

          {/* Sub Sector Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              value={subSectorSearch}
              onChange={(e) => setSubSectorSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#080E1C] border border-[#1E2E4A] rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            {[
              { id: 'Data', label: 'Data', count: '3' },
              { id: 'Administration', label: 'Administration', count: '1' },
              { id: 'Heavy Industry', label: 'Heavy Industry', count: '1' }
            ]
              .filter((sub) => sub.label.toLowerCase().includes(subSectorSearch.toLowerCase()))
              .map((sub) => (
                <label
                  key={sub.id}
                  onClick={() => setSelectedSubSector(selectedSubSector === sub.id ? 'all' : sub.id)}
                  className="flex items-center space-x-2.5 cursor-pointer hover:text-white transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      selectedSubSector === sub.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'border-slate-600 bg-[#111F38]'
                    }`}
                  >
                    {selectedSubSector === sub.id && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate">
                    {sub.label} ({sub.count})
                  </span>
                </label>
              ))}
          </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 space-y-4">
        {/* Top Header & Sort Dropdown matching screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Explore all the contents
            </h1>
            <p className="text-xs font-bold text-slate-400 mt-0.5">
              Contents ({filteredContents.length > 0 ? '9159' : '0'})
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative self-end sm:self-auto">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="px-4 py-2 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] hover:border-blue-500 text-xs font-bold text-slate-200 flex items-center space-x-2 shadow-sm cursor-pointer"
            >
              <span className="text-slate-400">Sort By:</span>
              <span className="text-blue-400">
                {sortBy === 'newest' ? 'Recently Added (Newest)' : sortBy === 'popular' ? 'Most Popular' : 'A - Z'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsSortOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-52 bg-[#111F38] rounded-2xl shadow-2xl border border-[#1E2E4A] py-1.5 z-40">
                  {[
                    { id: 'newest', label: 'Recently Added (Newest)' },
                    { id: 'popular', label: 'Most Popular' },
                    { id: 'az', label: 'Alphabetical (A - Z)' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSortBy(s.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#162544] flex items-center justify-between cursor-pointer ${
                        sortBy === s.id ? 'text-blue-400 font-bold bg-[#162544]' : 'text-slate-300'
                      }`}
                    >
                      <span>{s.label}</span>
                      {sortBy === s.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Wide Horizontal Course List Cards matching screenshot */}
        <div className="space-y-4 pt-2">
          {filteredContents.map((course) => (
            <div
              key={course.id}
              onClick={() => setActiveCourseModal(course)}
              className="bg-[#0B1528] rounded-3xl border border-[#1E2E4A] p-4 hover:border-blue-500 hover:shadow-2xl transition-all duration-200 flex flex-col md:flex-row items-start md:items-center gap-5 cursor-pointer group"
            >
              {/* Left Banner Thumbnail Art */}
              <div
                className={`w-full md:w-56 h-32 rounded-2xl bg-gradient-to-br ${course.bannerBg} p-3 flex flex-col justify-between flex-shrink-0 relative overflow-hidden shadow-md border border-[#1E2E4A]`}
              >
                {/* Red "New" Pill on Top Left */}
                {course.isNew && (
                  <span className="self-start px-2 py-0.5 rounded text-[10px] font-black bg-[#E11D48] text-white uppercase tracking-wider shadow-sm">
                    New
                  </span>
                )}

                {/* Banner Graphic Title */}
                <div className="z-10">
                  <span className="text-xs font-black text-white leading-tight line-clamp-2 drop-shadow-md">
                    {course.bannerBadge}
                  </span>
                </div>

                {/* Bottom Language & Duration Strip */}
                <div className="flex items-center justify-between z-10 text-[10px] font-bold text-slate-200">
                  <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs">
                    {course.language}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs font-mono">
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Right Course Info Content */}
              <div className="flex-1 space-y-2 min-w-0">
                {/* Top Badge Tags: Course Type & Difficulty */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center space-x-1">
                    <Play className="w-2.5 h-2.5 fill-amber-400" />
                    <span>{course.type}</span>
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center space-x-1 ${
                      course.level === 'Beginner'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50'
                        : course.level === 'Intermediate'
                        ? 'bg-blue-950/80 text-blue-300 border border-blue-600/50'
                        : 'bg-purple-950/80 text-purple-300 border border-purple-600/50'
                    }`}
                  >
                    <span>▲</span>
                    <span>{course.level}</span>
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug group-hover:text-blue-300 transition-colors line-clamp-2">
                  {course.title}
                </h3>

                {/* Provider Organization with Icon */}
                <div className="flex items-center space-x-2 text-xs text-slate-400 pt-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span className="truncate">{course.provider}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Detail / Syllabus Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0B1528] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#1E2E4A] space-y-0 animate-in zoom-in-95 text-slate-200">
            {/* Modal Header */}
            <div className="bg-[#111F38] p-6 border-b border-[#1E2E4A] relative">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#162544] hover:bg-[#1E335A] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
              <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-2">
                <span>{activeCourseModal.type}</span>
                <span>•</span>
                <span>{activeCourseModal.level}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                {activeCourseModal.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{activeCourseModal.provider}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto bg-[#080E1C]">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeCourseModal.description}
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#111F38] p-3 rounded-2xl border border-[#1E2E4A] text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Duration</span>
                  <span className="text-xs font-bold text-white">{activeCourseModal.duration}</span>
                </div>
                <div className="bg-[#111F38] p-3 rounded-2xl border border-[#1E2E4A] text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Reward</span>
                  <span className="text-xs font-bold text-amber-400 flex items-center justify-center">
                    <Zap className="w-3 h-3 mr-0.5 fill-amber-400" />
                    +{activeCourseModal.karmaPoints} Pts
                  </span>
                </div>
                <div className="bg-[#111F38] p-3 rounded-2xl border border-[#1E2E4A] text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Language</span>
                  <span className="text-xs font-bold text-blue-400">{activeCourseModal.language}</span>
                </div>
              </div>

              {/* Syllabus Modules */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Curriculum & Learning Modules:</span>
                </h4>
                <div className="space-y-2">
                  {activeCourseModal.syllabus?.map((mod, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#111F38] rounded-2xl border border-[#1E2E4A] text-xs text-slate-200 flex items-center space-x-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-[11px] flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-semibold">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-[#111F38] border-t border-[#1E2E4A] flex items-center justify-between">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveCourseModal(null);
                  showToast(`Enrolled in ${activeCourseModal.title}`, "success");
                  setCurrentScreen('learning-path');
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-lg transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Learning Module</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
