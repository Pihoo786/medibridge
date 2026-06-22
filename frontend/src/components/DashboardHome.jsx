import React from 'react'

const summaryCards = [
  {
    label: 'Total Logs Captured',
    value: '1,284',
    change: '+12.4%',
    tone: 'text-cyan-200'
  },
  {
    label: 'Critical Alerts Urgent',
    value: '18',
    change: '5 new today',
    tone: 'text-rose-200'
  },
  {
    label: 'Pending Triage Review',
    value: '24',
    change: '8 awaiting doctor',
    tone: 'text-amber-200'
  },
  {
    label: 'System Operational Status',
    value: '99.98%',
    change: 'All services online',
    tone: 'text-emerald-200'
  }
]

const activityTone = {
  Critical: 'bg-rose-500/15 text-rose-200 border-rose-500/20',
  Stable: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/20',
  Recovering: 'bg-amber-500/15 text-amber-200 border-amber-500/20'
}

function DashboardHome({
  patients,
  onOpenReport,
  showAllActivity,
  onToggleViewAll,
  onSeeAll
}) {
  const getTriageClass = (status) => activityTone[status] || activityTone.Stable
  const visiblePatients = showAllActivity ? patients : patients.slice(0, 5)

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

      <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-cyan-950/5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Live feed</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Recent Live Activity</h3>
            </div>
            <button
              type="button"
              onClick={onToggleViewAll}
              className="rounded-xl px-3 py-1.5 text-sm text-cyan-300 transition hover:bg-slate-800"
            >
              {showAllActivity ? 'Show less' : 'View all'}
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {visiblePatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => onOpenReport(patient.id)}
                className="flex w-full items-start gap-4 rounded-2xl border border-slate-800 bg-[#0d172d] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:bg-[#112246]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-sm font-semibold text-cyan-100">
                  {patient.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{patient.name}</p>
                    <span className={`rounded-full border px-2.5 py-1 text-xs ${getTriageClass(patient.triageStatus)}`}>
                      {patient.triageStatus}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">{patient.rawWhatsAppMessage}</p>
                  <p className="mt-2 text-xs text-slate-500">{patient.lastCheckIn}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-cyan-950/5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Records</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Patient Records</h3>
            </div>
            <button
              type="button"
              onClick={onSeeAll}
              className="rounded-xl px-3 py-1.5 text-sm text-cyan-300 transition hover:bg-slate-800"
            >
              See all
            </button>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-950/80 text-slate-400">
                <tr>
                  <th className="px-3 py-3 text-left">Patient</th>
                  <th className="px-3 py-3 text-left">Status</th>
                  <th className="px-3 py-3 text-left">Last update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#0d172d]">
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="cursor-pointer transition hover:bg-slate-800/50"
                    onClick={() => onOpenReport(patient.id)}
                  >
                    <td className="px-3 py-3 align-top">
                      <div>
                        <p className="font-medium text-white">{patient.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{patient.id}</p>
                      </div>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${getTriageClass(patient.triageStatus)}`}>
                        {patient.triageStatus}
                      </span>
                    </td>
                    <td className="px-3 py-3 align-top text-slate-400">{patient.lastCheckIn}</td>
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

export default DashboardHome
