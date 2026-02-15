import { useState, useEffect, FormEvent } from 'react'
import { Mission, Side, Priority } from '../types'

interface MissionFormProps {
  onSubmit: (title: string, side: Side, priority: Priority) => void
  editingMission: Mission | null
  onCancelEdit: () => void
}

export default function MissionForm({ onSubmit, editingMission, onCancelEdit }: MissionFormProps) {
  const [title, setTitle] = useState('')
  const [side, setSide] = useState<Side>('Neutral')
  const [priority, setPriority] = useState<Priority>('Padawan')

  // Pre-fill form when editing
  useEffect(() => {
    if (editingMission) {
      setTitle(editingMission.title)
      setSide(editingMission.side)
      setPriority(editingMission.priority)
    } else {
      // Reset to defaults when not editing
      setTitle('')
      setSide('Neutral')
      setPriority('Padawan')
    }
  }, [editingMission])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (title.trim() === '') return

    onSubmit(title.trim(), side, priority)

    // Reset form after submit
    setTitle('')
    setSide('Neutral')
    setPriority('Padawan')
  }

  const handleCancel = () => {
    onCancelEdit()
    setTitle('')
    setSide('Neutral')
    setPriority('Padawan')
  }

  return (
    <form className="mission-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter mission briefing..."
        className="mission-input"
      />

      <div className="form-selects">
        <select
          value={side}
          onChange={(e) => setSide(e.target.value as Side)}
          className="form-select"
        >
          <option value="Rebel">⭐ Rebel</option>
          <option value="Empire">🖤 Empire</option>
          <option value="Neutral">🔵 Neutral</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="form-select"
        >
          <option value="Padawan">⚔️ Padawan</option>
          <option value="Jedi">🗡️ Jedi</option>
          <option value="Master">⚛️ Master</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {editingMission ? 'Update Mission' : 'Add Mission'}
        </button>
        {editingMission && (
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
