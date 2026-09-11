import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Toast } from './components/common/Toast';
import { AIAssistantDrawer } from './components/ai/AIAssistantDrawer';

// Views
import { AuthView } from './views/AuthView';
import { ProfileWizardView } from './views/ProfileWizardView';
import { EmployeeDashboardView } from './views/EmployeeDashboardView';
import { CompetenciesView } from './views/CompetenciesView';
import { AssessmentView } from './views/AssessmentView';
import { SkillGapView } from './views/SkillGapView';
import { LearningPathView } from './views/LearningPathView';
import { CoursesView } from './views/CoursesView';
import { AIQuizGeneratorView } from './views/AIQuizGeneratorView';
import { QuizTakingView } from './views/QuizTakingView';
import { QuizResultsView } from './views/QuizResultsView';
import { AIAssistantView } from './views/AIAssistantView';
import { ProgressView } from './views/ProgressView';
import { TrainerDashboardView } from './views/TrainerDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { ReportsView } from './views/ReportsView';
import { NotificationsView } from './views/NotificationsView';
import { ProfileSettingsView } from './views/ProfileSettingsView';

export default function App() {
  const { isAuthenticated, currentScreen, t } = useApp();

  // If not authenticated or on login screen, render AuthView
  if (!isAuthenticated || currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-[#0F2942] font-sans">
        <AuthView />
        <Toast />
      </div>
    );
  }

  // Render appropriate view based on currentScreen state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <EmployeeDashboardView />;
      case 'competencies':
        return <CompetenciesView />;
      case 'skill-gaps':
        return <SkillGapView />;
      case 'learning-path':
        return <LearningPathView />;
      case 'courses':
        return <CoursesView />;
      case 'assessment':
        return <AssessmentView />;
      case 'ai-quiz':
        return <AIQuizGeneratorView />;
      case 'quiz-taking':
        return <QuizTakingView />;
      case 'quiz-results':
        return <QuizResultsView />;
      case 'ai-assistant':
        return <AIAssistantView />;
      case 'progress':
        return <ProgressView />;
      case 'trainer-dashboard':
        return <TrainerDashboardView />;
      case 'admin-dashboard':
        return <AdminDashboardView />;
      case 'reports':
        return <ReportsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile-wizard':
        return <ProfileWizardView />;
      case 'profile':
      case 'settings':
        return <ProfileSettingsView />;
      default:
        return <EmployeeDashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Global GoI & iGOT Karmayogi Header */}
      <Header />

      {/* Main Application Shell with Sidebar and View Body */}
      <div className="flex-1 flex flex-row overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8FAFC] flex flex-col justify-between">
          <div className="max-w-7xl mx-auto w-full">
            {renderScreen()}
          </div>

          {/* Official Karmayogi Bharat & MoSPI Footer */}
          <footer className="mt-12 pt-6 pb-4 border-t border-slate-200 text-xs text-slate-500 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-slate-600">
                <span className="font-bold text-[#1B365D]">GyanMitra (ज्ञानमित्र)</span>
                <span>•</span>
                <span>An initiative of MoSPI under Mission Karmayogi (NPCSCB)</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-blue-700 font-medium">
                <a href="https://igotkarmayogi.gov.in" target="_blank" rel="noreferrer" className="hover:underline">iGOT Karmayogi Bharat</a>
                <a href="https://mospi.gov.in" target="_blank" rel="noreferrer" className="hover:underline">MoSPI Portal</a>
                <a href="https://dopt.gov.in" target="_blank" rel="noreferrer" className="hover:underline">DoPT</a>
                <a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:underline">Digital India</a>
                <a href="https://mygov.in" target="_blank" rel="noreferrer" className="hover:underline">MyGov</a>
                <a href="https://nic.in" target="_blank" rel="noreferrer" className="hover:underline">NIC</a>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-400 text-center md:text-left">
              Content owned by Ministry of Statistics & Programme Implementation (MoSPI), Government of India. Hosted by NIC.
            </div>
          </footer>
        </main>
      </div>

      {/* Floating Global AI Assistant Drawer */}
      <AIAssistantDrawer />

      {/* Feedback Toast */}
      <Toast />
    </div>
  );
}

