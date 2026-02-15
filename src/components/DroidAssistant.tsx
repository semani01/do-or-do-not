import { useState, FormEvent } from 'react'
import type { Side, Priority } from '../types'

interface DroidAssistantProps {
  onAdd: (title: string, side: Side, priority: Priority) => void
}

export default function DroidAssistant({ onAdd }: DroidAssistantProps) {
  const [input, setInput] = useState('')

  const parseInput = (text: string): { title: string; side: Side; priority: Priority } => {
    let side: Side = 'Neutral'
    let priority: Priority = 'Padawan'
    let title = text

    // Check if there's a colon separator
    const colonIndex = text.indexOf(':')

    if (colonIndex !== -1) {
      const prefix = text.substring(0, colonIndex).trim()
      title = text.substring(colonIndex + 1).trim()

      // Parse side (case-insensitive)
      const lowerPrefix = prefix.toLowerCase()
      if (lowerPrefix.includes('rebel')) side = 'Rebel'
      else if (lowerPrefix.includes('empire')) side = 'Empire'
      else if (lowerPrefix.includes('neutral')) side = 'Neutral'

      // Parse priority (case-insensitive)
      if (lowerPrefix.includes('padawan')) priority = 'Padawan'
      else if (lowerPrefix.includes('jedi')) priority = 'Jedi'
      else if (lowerPrefix.includes('master')) priority = 'Master'
    }

    return { title, side, priority }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (input.trim() === '') return

    const { title, side, priority } = parseInput(input)

    if (title.trim() === '') return

    onAdd(title, side, priority)
    setInput('')
  }

  return (
    <form className="droid-assistant" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="🤖 Droid Assistant: Quick add (e.g., 'Rebel Master: Fix hyperdrive')"
        className="droid-input"
      />
    </form>
  )
}
