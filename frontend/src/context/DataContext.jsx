import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { DEFAULT_REPORTS, DEFAULT_ALERTS, DEFAULT_ANALYTICS } from './mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('medilens_reports');
      return saved ? JSON.parse(saved) : DEFAULT_REPORTS;
    } catch {
      return DEFAULT_REPORTS;
    }
  });

  const [alerts, setAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('medilens_alerts');
      return saved ? JSON.parse(saved) : DEFAULT_ALERTS;
    } catch {
      return DEFAULT_ALERTS;
    }
  });

  const [analytics, setAnalytics] = useState(DEFAULT_ANALYTICS);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('medilens_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('medilens_alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Initial load from backend if available
  useEffect(() => {
    const checkAndSync = async () => {
      setLoading(true);
      const health = await apiService.checkHealth();
      if (health.status === 'online') {
        setIsBackendConnected(true);
        const [backendReports, backendAlerts, backendAnalytics] = await Promise.all([
          apiService.getReports(),
          apiService.getAlerts(),
          apiService.getAnalytics()
        ]);
        if (backendReports && backendReports.length > 0) setReports(backendReports);
        if (backendAlerts && backendAlerts.length > 0) setAlerts(backendAlerts);
        if (backendAnalytics) setAnalytics(backendAnalytics);
      } else {
        setIsBackendConnected(false);
      }
      setLoading(false);
    };

    checkAndSync();
  }, []);

  // Upload / add a report
  const uploadReport = async (formData, metadata) => {
    let newReport = null;

    if (isBackendConnected) {
      newReport = await apiService.createReport(formData);
    }

    if (!newReport) {
      // Create locally
      const newId = `REP-2026-${String(reports.length + 1).padStart(3, '0')}`;
      const today = new Date().toISOString().split('T')[0];

      // Sample mock biomarkers based on category
      let mockBiomarkers = [
        { name: "Hemoglobin", value: 14.8, unit: "g/dL", ref_min: 13.5, ref_max: 17.5, status: "Normal", description: "Oxygen carrying protein in red blood cells" },
        { name: "White Blood Cells", value: 7.2, unit: "k/uL", ref_min: 4.5, ref_max: 11.0, status: "Normal", description: "Infection fighting cells" },
        { name: "Platelets", value: 225.0, unit: "k/uL", ref_min: 150.0, ref_max: 450.0, status: "Normal", description: "Clotting cells" }
      ];

      if (metadata.category === 'Cardiology') {
        mockBiomarkers = [
          { name: "Total Cholesterol", value: 215.0, unit: "mg/dL", ref_min: 125.0, ref_max: 200.0, status: "Elevated", description: "Total blood cholesterol" },
          { name: "LDL Cholesterol", value: 132.0, unit: "mg/dL", ref_min: 50.0, ref_max: 100.0, status: "Elevated", description: "Low-density lipoprotein" },
          { name: "HDL Cholesterol", value: 55.0, unit: "mg/dL", ref_min: 40.0, ref_max: 80.0, status: "Normal", description: "High-density lipoprotein" }
        ];
      } else if (metadata.category === 'Metabolic') {
        mockBiomarkers = [
          { name: "Fasting Glucose", value: 104.0, unit: "mg/dL", ref_min: 70.0, ref_max: 99.0, status: "Borderline", description: "Fasting blood sugar" },
          { name: "Serum Creatinine", value: 0.98, unit: "mg/dL", ref_min: 0.6, ref_max: 1.2, status: "Normal", description: "Kidney filtration rate indicator" }
        ];
      }

      newReport = {
        id: newId,
        title: metadata.title || "Diagnostic Report",
        patient_name: metadata.patient_name || "Alex Morgan",
        date: today,
        category: metadata.category || "Blood Test",
        status: "Analyzed",
        doctor: metadata.doctor || "Dr. Elena Vance, MD",
        lab: metadata.lab || "MetroPath Diagnostics Lab",
        summary: `Automated informational analysis generated for ${metadata.title}. Key diagnostic values catalogued for health trend monitoring.`,
        file_name: metadata.file_name || "medical_report.pdf",
        file_size: metadata.file_size || "1.4 MB",
        biomarkers: mockBiomarkers,
        key_findings: [
          `Catalogued ${mockBiomarkers.length} biomarker measurements from ${metadata.file_name || 'report'}.`,
          "Biomarkers cross-referenced against clinical population reference limits.",
          "Summary generated for informational patient tracking."
        ],
        doctor_notes: metadata.notes || "Report recorded via MediLens AI portal."
      };

      // Add alert if elevated
      const hasElevated = mockBiomarkers.some(b => b.status === 'Elevated');
      if (hasElevated) {
        const newAlert = {
          id: `ALT-${Math.floor(200 + Math.random() * 800)}`,
          report_id: newId,
          report_title: newReport.title,
          title: `Elevated Marker in ${newReport.title}`,
          description: `One or more biomarkers were flagged as elevated. Review this report with your physician.`,
          severity: 'warning',
          date: today,
          is_read: false,
          biomarker_name: 'Cardiovascular Marker'
        };
        setAlerts(prev => [newAlert, ...prev]);
      }
    }

    setReports(prev => [newReport, ...prev]);
    return newReport;
  };

  // Delete a report
  const deleteReport = async (id) => {
    if (isBackendConnected) {
      await apiService.deleteReport(id);
    }
    setReports(prev => prev.filter(r => r.id !== id));
    setAlerts(prev => prev.filter(a => a.report_id !== id));
    return true;
  };

  // Analyze a report
  const analyzeReport = async (id) => {
    if (isBackendConnected) {
      const backendRes = await apiService.analyzeReport(id);
      if (backendRes) {
        setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Analyzed' } : r));
        return backendRes;
      }
    }

    // Client fallback
    const report = reports.find(r => r.id === id);
    if (!report) return null;

    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Analyzed' } : r));

    const hasElevated = report.biomarkers?.some(b => b.status === 'Elevated' || b.status === 'Low');
    const hasBorderline = report.biomarkers?.some(b => b.status === 'Borderline');

    const breakdown = (report.biomarkers || []).map(b => ({
      name: b.name,
      value: b.value,
      unit: b.unit,
      reference: `${b.ref_min} - ${b.ref_max} ${b.unit}`,
      status: b.status,
      explanation: b.status === 'Elevated'
        ? `Exceeds the standard reference maximum of ${b.ref_max} ${b.unit}.`
        : b.status === 'Low'
        ? `Below the normal physiological threshold of ${b.ref_min} ${b.unit}.`
        : b.status === 'Borderline'
        ? `Near the threshold line (${b.ref_min} - ${b.ref_max} ${b.unit}). Periodic monitoring advised.`
        : `Within standard healthy baseline bounds.`
    }));

    return {
      report_id: report.id,
      report_title: report.title,
      disclaimer: "AI-generated informational explanation — not a diagnosis.",
      overall_status: hasElevated ? "Attention Recommended" : (hasBorderline ? "Borderline" : "Stable"),
      summary: `Informational analysis of '${report.title}' (${report.date}). Evaluated ${report.biomarkers?.length || 0} diagnostic markers. ${
        hasElevated ? "Certain markers exceed standard reference limits and should be discussed with your physician." : "Markers reflect balanced physiological metrics."
      }`,
      key_findings: report.key_findings?.length ? report.key_findings : [
        "Biomarker parameters indexed against adult physiological reference distributions.",
        "Clinical patterns highlighted for patient doctor consultation preparation."
      ],
      suggested_questions: [
        `What do my ${report.category} results signify regarding my daily wellness routine?`,
        "Would any dietary or exercise adjustments help optimize these numbers?",
        "When is the most appropriate timeframe for my next follow-up panel?"
      ],
      biomarker_breakdown: breakdown,
      lifestyle_considerations: [
        "Aim for 7 to 8 hours of quality sleep nightly to support cellular regulation.",
        "Incorporate 30 minutes of brisk daily walking or moderate cardiovascular exercise.",
        "Maintain consistent hydration (approx. 2 liters of water daily)."
      ],
      analyzed_at: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
  };

  // Mark single alert as read
  const markAlertRead = async (id) => {
    if (isBackendConnected) {
      await apiService.markAlertRead(id);
    }
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, is_read: true } : a));
  };

  // Mark all alerts as read
  const markAllAlertsRead = async () => {
    if (isBackendConnected) {
      await apiService.markAllAlertsRead();
    }
    setAlerts(prev => prev.map(a => ({ ...a, is_read: true })));
  };

  const getReport = (id) => {
    return reports.find(r => r.id === id) || null;
  };

  const unreadAlertsCount = alerts.filter(a => !a.is_read).length;

  return (
    <DataContext.Provider value={{
      reports,
      alerts,
      analytics,
      isBackendConnected,
      loading,
      uploadReport,
      deleteReport,
      analyzeReport,
      markAlertRead,
      markAllAlertsRead,
      getReport,
      unreadAlertsCount
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
