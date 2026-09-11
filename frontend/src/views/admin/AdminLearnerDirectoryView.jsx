import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Eye,
  PlusCircle,
  X,
  Sparkles,
  Shield,
  Zap,
  Clock,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLearnerDirectoryView = () => {
  const {
    adminLearners,
    adminDepartment,
    assignProgramToLearner,
    showToast
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedProgramToAssign, setSelectedProgramToAssign] = useState('MoSPI NSS 79th Round: Sampling & Estimation Protocol');

  // Filter learners based on search & department
  const filteredLearners = adminLearners.filter(lrn => {
    const matchesSearch =
      lrn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lrn.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lrn.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lrn.cadre.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      selectedDeptFilter === 'all' || lrn.departmentId === selectedDeptFilter;

    return matchesSearch && matchesDept;
  });

  const availablePrograms = [
    "MoSPI NSS 79th Round: Sampling & Estimation Protocol",
    "Python for Official Statistics & Microdata Processing",
    "Municipal GIS Spatial Asset Mapping & Survey Compliance",
    "DPDP Act 2023: Citizen Data Privacy & Statistical Disclosure Control",
    "National Accounts Statistics: Corporate MCA-21 Integration"
  ];

  const handleConfirmAssignment = () => {
    if (selectedLearner) {
      assignProgramToLearner(selectedLearner.id, selectedProgramToAssign);
      setIsAssignModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 text-slate-100">
      {/* Top Banner */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-900/60 text-purple-300 border border-purple-600/50">
                National Learner Governance Hub
              </span>
              <span className="text-xs text-slate-400">Civil • Municipal • Statistical • Revenue</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2">Learner Directory & Competency Passbooks</h2>
            <p className="text-xs text-slate-400 mt-1">
              Monitor individual officer progress, inspect FRAC competency radars, and mandate tailored capacity building programs.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#0B1528] border border-[#1E2E4A] text-xs text-slate-300 font-mono font-bold">
              {filteredLearners.length} Officers Listed
            </span>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Enrolled Officers</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-2xl font-black text-white mt-2">104,370</h3>
          <p className="text-[11px] text-slate-400 mt-1">Across 4 Governance Cadres</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Competency Score</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-emerald-400 mt-2">74.6%</h3>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">Level 3.7 / 5.0 National Mean</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">APAR Compliance Rate</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-2xl font-black text-purple-300 mt-2">82.4%</h3>
          <p className="text-[11px] text-slate-400 mt-1">On-Track for Annual Appraisal</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">High Risk Skill Gaps</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-amber-400 mt-2">16,420</h3>
          <p className="text-[11px] text-slate-400 mt-1">Remedial Modules Mandated</p>
        </div>
      </div>

      {/* Search & Department Filters */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Box */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Officer Name, Government ID, Cadre or Designation..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#0B1528] text-white border border-[#1E2E4A] rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Department Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Cadres' },
            { id: 'civil', label: 'Civil Admin' },
            { id: 'municipal', label: 'Municipal ULB' },
            { id: 'statistical', label: 'MoSPI Cadre' },
            { id: 'revenue', label: 'Revenue/Finance' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDeptFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDeptFilter === tab.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-[#0B1528] hover:bg-[#162544] text-slate-400 hover:text-white border border-[#1E2E4A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Learners Directory Table */}
      <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1E2E4A] bg-[#0E1B33] flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Active Registered Cadre Officers ({filteredLearners.length})
          </h3>
          <span className="text-[11px] text-slate-400">Click any row to inspect full Learner Passbook</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1528] text-slate-400 font-bold border-b border-[#1E2E4A]">
              <tr>
                <th className="px-6 py-3.5">Officer & Designation</th>
                <th className="px-4 py-3.5">Cadre / Department</th>
                <th className="px-4 py-3.5 text-center">Competency Score</th>
                <th className="px-4 py-3.5 text-center">Karma Credits</th>
                <th className="px-4 py-3.5 text-center">APAR Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E4A]/60">
              {filteredLearners.map((lrn) => (
                <tr
                  key={lrn.id}
                  className="hover:bg-[#162544]/60 transition-colors cursor-pointer group"
                  onClick={() => setSelectedLearner(lrn)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={lrn.avatar}
                        alt={lrn.name}
                        className="w-10 h-10 rounded-xl object-cover border border-purple-500/40 flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-white text-xs group-hover:text-purple-300 transition-colors">
                          {lrn.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{lrn.designation}</p>
                        <span className="text-[10px] font-mono text-slate-500">{lrn.employeeId}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-200">{lrn.cadre}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[200px]">{lrn.department}</p>
                    <span className="text-[10px] text-slate-500">📍 {lrn.location}</span>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="text-sm font-black text-emerald-400">{lrn.competencyScore}%</span>
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${lrn.competencyScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
                      ⚡ {lrn.karmaCredits} Pts
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      lrn.aparStatus.includes('Compliant') || lrn.aparStatus.includes('Exemplary')
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                    }`}>
                      {lrn.aparStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedLearner(lrn)}
                        className="p-2 rounded-xl bg-[#0B1528] hover:bg-[#1A3158] text-purple-300 hover:text-white border border-[#1E2E4A] transition-colors"
                        title="View Full Passbook"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLearner(lrn);
                          setIsAssignModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1"
                        title="Assign Course / Assessment"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Assign</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Learner Passbook Modal */}
      {selectedLearner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#0F1E36] text-slate-100 rounded-3xl border border-[#233B67] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#1E2E4A] bg-gradient-to-r from-purple-950/80 via-[#112344] to-indigo-950/80 flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedLearner.avatar}
                  alt={selectedLearner.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-400 shadow-lg"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-900 text-purple-300 border border-purple-500/50">
                      Official Learner Passbook
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{selectedLearner.employeeId}</span>
                  </div>
                  <h3 className="text-lg font-black text-white mt-1">{selectedLearner.name}</h3>
                  <p className="text-xs text-slate-300">{selectedLearner.designation} • {selectedLearner.department}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLearner(null)}
                className="w-8 h-8 rounded-full bg-[#162544] hover:bg-[#1E3A6D] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer border border-[#233B67]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Top Stats Strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Overall Score</p>
                  <p className="text-xl font-black text-emerald-400 mt-1">{selectedLearner.competencyScore}%</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Karma Points</p>
                  <p className="text-xl font-black text-amber-400 mt-1">{selectedLearner.karmaCredits}</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Active Courses</p>
                  <p className="text-xl font-black text-purple-300 mt-1">{selectedLearner.activeCoursesCount}</p>
                </div>
              </div>

              {/* Skill Gaps Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Identified FRAC Competency Gaps ({selectedLearner.skillGaps?.length || 0})
                </h4>
                <div className="space-y-2">
                  {selectedLearner.skillGaps?.map((gap, gIdx) => (
                    <div key={gIdx} className="p-3 rounded-xl bg-[#0B1528] border border-[#1E2E4A] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">{gap.name}</p>
                        <p className="text-[11px] text-slate-400">Current Level {gap.current} → Target Level {gap.target}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        gap.priority === 'High'
                          ? 'bg-rose-950 text-rose-300 border border-rose-600/50'
                          : 'bg-amber-950 text-amber-300 border border-amber-600/50'
                      }`}>
                        {gap.priority} Priority Gap
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action: Mandate / Assign Program */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Need to close gaps for this officer?</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">Assign a certified iGOT / NSSTA learning module directly to their portal.</p>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Assign Program</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Program Assignment Sub-Modal */}
      {isAssignModalOpen && selectedLearner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0F1E36] text-slate-100 rounded-3xl border border-[#233B67] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1E2E4A] pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Assign Training Program</h3>
                <p className="text-xs text-slate-400">Target Officer: <strong className="text-white">{selectedLearner.name}</strong></p>
              </div>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Select iGOT / NSSTA Certified Module:</label>
              <select
                value={selectedProgramToAssign}
                onChange={(e) => setSelectedProgramToAssign(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#0B1528] text-white border border-[#1E2E4A] rounded-xl focus:ring-1 focus:ring-purple-500"
              >
                {availablePrograms.map((prog, pIdx) => (
                  <option key={pIdx} value={prog}>{prog}</option>
                ))}
              </select>
            </div>

            <div className="pt-3 border-t border-[#1E2E4A] flex justify-end space-x-2">
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-[#13233F] hover:bg-[#1A3158]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAssignment}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md"
              >
                Confirm & Mandate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
