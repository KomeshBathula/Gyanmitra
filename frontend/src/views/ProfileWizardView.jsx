import React, { useState } from 'react';
import {
  User,
  Building,
  Briefcase,
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Layers,
  Save
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileWizardView = () => {
  const { userProfile, setUserProfile, setCurrentScreen, showToast } = useApp();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: userProfile.name || "Rajesh Kumar, ISS",
    employeeId: userProfile.employeeId || "GOI-MOSPI-2018-0492",
    department: userProfile.department || "Survey Design and Research Division (SDRD)",
    designation: userProfile.designation || "Deputy Director",
    cadre: userProfile.cadre || "Indian Statistical Service (ISS)",
    location: userProfile.location || "Sardar Patel Bhawan, New Delhi",
    experienceYears: userProfile.experienceYears || 7,
    education: userProfile.education || "M.Sc. in Statistics, University of Delhi",
    areasOfResponsibility: "NSS Survey Methodology, Unit-level tabulation, Multiplier calculations, DQAD validation",
    statisticalSkills: ["Sampling Design", "National Accounts (SNA)", "Survey Weight Calibration", "Index Numbers (CPI/IIP)"],
    technicalSkills: ["Python (Beginner/Intermediate)", "SQL & PostgreSQL", "R Programming", "Excel Advanced"],
    digitalGovSkills: ["DPDP Act 2023", "GIGW 3.0 Compliance", "e-Office Workflows", "e-Samiksha"],
    managerialSkills: ["Field Team Supervision", "Statistical Quality Audit", "Inter-Ministry Coordination"],
    pastCourses: [
      "iGOT: Induction Training for ISS Officers (120 Hours)",
      "NSSTA: Advance Survey Sampling Techniques (30 Hours)",
      "iGOT: Digital Personal Data Protection Basics (6 Hours)"
    ]
  });

  const stepsList = [
    { num: 1, title: "Personal Details", desc: "Identity & Contact" },
    { num: 2, title: "Job Information", desc: "Department & Cadre" },
    { num: 3, title: "Experience", desc: "Service History" },
    { num: 4, title: "Existing Skills", desc: "Competency Self-Report" },
    { num: 5, title: "Training History", desc: "Past NSSTA / iGOT" },
    { num: 6, title: "Competency Baseline", desc: "AI Profile Synthesis" }
  ];

  const handleFinish = () => {
    setUserProfile(prev => ({
      ...prev,
      name: formData.name,
      designation: formData.designation,
      department: formData.department,
      cadre: formData.cadre,
      location: formData.location,
      experienceYears: formData.experienceYears,
      education: formData.education
    }));
    showToast("Official Competency Profile built and synced with MoSPI Intelligence.", "success");
    setCurrentScreen('dashboard');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              Official Cadre Onboarding & Skill Audit
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Government Employee Competency Profile Wizard
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Configure your service record, demonstrated skills, and training history to generate your personalized competency index.
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-2xl font-black text-gov-blue">Step {step} of 6</span>
            <p className="text-[11px] text-slate-400">Mission Karmayogi Aligned</p>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-6 pt-6 border-t border-slate-100">
          {stepsList.map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`text-left p-2.5 rounded-lg border transition-all ${
                step === s.num
                  ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20'
                  : step > s.num
                  ? 'bg-slate-50 border-emerald-300 text-slate-700'
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-1.5 text-xs font-bold">
                {step > s.num ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    step === s.num ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {s.num}
                  </span>
                )}
                <span className={step === s.num ? 'text-blue-900' : 'text-slate-700'}>{s.title}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Step Contents */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-gov">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
              1. Personal Details & Service Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name with Cadre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Employee ID (NIC / MoSPI)</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  disabled
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-300 rounded-lg text-slate-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  disabled
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-300 rounded-lg text-slate-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Office Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
              2. Job & Cadre Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department / Division</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
                >
                  <option>Survey Design and Research Division (SDRD)</option>
                  <option>Data Quality Assurance Division (DQAD)</option>
                  <option>Field Operations Division (FOD)</option>
                  <option>Central Statistics Office (CSO - National Accounts)</option>
                  <option>Coordination and Publication Division (CAP)</option>
                  <option>State Directorate of Economics and Statistics (DES)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Designation</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Service Cadre</label>
                <select
                  value={formData.cadre}
                  onChange={(e) => setFormData({ ...formData, cadre: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
                >
                  <option>Indian Statistical Service (ISS)</option>
                  <option>Subordinate Statistical Service (SSS) - Senior Statistical Officer</option>
                  <option>Subordinate Statistical Service (SSS) - Junior Statistical Officer</option>
                  <option>State DES Officer / Deputationist</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Educational Qualification</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Key Areas of Official Responsibility</label>
              <textarea
                rows={2}
                value={formData.areasOfResponsibility}
                onChange={(e) => setFormData({ ...formData, areasOfResponsibility: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
              3. Service Experience & Survey Rounds Handled
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Years in Government Service</label>
                <input
                  type="number"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cadre Batch Year</label>
                <input
                  type="text"
                  defaultValue="2018 Batch"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs font-semibold text-slate-700 mb-2">Major National Surveys Handled in Service:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {['NSS 78th Round (Domestic Tourism)', 'NSS 79th Round (Comprehensive AYUSH)', 'Periodic Labour Force Survey (PLFS)', 'Annual Survey of Industries (ASI)', 'All-India Debt & Investment Survey (AIDIS)'].map((srv, i) => (
                  <label key={i} className="flex items-center space-x-2 bg-white p-2 rounded border border-slate-200">
                    <input type="checkbox" defaultChecked={i < 3} className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" />
                    <span className="text-[11px] text-slate-700">{srv}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
              4. Existing Competency Self-Declaration
            </h3>
            <p className="text-xs text-slate-500">
              Select competencies where you currently have operational familiarity:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-900 block">Statistical Competencies</span>
                {['Survey Sampling & Stratification', 'Index Number Compilation', 'Time Series & Seasonal Adjustment', 'Small Area Estimation'].map((c, i) => (
                  <label key={i} className="flex items-center space-x-2 text-xs">
                    <input type="checkbox" defaultChecked={i < 2} className="rounded text-blue-600" />
                    <span className="text-slate-700">{c}</span>
                  </label>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-amber-900 block">Technical & Coding</span>
                {['Python for Data Analysis', 'Machine Learning & Predictive Imputation', 'SQL & Relational Databases', 'PowerBI / Streamlit Dashboards'].map((c, i) => (
                  <label key={i} className="flex items-center space-x-2 text-xs">
                    <input type="checkbox" defaultChecked={i === 0 || i === 2} className="rounded text-amber-600" />
                    <span className="text-slate-700">{c}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
              5. Training & Certifications History
            </h3>
            <div className="space-y-2">
              {formData.pastCourses.map((crs, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-slate-800">{crs}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified in Service Ledger
                  </span>
                </div>
              ))}
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-between text-xs text-blue-900">
              <span>Total Karmayogi Learning Hours Recorded: <strong>156 Hours</strong></span>
              <span className="font-bold">420 Credits</span>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="text-center py-4 space-y-2">
              <div className="w-12 h-12 bg-blue-50 text-gov-blue rounded-full mx-auto flex items-center justify-center border border-blue-200">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Ready to Synthesize Your Official Competency Profile</h3>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                GyanMitra will calculate your baseline against the <strong>MoSPI National Training Framework 2026</strong> for your <strong>Deputy Director (ISS)</strong> role.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Cadre Level</span>
                <p className="text-sm font-bold text-slate-800 mt-0.5">ISS Grade III</p>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Target Index</span>
                <p className="text-sm font-bold text-blue-700 mt-0.5">80% Level 4</p>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Initial Gaps</span>
                <p className="text-sm font-bold text-amber-700 mt-0.5">4 Areas</p>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Pathway Mode</span>
                <p className="text-sm font-bold text-emerald-700 mt-0.5">AI Dynamic</p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 text-xs font-bold text-white bg-gov-blue hover:bg-gov-navy rounded-lg shadow-gov transition-all flex items-center space-x-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-gov transition-all flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Build My Competency Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
