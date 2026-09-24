import React, { useState, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Play,
  Clock,
  Award,
  BookOpen,
  Filter,
  Check,
  Building2,
  Layers,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

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
  const [coursesList, setCoursesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch courses dynamically from backend Express API
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    api.getCourses({
      category: selectedCategory,
      sector: selectedSector,
      subSector: selectedSubSector,
      sortBy
    }).then(res => {
      if (isMounted && res?.data) {
        setCoursesList(res.data);
      }
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, selectedSector, selectedSubSector, sortBy]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 pb-16 text-[#1F2933] select-none">
      {/* 1. Left Filter Sidebar (Filter By) */}
      <div className="w-full lg:w-72 bg-white rounded border border-[#D5DCE3] p-5 space-y-6 flex-shrink-0 self-start">
        <h3 className="text-sm font-extrabold text-[#1F2933] tracking-wide border-b border-[#D5DCE3] pb-3">
          Filter By
        </h3>

        {/* Category Type */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-extrabold text-[#1F2933]">
            <span>Category Type</span>
            <ChevronUp className="w-4 h-4 text-[#5B6773]" />
          </div>

          <div className="space-y-2 text-xs text-[#5B6773]">
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
                className="flex items-center space-x-2.5 cursor-pointer hover:text-[#1F2933] transition-colors"
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#0B3A63] border-[#0B3A63] text-white'
                      : 'border-[#D5DCE3] bg-white'
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
            className="text-[11px] font-bold text-[#0B3A63] hover:underline cursor-pointer"
          >
            See More
          </button>
        </div>

        {/* Sectors */}
        <div className="space-y-3 pt-2 border-t border-[#D5DCE3]">
          <h4 className="text-xs font-extrabold text-[#1F2933]">Sectors</h4>

          {/* Sector Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#5B6773] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              value={sectorSearch}
              onChange={(e) => setSectorSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7F9] border border-[#D5DCE3] rounded text-[#1F2933] placeholder-[#5B6773] focus:outline-none focus:ring-1 focus:ring-[#0B3A63]"
            />
          </div>

          <div className="space-y-2 text-xs text-[#5B6773]">
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
                  className="flex items-center space-x-2.5 cursor-pointer hover:text-[#1F2933] transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      selectedSector === sec.id
                        ? 'bg-[#0B3A63] border-[#0B3A63] text-white'
                        : 'border-[#D5DCE3] bg-white'
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
            className="text-[11px] font-bold text-[#0B3A63] hover:underline cursor-pointer"
          >
            See More
          </button>
        </div>

        {/* Sub Sectors */}
        <div className="space-y-3 pt-2 border-t border-[#D5DCE3]">
          <h4 className="text-xs font-extrabold text-[#1F2933]">Sub Sectors</h4>

          {/* Sub Sector Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#5B6773] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              value={subSectorSearch}
              onChange={(e) => setSubSectorSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F7F9] border border-[#D5DCE3] rounded text-[#1F2933] placeholder-[#5B6773] focus:outline-none focus:ring-1 focus:ring-[#0B3A63]"
            />
          </div>

          <div className="space-y-2 text-xs text-[#5B6773]">
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
                  className="flex items-center space-x-2.5 cursor-pointer hover:text-[#1F2933] transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      selectedSubSector === sub.id
                        ? 'bg-[#0B3A63] border-[#0B3A63] text-white'
                        : 'border-[#D5DCE3] bg-white'
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
        {/* Top Header & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#1F2933] tracking-tight">
              Explore all the contents
            </h1>
            <p className="text-xs font-bold text-[#5B6773] mt-0.5">
              Contents ({coursesList.length > 0 ? '9159' : '0'})
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative self-end sm:self-auto">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="px-4 py-2 rounded bg-white border border-[#D5DCE3] hover:border-[#0B3A63] text-xs font-bold text-[#1F2933] flex items-center space-x-2 cursor-pointer"
            >
              <span className="text-[#5B6773]">Sort By:</span>
              <span className="text-[#0B3A63]">
                {sortBy === 'newest' ? 'Recently Added (Newest)' : sortBy === 'popular' ? 'Most Popular' : 'A - Z'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5B6773]" />
            </button>

            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsSortOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-52 bg-white rounded border border-[#D5DCE3] py-1.5 z-40 shadow-sm">
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
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#EEF2F5] flex items-center justify-between cursor-pointer ${
                        sortBy === s.id ? 'text-[#0B3A63] font-bold bg-[#EEF2F5]' : 'text-[#1F2933]'
                      }`}
                    >
                      <span>{s.label}</span>
                      {sortBy === s.id && <Check className="w-3.5 h-3.5 text-[#0B3A63]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="py-8 flex items-center justify-center space-x-2 text-[#0B3A63] text-xs font-bold">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading verified Karmayogi contents...</span>
          </div>
        )}

        {/* Wide Horizontal Course List Cards */}
        <div className="space-y-4 pt-2">
          {coursesList.map((course) => (
            <div
              key={course.id}
              onClick={() => setActiveCourseModal(course)}
              className="bg-white rounded border border-[#D5DCE3] p-4 hover:border-[#0B3A63] hover:shadow-sm transition-all duration-200 flex flex-col md:flex-row items-start md:items-center gap-5 cursor-pointer group"
            >
              {/* Left Banner Thumbnail Art */}
              <div
                className="w-full md:w-56 h-32 rounded bg-[#EEF2F5] border border-[#D5DCE3] p-3 flex flex-col justify-between flex-shrink-0 relative overflow-hidden"
              >
                {/* "New" Pill on Top Left */}
                {course.isNew && (
                  <span className="self-start px-2 py-0.5 rounded text-[10px] font-black bg-[#E11D48] text-white uppercase tracking-wider">
                    New
                  </span>
                )}

                {/* Banner Graphic Title */}
                <div className="z-10">
                  <span className="text-xs font-black text-[#1F2933] leading-tight line-clamp-2">
                    {course.bannerBadge || course.title}
                  </span>
                </div>

                {/* Bottom Language & Duration Strip */}
                <div className="flex items-center justify-between z-10 text-[10px] font-bold text-[#5B6773]">
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#D5DCE3]">
                    {course.language || 'English'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#D5DCE3] font-mono">
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Right Course Info Content */}
              <div className="flex-1 space-y-2 min-w-0">
                {/* Top Badge Tags: Course Type & Difficulty */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black border border-[#D5DCE3] text-[#5B6773] flex items-center space-x-1">
                      <Play className="w-2.5 h-2.5 fill-[#5B6773]" />
                      <span>{course.type}</span>
                    </span>

                    {(course.providerType === 'NSSTA' || (course.provider || '').includes('NSSTA')) && (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold border border-[#D5DCE3] text-[#0B3A63]">
                        NSSTA TPAC Recommended
                      </span>
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1 border border-[#D5DCE3] ${
                      course.level === 'Beginner'
                        ? 'text-[#0B3A63]'
                        : course.level === 'Intermediate'
                        ? 'text-[#5B6773]'
                        : 'text-[#1F2933]'
                    }`}
                  >
                    <span>▲</span>
                    <span>{course.level}</span>
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-sm sm:text-base font-extrabold text-[#1F2933] leading-snug group-hover:text-[#0B3A63] transition-colors line-clamp-2">
                  {course.title}
                </h3>

                {/* Provider Organization with Icon */}
                <div className="flex items-center space-x-2 text-xs text-[#5B6773] pt-1">
                  <Building2 className="w-3.5 h-3.5 text-[#5B6773] flex-shrink-0" />
                  <span className="truncate">{course.provider}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Detail / Syllabus Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded max-w-xl w-full overflow-hidden border border-[#D5DCE3] space-y-0 animate-in zoom-in-95 text-[#1F2933]">
            {/* Modal Header */}
            <div className="bg-[#F5F7F9] p-6 border-b border-[#D5DCE3] relative">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded bg-white hover:bg-[#EEF2F5] text-[#5B6773] hover:text-[#1F2933] flex items-center justify-center transition-colors cursor-pointer text-sm font-bold border border-[#D5DCE3]"
              >
                ✕
              </button>
              <div className="flex items-center space-x-2 text-xs text-[#0B3A63] font-bold uppercase tracking-wider mb-2">
                <span>{activeCourseModal.type}</span>
                <span>•</span>
                <span>{activeCourseModal.level}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#1F2933] tracking-tight leading-snug">
                {activeCourseModal.title}
              </h3>
              <p className="text-xs text-[#5B6773] mt-1">{activeCourseModal.provider}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto bg-white">
              <p className="text-xs sm:text-sm text-[#5B6773] leading-relaxed">
                {activeCourseModal.description}
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#F5F7F9] p-3 rounded border border-[#D5DCE3] text-center">
                  <span className="text-[10px] text-[#5B6773] uppercase font-bold block">Duration</span>
                  <span className="text-xs font-bold text-[#1F2933]">{activeCourseModal.duration}</span>
                </div>
                <div className="bg-[#F5F7F9] p-3 rounded border border-[#D5DCE3] text-center">
                  <span className="text-[10px] text-[#5B6773] uppercase font-bold block">Reward</span>
                  <span className="text-xs font-bold text-[#0B3A63] flex items-center justify-center">
                    <Award className="w-3.5 h-3.5 mr-0.5 text-[#0B3A63]" />
                    +{activeCourseModal.karmaPoints || 100} Pts
                  </span>
                </div>
                <div className="bg-[#F5F7F9] p-3 rounded border border-[#D5DCE3] text-center">
                  <span className="text-[10px] text-[#5B6773] uppercase font-bold block">Language</span>
                  <span className="text-xs font-bold text-[#0B3A63]">{activeCourseModal.language || 'English'}</span>
                </div>
              </div>

              {/* Syllabus Modules */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-[#0B3A63]" />
                  <span>Curriculum & Learning Modules:</span>
                </h4>
                <div className="space-y-2">
                  {activeCourseModal.syllabus?.map((mod, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F5F7F9] rounded border border-[#D5DCE3] text-xs text-[#1F2933] flex items-center space-x-3"
                    >
                      <span className="w-6 h-6 rounded bg-[#0B3A63] text-white font-black text-[11px] flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-semibold">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-[#F5F7F9] border-t border-[#D5DCE3] flex items-center justify-between">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 text-xs font-bold text-[#5B6773] hover:text-[#1F2933] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={async () => {
                  const course = activeCourseModal;
                  setActiveCourseModal(null);
                  await api.enrollCourse({
                    courseId: course.id,
                    title: course.title,
                    provider: course.provider,
                    duration: course.duration,
                    level: course.level
                  });
                  showToast(`Enrolled in ${course.title}`, "success");
                  setCurrentScreen('learning-path');
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#0B3A63] hover:bg-[#0d4a7a] rounded transition-all cursor-pointer flex items-center space-x-1.5"
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
