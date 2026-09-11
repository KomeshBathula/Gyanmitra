import React, { useState } from 'react';
import { BookOpen, Sparkles, Filter, Search, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CoursesView = () => {
  const { courses, setCurrentScreen, showToast } = useApp();
  const [selectedTab, setSelectedTab] = useState('all'); // 'all', 'recommended', 'igot', 'nssta'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  const filteredCourses = courses.filter((c) => {
    if (selectedTab === 'recommended' && !c.isRecommended) return false;
    if (selectedTab === 'igot' && c.providerType !== 'iGOT') return false;
    if (selectedTab === 'nssta' && c.providerType !== 'NSSTA') return false;
    if (selectedDifficulty !== 'all' && !c.difficulty.toLowerCase().includes(selectedDifficulty)) return false;
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov">
        <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          Official Statistics Learning Hub
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-1">Course Catalog & Recommendations</h2>
        <p className="text-xs text-slate-500">
          Curated training modules from iGOT Karmayogi and National Statistical Systems Training Academy (NSSTA).
        </p>

        {/* Filter Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'recommended', label: '★ AI Recommended' },
              { id: 'igot', label: 'iGOT Karmayogi' },
              { id: 'nssta', label: 'NSSTA Greater Noida' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedTab === tab.id
                    ? 'bg-gov-blue text-white shadow-gov'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search course title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((crs) => (
          <div
            key={crs.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov hover:shadow-gov-md transition-all flex flex-col justify-between hover:border-blue-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  crs.providerType === 'NSSTA'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-blue-50 text-blue-800 border border-blue-200'
                }`}>
                  {crs.provider}
                </span>

                {crs.isRecommended && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    ★ {crs.matchScore}% Match
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400">{crs.code}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{crs.title}</h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {crs.description}
                </p>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[11px] space-y-1">
                <div className="flex items-center justify-between text-slate-600">
                  <span>⏱ Duration: <strong>{crs.duration}</strong></span>
                  <span>{crs.difficulty}</span>
                </div>
                <div className="text-blue-800 font-medium">
                  Competency: {crs.competency}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveCourseModal(crs)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200"
              >
                View Syllabus
              </button>
              <button
                onClick={() => {
                  showToast(`Enrolled in ${crs.title}`, "success");
                  setCurrentScreen('learning-path');
                }}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-gov-blue hover:bg-gov-navy rounded-lg transition-colors"
              >
                Start Learning
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Syllabus Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                  {activeCourseModal.provider}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{activeCourseModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{activeCourseModal.description}</p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Course Syllabus Modules:</h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeCourseModal.syllabus?.map((s, idx) => (
                  <li key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveCourseModal(null);
                  showToast(`Enrolled in ${activeCourseModal.title}`, "success");
                  setCurrentScreen('learning-path');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-gov-blue hover:bg-gov-navy rounded-lg"
              >
                Enroll & Start Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
