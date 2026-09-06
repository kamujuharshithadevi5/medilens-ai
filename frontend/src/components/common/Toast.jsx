import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose, duration = 3500 }) => {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      bg: 'bg-emerald-900 text-emerald-50 border-emerald-700',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
    },
    error: {
      bg: 'bg-rose-900 text-rose-50 border-rose-700',
      icon: <AlertCircle className="w-5 h-5 text-rose-400" />
    },
    info: {
      bg: 'bg-slate-900 text-slate-50 border-slate-700',
      icon: <Info className="w-5 h-5 text-emerald-400" />
    }
  };

  const style = config[type] || config.success;

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl transition-all duration-300 transform translate-y-0 ${style.bg}`}>
      {style.icon}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-md">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
