from typing import List, Optional
from pydantic import BaseModel, Field


class Biomarker(BaseModel):
    name: str
    value: float
    unit: str
    ref_min: float
    ref_max: float
    status: str = "Normal"  # "Normal", "Borderline", "Elevated", "Low"
    description: Optional[str] = None


class Report(BaseModel):
    id: str
    title: str
    patient_name: str = "Alex Morgan"
    date: str
    category: str  # "Blood Test", "Lipid Panel", "Metabolic", "Cardiology", "Pathology"
    status: str = "Analyzed"  # "Analyzed", "Pending", "Review Required"
    doctor: str = "Dr. Elena Vance, MD"
    lab: str = "MetroPath Diagnostics Lab"
    summary: str = ""
    file_name: str = "report.pdf"
    file_size: str = "1.2 MB"
    biomarkers: List[Biomarker] = []
    key_findings: List[str] = []
    doctor_notes: Optional[str] = None


class ReportCreate(BaseModel):
    title: str
    category: str = "Blood Test"
    patient_name: Optional[str] = "Alex Morgan"
    doctor: Optional[str] = "Dr. Elena Vance, MD"
    lab: Optional[str] = "MetroPath Diagnostics Lab"
    notes: Optional[str] = None


class Alert(BaseModel):
    id: str
    report_id: Optional[str] = None
    report_title: str
    title: str
    description: str
    severity: str = "warning"  # "critical", "warning", "info"
    date: str
    is_read: bool = False
    biomarker_name: Optional[str] = None


class AIAnalysisResponse(BaseModel):
    report_id: str
    report_title: str
    disclaimer: str = "AI-generated informational explanation — not a diagnosis."
    overall_status: str  # "Stable", "Attention Recommended", "Review Required"
    summary: str
    key_findings: List[str]
    suggested_questions: List[str]
    biomarker_breakdown: List[dict]
    lifestyle_considerations: List[str]
    analyzed_at: str
