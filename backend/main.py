import os
import random
from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from models import Report, Biomarker, Alert, AIAnalysisResponse
from sample_data import INITIAL_REPORTS, INITIAL_ALERTS, ANALYTICS_DATA

app = FastAPI(
    title="MediLens AI Backend",
    description="Intelligent Medical Report Analysis & Biomarker Tracking API",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# In-memory storage seeded with realistic sample data
reports_db: List[Report] = list(INITIAL_REPORTS)
alerts_db: List[Alert] = list(INITIAL_ALERTS)


@app.get("/")
def root():
    return {
        "app": "MediLens AI API",
        "status": "healthy",
        "version": "1.0.0",
        "disclaimer": "AI-generated informational explanation — not a diagnosis. MediLens AI does not diagnose diseases or replace doctors."
    }


@app.get("/api/health")
def get_health():
    return {
        "status": "online",
        "timestamp": datetime.now().isoformat(),
        "total_reports": len(reports_db),
        "active_alerts": len([a for a in alerts_db if not a.is_read]),
        "disclaimer": "AI-generated informational explanation — not a diagnosis."
    }


@app.get("/api/reports", response_model=List[Report])
def get_reports(
    search: Optional[str] = Query(None, description="Search term for title, doctor, or lab"),
    category: Optional[str] = Query(None, description="Filter by category"),
    status: Optional[str] = Query(None, description="Filter by status")
):
    results = reports_db
    if category and category != "All":
        results = [r for r in results if r.category.lower() == category.lower()]
    if status and status != "All":
        results = [r for r in results if r.status.lower() == status.lower()]
    if search:
        s = search.lower().strip()
        results = [
            r for r in results
            if s in r.title.lower() or s in r.doctor.lower() or s in r.lab.lower() or any(s in b.name.lower() for b in r.biomarkers)
        ]
    return results


@app.post("/api/reports", response_model=Report)
async def create_report(
    title: str = Form("Diagnostic Lab Report"),
    category: str = Form("Blood Test"),
    patient_name: str = Form("Alex Morgan"),
    doctor: str = Form("Dr. Elena Vance, MD"),
    lab: str = Form("MetroPath Diagnostics Lab"),
    notes: Optional[str] = Form(""),
    file: Optional[UploadFile] = File(None)
):
    new_id = f"REP-2026-{len(reports_db) + 1:03d}"
    today_str = datetime.now().strftime("%Y-%m-%d")

    filename = "report.pdf"
    filesize_str = "1.5 MB"

    if file and file.filename:
        filename = file.filename
        file_path = os.path.join(UPLOAD_DIR, f"{new_id}_{filename}")
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
        size_kb = len(contents) / 1024
        filesize_str = f"{size_kb / 1024:.1f} MB" if size_kb > 1024 else f"{size_kb:.0f} KB"

    # Generate contextual realistic mock biomarkers based on category
    generated_biomarkers: List[Biomarker] = []
    if category == "Blood Test":
        generated_biomarkers = [
            Biomarker(name="Hemoglobin", value=14.8, unit="g/dL", ref_min=13.5, ref_max=17.5, status="Normal", description="Oxygen carrying capacity"),
            Biomarker(name="White Blood Cell (WBC)", value=7.2, unit="k/uL", ref_min=4.5, ref_max=11.0, status="Normal", description="Immune cell count"),
            Biomarker(name="Platelet Count", value=220.0, unit="k/uL", ref_min=150.0, ref_max=450.0, status="Normal", description="Blood clotting factor"),
            Biomarker(name="Hematocrit", value=43.5, unit="%", ref_min=38.8, ref_max=50.0, status="Normal", description="Red cell percentage"),
        ]
    elif category == "Cardiology":
        generated_biomarkers = [
            Biomarker(name="Total Cholesterol", value=205.0, unit="mg/dL", ref_min=125.0, ref_max=200.0, status="Elevated", description="Total lipid level"),
            Biomarker(name="LDL Cholesterol", value=124.0, unit="mg/dL", ref_min=50.0, ref_max=100.0, status="Elevated", description="Atherogenic particle"),
            Biomarker(name="HDL Cholesterol", value=52.0, unit="mg/dL", ref_min=40.0, ref_max=80.0, status="Normal", description="Cardioprotective lipid"),
            Biomarker(name="Triglycerides", value=135.0, unit="mg/dL", ref_min=50.0, ref_max=150.0, status="Normal", description="Serum circulating triglycerides"),
        ]
    elif category == "Metabolic":
        generated_biomarkers = [
            Biomarker(name="Fasting Glucose", value=102.0, unit="mg/dL", ref_min=70.0, ref_max=99.0, status="Borderline", description="Fasting glucose concentration"),
            Biomarker(name="Serum Creatinine", value=1.02, unit="mg/dL", ref_min=0.6, ref_max=1.2, status="Normal", description="Kidney filtration marker"),
            Biomarker(name="BUN", value=16.0, unit="mg/dL", ref_min=7.0, ref_max=20.0, status="Normal", description="Blood urea nitrogen"),
            Biomarker(name="Sodium", value=141.0, unit="mEq/L", ref_min=135.0, ref_max=145.0, status="Normal", description="Electrolyte balance"),
        ]
    else:
        generated_biomarkers = [
            Biomarker(name="Marker Alpha", value=54.0, unit="U/L", ref_min=20.0, ref_max=80.0, status="Normal", description="General clinical marker"),
            Biomarker(name="Marker Beta", value=12.2, unit="mg/dL", ref_min=5.0, ref_max=25.0, status="Normal", description="Metabolic cofactor"),
        ]

    new_report = Report(
        id=new_id,
        title=title,
        patient_name=patient_name,
        date=today_str,
        category=category,
        status="Analyzed",
        doctor=doctor,
        lab=lab,
        summary=f"Automated clinical data ingestion for {title}. Key metrics extracted and indexed for informational tracking.",
        file_name=filename,
        file_size=filesize_str,
        biomarkers=generated_biomarkers,
        key_findings=[
            f"Successfully extracted {len(generated_biomarkers)} diagnostic parameters from {filename}.",
            "All biomarker ranges mapped against standard adult reference intervals.",
            "Physician review recommended for any values outside typical limits."
        ],
        doctor_notes=notes or "Initial report record added via MediLens AI portal."
    )

    reports_db.insert(0, new_report)

    # Check for any elevated or borderline biomarkers and create an alert if needed
    for bm in generated_biomarkers:
        if bm.status in ["Elevated", "Low", "Borderline"]:
            severity = "critical" if bm.status == "Elevated" else "warning"
            alerts_db.insert(0, Alert(
                id=f"ALT-{random.randint(200, 999)}",
                report_id=new_id,
                report_title=title,
                title=f"{bm.status} {bm.name} ({bm.value} {bm.unit})",
                description=f"{bm.name} was flagged as {bm.status.lower()} in your recent {title} report.",
                severity=severity,
                date=today_str,
                is_read=False,
                biomarker_name=bm.name
            ))

    return new_report


@app.get("/api/reports/{report_id}", response_model=Report)
def get_report_by_id(report_id: str):
    for r in reports_db:
        if r.id == report_id:
            return r
    raise HTTPException(status_code=404, detail="Report not found")


@app.delete("/api/reports/{report_id}")
def delete_report(report_id: str):
    global reports_db
    before_len = len(reports_db)
    reports_db = [r for r in reports_db if r.id != report_id]
    if len(reports_db) == before_len:
        raise HTTPException(status_code=404, detail="Report not found")
    return {"success": True, "message": f"Report {report_id} removed successfully"}


@app.post("/api/reports/{report_id}/analyze", response_model=AIAnalysisResponse)
def analyze_report(report_id: str):
    report = None
    for r in reports_db:
        if r.id == report_id:
            report = r
            break
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    # Assess overall status
    has_elevated = any(b.status in ["Elevated", "Low"] for b in report.biomarkers)
    has_borderline = any(b.status == "Borderline" for b in report.biomarkers)
    overall_status = "Attention Recommended" if has_elevated else ("Borderline" if has_borderline else "Stable")

    # Update report status to Analyzed if it was pending
    report.status = "Analyzed"

    biomarker_breakdown = []
    for b in report.biomarkers:
        explanation = "Within standard expected physiological range."
        if b.status == "Elevated":
            explanation = f"Exceeds standard maximum of {b.ref_max} {b.unit}. May warrant lifestyle or medical review."
        elif b.status == "Low":
            explanation = f"Below standard minimum of {b.ref_min} {b.unit}. May benefit from dietary or targeted evaluation."
        elif b.status == "Borderline":
            explanation = f"Near the borderline edge ({b.ref_min}-{b.ref_max} {b.unit}). Routine monitoring recommended."

        biomarker_breakdown.append({
            "name": b.name,
            "value": b.value,
            "unit": b.unit,
            "reference": f"{b.ref_min} - {b.ref_max} {b.unit}",
            "status": b.status,
            "explanation": explanation
        })

    key_findings = report.key_findings or [
        f"Analyzed {len(report.biomarkers)} diagnostic biomarkers.",
        "Clinical patterns compared against population reference intervals.",
        "Key findings organized for your next physician consultation."
    ]

    questions = [
        f"Are there lifestyle adjustments or dietary shifts you recommend based on my {report.category} results?",
        "How frequently should I schedule follow-up blood work to monitor these trends?",
        "Are there any complementary tests that would give a more complete picture of these markers?",
        "Do any of these results interact with my current medications or supplements?"
    ]

    lifestyle_considerations = [
        "Maintain consistent hydration (aim for 2-2.5 liters of water daily).",
        "Incorporate regular moderate cardiovascular activity (150 minutes per week).",
        "Focus on nutrient-dense, whole-food nutrition with ample soluble dietary fiber.",
        "Ensure 7 to 8 hours of restorative sleep to optimize metabolic hormone balance."
    ]

    summary_text = (
        f"This AI informational analysis evaluated '{report.title}' conducted on {report.date}. "
        f"The panel examined {len(report.biomarkers)} distinct biomarkers. "
        + (f"Notable attention is drawn to {', '.join([b.name for b in report.biomarkers if b.status != 'Normal'])}. " if has_elevated or has_borderline else "All analyzed biomarkers are within their standard physiological reference intervals. ")
        + "Please present these findings directly to your licensed healthcare provider for formal clinical diagnosis and management."
    )

    return AIAnalysisResponse(
        report_id=report.id,
        report_title=report.title,
        disclaimer="AI-generated informational explanation — not a diagnosis.",
        overall_status=overall_status,
        summary=summary_text,
        key_findings=key_findings,
        suggested_questions=questions,
        biomarker_breakdown=biomarker_breakdown,
        lifestyle_considerations=lifestyle_considerations,
        analyzed_at=datetime.now().strftime("%B %d, %Y at %I:%M %p")
    )


@app.get("/api/alerts", response_model=List[Alert])
def get_alerts():
    return alerts_db


@app.post("/api/alerts/{alert_id}/read")
def mark_alert_read(alert_id: str):
    for a in alerts_db:
        if a.id == alert_id:
            a.is_read = True
            return {"success": True, "alert_id": alert_id, "is_read": True}
    raise HTTPException(status_code=404, detail="Alert not found")


@app.post("/api/alerts/read-all")
def mark_all_alerts_read():
    for a in alerts_db:
        a.is_read = True
    return {"success": True, "message": "All alerts marked as read"}


@app.get("/api/analytics")
def get_analytics():
    # Dynamically compute counts based on database
    total_rep = len(reports_db)
    analyzed_rep = len([r for r in reports_db if r.status == "Analyzed"])
    pending_rep = len([r for r in reports_db if r.status != "Analyzed"])
    crit_alerts = len([a for a in alerts_db if a.severity == "critical" and not a.is_read])
    warn_alerts = len([a for a in alerts_db if a.severity == "warning" and not a.is_read])

    data = dict(ANALYTICS_DATA)
    data["summary"] = {
        "total_reports": total_rep,
        "reports_analyzed": analyzed_rep,
        "pending_reports": pending_rep,
        "health_alerts": crit_alerts + warn_alerts,
        "critical_alerts": crit_alerts,
        "warning_alerts": warn_alerts,
        "health_score": 88
    }
    return data
