export const DEFAULT_REPORTS = [
  {
    id: "REP-2026-001",
    title: "Comprehensive Metabolic Panel (CMP)",
    patient_name: "Alex Morgan",
    date: "2026-08-28",
    category: "Metabolic",
    status: "Analyzed",
    doctor: "Dr. Elena Vance, MD",
    lab: "MetroPath Diagnostics Lab",
    summary: "Key electrolytes and renal function metrics appear balanced. Fasting glucose is mildly elevated compared to optimal fasting targets.",
    file_name: "Comprehensive_Metabolic_Panel_Aug2026.pdf",
    file_size: "2.4 MB",
    biomarkers: [
      { name: "Fasting Glucose", value: 106.0, unit: "mg/dL", ref_min: 70.0, ref_max: 99.0, status: "Borderline", description: "Measures blood sugar level after fasting" },
      { name: "Serum Creatinine", value: 0.95, unit: "mg/dL", ref_min: 0.6, ref_max: 1.2, status: "Normal", description: "Indicator of kidney filtration efficacy" },
      { name: "Blood Urea Nitrogen (BUN)", value: 15.0, unit: "mg/dL", ref_min: 7.0, ref_max: 20.0, status: "Normal", description: "Kidney metabolic waste indicator" },
      { name: "Estimated GFR", value: 98.0, unit: "mL/min", ref_min: 60.0, ref_max: 120.0, status: "Normal", description: "Glomerular filtration rate" },
      { name: "Sodium", value: 139.0, unit: "mEq/L", ref_min: 135.0, ref_max: 145.0, status: "Normal", description: "Primary extracellular electrolyte" },
      { name: "Potassium", value: 4.2, unit: "mEq/L", ref_min: 3.5, ref_max: 5.0, status: "Normal", description: "Essential mineral for heart rhythm" },
      { name: "Total Calcium", value: 9.4, unit: "mg/dL", ref_min: 8.5, ref_max: 10.2, status: "Normal", description: "Bone and metabolic signaling mineral" },
      { name: "Albumin", value: 4.5, unit: "g/dL", ref_min: 3.4, ref_max: 5.4, status: "Normal", description: "Liver synthetic capacity marker" }
    ],
    key_findings: [
      "Fasting glucose of 106 mg/dL indicates borderline pre-diabetic range; monitoring recommended.",
      "Renal filtration (eGFR: 98 mL/min, Creatinine: 0.95 mg/dL) shows strong healthy kidney function.",
      "Electrolyte balance (Sodium, Potassium, Calcium) remains within optimal homeostatic thresholds."
    ],
    doctor_notes: "Patient advised to reduce high glycemic index snacks and repeat fasting glucose / HbA1c in 90 days."
  },
  {
    id: "REP-2026-002",
    title: "Advanced Lipid & Cardiovascular Profile",
    patient_name: "Alex Morgan",
    date: "2026-08-15",
    category: "Cardiology",
    status: "Analyzed",
    doctor: "Dr. Marcus Chen, FACC",
    lab: "Apex Cardio-Diagnostics",
    summary: "Atherogenic markers show moderately elevated LDL-C and Total Cholesterol, while HDL and Triglycerides remain in favorable zones.",
    file_name: "Lipid_Profile_August2026.pdf",
    file_size: "1.8 MB",
    biomarkers: [
      { name: "Total Cholesterol", value: 218.0, unit: "mg/dL", ref_min: 125.0, ref_max: 200.0, status: "Elevated", description: "Total circulating serum cholesterol" },
      { name: "LDL Cholesterol (Calculated)", value: 138.0, unit: "mg/dL", ref_min: 50.0, ref_max: 100.0, status: "Elevated", description: "Low-density lipoprotein / atherogenic carrier" },
      { name: "HDL Cholesterol", value: 58.0, unit: "mg/dL", ref_min: 40.0, ref_max: 80.0, status: "Normal", description: "High-density protective lipoprotein" },
      { name: "Triglycerides", value: 110.0, unit: "mg/dL", ref_min: 50.0, ref_max: 150.0, status: "Normal", description: "Blood circulating fats" },
      { name: "Non-HDL Cholesterol", value: 160.0, unit: "mg/dL", ref_min: 90.0, ref_max: 130.0, status: "Elevated", description: "All atherogenic lipoprotein particles" },
      { name: "hs-CRP (High-Sensitivity)", value: 1.2, unit: "mg/L", ref_min: 0.0, ref_max: 2.0, status: "Normal", description: "Systemic vascular inflammation marker" }
    ],
    key_findings: [
      "LDL Cholesterol is 138 mg/dL (target <100 mg/dL for low-risk individuals).",
      "Total Cholesterol stands at 218 mg/dL, prompting dietary and lifestyle interventions.",
      "Triglycerides (110 mg/dL) and HDL (58 mg/dL) maintain a healthy ratio of ~1.9."
    ],
    doctor_notes: "Recommended Mediterranean dietary pattern, increased dietary soluble fiber, and 150 mins weekly cardiovascular activity."
  },
  {
    id: "REP-2026-003",
    title: "Complete Blood Count (CBC) with Differential",
    patient_name: "Alex Morgan",
    date: "2026-07-20",
    category: "Blood Test",
    status: "Analyzed",
    doctor: "Dr. Elena Vance, MD",
    lab: "MetroPath Diagnostics Lab",
    summary: "All major cell lines (Erythrocytes, Leukocytes, Thrombocytes) demonstrate healthy marrow production with no signs of active infection or anemia.",
    file_name: "CBC_Panel_July2026.pdf",
    file_size: "1.1 MB",
    biomarkers: [
      { name: "White Blood Cell Count (WBC)", value: 6.8, unit: "k/uL", ref_min: 4.5, ref_max: 11.0, status: "Normal", description: "Total leukocyte defense cells" },
      { name: "Red Blood Cell Count (RBC)", value: 4.9, unit: "M/uL", ref_min: 4.3, ref_max: 5.9, status: "Normal", description: "Oxygen-carrying red cells" },
      { name: "Hemoglobin", value: 15.2, unit: "g/dL", ref_min: 13.5, ref_max: 17.5, status: "Normal", description: "Iron-rich oxygen transport protein" },
      { name: "Hematocrit", value: 45.0, unit: "%", ref_min: 38.8, ref_max: 50.0, status: "Normal", description: "Volume percentage of red blood cells" },
      { name: "Platelet Count", value: 245.0, unit: "k/uL", ref_min: 150.0, ref_max: 450.0, status: "Normal", description: "Blood clotting and vascular repair fragments" }
    ],
    key_findings: [
      "Hemoglobin (15.2 g/dL) and Hematocrit (45.0%) reflect robust oxygenation capacity.",
      "Leukocyte differential within reference intervals indicates no active acute inflammatory process.",
      "Platelets at 245 k/uL show normal hemostatic capacity."
    ],
    doctor_notes: "Hematology values are stable and normal. No medical interventions required."
  },
  {
    id: "REP-2026-004",
    title: "Thyroid & Endocrine Function Panel",
    patient_name: "Alex Morgan",
    date: "2026-06-12",
    category: "Pathology",
    status: "Analyzed",
    doctor: "Dr. Sarah Jenkins, MD",
    lab: "EndoCare Specialty Laboratories",
    summary: "Thyroid axis demonstrates euthyroid state with balanced TSH and Free T4 levels.",
    file_name: "Thyroid_Panel_June2026.pdf",
    file_size: "950 KB",
    biomarkers: [
      { name: "Thyroid Stimulating Hormone (TSH)", value: 2.15, unit: "uIU/mL", ref_min: 0.45, ref_max: 4.5, status: "Normal", description: "Pituitary hormone directing thyroid activity" },
      { name: "Free T4 (Thyroxine)", value: 1.28, unit: "ng/dL", ref_min: 0.82, ref_max: 1.77, status: "Normal", description: "Active circulating unbound thyroxine" },
      { name: "Free T3 (Triiodothyronine)", value: 3.1, unit: "pg/mL", ref_min: 2.0, ref_max: 4.4, status: "Normal", description: "Potent metabolic thyroid hormone" }
    ],
    key_findings: [
      "TSH level of 2.15 uIU/mL is well within the ideal mid-normal clinical range.",
      "Free T4 and Free T3 demonstrate consistent peripheral conversion and glandular harmony."
    ],
    doctor_notes: "Thyroid function is optimal. Continue annual baseline monitoring."
  },
  {
    id: "REP-2026-005",
    title: "Vitamin & Micronutrient Screen",
    patient_name: "Alex Morgan",
    date: "2026-05-04",
    category: "Blood Test",
    status: "Review Required",
    doctor: "Dr. Elena Vance, MD",
    lab: "BioVibe Nutrition Lab",
    summary: "Vitamin D (25-Hydroxy) is notably insufficient, likely reflecting limited sun exposure during spring months.",
    file_name: "Vitamin_Micronutrient_May2026.pdf",
    file_size: "1.4 MB",
    biomarkers: [
      { name: "25-OH Vitamin D", value: 22.0, unit: "ng/mL", ref_min: 30.0, ref_max: 100.0, status: "Low", description: "Primary biomarker for systemic Vitamin D stores" },
      { name: "Vitamin B12", value: 485.0, unit: "pg/mL", ref_min: 200.0, ref_max: 900.0, status: "Normal", description: "Neuro-hematologic cofactor" },
      { name: "Serum Ferritin", value: 78.0, unit: "ng/mL", ref_min: 30.0, ref_max: 400.0, status: "Normal", description: "Body intracellular iron storage protein" }
    ],
    key_findings: [
      "Vitamin D is 22.0 ng/mL, categorized as mild deficiency (<30 ng/mL).",
      "Ferritin and B12 are in healthy ranges, ruling out latent micronutrient-deficiency anemia."
    ],
    doctor_notes: "Recommend starting 2,000 IU/day Vitamin D3 with dietary fat. Retest in 3 months."
  },
  {
    id: "REP-2026-006",
    title: "Comprehensive Liver Function Test (LFT)",
    patient_name: "Alex Morgan",
    date: "2026-09-02",
    category: "Metabolic",
    status: "Pending",
    doctor: "Dr. Elena Vance, MD",
    lab: "MetroPath Diagnostics Lab",
    summary: "Awaiting final lab validation and physician sign-off.",
    file_name: "Liver_Function_Sep2026.png",
    file_size: "820 KB",
    biomarkers: [
      { name: "ALT (Alanine Aminotransferase)", value: 28.0, unit: "U/L", ref_min: 7.0, ref_max: 56.0, status: "Normal", description: "Liver cellular enzyme" },
      { name: "AST (Aspartate Aminotransferase)", value: 24.0, unit: "U/L", ref_min: 10.0, ref_max: 40.0, status: "Normal", description: "Enzyme present in liver and muscle tissue" },
      { name: "Alkaline Phosphatase (ALP)", value: 68.0, unit: "U/L", ref_min: 44.0, ref_max: 147.0, status: "Normal", description: "Biliary tract and bone enzyme" }
    ],
    key_findings: [
      "Transaminases (ALT/AST) reflect stable hepatocellular integrity.",
      "Biliary markers (ALP) are unremarkable."
    ],
    doctor_notes: "Pending final lab review."
  }
];

