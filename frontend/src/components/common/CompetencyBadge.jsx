import React from 'react';

export const LevelBadge = ({ level, label }) => {
  const getLevelStyle = (lvl) => {
    switch (lvl) {
      case 1:
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 2:
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 3:
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 4:
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 5:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getLevelStyle(level)}`}>
      Level {level} {label ? `• ${label}` : ''}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const getPriorityStyle = (p) => {
    switch (p?.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
      case 'moderate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
      case 'compliant':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getPriorityStyle(priority)}`}>
      {priority}
    </span>
  );
};

export const ProviderBadge = ({ provider }) => {
  const isIgot = provider?.toLowerCase().includes('igot');
  const isNssta = provider?.toLowerCase().includes('nssta');

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
        isIgot
          ? 'bg-blue-50 text-blue-800 border-blue-200'
          : isNssta
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
          : 'bg-slate-100 text-slate-800 border-slate-200'
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
      {provider}
    </span>
  );
};
