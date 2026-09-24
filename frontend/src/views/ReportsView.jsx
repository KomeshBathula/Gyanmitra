import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ReportsView = () => {
  const { reportsCatalog, showToast } = useApp();
  const [selectedReport, setSelectedReport] = useState(null);

  const handleExport = (report, format) => {
    showToast(`Exporting ${report.title} as ${format.toUpperCase()}...`, "success");
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-12 text-[#1F2933]">

      {/* Page Header */}
      <div className="bg-white border border-[#D5DCE3] rounded p-5">
        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
          Official Institutional Reports & Compliance
        </span>
        <h2 className="text-lg font-bold text-[#0B3A63] mt-1.5">Reports & Statistical Audits</h2>
        <p className="text-xs text-[#5B6773] mt-0.5">
          Export institutional capacity building reports for MoSPI executive review and Mission Karmayogi audit.
        </p>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#EEF2F5] border-b border-[#D5DCE3]">
            <tr>
              <th className="px-4 py-3 font-semibold text-[#1F2933]">Report Code</th>
              <th className="px-4 py-3 font-semibold text-[#1F2933]">Title</th>
              <th className="px-4 py-3 font-semibold text-[#1F2933]">Type</th>
              <th className="px-4 py-3 font-semibold text-[#1F2933]">Date</th>
              <th className="px-4 py-3 text-right font-semibold text-[#1F2933]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D5DCE3]">
            {reportsCatalog.map((rep) => (
              <tr key={rep.id} className="hover:bg-[#F5F7F9] transition-colors">
                <td className="px-4 py-3 font-mono text-[#5B6773]">{rep.code}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-[#1F2933]">{rep.title}</p>
                  <p className="text-[10px] text-[#5B6773] mt-0.5">{rep.description}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
                    {rep.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#5B6773]">{rep.date}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => setSelectedReport(rep)}
                      className="px-3 py-1 text-xs font-medium text-[#0B3A63] hover:underline cursor-pointer"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleExport(rep, 'pdf')}
                      className="px-3 py-1 bg-[#0B3A63] hover:bg-[#12304A] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
                    >
                      PDF
                    </button>
                    <button
                      onClick={() => handleExport(rep, 'csv')}
                      className="px-3 py-1 border border-[#D5DCE3] bg-[#F5F7F9] hover:bg-[#EEF2F5] text-[#5B6773] text-xs font-medium rounded transition-colors cursor-pointer"
                    >
                      CSV
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-[#D5DCE3] max-w-lg w-full p-5 shadow-lg space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
                  {selectedReport.code}
                </span>
                <h3 className="text-sm font-bold text-[#1F2933] mt-1.5">{selectedReport.title}</h3>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-[#5B6773] hover:text-[#1F2933] cursor-pointer text-sm">✕</button>
            </div>

            <div className="p-4 bg-[#F5F7F9] border border-[#D5DCE3] rounded text-xs space-y-2 text-[#1F2933]">
              <p><strong className="text-[#5B6773]">Cadre Scope:</strong> {selectedReport.cadre}</p>
              <p><strong className="text-[#5B6773]">Generated Date:</strong> {selectedReport.date}</p>
              <p><strong className="text-[#5B6773]">Summary:</strong> {selectedReport.description}</p>
              <p className="text-[11px] text-[#5B6773] pt-2 border-t border-[#D5DCE3]">
                Status: Verified by Cadre Controlling Authority (MoSPI).
              </p>
            </div>

            <div className="pt-3 border-t border-[#D5DCE3] flex items-center justify-end space-x-2">
              <button onClick={() => setSelectedReport(null)} className="px-4 py-2 text-xs font-medium text-[#5B6773] hover:bg-[#EEF2F5] rounded cursor-pointer">
                Close
              </button>
              <button
                onClick={() => {
                  handleExport(selectedReport, 'pdf');
                  setSelectedReport(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0B3A63] hover:bg-[#12304A] rounded transition-colors cursor-pointer"
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
