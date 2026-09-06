import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Image,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  Eye
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Toast } from '../components/common/Toast';

export const UploadReportPage = () => {
  const { uploadReport } = useData();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Metadata form
  const [formData, setFormData] = useState({
    title: 'Routine Comprehensive Metabolic Check',
    category: 'Metabolic',
    doctor: 'Dr. Elena Vance, MD',
    lab: 'MetroPath Diagnostics Lab',
    date: new Date().toISOString().split('T')[0],
    notes: 'Routine outpatient blood draw'
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [createdReport, setCreatedReport] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];

  const validateAndSetFile = (file) => {
    setFileError('');
    if (!file) return;

    const fileExt = file.name.split('.').pop().toLowerCase();
    const isValidExt = ['pdf', 'jpg', 'jpeg', 'png'].includes(fileExt);

    if (!isValidExt && !allowedTypes.includes(file.type)) {
      setFileError('Unsupported file format. Please upload a PDF, JPG, JPEG, or PNG document.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setFileError('File size exceeds 25MB limit.');
      return;
    }

    setSelectedFile(file);
    // Auto-fill title if generic
    if (!formData.title || formData.title === 'Routine Comprehensive Metabolic Check') {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setFormData(prev => ({ ...prev, title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1) }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError('Please select or drop a medical report file.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);

    // Prepare FormData for multipart backend upload
    const payload = new FormData();
    payload.append('file', selectedFile);
    payload.append('title', formData.title);
    payload.append('category', formData.category);
    payload.append('doctor', formData.doctor);
    payload.append('lab', formData.lab);
    payload.append('notes', formData.notes);

    // Simulate animated upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 85) {
          clearInterval(interval);
          return 85;
        }
        return prev + 15;
      });
    }, 120);

    try {
      const report = await uploadReport(payload, {
        ...formData,
        file_name: selectedFile.name,
        file_size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
      });

      clearInterval(interval);
      setUploadProgress(100);

      setTimeout(() => {
        setIsUploading(false);
        setCreatedReport(report);
        setToastMessage('Report uploaded and biomarkers catalogued successfully!');
      }, 400);
    } catch {
      clearInterval(interval);
      setIsUploading(false);
      setFileError('Failed to process report upload. Please retry.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button and page title */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to previous page</span>
        </button>
        <span className="text-xs text-slate-400 font-medium">Supported: PDF, JPG, JPEG, PNG</span>
      </div>

      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Upload Medical Lab Report</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Upload diagnostic panels, blood tests, or pathology scans to map biomarkers and view AI insights
        </p>
      </div>

      {/* Upload Success State */}
      {createdReport ? (
        <div className="health-card p-8 bg-white border border-emerald-200 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900">Upload & Ingestion Complete!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Report <strong className="text-slate-800">{createdReport.title}</strong> was successfully catalogued. Extracted{' '}
              <strong className="text-emerald-700">{createdReport.biomarkers?.length || 4} diagnostic biomarkers</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/reports/${createdReport.id}`)}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>View Report Details</span>
            </button>

            <button
              onClick={() => navigate(`/analysis/${createdReport.id}`)}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Launch AI Clinical Breakdown</span>
            </button>

            <button
              onClick={() => {
                setCreatedReport(null);
                setSelectedFile(null);
                setUploadProgress(0);
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Upload Another
            </button>
          </div>
        </div>
      ) : (
        /* Upload Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Drag and Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !selectedFile && fileInputRef.current?.click()}
            className={`health-card p-8 border-2 border-dashed text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50/70 scale-[1.01]'
                : selectedFile
                ? 'border-emerald-400 bg-emerald-50/20'
                : 'border-slate-300 hover:border-emerald-400 bg-white hover:bg-slate-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={handleFileChange}
              className="hidden"
            />

            {selectedFile ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                  {selectedFile.type.includes('image') ? (
                    <Image className="w-7 h-7" />
                  ) : (
                    <FileText className="w-7 h-7" />
                  )}
                </div>

                <div>
                  <p className="font-bold text-slate-900 text-sm">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for processing
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove File</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Drag and drop your lab report here, or <span className="text-emerald-700 underline">browse files</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Accepts <strong>PDF, JPG, JPEG, PNG</strong> documents up to 25MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {fileError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{fileError}</span>
            </div>
          )}

          {/* Metadata Fields */}
          <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Report Metadata Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Report Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Lipid Panel, Complete Blood Count"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium text-slate-800"
                >
                  <option value="Blood Test">Blood Test (Hematology)</option>
                  <option value="Metabolic">Metabolic Panel (CMP/BMP)</option>
                  <option value="Cardiology">Cardiology (Lipid/Cardio)</option>
                  <option value="Pathology">Pathology & Endocrine</option>
                  <option value="Radiology">Radiology Scan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ordering Physician
                </label>
                <input
                  type="text"
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  placeholder="Dr. Elena Vance, MD"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Diagnostic Facility / Lab
                </label>
                <input
                  type="text"
                  value={formData.lab}
                  onChange={(e) => setFormData({ ...formData, lab: e.target.value })}
                  placeholder="MetroPath Diagnostics Lab"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Notes / Context
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any symptoms, fasting conditions, or medication notes..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                />
              </div>
            </div>
          </div>

          {/* Upload Progress Simulation */}
          {isUploading && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex justify-between text-xs font-bold text-emerald-900">
                <span>Ingesting document and extracting biomarkers...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/reports')}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isUploading ? 'Processing File...' : 'Upload & Analyze Report'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Feedback Toast */}
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
