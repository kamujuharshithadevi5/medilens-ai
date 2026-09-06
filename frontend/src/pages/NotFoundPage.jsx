import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, ArrowLeft, Home, FileText } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-md w-full health-card p-8 bg-white border border-slate-200 space-y-6 shadow-xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-xs">
          <HeartPulse className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Error 404 • Missing Record
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic Path Not Found
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page or clinical resource you are seeking does not exist or has been archived.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/reports"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>View Reports</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
