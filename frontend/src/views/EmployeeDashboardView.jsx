import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  BookOpen,
  BarChart3,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmployeeDashboardView = () => {
  const {
    userProfile,
    setCurrentScreen,
    showToast,
    setIsAiDrawerOpen,
    t
  } = useApp();

  const [activeTab, setActiveTab] = useState('apar'); // 'apar', 'cbp', 'moderated'
  const [activeSlide, setActiveSlide] = useState(0);

  // Carousel banners
  const carouselSlides = [
    {
      id: 1,
      title: "Complete any 3 courses from the AI Daksh Program and earn the 'AI Daksh' Badge",
      badgeTitle: "AI Daksh Badge",
      badgeType: "Gold Certified",
      actionText: "Explore AI Tracks",
      bgGradient: "from-blue-900/60 to-[#111F38]"
    },
    {
      id: 2,
      title: "MoSPI NSS 79th Round: Data Sampling & Validation Specialist Certification",
      badgeTitle: "MoSPI Specialist",
      badgeType: "ISS Certified",
      actionText: "Start Sampling Module",
      bgGradient: "from-emerald-900/60 to-[#111F38]"
    }
  ];

  // Course Recommendations matching iGOT screenshot
  const recommendedCourses = [
    {
      id: 'crs-1',
      title: 'Gramin Dak Sevak: Digital Outreach & Dak Chaupal',
      duration: '1h 7m',
      rating: '4.3',
      provider: 'Department of Posts & MoSPI',
      theme: 'postal',
      bgImg: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=400&auto=format&fit=crop&q=80',
      badge: 'Course',
      karmaPoints: 120
    },
    {
      id: 'crs-2',
      title: 'Gramin Dak Sevak Customer Service Skills & Interpersonal Skills',
      duration: '45m 15s',
      rating: '4.3',
      provider: 'Karmayogi Bharat Foundation',
      theme: 'customer',
      bgImg: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&auto=format&fit=crop&q=80',
      badge: 'Course',
      karmaPoints: 100
    },
    {
      id: 'crs-3',
      title: 'MoSPI NSS 79th Round: Sampling Methodology & Guidelines',
      duration: '2h 30m',
      rating: '4.8',
      provider: 'NSSTA Greater Noida',
      theme: 'statistics',
      bgImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
      badge: 'Course',
      karmaPoints: 250
    },
    {
      id: 'crs-4',
      title: 'National Accounts Statistics: GDP & GVA Computation Framework',
      duration: '3h 15m',
      rating: '4.9',
      provider: 'National Statistical Systems Training Academy',
      theme: 'economy',
      bgImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
      badge: 'Course',
      karmaPoints: 300
    }
  ];

  return (
    <div className="space-y-6 pb-12 text-slate-100">
      {/* 1. Top Hero Carousel Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-white text-slate-900 border border-[#1E3A6D] shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 gap-6">
          {/* Badge Graphic Artwork */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-300 p-1 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-xl bg-white flex flex-col items-center justify-center p-2 text-center">
                <Award className="w-10 h-10 text-amber-500 fill-amber-400" />
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight mt-1 leading-none">
                  {carouselSlides[activeSlide].badgeTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Banner Text Content */}
          <div className="flex-1 space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0074CB] text-xs font-bold border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>कर्मयोगी भारत • Karmayogi Incentive</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-[#1B365D] tracking-tight leading-snug">
              {carouselSlides[activeSlide].title}
            </h2>
            <p className="text-xs text-slate-500">
              Complete the designated modules to validate competencies under MoSPI Annual Capacity Plan.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1))}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center pb-3 space-x-1.5">
          {carouselSlides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                activeSlide === idx ? 'bg-[#0074CB] w-5' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Welcome Greeting */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Welcome Back, {userProfile.name}
        </h1>
      </div>

      {/* 3. Weekly Claps Card */}
      <div className="bg-[#111F38] rounded-3xl border border-[#1E335A] p-6 space-y-4 shadow-lg max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base font-bold text-white">Weekly Claps</h3>
          <span className="px-3 py-1 rounded-full bg-[#162544] border border-[#1E3A6D] text-slate-300 text-xs font-semibold self-start sm:self-auto">
            Mon, 17 Aug - Sun, 13 Sep
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          This is a fun way to track your engagement on the platform. It reflects your commitment and activity level.{' '}
          <button
            onClick={() => showToast("Weekly claps track your continuous learning milestones.", "info")}
            className="text-blue-400 font-semibold hover:underline cursor-pointer"
          >
            Know More
          </button>
        </p>

        {/* Claps Progress Visual */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Clapping Hands Icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#162544] border border-[#1E3A6D] flex items-center justify-center text-slate-400">
              <span className="text-3xl">👏</span>
            </div>
            <div>
              <p className="text-lg font-black text-white leading-none">0 Weeks</p>
              <p className="text-[11px] text-slate-400 mt-1">Consistency Streak</p>
            </div>
          </div>

          {/* Week Circles */}
          <div className="flex items-center space-x-4">
            {[
              { label: 'W1', completed: false },
              { label: 'W2', completed: false },
              { label: 'W3', completed: false },
              { label: 'W4', isCurrent: true }
            ].map((wk, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400">{wk.label}</span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    wk.completed
                      ? 'bg-emerald-500 text-white'
                      : wk.isCurrent
                      ? 'border-2 border-amber-400 text-amber-400 bg-amber-400/10'
                      : 'bg-[#162544] text-slate-500 border border-[#1E3A6D]'
                  }`}
                >
                  {wk.completed ? '✓' : wk.isCurrent ? '○' : '✕'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Course Tabs: APAR Courses, CBP Plan, Moderated Content */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {/* APAR Courses Blue Button Card */}
        <button
          onClick={() => setActiveTab('apar')}
          className={`flex items-center space-x-3 px-5 py-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'apar'
              ? 'bg-[#1D4ED8] text-white font-bold shadow-lg ring-2 ring-blue-400'
              : 'bg-[#162544] hover:bg-[#1E335A] text-slate-300 border border-[#1E3A6D]'
          }`}
        >
          <div className="text-left">
            <p className="text-xs font-black">APAR Courses</p>
            <p className="text-[10px] opacity-80 font-normal">Annual Performance Appraisal...</p>
          </div>
          <BarChart3 className="w-5 h-5 opacity-90" />
        </button>

        {/* CBP Plan Tab */}
        <button
          onClick={() => setActiveTab('cbp')}
          className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'cbp'
              ? 'bg-[#1D4ED8] text-white shadow-lg'
              : 'bg-[#162544] hover:bg-[#1E335A] text-slate-300 border border-[#1E3A6D]'
          }`}
        >
          CBP Plan
        </button>

        {/* Moderated Content Tab */}
        <button
          onClick={() => setActiveTab('moderated')}
          className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'moderated'
              ? 'bg-[#1D4ED8] text-white shadow-lg'
              : 'bg-[#162544] hover:bg-[#1E335A] text-slate-300 border border-[#1E3A6D]'
          }`}
        >
          Moderated Content
        </button>
      </div>

      {/* 5. Recommended Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
        {recommendedCourses.map((crs) => (
          <div
            key={crs.id}
            onClick={() => {
              showToast(`Opening ${crs.title}`, "info");
              setCurrentScreen('courses');
            }}
            className="group bg-[#111F38] rounded-3xl border border-[#1E335A] overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
          >
            {/* Top Thumbnail Image with Duration Badge */}
            <div className="relative h-36 w-full overflow-hidden bg-slate-800">
              <img
                src={crs.bgImg}
                alt={crs.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono font-bold flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{crs.duration}</span>
              </div>
            </div>

            {/* Course Card Body */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-tight">
                    {crs.badge}
                  </span>
                  <span className="text-xs font-bold text-amber-400 flex items-center">
                    ★ {crs.rating}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-100 line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">
                  {crs.title}
                </h4>
              </div>

              <div className="pt-2 border-t border-[#1E335A] flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[130px]">{crs.provider}</span>
                <span className="text-amber-400 font-bold flex items-center">
                  <Zap className="w-3 h-3 mr-0.5 fill-amber-400" />
                  +{crs.karmaPoints}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
