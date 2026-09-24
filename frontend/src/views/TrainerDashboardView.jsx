import React, { useState } from 'react';
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
    <div className="space-y-5 max-w-6xl mx-auto pb-12 text-[#1F2933]">
      {/* Top Banner */}
      <div className="bg-white border border-[#D5DCE3] rounded p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#2E7D32] border border-[#D5DCE3]">
              NSSTA Greater Noida Faculty Portal
            </span>
            <span className="text-xs text-[#5B6773]">Authorized Trainer</span>
          </div>
          <h2 className="text-lg font-bold text-[#0B3A63] mt-1.5">
            Trainer Studio & Cohort Skill Intelligence
          </h2>
          <p className="text-xs text-[#5B6773] mt-0.5">
            Monitor probationer cohorts, identify common skill deficits, and author/review AI-generated assessments.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('authoring')}
          className="px-4 py-2 bg-[#2E7D32] hover:bg-green-800 text-white text-xs font-semibold rounded transition-colors cursor-pointer flex-shrink-0"
        >
          + AI Assessment Studio
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-[#D5DCE3] overflow-x-auto">
        {[
          { id: 'overview', label: 'Cohort Overview & Skill Gaps' },
          { id: 'authoring', label: 'AI Assessment Authoring Studio' },
          { id: 'learners', label: 'Trainee Officer Roster (48 Officers)' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 text-xs font-medium transition-all cursor-pointer whitespace-nowrap border-b-2 -mb-px ${
              activeTab === t.id
                ? 'border-[#0B3A63] text-[#0B3A63] font-semibold'
                : 'border-transparent text-[#5B6773] hover:text-[#1F2933]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* KPI Summary */}
          <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[#D5DCE3]">
              <div className="p-4">
                <p className="text-[10px] font-semibold text-[#5B6773] uppercase">Total Officers in Batch</p>
                <h3 className="text-2xl font-bold text-[#0B3A63] mt-1">{trainerBatchData.totalTrainees}</h3>
                <p className="text-[11px] text-[#5B6773] mt-1">ISS 2026 Probationers</p>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-semibold text-[#5B6773] uppercase">Average Cohort Competency</p>
                <h3 className="text-2xl font-bold text-[#0B3A63] mt-1">{trainerBatchData.averageCompetency}</h3>
                <p className="text-[11px] text-[#2E7D32] font-semibold mt-1">↑ +4.2% since induction</p>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-semibold text-[#5B6773] uppercase">Active Learners</p>
                <h3 className="text-2xl font-bold text-[#2E7D32] mt-1">{trainerBatchData.activeLearners}</h3>
                <p className="text-[11px] text-[#5B6773] mt-1">91.6% Daily Attendance</p>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-semibold text-[#5B6773] uppercase">Assessments Evaluated</p>
                <h3 className="text-2xl font-bold text-[#0B3A63] mt-1">{trainerBatchData.assessmentsCompleted}</h3>
                <p className="text-[11px] text-[#5B6773] mt-1">14 Published Modules</p>
              </div>
            </div>
          </div>

          {/* Top Skill Gaps */}
          <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5]">
              <h3 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">
                Top Identified Skill Deficits in Current Batch
              </h3>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainerBatchData.topSkillGaps.map((gap, gIdx) => (
                <div key={gIdx} className="p-3 border border-[#D5DCE3] rounded bg-[#F5F7F9] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-[#1F2933]">{gap.skill}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      gap.severity === 'High'
                        ? 'bg-red-50 text-[#B42318] border-red-200'
                        : 'bg-amber-50 text-[#B7791F] border-amber-200'
                    }`}>
                      {gap.severity} Deficit
                    </span>
                  </div>
                  <p className="text-xs text-[#5B6773]">{gap.percentage}</p>
                  <button
                    onClick={() => {
                      setActiveTab('authoring');
                      showToast(`AI MCQ Generator seeded for: ${gap.skill}`, "info");
                    }}
                    className="text-xs font-semibold text-[#0B3A63] hover:underline cursor-pointer"
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
        <div className="bg-white border border-[#D5DCE3] rounded p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-[#D5DCE3] gap-3">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
                Faculty Review Mode
              </span>
              <h3 className="text-sm font-bold text-[#1F2933] mt-1.5">
                Review & Publish AI-Generated Assessment
              </h3>
              <p className="text-xs text-[#5B6773]">
                Authorized faculty must verify and edit AI-synthesized questions before releasing to the cohort.
              </p>
            </div>

            <button
              onClick={() => setShowPublishModal(true)}
              className="px-4 py-2 bg-[#2E7D32] hover:bg-green-800 text-white text-xs font-semibold rounded cursor-pointer flex-shrink-0"
            >
              Publish to Batch 2026 (48 Officers)
            </button>
          </div>

          <div className="space-y-3">
            {reviewQuestions.map((q, idx) => (
              <div key={q.id} className="p-3 border border-[#D5DCE3] rounded bg-[#F5F7F9] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1F2933]">Question {idx + 1}</span>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#5B6773] border border-[#D5DCE3]">
                      {q.status}
                    </span>
                    <button
                      onClick={() => {
                        const updated = [...reviewQuestions];
                        updated[idx].verified = !updated[idx].verified;
                        setReviewQuestions(updated);
                        showToast(`Question ${idx + 1} verification updated.`, "info");
                      }}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border cursor-pointer ${
                        q.verified
                          ? 'bg-green-50 text-[#2E7D32] border-green-200'
                          : 'bg-amber-50 text-[#B7791F] border-amber-200'
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
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5DCE3] rounded focus:ring-1 focus:ring-[#0B3A63] focus:outline-none text-[#1F2933]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'learners' && (
        <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
          <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5]">
            <h3 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">
              Trainee Officers Roster
            </h3>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EEF2F5] text-[#1F2933] font-semibold border-b border-[#D5DCE3]">
              <tr>
                <th className="px-4 py-3">Officer Name</th>
                <th className="px-4 py-3">Role / Division</th>
                <th className="px-4 py-3 text-center">Learning Progress</th>
                <th className="px-4 py-3 text-center">Competency Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D5DCE3]">
              {trainerBatchData.traineeList.map((t) => (
                <tr key={t.id} className="hover:bg-[#F5F7F9] transition-colors">
                  <td className="px-4 py-3 font-semibold text-[#1F2933]">{t.name}</td>
                  <td className="px-4 py-3 text-[#5B6773]">{t.role}</td>
                  <td className="px-4 py-3 text-center font-semibold text-[#0B3A63]">{t.progress}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded border border-[#D5DCE3] bg-[#EEF2F5] font-semibold text-[#1F2933]">
                      {t.competencyScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      t.status === 'Active'
                        ? 'bg-green-50 text-[#2E7D32] border-green-200'
                        : 'bg-amber-50 text-[#B7791F] border-amber-200'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#5B6773] text-[11px]">{t.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-[#D5DCE3] max-w-md w-full p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-[#1F2933]">Publish Assessment to Batch 2026?</h3>
            <p className="text-xs text-[#5B6773] leading-relaxed">
              This will notify all 48 enrolled officers. Questions are verified and source-grounded in MoSPI manuals.
            </p>
            <div className="pt-3 border-t border-[#D5DCE3] flex items-center justify-end space-x-2">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 text-xs font-medium text-[#5B6773] hover:bg-[#EEF2F5] rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishAssessment}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2E7D32] hover:bg-green-800 rounded transition-colors cursor-pointer"
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

