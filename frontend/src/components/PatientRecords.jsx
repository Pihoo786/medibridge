import React, { useEffect, useMemo, useState } from 'react'

const statusColors = {
  LAB_REPORT:
    'border-cyan-500/20 bg-cyan-500/10 text-cyan-200',

  PRESCRIPTION:
    'border-emerald-500/20 bg-emerald-500/10 text-emerald-200',

  SYMPTOM_MESSAGE:
    'border-amber-500/20 bg-amber-500/10 text-amber-200'
}

function PatientRecords() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('created_at')
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/reports')
      .then((res) => res.json())
      .then((data) => {
        setReports(data.reports || [])
      })
      .catch((err) => console.error(err))
  }, [])

  const filteredReports = useMemo(() => {
    const term = searchTerm.toLowerCase()

    const filtered =
      statusFilter === 'All'
        ? reports
        : reports.filter(
            (r) => r.category === statusFilter
          )

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }

      return (
        new Date(b.created_at) -
        new Date(a.created_at)
      )
    })

    return sorted.filter(
      (r) =>
        r.title.toLowerCase().includes(term) ||
        r.id.toLowerCase().includes(term)
    )
  }, [reports, searchTerm, statusFilter, sortBy])

  const categories = [
    'All',
    'LAB_REPORT',
    'PRESCRIPTION',
    'SYMPTOM_MESSAGE'
  ]

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-8">

      <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Medical Reports
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Reports processed by Gemini AI
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-200">
          Total Reports: {reports.length}
        </div>

      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">

        <input
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          placeholder="Search by report title or ID..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2 text-white"
        />

        <div className="flex gap-2">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setStatusFilter(category)
              }
              className={`rounded-xl px-3 py-2 text-xs ${
                statusFilter === category
                  ? 'bg-cyan-500 text-black'
                  : 'bg-slate-900 text-slate-300'
              }`}
            >
              {category}
            </button>
          ))}

          <button
            onClick={() =>
              setSortBy(
                sortBy === 'created_at'
                  ? 'title'
                  : 'created_at'
              )
            }
            className="rounded-xl bg-slate-900 px-3 py-2 text-xs text-slate-200"
          >
            Sort: {sortBy === 'created_at'
              ? 'Latest'
              : 'Title'}
          </button>

        </div>

      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800">

        <table className="w-full text-left">

          <thead className="bg-slate-950 text-slate-400">

            <tr>
              <th className="px-6 py-4">
                Report ID
              </th>

              <th className="px-6 py-4">
                Title
              </th>

              <th className="px-6 py-4">
                Category
              </th>

              <th className="px-6 py-4">
                Created
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredReports.map((report) => (

              <tr
                key={report.id}
                className="border-t border-slate-800 hover:bg-slate-900"
              >

                <td className="px-6 py-4 text-slate-400">
                  {report.id}
                </td>

                <td className="px-6 py-4 text-white font-semibold">
                  {report.title}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${
                      statusColors[
                        report.category
                      ]
                    }`}
                  >
                    {report.category}
                  </span>

                </td>

                <td className="px-6 py-4 text-slate-400">
                  {new Date(
                    report.created_at
                  ).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default PatientRecords