import React from 'react'

const categoryStyles = {
  LAB_REPORT: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  PRESCRIPTION: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  SYMPTOM_MESSAGE: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
}

function DoctorDashboard({ 
  assignedPatients = [], 
  onViewPatientHistory,
  onViewReportDetails,
  isLoading, 
  error 
}) {

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
        <p className="text-sm text-slate-400 animate-pulse">Loading assigned provider registry...</p>
      </div>
    )
  }

  // 2. Error State
  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center max-w-md mx-auto my-8">
        <p className="text-red-400 font-medium">⚠️ Unable to load reports.</p>
        <p className="text-xs text-slate-400 mt-1">Please try again or verify backend server connectivity.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Upper Meta Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Provider Panel</p>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">Doctor Care Dashboard</h1>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-400">
          Assigned Roster: <span className="text-cyan-400 font-bold">{assignedPatients.length} Patients</span>
        </div>
      </div>

      {/* Roster Table Layout */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 bg-slate-950/20">
          <h3 className="font-semibold text-white text-base">Assigned Patient Roster</h3>
          <p className="text-xs text-slate-400 mt-0.5">Real-time vitals, categorical triage flags, and rapid history assessment access.</p>
        </div>

        {assignedPatients.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No active patients currently assigned to your care directory node.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-sm text-left text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-medium">
                <tr>
                  <th className="px-6 py-4">Patient Profile</th>
                  <th className="px-6 py-4">Latest Intake Document</th>
                  <th className="px-6 py-4">Classification</th>
                  <th className="px-6 py-4">Processing Status</th>
                  <th className="px-6 py-4 text-right">Clinical Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#0d172d]/40">
                {assignedPatients.map((item, idx) => {
                  const catKey = item.category?.toUpperCase() || 'LAB_REPORT'
                  const badgeStyle = categoryStyles[catKey] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  
                  return (
                    <tr key={item.id || idx} className="hover:bg-slate-800/20 transition group">
                      {/* Patient Name Column */}
                      <td className="px-6 py-4 font-medium text-white max-w-[180px] truncate">
                        <div>
                          <p className="text-sm font-semibold">{item.title || 'Unknown Patient'}</p>
                          <p className="text-[11px] font-mono text-slate-500 mt-0.5">ID: {item.user_id || 'N/A'}</p>
                        </div>
                      </td>
                      
                      {/* Latest Report Title Column */}
                      <td className="px-6 py-4 max-w-[220px] truncate text-slate-300">
                        {item.summary ? (
                          <div>
                            <p className="text-sm text-slate-200 truncate">{item.title || 'Clinical Entry'}</p>
                            <p className="text-xs text-slate-500 truncate mt-0.5">{item.summary}</p>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-xs italic">No record parsed</span>
                        )}
                      </td>
                      
                      {/* Category Classification Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${badgeStyle}`}>
                          {item.category?.replace('_', ' ') || 'GENERAL'}
                        </span>
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                          {item.status || 'PROCESSED'}
                        </span>
                      </td>

                      {/* Quick Actions Buttons Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium space-x-2">
                        <button
                          type="button"
                          onClick={() => onViewReportDetails && onViewReportDetails(item.id)}
                          className="inline-flex items-center rounded-xl bg-slate-800 px-3 py-1.5 text-slate-300 border border-slate-700 hover:border-cyan-500/40 hover:text-cyan-400 transition"
                        >
                          Quick View
                        </button>
                        <button
                          type="button"
                          onClick={() => onViewPatientHistory && onViewPatientHistory(item.user_id || item.patientId)}
                          className="inline-flex items-center rounded-xl bg-cyan-500/10 px-3 py-1.5 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition"
                        >
                          Timeline 📜
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorDashboard