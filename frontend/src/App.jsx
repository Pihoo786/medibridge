import React, { useState, useEffect } from 'react'
import AdminDashboard from './components/AdminDashboard'
import DoctorDashboard from './components/DoctorDashboard'
import PatientHistory from './components/PatientRecords'
import ReportDetails from './components/ReportDetails'

// 🌐 Backend API Base URL from manager instructions
const API_BASE_URL = 'https://medibridge-production-9011.up.railway.app'

function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState('admin') // 'admin', 'doctor', 'history', 'details'
  const [selectedPatientId, setSelectedPatientId] = useState(null)
  const [selectedReportId, setSelectedReportId] = useState(null)
  
  // Data States
  const [reports, setReports] = useState([])
  const [historyData, setHistoryData] = useState([])
  const [singleReport, setSingleReport] = useState(null)
  const [assignedPatients, setAssignedPatients] = useState([])
  
  // UX Feedback States (Spinners & Error States)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // 🔍 Search and Filtering States
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [sortOrder, setSortOrder] = useState('LATEST')

  // Global Activity Toggle state for child view defaults
  const [showAllActivity, setShowAllActivity] = useState(false)

  // 🔄 Fetch Main Dashboard Reports
  useEffect(() => {
    const fetchInitialDashboardData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE_URL}/reports`)
        if (!response.ok) throw new Error('Could not synchronize database assets.')
        const data = await response.json()
        setReports(Array.isArray(data) ? data : [])
        
        // Populate doctor dashboard with existing records dynamically
        setAssignedPatients(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message || 'Unable to load reports. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchInitialDashboardData()
  }, [currentView])

  // 🔄 Fetch Isolated Patient History Timeline
  const handleLoadPatientHistory = async (patientId) => {
    setSelectedPatientId(patientId)
    setIsLoading(true)
    setError(null)
    setCurrentView('history')
    try {
      const response = await fetch(`${API_BASE_URL}/patients/${patientId}/history`)
      if (!response.ok) throw new Error('Timeline acquisition rejected.')
      const data = await response.json()
      setHistoryData(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Unable to load timeline history cards.')
    } finally {
      setIsLoading(false)
    }
  }

  // 🔄 Fetch Focused Document Report Details
  const handleLoadReportDetails = async (reportId) => {
    setSelectedReportId(reportId)
    setIsLoading(true)
    setError(null)
    setCurrentView('details')
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${reportId}`)
      if (!response.ok) throw new Error('Document details parsing unfulfilled.')
      const data = await response.json()
      setSingleReport(data)
    } catch (err) {
      setError('Unable to load report parameters.')
    } finally {
      setIsLoading(false)
    }
  }

  // 🧮 Data Engine Processing: Search, Filter, and Sort Calculations
  const processedReports = reports
    .filter((item) => {
      if (!item) return false
      const matchesSearch = 
        (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.summary || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.user_id || '').toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesFilter = categoryFilter === 'ALL' || item.category?.toUpperCase() === categoryFilter.toUpperCase()
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at || 0)
      const dateB = new Date(b.created_at || 0)
      return sortOrder === 'LATEST' ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* 🚀 Global Control Header bar */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-[#070d19]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-cyan-950/40">
            M
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">MediBridge</h1>
            <p className="text-[10px] font-medium font-mono text-cyan-400 tracking-wider uppercase">AI Clinical Node</p>
          </div>
        </div>

        {/* Global Nav Toggle Buttons */}
        <nav className="flex items-center bg-slate-950/60 p-1 rounded-xl border border-slate-900 gap-1">
          <button
            onClick={() => setCurrentView('admin')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${currentView === 'admin' ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/15' : 'text-slate-400 hover:text-white'}`}
          >
            Admin Dashboard
          </button>
          <button
            onClick={() => setCurrentView('doctor')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${currentView === 'doctor' ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/15' : 'text-slate-400 hover:text-white'}`}
          >
            Doctor Care
          </button>
        </nav>
      </header>

      {/* 🔍 Search and Filters Widget (Hidden in standalone secondary pages) */}
      {(currentView === 'admin' || currentView === 'doctor') && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <div className="p-4 rounded-2xl border border-slate-900 bg-slate-900/20 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
            {/* Search Input field */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search by patient, title, or summary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition"
              />
            </div>

            {/* Categorical filters & sorting selectors */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/40 cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                <option value="LAB_REPORT">🩸 Lab Reports</option>
                <option value="PRESCRIPTION">💊 Prescriptions</option>
                <option value="SYMPTOM_MESSAGE">🤒 Symptoms</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/40 cursor-pointer"
              >
                <option value="LATEST">Sort: Latest Entries</option>
                <option value="OLDEST">Sort: Oldest Entries</option>
              </select>
            </div>
          </div>
        </section>
      )}

      {/* 🎛️ Display Router State Layout */}
      <main className="pb-12">
        {isLoading && !processedReports.length && (
          <div className="flex h-64 flex-col items-center justify-center space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
            <p className="text-xs text-slate-500 tracking-wide animate-pulse">Synchronizing clinical telemetry data...</p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto mt-12 p-5 border border-red-500/20 bg-red-500/5 rounded-2xl text-center">
            <p className="text-sm font-medium text-red-400">⚠️ {error}</p>
            <p className="text-xs text-slate-500 mt-1">Please re-verify network endpoint vectors.</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {currentView === 'admin' && (
              <AdminDashboard
                patients={processedReports}
                showAllActivity={showAllActivity}
                onToggleViewAll={() => setShowAllActivity(!showAllActivity)}
                onOpenReport={handleLoadReportDetails}
                onSeeAll={() => setCurrentView('doctor')}
              />
            )}

            {currentView === 'doctor' && (
              <DoctorDashboard
                assignedPatients={processedReports}
                onViewPatientHistory={handleLoadPatientHistory}
                onViewReportDetails={handleLoadReportDetails}
              />
            )}

            {currentView === 'history' && (
              <PatientHistory
                patientId={selectedPatientId}
                historyData={historyData}
                onSelectReport={handleLoadReportDetails}
                onBack={() => setCurrentView('doctor')}
              />
            )}

            {currentView === 'details' && (
              <ReportDetails
                reportData={singleReport}
                onBack={() => setCurrentView(selectedPatientId ? 'history' : 'admin')}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App