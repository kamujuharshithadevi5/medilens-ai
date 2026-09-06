import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Calendar,
  User,
  Building2,
  BrainCircuit,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Toast } from '../components/common/Toast';

export const ReportDetailsPage = () => {
  const { id } = useParams();
  const { getReport, deleteReport } = useData();
  const navigate = useNavigate();

  const report = getReport(id);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!report) {
    return (
      <div className="health-card p-12 text-center bg-white border border-slate-200 space-y-4 max-w-xl mx-auto my-12">
        <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Diagnostic Report Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested report ID ({id}) could not be retrieved from the medical records database.
        </p>
        <Link
          to="/reports"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Reports</span>
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    await deleteReport(report.id);
    navigate('/reports');
  };

  const handleDownloadMock = () => {
    setToastMessage(`Downloading copy of ${report.file_name || 'medical_report.pdf'}...`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Back Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/reports')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Reports</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadMock}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

          <Link
            to={`/analysis/${report.id}`}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 transition-colors flex items-center gap-1.5"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>AI Clinical Analysis</span>
          </Link>

          <button
            onClick={() => setDeleteModalOpen(true)}
            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
            title="Delete this report"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Report Header Card */}
      <div className="health-card p-6 sm:p-8 bg-white border border-slate-200 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                {report.category}
              </span>
              <Badge status={report.status} />
              <span className="text-xs text-slate-400 font-mono">ID: {report.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {report.title}
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              {report.summary || "Catalogued clinical diagnostic panel. Biomarker values are cross-referenced with standard clinical ranges."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <p className="text-slate-400 font-medium">Test Date</p>
              <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                {report.date}
              </p>
            </div>
            <div className="sm:border-l sm:border-slate-200 sm:pl-4">
              <p className="text-slate-400 font-medium">Ordering Doctor</p>
              <p className="font-bold text-slate-800 mt-0.5">{report.doctor}</p>
            </div>
            <div className="sm:border-l sm:border-slate-200 sm:pl-4">
              <p className="text-slate-400 font-medium">Facility / Lab</p>
              <p className="font-bold text-slate-800 mt-0.5">{report.lab}</p>
            </div>
          </div>
        </div>

        {/* Extracted Biomarkers Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Catalogued Biomarkers ({report.biomarkers?.length || 0})</span>
            </h3>
            <span className="text-xs text-slate-400">Adult Reference Limits Applied</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Biomarker / Description</th>
                  <th className="py-3 px-4">Observed Value</th>
                  <th className="py-3 px-4">Reference Range</th>
                  <th className="py-3 px-4">Range Indicator</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {(report.biomarkers || []).map((bm, idx) => {
                  const min = bm.ref_min;
                  const max = bm.ref_max;
                  const val = bm.value;
                  // Compute visual percentage marker for range bar
                  const totalSpan = max - min;
                  const offset = val - min;
                  const percentage = Math.min(Math.max((offset / (totalSpan || 1)) * 100, 5), 95);

                  return (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{bm.name}</p>
                        {bm.description && (
                          <p className="text-[10px] text-slate-400 font-normal mt-0.5">{bm.description}</p>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-sm font-extrabold ${
                          bm.status === 'Elevated' ? 'text-rose-600' :
                          bm.status === 'Low' ? 'text-orange-600' :
                          bm.status === 'Borderline' ? 'text-amber-600' : 'text-slate-900'
                        }`}>
                          {bm.value} <span className="text-xs font-semibold text-slate-500">{bm.unit}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {bm.ref_min} - {bm.ref_max} {bm.unit}
                      </td>
                      <td className="py-3.5 px-4 w-44">
                        <div className="space-y-1">
                          <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden border border-slate-200">
                            {/* Visual reference target zone */}
                            <div className="absolute inset-y-0 left-[20%] right-[20%] bg-emerald-100 rounded-full" />
                            {/* Value pointer pin */}
                            <div
                              className={`absolute top-0 bottom-0 w-2.5 rounded-full ${
                                bm.status === 'Elevated' ? 'bg-rose-500' :
                                bm.status === 'Low' ? 'bg-orange-500' :
                                bm.status === 'Borderline' ? 'bg-amber-500' : 'bg-emerald-600'
                              }`}
                              style={{ left: `calc(${percentage}% - 5px)` }}
                            />
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-400">
                            <span>{bm.ref_min}</span>
                            <span>Optimal</span>
                            <span>{bm.ref_max}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Badge status={bm.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor Notes & Findings Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Key Diagnostic Highlights</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {(report.key_findings || []).map((kf, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{kf}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Ordering Physician Notes</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {report.doctor_notes || "No physician observations noted at ingestion time."}
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              Attached source document: <strong className="text-slate-600">{report.file_name}</strong> ({report.file_size})
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Diagnostic Report"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Are you sure you want to delete this report (<strong className="text-slate-900">{report.title}</strong>)? This cannot be undone.
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
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Feedback */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="info"
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
};
