import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  BrainCircuit,
  BarChart3,
  Bell,
  User,
  Settings,
  LogOut,
  Activity,
  HeartPulse
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();
  const { unreadAlertsCount } = useData();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Upload Report', path: '/upload', icon: UploadCloud },
    { name: 'AI Analysis', path: '/analysis', icon: BrainCircuit },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: unreadAlertsCount },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobile = () => {
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#062c20] text-slate-100 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-18 px-6 flex items-center gap-3 border-b border-emerald-950/60 bg-[#042017]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-900/30">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              MediLens <span className="text-emerald-400 text-sm font-semibold px-1.5 py-0.5 rounded bg-emerald-900/70 border border-emerald-700/50">AI</span>
            </span>
            <p className="text-[11px] text-emerald-300/80 font-medium">Clinical Intelligence</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-5 px-3.5 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400/60">
            Navigation Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 font-semibold'
                      : 'text-emerald-100/80 hover:bg-emerald-900/50 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 opacity-90" />
                  <span>{item.name}</span>
                </div>
                {item.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white shadow-xs">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom User Profile Card & Logout */}
        <div className="p-4 border-t border-emerald-950/80 bg-[#042017]/90">
          <div className="flex items-center gap-3 mb-3 p-2 rounded-xl bg-emerald-950/60 border border-emerald-900/50">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-sm">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Patient'}</p>
              <p className="text-[11px] text-emerald-400/80 truncate">ID: {user?.id || 'USR-8821'}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400" title="Profile Active" />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-emerald-200/80 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors border border-emerald-900/40"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
