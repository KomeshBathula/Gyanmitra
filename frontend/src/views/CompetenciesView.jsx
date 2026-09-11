import React, { useState } from 'react';
import { Award, CheckCircle2, TrendingUp, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CompetenciesView = () => {
  const { competencyOverview, skillGaps, setCurrentScreen, t } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const detailedSkills = [
    { name: "Survey Sampling & Multi-Stage Design", category: "Statistical", score: 94, level: "Level 4", status: "Benchmark Achieved", benchmark: 85 },
    { name: "National Accounts Statistics (SNA 2008)", category: "Statistical", score: 86, level: "Level 4", status: "Benchmark Achieved", benchmark: 80 },
    { name: "Consumer Price Index (CPI) Compilation", category: "Statistical", score: 88, level: "Level 4", status: "Benchmark Achieved", benchmark: 80 },
    { name: "Small Area Estimation (SAE)", category: "Statistical", score: 62, level: "Level 2", status: "Gap (Needs Level 3)", benchmark: 75 },
    { name: "Python for Official Microdata", category: "Technical", score: 58, level: "Level 2", status: "Critical Gap (Needs Level 4)", benchmark: 80 },
    { name: "Machine Learning & Imputation", category: "Technical", score: 40, level: "Level 1", status: "Critical Gap (Needs Level 3)", benchmark: 75 },
    { name: "SQL & Relational Databases", category: "Technical", score: 88, level: "Level 3", status: "Benchmark Achieved", benchmark: 80 },
    { name: "Data Visualization & Executive BI", category: "Technical", score: 68, level: "Level 2", status: "Gap (Needs Level 3)", benchmark: 80 },
    { name: "Digital Personal Data Protection (DPDP)", category: "Digital Governance", score: 70, level: "Level 2", status: "Gap (Needs Level 3)", benchmark: 80 },
    { name: "Statistical Disclosure Control (SDC)", category: "Digital Governance", score: 76, level: "Level 3", status: "Benchmark Achieved", benchmark: 75 },
    { name: "Survey Team Supervision & Quality QA", category: "Behavioural", score: 84, level: "Level 4", status: "Benchmark Achieved", benchmark: 80 },
    { name: "Inter-Ministerial Statistical Coordination", category: "Behavioural", score: 75, level: "Level 3", status: "Benchmark Achieved", benchmark: 75 }
  ];

  const filtered = detailedSkills.filter(s => {
    if (activeCategory === 'all') return true;
    return s.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              {t('verifiedVia')}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{t('competenciesTitle')}</h2>
            <p className="text-xs text-slate-500">
              {t('competenciesSub')}
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen('assessment')}
            className="px-4 py-2 bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold rounded-lg shadow-gov transition-all"
          >
            {t('takeAssessmentBtn')}
          </button>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          {competencyOverview.categories.map((c) => (
            <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">{c.name}</span>
              <p className="text-xl font-black text-slate-900 mt-0.5">{c.score}%</p>
              <span className="text-[10px] text-slate-400">{t('targetScore')}: {c.target}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2">
        {[
          { id: 'all', label: t('filterAll') },
          { id: 'statistical', label: t('filterStatistical') },
          { id: 'technical', label: t('filterTechnical') },
          { id: 'digital governance', label: t('filterGovernance') },
          { id: 'behavioural', label: 'Behavioural / नेतृत्व' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeCategory === tab.id
                ? 'bg-gov-blue text-white shadow-gov'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((skill, idx) => {
          const isGap = skill.status.includes('Gap');
          return (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                    {skill.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isGap ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {skill.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{skill.name}</h3>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Demonstrated: <strong>{skill.level} ({skill.score}%)</strong></span>
                  <span>Benchmark: {skill.benchmark}%</span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${
                      skill.score >= skill.benchmark ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
              </div>

              {isGap && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Bridge course available</span>
                  <button
                    onClick={() => setCurrentScreen('skill-gaps')}
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    View Gap Details →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
