import React, { useState } from 'react';
import { Award, CheckCircle2, TrendingUp, AlertCircle, ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CompetenciesView = () => {
  const { competencyOverview, skillGaps, setCurrentScreen, t } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const detailedSkills = [
    { fracId: "FRAC: DOM-STAT-01", name: "Survey Sampling & Multi-Stage Design", category: "Domain (Statistical)", score: 94, level: "Level 4 (Expert)", status: "Benchmark Achieved", benchmark: 85 },
    { fracId: "FRAC: DOM-STAT-02", name: "National Accounts Statistics (SNA 2008)", category: "Domain (Statistical)", score: 86, level: "Level 4 (Expert)", status: "Benchmark Achieved", benchmark: 80 },
    { fracId: "FRAC: DOM-STAT-03", name: "Consumer Price Index (CPI) Compilation", category: "Domain (Statistical)", score: 88, level: "Level 4 (Expert)", status: "Benchmark Achieved", benchmark: 80 },
    { fracId: "FRAC: DOM-STAT-04", name: "Small Area Estimation (SAE)", category: "Domain (Statistical)", score: 62, level: "Level 2 (Applied)", status: "Gap (Needs Level 3)", benchmark: 75 },
    { fracId: "FRAC: FUNC-PY-01", name: "Python for Official Microdata Processing", category: "Functional (Technical)", score: 58, level: "Level 2 (Applied)", status: "Critical Gap (Needs Level 4)", benchmark: 80 },
    { fracId: "FRAC: FUNC-ML-02", name: "Machine Learning & Imputation Models", category: "Functional (Technical)", score: 40, level: "Level 1 (Foundation)", status: "Critical Gap (Needs Level 3)", benchmark: 75 },
    { fracId: "FRAC: FUNC-DB-03", name: "SQL & Relational Databases for Surveys", category: "Functional (Technical)", score: 88, level: "Level 3 (Proficient)", status: "Benchmark Achieved", benchmark: 80 },
    { fracId: "FRAC: FUNC-BI-04", name: "Data Visualization & Executive BI Dashboards", category: "Functional (Technical)", score: 68, level: "Level 2 (Applied)", status: "Gap (Needs Level 3)", benchmark: 80 },
    { fracId: "FRAC: DOM-GOV-01", name: "Digital Personal Data Protection (DPDP Act)", category: "Domain (Governance)", score: 70, level: "Level 2 (Applied)", status: "Gap (Needs Level 3)", benchmark: 80 },
    { fracId: "FRAC: DOM-GOV-02", name: "Statistical Disclosure Control (SDC)", category: "Domain (Governance)", score: 76, level: "Level 3 (Proficient)", status: "Benchmark Achieved", benchmark: 75 },
    { fracId: "FRAC: BEH-LEAD-01", name: "Survey Field Supervision & Quality QA", category: "Behavioral", score: 84, level: "Level 4 (Expert)", status: "Benchmark Achieved", benchmark: 80 },
    { fracId: "FRAC: BEH-COMM-02", name: "Inter-Ministerial Statistical Coordination", category: "Behavioral", score: 75, level: "Level 3 (Proficient)", status: "Benchmark Achieved", benchmark: 75 }
  ];

  const filtered = detailedSkills.filter(s => {
    if (activeCategory === 'all') return true;
    return s.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
                FRAC • Competency Hub
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                Mission Karmayogi
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-[#1B365D] mt-2">{t('competenciesTitle')} (FRAC Framework)</h2>
            <p className="text-xs text-slate-500">
              {t('competenciesSub')}
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen('assessment')}
            className="px-4 py-2 bg-[#1B365D] hover:bg-[#152c4d] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {t('takeAssessmentBtn')}
          </button>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          {(competencyOverview?.categories || []).map((c) => (
            <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">{c.name}</span>
              <p className="text-xl font-black text-slate-900 mt-0.5">{c.score}%</p>
              <span className="text-[10px] text-slate-400">{t('targetScore')}: {c.target}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'all', label: t('filterAll') },
          { id: 'domain', label: 'Domain (Statistical & Gov)' },
          { id: 'functional', label: 'Functional (Technical)' },
          { id: 'behavioral', label: 'Behavioral / नेतृत्व' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-[#1B365D] text-white shadow-sm'
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
            <div key={idx} className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                    {skill.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isGap ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {skill.status}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400">{skill.fracId}</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{skill.name}</h3>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Proficiency: <strong className="text-slate-800">{skill.level} ({skill.score}%)</strong></span>
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
                  <span className="text-[11px] text-slate-500">iGOT Bridge Module Available</span>
                  <button
                    onClick={() => setCurrentScreen('skill-gaps')}
                    className="text-xs font-bold text-[#264092] hover:underline cursor-pointer"
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

