import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Layers,
  Compass,
  X,
  ShieldCheck,
  Clock,
  Award,
  FileText,
  Activity,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { INITIAL_SKILL_GAPS } from '../data/mockData';

export const SkillGapView = () => {
  const { skillGaps, setCurrentScreen, showToast, t, setLearningPathFilter } = useApp();
  const safeSkillGaps = Array.isArray(skillGaps) && skillGaps.length > 0
    ? skillGaps
    : (Array.isArray(skillGaps?.gaps) && skillGaps.gaps.length > 0
      ? skillGaps.gaps
      : INITIAL_SKILL_GAPS);

  const [selectedGap, setSelectedGap] = useState(safeSkillGaps[0] || null);
  const [apiGapDetails, setApiGapDetails] = useState(null);
  const [isLoadingGapApi, setIsLoadingGapApi] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    if (!selectedGap && safeSkillGaps.length > 0) {
      setSelectedGap(safeSkillGaps[0]);
    }
  }, [safeSkillGaps, selectedGap]);

  const handleStartLearningPathway = (gap = selectedGap || safeSkillGaps[0]) => {
    if (gap) {
      setLearningPathFilter({
        gapId: gap.id,
        competency: gap.competency,
        domain: gap.category || gap.domain || 'Core',
        priority: gap.priority,
        currentLevel: gap.currentLevel,
        targetLevel: gap.requiredLevel ?? gap.targetLevel ?? 3,
        recommendedCourse: gap.recommendedCourse
      });
      showToast(`Activated focused pathway for ${gap.competency}`, "info");
    }
    setCurrentScreen('learning-path');
  };

  // Fetch gap intelligence from API when "View Details" is clicked
  const handleViewGapDetails = async (gap) => {
    setSelectedGap(gap);
    setIsLoadingGapApi(true);
    setIsDetailModalOpen(true);

    try {
      const response = await api.getGapDetail(gap.id, {
        gap,
        syllabusModules: [
          {
            module: 1,
            title: `Foundations & Official Framework for ${gap.competency}`,
            duration: "4 Hours",
            status: "Mandatory",
            description: "Official MoSPI statistical framework guidelines and baseline principles."
          },
          {
            module: 2,
            title: `Practical Implementation & National Data Pipeline`,
            duration: "6 Hours",
            status: "Core",
            description: "Hands-on exercises with survey microdata validation, imputation and quality audits."
          },
          {
            module: 3,
            title: `Advanced Governance & APAR Calibration Assessment`,
            duration: "3 Hours",
            status: "Certification",
            description: "Final proctored diagnostic assessment to certify level upgrade."
          }
        ],
        recommendedCourses: [
          {
            title: gap.recommendedCourse || `${gap.competency} Mastery for Official Statistics`,
            provider: gap.provider || "iGOT Karmayogi / NSSTA Greater Noida",
            duration: "12 Hours",
            credits: 25,
            level: "Intermediate"
          }
        ],
        cadrePolicy: {
          mandate: "MoSPI National Training Policy & FRAC 2026",
          resolutionDays: gap.priority === 'High' ? 45 : 90,
          aparWeightage: "15% of annual competency rating",
          authority: "Capacity Building Commission (CBC) & NSSTA"
        },
        auditTrail: {
          lastAssessment: "Induction Baseline Diagnostic",
          status: gap.gap > 0 ? "Under Review / Deficit Flagged" : "Benchmark Satisfied",
          verifiedBy: "GyanMitra Rule Engine & NSSTA Faculty"
        }
      });

      if (response?.data) {
        setApiGapDetails(response.data);
      }
      showToast(`Fetched live FRAC intelligence for '${gap.competency}' from MoSPI API.`, "success");
    } catch (err) {
      console.error("Failed to fetch gap details:", err);
    } finally {
      setIsLoadingGapApi(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-900 border border-red-200">
              Career & Gap Hub • FRAC
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
              ISS Deputy Director Mandate
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-[#1B365D] mt-2">{t('skillGapTitle')}</h2>
          <p className="text-xs text-slate-500">
            {t('skillGapSub')}
          </p>
        </div>

        <button
          onClick={() => handleStartLearningPathway(selectedGap || safeSkillGaps[0])}
          className="px-4 py-2.5 bg-[#1B365D] hover:bg-[#152c4d] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-[#FFA730]" />
          <span>{t('learningPathTitle')}</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-[#1B365D] uppercase tracking-wider flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-[#264092]" />
            <span>{t('gapMatrixTable')} (FRAC Analysis)</span>
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Cadre Benchmark: ISS Deputy Director</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">{t('colCompetency')}</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-center">{t('colCurrent')}</th>
                <th className="px-4 py-3 text-center">{t('colRequired')}</th>
                <th className="px-4 py-3">{t('colPriority')}</th>
                <th className="px-6 py-3 text-right">{t('colAction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {safeSkillGaps.map((gap) => {
                const isSelected = selectedGap?.id === gap.id;
                return (
                  <tr
                    key={gap.id}
                    onClick={() => handleViewGapDetails(gap)}
                    className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/80' : ''
                    }`}
                  >
                    <td className="px-6 py-3.5 font-bold text-slate-900">
                      {gap.competency}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{gap.category || gap.domain || 'Statistical'}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-semibold border border-slate-200">
                        {t('level')} {gap.currentLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold border border-blue-200">
                        {t('level')} {gap.requiredLevel ?? gap.targetLevel ?? 3}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
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
                          handleViewGapDetails(gap);
                        }}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1B365D] hover:bg-[#152c4d] text-white text-xs font-bold transition-all shadow-xs hover:shadow cursor-pointer"
                      >
                        <span>{t('viewDetails', 'View Details')}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Dive: In-page Gap Intelligence Panel */}
      {selectedGap && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#264092]"></span>
              <h3 className="text-sm font-extrabold text-[#1B365D]">
                FRAC Gap Intelligence: {selectedGap.competency}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
                REST API: /api/competencies/gap/{selectedGap.id}
              </span>
              <button
                onClick={() => handleViewGapDetails(selectedGap)}
                className="text-xs text-[#264092] hover:underline font-bold cursor-pointer"
              >
                Expand Details ↗
              </button>
            </div>
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
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-900 uppercase">Targeted iGOT Bridge Course</span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">{selectedGap.recommendedCourse}</h4>
                    <span className="text-[11px] text-slate-500">Provider: {selectedGap.provider}</span>
                  </div>
                  <button
                    onClick={() => handleStartLearningPathway(selectedGap)}
                    className="px-3.5 py-1.5 bg-[#1B365D] hover:bg-[#152c4d] text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
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

      {/* Interactive Competency Details Modal (Opens upon clicking "View Details") */}
      {isDetailModalOpen && selectedGap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B365D] flex items-center justify-center text-amber-400 font-bold shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                      {selectedGap.category || 'Technical'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">FRAC ID: {selectedGap.id}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-[#1B365D] mt-0.5">
                    {selectedGap.competency}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Level Benchmark Bar */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-600 block">Demonstrated Current Level</span>
                  <span className="text-sm font-extrabold text-slate-900">Level {selectedGap.currentLevel} / 5</span>
                </div>
                <div className="text-center">
                  <ArrowRight className="w-5 h-5 text-blue-600 mx-auto" />
                  <span className="text-[10px] font-bold text-blue-700">Target Benchmark</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-blue-800 block">Cadre Mandated Level</span>
                  <span className="text-sm font-extrabold text-blue-900">Level {selectedGap.requiredLevel ?? selectedGap.targetLevel ?? 3} / 5</span>
                </div>
              </div>

              {/* AI Diagnostic RAG Analysis */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>AI Assessment Diagnostic & Evidence</span>
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {selectedGap.why}
                  </p>
                  <p className="text-slate-500 pt-2 border-t border-slate-200/80 text-[11px]">
                    <strong>Audit Verification Record:</strong> {selectedGap.evidence}
                  </p>
                </div>
              </div>

              {/* Recommended Bridge Syllabus Modules */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Mandated Bridge Learning Modules (Live API)</span>
                </h4>
                <div className="space-y-2">
                  {(apiGapDetails?.syllabusModules || [
                    {
                      module: 1,
                      title: `Foundations & Official Framework for ${selectedGap.competency}`,
                      duration: "4 Hours",
                      status: "Mandatory",
                      description: "Official MoSPI statistical framework guidelines and baseline principles."
                    },
                    {
                      module: 2,
                      title: `Practical Implementation & National Data Pipeline`,
                      duration: "6 Hours",
                      status: "Core",
                      description: "Hands-on exercises with survey microdata validation, imputation and quality audits."
                    },
                    {
                      module: 3,
                      title: `Advanced Governance & APAR Calibration Assessment`,
                      duration: "3 Hours",
                      status: "Certification",
                      description: "Final proctored diagnostic assessment to certify level upgrade."
                    }
                  ]).map((mod) => (
                    <div key={mod.module} className="p-3 rounded-xl bg-white border border-slate-200 flex items-start space-x-3 shadow-2xs">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {mod.module}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-slate-900">{mod.title}</h5>
                          <span className="text-[10px] font-mono text-slate-500">{mod.duration}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{mod.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cadre Policy & APAR Compliance */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
                <span className="text-[11px] font-bold text-amber-900 flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>National Capacity Building Commission (CBC) Mandate</span>
                </span>
                <p className="text-amber-950 text-[11px]">
                  • Policy: <strong>MoSPI National Training Policy & FRAC 2026</strong>.
                  <br />• Recommended resolution window: <strong>{selectedGap.priority === 'High' ? '45' : '60'} Calendar Days</strong>.
                  <br />• Successful course certification directly impacts annual <strong>APAR Competency Calibration</strong>.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Course Provider: <strong>{selectedGap.provider || 'iGOT Karmayogi Bharat'}</strong>
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    handleStartLearningPathway(selectedGap);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1B365D] hover:bg-[#152c4d] text-white text-xs font-bold shadow-sm cursor-pointer transition-all flex items-center space-x-1.5"
                >
                  <span>Start Learning Pathway</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


