# MediBridge AI - System Architecture

## Overview

MediBridge AI is an AI-powered WhatsApp medical assistant that helps patients understand medical reports, prescriptions, and symptoms through simple explanations.

The system receives user messages through WhatsApp, processes them using Gemini AI, stores the results in Supabase, and displays records in a doctor dashboard.

---

## High-Level Architecture

Patient
↓
WhatsApp

Twilio WhatsApp Sandbox
↓
FastAPI Backend

Gemini AI
↓
Medical Data Extraction
↓
Response Generation

Supabase Database
↓
Doctor Dashboard (React)

---

## Data Flow

### Step 1

Patient sends:

* Prescription Image
* Lab Report Image
* Symptom Message

through WhatsApp.

### Step 2

Twilio forwards the message to our FastAPI webhook.

### Step 3

Backend processes the incoming request.

### Step 4

Message is sent to Gemini.

Gemini:

* Classifies submission
* Extracts information
* Generates explanations

### Step 5

Backend stores the processed data in Supabase.

### Step 6

Backend sends a simplified response back to WhatsApp.

### Step 7

Doctor dashboard retrieves data from backend APIs.

---

## AI Output Format

All Gemini responses must follow a standardized JSON format.

{
"category": "",
"summary": "",
"patient_explanation": "",
"doctor_notes": "",
"extracted_data": []
}

---

## Future Expansion

Architecture should support:

* Severity Detection
* Medicine Explanation
* Emergency Detection
* Patient History
* Analytics
* Multi-language Support
