import React, { useMemo, useState } from 'react'

function PatientRecords() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('lastVisit')
  const [patients] = useState([
    { id: 'P-1042', name: 'John Doe', age: 45, gender: 'Male', lastVisit: 'Jun 12, 2026', status: 'Stable', alert: false },
    { id: 'P-1089', name: 'Jane Smith', age: 34, gender: 'Female', lastVisit: 'Jun 14, 2026', status: 'Critical', alert: true },
    { id: 'P-2104', name: 'Robert Lee', age: 61, gender: 'Male', lastVisit: 'Jun 10, 2026', status: 'Recovering', alert: false },
    { id: 'P-3011', name: 'Sarah Connor', age: 29, gender: 'Female', lastVisit: 'May 28, 2026', status: 'Stable', alert: false }
  ])

  const filteredPatients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    const byStatus = statusFilter === 'All' ? patients : patients.filter((p) => p.status === statusFilter)
    const sorted = [...byStatus].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return new Date(b.lastVisit) - new Date(a.lastVisit)
    })

    return sorted.filter(
      (p) => p.name.toLowerCase().includes(term) || p.id.toLowerCase().includes(term)
    )
  }, [patients, searchTerm, statusFilter, sortBy])

  const statusOptions = ['All', 'Stable', 'Critical', 'Recovering']

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-8">
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Patient Records Repository</h1>
          <p className="mt-0.5 text-sm text-slate-500">Manage historical diagnostics, active charts, and status tracking.</p>
        </div>

        <div className="self-start rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-200 sm:self-auto">
          Total Records: {patients.length}
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-xl flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-100 placeholder-slate-500 shadow-sm outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {statusOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatusFilter(option)}
              className={`rounded-2xl px-3 py-1.5 text-xs font-semibold transition duration-200 ${
                statusFilter === option
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {option}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSortBy(sortBy === 'lastVisit' ? 'name' : 'lastVisit')}
            className="rounded-2xl bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-200 transition duration-200 hover:bg-slate-800"
          >
            Sort: {sortBy === 'lastVisit' ? 'Latest' : 'Name'}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-cyan-950/5">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/70 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">System ID</th>
                <th className="px-6 py-4">Full Patient Name</th>
                <th className="px-6 py-4">Age / Demographics</th>
                <th className="px-6 py-4">Last Check-In</th>
                <th className="px-6 py-4 text-center">Triage Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm text-slate-200">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="group transition-colors hover:bg-slate-800/50">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400 transition-colors group-hover:text-cyan-300">{p.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold tracking-tight text-white">{p.name}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-400">
                      {p.age} yrs <span className="mx-1.5 text-slate-600">|</span> {p.gender}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-400">{p.lastVisit}</td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${
                          p.status === 'Stable'
                            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200'
                            : p.status === 'Critical'
                              ? 'border-rose-500/20 bg-rose-500/10 text-rose-200 animate-pulse'
                              : 'border-amber-500/20 bg-amber-500/10 text-amber-200'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            p.status === 'Stable'
                              ? 'bg-emerald-500'
                              : p.status === 'Critical'
                                ? 'bg-rose-500'
                                : 'bg-amber-500'
                          }`}
                        ></span>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="bg-slate-950/20 py-12 text-center font-medium text-slate-400">
                    No active records match the diagnostic query filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PatientRecords
