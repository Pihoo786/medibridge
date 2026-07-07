import React from 'react'

const activityTone = {
  LAB_REPORT: 'bg-cyan-500/15 text-cyan-200 border-cyan-500/20',
  PRESCRIPTION: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/20',
  SYMPTOM_MESSAGE: 'bg-amber-500/15 text-amber-200 border-amber-500/20'
}

function ReportDetails({ patient, onBack }) {
  if (!patient) return null

  const getCategoryClass = (category) =>
    activityTone[category] || activityTone.LAB_REPORT

  return (
    <section className="p-4 sm:p-6">
      <div className="space-y-6">

        <button
          onClick={onBack}
          className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-800"
        >
          ← Back to Dashboard
        </button>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">

          {/* Left Section */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-cyan-950/5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  Medical Report
                </p>

                <h3 className="mt-1 text-2xl font-semibold text-white">
                  {patient.title}
                </h3>
              </div>

              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs ${getCategoryClass(
                  patient.category
                )}`}
              >
                {patient.category}
              </span>

            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0d172d] p-5">

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Report ID
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {patient.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Created At
                  </p>

                  <p className="mt-1 text-sm text-white">
                    {new Date(patient.created_at).toLocaleString()}
                  </p>
                </div>

              </div>

            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 to-slate-900 p-6">

              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Summary
              </p>

              <div className="mt-4 rounded-2xl bg-slate-900/90 p-4 text-sm leading-7 text-slate-300">
                {patient.summary}
              </div>

            </div>

          </div>

          {/* Right Section */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-cyan-950/5">

            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                AI Analysis
              </p>

              <h3 className="mt-1 text-2xl font-semibold text-white">
                Patient Explanation
              </h3>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0d172d] p-5">

              <p className="leading-7 text-slate-200">
                {patient.patient_explanation}
              </p>

            </div>

            <div className="mt-6">

              <h3 className="mb-4 text-lg font-semibold text-white">
                Key Findings
              </h3>

              <div className="space-y-3">

                {(patient.key_findings || []).map((finding, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-800 bg-[#0d172d] p-4 text-slate-200"
                  >
                    • {finding}
                  </div>
                ))}

              </div>

            </div>

            <div className="mt-6">

              <h3 className="mb-4 text-lg font-semibold text-white">
                Recommendations
              </h3>

              <div className="space-y-3">

                {(patient.recommendations || []).map((recommendation, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-800 bg-[#0d172d] p-4 text-slate-200"
                  >
                    • {recommendation}
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default ReportDetails