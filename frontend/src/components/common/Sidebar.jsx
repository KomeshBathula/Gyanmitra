import React from 'react';
import {
  LayoutDashboard,
  Award,
  AlertCircle,
  GitBranch,
  BookOpen,
  ClipboardCheck,
  FileQuestion,
  Sparkles,
  TrendingUp,
  Building2,
  FileText,
  Bell,
  Sliders,
  Settings,
  LogOut,
  ShieldCheck,
  Layers,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const { currentScreen, setCurrentScreen, currentRole, skillGaps, notifications, logoutUser, t } = useApp();

  const highPriorityGapsCount = skillGaps.filter(g => g.priority === 'High').length;
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // iGOT Karmayogi Hub-Based Navigation Definitions
  const getNavGroups = () => {
    if (currentRole === 'trainer') {
      return [
        {
          title: "NSSTA Faculty Hub",
          icon: Layers,
          items: [
            { id: "trainer-dashboard", label: t('navTrainerDashboard') || "Cohort Dashboard", icon: LayoutDashboard },
            { id: "ai-quiz", label: t('navAiQuiz') || "AI MCQ Authoring Studio", icon: FileQuestion, badge: "RAG Studio", badgeColor: "purple" },
            { id: "reports", label: t('navReports') || "Batch Analytics & Reports", icon: FileText },
          ]
        },
        {
          title: t('navSettings') || "Account & System",
          items: [
            { id: "notifications", label: t('notificationsTitle') || "Notification Center", icon: Bell, badge: unreadNotifCount > 0 ? `${unreadNotifCount}` : null, badgeColor: "amber" },
            { id: "profile", label: t('officialServiceProfile') || "Faculty Profile", icon: Settings },
          ]
        }
      ];
    }

    if (currentRole === 'admin') {
      return [
        {
          title: "Workforce Intelligence Hub",
          icon: Building2,
          items: [
            { id: "admin-dashboard", label: t('navAdminDashboard') || "Workforce Overview", icon: Building2 },
            { id: "reports", label: t('navReports') || "Annual Capacity (ACBP)", icon: FileText, badge: "MoSPI", badgeColor: "blue" },
          ]
        },
        {
          title: t('systemSettings') || "System Admin",
          items: [
            { id: "notifications", label: t('notificationsTitle') || "Ministry Alerts", icon: Bell, badge: unreadNotifCount > 0 ? `${unreadNotifCount}` : null, badgeColor: "amber" },
            { id: "profile", label: t('officialServiceProfile') || "Admin Credentials", icon: Settings },
          ]
        }
      ];
    }

    // Default: Government Official (ISS / SSS / MoSPI) mapped to Karmayogi Hubs
    return [
      {
        title: "Learn Hub",
        items: [
          { id: "dashboard", label: t('navDashboard') || "Dashboard & Progress", icon: LayoutDashboard },
          { id: "courses", label: t('navCourses') || "Course Catalog (iGOT)", icon: BookOpen },
          { id: "learning-path", label: t('navLearningPath') || "Adaptive Learning Path", icon: GitBranch, badge: "AI Dynamic", badgeColor: "blue" },
        ]
      },
      {
        title: "Competency Hub (FRAC)",
        items: [
          { id: "competencies", label: t('navCompetencies') || "FRAC Competency Matrix", icon: Award },
          { id: "skill-gaps", label: t('navSkillGaps') || "Role Gap Analysis", icon: AlertCircle, badge: highPriorityGapsCount > 0 ? `${highPriorityGapsCount} High` : null, badgeColor: "red" },
          { id: "assessment", label: t('takeAssessment') || "Adaptive Assessments", icon: ClipboardCheck },
          { id: "progress", label: t('navProgress') || "Learning Analytics", icon: TrendingUp },
        ]
      },
      {
        title: "AI Studio & Capacity Tools",
        items: [
          { id: "ai-quiz", label: t('navAiQuiz') || "AI MCQ / Quiz Studio", icon: FileQuestion, badge: "RAG", badgeColor: "purple" },
          { id: "ai-assistant", label: "GyanMitra AI Assistant", icon: Sparkles },
        ]
      },
      {
        title: "Service Record & Settings",
        items: [
          { id: "notifications", label: t('notificationsTitle') || "Notification Center", icon: Bell, badge: unreadNotifCount > 0 ? `${unreadNotifCount}` : null, badgeColor: "amber" },
          { id: "profile-wizard", label: t('cadreSkillWizard') || "Cadre Competency Setup", icon: Sliders },
          { id: "profile", label: t('officialServiceProfile') || "Service Profile", icon: Settings },
        ]
      }
    ];
  };

  const navGroups = getNavGroups();

  return (
    <aside className="w-64 bg-[#0F2942] text-slate-300 border-r border-slate-800 flex flex-col flex-shrink-0 min-h-[calc(100vh-69px)]">
      {/* Cadre & Karmayogi Hub Badge */}
      <div className="p-3 mx-3 mt-3 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-100">
            {currentRole === 'trainer' ? 'NSSTA Faculty Desk' : currentRole === 'admin' ? 'MoSPI HQ Admin' : 'iGOT Official Portal'}
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-amber-400">NPCSCB</span>
      </div>

      {/* Navigation Hubs */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <span>{group.title}</span>
            </h4>

            <div className="space-y-0.5 pt-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-[#264092] text-white font-bold shadow-sm border-l-3 border-[#FF9933]'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 ${
                          isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                          item.badgeColor === 'red'
                            ? 'bg-red-900/90 text-red-200 border border-red-700'
                            : item.badgeColor === 'blue'
                            ? 'bg-blue-900/90 text-blue-200 border border-blue-600'
                            : item.badgeColor === 'purple'
                            ? 'bg-purple-900/90 text-purple-200 border border-purple-600'
                            : 'bg-amber-900/90 text-amber-200 border border-amber-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Karmayogi Mission Session Footer */}
      <div className="p-3 m-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-200 flex items-center">
            <Compass className="w-3.5 h-3.5 mr-1 text-amber-400" />
            Mission Karmayogi
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Role-based learning aligned with FRAC framework.
        </p>
        <button
          onClick={logoutUser}
          className="w-full mt-1 py-1.5 px-2 text-[10px] font-bold bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-200 rounded-lg border border-slate-700 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
        >
          <LogOut className="w-3 h-3" />
          <span>{t('signOut')}</span>
        </button>
      </div>
    </aside>
  );
};

