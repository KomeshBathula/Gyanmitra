import React from 'react';
import { useApp } from '../context/AppContext';

export const AdminDashboardView = () => {
  const {
    adminOrgData,
    adminDepartment,
    adminDepartmentsConfig,
    generatedQuizzes,
    setCurrentScreen
  } = useApp();

  const activeDept = adminDepartmentsConfig?.find(d => d.id === adminDepartment) || adminDepartmentsConfig?.[0];

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12 text-[#1F2933]">

      {/* Page Header */}
      <div className="bg-white border border-[#D5DCE3] rounded p-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
                Command Center
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#F5F7F9] text-[#5B6773] border border-[#D5DCE3]">
                {activeDept?.name}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#0B3A63]">
              Cadre Competency Intelligence & Governance
            </h2>
            <p className="text-xs text-[#5B6773] mt-0.5">
              Monitoring <strong className="text-[#1F2933]">{activeDept?.totalLearners}</strong> officers in {activeDept?.name}. Aligned with Mission Karmayogi Annual Capacity Building Plans.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setCurrentScreen('admin-quiz-studio')}
              className="px-4 py-2 bg-[#0B3A63] hover:bg-[#12304A] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              Assessment Studio
            </button>
            <button
              onClick={() => setCurrentScreen('admin-learners')}
              className="px-4 py-2 bg-[#F5F7F9] hover:bg-[#EEF2F5] text-[#1F2933] border border-[#D5DCE3] text-xs font-medium rounded transition-colors cursor-pointer"
            >
              Learner Directory
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary Table */}
      <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[#D5DCE3]">
          <div className="p-4">
            <p className="text-[10px] font-semibold text-[#5B6773] uppercase tracking-wider">Cadre Strength</p>
            <h3 className="text-2xl font-bold text-[#0B3A63] mt-1">{activeDept?.totalLearners}</h3>
            <p className="text-[11px] text-[#5B6773] mt-1">{activeDept?.badge}</p>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-semibold text-[#5B6773] uppercase tracking-wider">Average Competency</p>
            <h3 className="text-2xl font-bold text-[#2E7D32] mt-1">{activeDept?.avgCompetency}%</h3>
            <p className="text-[11px] text-[#2E7D32] font-semibold mt-1">↑ +6.2% YOY Growth</p>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-semibold text-[#5B6773] uppercase tracking-wider">Critical Skill Gaps</p>
            <h3 className="text-2xl font-bold text-[#B42318] mt-1">{activeDept?.criticalGaps} Areas</h3>
            <p className="text-[11px] text-[#5B6773] mt-1 truncate">{activeDept?.topFocus}</p>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-semibold text-[#5B6773] uppercase tracking-wider">ACBP Certification</p>
            <h3 className="text-2xl font-bold text-[#0B3A63] mt-1">{activeDept?.complianceRate}</h3>
            <p className="text-[11px] text-[#5B6773] mt-1">Mission Karmayogi Compliant</p>
          </div>
        </div>
      </div>

      {/* 2-Column Admin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left: Live Assessments + Skill Deficits */}
        <div className="lg:col-span-2 space-y-5">

          {/* Live Quizzes */}
          <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5] flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">
                  Live Assessments ({generatedQuizzes.length})
                </h3>
                <p className="text-[10px] text-[#5B6773] mt-0.5">Published to learner dashboards</p>
              </div>
              <button
                onClick={() => setCurrentScreen('admin-quiz-studio')}
                className="text-xs font-semibold text-[#0B3A63] hover:underline cursor-pointer"
              >
                + Create New
              </button>
            </div>

            <div className="divide-y divide-[#D5DCE3]">
              {generatedQuizzes.slice(0, 3).map((quiz) => (
                <div key={quiz.id} className="px-4 py-3 flex items-center justify-between gap-4 hover:bg-[#F5F7F9]">
                  <div className="space-y-0.5 truncate">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
                        {quiz.difficulty || 'Medium'}
                      </span>
                      <span className="text-[10px] text-[#5B6773]">
                        {quiz.questions?.length || 5} Questions
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-[#1F2933] truncate">{quiz.title}</h4>
                    <p className="text-[11px] text-[#5B6773] truncate">Source: {quiz.documentName || 'Official Document'}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-green-50 text-[#2E7D32] border border-green-200 flex-shrink-0">
                    Live
                  </span>
                </div>
              ))}
              {generatedQuizzes.length === 0 && (
                <div className="p-6 text-center text-xs text-[#5B6773]">No assessments published yet.</div>
              )}
            </div>
          </div>

          {/* Workforce Skill Deficits */}
          <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5]">
              <h3 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">
                Workforce Skill Deficits — {activeDept?.name}
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {adminOrgData.workforceSkillGaps.map((item, idx) => (
                <div key={idx} className="p-3 border border-[#D5DCE3] rounded bg-[#F5F7F9] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1F2933]">{item.skill}</span>
                    <span className="font-semibold text-[#B42318]">{item.gapPercentage}% Deficit ({item.affectedCount} Officers)</span>
                  </div>
                  <div className="w-full bg-[#D5DCE3] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${item.gapPercentage > 35 ? 'bg-[#B42318]' : 'bg-[#B7791F]'}`}
                      style={{ width: `${item.gapPercentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Actions + Cadre Overview */}
        <div className="space-y-5">

          {/* Administrative Actions */}
          <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5]">
              <h4 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">Administrative Actions</h4>
            </div>
            <div className="divide-y divide-[#D5DCE3]">
              {[
                { screen: 'admin-quiz-studio', label: 'Upload Material & Generate Quiz', sub: 'Curriculum & Assessment Studio' },
                { screen: 'admin-learners', label: 'Learner Directory', sub: 'Inspect & Mandate Modules' },
                { screen: 'admin-analytics', label: 'Cadre Analytics', sub: 'Civil vs Municipal vs MoSPI' },
                { screen: 'admin-assessments', label: 'Assessments & Policy Audits', sub: 'Pass Rates & Audit Logs' }
              ].map((action) => (
                <button
                  key={action.screen}
                  onClick={() => setCurrentScreen(action.screen)}
                  className="w-full px-4 py-3 text-left hover:bg-[#EEF2F5] transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#1F2933] group-hover:text-[#0B3A63]">{action.label}</p>
                    <p className="text-[10px] text-[#5B6773] mt-0.5">{action.sub}</p>
                  </div>
                  <span className="text-[#0B3A63] text-sm">›</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cadre Overview */}
          <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
            <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5]">
              <h4 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">Cadre Overview</h4>
            </div>
            <div className="divide-y divide-[#D5DCE3]">
              {adminDepartmentsConfig?.map((d) => (
                <div key={d.id} className="px-4 py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#1F2933]">{d.name.split('&')[0]}</p>
                    <p className="text-[10px] text-[#5B6773]">{d.totalLearners} Officers</p>
                  </div>
                  <span className="font-bold text-[#2E7D32]">{d.avgCompetency}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
