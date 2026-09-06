import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BrainCircuit,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  Send,
  Copy,
  Check,
  FileText,
  Activity,
  Calendar,
  Layers
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Badge } from '../components/common/Badge';
import { Toast } from '../components/common/Toast';

export const AIAnalysisPage = () => {
  const { id } = useParams();
  const { reports, analyzeReport } = useData();
  const navigate = useNavigate();

  // If id is provided, select it, otherwise default to first report
  const [selectedReportId, setSelectedReportId] = useState(id || (reports[0]?.id || ''));
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Interactive AI Q&A
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: "Hello Alex! I am your informational health assistant. You can ask me clarifying questions regarding these lab values, acronyms, or what questions might be helpful for your upcoming physician visit."
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // When selected report changes or loads
  useEffect(() => {
    if (selectedReportId) {
      loadAnalysis(selectedReportId);
    }
  }, [selectedReportId]);

  const loadAnalysis = async (repId) => {
    setLoading(true);
    try {
      const data = await analyzeReport(repId);
      setAnalysisData(data);
    } catch {
      console.error('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyQuestion = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setToastMessage('Copied question to clipboard for your doctor visit!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userText = userInput;
    const newChat = [...chatMessages, { sender: 'user', text: userText }];
    setChatMessages(newChat);
    setUserInput('');

    // Simulated contextual informational AI response
    setTimeout(() => {
      let aiResponse = "Informational perspective: Normal reference intervals are established using 95% of healthy population samples. Any single reading is best understood alongside your long-term medical history and clinical examination. Make sure to share this specific value with your doctor.";

      const lower = userText.toLowerCase();
      if (lower.includes('cholesterol') || lower.includes('ldl') || lower.includes('lipid')) {
        aiResponse = "Regarding cholesterol: LDL is frequently called 'atherogenic' because higher circulating amounts can contribute to plaque accumulation over decades. Physicians typically evaluate this in tandem with your HDL, blood pressure, and family history. Discuss whether dietary fiber increases (e.g. oats, beans) or lifestyle changes are appropriate for you.";
      } else if (lower.includes('glucose') || lower.includes('sugar') || lower.includes('diabetes')) {
        aiResponse = "Regarding fasting glucose: Standard overnight fasting normal limits are generally 70 to 99 mg/dL. A reading between 100-125 mg/dL is commonly termed impaired fasting glucose. Physicians usually order an HbA1c test to evaluate your 90-day glucose average before making formal determinations.";
      } else if (lower.includes('vitamin d') || lower.includes('vit d')) {
        aiResponse = "Regarding Vitamin D: Serum levels between 30 and 100 ng/mL are widely regarded as sufficient. When levels dip below 30 ng/mL, physicians often recommend Vitamin D3 supplementation with meals containing dietary fat. Retesting in 3 to 6 months helps track improvement.";
      }

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiResponse
        }
      ]);
    }, 600);
  };

  const currentReport = reports.find(r => r.id === selectedReportId) || reports[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header with selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/reports')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Reports</span>
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-emerald-700" />
            <span>AI Clinical Analysis & Explanation</span>
          </h2>
          <p className="text-xs text-slate-500">
            Automated informational synthesis of lab parameters and guided physician discussion topics
          </p>
        </div>

        {/* Report Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 shrink-0">Analyze Report:</label>
          <select
            value={selectedReportId}
            onChange={(e) => {
              setSelectedReportId(e.target.value);
              navigate(`/analysis/${e.target.value}`);
            }}
            className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-800 shadow-2xs"
          >
            {reports.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title} ({r.date})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prominent Mandatory AI Disclaimer Banner */}
      <div className="p-4 bg-emerald-900 text-emerald-50 rounded-2xl shadow-lg border border-emerald-800 space-y-2">
        <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm sm:text-base">
          <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>AI-generated informational explanation — not a diagnosis.</span>
        </div>
        <p className="text-xs text-emerald-100/90 leading-relaxed pl-7">
          This system uses automated computational intelligence to summarize and map diagnostic laboratory markers against established medical reference intervals. <strong>MediLens AI does not diagnose diseases, recommend medications, or replace licensed physician consultation.</strong> Always present laboratory findings directly to a licensed healthcare practitioner for medical evaluation and diagnostic decisions.
        </p>
      </div>

      {loading ? (
        <div className="health-card p-12 text-center bg-white border border-slate-200">
          <div className="w-10 h-10 mx-auto border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-bold text-slate-800">Synthesizing clinical parameters...</p>
          <p className="text-xs text-slate-400 mt-1">Cross-referencing biomarker thresholds</p>
        </div>
      ) : analysisData ? (
        <div className="space-y-6">
          {/* Overview Card */}
          <div className="health-card p-6 sm:p-8 bg-white border border-slate-200 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {currentReport?.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{analysisData.analyzed_at}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{analysisData.report_title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Informational Status:</span>
                <Badge status={analysisData.overall_status} />
              </div>
            </div>

            {/* Plain English Summary */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Plain-English Summary</span>
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {analysisData.summary}
              </p>
            </div>

            {/* Key Clinical Findings */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Identified Clinical Patterns</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysisData.key_findings.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs text-emerald-950 font-medium flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-200/80 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Biomarker Breakdown with AI Explanations */}
          <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span>Biomarker Interpretations & Context</span>
              </h3>
              <span className="text-xs text-slate-400">Reference: Standard Adult Reference Bounds</span>
            </div>

            <div className="space-y-3">
              {(analysisData.biomarker_breakdown || []).map((bm, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border transition-all ${
                    bm.status === 'Elevated'
                      ? 'bg-rose-50/40 border-rose-200'
                      : bm.status === 'Borderline'
                      ? 'bg-amber-50/40 border-amber-200'
                      : bm.status === 'Low'
                      ? 'bg-orange-50/40 border-orange-200'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{bm.name}</span>
                      <Badge status={bm.status} />
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      Value: <strong className="text-slate-900 font-bold">{bm.value} {bm.unit}</strong>{' '}
                      <span className="text-slate-400 font-normal">(Ref: {bm.reference})</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {bm.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Questions for Your Doctor Card */}
          <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-700" />
                <span>Suggested Questions for Your Physician</span>
              </h3>
              <span className="text-xs text-slate-500">Take these to your next checkup</span>
            </div>

            <div className="space-y-2.5">
              {analysisData.suggested_questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-4 group hover:bg-slate-100/80 transition-colors"
                >
                  <div className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      Q{idx + 1}
                    </span>
                    <span className="leading-relaxed">{q}</span>
                  </div>

                  <button
                    onClick={() => handleCopyQuestion(q, idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors shrink-0 cursor-pointer"
                    title="Copy question"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive AI Clarification Chat Box */}
          <div className="health-card p-6 bg-white border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-1.5 bg-emerald-700 text-white rounded-lg">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Ask MediLens AI About This Report</h3>
                <p className="text-[11px] text-slate-400">Ask clarifying questions regarding these clinical parameters</p>
              </div>
            </div>

            {/* Chat History */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-700 text-white rounded-br-xs font-medium'
                        : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about this panel (e.g. 'What does elevated LDL mean?' or 'How to prep for fasting glucose?')..."
                className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium text-slate-900"
              />
              <button
                type="submit"
                className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}

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
