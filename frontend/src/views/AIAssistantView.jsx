import React, { useState } from 'react';
import { BookOpen, Send, User, MessageSquare } from 'lucide-react';
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
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                MoSPI Capacity Building & Knowledge System
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Official Assistant</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1.5">
              GyanMitra Knowledge & Competency Assistant
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Your official advisor for iGOT Karmayogi curricula, statistical methodologies, sampling guidelines, and civil service competency frameworks.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 font-semibold flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
              Groq Cloud AI Active
            </span>
          </div>
        </div>

        {/* Suggested Starter Chips */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Suggested Official Inquiries:
          </span>
          <div className="flex flex-wrap gap-2">
            {aiPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => sendAiMessage(p.text)}
                className="text-xs px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-800 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg transition-colors text-left cursor-pointer"
              >
                {p.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Conversation Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/70 dark:bg-slate-950/60">
          {aiChatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 dark:bg-slate-700 text-amber-300 border border-slate-300 dark:border-slate-600'
                }`}
              >
                {msg.sender === 'user' ? 'ME' : 'ज्ञान'}
              </div>

              <div className="max-w-[80%] space-y-2">
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-xs'
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
                        className="text-[11px] px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
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
        <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-3">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask regarding iGOT Karmayogi courses, MoSPI sampling, competencies..."
            className="flex-1 px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};
