# MediBridge

AI-powered WhatsApp medical assistant that simplifies medical reports, prescriptions, and symptoms using Gemini AI.

## Project Overview

This repository contains both the backend services and the frontend dashboard for the MediBridge platform. The frontend is a React + Tailwind dashboard designed for clinicians to review incoming patient reports, monitor triage activity, and inspect AI-extracted insights.

## Frontend Stack

- React
- Vite
- Tailwind CSS
- Mock patient data for dashboard development

## Frontend Structure

- `frontend/src/App.jsx` — main layout and navigation state
- `frontend/src/components/DashboardHome.jsx` — dashboard landing page with summary cards and activity feed
- `frontend/src/components/ReportDetails.jsx` — patient report details modal/view
- `frontend/src/mockPatientData.js` — structured mock data contract for API integration

## Running the Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local Vite URL shown in the terminal to preview the dashboard.

## Notes

- The current frontend uses mock data so backend endpoints can be connected later.
- The dashboard includes conditional rendering between the home dashboard and a selected patient report details view.
- Tailwind classes are used for the medical portal styling and responsive layout.
