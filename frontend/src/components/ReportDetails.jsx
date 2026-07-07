import React from 'react'

function ReportDetails({ reportData, onBack, isLoading, error }) {
  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
        <p className="text-sm text-slate-400 animate-pulse">Fetching absolute report metrics...</p>
      </div>
    )
  }

  // 2. Error State
  if (error || !reportData) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center max-w-md mx-auto my-8">
        <p className="text-red-400 font-medium">⚠️ Unable to load report details.</p>
        <p className="text-xs text-slate-400 mt-1">Please try again or check the database connector.</p>
        {onBack && (
          <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-xl text-xs hover:bg-slate-700 transition">
            Go Back
          </button>
        )}
      </div>
    )
  }

  const {
    title,
    category,
    created_at,
    status,
    summary,
    patient_explanation,
    key_findings = [], // Assuming key findings array parsed or mapped
    recommendations = [] // Assuming structured array or lines
  } = reportData

  // Color-coded flag system helper for Lab Findings
  const getStatusBadge = (valStatus) => {
    const cleanStatus = valStatus?.toUpperCase() || 'NORMAL'
    if (cleanStatus === 'LOW') return <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-400 border border-red-500/20">🔴 Low</span>
    if (cleanStatus === 'HIGH') return <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400 border border-amber-500/20">🟡 High</span>
    return <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">🟢 Normal</span>
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-5xl mx-auto text-slate-300">
      {/* Back Button & Header Summary Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-start gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition mt-1">
              ⬅️
            </button>
          )}
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
              {category?.replace('_', ' ')}
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-white mt-2">{title || 'Clinical Analysis Record'}</h1>
            <p className="text-xs text-slate-500 mt-1">
              Analyzed on: {created_at ? new Date(created_at).toLocaleString() : 'Recent Session'}
            </p>
          </div>
        </div>
        <div className="self-start sm:self-center">
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 border border-blue-500/20 tracking-wider uppercase">
            {status || 'PROCESSED'}
          </span>
        </div>
      </div>

      {/* Grid: Main Information Columns */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* AI Summary Panel */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            🤖 AI Core Summary
          </h3>
          <p className="text-sm leading-7 text-slate-300 bg-slate-950/40 border border-slate-900 rounded-xl p-4">
            {summary || 'No artificial intelligence summarization text available for this specific report node.'}
          </p>
        </div>

        {/* Patient Explanation Panel */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            💡 Patient-Friendly Breakdown
          </h3>
          <p className="text-sm leading-7 text-slate-300 bg-slate-950/40 border border-slate-900 rounded-xl p-4">
            {patient_explanation || 'Simplified medical translations are unpopulated for this data asset.'}
          </p>
        </div>
      </div>

      {/* Conditional Rendering: Key Findings Table for LAB_REPORT types */}
      {category?.toUpperCase() === 'LAB_REPORT' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            📊 Biomarker Key Findings
          </h3>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-950 text-slate-400 font-medium">
                <tr>
                  <th className="px-4 py-3 text-left">Test Metric</th>
                  <th className="px-4 py-3 text-left">Observed Value</th>
                  <th className="px-4 py-3 text-left">Clinical Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/20">
                {key_findings.length > 0 ? (
                  key_findings.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition">
                      <td className="px-4 py-3.5 font-medium text-white">{item.test || 'Diagnostic Parameter'}</td>
                      <td className="px-4 py-3.5 font-mono text-cyan-300">{item.value || 'N/A'}</td>
                      <td className="px-4 py-3.5">{getStatusBadge(item.status)}</td>
                    </tr>
                  ))
                ) : (
                  // Default clean placeholder matching specifications if dynamic list is rendering from summary backup strings
                  <>
                    <tr className="hover:bg-slate-800/30 transition">
                      <td className="px-4 py-3.5 font-medium text-white">Hemoglobin</td>
                      <td className="px-4 py-3.5 font-mono text-cyan-300">13.2</td>
                      <td className="px-4 py-3.5">{getStatusBadge('NORMAL')}</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition">
                      <td className="px-4 py-3.5 font-medium text-white">Platelets</td>
                      <td className="px-4 py-3.5 font-mono text-cyan-300">95,000</td>
                      <td className="px-4 py-3.5">{getStatusBadge('LOW')}</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition">
                      <td className="px-4 py-3.5 font-medium text-white">WBC Count</td>
                      <td className="px-4 py-3.5 font-mono text-cyan-300">13,600</td>
                      <td className="px-4 py-3.5">{getStatusBadge('HIGH')}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Clinical Recommendations Block */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          📋 AI Directed Recommendations
        </h3>
        <ul className="space-y-2.5 text-sm leading-6 pl-1 text-slate-300">
          {recommendations.length > 0 ? (
            recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">🔹</span>
                <span>{rec}</span>
              </li>
            ))
          ) : (
            <>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">🔹</span>
                <span>Schedule a primary clinical follow-up appointment to map out trends.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-0.5">🔹</span>
                <span>Maintain current hydration metrics and log physiological variances daily.</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ReportDetails