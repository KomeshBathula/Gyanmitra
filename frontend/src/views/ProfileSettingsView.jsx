import React, { useState } from 'react';
import { User, Settings, Lock, Shield, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileSettingsView = () => {
  const { userProfile, setUserProfile, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    showToast("Official Service Profile and settings updated.", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            Government Employee Profile
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Official Service Profile & Settings</h2>
          <p className="text-xs text-slate-500">
            Authenticated via Parichay SSO • Ministry of Statistics & Programme Implementation
          </p>
        </div>

        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="px-4 py-2 bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold rounded-lg transition-colors shadow-gov"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Details Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov space-y-6">
        <div className="flex items-center space-x-4 pb-4 border-b border-slate-100">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-16 h-16 rounded-xl object-cover border border-slate-300 shadow-gov"
          />
          <div>
            <h3 className="text-base font-bold text-slate-900">{userProfile.name}</h3>
            <p className="text-xs text-slate-500">{userProfile.designation} • {userProfile.cadre}</p>
            <span className="text-[11px] font-mono text-blue-700">{userProfile.employeeId}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-semibold text-slate-500 block">Department / Division</span>
            <p className="font-bold text-slate-800 mt-0.5">{userProfile.department}</p>
          </div>

          <div>
            <span className="font-semibold text-slate-500 block">Ministry</span>
            <p className="font-bold text-slate-800 mt-0.5">{userProfile.ministry}</p>
          </div>

          <div>
            <span className="font-semibold text-slate-500 block">Official Email Address</span>
            <p className="font-bold text-slate-800 mt-0.5">{userProfile.email}</p>
          </div>

          <div>
            <span className="font-semibold text-slate-500 block">Office Location</span>
            <p className="font-bold text-slate-800 mt-0.5">{userProfile.location}</p>
          </div>

          <div>
            <span className="font-semibold text-slate-500 block">Reporting Officer</span>
            <p className="font-bold text-slate-800 mt-0.5">{userProfile.reportingOfficer}</p>
          </div>

          <div>
            <span className="font-semibold text-slate-500 block">Educational Qualification</span>
            <p className="font-bold text-slate-800 mt-0.5">{userProfile.education}</p>
          </div>
        </div>
      </div>

      {/* Preferences & Security */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov space-y-4 text-xs">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
          System Preferences & Accessibility
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <p className="font-bold text-slate-800">Interface Language</p>
              <p className="text-[11px] text-slate-500">Toggle between English and Hindi (राजभाषा)</p>
            </div>
            <select className="px-2 py-1 text-xs border border-slate-300 rounded bg-white">
              <option>English</option>
              <option>हिन्दी (Hindi)</option>
            </select>
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <p className="font-bold text-slate-800">Email Notifications for Cadre Deadlines</p>
              <p className="text-[11px] text-slate-500">Receive ACBP assessment reminders to registered NIC mail</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded text-blue-600 w-4 h-4" />
          </label>
        </div>
      </div>
    </div>
  );
};
