# Star Wars Mission Tracker - Phase Task Breakdown

## Overview
This document outlines all implementation phases and detailed tasks for building the Star Wars Mission Tracker from scratch.

**Total Tasks:** 12 tasks across 6 phases
**Estimated Total Code:** ~1,150 lines across 13 files

---

## Phase 1: Setup & Scaffold

### Task #1: Clean scaffold and setup Vite project

#### 1.1 Prepare Clean Slate
- [ ] Delete all existing source files in `src/` directory
- [ ] Remove any default Vite boilerplate files we don't need
- [ ] Keep project configuration files (package.json, vite.config.ts, tsconfig files, .gitignore)

#### 1.2 Initialize Fresh Vite + React + TypeScript
- [ ] Run `npm create vite@latest . -- --template react-ts`
- [ ] Run `npm install` to install dependencies
- [ ] Verify Vite setup is correct

#### 1.3 Clean Boilerplate
- [ ] Remove default Vite logos and assets (public/vite.svg, src/assets/)
- [ ] Clear out default `App.tsx` content
- [ ] Remove `App.css` default styles (will rebuild from scratch)
- [ ] Remove any unnecessary SVG files or default components

#### 1.4 Update Entry Files
- [ ] **index.html**: Change `<title>` to "Star Wars Mission Tracker"
- [ ] **src/index.css**: Replace with basic CSS reset:
  ```css
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
  }
  ```
- [ ] **src/main.tsx**: Keep standard Vite entry (likely no changes needed)

#### 1.5 Verify Git Setup
- [ ] Confirm on `feat/scaffold` branch
- [ ] Verify remote connected to `https://github.com/semani01/star-wars-tasks.git`
- [ ] Check clean working state

#### 1.6 Create Project Structure
- [ ] Create `src/components/` directory

**Deliverable:** Clean Vite + React + TypeScript project with proper structure

---

## Phase 2: Type System

### Task #2: Create TypeScript type definitions

#### 2.1 Create types.ts File
- [ ] Create `src/types.ts`

#### 2.2 Define Enums/Unions
- [ ] `Side` type: 'Rebel' | 'Empire' | 'Neutral'
- [ ] `Priority` type: 'Padawan' | 'Jedi' | 'Master'
- [ ] `ThemeMode` type: 'light' | 'dark'
- [ ] `Filter` type: 'all' | 'active' | 'completed'

#### 2.3 Define Mission Interface
```typescript
export interface Mission {
  id: string
  title: string
  side: Side
  priority: Priority
  completed: boolean
  createdAt: number
}
```

**Deliverable:** Complete type definitions file (~50 lines)

---

## Phase 3: Component Development (Bottom-Up)

### Task #3: Build CompletionToast component

#### 3.1 Create Component File
- [ ] Create `src/components/CompletionToast.tsx`

#### 3.2 Component Structure
- [ ] Props interface: `{ message: string | null; side: Side }`
- [ ] Conditional rendering (only show if message exists)
- [ ] Side-specific CSS classes: `.toast-rebel`, `.toast-empire`, `.toast-neutral`
- [ ] Position: fixed, bottom-right
- [ ] Auto-dismiss after 2 seconds (useEffect cleanup)

#### 3.3 Side-Specific Messages
- [ ] Rebel: "Mission accomplished, Commander."
- [ ] Empire: "The Emperor will be pleased."
- [ ] Neutral: "Another job done, no questions asked."

**Deliverable:** CompletionToast.tsx (~30 lines)

---

### Task #4: Build FilterBar component

#### 4.1 Create Component File
- [ ] Create `src/components/FilterBar.tsx`

#### 4.2 Component Structure
- [ ] Props interface: `{ current: Filter; onChange: (filter: Filter) => void }`
- [ ] Three buttons: "All Missions", "Active", "Completed"
- [ ] Apply `.active` class to current filter button
- [ ] onClick handlers call `onChange` with respective filter

**Deliverable:** FilterBar.tsx (~30 lines)

---

### Task #5: Build MissionItem component

#### 5.1 Create Component File
- [ ] Create `src/components/MissionItem.tsx`

