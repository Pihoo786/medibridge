import { ArrowRight, MessageCircle } from "lucide-react";

const whatsappLink =
  "https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+taught-ground&type=phone_number&app_absent=0";

function Hero({ onLogin }) {
  return (
    <section className="relative overflow-hidden bg-[#020917] px-6 py-24 text-white">

      {/* Background Glows */}
      <div className="absolute left-1/2 top-10 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute right-0 top-40 -z-10 h-[350px] w-[350px] rounded-full bg-green-500/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div>

          <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
            MediBridge AI
          </p>

          <h1 className="mt-6 text-5xl font-black leading-tight lg:text-7xl">
            Healthcare Support,
            <br />
            Right from{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              WhatsApp
            </span>
          </h1>

          <p className="mt-6 text-xl font-medium text-cyan-300">
            AI-Powered Healthcare, One Message Away.
          </p>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            MediBridge AI helps you understand medical reports,
            prescriptions, and symptoms through WhatsApp using Artificial
            Intelligence. Once processed, your reports are securely reviewed
            by authorized MediBridge healthcare professionals through the
            MediBridge Doctor Portal.
          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap gap-5">

            <button
                onClick={() => {
                    document
                    .getElementById("get-started")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                <MessageCircle size={20} />
                Get Started
            </button>
            <button
              onClick={onLogin}
              className="flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-7 py-4 font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-500/20"
            >
              Doctor Login
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Trust Badges */}

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-400">

            <div>🔒 Secure</div>

            <div>⚡ AI Powered</div>

            <div>💬 WhatsApp Based</div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex justify-center">

          <div className="w-[360px] rounded-[40px] border border-slate-700 bg-slate-900 p-6 shadow-2xl">

            {/* Chat Header */}

            <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-black">
                  MB
                </div>

                <div>

                  <h3 className="font-semibold">
                    MediBridge AI
                  </h3>

                  <p className="text-xs text-green-400">
                    Online
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-green-500"></div>

                <span className="text-xs text-green-400">
                  Connected
                </span>

              </div>

            </div>

            {/* Chat */}

            <div className="space-y-4">

              <div className="w-fit max-w-[85%] rounded-2xl bg-cyan-500/10 p-4 leading-7">

                👋 Welcome to <strong>MediBridge AI</strong>

                <br />
                <br />

                I'm here to help you understand your health information.

              </div>

              <div className="ml-auto w-fit rounded-2xl bg-[#25D366] px-5 py-3 text-black">

                Hi 👋

              </div>

              <div className="w-fit max-w-[85%] rounded-2xl bg-cyan-500/10 p-4 leading-7">

                How can I help you today?

                <br />
                <br />

                📄 Upload Lab Report

                <br />

                💊 Upload Prescription

                <br />

                💬 Describe Symptoms

              </div>

            </div>

            {/* Fake Input */}

            <div className="mt-8 flex items-center gap-3 rounded-full bg-slate-800 px-5 py-3">

              <input
                disabled
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
              />

              <MessageCircle
                size={18}
                className="text-green-400"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;