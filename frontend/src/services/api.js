// API service to communicate with the FastAPI backend with offline local fallback
const API_BASE = '/api';

export const apiService = {
  // Check backend health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch {
      return { status: 'offline', total_reports: 6, active_alerts: 3 };
    }
  },

  // Fetch all reports
  async getReports(search = '', category = '', status = '') {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'All') params.append('category', category);
    if (status && status !== 'All') params.append('status', status);

    try {
      const res = await fetch(`${API_BASE}/reports?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch reports');
      return await res.json();
    } catch {
      return null; // Signals context to use local cache
    }
  },

  // Fetch single report by ID
  async getReportById(id) {
    try {
      const res = await fetch(`${API_BASE}/reports/${id}`);
      if (!res.ok) throw new Error('Failed to fetch report');
      return await res.json();
    } catch {
      return null;
    }
  },

  // Upload/create report
  async createReport(formData) {
    try {
      const res = await fetch(`${API_BASE}/reports`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create report');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, handled by local context state:', err);
      return null;
    }
  },

  // Delete report
  async deleteReport(id) {
    try {
      const res = await fetch(`${API_BASE}/reports/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete report');
      return await res.json();
    } catch {
      return { success: true, localOnly: true };
    }
  },

  // Run AI analysis
  async analyzeReport(id) {
    try {
      const res = await fetch(`${API_BASE}/reports/${id}/analyze`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to analyze report');
      return await res.json();
    } catch {
      return null;
    }
  },

  // Fetch alerts
  async getAlerts() {
    try {
      const res = await fetch(`${API_BASE}/alerts`);
      if (!res.ok) throw new Error('Failed to fetch alerts');
      return await res.json();
    } catch {
      return null;
    }
  },

  // Mark alert as read
  async markAlertRead(id) {
    try {
      const res = await fetch(`${API_BASE}/alerts/${id}/read`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to mark alert as read');
      return await res.json();
    } catch {
      return { success: true, localOnly: true };
    }
  },

  // Mark all alerts as read
  async markAllAlertsRead() {
    try {
      const res = await fetch(`${API_BASE}/alerts/read-all`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to mark all alerts read');
      return await res.json();
    } catch {
      return { success: true, localOnly: true };
    }
  },

  // Fetch analytics data
  async getAnalytics() {
    try {
      const res = await fetch(`${API_BASE}/analytics`);
      if (!res.ok) throw new Error('Failed to fetch analytics');
      return await res.json();
    } catch {
      return null;
    }
  },
};
