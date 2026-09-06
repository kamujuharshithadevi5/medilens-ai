import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Bell, Upload, Server, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const Navbar = ({ setIsMobileOpen }) => {
  const { user } = useAuth();
  const { unreadAlertsCount, isBackendConnected } = useData();
  const location = useLocation();

  // Page title mapping
  const pageTitles = {
    '/dashboard': 'Clinical Dashboard',
    '/reports': 'Diagnostic Reports',
    '/upload': 'Upload Medical Report',
    '/analysis': 'AI Clinical Analysis',
    '/analytics': 'Health Trend Analytics',
    '/alerts': 'Biomarker Alerts',
    '/profile': 'Patient Health Profile',
    '/settings': 'System & AI Settings',
  };

  const currentTitle = pageTitles[location.pathname] || 'MediLens AI Portal';

  return (
    <header className="sticky top-0 z-30 h-18 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{currentTitle}</h1>
          <p className="text-xs text-slate-500 hidden sm:block">Automated Biomarker Ingestion & Health Insights</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Backend Status indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-slate-50 border-slate-200">
          <Server className={`w-3.5 h-3.5 ${isBackendConnected ? 'text-emerald-600' : 'text-amber-500'}`} />
          <span className="text-slate-600">
            {isBackendConnected ? 'FastAPI Connected' : 'Local Standalone Mode'}
          </span>
          <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
        </div>

        {/* Upload Quick Action */}
        <Link
          to="/upload"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload</span>
        </Link>

        {/* Alerts Bell */}
        <Link
          to="/alerts"
          className="relative p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
          aria-label="View health alerts"
        >
          <Bell className="w-5 h-5" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              {unreadAlertsCount}
            </span>
          )}
        </Link>

        {/* User Pill */}
        <Link
          to="/profile"
          className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl hover:bg-slate-100 border border-slate-200/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold text-xs">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <span className="text-xs font-semibold text-slate-800 hidden md:inline-block">
            {user?.name || 'Alex Morgan'}
          </span>
        </Link>
      </div>
    </header>
  );
};
