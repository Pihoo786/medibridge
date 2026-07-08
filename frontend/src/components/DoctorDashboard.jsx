import React from "react";

const categoryColors = {
  LAB_REPORT:
    "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",

  PRESCRIPTION:
    "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

  SYMPTOM_MESSAGE:
    "bg-amber-500/10 text-amber-300 border-amber-500/20",
};

const statusColors = {
  PROCESSED:
    "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

  PENDING:
    "bg-amber-500/10 text-amber-300 border-amber-500/20",

  FAILED:
    "bg-rose-500/10 text-rose-300 border-rose-500/20",
};

const triageColors = {
  HIGH:
    "bg-red-500/15 text-red-300 border-red-500/20",

  MEDIUM:
    "bg-amber-500/15 text-amber-300 border-amber-500/20",

  LOW:
    "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
};

function DoctorDashboard({
  patients = [],
  onOpenReport,
  onOpenPatientRecords,
}) {
  const todaysReports = patients.filter((p) => {
    const today = new Date().toDateString();
    return (
      new Date(p.created_at).toDateString() === today
    );
  }).length;

  const highPriority = patients.filter(
    (p) => p.triage_level === "HIGH"
  ).length;

  const processedToday = patients.filter(
    (p) => p.status === "PROCESSED"
  ).length;

  const summaryCards = [
    {
      label: "Assigned Reports",
      value: patients.length,
      subtitle: "Available",
    },
    {
      label: "Today's Reports",
      value: todaysReports,
      subtitle: "Received",
    },
    {
      label: "High Priority",
      value: highPriority,
      subtitle: "Needs attention",
    },
    {
      label: "AI Processed",
      value: processedToday,
      subtitle: "Completed",
    },
  ];

  return (
    <section className="space-y-6 p-6">
            {/* Header */}

      <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
            Provider Workspace
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Doctor Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Review assigned reports, monitor AI processing, and access patient
            histories.
          </p>

        </div>

        <button
          onClick={onOpenPatientRecords}
          className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
        >
          👥 Patient Records
        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {summaryCards.map((card) => (

          <div
            key={card.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-cyan-950/5"
          >

            <div className="flex items-center justify-between">

              <p className="text-sm text-slate-400">
                {card.label}
              </p>

              <span className="h-2 w-2 rounded-full bg-cyan-400" />

            </div>

            <h2 className="mt-5 text-3xl font-bold text-white">
              {card.value}
            </h2>

            <p className="mt-2 text-sm text-cyan-300">
              {card.subtitle}
            </p>

          </div>

        ))}

      </div>
            {/* Recent Assigned Reports */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-cyan-950/5">

        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

          <div>

            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
              Clinical Feed
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              Recent Assigned Reports
            </h2>

          </div>

          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
            {patients.length} Reports
          </span>

        </div>

        <div className="divide-y divide-slate-800">

          {patients.length === 0 ? (

            <div className="py-16 text-center text-slate-500">

              <p>No reports assigned.</p>

            </div>

          ) : (

            [...patients]
              .sort((a, b) => {
                const priority = {
                  HIGH: 3,
                  MEDIUM: 2,
                  LOW: 1,
                };

                return (
                  (priority[b.triage_level] || 0) -
                  (priority[a.triage_level] || 0)
                );
              })
              .slice(0, 6).map((patient) => (

              <div
                key={patient.id}
                className="flex items-center justify-between px-6 py-5 hover:bg-slate-800/30 transition"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300 font-bold">

                    #{patient.patient?.phone_last4 || "--"}

                  </div>

                  <div>

                    <h3 className="font-semibold text-white">

                      {patient.title}

                    </h3>

                    <p className="mt-1 text-sm text-slate-400">

                      {patient.summary}

                    </p>
                    {patient.triage_reason && (

                      <p className="mt-2 text-xs text-slate-500 italic">

                        AI Triage: {patient.triage_reason}

                      </p>

                    )}

                    <p className="mt-2 text-xs text-slate-500">

                      {new Date(patient.created_at).toLocaleString("en-IN")}

                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${
                      categoryColors[patient.category]
                    }`}
                  >
                    {patient.category_display}
                  </span>

                  {patient.triage_level ? (

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        triageColors[patient.triage_level]
                      }`}
                    >
                      {patient.triage_level}
                    </span>

                  ) : (

                    <span
                      className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400"
                    >
                      N/A
                    </span>

                  )}

                  <button
                    onClick={() => onOpenReport(patient.id)}
                    className="rounded-xl border border-cyan-500/20 px-4 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/10"
                  >
                    View Report
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

        

    </section>
  );
}

export default DoctorDashboard;
      