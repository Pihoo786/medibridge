import React, { useEffect, useMemo, useState } from 'react'

const statusColors = {
  LAB_REPORT:
    'border-cyan-500/20 bg-cyan-500/10 text-cyan-200',

  PRESCRIPTION:
    'border-emerald-500/20 bg-emerald-500/10 text-emerald-200',

  SYMPTOM_MESSAGE:
    'border-amber-500/20 bg-amber-500/10 text-amber-200'
}

function PatientRecords({ onOpenPatient }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [patients, setPatients] = useState([])
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/patients`)
      .then((res) => res.json())
      .then((data) => {
        setPatients(data.patients || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredPatients = useMemo(() => {
    const term = searchTerm.toLowerCase();

    const sorted = [...patients].sort((a, b) => {
      if (sortBy === "report_count") {
        return b.report_count - a.report_count;
      }

      return (
        new Date(b.last_report_at || 0) -
        new Date(a.last_report_at || 0)
      );
    });

    return sorted.filter(
      (patient) =>
        patient.phone.toLowerCase().includes(term) ||
        patient.id.toLowerCase().includes(term)
    );
  }, [patients, searchTerm, sortBy]);


  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-8">

      <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Patient Records
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage assigned patients.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-200">
          Total Patients: {patients.length}
        </div>

      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">

        <input
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          placeholder="Search by phone or patient ID..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2 text-white"
        />

        <div className="flex gap-2">

          

          <button
            onClick={() =>
              setSortBy(
                sortBy === "last_report_at"
                  ? "report_count"
                  : "last_report_at"
              )
            }
            className="rounded-xl bg-slate-900 px-3 py-2 text-xs text-slate-200"
          >
            Sort: {sortBy === "last_report_at"
              ? "Latest Activity"
              : "Report Count"}
          </button>

        </div>

      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800">

        <table className="w-full text-left">

          <thead className="bg-slate-950 text-slate-400">

            <tr>
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Reports</th>
              <th className="px-6 py-4">Latest Report</th>
              <th className="px-6 py-4">Last Activity</th>
              <th className="px-6 py-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredPatients.map((patient) => (

              <tr
                key={patient.id}
                className="border-t border-slate-800 hover:bg-slate-900"
              >

                <td className="px-6 py-4 font-semibold text-white">
                  {patient.phone}
                </td>

                <td className="px-6 py-4 text-cyan-300 font-semibold">
                  {patient.report_count}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${
                      statusColors[patient.latest_report_category]
                    }`}
                  >
                    {patient.latest_report_category?.replace("_", " ")}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-400">
                  {patient.last_report_at
                    ? new Date(patient.last_report_at).toLocaleString("en-IN")
                    : "-"}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => onOpenPatient(patient.id)}
                    className="rounded-lg border border-cyan-500/20 px-4 py-2 text-xs text-cyan-300 transition hover:bg-cyan-500/10"
                  >
                    View History
                  </button>
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