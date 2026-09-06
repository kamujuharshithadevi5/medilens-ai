import React from 'react';
import { HeartPulse, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-6 px-6 sm:px-8 text-center sm:text-left text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <HeartPulse className="w-4 h-4 text-emerald-600" />
          <span>MediLens AI</span>
          <span className="text-slate-400 font-normal">| Informational Healthcare Analytics</span>
        </div>
        <div className="text-[11px] text-slate-400 max-w-xl text-center sm:text-right">
          MediLens AI provides informational explanations of clinical lab data and does not diagnose diseases or replace licensed physician consultation.
        </div>
      </div>
    </footer>
  );
};
