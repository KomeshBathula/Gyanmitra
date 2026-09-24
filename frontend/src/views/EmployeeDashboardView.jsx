import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmployeeDashboardView = () => {
  const {
    userProfile,
    setCurrentScreen,
    generatedQuizzes,
    startGeneratedQuiz,
    showToast,
    setIsAiDrawerOpen,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState('apar');
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselSlides = [
    {
      id: 1,
      title: "Complete any 3 courses from the AI Daksh Program and earn the 'AI Daksh' Badge",
      badgeTitle: "AI Daksh Badge",
      badgeType: "Gold Certified",
      actionText: "Explore AI Tracks",
    },
    {
      id: 2,
      title: "MoSPI NSS 79th Round: Data Sampling & Validation Specialist Certification",
      badgeTitle: "MoSPI Specialist",
      badgeType: "ISS Certified",
      actionText: "Start Sampling Module",
    }
  ];

  const recommendedCourses = [
    {
      id: 'crs-1',
      title: 'Gramin Dak Sevak: Digital Outreach & Dak Chaupal',
      duration: '1h 7m',
      rating: '4.3',
      provider: 'Department of Posts & MoSPI',
      badge: 'Course',
      karmaPoints: 120
    },
    {
      id: 'crs-2',
      title: 'Gramin Dak Sevak Customer Service Skills & Interpersonal Skills',
      duration: '45m 15s',
      rating: '4.3',
      provider: 'Karmayogi Bharat Foundation',
      badge: 'Course',
      karmaPoints: 100
    },
    {
      id: 'crs-3',
      title: 'MoSPI NSS 79th Round: Sampling Methodology & Guidelines',
      duration: '2h 30m',
      rating: '4.8',
      provider: 'NSSTA Greater Noida',
      badge: 'Course',
      karmaPoints: 250
    },
    {
      id: 'crs-4',
      title: 'National Accounts Statistics: GDP & GVA Computation Framework',
      duration: '3h 15m',
      rating: '4.9',
      provider: 'National Statistical Systems Training Academy',
      badge: 'Course',
      karmaPoints: 300
    }
  ];

  return (
    <div className="space-y-5 pb-12 text-[#1F2933]">

      {/* 1. Welcome Greeting */}
      <div>
        <h1 className="text-xl font-bold text-[#1F2933]">
          Welcome back, {userProfile?.name || 'Statistical Officer'}
        </h1>
        <p className="text-xs text-[#5B6773] mt-0.5">
          Ministry of Statistics & Programme Implementation · iGOT Karmayogi
        </p>
      </div>

      {/* 2. Announcement Banner */}
      <div className="bg-white border border-[#D5DCE3] rounded p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Text Content */}
          <div className="flex-1 space-y-1">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
              GyanMitra · Learning Incentive
            </span>
            <h2 className="text-sm font-semibold text-[#1F2933] leading-snug">
              {carouselSlides[activeSlide].title}
            </h2>
            <p className="text-xs text-[#5B6773]">
              Complete the designated modules to validate competencies under MoSPI Annual Capacity Plan.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <span className="text-xs font-semibold text-[#0B3A63]">
                {carouselSlides[activeSlide].badgeTitle}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#0B3A63] text-white">
                {carouselSlides[activeSlide].badgeType}
              </span>
            </div>
          </div>
          {/* Carousel Controls */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setActiveSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
              className="w-7 h-7 border border-[#D5DCE3] rounded bg-[#F5F7F9] hover:bg-[#EEF2F5] text-[#5B6773] flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-[#5B6773]">{activeSlide + 1}/{carouselSlides.length}</span>
            <button
              onClick={() => setActiveSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1))}
              className="w-7 h-7 border border-[#D5DCE3] rounded bg-[#F5F7F9] hover:bg-[#EEF2F5] text-[#5B6773] flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. AI Knowledge Assistant Card */}
      <div className="bg-white border border-[#D5DCE3] rounded p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold text-[#1F2933]">GyanMitra Knowledge Assistant</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
                AI ASSISTED
              </span>
            </div>
            <p className="text-xs text-[#5B6773] mt-0.5">
              Official assistant for MoSPI statistical methodologies, sampling, courses, and competency development.
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="px-4 py-1.5 bg-[#0B3A63] hover:bg-[#12304A] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              Ask Assistant
            </button>
            <button
              onClick={() => setCurrentScreen('ai-assistant')}
              className="px-3 py-1.5 bg-[#F5F7F9] hover:bg-[#EEF2F5] text-[#5B6773] border border-[#D5DCE3] text-xs font-medium rounded transition-colors cursor-pointer"
            >
              Full Page
            </button>
          </div>
        </div>
      </div>

      {/* 4. Weekly Claps */}
      <div className="bg-white border border-[#D5DCE3] rounded p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h3 className="text-sm font-semibold text-[#1F2933]">Weekly Engagement Streak</h3>
          <span className="px-2 py-0.5 rounded border border-[#D5DCE3] bg-[#F5F7F9] text-[#5B6773] text-xs self-start sm:self-auto">
            Mon, 17 Aug — Sun, 13 Sep
          </span>
        </div>

        <p className="text-xs text-[#5B6773] leading-relaxed">
          Track your engagement on the platform. It reflects your commitment and activity level.{' '}
          <button
            onClick={() => showToast("Weekly claps track your continuous learning milestones.", "info")}
            className="text-[#0B3A63] font-medium hover:underline cursor-pointer"
          >
            Know More
          </button>
        </p>

        <div className="mt-3 pt-3 border-t border-[#D5DCE3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded bg-[#EEF2F5] border border-[#D5DCE3] flex items-center justify-center font-bold text-[#0B3A63] text-xs">
              0W
            </div>
            <div>
              <p className="text-sm font-bold text-[#1F2933]">0 Weeks</p>
              <p className="text-[11px] text-[#5B6773]">Consistency Streak</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {[
              { label: 'W1', completed: false },
              { label: 'W2', completed: false },
              { label: 'W3', completed: false },
              { label: 'W4', isCurrent: true }
            ].map((wk, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-1">
                <span className="text-[10px] font-semibold text-[#5B6773]">{wk.label}</span>
                <div
                  className={`w-7 h-7 rounded border flex items-center justify-center text-xs font-bold ${
                    wk.completed
                      ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                      : wk.isCurrent
                      ? 'border-[#B7791F] text-[#B7791F] bg-amber-50'
                      : 'bg-[#F5F7F9] text-[#5B6773] border-[#D5DCE3]'
                  }`}
                >
                  {wk.completed ? '✓' : wk.isCurrent ? '○' : '–'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Live Material Assessments */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
                MoSPI Cadre Assessment
              </span>
              <span className="text-xs text-[#5B6773]">Official Induction & Training Assessments</span>
            </div>
            <h3 className="text-sm font-semibold text-[#1F2933] mt-1">Live Material Assessments</h3>
          </div>
          <span className="text-xs text-[#5B6773]">
            {(generatedQuizzes || []).length} Assessment{(generatedQuizzes || []).length === 1 ? '' : 's'} Available
          </span>
        </div>

        {(!generatedQuizzes || generatedQuizzes.length === 0) ? (
          <div className="p-6 border border-[#D5DCE3] rounded bg-white text-center text-xs text-[#5B6773]">
            No live assessments published yet. Assessments created by Ministry Administrators will appear here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(generatedQuizzes || []).map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white border border-[#D5DCE3] rounded p-4 flex flex-col justify-between hover:border-[#0B3A63] transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
                      {quiz.difficulty || 'Medium'} Level
                    </span>
                    <span className="text-[11px] text-[#5B6773]">
                      {quiz.questionCount || quiz.questions?.length || 5} Questions
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-[#1F2933] line-clamp-2">{quiz.title}</h4>
                    <p className="text-[11px] text-[#5B6773] mt-0.5 truncate">
                      {quiz.documentName || 'Official MoSPI Guidelines'}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-[#D5DCE3] flex items-center justify-between">
                  <span className="text-[10px] text-[#5B6773]">By {quiz.createdBy || 'MoSPI Admin'}</span>
                  <button
                    onClick={() => startGeneratedQuiz(quiz)}
                    className="px-3 py-1.5 rounded bg-[#0B3A63] hover:bg-[#12304A] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Take Assessment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Course Category Tabs */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {[
            { id: 'apar', label: 'APAR Courses', sub: 'Annual Performance Appraisal' },
            { id: 'cbp', label: 'CBP Plan' },
            { id: 'moderated', label: 'Moderated Content' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded border text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0B3A63] text-white border-[#0B3A63]'
                  : 'bg-white text-[#5B6773] border-[#D5DCE3] hover:bg-[#EEF2F5] hover:text-[#1F2933]'
              }`}
            >
              {tab.label}
              {tab.sub && <span className={`block text-[10px] ${activeTab === tab.id ? 'opacity-80' : 'text-[#5B6773]'}`}>{tab.sub}</span>}
            </button>
          ))}
        </div>

        {/* Recommended Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedCourses.map((crs) => (
            <div
              key={crs.id}
              onClick={() => {
                showToast(`Opening ${crs.title}`, "info");
                setCurrentScreen('courses');
              }}
              className="bg-white border border-[#D5DCE3] rounded hover:border-[#0B3A63] transition-colors cursor-pointer flex flex-col"
            >
              {/* Course color bar */}
              <div className="h-1.5 bg-[#0B3A63] rounded-t" />

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3] uppercase">
                      {crs.badge}
                    </span>
                    <span className="text-xs text-[#5B6773] font-medium">Score: {crs.rating}/5</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#1F2933] line-clamp-2 leading-snug">
                    {crs.title}
                  </h4>
                </div>

                <div className="pt-3 mt-3 border-t border-[#D5DCE3] flex items-center justify-between text-[11px]">
                  <span className="text-[#5B6773] truncate max-w-[130px]">{crs.provider}</span>
                  <span className="text-[#B7791F] font-semibold whitespace-nowrap">+{crs.karmaPoints} KP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
