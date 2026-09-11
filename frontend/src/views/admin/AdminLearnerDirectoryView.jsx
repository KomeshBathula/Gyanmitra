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
  Send,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLearnerDirectoryView = () => {
  const {
    adminLearners,
    adminDepartment,
    adminDepartmentsConfig,
    assignProgramToLearner,
    showToast
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'gaps', 'compliant', 'in_progress'
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedProgramToAssign, setSelectedProgramToAssign] = useState('MoSPI NSS 79th Round: Sampling & Estimation Protocol');

  const activeDept = adminDepartmentsConfig?.find(d => d.id === adminDepartment) || {
    name: 'Cadre Administration',
    badge: 'Department Cadre',
    totalLearners: '24,800'
  };

  // STRICT FILTER: Admin ONLY sees employees belonging to their department
  const cadreLearners = adminLearners.filter(lrn => lrn.departmentId === adminDepartment);

  // Secondary search and status filters within the cadre
  const filteredLearners = cadreLearners.filter(lrn => {
    const matchesSearch =
      lrn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lrn.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lrn.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lrn.cadre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lrn.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'gaps') return lrn.skillGaps && lrn.skillGaps.some(g => g.priority === 'High');
    if (activeTab === 'compliant') return lrn.aparStatus.includes('Compliant') || lrn.aparStatus.includes('Exemplary');
    if (activeTab === 'in_progress') return lrn.aparStatus.includes('In Progress');

    return true;
  });

  // Calculate cadre-specific metrics
  const avgCadreScore = cadreLearners.length > 0
    ? Math.round(cadreLearners.reduce((acc, l) => acc + l.competencyScore, 0) / cadreLearners.length)
    : 75;

  const aparCompliantPct = cadreLearners.length > 0
    ? Math.round((cadreLearners.filter(l => l.aparStatus.includes('Compliant') || l.aparStatus.includes('Exemplary')).length / cadreLearners.length) * 100)
    : 80;

  const totalHighGaps = cadreLearners.reduce((acc, l) => acc + (l.skillGaps?.filter(g => g.priority === 'High').length || 0), 0);

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
      {/* Top Banner with Strict Department Scope Notice */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-900/60 text-purple-300 border border-purple-600/50 flex items-center space-x-1">
                <Lock className="w-3 h-3 text-purple-400" />
                <span>Department-Scoped Access</span>
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-950 text-blue-300 border border-blue-600/40">
                {activeDept.name}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2">
              {activeDept.name} — Registered Officers Directory
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Admin access is restricted to verified officers within your department cadre. Cross-department records are isolated.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#0B1528] border border-[#1E2E4A] text-xs text-slate-300 font-mono font-bold">
              {filteredLearners.length} / {cadreLearners.length} Officers in Cadre
            </span>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards Scoped to this Department */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cadre Strength</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-2xl font-black text-white mt-2">{activeDept.totalLearners || cadreLearners.length}</h3>
          <p className="text-[11px] text-slate-400 mt-1">{cadreLearners.length} Active Records in View</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cadre Avg Score</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-emerald-400 mt-2">{avgCadreScore}%</h3>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">FRAC Competency Index</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">APAR Compliance</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-2xl font-black text-purple-300 mt-2">{aparCompliantPct}%</h3>
          <p className="text-[11px] text-slate-400 mt-1">Appraisal Ready</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">High Risk Skill Gaps</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-amber-400 mt-2">{totalHighGaps} Gaps</h3>
          <p className="text-[11px] text-slate-400 mt-1">Requires Remedial Training</p>
        </div>
      </div>

      {/* Search & Cadre Sub-filters */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Box */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search within ${activeDept.name} by Name, ID, Designation, or City...`}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#0B1528] text-white border border-[#1E2E4A] rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Status Sub-Filters within this Cadre */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Officers' },
            { id: 'gaps', label: 'High Priority Gaps' },
            { id: 'compliant', label: 'APAR Compliant' },
            { id: 'in_progress', label: 'In Progress' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
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
            {activeDept.name} Officers ({filteredLearners.length})
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
                        className="p-2 rounded-xl bg-[#0B1528] hover:bg-[#162544] text-slate-300 hover:text-white border border-[#1E2E4A] transition-colors"
                        title="View Full Passbook"
                      >
                        <Eye className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLearner(lrn);
                          setIsAssignModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1"
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
          <div className="relative w-full max-w-3xl bg-[#111F38] text-slate-100 rounded-2xl border border-[#1E2E4A] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#1E2E4A] bg-[#0B1528] flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedLearner.avatar}
                  alt={selectedLearner.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-blue-500 shadow-md"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-900/60 text-blue-300 border border-blue-600/40">
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
                className="w-8 h-8 rounded-lg bg-[#162544] hover:bg-[#1E3A6D] text-slate-400 hover:text-white flex items-center justify-center cursor-pointer border border-[#1E2E4A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Top Stats Strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#0B1528] border border-[#1E2E4A] text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Overall Score</p>
                  <p className="text-xl font-black text-emerald-400 mt-1">{selectedLearner.competencyScore}%</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0B1528] border border-[#1E2E4A] text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Karma Points</p>
                  <p className="text-xl font-black text-amber-400 mt-1">{selectedLearner.karmaCredits}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0B1528] border border-[#1E2E4A] text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Active Courses</p>
                  <p className="text-xl font-black text-blue-300 mt-1">{selectedLearner.activeCoursesCount}</p>
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
              <div className="p-4 rounded-xl bg-[#0B1528] border border-[#1E2E4A] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Need to close gaps for this officer?</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Assign a certified iGOT / NSSTA learning module directly to their portal.</p>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
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
          <div className="relative w-full max-w-lg bg-[#111F38] text-slate-100 rounded-2xl border border-[#1E2E4A] shadow-2xl p-6 space-y-4">
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
                className="w-full px-3 py-2 text-xs bg-[#0B1528] text-white border border-[#1E2E4A] rounded-xl focus:ring-1 focus:ring-blue-500"
              >
                {availablePrograms.map((prog, pIdx) => (
                  <option key={pIdx} value={prog}>{prog}</option>
                ))}
              </select>
            </div>

            <div className="pt-3 border-t border-[#1E2E4A] flex justify-end space-x-2">
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-[#162544] hover:bg-[#1E3A6D]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAssignment}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md"
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
