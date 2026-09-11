import React, { useState } from 'react';
import { Users, Sparkles, CheckCircle2, Award, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrainerDashboardView = () => {
  const { trainerBatchData, setCurrentScreen, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'authoring', 'learners'
  const [showPublishModal, setShowPublishModal] = useState(false);

  // Review & Authoring Studio Mock Questions
  const [reviewQuestions, setReviewQuestions] = useState([
    {
      id: 1,
      question: "What is the formula for calculating the Sampling Variance in a two-stage stratified design with unequal cluster sizes?",
      status: "AI Generated",
      verified: true
    },
    {
      id: 2,
      question: "Which Python package is mandated by MoSPI DQAD for unit-level multiplier verification?",
      status: "AI Generated",
      verified: true
    },
    {
      id: 3,
      question: "Explain the distinction between Gross Value Added (GVA) at basic prices vs factor cost.",
      status: "AI Generated",
      verified: false
    }
  ]);

  const handlePublishAssessment = () => {
    setShowPublishModal(false);
    showToast("Assessment published to Batch 2026 (48 Officers) successfully!", "success");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              NSSTA Greater Noida Faculty Portal
            </span>
            <span className="text-xs text-slate-400">Authorized Trainer</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Trainer Studio & Cohort Skill Intelligence
          </h2>
          <p className="text-xs text-slate-500">
            Monitor probationer cohorts, identify common skill deficits, and author/review AI-generated assessments.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('authoring')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-gov transition-all"
          >
            + AI Assessment Studio
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2">
        {[
          { id: 'overview', label: 'Cohort Overview & Skill Gaps' },
          { id: 'authoring', label: 'AI Assessment Authoring Studio (Review & Publish)' },
          { id: 'learners', label: 'Trainee Officer Roster (48 Officers)' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === t.id
                ? 'bg-gov-blue text-white shadow-gov'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
              <span className="text-xs font-semibold text-slate-500 uppercase">Total Officers in Batch</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{trainerBatchData.totalTrainees}</h3>
              <p className="text-[11px] text-slate-500 mt-1">ISS 2026 Probationers</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
              <span className="text-xs font-semibold text-slate-500 uppercase">Average Cohort Competency</span>
              <h3 className="text-2xl font-black text-blue-700 mt-1">{trainerBatchData.averageCompetency}</h3>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">↑ +4.2% since induction</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active Learners</span>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">{trainerBatchData.activeLearners}</h3>
              <p className="text-[11px] text-slate-500 mt-1">91.6% Daily Attendance</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
              <span className="text-xs font-semibold text-slate-500 uppercase">Assessments Evaluated</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{trainerBatchData.assessmentsCompleted}</h3>
              <p className="text-[11px] text-slate-500 mt-1">14 Published Modules</p>
            </div>
          </div>

          {/* Top Skill Gaps Among Cohort */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Top Identified Skill Deficits in Current Batch
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainerBatchData.topSkillGaps.map((gap, gIdx) => (
                <div key={gIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{gap.skill}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      gap.severity === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {gap.severity} Deficit
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{gap.percentage}</p>
                  <button
                    onClick={() => {
                      setActiveTab('authoring');
                      showToast(`AI MCQ Generator seeded for: ${gap.skill}`, "info");
                    }}
                    className="text-xs font-bold text-blue-700 hover:underline pt-1 block"
                  >
                    + Generate Remedial Assessment with AI →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'authoring' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
            <div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">
                Faculty Review Mode
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Review & Publish AI-Generated Assessment
              </h3>
              <p className="text-xs text-slate-500">
                Authorized faculty must verify and edit AI-synthesized questions before releasing to the cohort.
              </p>
            </div>

            <button
              onClick={() => setShowPublishModal(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-gov"
            >
              Publish to Batch 2026 (48 Officers)
            </button>
          </div>

          <div className="space-y-4">
            {reviewQuestions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Question {idx + 1}</span>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-semibold border border-purple-200">
                      {q.status}
                    </span>
                    <button
                      onClick={() => {
                        const updated = [...reviewQuestions];
                        updated[idx].verified = !updated[idx].verified;
                        setReviewQuestions(updated);
                        showToast(`Question ${idx + 1} verification updated.`, "info");
                      }}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                        q.verified
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      {q.verified ? '✓ Faculty Approved' : 'Needs Verification'}
                    </button>
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={q.question}
                  onChange={(e) => {
                    const updated = [...reviewQuestions];
                    updated[idx].question = e.target.value;
                    setReviewQuestions(updated);
                  }}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600 text-slate-800 font-medium"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'learners' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Trainee Officers Roster
            </h3>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Officer Name</th>
                <th className="px-4 py-3">Role / Division</th>
                <th className="px-4 py-3 text-center">Learning Progress</th>
                <th className="px-4 py-3 text-center">Competency Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trainerBatchData.traineeList.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-bold text-slate-900">{t.name}</td>
                  <td className="px-4 py-3 text-slate-600">{t.role}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-blue-700">{t.progress}%</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold">{t.competencyScore}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-[11px]">{t.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Publish Assessment to Batch 2026?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This will notify all 48 enrolled officers. Questions are verified and source-grounded in MoSPI manuals.
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishAssessment}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                Confirm & Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
