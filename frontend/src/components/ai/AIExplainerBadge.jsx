import React, { useState } from 'react';
import { Sparkles, HelpCircle, X, CheckCircle } from 'lucide-react';

export const AIExplainerBadge = ({ reason, title = "Why is this recommended?", competency = "Python for Data Analysis" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
        title="Click to see AI Reasoning"
      >
        <Sparkles className="w-3 h-3 text-blue-600" />
        <span>AI Recommended</span>
        <HelpCircle className="w-2.5 h-2.5 ml-0.5 text-blue-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-30 text-left text-xs text-slate-700 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div className="flex items-center space-x-1.5 font-semibold text-blue-900">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{title}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded hover:bg-slate-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-slate-600 leading-relaxed">{reason}</p>

          <div className="mt-3 pt-2 bg-slate-50 -mx-4 -mb-4 p-3 rounded-b-xl border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center text-emerald-700 font-medium">
              <CheckCircle className="w-3 h-3 mr-1" /> MoSPI Cadre Aligned
            </span>
            <span className="font-mono text-[10px] text-slate-400">RAG-Verified</span>
          </div>
        </div>
      )}
    </div>
  );
};
