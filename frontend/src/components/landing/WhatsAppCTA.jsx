import { MessageCircle, QrCode, ArrowRight } from "lucide-react";
const whatsappLink =
  "https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+taught-ground&type=phone_number&app_absent=0";
function WhatsAppCTA() {
  return (
    <section
        id="get-started"
        className="bg-[#07101d] py-24 px-6 text-white"
    >

      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-[#0d172d] p-10 lg:p-16">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left */}

          <div>

            <p className="uppercase tracking-[0.3em] text-cyan-400 font-semibold">
              Get Started
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight">
              Healthcare Support
              <br />
              is Just One Message Away.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Scan the QR code or click below to start chatting with
              MediBridge AI on WhatsApp.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-[#020917] font-bold">
                  1
                </div>

                <p>Scan the QR Code</p>

              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-[#020917] font-bold">
                  2
                </div>

                <p>Tap Send in WhatsApp</p>

              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-[#020917] font-bold">
                  3
                </div>

                <p>Upload Reports or Describe Symptoms</p>

              </div>

            </div>

            <button
                onClick={() => window.open(whatsappLink, "_blank")}
                className="mt-10 flex items-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <MessageCircle size={22} />

              Open WhatsApp

              <ArrowRight size={18} />

            </button>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <div className="rounded-3xl border border-slate-700 bg-white p-6">

              {/* Replace this later */}

              <div className="flex h-64 w-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300">
                <img
                    src="/whatsapp-qr.png"
                    alt="Scan to start on WhatsApp"
                    className="h-72 w-72 rounded-2xl object-contain"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhatsAppCTA;