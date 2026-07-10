import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#020917] py-10">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">

        <div>

          <h2 className="text-2xl font-bold text-white">
            MediBridge AI
          </h2>

          <p className="mt-2 text-slate-400">
            AI-Powered Healthcare, One Message Away.
          </p>

        </div>

        <div className="flex gap-8 text-slate-400">

          <a href="#about">About</a>

          <a href="#features">Features</a>

          <a href="#security">Security</a>

        </div>

        <div className="flex items-center gap-2 text-slate-500">

          Built with

          <Heart size={16} className="text-red-400" />

          by Team MediBridge

        </div>

      </div>

    </footer>
  );
}

export default Footer;