export const DEFAULT_ALERTS = [
  {
    id: "ALT-101",
    report_id: "REP-2026-002",
    report_title: "Advanced Lipid & Cardiovascular Profile",
    title: "Elevated LDL Cholesterol (138 mg/dL)",
    description: "Your low-density lipoprotein (LDL) is above the recommended threshold (<100 mg/dL). Discuss cardiovascular risk reduction with your doctor.",
    severity: "critical",
    date: "2026-08-15",
    is_read: false,
    biomarker_name: "LDL Cholesterol"
  },
  {
    id: "ALT-102",
    report_id: "REP-2026-005",
    report_title: "Vitamin & Micronutrient Screen",
    title: "Low Vitamin D Level (22 ng/mL)",
    description: "Your 25-OH Vitamin D is below the sufficient threshold of 30 ng/mL. Consult your physician regarding Vitamin D3 supplementation.",
    severity: "warning",
    date: "2026-05-04",
    is_read: false,
    biomarker_name: "25-OH Vitamin D"
  },
  {
    id: "ALT-103",
    report_id: "REP-2026-001",
    report_title: "Comprehensive Metabolic Panel (CMP)",
    title: "Borderline Fasting Glucose (106 mg/dL)",
    description: "Fasting blood glucose is slightly above standard normal range (70-99 mg/dL). Monitoring diet and scheduling an HbA1c test is suggested.",
    severity: "warning",
    date: "2026-08-28",
    is_read: false,
    biomarker_name: "Fasting Glucose"
  },
  {
    id: "ALT-104",
    report_id: "REP-2026-003",
    report_title: "Complete Blood Count (CBC) with Differential",
    title: "Complete Blood Count Normal",
    description: "All hematologic cell lines and ratios are within healthy standard limits.",
    severity: "info",
    date: "2026-07-20",
    is_read: true,
    biomarker_name: "CBC Panel"
  },
  {
    id: "ALT-105",
    report_id: "REP-2026-004",
    report_title: "Thyroid & Endocrine Function Panel",
    title: "Thyroid Hormones Balanced",
    description: "TSH, Free T4, and Free T3 are in the optimal physiological range.",
    severity: "info",
    date: "2026-06-12",
    is_read: true,
    biomarker_name: "TSH"
  }
];

export const DEFAULT_ANALYTICS = {
  summary: {
    total_reports: 6,
    reports_analyzed: 5,
    pending_reports: 1,
    health_alerts: 3,
    health_score: 88
  },
  monthly_trends: [
    { month: "Mar", reports: 1, avgGlucose: 98, totalCholesterol: 204, systolicBP: 118 },
    { month: "Apr", reports: 1, avgGlucose: 101, totalCholesterol: 210, systolicBP: 120 },
    { month: "May", reports: 2, avgGlucose: 99, totalCholesterol: 212, systolicBP: 122 },
    { month: "Jun", reports: 1, avgGlucose: 102, totalCholesterol: 215, systolicBP: 121 },
    { month: "Jul", reports: 1, avgGlucose: 104, totalCholesterol: 216, systolicBP: 123 },
    { month: "Aug", reports: 2, avgGlucose: 106, totalCholesterol: 218, systolicBP: 122 }
  ],
  category_distribution: [
    { name: "Blood Test", value: 2, color: "#16a34a" },
    { name: "Metabolic", value: 2, color: "#22c55e" },
    { name: "Cardiology", value: 1, color: "#065f46" },
    { name: "Pathology", value: 1, color: "#10b981" }
  ],
  biomarker_comparison: [
    { biomarker: "Glucose", current: 106, optimal: 90, maxLimit: 99, unit: "mg/dL" },
    { biomarker: "Total Chol.", current: 218, optimal: 170, maxLimit: 200, unit: "mg/dL" },
    { biomarker: "LDL Chol.", current: 138, optimal: 90, maxLimit: 100, unit: "mg/dL" },
    { biomarker: "Triglycerides", current: 110, optimal: 100, maxLimit: 150, unit: "mg/dL" },
    { biomarker: "HDL Chol.", current: 58, optimal: 60, maxLimit: 80, unit: "mg/dL" },
    { biomarker: "Vit D (25-OH)", current: 22, optimal: 45, maxLimit: 100, unit: "ng/mL" }
  ]
};
