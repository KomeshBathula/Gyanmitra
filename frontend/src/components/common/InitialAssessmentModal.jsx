import React from 'react';
import { Award, Sparkles, Clock, CheckCircle2, Maximize2, Shield, ArrowRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InitialAssessmentModal = () => {
  const {
    showInitialAssessmentModal,
    userProfile,
    startAssessmentFullScreen,
    dismissInitialAssessmentModal
  } = useApp();

  if (!showInitialAssessmentModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0F1E36] text-slate-100 rounded-3xl border border-[#233B67] shadow-2xl overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        {/* Top Official Banner */}
        <div className="p-6 sm:p-8 border-b border-[#1E2E4A]/80 bg-gradient-to-r from-blue-950/80 via-[#112344] to-indigo-950/80 relative">
          <button
            onClick={dismissInitialAssessmentModal}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#162544] hover:bg-[#1E3A6D] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-[#233B67]"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-900/80 text-blue-300 border border-blue-500/50 flex items-center space-x-1.5">
              <Shield className="w-3 h-3 text-blue-400" />
              <span>MoSPI Induction Mandate • One-Time Diagnostic</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-600/50 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>+100 Karma Pts</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-2">
            Initial Competency Baseline Assessment
          </h2>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-xl">
            Welcome, <strong className="text-white">{userProfile.name}</strong> ({userProfile.designation || 'Statistical Officer'})! As part of Mission Karmayogi Bharat induction, complete this diagnostic assessment to calibrate your official FRAC skill gaps and activate your personalized learning pathway.
          </p>
        </div>

        {/* Diagnostic Benefits Cards */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-blue-900/60 border border-blue-600/50 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">15 Minutes • 5 Questions</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Concise questions across Survey Sampling, National Accounts & DPDP Act.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-purple-900/60 border border-purple-600/50 text-purple-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Full-Screen Examination Mode</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Distraction-free environment with countdown timer and instant evaluation.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-900/60 border border-emerald-600/50 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Automated FRAC Gap Matrix</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Maps demonstrated scores directly to Level 1–5 competency radar.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-amber-900/60 border border-amber-600/50 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">One-Time Initial Onboarding</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Prompted once upon sign in; future assessments can be taken anytime on-demand.</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-[#1E2E4A] flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={dismissInitialAssessmentModal}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#13233F] hover:bg-[#1A3158] text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-[#1E2E4A]"
            >
              Remind Me Later / Go to Dashboard
            </button>
            <button
              onClick={startAssessmentFullScreen}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-xl hover:shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer border border-blue-400/50"
            >
              <Maximize2 className="w-4 h-4 text-amber-300" />
              <span>Start Assessment in Full Screen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
