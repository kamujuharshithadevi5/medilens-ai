import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const DisclaimerBanner = ({ className = "" }) => {
  return (
    <div className={`flex items-start sm:items-center gap-3 p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-xl text-emerald-900 shadow-xs ${className}`}>
      <div className="p-1.5 bg-emerald-600 text-white rounded-lg shrink-0">
        <ShieldAlert className="w-4 h-4" />
      </div>
      <div className="text-xs sm:text-sm leading-relaxed">
        <strong className="font-semibold text-emerald-950">AI-generated informational explanation — not a diagnosis.</strong>{' '}
        <span className="text-emerald-800">MediLens AI does not diagnose diseases or replace professional medical consultation. Always consult a qualified healthcare provider for clinical decisions.</span>
      </div>
    </div>
  );
};
