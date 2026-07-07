
import React from 'react'


const activityTone = {
  LAB_REPORT:
    'bg-cyan-500/15 text-cyan-200 border-cyan-500/20',

  PRESCRIPTION:
    'bg-emerald-500/15 text-emerald-200 border-emerald-500/20',

  SYMPTOM_MESSAGE:
    'bg-amber-500/15 text-amber-200 border-amber-500/20'
}
const statusTone = {
  PROCESSED:
    "bg-emerald-500/15 text-emerald-200 border-emerald-500/20",

  PENDING:
    "bg-amber-500/15 text-amber-200 border-amber-500/20",

  FAILED:
    "bg-rose-500/15 text-rose-200 border-rose-500/20",
}
const getStatusClass = (status) =>
  statusTone[status] || statusTone.PROCESSED
function AdminDashboard({
  patients,
  onOpenReport,
  showAllActivity,
  onToggleViewAll,
  onSeeAll
}) {
  const getTriageClass = (status) => activityTone[status] || activityTone.Stable
  const visiblePatients = showAllActivity ? patients : patients.slice(0, 5)
  const totalReports = patients.length;

  const labReports = patients.filter(
    p => p.category === "LAB_REPORT"
  ).length;

  const prescriptions = patients.filter(
    p => p.category === "PRESCRIPTION"
  ).length;

  const symptomReports = patients.filter(
    p => p.category === "SYMPTOM_MESSAGE"
  ).length;

  // Until you have a separate patients table,
  // use unique user IDs as the patient count.
  const totalPatients = new Set(
    patients.map((p) => p.patient.id)
  ).size;
  const summaryCards = [
    {
      label: "Total Patients",
      value: totalPatients,
      change: "Registered Patients",
      tone: "text-cyan-200"
    },
    {
      label: "Total Reports",
      value: totalReports,
      change: "AI Processed",
      tone: "text-cyan-200"
    },
    {
      label: "Lab Reports",
      value: labReports,
      change: "Blood Reports",
      tone: "text-cyan-200"
    },
    {
      label: "Prescriptions",
      value: prescriptions,
      change: "Medicines",
      tone: "text-cyan-200"
    }
  ];

  return (
    <section className="space-y-6 p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <button
            key={card.label}
            type="button"
            className={`group rounded-2xl border p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/30 ${
              card.label === 'Critical Alerts Urgent'
                ? 'border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-amber-500/5'
                : 'border-slate-800 bg-slate-900/70'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-slate-400">{card.label}</p>
              <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400/80" />
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <h3 className="text-3xl font-semibold tracking-tight text-white">{card.value}</h3>
              <span className={`max-w-[9rem] text-right text-sm leading-5 ${card.tone} ${card.label === 'System Operational Status' ? 'whitespace-normal' : 'whitespace-nowrap'}`}>
                {card.change}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-cyan-950/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                Live Feed
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white">
                Recent Patient Reports
              </h3>
            </div>
            <button
              type="button"
              onClick={onToggleViewAll}
              className="rounded-xl px-3 py-1.5 text-sm text-cyan-300 transition hover:bg-slate-800"
            >
              {showAllActivity ? "Show Less" : "View All"}
            </button>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-950/80 text-slate-400">
                <tr>
                  <th className="px-3 py-3 text-left">
                    Patient
                  </th>
                  <th className="px-3 py-3 text-left">
                    Current Issue
                  </th>
                  <th className="px-3 py-3 text-left">
                    Doctor
                  </th>
                  <th className="px-3 py-3 text-left">
                    Category
                  </th>
                  <th className="px-3 py-3 text-left">
                    Status
                  </th>
                  <th className="px-3 py-3 text-left">
                    Received
                  </th>
                  <th className="px-3 py-3 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#0d172d]">
                {visiblePatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-slate-800/50 transition"
                  >
                    <td className="px-3 py-3 font-medium text-white">
                      # {patient.patient?.phone_last4 ?? "----"}
                    </td>
                    <td className="px-3 py-3 text-slate-200">
                      {patient.title}
                    </td>
                    <td className="px-3 py-3 text-slate-200">
                      {patient.doctor?.name ?? (
                        <span className="text-slate-500">Unassigned</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${getTriageClass(
                          patient.category
                        )}`}
                      >
                        {patient.category_display}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${getStatusClass(
                          patient.status
                        )}`}
                      >
                        {patient.status_display}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-400">
                      {new Date(patient.created_at).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => onOpenReport(patient.id)}
                        className="rounded-lg border border-cyan-500/20 px-3 py-1 text-xs text-cyan-300 transition hover:bg-cyan-500/10"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
