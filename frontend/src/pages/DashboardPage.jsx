import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UploadCloud,
  BrainCircuit,
  TrendingUp,
  ArrowRight,
  Eye,
  Trash2,
  Sparkles,
  HeartPulse,
  Activity,
  Calendar,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Toast } from '../components/common/Toast';

export const DashboardPage = () => {
  const { reports, alerts, analytics, deleteReport } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Computations for dashboard metrics
  const totalReports = reports.length;
  const reportsAnalyzed = reports.filter(r => r.status === 'Analyzed').length;
  const pendingReports = reports.filter(r => r.status !== 'Analyzed').length;
  const healthAlerts = alerts.filter(a => !a.is_read).length;

  const recentReports = reports.slice(0, 5);

  const confirmDelete = (id) => {
    setSelectedReportId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedReportId) {
      await deleteReport(selectedReportId);
      setDeleteModalOpen(false);
      setSelectedReportId(null);
      setToastMessage('Report successfully deleted from your medical records.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="health-card-paddy p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold border border-emerald-600/40">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>AI Informational Medical Summary</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hello, {user?.name || 'Alex Morgan'}
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl leading-relaxed">
            Your clinical dashboard is synced. You have <strong className="text-white font-bold">{healthAlerts} active health notifications</strong> that require physician discussion.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/upload"
            className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-xs shadow-md hover:bg-emerald-50 transition-colors flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4 text-emerald-700" />
            <span>Upload New Report</span>
          </Link>
          <Link
            to="/analysis"
            className="px-4 py-2.5 rounded-xl bg-emerald-800/90 text-white font-bold text-xs border border-emerald-600/50 hover:bg-emerald-800 transition-colors flex items-center gap-2"
          >
            <BrainCircuit className="w-4 h-4 text-emerald-300" />
            <span>Launch AI Analysis</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Reports"
          value={totalReports}
          subtitle="All archived clinical panels"
          icon={FileText}
          trend={totalReports > 0 ? `+${totalReports}` : 0}
          trendLabel="Archived in portal"
          color="emerald"
        />
        <StatCard
          title="Reports Analyzed"
          value={reportsAnalyzed}
          subtitle="Biomarkers parsed & mapped"
          icon={CheckCircle2}
          trend={`${Math.round((reportsAnalyzed / (totalReports || 1)) * 100)}%`}
          trendLabel="Analysis completion rate"
          color="green"
        />
        <StatCard
          title="Pending Reports"
          value={pendingReports}
          subtitle="Awaiting lab or physician sign-off"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Health Alerts"
          value={healthAlerts}
          subtitle="Out-of-range flags"
          icon={AlertTriangle}
          trend={healthAlerts > 0 ? `${healthAlerts} unread` : 'All clear'}
          trendLabel="Needs attention"
          color={healthAlerts > 0 ? 'rose' : 'emerald'}
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="health-card p-4 sm:p-5 bg-white border border-slate-200">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/upload')}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-900 transition-colors cursor-pointer group"
          >
            <UploadCloud className="w-5 h-5 text-emerald-700 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Upload Report</span>
            <span className="text-[10px] text-emerald-700">PDF, JPG, PNG</span>
          </button>

          <button
            onClick={() => navigate('/analysis')}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-900 transition-colors cursor-pointer group"
          >
            <BrainCircuit className="w-5 h-5 text-emerald-700 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">AI Health Scan</span>
            <span className="text-[10px] text-emerald-700">Biomarker Insights</span>
          </button>

          <button
            onClick={() => navigate('/alerts')}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/80 text-amber-900 transition-colors cursor-pointer group"
          >
            <AlertTriangle className="w-5 h-5 text-amber-700 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Check Alerts</span>
            <span className="text-[10px] text-amber-700">{healthAlerts} Action items</span>
          </button>

          <button
            onClick={() => navigate('/analytics')}
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors cursor-pointer group"
          >
            <TrendingUp className="w-5 h-5 text-slate-700 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">Trend Analytics</span>
            <span className="text-[10px] text-slate-500">6-Month History</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Health Trends Chart & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Health Trends Recharts Area/Line Chart */}
        <div className="lg:col-span-8 health-card p-5 sm:p-6 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-slate-900">Health Biomarker Trends</h3>
              </div>
              <p className="text-xs text-slate-500">Monthly evolution of key clinical parameters</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Glucose (mg/dL)
              </span>
              <span className="inline-flex items-center gap-1 text-slate-600 font-medium ml-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Total Chol. (mg/dL)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analytics.monthly_trends}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorChol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis domain={[60, 240]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#062c20',
                    color: '#ffffff',
                    borderRadius: '0.75rem',
                    border: 'none',
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="avgGlucose"
                  name="Fasting Glucose"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorGlucose)"
                />
                <Area
                  type="monotone"
                  dataKey="totalCholesterol"
                  name="Total Cholesterol"
                  stroke="#d97706"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorChol)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-[11px] text-slate-400 italic text-center sm:text-left">
            Normal ranges: Fasting Glucose (70-99 mg/dL), Total Cholesterol (&lt;200 mg/dL).
          </p>
        </div>

        {/* AI Insights Card */}
        <div className="lg:col-span-4 health-card p-5 sm:p-6 border border-slate-200 bg-gradient-to-br from-white to-emerald-50/40 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-600 text-white rounded-lg">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">AI Clinical Insights</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Informational
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Cardiovascular Note</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  LDL Cholesterol (138 mg/dL) and Total Cholesterol (218 mg/dL) are above target. Dietary fiber increases and follow-up are suggested.
                </p>
              </div>

              <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Renal & Hepatic Stability</span>
                </div>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  eGFR (98 mL/min) and Creatinine (0.95 mg/dL) reflect strong kidney filtration. Liver transaminases are balanced.
                </p>
              </div>

              <div className="p-3 bg-orange-50/80 border border-orange-200/80 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-orange-900">
                  <Activity className="w-3.5 h-3.5 text-orange-600" />
                  <span>Micronutrient Flag</span>
                </div>
                <p className="text-orange-800 text-[11px] leading-relaxed">
                  Vitamin D (22 ng/mL) remains insufficient. Consider discussing Vitamin D3 supplementation with your primary physician.
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/analysis"
            className="mt-4 w-full py-2.5 px-3 bg-[#062c20] hover:bg-emerald-900 text-white text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2 transition-colors"
          >
            <span>Read Detailed Explanations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Recent Reports Section */}
      <div className="health-card p-5 sm:p-6 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Diagnostic Reports</h3>
            <p className="text-xs text-slate-500">Your latest uploaded clinical tests and panels</p>
          </div>
          <Link
            to="/reports"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All ({reports.length}) Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-y border-slate-200/80">
              <tr>
                <th className="py-3 px-4">Report Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Test Date</th>
                <th className="py-3 px-4">Physician / Lab</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <Link
                          to={`/reports/${report.id}`}
                          className="font-bold text-slate-900 hover:text-emerald-700 text-sm truncate max-w-xs block"
                        >
                          {report.title}
                        </Link>
                        <span className="text-[11px] text-slate-400 font-normal">
                          {report.id} • {report.biomarkers?.length || 0} biomarkers
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                      {report.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{report.date}</td>
                  <td className="py-3.5 px-4">
                    <p className="text-slate-800 font-semibold">{report.doctor}</p>
                    <p className="text-[10px] text-slate-400">{report.lab}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge status={report.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/reports/${report.id}`)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                        title="View Report Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/analysis/${report.id}`)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                        title="AI Analysis Breakdown"
                      >
                        <BrainCircuit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(report.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Report"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Report Deletion"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Are you sure you want to delete this report from your archived health records? This action will remove extracted biomarkers and associated alerts.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Delete Report
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Feedback */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
};
