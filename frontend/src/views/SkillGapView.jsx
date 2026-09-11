import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SkillGapView = () => {
  const { skillGaps, setCurrentScreen, showToast, t } = useApp();
  const [selectedGap, setSelectedGap] = useState(skillGaps[0]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
            {t('mandate')}
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">{t('skillGapTitle')}</h2>
          <p className="text-xs text-slate-500">
            {t('skillGapSub')}
          </p>
        </div>

        <button
          onClick={() => {
            showToast("Generating optimized learning pathway...", "info");
            setCurrentScreen('learning-path');
          }}
          className="px-4 py-2.5 bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold rounded-lg shadow-gov transition-all flex items-center space-x-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{t('learningPathTitle')}</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {t('gapMatrixTable')}
          </h3>
          <span className="text-[11px] text-slate-500">Target Role: Deputy Director (ISS Cadre)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">{t('colCompetency')}</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-center">{t('colCurrent')}</th>
                <th className="px-4 py-3 text-center">{t('colRequired')}</th>
                <th className="px-4 py-3 text-center">{t('colDeficit')}</th>
                <th className="px-4 py-3">{t('colPriority')}</th>
                <th className="px-6 py-3 text-right">{t('colAction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {skillGaps.map((gap) => {
                const isSelected = selectedGap?.id === gap.id;
                return (
                  <tr
                    key={gap.id}
                    onClick={() => setSelectedGap(gap)}
                    className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/70' : ''
                    }`}
                  >
                    <td className="px-6 py-3.5 font-bold text-slate-900">
                      {gap.competency}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{gap.category}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold">
                        {t('level')} {gap.currentLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-semibold">
                        {t('level')} {gap.requiredLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`font-bold ${gap.gap > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {gap.gap === 0 ? '✓ 0' : `-${gap.gap} ${t('level')}`}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        gap.priority === 'High'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : gap.priority === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {gap.priority === 'High' ? t('highSeverity') : gap.priority === 'Medium' ? t('mediumSeverity') : t('completed')}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGap(gap);
                        }}
                        className="text-xs font-semibold text-blue-700 hover:underline"
                      >
                        {t('viewDetails')} →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Dive: Why is this a gap? */}
      {selectedGap && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h3 className="text-sm font-bold text-slate-900">
                Gap Intelligence: {selectedGap.competency}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">ID: {selectedGap.id}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Why is this a gap? (AI RAG Evidence Analysis)
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedGap.why}
                </p>
                <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
                  <strong>Assessment Audit Trail:</strong> {selectedGap.evidence}
                </div>
              </div>

              {selectedGap.recommendedCourse && (
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-800 uppercase">Targeted Bridge Course</span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">{selectedGap.recommendedCourse}</h4>
                    <span className="text-[11px] text-slate-500">Provider: {selectedGap.provider}</span>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('learning-path')}
                    className="px-3 py-1.5 bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Start Pathway →
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Cadre Mandate Context
              </span>
              <div className="space-y-2 text-xs text-slate-600">
                <p>• Mandated in <strong>MoSPI National Training Policy 2026</strong>.</p>
                <p>• Required for automated microdata validation in NSS 79th Round.</p>
                <p>• Recommended completion within <strong>60 days</strong> of assessment.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
