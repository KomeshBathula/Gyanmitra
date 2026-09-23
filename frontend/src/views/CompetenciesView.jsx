import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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

  const filterTabs = [
    { id: 'all', label: t('filterAll') },
    { id: 'domain', label: 'Domain (Statistical & Gov)' },
    { id: 'functional', label: 'Functional (Technical)' },
    { id: 'behavioral', label: 'Behavioral' }
  ];

  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-12 text-[#1F2933]">

      {/* Page Header */}
      <div className="bg-white border border-[#D5DCE3] rounded p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
                FRAC · Competency Hub
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#2E7D32] border border-[#D5DCE3]">
                Mission Karmayogi
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#0B3A63]">{t('competenciesTitle')} (FRAC Framework)</h2>
            <p className="text-xs text-[#5B6773] mt-0.5">{t('competenciesSub')}</p>
          </div>
          <button
            onClick={() => setCurrentScreen('assessment')}
            className="px-4 py-2 bg-[#0B3A63] hover:bg-[#12304A] text-white text-xs font-semibold rounded transition-colors cursor-pointer flex-shrink-0"
          >
            {t('takeAssessmentBtn')}
          </button>
        </div>

        {/* Category Score Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#D5DCE3]">
          {(competencyOverview?.categories || []).map((c) => (
            <div key={c.id} className="p-3 border border-[#D5DCE3] rounded bg-[#F5F7F9] text-center">
              <span className="text-[10px] text-[#5B6773] font-semibold uppercase block">{c.name}</span>
              <p className="text-xl font-bold text-[#0B3A63] mt-0.5">{c.score}%</p>
              <span className="text-[10px] text-[#5B6773]">{t('targetScore')}: {c.target}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 border-b border-[#D5DCE3] overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 text-xs font-medium transition-all cursor-pointer whitespace-nowrap border-b-2 -mb-px ${
              activeCategory === tab.id
                ? 'border-[#0B3A63] text-[#0B3A63] font-semibold'
                : 'border-transparent text-[#5B6773] hover:text-[#1F2933]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skills Table */}
      <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#EEF2F5] text-[#1F2933] font-semibold border-b border-[#D5DCE3]">
            <tr>
              <th className="px-4 py-3">Competency</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Level & Score</th>
              <th className="px-4 py-3">Benchmark</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D5DCE3]">
            {filtered.map((skill, idx) => {
              const isGap = skill.status.includes('Gap');
              return (
                <tr key={idx} className="hover:bg-[#F5F7F9] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#1F2933]">{skill.name}</p>
                    <p className="text-[10px] font-mono text-[#5B6773] mt-0.5">{skill.fracId}</p>
                  </td>
                  <td className="px-4 py-3 text-[#5B6773]">{skill.category}</td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="font-semibold text-[#1F2933]">{skill.level}</span>
                      <span className="text-[#5B6773] ml-1">({skill.score}%)</span>
                    </div>
                    <div className="mt-1 w-24 bg-[#D5DCE3] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${skill.score >= skill.benchmark ? 'bg-[#2E7D32]' : 'bg-[#B7791F]'}`}
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#5B6773]">{skill.benchmark}%</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      isGap
                        ? 'bg-amber-50 text-[#B7791F] border-amber-200'
                        : 'bg-green-50 text-[#2E7D32] border-green-200'
                    }`}>
                      {skill.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isGap && (
                      <button
                        onClick={() => setCurrentScreen('skill-gaps')}
                        className="text-xs font-semibold text-[#0B3A63] hover:underline cursor-pointer"
                      >
                        View Gap →
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