#### 5.2 Component Structure
- [ ] Props interface: `{ mission: Mission; onToggle: (id: string) => void; onDelete: (id: string) => void; onEdit: (mission: Mission) => void }`
- [ ] Checkbox input (controlled by `mission.completed`)
- [ ] Mission title text
- [ ] Side badge with emoji (Rebel ⭐ / Empire 🖤 / Neutral 🔵)
- [ ] Priority badge with emoji (Padawan ⚔️ / Jedi 🗡️ / Master ⚛️)
- [ ] Edit button (✏️)
- [ ] Delete button (🗑️)

#### 5.3 Styling Classes
- [ ] Apply `.completed` class when `mission.completed` is true
- [ ] Apply faction class: `.side-rebel`, `.side-empire`, or `.side-neutral`
- [ ] Badge classes: `.badge-side-rebel`, `.badge-side-empire`, `.badge-side-neutral`

**Deliverable:** MissionItem.tsx (~70 lines)

---

### Task #6: Build MissionList component

#### 6.1 Create Component File
- [ ] Create `src/components/MissionList.tsx`

#### 6.2 Component Structure
- [ ] Props interface: `{ missions: Mission[]; onToggle: (id: string) => void; onDelete: (id: string) => void; onEdit: (mission: Mission) => void }`
- [ ] Map `missions` array to `<MissionItem>` components
- [ ] Pass through all handlers to MissionItem

#### 6.3 Empty State
- [ ] Show "No missions in the queue, Commander." when `missions.length === 0`

**Deliverable:** MissionList.tsx (~40 lines)

---

### Task #7: Build MissionForm component

#### 7.1 Create Component File
- [ ] Create `src/components/MissionForm.tsx`

#### 7.2 Component Structure
- [ ] Props interface: `{ onSubmit: (title: string, side: Side, priority: Priority) => void; editingMission: Mission | null; onCancelEdit: () => void }`
- [ ] Local state: `title`, `side`, `priority`
- [ ] Text input with placeholder "Enter mission briefing..."
- [ ] Side dropdown: Rebel ⭐ / Empire 🖤 / Neutral 🔵
- [ ] Priority dropdown: Padawan ⚔️ / Jedi 🗡️ / Master ⚛️
- [ ] Submit button text changes: "Add Mission" vs "Update Mission"
- [ ] Cancel button (only visible when `editingMission` is not null)

#### 7.3 Form Logic
- [ ] Pre-fill fields when `editingMission` changes (useEffect)
- [ ] Reset to defaults (Neutral, Padawan) after submit
- [ ] Clear input after submit
- [ ] Prevent submit if title is empty
- [ ] Cancel button calls `onCancelEdit` and resets form

**Deliverable:** MissionForm.tsx (~100 lines)

---

### Task #8: Build DroidAssistant component

#### 8.1 Create Component File
- [ ] Create `src/components/DroidAssistant.tsx`

#### 8.2 Component Structure
- [ ] Props interface: `{ onAdd: (title: string, side: Side, priority: Priority) => void }`
- [ ] Single text input with placeholder: "🤖 Droid Assistant: Quick add (e.g., 'Rebel Master: Fix hyperdrive')"
- [ ] Local state: `input`

#### 8.3 Parsing Logic
- [ ] Split on first `:` character
- [ ] Parse prefix (before `:`) for keywords (case-insensitive):
  - Side: "Rebel", "Empire", "Neutral"
  - Priority: "Padawan", "Jedi", "Master"
- [ ] Text after `:` becomes title (or full text if no `:`)
- [ ] Defaults: Neutral side, Padawan priority

#### 8.4 Test Cases
- [ ] "Rebel Master: Fix hyperdrive" → Rebel, Master, "Fix hyperdrive"
- [ ] "Empire: Patrol sector" → Empire, Padawan, "Patrol sector"
- [ ] "Jedi: Meditate" → Neutral, Jedi, "Meditate"
- [ ] "Buy crystals" → Neutral, Padawan, "Buy crystals"

#### 8.5 Submit Handling
- [ ] Call `onAdd(title, side, priority)` with parsed values
- [ ] Clear input after submit
- [ ] Prevent submit if input is empty

