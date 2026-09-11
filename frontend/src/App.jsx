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
  const { isAuthenticated, currentScreen } = useApp();

  // If not authenticated or on login screen, render AuthView
  if (!isAuthenticated || currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-slate-900 font-sans">
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
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Global GoI & MoSPI Header */}
      <Header />

      {/* Main Application Shell with Sidebar and View Body */}
      <div className="flex-1 flex flex-row overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {renderScreen()}
          </div>
        </main>
      </div>

      {/* Floating Global AI Assistant Drawer */}
      <AIAssistantDrawer />

      {/* Feedback Toast */}
      <Toast />
    </div>
  );
}
