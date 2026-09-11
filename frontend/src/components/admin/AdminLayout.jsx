import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { Toast } from '../common/Toast';

// Admin Views
import { AdminDashboardView } from '../../views/AdminDashboardView';
import { AdminLearnerDirectoryView } from '../../views/admin/AdminLearnerDirectoryView';
import { AdminDepartmentAnalyticsView } from '../../views/admin/AdminDepartmentAnalyticsView';
import { AdminAssessmentsAuditView } from '../../views/admin/AdminAssessmentsAuditView';
import { AIQuizGeneratorView } from '../../views/AIQuizGeneratorView';
import { ReportsView } from '../../views/ReportsView';

export const AdminLayout = () => {
  const { currentScreen } = useApp();

  const renderAdminScreen = () => {
    switch (currentScreen) {
      case 'admin-dashboard':
      case 'dashboard':
        return <AdminDashboardView />;
      case 'admin-learners':
        return <AdminLearnerDirectoryView />;
      case 'admin-analytics':
        return <AdminDepartmentAnalyticsView />;
      case 'admin-quiz-studio':
      case 'ai-quiz':
        return <AIQuizGeneratorView />;
      case 'admin-assessments':
        return <AdminAssessmentsAuditView />;
      case 'admin-reports':
      case 'reports':
        return <ReportsView />;
      default:
        return <AdminDashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070D18] text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Governance Admin Header */}
      <AdminHeader />

      {/* Main Admin Shell with Admin Sidebar and Content */}
      <div className="flex-1 flex flex-row overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#070D18] flex flex-col justify-between">
          <div className="max-w-7xl mx-auto w-full">
            {renderAdminScreen()}
          </div>

          {/* Admin Governance Footer */}
          <footer className="mt-12 pt-6 pb-4 border-t border-[#1E2E4A] text-xs text-slate-400 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="font-bold text-white">GyanMitra Governance Portal</span>
                <span>•</span>
                <span>Ministry of Statistics & Programme Implementation (MoSPI) & DoPT</span>
              </div>
              <div className="flex items-center space-x-4 text-[11px] text-purple-400 font-medium">
                <span>Civil Cadre</span>
                <span>•</span>
                <span>Municipal Administration</span>
                <span>•</span>
                <span>MoSPI SSS/ISS</span>
                <span>•</span>
                <span>Revenue Services</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Feedback Toast */}
      <Toast />
    </div>
  );
};
