import React, { useState } from 'react';
import { BookOpen, Send, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AIAssistantView = () => {
  const { aiChatMessages, sendAiMessage, aiPrompts } = useApp();
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputVal.trim()) return;
    sendAiMessage(inputVal);
    setInputVal('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                MoSPI Statistical Knowledge System
              </span>
              <span className="text-xs text-slate-400">Official Assistant</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">GyanMitra Knowledge & Competency Assistant</h2>
            <p className="text-xs text-slate-500">
              Your personalized statistical intelligence advisor for official statistics, sampling methodologies, and cadre skill advancement.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              RAG Active: NSSTA Manuals
            </span>
          </div>
        </div>

        {/* Suggested Starter Chips */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Suggested Official Inquiries:
          </span>
          <div className="flex flex-wrap gap-2">
            {aiPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => sendAiMessage(p.text)}
                className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 hover:border-blue-300 rounded-lg transition-colors text-left"
              >
                {p.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Conversation Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-gov flex flex-col h-[520px] overflow-hidden">
        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/60">
          {aiChatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  msg.sender === 'user' ? 'bg-gov-blue text-white' : 'bg-gov-navy text-amber-300 border border-slate-300'
                }`}
              >
                {msg.sender === 'user' ? 'ME' : 'ज्ञान'}
              </div>

              <div className="max-w-[80%] space-y-2">
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gov-blue text-white rounded-tr-none'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-gov'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestions.map((s, sI) => (
                      <button
                        key={sI}
                        onClick={() => sendAiMessage(s)}
                        className="text-[11px] px-2.5 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 rounded-lg shadow-2xs"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-3">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type your statistical inquiry (e.g. How does MoSPI compile CPI basket weights?)..."
            className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="px-5 py-2.5 bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold rounded-xl disabled:opacity-40 transition-colors shadow-gov"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};
