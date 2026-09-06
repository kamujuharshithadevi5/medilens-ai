import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  ShieldAlert,
  Filter,
  ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Badge } from '../components/common/Badge';
import { Toast } from '../components/common/Toast';

export const AlertsPage = () => {
  const { alerts, markAlertRead, markAllAlertsRead } = useData();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Unread' | 'Read'
  const [severityFilter, setSeverityFilter] = useState('All'); // 'All' | 'critical' | 'warning' | 'info'
  const [toastMessage, setToastMessage] = useState('');

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Unread' && !a.is_read) ||
        (statusFilter === 'Read' && a.is_read);

      const matchesSeverity =
        severityFilter === 'All' ||
        a.severity.toLowerCase() === severityFilter.toLowerCase();

      return matchesStatus && matchesSeverity;
    });
  }, [alerts, statusFilter, severityFilter]);

  const unreadCount = alerts.filter((a) => !a.is_read).length;

  const handleMarkRead = async (id) => {
    await markAlertRead(id);
    setToastMessage('Alert marked as reviewed.');
  };

  const handleMarkAllRead = async () => {
    await markAllAlertsRead();
    setToastMessage('All health alerts marked as read.');
  };

  const getSeverityConfig = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return {
          icon: AlertTriangle,
          bg: 'bg-rose-50 border-rose-200',
          text: 'text-rose-900',
          iconColor: 'text-rose-600',
          badge: 'Elevated Alert'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-50 border-amber-200',
          text: 'text-amber-900',
          iconColor: 'text-amber-600',
          badge: 'Borderline'
        };
      default:
        return {
          icon: Info,
          bg: 'bg-slate-50 border-slate-200',
          text: 'text-slate-900',
          iconColor: 'text-emerald-600',
          badge: 'Informational'
        };
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header and Mark All Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <Bell className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Clinical Awareness
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Biomarker Health Alerts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            You have <strong className="text-slate-800 font-bold">{unreadCount} unread</strong> notification{unreadCount === 1 ? '' : 's'} regarding out-of-range lab metrics
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-2xs w-fit"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="health-card p-4 bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 font-bold uppercase text-[10px] flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>

          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              statusFilter === 'All' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({alerts.length})
          </button>

          <button
            onClick={() => setStatusFilter('Unread')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              statusFilter === 'Unread' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Unread ({unreadCount})
          </button>

          <button
            onClick={() => setStatusFilter('Read')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              statusFilter === 'Read' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Read ({alerts.length - unreadCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-slate-500 font-semibold text-[11px]">Severity:</label>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
          >
            <option value="All">All Severities</option>
            <option value="critical">Critical / Elevated</option>
            <option value="warning">Warning / Borderline</option>
            <option value="info">Informational</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="health-card p-12 text-center bg-white border border-slate-200 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No alerts found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no notifications matching your selected filter criteria.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={`health-card p-5 border transition-all ${
                  alert.is_read
                    ? 'bg-white/70 border-slate-200 opacity-75'
                    : `bg-white border-l-4 ${
                        alert.severity === 'critical'
                          ? 'border-l-rose-500 border-slate-200 shadow-xs'
                          : alert.severity === 'warning'
                          ? 'border-l-amber-500 border-slate-200 shadow-xs'
                          : 'border-l-emerald-500 border-slate-200 shadow-xs'
                      }`
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl shrink-0 ${config.bg}`}>
                      <Icon className={`w-5 h-5 ${config.iconColor}`} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className={`text-sm font-bold ${alert.is_read ? 'text-slate-700' : 'text-slate-900'}`}>
                          {alert.title}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          alert.severity === 'critical' ? 'bg-rose-100 text-rose-800' :
                          alert.severity === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {config.badge}
                        </span>
                        {!alert.is_read && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" title="Unread alert" />
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        {alert.description}
                      </p>

                      <div className="pt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                        <span>Report: <strong className="text-slate-600 font-semibold">{alert.report_title}</strong></span>
                        <span>•</span>
                        <span>Date: {alert.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {!alert.is_read && (
                      <button
                        onClick={() => handleMarkRead(alert.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Mark as Read
                      </button>
                    )}

                    {alert.report_id && (
                      <Link
                        to={`/reports/${alert.report_id}`}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <span>View Report</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

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
