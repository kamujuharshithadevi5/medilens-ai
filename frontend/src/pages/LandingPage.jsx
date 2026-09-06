import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  Upload,
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileText,
  AlertTriangle,
  Stethoscope
} from 'lucide-react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                MediLens <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">AI</span>
              </span>
              <p className="text-[11px] text-emerald-800 font-semibold tracking-wide">Medical Report Intelligence</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-emerald-700 transition-colors">Key Features</a>
            <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">How It Works</a>
            <a href="#security" className="hover:text-emerald-700 transition-colors">Security & Ethics</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md shadow-emerald-900/20 transition-all flex items-center gap-2"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-emerald-50/20 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-8">
            <DisclaimerBanner />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold border border-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Modern Healthcare Report Companion</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Understand Your Lab Reports in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600">Clear Plain English</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                MediLens AI translates complex diagnostic blood work, metabolic panels, and pathology sheets into structured biomarker insights and helpful questions for your next physician visit.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/upload"
                  className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Your First Report</span>
                </Link>

                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>View Live Demo</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Supports PDF, JPG & PNG
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  No API Key Required
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  100% Free & Open
                </span>
              </div>
            </div>

            {/* Right Hero Interactive Card Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl" />

                <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        CMP
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-slate-900">Comprehensive Metabolic Panel</h2>
                        <p className="text-[11px] text-slate-400">MetroPath Diagnostics • Aug 28, 2026</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Analyzed
                    </span>
                  </div>

                  {/* Biomarker sample rows */}
                  <div className="space-y-2.5">
                    <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-800">Fasting Glucose</p>
                        <p className="text-[10px] text-slate-500">Normal Range: 70 - 99 mg/dL</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-amber-700 text-sm">106.0 mg/dL</span>
                        <span className="block text-[10px] font-bold text-amber-600">Borderline</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-800">Serum Creatinine</p>
                        <p className="text-[10px] text-slate-500">Normal Range: 0.6 - 1.2 mg/dL</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-700 text-sm">0.95 mg/dL</span>
                        <span className="block text-[10px] font-bold text-emerald-600">Optimal</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-800">Estimated GFR</p>
                        <p className="text-[10px] text-slate-500">Normal Range: &gt; 60 mL/min</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-700 text-sm">98 mL/min</span>
                        <span className="block text-[10px] font-bold text-emerald-600">Healthy</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Quick Insight Box */}
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <BrainCircuit className="w-4 h-4 text-emerald-700" />
                      <span>AI Informational Takeaway</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-emerald-900">
                      Electrolytes and kidney filtration indicate strong baseline stability. Glucose is mildly elevated above 99 mg/dL; discuss fasting glucose trends with your doctor.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/analysis/REP-2026-001')}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors text-center"
                  >
                    View Full Clinical Breakdown →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Clinical Capabilities
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Built for Clarity, Accuracy & Health Awareness
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              MediLens AI empowers patients with intelligent data organization without ever replacing professional medical consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="health-card p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Universal Document Ingestion</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Upload your lab documents seamlessly in PDF, JPG, JPEG, or PNG format with instant digital indexing.
              </p>
            </div>

            <div className="health-card p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Plain-English AI Explanations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Decode confusing acronyms and medical metrics into understandable concepts tailored for patient empowerment.
              </p>
            </div>

            <div className="health-card p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Longitudinal Trend Analytics</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track how key biomarkers like Cholesterol, Fasting Blood Glucose, and Blood Pressure evolve across multiple months.
              </p>
            </div>

            <div className="health-card p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Value Flags</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instant visual indicators categorize parameters as Normal, Borderline, or Elevated based on standard medical ranges.
              </p>
            </div>

            <div className="health-card p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Doctor Discussion Guides</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get recommended questions to ask your physician so you make the most of every appointment.
              </p>
            </div>

            <div className="health-card p-6 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Safe & Transparent Architecture</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Works locally without external API dependencies. Strict clinical informational boundaries protect patient safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Workflow
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Three Simple Steps to Health Literacy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-700 text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Diagnostic Report</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Drag and drop your lab report in PDF or image format (JPG/PNG).
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-700 text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Analysis</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Biomarkers are mapped against standardized clinical reference ranges and summarized.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-700 text-white font-extrabold text-lg flex items-center justify-center mb-4 shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Consult Your Physician</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bring organized questions and trends to your appointment for productive health conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="py-16 bg-[#062c20] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Take Control of Your Health Data?
          </h2>
          <p className="text-emerald-200/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Experience MediLens AI today. Upload your reports or browse pre-loaded clinical panels.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 text-sm font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg transition-colors"
            >
              Open Dashboard Now
            </Link>
            <Link
              to="/register"
              className="px-8 py-3.5 text-sm font-bold text-white bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-600/50 rounded-xl transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#031912] text-slate-400 py-10 px-4 sm:px-8 text-xs border-t border-emerald-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <HeartPulse className="w-5 h-5 text-emerald-400" />
            <span>MediLens AI</span>
          </div>
          <p className="text-center sm:text-right max-w-xl text-slate-400 text-[11px] leading-relaxed">
            Medical Disclaimer: MediLens AI is an informational report exploration tool. It does not provide medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider.
          </p>
        </div>
      </footer>
    </div>
  );
};
