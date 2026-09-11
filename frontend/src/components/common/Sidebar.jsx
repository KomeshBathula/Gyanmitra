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
  Users,
  Building2,
  FileText,
  Bell,
  Sliders,
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const { currentScreen, setCurrentScreen, currentRole, skillGaps, notifications, logoutUser } = useApp();

  const highPriorityGapsCount = skillGaps.filter(g => g.priority === 'High').length;
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Role-Specific Navigation Definitions
  const getNavGroups = () => {
    if (currentRole === 'trainer') {
      return [
        {
          title: "Trainer & Faculty Portal",
          items: [
            { id: "trainer-dashboard", label: "Cohort Dashboard", icon: LayoutDashboard },
            { id: "ai-quiz", label: "AI MCQ Authoring Studio", icon: FileQuestion, badge: "RAG", badgeColor: "purple" },
            { id: "reports", label: "Batch Analytics & Reports", icon: FileText },
          ]
        },
        {
          title: "Account & Preferences",
          items: [
            { id: "notifications", label: "Notification Center", icon: Bell, badge: unreadNotifCount > 0 ? `${unreadNotifCount}` : null, badgeColor: "amber" },
            { id: "profile", label: "Faculty Profile & Settings", icon: Settings },
          ]
        }
      ];
    }

    if (currentRole === 'admin') {
      return [
        {
          title: "National Workforce Intelligence",
          items: [
            { id: "admin-dashboard", label: "Workforce Overview", icon: Building2 },
            { id: "reports", label: "Institutional Reports & ACBP", icon: FileText, badge: "Official", badgeColor: "blue" },
          ]
        },
        {
          title: "System Administration",
          items: [
            { id: "notifications", label: "Ministry Alerts", icon: Bell, badge: unreadNotifCount > 0 ? `${unreadNotifCount}` : null, badgeColor: "amber" },
            { id: "profile", label: "Administrator Settings", icon: Settings },
          ]
        }
      ];
    }

    // Default: Government Employee / Official (ISS / SSS)
    return [
      {
        title: "Core Learning & Intelligence",
        items: [
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
          { id: "competencies", label: "My Competencies", icon: Award },
          { id: "skill-gaps", label: "Skill Gap Analysis", icon: AlertCircle, badge: highPriorityGapsCount > 0 ? `${highPriorityGapsCount} High` : null, badgeColor: "red" },
          { id: "learning-path", label: "Learning Path", icon: GitBranch, badge: "AI Dynamic", badgeColor: "blue" },
          { id: "courses", label: "Course Recommendations", icon: BookOpen },
          { id: "assessment", label: "Competency Assessment", icon: ClipboardCheck },
        ]
      },
      {
        title: "AI Capacity Tools",
        items: [
          { id: "ai-quiz", label: "AI MCQ / Quiz Generator", icon: FileQuestion, badge: "RAG", badgeColor: "purple" },
          { id: "ai-assistant", label: "GyanMitra AI Assistant", icon: Sparkles },
          { id: "progress", label: "Learning Progress & Analytics", icon: TrendingUp },
        ]
      },
      {
        title: "Service Record & System",
        items: [
          { id: "notifications", label: "Notification Center", icon: Bell, badge: unreadNotifCount > 0 ? `${unreadNotifCount}` : null, badgeColor: "amber" },
          { id: "profile-wizard", label: "Profile Setup Wizard", icon: Sliders },
          { id: "profile", label: "Profile & Settings", icon: Settings },
        ]
      }
    ];
  };

  const navGroups = getNavGroups();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col flex-shrink-0 min-h-[calc(100vh-69px)]">
      {/* Cadre Badge Banner */}
      <div className="p-3 mx-3 mt-3 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200">
            {currentRole === 'trainer' ? 'NSSTA Faculty' : currentRole === 'admin' ? 'MoSPI Admin' : 'Official Portal'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">MoSPI-2026</span>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {group.title}
            </h4>

            <div className="space-y-0.5 pt-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-gov-light text-white font-semibold shadow-gov'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                          item.badgeColor === 'red'
                            ? 'bg-red-900/80 text-red-200 border border-red-700'
                            : item.badgeColor === 'blue'
                            ? 'bg-blue-900/80 text-blue-200 border border-blue-700'
                            : item.badgeColor === 'purple'
                            ? 'bg-purple-900/80 text-purple-200 border border-purple-700'
                            : 'bg-amber-900/80 text-amber-200 border border-amber-700'
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

      {/* Footer Info Box */}
      <div className="p-3 m-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-300">Session Secure</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Role-Gated Parichay SSO Authentication.
        </p>
        <button
          onClick={logoutUser}
          className="w-full mt-1 py-1 px-2 text-[10px] font-bold bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-200 rounded border border-slate-700 transition-colors flex items-center justify-center space-x-1"
        >
          <LogOut className="w-3 h-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
