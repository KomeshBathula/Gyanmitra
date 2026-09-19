import React, { useState, useEffect, useMemo } from 'react';
import {
  Play,
  Clock,
  Building2,
  BookOpen,
  CheckCircle2,
  Calendar,
  Award,
  Loader2,
  Compass,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  MY_LEARNING_INPROGRESS,
  MY_LEARNING_COMPLETED,
  MY_LEARNING_UNENROLLED,
  COURSES_CATALOG
} from '../data/mockData';

export const LearningPathView = () => {
  const {
    setCurrentScreen,
    showToast,
    startCourseQuiz,
    targetModuleForReview,
    setTargetModuleForReview,
    learningPathFilter,
    setLearningPathFilter
  } = useApp();
  const [activeTab, setActiveTab] = useState('contents'); // 'contents', 'events'
  const [activePill, setActivePill] = useState('inprogress'); // 'inprogress', 'completed', 'unenrolled'
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  const [inprogressList, setInprogressList] = useState(MY_LEARNING_INPROGRESS);
  const [completedList, setCompletedList] = useState(MY_LEARNING_COMPLETED);
  const [unenrolledList, setUnenrolledList] = useState(MY_LEARNING_UNENROLLED);
  const [isLoading, setIsLoading] = useState(false);

  // Load My Learning datasets from backend Express API with fallback
  const loadMyLearningData = () => {
    setIsLoading(true);
    api.getMyLearning('', {
      inprogress: MY_LEARNING_INPROGRESS,
      completed: MY_LEARNING_COMPLETED,
      unenrolled: MY_LEARNING_UNENROLLED
    }).then(res => {
      const inprog = res?.inprogress || res?.data?.inprogress;
      const compl = res?.completed || res?.data?.completed;
      const unenr = res?.unenrolled || res?.data?.unenrolled;
      if (inprog && inprog.length > 0) setInprogressList(inprog);
      if (compl && compl.length > 0) setCompletedList(compl);
      if (unenr && unenr.length > 0) setUnenrolledList(unenr);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadMyLearningData();
  }, []);

  // Handle auto-opening module review if requested from quiz results
  useEffect(() => {
    if (targetModuleForReview) {
      const allCourses = [...inprogressList, ...completedList];
      const target = allCourses.find(
        c => c.id === targetModuleForReview.courseId || c.title?.includes(targetModuleForReview.courseId)
      );
      if (target) {
        setActiveCourseModal(target);
        if (target.progress >= 100) {
          setActivePill('completed');
        } else {
          setActivePill('inprogress');
        }
      }
      setTargetModuleForReview(null);
    }
  }, [targetModuleForReview, inprogressList, completedList]);

  // When a learning path filter is active (e.g. from Skill Gap Matrix),
  // select 2 to 3 curated, highly relevant courses matching the domain / competency.
  const filteredCourses = useMemo(() => {
    if (!learningPathFilter) return null;

    const filterComp = (learningPathFilter.competency || '').toLowerCase();
    const filterDomain = (learningPathFilter.domain || '').toLowerCase();
    const filterGapId = (learningPathFilter.gapId || '').toLowerCase();

    // Pool all courses from catalog and my-learning lists
    const allPool = [
      ...COURSES_CATALOG.map(c => ({
        ...c,
        courseId: c.code || c.id,
        level: c.difficulty ? c.difficulty.split(' ')[0] : (c.level || 'Intermediate'),
        type: c.type || 'Course',
        progress: c.progress ?? 25,
        status: 'inprogress',
        bgGradient: c.bgGradient || 'from-blue-900 via-slate-900 to-indigo-950',
        thumbnailText: c.title,
        thumbnailSub: c.provider,
        poolSource: 'catalog'
      })),
      ...inprogressList.map(c => ({ ...c, poolSource: 'inprogress' })),
      ...completedList.map(c => ({ ...c, poolSource: 'completed' })),
      ...unenrolledList.map(c => ({ ...c, poolSource: 'unenrolled' }))
    ];

    // Score relevance
    const scored = allPool.map(c => {
      let score = 0;
      const cComp = (c.competency || '').toLowerCase();
      const cCat = (c.category || '').toLowerCase();
      const cTitle = (c.title || '').toLowerCase();
      const cDesc = (c.description || '').toLowerCase();
      const cGapId = (c.gapId || '').toLowerCase();

      // Direct gapId match
      if (filterGapId && cGapId === filterGapId) score += 100;

      // Direct competency match
      if (filterComp && (cComp.includes(filterComp) || filterComp.includes(cComp))) score += 80;

      // Domain/category match
      if (filterDomain && (cCat.includes(filterDomain) || filterDomain.includes(cCat))) score += 40;

      // Keyword overlaps
      const keywords = [...filterComp.split(/[\s,()&-]+/), ...filterDomain.split(/[\s,()&-]+/)]
        .filter(w => w.length > 3 && !['post', 'office', 'india', 'operations'].includes(w));

      for (const kw of keywords) {
        if (cComp.includes(kw)) score += 30;
        if (cTitle.includes(kw)) score += 25;
        if (cDesc.includes(kw)) score += 15;
        if (cCat.includes(kw)) score += 20;
      }

      // Domain specific boosts
      if (filterComp.includes('posb') || filterDomain.includes('financial')) {
        if (cTitle.includes('posb') || cTitle.includes('ippb') || cTitle.includes('finacle') || cTitle.includes('savings')) score += 60;
      }
      if (filterComp.includes('dnk') || filterDomain.includes('postal') || filterComp.includes('parcel')) {
        if (cTitle.includes('dnk') || cTitle.includes('parcel') || cTitle.includes('darpan') || cTitle.includes('export')) score += 60;
      }
      if (filterComp.includes('cpgrams') || filterDomain.includes('governance') || filterComp.includes('customer')) {
        if (cTitle.includes('crm') || cTitle.includes('cpgrams') || cTitle.includes('customer') || cTitle.includes('karmayogi')) score += 60;
      }
      if (filterComp.includes('2023') || filterDomain.includes('ethics') || filterComp.includes('compliance')) {
        if (cTitle.includes('2023') || cTitle.includes('ethics') || cTitle.includes('vigilance') || cTitle.includes('statutory')) score += 60;
      }

      return { course: c, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const seen = new Set();
    const result = [];
    for (const item of scored) {
      const normalized = item.course.title.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!seen.has(normalized) && item.score > 20) {
        seen.add(normalized);
        result.push(item.course);
      }
      if (result.length === 3) break;
    }

    return result.length > 0 ? result : null;
  }, [learningPathFilter, inprogressList, completedList, unenrolledList]);

  const currentList =
    learningPathFilter && filteredCourses && filteredCourses.length > 0
      ? filteredCourses
      : activePill === 'inprogress'
      ? inprogressList
      : activePill === 'completed'
      ? completedList
      : unenrolledList;

  return (
    <div className="space-y-6 pb-16 text-slate-100 select-none">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          My Learning
        </h1>
      </div>

      {/* Focused Learning Pathway Banner (when activated from Skill Gap matrix) */}
      {learningPathFilter && (
        <div className="bg-gradient-to-r from-[#0F2243] via-[#162D55] to-[#1A3660] border border-blue-500/50 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-[#FFA730] flex-shrink-0 mt-0.5">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    Focused Skill Pathway
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
                    Domain: {learningPathFilter.domain || 'Competency Gap'}
                  </span>
                  {learningPathFilter.targetLevel && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                      Target Level {learningPathFilter.targetLevel}
                    </span>
                  )}
                </div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  {learningPathFilter.competency}
                </h2>
                <p className="text-xs text-slate-300">
                  Showing <strong>{filteredCourses?.length || 3} curated courses</strong> specifically recommended to bridge your cadre competency gap.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setLearningPathFilter(null);
                showToast("Showing all standard courses", "info");
              }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-600/60 shadow-sm transition-all cursor-pointer self-start sm:self-center whitespace-nowrap"
            >
              <X className="w-4 h-4 text-slate-400" />
              <span>Show All Courses</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Tabs: Contents | Events */}
      <div className="flex items-center space-x-8 border-b border-[#1E2E4A] pb-0 text-sm font-bold">
        <button
          onClick={() => setActiveTab('contents')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'contents'
              ? 'border-blue-500 text-blue-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Contents
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'events'
              ? 'border-blue-500 text-blue-400 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Events
        </button>
      </div>

      {/* Sub-Pills: In Progress | Completed | Unenrolled */}
      {activeTab === 'contents' && (
        <div className="flex items-center justify-between pt-1">
          {learningPathFilter ? (
            <div className="flex items-center space-x-3">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#1D4ED8] text-white shadow-md flex items-center space-x-1.5">
                <span>Targeted Domain Courses ({filteredCourses?.length || 0})</span>
              </span>
              <button
                onClick={() => setLearningPathFilter(null)}
                className="text-xs text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
              >
                Reset to All Enrolled Courses
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActivePill('inprogress')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePill === 'inprogress'
                    ? 'bg-[#1D4ED8] text-white shadow-md'
                    : 'bg-[#162544] text-slate-300 hover:text-white hover:bg-[#1E335A]'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setActivePill('completed')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePill === 'completed'
                    ? 'bg-[#1D4ED8] text-white shadow-md'
                    : 'bg-[#162544] text-slate-300 hover:text-white hover:bg-[#1E335A]'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActivePill('unenrolled')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activePill === 'unenrolled'
                    ? 'bg-[#1D4ED8] text-white shadow-md'
                    : 'bg-[#162544] text-slate-300 hover:text-white hover:bg-[#1E335A]'
                }`}
              >
                Unenrolled
              </button>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="py-8 flex items-center justify-center space-x-2 text-blue-400 text-xs font-bold">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Syncing My Learning records...</span>
        </div>
      )}

      {/* Main Content Area */}
      {activeTab === 'contents' ? (
        currentList.length === 0 ? (
          <div className="bg-[#0B1528] rounded-3xl border border-[#1E2E4A] p-12 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No courses in this section yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Explore the courses catalog or MoSPI marketplace to enroll in new competency training programs.
            </p>
            <button
              onClick={() => setCurrentScreen('courses')}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Browse Course Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {currentList.map((course) => (
            <div
              key={course.id}
              className="bg-[#0E1A2E] rounded-2xl border border-[#1E335A] hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-950/40 transition-all duration-200 flex flex-col justify-between group overflow-hidden"
            >
              {/* Top Card Body */}
              <div className="p-5 space-y-3.5">
                {/* Top Badges Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 flex items-center space-x-1.5">
                    <Play className="w-2.5 h-2.5 fill-amber-300" />
                    <span>{course.type || 'Course'}</span>
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold flex items-center space-x-1 ${
                      course.level === 'Beginner'
                        ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-600/40'
                        : course.level === 'Intermediate'
                        ? 'bg-blue-950/70 text-blue-300 border border-blue-600/40'
                        : 'bg-indigo-950/70 text-indigo-300 border border-indigo-600/40'
                    }`}
                  >
                    <span>▲</span>
                    <span>{course.level}</span>
                  </span>
                </div>

                {/* Course Graphic & Info Layout */}
                <div className="flex items-start gap-4">
                  {/* Thumbnail with overlay duration & optional Retired Ribbon */}
                  <div className="relative w-28 h-20 sm:w-32 sm:h-22 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-900/90 via-slate-900 to-[#0A1628] border border-blue-500/30 shadow-md flex flex-col justify-between p-2">
                    {course.isRetired && (
                      <div className="absolute top-0 left-0 bg-red-600 text-white text-[8px] font-black px-3 py-0.5 -rotate-45 -translate-x-3 translate-y-1 shadow-md uppercase tracking-wider z-20">
                        Retired
                      </div>
                    )}

                    <div className={`absolute inset-0 bg-gradient-to-br ${course.bgGradient || 'from-blue-900 to-slate-950'} opacity-85`} />

                    <div className="relative z-10 text-[10px] font-bold text-white leading-tight line-clamp-2 drop-shadow">
                      {course.thumbnailText || course.title}
                    </div>

                    {/* Duration Badge */}
                    <div className="relative z-10 self-end px-1.5 py-0.5 bg-black/75 backdrop-blur-xs rounded text-[9px] font-mono text-slate-200 flex items-center space-x-1 border border-white/10">
                      <Clock className="w-2.5 h-2.5 text-amber-400" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Title and Provider */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h3
                      onClick={() => setActiveCourseModal(course)}
                      className="text-sm font-bold text-white leading-snug line-clamp-2 hover:text-blue-300 cursor-pointer transition-colors"
                      title={course.title}
                    >
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 truncate flex items-center space-x-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span className="truncate">By {course.provider}</span>
                    </p>
                    {(course.provider || '').includes('NSSTA') && (
                      <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-blue-950/80 text-blue-300 border border-blue-600/40">
                        NSSTA TPAC Recommended
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Progress Bar & CTA Footer */}
              <div className="px-5 py-3.5 bg-[#0B1528]/80 border-t border-[#1E335A]/80">
                {(activePill === 'inprogress' || Boolean(learningPathFilter)) ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5 text-slate-300 font-bold">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{course.progress}% Completed</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {course.progress < 100 ? `${100 - course.progress}% to certification` : 'Assessment Ready'}
                      </span>
                    </div>

                    <div className="w-full bg-[#162544] h-2 rounded-full overflow-hidden border border-slate-700/40 p-0.5">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <div className="pt-0.5">
                      {course.progress >= 100 ? (
                        <button
                          onClick={() => startCourseQuiz(course)}
                          className="w-full py-2 px-3 rounded-xl bg-[#1B365D] hover:bg-[#254A80] border border-blue-500/40 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                          <span>Take Assessment</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveCourseModal(course)}
                          className="w-full py-2 px-3 rounded-xl bg-[#15284F] hover:bg-[#1D3A74] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1.5 border border-[#1E3A6D] cursor-pointer"
                        >
                          <span>{course.progress > 0 ? 'Resume Course' : 'Start Course'}</span>
                          <Play className="w-3 h-3 fill-white ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : activePill === 'completed' ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>100% Completed</span>
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                        MoSPI Cadre Certified
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        onClick={() => startCourseQuiz(course)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#1B365D] hover:bg-[#254A80] border border-blue-500/40 text-white text-xs font-bold shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer transition-all whitespace-nowrap"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                        <span>Take Assessment</span>
                      </button>
                      <button
                        onClick={() => setActiveCourseModal(course)}
                        className="py-2 px-4 rounded-xl bg-[#162544] hover:bg-[#1E335A] text-slate-200 text-xs font-semibold cursor-pointer border border-[#1E3A6D]/60 transition-colors whitespace-nowrap"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-xs text-slate-400 flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>Available on iGOT</span>
                    </span>
                    <button
                      onClick={async () => {
                        await api.enrollCourse({
                          title: course.title,
                          provider: course.provider,
                          duration: course.duration,
                          level: course.level
                        });
                        showToast(`Enrolled in ${course.title}`, "success");
                        setActivePill('inprogress');
                        loadMyLearningData();
                      }}
                      className="py-2 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-all shadow-md"
                    >
                      Enroll Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        )
      ) : (
        /* Events View */
        <div className="bg-[#0B1528] rounded-3xl border border-[#1E2E4A] p-8 text-center space-y-4">
          <Calendar className="w-12 h-12 text-blue-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Upcoming MoSPI & DoPT Live Events</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Interactive webinars, workshops, and cohort sessions scheduled for Karmayogi learners.
          </p>
          <div className="pt-2">
            <button
              onClick={() => showToast("Subscribed to live session notifications", "success")}
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg cursor-pointer"
            >
              Browse Event Calendar
            </button>
          </div>
        </div>
      )}

      {/* Course Video Player & Learning Syllabus Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0B1528] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#1E2E4A] space-y-0 animate-in zoom-in-95 text-slate-200">
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
                {activeCourseModal.isRetired && (
                  <span className="px-2 py-0.5 rounded bg-rose-900/80 text-rose-300 border border-rose-600/50 text-[10px]">
                    Retired Course
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                {activeCourseModal.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Provided by {activeCourseModal.provider}</p>
            </div>

            {/* Video Player Simulation Banner */}
            <div className="p-6 bg-[#080E1C] space-y-5 max-h-[65vh] overflow-y-auto">
              {/* Interactive Player Card */}
              <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 text-center relative overflow-hidden shadow-inner">
                <div className={`absolute inset-0 bg-gradient-to-br ${activeCourseModal.bgGradient || 'from-slate-800 to-slate-950'} opacity-40`} />
                <div className="relative z-10 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center mx-auto shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  <p className="text-xs font-bold text-white">
                    {activeCourseModal.progress >= 100
                      ? 'Course 100% Completed! All modules mastered.'
                      : activeCourseModal.progress > 0
                      ? `Continue from ${activeCourseModal.progress}% completion mark`
                      : 'Begin interactive e-learning module'}
                  </p>
                  <p className="text-[11px] text-slate-400">Total runtime: {activeCourseModal.duration}</p>
                </div>
              </div>

              {/* Department Admin Quiz Status Banner */}
              {activeCourseModal.progress >= 100 ? (
                <div className="p-4 rounded-2xl bg-[#111F38] border border-blue-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/60 text-blue-200 border border-blue-400/40 flex items-center space-x-1.5">
                      <Award className="w-3 h-3 text-amber-300" />
                      <span>Cadre Certification Assessment Available</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">100% Completed</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Your Department Admin has published a certification quiz specifically for your cadre role. Completing this quiz in full-screen mode will validate your competencies and generate targeted module recommendations.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-[#111F38] border border-[#1E2E4A] flex items-center space-x-3 text-xs text-slate-400">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0 font-bold">
                    🔒
                  </div>
                  <div>
                    <p className="font-bold text-slate-300">Department Admin Assessment Quiz Locked</p>
                    <p className="text-[11px] text-slate-400">
                      Complete all syllabus modules ({activeCourseModal.progress}% / 100%) to unlock the official assessment quiz.
                    </p>
                  </div>
                </div>
              )}

              {/* Syllabus Module List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Curriculum & Progress Checklist:</span>
                </h4>
                <div className="space-y-2">
                  {activeCourseModal.syllabus?.map((mod, idx) => {
                    const isPassed = (idx + 1) * 25 <= activeCourseModal.progress;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border text-xs flex items-center justify-between transition-all ${
                          isPassed
                            ? 'bg-[#0E2A1E] border-emerald-800/60 text-emerald-200'
                            : 'bg-[#111F38] border-[#1E2E4A] text-slate-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span
                            className={`w-6 h-6 rounded-full font-black text-[11px] flex items-center justify-center flex-shrink-0 ${
                              isPassed ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                            }`}
                          >
                            {isPassed ? '✓' : idx + 1}
                          </span>
                          <span className="font-semibold">{mod}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 ml-2">
                          {isPassed ? 'Completed' : 'Upcoming'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-[#111F38] border-t border-[#1E2E4A] flex items-center justify-between">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <div className="flex items-center space-x-2">
                {activeCourseModal.progress >= 100 ? (
                  <button
                    onClick={() => {
                      const selectedCourse = activeCourseModal;
                      setActiveCourseModal(null);
                      startCourseQuiz(selectedCourse);
                    }}
                    className="px-5 py-2 text-xs font-bold text-white bg-[#1B365D] hover:bg-[#254A80] border border-blue-400/40 rounded-2xl shadow-xl transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                    <span>Take Assessment (Full-Screen)</span>
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      const newProgress = Math.min(100, activeCourseModal.progress + 25);
                      await api.updateCourseProgress(activeCourseModal.id, newProgress);
                      setActiveCourseModal(prev => ({ ...prev, progress: newProgress }));
                      showToast(
                        newProgress >= 100
                          ? `🎉 Course completed 100%! Department Admin Quiz is now unlocked.`
                          : `Updated progress for ${activeCourseModal.title} to ${newProgress}%`,
                        "success"
                      );
                      loadMyLearningData();
                    }}
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-lg transition-all cursor-pointer flex items-center space-x-1"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Play Module (+25% Progress)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
