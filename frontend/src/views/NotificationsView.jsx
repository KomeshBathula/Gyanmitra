import React from 'react';
import { useApp } from '../context/AppContext';

export const NotificationsView = () => {
  const { notifications, setNotifications, setCurrentScreen, showToast } = useApp();

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast("All notifications marked as read.", "info");
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-12 text-[#1F2933]">

      {/* Page Header */}
      <div className="bg-white border border-[#D5DCE3] rounded p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
            Cadre Mandates & Alerts
          </span>
          <h2 className="text-lg font-bold text-[#0B3A63] mt-1.5">Notification Centre</h2>
          <p className="text-xs text-[#5B6773] mt-0.5">
            Official announcements, assessment deadlines, and skill pathway recommendations.
          </p>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="text-xs font-semibold text-[#0B3A63] hover:underline cursor-pointer flex-shrink-0"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden divide-y divide-[#D5DCE3]">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#5B6773]">
            No notifications at this time.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                if (notif.actionLink) setCurrentScreen(notif.actionLink);
              }}
              className={`p-4 sm:p-5 hover:bg-[#F5F7F9] cursor-pointer transition-colors flex items-start justify-between gap-4 ${
                !notif.read ? 'bg-blue-50/30 border-l-2 border-l-[#0B3A63]' : ''
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    notif.priority === 'high'
                      ? 'bg-red-50 text-[#B42318] border-red-200'
                      : notif.priority === 'medium'
                      ? 'bg-amber-50 text-[#B7791F] border-amber-200'
                      : 'bg-[#EEF2F5] text-[#5B6773] border-[#D5DCE3]'
                  }`}>
                    {(notif.priority || 'info').toUpperCase()}
                  </span>
                  <h3 className="text-xs font-semibold text-[#1F2933]">{notif.title}</h3>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-[#0B3A63] flex-shrink-0" />}
                </div>
                <p className="text-xs text-[#5B6773] leading-relaxed">{notif.description}</p>
              </div>
              <span className="text-[11px] text-[#5B6773] whitespace-nowrap flex-shrink-0">{notif.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
