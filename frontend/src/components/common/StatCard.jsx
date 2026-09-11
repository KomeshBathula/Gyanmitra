import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({ title, value, subtitle, delta, deltaType = 'positive', icon: Icon, badge, color = 'blue' }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    red: 'bg-red-50 text-red-700 border-red-100'
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov hover:shadow-gov-md transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
            {delta && (
              <span
                className={`inline-flex items-center text-xs font-medium ${
                  deltaType === 'positive' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                } px-1.5 py-0.5 rounded`}
              >
                {deltaType === 'positive' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {delta}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>

        {Icon && (
          <div className={`p-3 rounded-lg border ${colorMap[color] || colorMap.blue}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {badge && <div className="mt-3 pt-3 border-t border-slate-100">{badge}</div>}
    </div>
  );
};
