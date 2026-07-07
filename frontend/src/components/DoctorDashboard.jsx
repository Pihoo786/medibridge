import React from "react";

const activityTone = {
  LAB_REPORT: "bg-cyan-500/15 text-cyan-200 border-cyan-500/20",
  PRESCRIPTION: "bg-emerald-500/15 text-emerald-200 border-emerald-500/20",
  SYMPTOM_MESSAGE: "bg-amber-500/15 text-amber-200 border-amber-500/20",
};

function DoctorDashboard({
  patients,
  onOpenReport,
  showAllActivity,
  onToggleViewAll,
}) {
  const getTriageClass = (status) =>
    activityTone[status] || activityTone.LAB_REPORT;

  const visiblePatients = showAllActivity
    ? patients
    : patients.slice(0, 5);

  return (
    <section className="space-y-6 p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Assigned Reports</p>

          <h3 className="mt-3 text-3xl font-semibold text-white">
            {patients.length}
          </h3>

          <p className="mt-2 text-sm text-cyan-300">
            My Patients
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
              My Reports
            </p>

            <h3 className="mt-1 text-lg font-semibold text-white">
              Recent Assigned Reports
            </h3>
          </div>

          <button
            onClick={onToggleViewAll}
            className="rounded-xl px-3 py-1.5 text-sm text-cyan-300 hover:bg-slate-800"
          >
            {showAllActivity ? "Show Less" : "View All"}
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {visiblePatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => onOpenReport(patient.id)}
              className="flex w-full items-start gap-4 rounded-2xl border border-slate-800 bg-[#0d172d] p-4 text-left hover:border-cyan-500/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-100">
                {patient.title
                  ?.split(" ")
                  .map((x) => x[0])
                  .join("")}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">
                    {patient.title}
                  </p>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs ${getTriageClass(
                      patient.category
                    )}`}
                  >
                    {patient.category}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-400">
                  {patient.summary}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {new Date(patient.created_at).toLocaleString()}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DoctorDashboard; 