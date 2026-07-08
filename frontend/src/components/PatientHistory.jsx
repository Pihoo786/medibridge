import React from "react";

const categoryColors = {
  LAB_REPORT:
    "border-cyan-500/20 bg-cyan-500/10 text-cyan-200",

  PRESCRIPTION:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-200",

  SYMPTOM_MESSAGE:
    "border-amber-500/20 bg-amber-500/10 text-amber-200",
};

function PatientHistory({
  patient,
  history,
  onOpenReport,
  onBack,
}) {
  if (!patient) return null;

  return (
    <section className="space-y-6 p-6">

      <button
        onClick={onBack}
        className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-white hover:bg-slate-800"
      >
        ← Back to Patients
      </button>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

        <h2 className="text-2xl font-bold text-white">
          Patient #{patient.phone_last4}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-slate-800/60 p-4">
            <p className="text-xs uppercase text-slate-500">
              Total Reports
            </p>

            <p className="mt-2 text-2xl font-bold text-cyan-300">
              {patient.total_reports}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800/60 p-4">
            <p className="text-xs uppercase text-slate-500">
              Assigned Doctor
            </p>

            <p className="mt-2 text-lg text-white">
              {patient.assigned_doctor_id || "Not Assigned"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800/60 p-4">
            <p className="text-xs uppercase text-slate-500">
              Registered
            </p>

            <p className="mt-2 text-white">
              {new Date(
                patient.created_at
              ).toLocaleDateString("en-IN")}
            </p>
          </div>

        </div>

      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

        <h3 className="mb-5 text-xl font-semibold text-white">
          Medical History
        </h3>

        <div className="space-y-4">

          {history.map((report) => (

            <div
              key={report.id}
              className="rounded-xl border border-slate-800 bg-[#0d172d] p-5"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h4 className="font-semibold text-white">
                    {report.title}
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    {new Date(
                      report.created_at
                    ).toLocaleString("en-IN")}
                  </p>

                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs ${
                    categoryColors[report.category]
                  }`}
                >
                  {report.category.replace("_", " ")}
                </span>

              </div>

              <button
                onClick={() =>
                  onOpenReport(report.id)
                }
                className="mt-5 rounded-lg border border-cyan-500/20 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-500/10"
              >
                View Report
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default PatientHistory;