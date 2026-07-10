function Navbar({ onLogin }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#020917]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 font-black">
            MB
          </div>

          <div>

            <h2 className="text-xl font-bold">
              MediBridge AI
            </h2>

            <p className="text-xs text-slate-400">
              AI Healthcare Platform
            </p>

          </div>

        </div>

        <div className="hidden items-center gap-10 lg:flex">

          <a href="#about" className="text-slate-300 hover:text-cyan-300">
            About
          </a>

          <a href="#features" className="text-slate-300 hover:text-cyan-300">
            Features
          </a>

          <a href="#security" className="text-slate-300 hover:text-cyan-300">
            Security
          </a>

          <a href="#contact" className="text-slate-300 hover:text-cyan-300">
            Contact
          </a>

        </div>

        <button onClick={onLogin} className="rounded-xl bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-400">
          Doctor Login
        </button>

      </div>
    </nav>
  );
}

export default Navbar;