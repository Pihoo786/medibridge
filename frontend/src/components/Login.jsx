import React, { useState } from 'react'

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (onLoginSuccess) onLoginSuccess()
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_55%,#01050f_100%)] font-sans text-slate-200 antialiased">
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-800/80 bg-slate-900/70 p-10 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-xl font-black tracking-wider text-white shadow-lg shadow-cyan-500/20">
            MB
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">MediBridge Portal</h2>
          <p className="mt-1.5 text-xs font-medium tracking-wide text-slate-400">AUTHORIZED HEALTHCARE PERSONNEL ONLY</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@medibridge.com"
              required
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
              <button type="button" className="text-xs font-medium text-cyan-300 transition-colors hover:text-cyan-200">Forgot?</button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 shadow-inner outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/25 active:scale-[0.99]"
          >
            Authenticate Securely
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
