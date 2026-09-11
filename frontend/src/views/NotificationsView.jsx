import React from 'react';
import { Bell, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsView = () => {
  const { notifications, setNotifications, setCurrentScreen, showToast } = useApp();

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast("All notifications marked as read.", "info");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            Cadre Mandates & Alerts
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Notification Center</h2>
          <p className="text-xs text-slate-500">
            Official announcements, assessment deadlines, and skill pathway recommendations.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="text-xs font-bold text-blue-700 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-gov divide-y divide-slate-100">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => {
              if (notif.actionLink) setCurrentScreen(notif.actionLink);
            }}
            className={`p-4 sm:p-5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start justify-between gap-4 ${
              !notif.read ? 'bg-blue-50/40' : ''
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  notif.priority === 'high' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-700'
                }`}>
                  {notif.priority.toUpperCase()}
                </span>
                <h3 className="text-xs font-bold text-slate-900">{notif.title}</h3>
                {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{notif.description}</p>
            </div>

            <span className="text-[11px] text-slate-400 whitespace-nowrap">{notif.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
