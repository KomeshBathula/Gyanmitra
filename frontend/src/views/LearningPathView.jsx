import React, { useState, useEffect } from 'react';
import {
  Play,
  Clock,
  Building2,
  BookOpen,
  CheckCircle2,
  Calendar,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const LearningPathView = () => {
  const { setCurrentScreen, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('contents'); // 'contents', 'events'
  const [activePill, setActivePill] = useState('inprogress'); // 'inprogress', 'completed', 'unenrolled'
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  const [inprogressList, setInprogressList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [unenrolledList, setUnenrolledList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load My Learning datasets from backend Express API
  const loadMyLearningData = () => {
    setIsLoading(true);
    api.getMyLearning().then(res => {
      if (res?.inprogress) setInprogressList(res.inprogress);
      if (res?.completed) setCompletedList(res.completed);
      if (res?.unenrolled) setUnenrolledList(res.unenrolled);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadMyLearningData();
  }, []);

  const currentList =
    activePill === 'inprogress'
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
        <div className="flex items-center space-x-3 pt-1">
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

      {/* Loading State */}
      {isLoading && (
        <div className="py-8 flex items-center justify-center space-x-2 text-blue-400 text-xs font-bold">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Syncing My Learning records...</span>
        </div>
      )}

      {/* Main Content Area */}
      {activeTab === 'contents' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {currentList.map((course) => (
            <div
              key={course.id}
              className="bg-[#0B1528] rounded-3xl border border-[#1E2E4A] overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all duration-200 flex flex-col justify-between group"
            >
              {/* Top Card Body */}
              <div className="p-5 space-y-4">
                {/* Top Badges Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center space-x-1">
                    <Play className="w-2.5 h-2.5 fill-amber-400" />
                    <span>{course.type}</span>
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold flex items-center space-x-1 ${
                      course.level === 'Beginner'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50'
                        : 'bg-blue-950/80 text-blue-300 border border-blue-600/50'
                    }`}
                  >
                    <span>▲</span>
                    <span>{course.level}</span>
                  </span>
                </div>

                {/* Course Graphic & Info Layout */}
                <div className="flex items-start space-x-4">
                  {/* Thumbnail with overlay duration & optional Retired Ribbon */}
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800 border border-[#1E2E4A] shadow-inner flex flex-col justify-between p-1.5">
                    {/* Retired Diagonal Ribbon */}
                    {course.isRetired && (
                      <div className="absolute top-0 left-0 bg-[#E11D48] text-white text-[8px] font-black px-3 py-0.5 -rotate-45 -translate-x-3 translate-y-1 shadow-md uppercase tracking-wider z-20">
                        Retired
                      </div>
                    )}

                    <div className={`absolute inset-0 bg-gradient-to-br ${course.bgGradient || 'from-slate-800 to-slate-950'} opacity-90`} />

                    <div className="relative z-10 text-[9px] font-extrabold text-white leading-tight line-clamp-2 drop-shadow-md">
                      {course.thumbnailText || course.title}
                    </div>

                    {/* Duration Badge */}
                    <div className="relative z-10 self-end px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-mono text-slate-200 flex items-center space-x-1">
                      <Clock className="w-2.5 h-2.5 text-amber-400" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Title and Provider */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3
                      onClick={() => setActiveCourseModal(course)}
                      className="text-xs sm:text-sm font-extrabold text-white leading-snug line-clamp-2 hover:text-blue-400 cursor-pointer transition-colors"
                    >
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate flex items-center space-x-1">
                      <Building2 className="w-3 h-3 text-slate-500 inline mr-1 flex-shrink-0" />
                      <span>By {course.provider}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Progress Bar & CTA Row */}
              <div className="px-5 pb-5 pt-2 border-t border-[#1E2E4A]/80 space-y-2">
                {activePill === 'inprogress' ? (
                  <div className="flex items-center justify-between gap-4">
                    {/* Progress Info & Bar */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-300">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-[#162544] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#F59E0B] h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Resume / Start CTA Button */}
                    <button
                      onClick={() => setActiveCourseModal(course)}
                      className="px-4 py-1.5 rounded-xl bg-[#15284F] hover:bg-[#1D3A74] text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 border border-[#1E3A6D] cursor-pointer"
                    >
                      <span>{course.progress > 0 ? 'Resume' : 'Start'}</span>
                      <Play className="w-3 h-3 fill-white" />
                    </button>
                  </div>
                ) : activePill === 'completed' ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Completed on {course.completedOn}</span>
                    </div>
                    <button
                      onClick={() => setActiveCourseModal(course)}
                      className="px-3 py-1 rounded-xl bg-[#162544] hover:bg-[#1E335A] text-slate-200 text-xs font-semibold cursor-pointer"
                    >
                      Review
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Available to re-enroll</span>
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
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
                    >
                      Enroll Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
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
                    {activeCourseModal.progress > 0
                      ? `Continue from ${activeCourseModal.progress}% completion mark`
                      : 'Begin interactive e-learning module'}
                  </p>
                  <p className="text-[11px] text-slate-400">Total runtime: {activeCourseModal.duration}</p>
                </div>
              </div>

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
                <button
                  onClick={async () => {
                    const newProgress = Math.min(100, activeCourseModal.progress + 25);
                    await api.updateCourseProgress(activeCourseModal.id, newProgress);
                    setActiveCourseModal(null);
                    showToast(`Updated progress for ${activeCourseModal.title} to ${newProgress}%`, "success");
                    loadMyLearningData();
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-lg transition-all cursor-pointer flex items-center space-x-1"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Play Module (+25% Progress)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