**Deliverable:** DroidAssistant.tsx (~80 lines)

---

### Task #9: Build ThemeToggle component

#### 9.1 Create Component File
- [ ] Create `src/components/ThemeToggle.tsx`

#### 9.2 Component Structure
- [ ] Props interface: `{ theme: ThemeMode; onToggle: () => void; isAnimating: boolean }`
- [ ] Toggle button showing current theme:
  - Light theme: "☀️ Light Side"
  - Dark theme: "🌙 Dark Side"
- [ ] onClick calls `onToggle()`

#### 9.3 Hyperspace Animation Overlay
- [ ] Conditionally render full-screen overlay when `isAnimating` is true
- [ ] Overlay div with className `.hyperspace-overlay`
- [ ] Position: fixed, full viewport (100vw × 100vh)
- [ ] z-index: 9999
- [ ] pointer-events: none

**Deliverable:** ThemeToggle.tsx (~50 lines)

---

## Phase 4: Main Application Logic

### Task #10: Build App.tsx with state management

#### 10.1 Create App Component File
- [ ] Clear existing `src/App.tsx`
- [ ] Import all components and types

#### 10.2 State Management
- [ ] `missions: Mission[]` - initialize from localStorage
- [ ] `filter: Filter` - default 'all'
- [ ] `theme: ThemeMode` - initialize from localStorage, default 'dark'
- [ ] `editingMission: Mission | null` - default null
- [ ] `completionMessage: string | null` - default null
- [ ] `isAnimating: boolean` - default false

#### 10.3 localStorage Integration
- [ ] `useEffect` to load missions from `sw-missions` on mount
- [ ] `useEffect` to load theme from `sw-theme` on mount
- [ ] `useEffect` to save missions to localStorage whenever `missions` changes
- [ ] `useEffect` to save theme to localStorage whenever `theme` changes

#### 10.4 Theme Application
- [ ] `useEffect` to set `data-theme` attribute on `<html>` element
- [ ] Should run on mount and whenever `theme` changes

#### 10.5 CRUD Handlers
- [ ] `addMission(title, side, priority)`:
  - Create new mission with `crypto.randomUUID()`
  - Set `completed: false`, `createdAt: Date.now()`
  - Add to missions array
- [ ] `updateMission(id, title, side, priority)`:
  - Find mission by id
  - Update title, side, priority
  - Replace in missions array
  - Clear `editingMission`
- [ ] `deleteMission(id)`:
  - Filter out mission by id
  - Update missions array
- [ ] `toggleMission(id)`:
  - Find mission by id
  - Toggle `completed` status
  - If now completed, trigger completion toast
  - Update missions array

#### 10.6 Completion Toast Logic
- [ ] When mission completed, set `completionMessage` based on side
- [ ] Use `setTimeout` to clear message after 2 seconds
- [ ] Pass `completionMessage` and completed mission's `side` to `<CompletionToast>`

#### 10.7 Theme Toggle Handler
- [ ] `toggleTheme()`:
  - Set `isAnimating` to true
  - Use `setTimeout` to switch theme after 1.5s (animation duration)
  - Set `isAnimating` back to false after theme switch

#### 10.8 Editing Handlers
- [ ] `startEdit(mission)`: Set `editingMission` to mission
- [ ] `cancelEdit()`: Set `editingMission` to null

#### 10.9 Filtering Logic
- [ ] Filter missions array based on current filter:
  - 'all': show all missions
  - 'active': show only missions where `completed === false`
  - 'completed': show only missions where `completed === true`

#### 10.10 JSX Structure
```jsx
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
    <p>{activeMissionCount} missions remaining</p>
  </footer>

  <CompletionToast message={completionMessage} side={completedMissionSide} />
</div>
```

**Deliverable:** App.tsx (~200 lines)

---

## Phase 5: Styling

### Task #11: Style everything in App.css

#### 11.1 Global Styles
- [ ] CSS reset (*, body)
- [ ] Font family: 'Courier New', Courier, monospace
- [ ] Smooth transitions for background and color

