import { ArrowRight, ShieldCheck, Stethoscope } from "lucide-react";

function DoctorPortal({ onLogin }) {
  return (
    <section className="bg-[#020917] py-24 px-6">

      <div className="mx-auto max-w-7xl">

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0b1220] to-[#101b32]">

          <div className="grid items-center gap-12 p-12 lg:grid-cols-2">

            {/* Left */}

            <div>

              <p className="uppercase tracking-[0.3em] text-cyan-400 font-semibold">
                Doctor Portal
              </p>

              <h2 className="mt-4 text-4xl font-bold text-white">
                For Authorized
                <br />
                MediBridge Healthcare Professionals
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-400">
                Access AI-generated reports, patient history, and medical
                insights through the secure MediBridge Doctor Portal.
              </p>

              <button
                onClick={onLogin}
                className="mt-10 flex items-center gap-3 rounded-2xl bg-cyan-500 px-7 py-4 font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Doctor Login
                <ArrowRight size={18} />
              </button>

            </div>

            {/* Right */}

            <div className="grid gap-5">

              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">

                <div className="flex items-center gap-4">

                  <ShieldCheck className="text-cyan-400" size={30} />

                  <div>

                    <h3 className="font-semibold text-white">
                      Secure Dashboard
                    </h3>

                    <p className="text-slate-400">
                      Access protected patient records.
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">

                <div className="flex items-center gap-4">

                  <Stethoscope className="text-cyan-400" size={30} />

                  <div>

                    <h3 className="font-semibold text-white">
                      AI Insights
                    </h3>

                    <p className="text-slate-400">
                      Review AI summaries and patient reports.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default DoctorPortal;