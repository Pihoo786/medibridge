# MediBridge AI - API & AI Contract (v1)

---

# Purpose

This document defines the standardized response format returned by Gemini AI and consumed by the FastAPI backend, Supabase database, and React dashboard.

This contract must remain stable across all services.

---

# Supported Categories

```text
LAB_REPORT
PRESCRIPTION
SYMPTOM_MESSAGE
```

---

# Gemini Response Contract

```json
{
  "category": "LAB_REPORT",

  "title": "Complete Blood Count (CBC)",

  "summary": "Hemoglobin level is below the normal range.",

  "patient_explanation": "Your hemoglobin is lower than expected. Hemoglobin helps carry oxygen through your body. Low levels may cause fatigue or weakness.",

  "extracted_data": [
    {
      "name": "Hemoglobin",
      "value": "9.8",
      "status": "LOW"
    }
  ]
}
```

---

# Rules for Gemini

Gemini MUST:

* Classify the submission
* Extract structured medical values
* Generate a patient-friendly explanation
* Generate a concise summary
* Return valid JSON only

---

# Gemini MUST NOT Generate

* Database IDs
* UUIDs
* Timestamps
* SQL fields
* User IDs
* Report IDs
* Doctor notes
* Diagnoses
* Medical prescriptions
* Treatment decisions

---

# Extracted Data Schema

```json
{
  "name": "",
  "value": "",
  "status": ""
}
```

---

# Status Values

Examples:

```text
LOW
NORMAL
HIGH
ABNORMAL
UNKNOWN
```

---

# FastAPI Processing Flow

Patient
↓
WhatsApp
↓
Twilio
↓
FastAPI Webhook
↓
Store Message Metadata
↓
Create Report (PROCESSING)
↓
Gemini Processing
↓
Validation
↓
Supabase
↓
Update Report (COMPLETED)
↓
React Dashboard

---

# Backend Validation Rules

All Gemini responses must pass Pydantic validation before being saved.

Validation failures should:

1. Log the error
2. Mark report status as FAILED
3. Prevent database corruption

---

# Dashboard Expectations

The frontend should consume:

```json
{
  "id": "",
  "category": "",
  "title": "",
  "summary": "",
  "patient_explanation": "",
  "created_at": "",
  "extracted_data": []
}
```

doctor_notes may be displayed if added by a healthcare professional.

---

# Version

Contract Version: v1
