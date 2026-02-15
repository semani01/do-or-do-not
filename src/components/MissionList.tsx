import type { Mission } from '../types'
import MissionItem from './MissionItem'

interface MissionListProps {
  missions: Mission[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (mission: Mission) => void
}

export default function MissionList({ missions, onToggle, onDelete, onEdit }: MissionListProps) {
  if (missions.length === 0) {
    return (
      <div className="empty-state">
        <p>No missions in the queue, Commander.</p>
      </div>
    )
  }

  return (
    <div className="mission-list">
      {missions.map((mission) => (
        <MissionItem
          key={mission.id}
          mission={mission}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
