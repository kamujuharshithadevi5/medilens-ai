import React, { useState } from 'react';
import {
  Settings,
  Bell,
  BrainCircuit,
  Shield,
  Save,
  Download,
  Trash2,
  CheckCircle2,
  Lock,
  Eye,
  Sliders
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Toast } from '../components/common/Toast';

export const SettingsPage = () => {
  const { user, updateSettings } = useAuth();
  const { reports, alerts } = useData();

  const [settings, setSettings] = useState({
    emailNotifications: user?.settings?.emailNotifications ?? true,
    smsAlerts: user?.settings?.smsAlerts ?? true,
    criticalOnly: user?.settings?.criticalOnly ?? false,
    aiDetailLevel: user?.settings?.aiDetailLevel ?? 'Standard',
    showMedicalTerms: user?.settings?.showMedicalTerms ?? true,
    twoFactorAuth: user?.settings?.twoFactorAuth ?? true,
  });

  const [toastMessage, setToastMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateSettings(settings);
      setIsSaving(false);
      setToastMessage('Portal settings and preferences saved successfully!');
    }, 350);
  };

  const handleExportData = () => {
    const exportBundle = {
      patient: user,
      reports_count: reports.length,
      reports,
      alerts_count: alerts.length,
      alerts,
      exported_at: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `MediLens_Patient_Export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setToastMessage('Medical records export downloaded successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header and Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-700" />
            <span>Application & AI Settings</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure alert delivery channels, AI explanation depth, and privacy controls
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer w-fit"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving Settings...' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Notification Preferences */}
        <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-700" />
            <span>Biomarker Alert Notifications</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-900">Email Health Summaries</p>
                <p className="text-[11px] text-slate-500">
                  Receive email digests when new reports are catalogued or flagged.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-900">SMS Out-of-Range Alerts</p>
                <p className="text-[11px] text-slate-500">
                  Receive rapid text message notifications for elevated lab values.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.smsAlerts}
                onChange={() => handleToggle('smsAlerts')}
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-900">Critical Alerts Only</p>
                <p className="text-[11px] text-slate-500">
                  Mute routine informational alerts and only trigger for elevated or low flags.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.criticalOnly}
                onChange={() => handleToggle('criticalOnly')}
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* AI Analysis Preferences */}
        <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-emerald-700" />
            <span>AI Explanation & Clinical Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Explanation Detail Level
              </label>
              <select
                value={settings.aiDetailLevel}
                onChange={(e) => setSettings({ ...settings, aiDetailLevel: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium text-slate-800"
              >
                <option value="Concise">Concise (High-level bullets)</option>
                <option value="Standard">Standard (Balanced clarity)</option>
                <option value="In-Depth">In-Depth (Comprehensive metabolic context)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Medical Nomenclature
              </label>
              <select
                value={settings.showMedicalTerms ? 'True' : 'False'}
                onChange={(e) => setSettings({ ...settings, showMedicalTerms: e.target.value === 'True' })}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium text-slate-800"
              >
                <option value="True">Show Medical Jargon with Explanations</option>
                <option value="False">Strict Plain English Translation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy & Data Controls */}
        <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>Security & Data Ownership</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-900">Two-Factor Authentication (2FA)</p>
                <p className="text-[11px] text-slate-500">
                  Enhanced verification required when signing in on unrecognized devices.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle('twoFactorAuth')}
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <p className="text-xs font-bold text-slate-900">Export All Medical Records</p>
                <p className="text-[11px] text-slate-500">
                  Download a full JSON archive containing all catalogued biomarkers, reports, and history.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportData}
                className="px-3.5 py-1.5 text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-emerald-700" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>

      {/* Toast Notification */}
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
