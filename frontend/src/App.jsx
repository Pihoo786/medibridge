import { useEffect, useMemo, useState } from 'react'
import AdminDashboard from './components/AdminDashboard'
import ReportDetails from './components/ReportDetails'
import Login from './components/Login'
import PatientRecords from './components/PatientRecords'
import { supabase } from "./lib/supabase";
import DoctorDashboard from "./components/DoctorDashboard";

const adminNavItems = [
  { id: 'dashboard-home', label: 'Dashboard Home', icon: '◫' },
  { id: 'patient-records', label: 'Patient Records', icon: '▣' }
]

const doctorNavItems = [
  { id: 'dashboard-home', label: 'Dashboard Home', icon: '◫' }
]

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [activeView, setActiveView] = useState('dashboard')
  const [currentPage, setCurrentPage] = useState('dashboard-home')
  const [statusMessage, setStatusMessage] = useState('')
  const [patients, setPatients] = useState([])
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("User Profile in App:", userProfile)
  useEffect(() => {
    fetch(`${API_BASE_URL}/reports`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)

        setPatients(data.reports || [])
      })
      .catch((err) => {
        console.error(err)
        setPatients([])
      })
  }, [])
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [showAllActivity, setShowAllActivity] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    name: '',
    age: '',
    gender: 'Female',
    contact: '',
    symptoms: '',
    bloodPressure: '120/80',
    heartRate: '72',
    spO2: '98',
    temperature: '36.8',
    aiExplanation: ''
  })

  const currentPatient = useMemo(() => {
    if (!selectedPatient) return null
    return patients.find((patient) => patient.id === selectedPatient)
  }, [patients, selectedPatient])

  const openReport = (patientId) => {
    setSelectedPatient(patientId)
    setActiveView('report')
    setCurrentPage('dashboard-home')
  }

  const returnToDashboard = () => {
    setSelectedPatient(null)
    setActiveView('dashboard')
    setCurrentPage('dashboard-home')
  }

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId)
    if (pageId === 'dashboard-home') {
      setActiveView('dashboard')
      setSelectedPatient(null)
    }
  }

  const handleExport = () => {
    const exportData = {
      generatedAt: new Date().toISOString(),
      totalPatients: patients.length,
      patients: patients.map((patient) => ({
        id: patient.id,
        name: patient.name,
        triageStatus: patient.triageStatus,
        lastCheckIn: patient.lastCheckIn
      }))
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'medibridge-dashboard-export.json'
    link.click()
    URL.revokeObjectURL(url)
    setStatusMessage('Dashboard export downloaded successfully.')
  }

  const handleNewReview = () => {
    setIsReviewModalOpen(true)
    setStatusMessage('')
  }

  const toggleViewAllActivity = () => {
    setShowAllActivity((prev) => !prev)
  }

  const openPatientRecords = () => {
    setCurrentPage('patient-records')
    setSelectedPatient(null)
    setActiveView('dashboard')
  }

  const handleReviewFormChange = (field, value) => {
    setReviewForm((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()

    if (!reviewForm.name || !reviewForm.contact || !reviewForm.symptoms) {
      setStatusMessage('Please fill in name, contact, and symptoms before saving.')
      return
    }

    const age = Number(reviewForm.age) || 0
    const heartRate = Number(reviewForm.heartRate) || 72
    const spO2 = Number(reviewForm.spO2) || 98
    const temperature = Number(reviewForm.temperature) || 36.8
    const bloodPressure = reviewForm.bloodPressure || '120/80'

    const newPatient = {
      id: `P-${Date.now()}`,
      name: reviewForm.name,
      age,
      gender: reviewForm.gender,
      contact: reviewForm.contact,
      lastCheckIn: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      triageStatus:
        heartRate > 100 || spO2 < 95 || temperature > 37.5
          ? 'Critical'
          : heartRate > 88 || temperature > 37
            ? 'Recovering'
            : 'Stable',
      rawWhatsAppMessage: `New review added for ${reviewForm.name}: ${reviewForm.symptoms}`,
      extractedMetrics: {
        bloodPressure,
        heartRate,
        spO2,
        temperature
      },
      aiExplanation:
        reviewForm.aiExplanation ||
        `${reviewForm.name} has been added for review. The recorded symptoms suggest ${reviewForm.symptoms.toLowerCase()} and should be assessed by a clinician.`
    }

    setPatients((prev) => [newPatient, ...prev])
    setSelectedPatient(newPatient.id)
    setActiveView('report')
    setCurrentPage('dashboard-home')
    setIsReviewModalOpen(false)
    setStatusMessage(`New review created for ${newPatient.name}.`)
    setReviewForm({
      name: '',
      age: '',
      gender: 'Female',
      contact: '',
      symptoms: '',
      bloodPressure: '120/80',
      heartRate: '72',
      spO2: '98',
      temperature: '36.8',
      aiExplanation: ''
    })
  }
  
  if (!isLoggedIn) {
    return (
      <Login
        onLoginSuccess={(profile) => {
          setUserProfile(profile)
          setIsLoggedIn(true)
        }}
      />
    )
    }

  return (
    <div className="min-h-screen bg-[#020917] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-72 flex-col border-r border-slate-800/80 bg-[#0b1220] shadow-2xl shadow-cyan-950/10 lg:flex">
          <div className="flex items-center gap-3 border-b border-slate-800/80 bg-[#0b1220] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-black text-white shadow-lg shadow-cyan-500/10">
              MB
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-white">MediBridge</span>
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Enterprise</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-cyan-500/10 text-cyan-100 shadow-inner shadow-cyan-500/5'
                    : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-100'
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm ${currentPage === item.id ? 'bg-cyan-500/15 text-cyan-100' : 'bg-slate-900/80 text-slate-300 group-hover:bg-slate-800'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t border-slate-800/80 bg-[#0b1220]/80 p-4">
            <div className="flex items-center gap-2.5 px-3 py-1">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {userProfile?.full_name}
                </p>

                <p className="text-[11px] uppercase tracking-wide text-cyan-400">
                  {userProfile?.role}
                </p>

                {userProfile?.specialization && (
                  <p className="text-[11px] text-slate-500">
                    {userProfile.specialization}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                setUserProfile(null)
                setIsLoggedIn(false)
              }}
              className="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 transition-all duration-200 hover:bg-rose-500/5 hover:text-rose-200"
            >
              ↩ Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-[#020917]">
          {currentPage === 'dashboard-home' && activeView === 'dashboard' && (
            <>
              <header className="border-b border-slate-800/80 bg-[#0b1220] px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Overview</p>
                    <h1 className="mt-1 text-2xl font-semibold text-white">AI Medical Dashboard</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    {userProfile?.role === 'ADMIN' && (
                      <>
                        <button
                          type="button"
                          onClick={handleExport}
                          className="hidden rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 sm:inline-flex"
                        >
                          Export
                        </button>

                        <button
                          type="button"
                          onClick={handleNewReview}
                          className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/15 transition duration-200 hover:-translate-y-0.5"
                        >
                          + New Review
                        </button>
                      </>
                    )}
                  </div>
                  </div>
                {statusMessage && (
                  <div className="mt-3 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100">
                    {statusMessage}
                  </div>
                )}
              </header>
                {userProfile?.role === "ADMIN" ? (
                <AdminDashboard
                  patients={patients}
                  onOpenReport={openReport}
                  showAllActivity={showAllActivity}
                  onToggleViewAll={toggleViewAllActivity}
                  onSeeAll={openPatientRecords}
                />
              ) : (
                <DoctorDashboard
                  patients={patients}
                  onOpenReport={openReport}
                  showAllActivity={showAllActivity}
                  onToggleViewAll={toggleViewAllActivity}
                  onSeeAll={openPatientRecords}
                />
              )}
            </>
          )}

          {isReviewModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
              <div className="w-full max-w-3xl rounded-3xl border border-slate-800 bg-[#0b1220] p-6 shadow-2xl shadow-cyan-950/20">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Review Intake</p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">Add New Patient Review</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 text-sm text-slate-200"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleReviewSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">Patient Name</label>
                    <input
                      value={reviewForm.name}
                      onChange={(e) => handleReviewFormChange('name', e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">Age</label>
                    <input
                      type="number"
                      value={reviewForm.age}
                      onChange={(e) => handleReviewFormChange('age', e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">Gender</label>
                    <select
                      value={reviewForm.gender}
                      onChange={(e) => handleReviewFormChange('gender', e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
                    >
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">Contact</label>
                    <input
                      value={reviewForm.contact}
                      onChange={(e) => handleReviewFormChange('contact', e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">Symptoms</label>
                    <textarea
                      rows="3"
                      value={reviewForm.symptoms}
                      onChange={(e) => handleReviewFormChange('symptoms', e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">Blood Pressure</label>
                    <input
                      value={reviewForm.bloodPressure}
                      onChange={(e) => handleReviewFormChange('bloodPressure', e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">Heart Rate</label>
                    <input
                      value={reviewForm.heartRate}
                      onChange={(e) => handleReviewFormChange('heartRate', e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">SpO2</label>
                    <input
                      value={reviewForm.spO2}
                      onChange={(e) => handleReviewFormChange('spO2', e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">Temperature</label>
                    <input
                      value={reviewForm.temperature}
                      onChange={(e) => handleReviewFormChange('temperature', e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-500">AI Summary</label>
                    <textarea
                      rows="2"
                      value={reviewForm.aiExplanation}
                      onChange={(e) => handleReviewFormChange('aiExplanation', e.target.value)}
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-slate-950"
                    >
                      Save Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {currentPage === 'dashboard-home' && activeView === 'report' && currentPatient && (
            <>
              <header className="border-b border-slate-800/80 bg-[#0b1220] px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">Report</p>
                    <h1 className="mt-1 text-2xl font-semibold text-white">Patient Insight</h1>
                  </div>
                  <button
                    onClick={returnToDashboard}
                    className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    ← Back to dashboard
                  </button>
                </div>
              </header>
              <ReportDetails patient={currentPatient} onBack={returnToDashboard} />
            </>
          )}

          {currentPage === 'patient-records' && <PatientRecords />}
        </main>
      </div>
    </div>
  )
}

export default App
