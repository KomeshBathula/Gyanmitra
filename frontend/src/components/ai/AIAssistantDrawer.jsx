import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareText, X, Send, BookOpen, User, ExternalLink, HelpCircle, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/30 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-gov-navy to-gov-blue text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <MessageSquareText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">GyanMitra Knowledge Desk</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  MoSPI RAG
                </span>
              </div>
              <p className="text-xs text-slate-300">Statistical intelligence & competency advisor</p>
            </div>
          </div>

          <button
            onClick={() => setIsAiDrawerOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 text-xs text-blue-800 flex items-center justify-between">
          <span className="flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>Grounded in NSSTA Training Manuals & iGOT Curriculum</span>
          </span>
          <button
            onClick={() => {
              setIsAiDrawerOpen(false);
              setCurrentScreen('ai-assistant');
            }}
            className="text-[11px] font-semibold text-blue-700 hover:underline flex items-center"
          >
            Full View <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {aiChatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
                  msg.sender === 'user' ? 'bg-gov-blue text-white' : 'bg-gov-navy text-amber-300 border border-slate-300'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              </div>

              <div className={`max-w-[82%] space-y-2`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gov-blue text-white rounded-tr-none'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-gov'
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
                          className="text-[11px] text-left px-2.5 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 hover:border-blue-300 rounded-lg shadow-2xs transition-colors flex items-center space-x-1"
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
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about official statistics, sampling, Python, or skill gaps..."
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-gov-blue hover:bg-gov-navy text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-gov"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
            <span>Official MoSPI Knowledge Reference Base</span>
            <span>MoSPI Internal & Confidential</span>
          </div>
        </form>
      </div>
    </div>
  );
};
