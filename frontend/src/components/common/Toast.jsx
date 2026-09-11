import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const getStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-900/95 text-white border-emerald-700';
      case 'error':
        return 'bg-rose-900/95 text-white border-rose-700';
      case 'info':
        return 'bg-blue-900/95 text-white border-blue-700';
      default:
        return 'bg-slate-900/95 text-white border-slate-700';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-rose-400 mr-3 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in">
      <div className={`flex items-center px-4 py-3 rounded-lg shadow-xl border backdrop-blur-sm ${getStyle()}`}>
        {getIcon()}
        <span className="text-sm font-medium pr-2">{message}</span>
      </div>
    </div>
  );
};
