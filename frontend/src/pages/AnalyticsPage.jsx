import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  HeartPulse,
  ShieldCheck,
  Calendar,
  FileText,
  AlertTriangle,
  Info
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useData } from '../context/DataContext';

export const AnalyticsPage = () => {
  const { analytics, reports } = useData();

  const COLORS = ['#16a34a', '#22c55e', '#065f46', '#10b981', '#34d399'];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-700" />
            <span>Health Trend Analytics</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Longitudinal multi-panel trajectory of vital signs, glycemic control, and lipid distributions
          </p>
        </div>

        {/* Overall Health Score Pill */}
        <div className="flex items-center gap-3 p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-extrabold text-base shadow-xs">
            {analytics.summary?.health_score || 88}
          </div>
          <div className="text-xs">
            <p className="font-bold text-emerald-950">Wellness Trajectory</p>
            <p className="text-[11px] text-emerald-700">Healthy baseline with lifestyle recommendations</p>
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="health-card p-4 bg-white border border-slate-200">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Archived Panels</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{reports.length}</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">100% Digitized</p>
        </div>

        <div className="health-card p-4 bg-white border border-slate-200">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Avg Fasting Glucose</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">102 <span className="text-xs font-normal text-slate-500">mg/dL</span></h3>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">Borderline Range</p>
        </div>

        <div className="health-card p-4 bg-white border border-slate-200">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Avg Total Cholesterol</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">214 <span className="text-xs font-normal text-slate-500">mg/dL</span></h3>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">Target &lt; 200 mg/dL</p>
        </div>

        <div className="health-card p-4 bg-white border border-slate-200">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Kidney Efficacy (eGFR)</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">98 <span className="text-xs font-normal text-slate-500">mL/min</span></h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Robust Filtration</p>
        </div>
      </div>

      {/* Chart 1: Longitudinal 6-Month Timeline */}
      <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              <span>Biomarker Evolution (Past 6 Months)</span>
            </h3>
            <p className="text-xs text-slate-500">Continuous tracking of Glycemic and Lipid profiles</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-3 h-3 rounded-full bg-emerald-600" /> Fasting Glucose
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-3 h-3 rounded-full bg-amber-500" /> Total Cholesterol
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-3 h-3 rounded-full bg-slate-600" /> Systolic BP
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={analytics.monthly_trends}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="anGlucose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="anChol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis domain={[50, 240]} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#062c20',
                  color: '#ffffff',
                  borderRadius: '0.75rem',
                  border: 'none',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="avgGlucose"
                name="Fasting Glucose (mg/dL)"
                stroke="#16a34a"
                strokeWidth={2.5}
                fill="url(#anGlucose)"
              />
              <Area
                type="monotone"
                dataKey="totalCholesterol"
                name="Total Cholesterol (mg/dL)"
                stroke="#d97706"
                strokeWidth={2.5}
                fill="url(#anChol)"
              />
              <Area
                type="monotone"
                dataKey="systolicBP"
                name="Systolic BP (mmHg)"
                stroke="#475569"
                strokeWidth={2}
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Donut Category Distribution & Bar Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown (Donut) */}
        <div className="lg:col-span-5 health-card p-6 bg-white border border-slate-200 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-emerald-700" />
              <span>Report Distribution by Category</span>
            </h3>
            <p className="text-xs text-slate-500">Breakdown of archived clinical tests</p>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.category_distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analytics.category_distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#062c20',
                      color: '#ffffff',
                      borderRadius: '0.5rem',
                      border: 'none',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            {analytics.category_distribution.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="text-slate-700 font-medium truncate">{cat.name}:</span>
                <strong className="text-slate-900">{cat.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Observed vs Optimal Biomarkers Bar Chart */}
        <div className="lg:col-span-7 health-card p-6 bg-white border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-700" />
                <span>Observed vs Optimal Target Values</span>
              </h3>
              <p className="text-xs text-slate-500">Comparing your latest results to clinical guidelines</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.biomarker_comparison}
                margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="biomarker" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#062c20',
                    color: '#ffffff',
                    borderRadius: '0.5rem',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="current" name="Your Current Value" fill="#16a34a" radius={[6, 6, 0, 0]} />
                <Bar dataKey="optimal" name="Optimal Clinical Target" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
