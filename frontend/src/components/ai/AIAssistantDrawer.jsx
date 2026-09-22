import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, BookOpen, User, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIAssistantDrawer = () => {
  const { isAiDrawerOpen, setIsAiDrawerOpen, aiChatMessages, sendAiMessage, setCurrentScreen } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isAiDrawerOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiChatMessages, isAiDrawerOpen]);

  if (!isAiDrawerOpen) return null;

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendAiMessage(inputText);
    setInputText('');
  };

  const handleSuggestionClick = (suggestion) => {
    sendAiMessage(suggestion);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-800 dark:bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <MessageSquare className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">GyanMitra Knowledge Desk</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  MoSPI Groq AI
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Official statistics & competency advisor</p>
            </div>
          </div>

          <button
            onClick={() => setIsAiDrawerOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="bg-blue-50 dark:bg-slate-800/90 border-b border-blue-100 dark:border-slate-800 px-4 py-2 text-xs text-blue-900 dark:text-blue-300 flex items-center justify-between">
          <span className="flex items-center space-x-1.5 truncate">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span className="truncate">Grounded in NSSTA Training Manuals & iGOT Curriculum</span>
          </span>
          <button
            onClick={() => {
              setIsAiDrawerOpen(false);
              setCurrentScreen('ai-assistant');
            }}
            className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 hover:underline flex items-center ml-2 flex-shrink-0 cursor-pointer"
          >
            Full Page <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/80 dark:bg-slate-950/70">
          {aiChatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
                  msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 dark:bg-slate-700 text-amber-300 border border-slate-300 dark:border-slate-600'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              </div>

              <div className="max-w-[82%] space-y-2">
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Suggested Inquiries:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSuggestionClick(sug)}
                          className="text-[11px] text-left px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs transition-colors flex items-center space-x-1 cursor-pointer"
                        >
                          <span>{sug}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about official statistics, sampling, courses, or competencies..."
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
            <span>Official MoSPI Knowledge System</span>
            <span>Government of India</span>
          </div>
        </form>
      </div>
    </div>
  );
};
