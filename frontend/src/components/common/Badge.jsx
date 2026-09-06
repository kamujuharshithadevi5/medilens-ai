import React from 'react';

export const Badge = ({ status, className = "" }) => {
  const getBadgeStyle = (s) => {
    switch (s?.toLowerCase()) {
      case 'normal':
      case 'analyzed':
      case 'stable':
        return 'bg-emerald-100/80 text-emerald-800 border-emerald-300';
      case 'borderline':
      case 'warning':
      case 'pending':
        return 'bg-amber-100/80 text-amber-800 border-amber-300';
      case 'elevated':
      case 'critical':
      case 'high':
        return 'bg-rose-100/80 text-rose-800 border-rose-300';
      case 'low':
        return 'bg-orange-100/80 text-orange-800 border-orange-300';
      case 'review required':
        return 'bg-indigo-100/80 text-indigo-800 border-indigo-300';
      case 'info':
        return 'bg-blue-100/80 text-blue-800 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(status)} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status?.toLowerCase() === 'normal' || status?.toLowerCase() === 'analyzed' ? 'bg-emerald-600' :
        status?.toLowerCase() === 'borderline' || status?.toLowerCase() === 'pending' ? 'bg-amber-500' :
        status?.toLowerCase() === 'elevated' || status?.toLowerCase() === 'critical' ? 'bg-rose-600' :
        status?.toLowerCase() === 'low' ? 'bg-orange-500' : 'bg-slate-400'
      }`} />
      {status}
    </span>
  );
};