#### 11.2 Theme Variables
- [ ] `[data-theme="dark"]` CSS variables:
  - --bg-primary: #0d1117
  - --bg-secondary: #161b22
  - --text-primary: #e6edf3
  - --text-secondary: #8b949e
  - --border-color: #30363d
  - --accent-primary: #dc143c (crimson)
  - --accent-glow: rgba(220, 20, 60, 0.5)
  - --cursor-color: #dc143c (red lightsaber)

- [ ] `[data-theme="light"]` CSS variables:
  - --bg-primary: #f6f8fa
  - --bg-secondary: #ffffff
  - --text-primary: #24292f
  - --text-secondary: #57606a
  - --border-color: #d0d7de
  - --accent-primary: #0969da (blue)
  - --accent-glow: rgba(9, 105, 218, 0.5)
  - --cursor-color: #0969da (blue lightsaber)

- [ ] Apply variables to body: background, color

#### 11.3 Lightsaber Cursor
- [ ] `[data-theme="dark"]` red lightsaber cursor (SVG data URI)
- [ ] `[data-theme="light"]` blue lightsaber cursor (SVG data URI)
- [ ] Apply to body element

#### 11.4 App Layout Styles
- [ ] `.app`: max-width 700px, centered, padding
- [ ] `.app-title`: large centered text, letter-spacing, text-shadow glow
- [ ] `.app-subtitle`: smaller centered text, secondary color

#### 11.5 Component Styles

##### MissionForm
- [ ] Form container: flex column, gap, padding, border, border-radius
- [ ] Input/select: full width, padding, background, border, focus glow effect
- [ ] Button group: flex row, gap
- [ ] Submit/cancel buttons: padding, background, hover effects

##### FilterBar
- [ ] Container: flex row, gap, justify-center
- [ ] Buttons: pill-shaped, padding, border
- [ ] `.active` class: highlighted with accent color

##### MissionList
- [ ] Container: flex column, gap
- [ ] Empty state: centered, secondary color

##### MissionItem
- [ ] Container: flex row, align-center, padding, border, border-radius
- [ ] Checkbox: custom styling
- [ ] Title: flex-grow
- [ ] Badge container: flex row, gap
- [ ] Badges: small pills with faction colors
- [ ] Action buttons: icon buttons, hover effects
- [ ] `.completed` class: strikethrough, opacity reduction
- [ ] Faction border classes:
  - `.side-rebel`: border-color #f0a030 (orange)
  - `.side-empire`: border-color #dc143c (red)
  - `.side-neutral`: border-color #6090c0 (blue)

##### DroidAssistant
- [ ] Input: full width, padding, background, placeholder color
- [ ] Robot emoji styling

##### ThemeToggle
- [ ] Button: positioned top-right, padding, background, border
- [ ] Hover glow effect

##### CompletionToast
- [ ] Container: fixed position (bottom 2rem, right 2rem)
- [ ] Padding, border-radius, box-shadow
- [ ] Faction-specific backgrounds:
  - `.toast-rebel`: #f0a030 (orange), black text
  - `.toast-empire`: #dc143c (red), white text
  - `.toast-neutral`: #6090c0 (blue), white text
- [ ] Slide-in animation
- [ ] Fade-out animation

#### 11.6 Hyperspace Animation
- [ ] `.hyperspace-overlay`:
  - position: fixed, full viewport
  - z-index: 9999
  - pointer-events: none
  - animation: hyperspace 1.5s ease-in-out forwards

- [ ] `@keyframes hyperspace`:
  ```css
  0% {
    background: radial-gradient(circle at 50% 50%, transparent 10%, #000 100%);
    opacity: 1;
  }
  30% {
    background: repeating-radial-gradient(...);
    opacity: 1;
  }
  70% {
    background: repeating-radial-gradient(...);
    transform: scale(1.8);
    opacity: 1;
  }
  100% {
    background: radial-gradient(...);
    transform: scale(2.5);
    opacity: 0;
  }
  ```

#### 11.7 Toast Animations
- [ ] `@keyframes toast-slide-in`:
  - from: translateX(400px), opacity 0
  - to: translateX(0), opacity 1

- [ ] `@keyframes toast-fade-out`:
  - to: opacity 0, translateY(20px)

