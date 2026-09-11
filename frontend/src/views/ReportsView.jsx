import React, { useState } from 'react';
import { FileText, Download, Eye, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReportsView = () => {
  const { reportsCatalog, showToast } = useApp();
  const [selectedReport, setSelectedReport] = useState(null);

  const handleExport = (report, format) => {
    showToast(`Exporting ${report.title} as ${format.toUpperCase()}...`, "success");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov">
        <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          Official Institutional Reports & Compliance
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-1">Reports & Statistical Audits</h2>
        <p className="text-xs text-slate-500">
          Export institutional capacity building reports for MoSPI executive review and Mission Karmayogi audit.
        </p>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportsCatalog.map((rep) => (
          <div key={rep.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">{rep.code}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800">
                  {rep.type}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900">{rep.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{rep.description}</p>
              <p className="text-[11px] text-slate-400">Date: {rep.date} • {rep.fileSize}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedReport(rep)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200"
              >
                Preview
              </button>
              <div className="flex space-x-1.5">
                <button
                  onClick={() => handleExport(rep, 'pdf')}
                  className="px-3 py-1.5 bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Export PDF
                </button>
                <button
                  onClick={() => handleExport(rep, 'csv')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300"
                >
                  CSV
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  {selectedReport.code}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{selectedReport.title}</h3>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-700">
              <p><strong>Cadre Scope:</strong> {selectedReport.cadre}</p>
              <p><strong>Generated Date:</strong> {selectedReport.date}</p>
              <p><strong>Summary:</strong> {selectedReport.description}</p>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                Status: Verified by Cadre Controlling Authority (MoSPI).
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button onClick={() => setSelectedReport(null)} className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg">
                Close
              </button>
              <button
                onClick={() => {
                  handleExport(selectedReport, 'pdf');
                  setSelectedReport(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-gov-blue hover:bg-gov-navy rounded-lg"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
