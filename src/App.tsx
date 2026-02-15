import { useState, useEffect } from 'react'
import './App.css'
import type { Mission, Filter, ThemeMode, Side, Priority } from './types'
import MissionList from './components/MissionList'
import MissionForm from './components/MissionForm'
import FilterBar from './components/FilterBar'
import DroidAssistant from './components/DroidAssistant'
import ThemeToggle from './components/ThemeToggle'
import CompletionToast from './components/CompletionToast'

function App() {
  // State
  const [missions, setMissions] = useState<Mission[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [editingMission, setEditingMission] = useState<Mission | null>(null)
  const [completionMessage, setCompletionMessage] = useState<string | null>(null)
  const [completedMissionSide, setCompletedMissionSide] = useState<Side>('Neutral')
  const [isAnimating, setIsAnimating] = useState(false)

  // Load missions from localStorage on mount
  useEffect(() => {
    const savedMissions = localStorage.getItem('sw-missions')
    if (savedMissions) {
      try {
        setMissions(JSON.parse(savedMissions))
      } catch (error) {
        console.error('Failed to load missions:', error)
      }
    }
  }, [])

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('sw-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
    }
  }, [])

  // Save missions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sw-missions', JSON.stringify(missions))
  }, [missions])

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sw-theme', theme)
  }, [theme])

  // Apply theme to HTML element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // CRUD Handlers
  const addMission = (title: string, side: Side, priority: Priority) => {
    const newMission: Mission = {
      id: crypto.randomUUID(),
      title,
      side,
      priority,
      completed: false,
      createdAt: Date.now()
    }
    setMissions([...missions, newMission])
  }

  const updateMission = (title: string, side: Side, priority: Priority) => {
    if (!editingMission) return

    setMissions(
      missions.map((mission) =>
        mission.id === editingMission.id
          ? { ...mission, title, side, priority }
          : mission
      )
    )
    setEditingMission(null)
  }

  const deleteMission = (id: string) => {
    setMissions(missions.filter((mission) => mission.id !== id))
  }

  const toggleMission = (id: string) => {
    const mission = missions.find((m) => m.id === id)
    if (!mission) return

    const updatedMissions = missions.map((m) =>
      m.id === id ? { ...m, completed: !m.completed } : m
    )
    setMissions(updatedMissions)

    // Show completion toast if mission is now completed
    if (!mission.completed) {
      const messages = {
        Rebel: 'Mission accomplished, Commander.',
        Empire: 'The Emperor will be pleased.',
        Neutral: 'Another job done, no questions asked.'
      }
      setCompletedMissionSide(mission.side)
      setCompletionMessage(messages[mission.side])

      // Auto-dismiss toast after 2 seconds
      setTimeout(() => {
        setCompletionMessage(null)
      }, 2000)
    }
  }

  // Theme toggle with hyperspace animation
  const toggleTheme = () => {
    setIsAnimating(true)

    // Switch theme after animation starts (1.5s duration)
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
      setIsAnimating(false)
    }, 1500)
  }

  // Editing handlers
  const startEdit = (mission: Mission) => {
    setEditingMission(mission)
  }

  const cancelEdit = () => {
    setEditingMission(null)
  }

  // Filter missions
  const filteredMissions = missions.filter((mission) => {
    if (filter === 'active') return !mission.completed
    if (filter === 'completed') return mission.completed
    return true // 'all'
  })

  // Count active missions
  const activeMissionCount = missions.filter((m) => !m.completed).length

  return (
    <div className="app">
      <header>
        <h1 className="app-title">STAR WARS</h1>
        <p className="app-subtitle">Mission Tracker</p>
        <ThemeToggle theme={theme} onToggle={toggleTheme} isAnimating={isAnimating} />
      </header>

      <DroidAssistant onAdd={addMission} />

      <MissionForm
        onSubmit={editingMission ? updateMission : addMission}
        editingMission={editingMission}
        onCancelEdit={cancelEdit}
      />

      <FilterBar current={filter} onChange={setFilter} />

      <MissionList
        missions={filteredMissions}
        onToggle={toggleMission}
        onDelete={deleteMission}
        onEdit={startEdit}
      />

      <footer>
        <p>{activeMissionCount} mission{activeMissionCount !== 1 ? 's' : ''} remaining</p>
      </footer>

      <CompletionToast message={completionMessage} side={completedMissionSide} />
    </div>
  )
}

export default App
