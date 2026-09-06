import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Trash2,
  BrainCircuit,
  Calendar,
  Layers,
  LayoutGrid,
  List,
  CheckCircle2,
  ArrowUpDown,
  FileCheck
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Toast } from '../components/common/Toast';

export const ReportsPage = () => {
  const { reports, deleteReport } = useData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const categories = ['All', 'Blood Test', 'Metabolic', 'Cardiology', 'Pathology'];
  const statuses = ['All', 'Analyzed', 'Pending', 'Review Required'];

  const filteredReports = useMemo(() => {
    return reports
      .filter((r) => {
        const matchesCat = selectedCategory === 'All' || r.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesStatus = selectedStatus === 'All' || r.status.toLowerCase() === selectedStatus.toLowerCase();
        const s = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !s ||
          r.title.toLowerCase().includes(s) ||
          r.doctor.toLowerCase().includes(s) ||
          r.lab.toLowerCase().includes(s) ||
          r.biomarkers?.some((b) => b.name.toLowerCase().includes(s));
        return matchesCat && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
        return a.title.localeCompare(b.title);
      });
  }, [reports, searchTerm, selectedCategory, selectedStatus, sortBy]);

  const confirmDelete = (report) => {
    setReportToDelete(report);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (reportToDelete) {
      await deleteReport(reportToDelete.id);
      setDeleteModalOpen(false);
      setReportToDelete(null);
      setToastMessage('Report was deleted from your history.');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic Reports Repository
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Search, filter, inspect, and analyze all your medical lab documents
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/upload"
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Report</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="health-card p-4 sm:p-5 bg-white border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by report name, doctor, lab, biomarker (e.g. Glucose)..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50/70 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 outline-hidden"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50/70 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 font-medium"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  Status: {s}
                </option>
              ))}
            </select>
          </div>

          {/* Sort & View Toggle */}
          <div className="sm:col-span-2 flex items-center justify-end gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-2 py-2 text-xs bg-slate-50/70 border border-slate-300 rounded-xl text-slate-800 font-medium"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>

            <div className="flex border border-slate-200 rounded-xl p-0.5 bg-slate-100 shrink-0">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg ${viewMode === 'table' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
                title="Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
                title="Card Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter tags & active counts */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800 font-semibold">{filteredReports.length}</strong> of {reports.length} reports
          </span>
          {(searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={clearFilters}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Reports Display: Table or Grid */}
      {filteredReports.length === 0 ? (
        <div className="health-card p-12 text-center bg-white border border-slate-200 space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching reports found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or filters to find the clinical document you need.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <div className="health-card bg-white border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200/80">
                <tr>
                  <th className="py-3.5 px-4">Report Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Test Date</th>
                  <th className="py-3.5 px-4">Doctor & Facility</th>
                  <th className="py-3.5 px-4">Biomarkers</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0 border border-emerald-100">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <Link
                            to={`/reports/${report.id}`}
                            className="font-bold text-slate-900 hover:text-emerald-700 text-sm block"
                          >
                            {report.title}
                          </Link>
                          <span className="text-[11px] text-slate-400 font-normal">
                            {report.id} • {report.file_name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200/60">
                        {report.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{report.date}</td>
                    <td className="py-3.5 px-4">
                      <p className="text-slate-800 font-semibold">{report.doctor}</p>
                      <p className="text-[10px] text-slate-400">{report.lab}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {report.biomarkers?.length || 0} markers
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={report.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => navigate(`/reports/${report.id}`)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/analysis/${report.id}`)}
                          className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="AI Analysis"
                        >
                          <BrainCircuit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDelete(report)}
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
      ) : (
        /* Card Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="health-card p-5 bg-white border border-slate-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <Badge status={report.status} />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    {report.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5 line-clamp-2">
                    {report.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {report.date} • {report.id}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
                  <p className="truncate">
                    <strong className="text-slate-800">Doctor:</strong> {report.doctor}
                  </p>
                  <p className="truncate">
                    <strong className="text-slate-800">Lab:</strong> {report.lab}
                  </p>
                  <p>
                    <strong className="text-slate-800">Biomarkers:</strong> {report.biomarkers?.length || 0} catalogued
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => confirmDelete(report)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Report"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/reports/${report.id}`)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => navigate(`/analysis/${report.id}`)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <BrainCircuit className="w-3.5 h-3.5" />
                    <span>Analyze</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Diagnostic Report"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Are you sure you want to delete <strong className="text-slate-900">{reportToDelete?.title}</strong>? All associated biomarker values and alerts will be permanently removed.
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
          type="success"
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
};
