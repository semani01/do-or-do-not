import { Mission } from '../types'

interface MissionItemProps {
  mission: Mission
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (mission: Mission) => void
}

export default function MissionItem({ mission, onToggle, onDelete, onEdit }: MissionItemProps) {
  const sideEmoji = {
    Rebel: '⭐',
    Empire: '🖤',
    Neutral: '🔵'
  }

  const priorityEmoji = {
    Padawan: '⚔️',
    Jedi: '🗡️',
    Master: '⚛️'
  }

  const itemClass = `mission-item side-${mission.side.toLowerCase()}${mission.completed ? ' completed' : ''}`
  const sideBadgeClass = `badge badge-side badge-side-${mission.side.toLowerCase()}`
  const priorityBadgeClass = `badge badge-priority`

  return (
    <div className={itemClass}>
      <input
        type="checkbox"
        checked={mission.completed}
        onChange={() => onToggle(mission.id)}
        className="mission-checkbox"
      />

      <span className="mission-title">{mission.title}</span>

      <div className="mission-badges">
        <span className={sideBadgeClass}>
          {sideEmoji[mission.side]} {mission.side}
        </span>
        <span className={priorityBadgeClass}>
          {priorityEmoji[mission.priority]} {mission.priority}
        </span>
      </div>

      <div className="mission-actions">
        <button
          onClick={() => onEdit(mission)}
          className="btn-edit"
          title="Edit mission"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(mission.id)}
          className="btn-delete"
          title="Delete mission"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
