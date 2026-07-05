import React from 'react'

const activityTone = {
  Critical: 'bg-rose-500/15 text-rose-200 border-rose-500/20',
  Stable: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/20',
  Recovering: 'bg-amber-500/15 text-amber-200 border-amber-500/20'
}

function ReportDetails({ patient, onBack }) {
  if (!patient) return null

  const getTriageClass = (status) => activityTone[status] || activityTone.Stable
  const metrics = patient?.aiResponse?.extracted_data ?? []
  const summary = patient?.aiResponse?.summary ?? 'No summary available yet.'
  const patientExplanation = patient?.aiResponse?.patient_explanation ?? 'No patient explanation available yet.'
  const doctorNotes = patient?.aiResponse?.doctor_notes ?? 'No doctor notes available yet.'

  return (
    <section className="p-4 sm:p-6">
      <div className="space-y-6">
        <button
          onClick={onBack}
          className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-800"
        >
          ← Back to dashboard
        </button>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-cyan-950/5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Source Input</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">{patient.name}</h3>
              </div>
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs ${getTriageClass(patient.triageStatus)}`}>
                {patient.triageStatus}
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0d172d] p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Patient ID</p>
                  <p className="mt-1 text-sm text-white">{patient.id}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Age</p>
                  <p className="mt-1 text-sm text-white">{patient.age} yrs</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Gender</p>
                  <p className="mt-1 text-sm text-white">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Contact</p>
                  <p className="mt-1 text-sm text-white">{patient.contact}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 to-slate-900 p-6">
              <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 text-center text-slate-400">
                Uploaded report preview / WhatsApp message snapshot
              </div>
              <div className="mt-4 rounded-2xl bg-slate-900/90 p-4 text-sm leading-6 text-slate-300">
                {patient.rawWhatsAppMessage}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-cyan-950/5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">AI Insights</p>
              <h3 className="mt-1 text-2xl font-semibold text-white">Extracted Clinical Data</h3>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div key={metric.name} className="rounded-2xl border border-slate-800 bg-[#0d172d] p-4 transition duration-200 hover:border-cyan-500/30 hover:bg-[#102544]">
                  <p className="text-sm text-slate-400">{metric.name}</p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <h4 className="text-2xl font-semibold tracking-tight text-white">{metric.value}</h4>
                    <span className={`rounded-full px-2.5 py-1 text-xs ${
                      metric.status === 'High' || metric.status === 'Elevated' || metric.status === 'Low'
                        ? 'bg-rose-500/10 text-rose-200'
                        : 'bg-emerald-500/10 text-emerald-200'
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 rounded-2xl border border-slate-800 bg-[#0d172d] p-5">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Summary</p>
                <p className="mt-3 leading-7 text-slate-200">{summary}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Patient explanation</p>
                <p className="mt-3 leading-7 text-slate-200">{patientExplanation}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Doctor notes</p>
                <p className="mt-3 leading-7 text-slate-200">{doctorNotes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReportDetails
