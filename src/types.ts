// Type definitions for Star Wars Mission Tracker

// Side/Faction types
export type Side = 'Rebel' | 'Empire' | 'Neutral'

// Priority levels
export type Priority = 'Padawan' | 'Jedi' | 'Master'

// Theme modes
export type ThemeMode = 'light' | 'dark'

// Filter types for mission list
export type Filter = 'all' | 'active' | 'completed'

// Mission interface
export interface Mission {
  id: string
  title: string
  side: Side
  priority: Priority
  completed: boolean
  createdAt: number
}