#### 11.8 Responsive Design
- [ ] `@media (max-width: 640px)`:
  - Reduce app padding
  - Smaller title font-size
  - Stack form selects vertically
  - Wrap mission badges
  - Full-width toast on mobile

#### 11.9 Polish
- [ ] All interactive elements: smooth transitions (0.2s)
- [ ] Glow effects on focus/hover using box-shadow with --accent-glow
- [ ] Consistent spacing using rem units

**Deliverable:** App.css (~400 lines)

---

## Phase 6: Testing & Polish

### Task #12: Test and polish all features

#### 12.1 CRUD Operations Testing
- [ ] Add missions via MissionForm
- [ ] Add missions via DroidAssistant with various formats:
  - "Rebel Master: Fix hyperdrive"
  - "Empire: Patrol sector"
  - "Jedi: Meditate"
  - "Buy crystals"
- [ ] Edit existing missions (click edit button, modify, submit)
- [ ] Delete missions (click delete button)
- [ ] Toggle completion status (checkbox)

#### 12.2 Filtering Testing
- [ ] Switch to "Active" filter - verify only active missions shown
- [ ] Switch to "Completed" filter - verify only completed missions shown
- [ ] Switch to "All Missions" - verify all missions shown
- [ ] Verify filter button highlighting

#### 12.3 Persistence Testing
- [ ] Add missions, refresh page - verify missions persist
- [ ] Toggle theme, refresh page - verify theme persists
- [ ] Complete missions, refresh page - verify completion status persists

#### 12.4 Theming Testing
- [ ] Click theme toggle - verify hyperspace animation plays
- [ ] After animation - verify theme switches (colors, background)
- [ ] Verify cursor changes color (blue ↔ red)
- [ ] Verify all UI elements adapt to theme
- [ ] Test rapid theme toggling - ensure animation doesn't break

#### 12.5 Droid Assistant Parsing Testing
- [ ] Test all parsing examples from documentation
- [ ] Test edge cases: multiple colons, no colon, weird spacing
- [ ] Verify defaults work correctly (Neutral, Padawan)

#### 12.6 Completion Toasts Testing
- [ ] Complete Rebel mission - verify orange toast with correct message
- [ ] Complete Empire mission - verify red toast with correct message
- [ ] Complete Neutral mission - verify blue toast with correct message
- [ ] Verify toast auto-dismisses after ~2s
- [ ] Verify slide-in and fade-out animations

#### 12.7 UI/UX Testing
- [ ] Verify lightsaber cursor visible throughout app
- [ ] Verify empty state shows when no missions
- [ ] Add mission counter footer: "X missions remaining"
- [ ] Verify responsive layout on mobile (375px width)
- [ ] Verify glow effects on hover/focus
- [ ] Verify smooth transitions throughout

#### 12.8 Edge Cases Testing
- [ ] Submit empty form - verify nothing happens
- [ ] Very long mission title - verify wraps properly
- [ ] Many missions (20+) - verify scrollable and performant
- [ ] Rapid clicking - verify no duplicate missions or broken state

#### 12.9 Verification Checklist
- [ ] Complete all items from IMPLEMENTATION_PLAN.md verification section
- [ ] Fix any bugs discovered during testing
- [ ] Optimize performance if needed
- [ ] Final code cleanup and comments (if needed)

#### 12.10 Final Polish
- [ ] Ensure consistent spacing and alignment
- [ ] Verify all colors match design specifications
- [ ] Test in both themes thoroughly
- [ ] Final QA pass

**Deliverable:** Fully tested, polished, production-ready application

---

## Progress Tracking

### Phase Status
- [ ] Phase 1: Setup & Scaffold
- [ ] Phase 2: Type System
- [ ] Phase 3: Component Development
- [ ] Phase 4: Main Application Logic
- [ ] Phase 5: Styling
- [ ] Phase 6: Testing & Polish

### Current Task
**Active:** None (ready to start Phase 1)

---

## Notes
- Follow tasks in order (bottom-up component approach)
- Test each component individually as you build
- Don't commit until testing is complete (as per user request)
- Total estimated time: Full implementation session
- All features integrated from the start, no phased rollout
