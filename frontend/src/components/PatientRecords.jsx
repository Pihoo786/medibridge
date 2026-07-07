import React from 'react'

const categoryStyles = {
  LAB_REPORT: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 icon-🩸',
  PRESCRIPTION: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 icon-💊',
  SYMPTOM_MESSAGE: 'bg-amber-500/10 text-amber-400 border-amber-500/20 icon-🤒'
}

const getCategoryEmoji = (cat) => {
  if (cat?.toUpperCase() === 'LAB_REPORT') return '🩸'
  if (cat?.toUpperCase() === 'PRESCRIPTION') return '💊'
  return '🤒'
}

function PatientHistory({ 
  patientId, 
  historyData = [], 
  patientInfo = null,
  onSelectReport, 
  onBack,
  isLoading,
  error 
}) {

  // 1. Loading State Handler
  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
        <p className="text-sm text-slate-400 animate-pulse">Loading patient medical history...</p>
      </div>
    )
  }

  // 2. Error State Handler
  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center max-w-md mx-auto my-8">
        <p className="text-red-400 font-medium">⚠️ Unable to load reports.</p>
        <p className="text-xs text-slate-400 mt-1">Please try again later or verify connection settings.</p>
        {onBack && (
          <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs hover:bg-slate-700 transition">
            Go Back
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header / Meta section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition"
              >
                ⬅️
              </button>
            )}
            <h2 className="text-xl font-bold tracking-tight text-white">Medical Timeline & History</h2>
          </div>
          {patientInfo ? (
            <p className="text-sm text-slate-400 pl-11">
              Patient ID: <span className="text-cyan-400 font-mono">{patientInfo.id || patientId}</span> 
              {patientInfo.assigned_doctor && ` • Dr. ${patientInfo.assigned_doctor}`}
            </p>
          ) : (
            <p className="text-sm text-slate-400 font-mono pl-11">ID: {patientId}</p>
          )}
        </div>
        
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 text-right sm:self-start">
          <span className="text-xs text-slate-400 block uppercase tracking-wider">Total Records</span>
          <span className="text-lg font-bold text-cyan-400">{historyData.length} entries</span>
        </div>
      </div>

      {/* Empty State */}
      {historyData.length === 0 && (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl">
          <p className="text-slate-400">No medical records found for this patient profile.</p>
        </div>
      )}

      {/* Timeline UI Component */}
      <div className="relative border-l border-slate-800 ml-4 sm:ml-6 space-y-8">
        {historyData.map((report, index) => {
          const styleKey = report.category?.toUpperCase() || 'LAB_REPORT'
          const badgeStyle = categoryStyles[styleKey] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'
          const formattedDate = report.created_at 
            ? new Date(report.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : 'Recent Date'

          return (
            <div key={report.id || index} className="relative pl-8 group">
              {/* Timeline target node point */}
              <div className="absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 border border-slate-800 text-sm group-hover:border-cyan-500/50 transition duration-200">
                {getCategoryEmoji(report.category)}
              </div>

              {/* Interactive Card */}
              <button
                type="button"
                onClick={() => onSelectReport && onSelectReport(report.id)}
                className="flex w-full flex-col text-left rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:bg-slate-900/80 group-hover:shadow-lg group-hover:shadow-cyan-950/5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
                  <span className="text-xs font-semibold tracking-wide text-cyan-400 font-mono uppercase">
                    {formattedDate}
                  </span>
                  <span className={`inline-flex self-start rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${badgeStyle}`}>
                    {report.category?.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="mt-2 text-base font-semibold text-white tracking-tight group-hover:text-cyan-300 transition">
                  {report.title || 'Untitled Clinical Report'}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400 font-normal">
                  {report.summary || 'No overview summary provided for this interaction record.'}
                </p>

                <div className="mt-4 flex items-center justify-end text-xs font-medium text-cyan-400 group-hover:text-cyan-300">
                  <span className="mr-1">Expand Document Details</span> →
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PatientHistory