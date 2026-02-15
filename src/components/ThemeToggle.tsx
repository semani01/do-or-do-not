import type { ThemeMode } from '../types'

interface ThemeToggleProps {
  theme: ThemeMode
  onToggle: () => void
  isAnimating: boolean
}

export default function ThemeToggle({ theme, onToggle, isAnimating }: ThemeToggleProps) {
  return (
    <>
      <button onClick={onToggle} className="theme-toggle">
        {theme === 'dark' ? '🌙 Dark Side' : '☀️ Light Side'}
      </button>

      {isAnimating && <div className="hyperspace-overlay" />}
    </>
  )
}
