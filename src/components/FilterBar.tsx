import type { Filter } from '../types'

interface FilterBarProps {
  current: Filter
  onChange: (filter: Filter) => void
}

export default function FilterBar({ current, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <button
        className={current === 'all' ? 'active' : ''}
        onClick={() => onChange('all')}
      >
        All Missions
      </button>
      <button
        className={current === 'active' ? 'active' : ''}
        onClick={() => onChange('active')}
      >
        Active
      </button>
      <button
        className={current === 'completed' ? 'active' : ''}
        onClick={() => onChange('completed')}
      >
        Completed
      </button>
    </div>
  )
}
