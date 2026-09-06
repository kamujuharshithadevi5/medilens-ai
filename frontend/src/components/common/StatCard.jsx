import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendLabel, color = 'emerald' }) => {
  const colorMap = {
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'hover:border-emerald-300',
      iconBg: 'bg-emerald-600 text-white'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'hover:border-green-300',
      iconBg: 'bg-emerald-700 text-white'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'hover:border-amber-300',
      iconBg: 'bg-amber-600 text-white'
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'hover:border-rose-300',
      iconBg: 'bg-rose-600 text-white'
    }
  };

  const style = colorMap[color] || colorMap.emerald;

  return (
    <div className={`health-card p-5 border border-slate-200/80 transition-all duration-200 ${style.border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs ${style.iconBg}`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>
      {(subtitle || trend) && (
        <div className="mt-3.5 flex items-center gap-2 text-xs">
          {trend && (
            <span className={`inline-flex items-center font-semibold px-1.5 py-0.5 rounded-md ${
              trend > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
            }`}>
              {trend > 0 ? `+${trend}` : trend}
            </span>
          )}
          <span className="text-slate-500 truncate">{trendLabel || subtitle}</span>
        </div>
      )}
    </div>
  );
};
