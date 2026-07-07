import React, { useState, useEffect } from 'react'
import AdminDashboard from './components/AdminDashboard'
import DoctorDashboard from './components/DoctorDashboard'
import PatientHistory from './components/PatientRecords'
import ReportDetails from './components/ReportDetails'
import Login from './components/Login'

// 🌐 Backend API Base URL
const API_BASE_URL = 'https://medibridge-production-9011.up.railway.app'

function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Navigation & View States
  const [currentView, setCurrentView] = useState('admin')
  const [selectedPatientId, setSelectedPatientId] = useState(null)
  const [selectedReportId, setSelectedReportId] = useState(null)
  
  // Data States
  const [reports, setReports] = useState([])
  const [historyData, setHistoryData] = useState([])
  const [singleReport, setSingleReport] = useState(null)
  const [assignedPatients, setAssignedPatients] = useState([])
  
  // UX Feedback States
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // 🔍 Search and Filtering States
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [sortOrder, setSortOrder] = useState('LATEST')
  const [showAllActivity, setShowAllActivity] = useState(false)

  // 🔄 Fetch Main Dashboard Reports
  useEffect(() => {
    if (!isAuthenticated) return // Only fetch data if user is logged in
    
    const fetchInitialDashboardData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE_URL}/reports`)
        if (!response.ok) throw new Error('Could not synchronize database assets.')
        const data = await response.json()
        setReports(Array.isArray(data) ? data : [])
        setAssignedPatients(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message || 'Unable to load reports.')
      } finally {
      setIsLoading(false)
    }
    
    }
    fetchInitialDashboardData()
    }, [isAuthenticated, currentView])

  const handleLoadPatientHistory = async (patientId) => {
    setSelectedPatientId(patientId)
    setIsLoading(true)
    setError(null)
    setCurrentView('history')
    try {
      const response = await fetch(`${API_BASE_URL}/patients/${patientId}/history`)
      const data = await response.json()
      setHistoryData(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Unable to load timeline.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadReportDetails = async (reportId) => {
    setSelectedReportId(reportId)
    setIsLoading(true)
    setError(null)
    setCurrentView('details')
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${reportId}`)
      const data = await response.json()
      setSingleReport(data)
    } catch (err) {
      setError('Unable to load report.')
    } finally {
      setIsLoading(false)
    }
  }

  const processedReports = reports
    .filter((item) => {
      if (!item) return false
      const matchesSearch = (item.title || '').toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = categoryFilter === 'ALL' || item.category?.toUpperCase() === categoryFilter.toUpperCase()
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at || 0)
      const dateB = new Date(b.created_at || 0)
      return sortOrder === 'LATEST' ? dateB - dateA : dateA - dateB
    })

  return (
    <>
      {!isAuthenticated ? (
        <Login onLogin={setIsAuthenticated} />
      ) : (
        <div className="min-h-screen bg-[#070d19] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white">
          <header className="sticky top-0 z-50 border-b border-slate-900 bg-[#070d19]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-cyan-950/40">M</div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-white">MediBridge</h1>
                <p className="text-[10px] font-medium font-mono text-cyan-400 tracking-wider uppercase">AI Clinical Node</p>
              </div>
            </div>
            <nav className="flex items-center bg-slate-950/60 p-1 rounded-xl border border-slate-900 gap-1">
              <button onClick={() => setCurrentView('admin')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${currentView === 'admin' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}>Admin Dashboard</button>
              <button onClick={() => setCurrentView('doctor')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${currentView === 'doctor' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}>Doctor Care</button>
            </nav>
          </header>

          {(currentView === 'admin' || currentView === 'doctor') && (
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
              <div className="p-4 rounded-2xl border border-slate-900 bg-slate-900/20 flex flex-col md:flex-row gap-4 items-center justify-between">
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-72 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white" />
                <div className="flex gap-3">
                  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
                    <option value="ALL">All Categories</option>
                    <option value="LAB_REPORT">🩸 Lab Reports</option>
                    <option value="PRESCRIPTION">💊 Prescriptions</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          <main className="pb-12">
            {!isLoading && !error && (
              <>
                {currentView === 'admin' && <AdminDashboard patients={processedReports} onOpenReport={handleLoadReportDetails} />}
                {currentView === 'doctor' && <DoctorDashboard assignedPatients={processedReports} onViewPatientHistory={handleLoadPatientHistory} onViewReportDetails={handleLoadReportDetails} />}
                {currentView === 'history' && <PatientHistory patientId={selectedPatientId} historyData={historyData} onSelectReport={handleLoadReportDetails} onBack={() => setCurrentView('doctor')} />}
                {currentView === 'details' && <ReportDetails reportData={singleReport} onBack={() => setCurrentView(selectedPatientId ? 'history' : 'admin')} />}
              </>
            )}
          </main>
        </div>
      )}
    </>
  )
}

export default App
