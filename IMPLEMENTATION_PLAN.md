# Star Wars Mission Tracker - Complete Implementation Plan

## Context
Building a Star Wars themed To-Do app from scratch as a super simple MVP. This is a single-page React + Vite app with TypeScript and plain CSS for managing tasks styled as "missions". The app features:
- Core CRUD operations (add, edit, delete, complete missions)
- Three-tier filtering (All/Active/Completed)
- Star Wars theming with faction sides (Rebel/Empire/Neutral) and priority levels (Padawan/Jedi/Master)
- **Lightsaber cursor** that changes color based on theme (blue for Light Side, red for Dark Side)
- **Light/Dark Side theme toggle** with hyperspace jump animation transition
- **Droid Assistant** quick-add that parses commands like "Rebel Master: Fix hyperdrive"
- Side-specific completion messages
- localStorage persistence (no backend)

User wants to rebuild from scratch with all features integrated properly.

---

## Tech Stack
- **React 18 + Vite** (TypeScript)
- **Plain CSS** (single `App.css` file)
- **localStorage** for persistence
- **CSS custom cursors** via SVG data URIs
- **CSS animations** for hyperspace effect

---

## Project Structure
```
star-wars-todo/
  index.html
  package.json
  package-lock.json
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  vite.config.ts
  eslint.config.js
  .gitignore
  src/
    main.tsx              # Entry point
    App.tsx               # Root component with all state management
    App.css               # All styles (light/dark themes, animations, cursors)
    types.ts              # Type definitions
    components/
      MissionList.tsx     # Renders filtered mission list
      MissionItem.tsx     # Individual mission row
      MissionForm.tsx     # Add/Edit form
      DroidAssistant.tsx  # Quick-add text parser
      FilterBar.tsx       # Filter buttons
      ThemeToggle.tsx     # Theme switcher with hyperspace animation
      CompletionToast.tsx # Toast notification for completed missions
```

---

## Data Model

```ts
// types.ts
export type Side = 'Rebel' | 'Empire' | 'Neutral'
export type Priority = 'Padawan' | 'Jedi' | 'Master'
export type ThemeMode = 'light' | 'dark'
export type Filter = 'all' | 'active' | 'completed'

export interface Mission {
  id: string
  title: string
  side: Side
  priority: Priority
  completed: boolean
  createdAt: number
}
```

---

## Implementation Details

### 1. App.tsx — State Management & localStorage
**State:**
- `missions: Mission[]` - loaded from localStorage on mount, saved on every change
- `filter: Filter` - 'all' | 'active' | 'completed'
- `theme: ThemeMode` - 'light' | 'dark', persisted to localStorage
- `editingMission: Mission | null` - current mission being edited
- `completionMessage: string | null` - toast message when mission completed
- `isAnimating: boolean` - controls hyperspace animation

**Handlers:**
- `addMission(title, side, priority)` - creates new mission with `crypto.randomUUID()`
- `updateMission(id, title, side, priority)` - updates existing mission
- `deleteMission(id)` - removes mission from array
- `toggleMission(id)` - toggles completed status and shows completion toast
- `toggleTheme()` - triggers hyperspace animation, then switches theme after 1.5s

**localStorage keys:**
- `sw-missions` - mission array
- `sw-theme` - theme mode

**Theme application:**
- On mount and theme change, set `data-theme="light"` or `"dark"` on `<html>` element
- CSS uses `[data-theme="dark"]` and `[data-theme="light"]` selectors

---

### 2. Components

#### FilterBar.tsx
- Three buttons: "All Missions" / "Active" / "Completed"
- Highlight active filter with `.active` class
- Props: `current: Filter`, `onChange: (filter: Filter) => void`

#### MissionForm.tsx
- Form with:
  - Text input: placeholder "Enter mission briefing..."
  - Dropdown: Side (Rebel ⭐ / Empire 🖤 / Neutral 🔵)
  - Dropdown: Priority (Padawan ⚔️ / Jedi 🗡️ / Master ⚛️)
  - Submit button: "Add Mission" or "Update Mission" (if editing)
  - Cancel button (only shown when editing)
- Pre-fills fields when `editingMission` prop is provided
- Resets to defaults (Neutral, Padawan) after submit
- Props: `onSubmit`, `editingMission`, `onCancelEdit`

#### MissionItem.tsx
- Checkbox + title + badges + action buttons
- Badges show side and priority with emoji icons
- Edit button (✏️) and Delete button (🗑️)
- Apply `.completed` class with strikethrough when completed
- Apply faction-specific class: `.side-rebel`, `.side-empire`, `.side-neutral`
- Props: `mission`, `onToggle`, `onDelete`, `onEdit`

#### MissionList.tsx
- Maps `missions` array to `MissionItem` components
- Shows empty state if no missions: "No missions in the queue, Commander."
- Props: `missions`, `onToggle`, `onDelete`, `onEdit`

#### DroidAssistant.tsx
- Single text input with placeholder: "🤖 Droid Assistant: Quick add (e.g., 'Rebel Master: Fix hyperdrive')"
- Parsing logic on submit:
  1. Split on first `:`
  2. Parse prefix (before `:`) for keywords:
     - Side keywords: "Rebel", "Empire", "Neutral" (case-insensitive)
     - Priority keywords: "Padawan", "Jedi", "Master" (case-insensitive)
  3. Text after `:` becomes title (or full text if no `:`)
  4. Defaults: Neutral side, Padawan priority
- Examples:
  - `"Rebel Master: Fix hyperdrive"` → Rebel, Master, "Fix hyperdrive"
  - `"Empire: Patrol sector"` → Empire, Padawan, "Patrol sector"
  - `"Jedi: Meditate"` → Neutral, Jedi, "Meditate"
  - `"Buy crystals"` → Neutral, Padawan, "Buy crystals"
- Calls `onAdd(title, side, priority)` after parsing
- Clears input after submit
- Props: `onAdd: (title, side, priority) => void`

#### ThemeToggle.tsx
- Toggle button UI showing current theme: "☀️ Light Side" or "🌙 Dark Side"
- On click: calls `onToggle()` which triggers hyperspace animation
- Shows full-screen hyperspace overlay during animation
- Props: `theme: ThemeMode`, `onToggle: () => void`, `isAnimating: boolean`

**Hyperspace Animation:**
- Full-screen `div` with `position: fixed`, `z-index: 9999`
- CSS animation: radial gradient lines streaking from center outward
- Animation keyframes:
  ```css
  @keyframes hyperspace {
    0% {
      background: radial-gradient(circle, transparent 10%, #000 100%);
      transform: scale(1);
    }
    50% {
      background: repeating-radial-gradient(
        circle at 50% 50%,
        transparent 0px,
        #fff 2px,
        transparent 4px,
        transparent 40px
      );
      transform: scale(1.5);
    }
    100% {
      background: radial-gradient(circle, transparent 0%, #000 90%);
      transform: scale(2);
      opacity: 0;
    }
  }
  ```
- Duration: 1.5s
- After animation ends, remove overlay and apply new theme

#### CompletionToast.tsx
- Small toast notification that appears when mission is completed
- Position: bottom-right corner
- Shows side-specific message:
  - Rebel: "Mission accomplished, Commander." (orange/gold background)
  - Empire: "The Emperor will be pleased." (red background)
  - Neutral: "Another job done, no questions asked." (blue background)
- Auto-dismiss after 2 seconds
- Fade-in/fade-out animation
- Props: `message: string | null`, `side: Side`

---

### 3. Styling (App.css)

#### Global Styles
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  font-family: 'Courier New', Courier, monospace;
  transition: background-color 0.3s, color 0.3s;
}
```

#### Theme Variables
```css
[data-theme="dark"] {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --text-primary: #e6edf3;
  --text-secondary: #8b949e;
  --border-color: #30363d;
  --accent-primary: #dc143c; /* crimson */
  --accent-glow: rgba(220, 20, 60, 0.5);
  --cursor-color: #dc143c; /* red lightsaber */
}

[data-theme="light"] {
  --bg-primary: #f6f8fa;
  --bg-secondary: #ffffff;
  --text-primary: #24292f;
  --text-secondary: #57606a;
  --border-color: #d0d7de;
  --accent-primary: #0969da; /* blue */
  --accent-glow: rgba(9, 105, 218, 0.5);
  --cursor-color: #0969da; /* blue lightsaber */
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

#### Lightsaber Cursor
```css
/* Generate SVG cursors inline */
[data-theme="dark"] body {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect x="10" y="0" width="4" height="24" fill="%23dc143c" opacity="0.9"/><circle cx="12" cy="12" r="3" fill="%23ff6b6b"/></svg>') 12 12, auto;
}

[data-theme="light"] body {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect x="10" y="0" width="4" height="24" fill="%230969da" opacity="0.9"/><circle cx="12" cy="12" r="3" fill="%234dabf7"/></svg>') 12 12, auto;
}
```

#### App Layout
```css
.app {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.app-title {
  text-align: center;
  font-size: 2.5rem;
  letter-spacing: 0.3em;
  margin-bottom: 0.25rem;
  text-shadow: 0 0 10px var(--accent-glow);
}

.app-subtitle {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}
```

#### Component Styles
- Mission form: inputs with glow effect on focus
- Filter bar: pill-shaped buttons
- Mission items: cards with border glow based on faction
- Badges: faction-colored borders (Rebel=orange, Empire=red, Neutral=blue)
- Buttons: subtle glow on hover
- All interactive elements: smooth transitions

#### Faction Colors
```css
.side-rebel { border-color: #f0a030; }
.side-empire { border-color: #dc143c; }
.side-neutral { border-color: #6090c0; }

.badge-side-rebel { border-color: #f0a030; color: #f0a030; }
.badge-side-empire { border-color: #dc143c; color: #dc143c; }
.badge-side-neutral { border-color: #6090c0; color: #6090c0; }
```

#### Hyperspace Animation Overlay
```css
.hyperspace-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
  animation: hyperspace 1.5s ease-in-out forwards;
}

@keyframes hyperspace {
  0% {
    background: radial-gradient(circle at 50% 50%, transparent 10%, #000 100%);
    opacity: 1;
  }
  30% {
    background:
      repeating-radial-gradient(
        circle at 50% 50%,
        transparent 0px,
        rgba(255, 255, 255, 0.8) 1px,
        transparent 2px,
        transparent 30px
      ),
      radial-gradient(circle at 50% 50%, transparent 0%, #000 100%);
    opacity: 1;
  }
  70% {
    background:
      repeating-radial-gradient(
        circle at 50% 50%,
        transparent 0px,
        rgba(255, 255, 255, 0.9) 1px,
        transparent 3px,
        transparent 50px
      ),
      radial-gradient(circle at 50% 50%, transparent 0%, #000 90%);
    transform: scale(1.8);
    opacity: 1;
  }
  100% {
    background: radial-gradient(circle at 50% 50%, transparent 0%, #000 80%);
    transform: scale(2.5);
    opacity: 0;
  }
}
```

#### Toast Notification
```css
.completion-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: toast-slide-in 0.3s ease-out, toast-fade-out 0.3s ease-in 1.7s forwards;
  z-index: 1000;
}

.toast-rebel {
  background: #f0a030;
  color: #000;
}

.toast-empire {
  background: #dc143c;
  color: #fff;
}

.toast-neutral {
  background: #6090c0;
  color: #fff;
}

@keyframes toast-slide-in {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toast-fade-out {
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}
```

#### Responsive Design
```css
@media (max-width: 640px) {
  .app {
    padding: 1rem;
  }

  .app-title {
    font-size: 1.8rem;
    letter-spacing: 0.2em;
  }

  .form-selects {
    flex-direction: column;
  }

  .mission-badges {
    flex-wrap: wrap;
  }

  .completion-toast {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }
}
```

---

## Implementation Steps

### Step 1: Clean Scaffold
1. Delete all existing code in the project directory (or start fresh)
2. Run `npm create vite@latest . -- --template react-ts`
3. Run `npm install`
4. Clean boilerplate: remove logos, default App content
5. Update `index.html` title to "Star Wars Mission Tracker"
6. Clean `src/index.css` to basic reset
7. Initialize git repo: `git init && git remote add origin https://github.com/semani01/star-wars-todo.git`

### Step 2: Create Types
Create `src/types.ts` with all type definitions.

### Step 3: Build Components (Bottom-Up)
1. **CompletionToast.tsx** - Simple toast UI
2. **FilterBar.tsx** - Three filter buttons
3. **MissionItem.tsx** - Single mission row
4. **MissionList.tsx** - List renderer with empty state
5. **MissionForm.tsx** - Add/edit form with dropdowns
6. **DroidAssistant.tsx** - Quick-add parser
7. **ThemeToggle.tsx** - Theme switcher with animation overlay

### Step 4: Build App.tsx
- All state management
- localStorage hooks
- Theme toggle handler with animation timing
- Completion toast trigger
- Wire up all components

### Step 5: Style Everything (App.css)
- Theme variables
- Lightsaber cursors
- Hyperspace animation
- All component styles
- Responsive breakpoints
- Glow effects and transitions

### Step 6: Test & Polish
- Mission counter footer: "X missions remaining"
- Empty state messages
- Test all CRUD operations
- Test theme toggle animation
- Test Droid Assistant parsing
- Test completion toasts
- Test persistence (refresh page)
- Test responsive layout

---

## Verification Checklist

After implementation, verify:

1. **CRUD Operations**
   - [ ] Add missions via form
   - [ ] Add missions via Droid Assistant with various formats
   - [ ] Edit existing missions
   - [ ] Delete missions
   - [ ] Toggle completion status

2. **Filtering**
   - [ ] Switch to "Active" filter - only active missions shown
   - [ ] Switch to "Completed" filter - only completed missions shown
   - [ ] Switch to "All Missions" - all missions shown

3. **Persistence**
   - [ ] Add missions, refresh page - missions persist
   - [ ] Toggle theme, refresh page - theme persists
   - [ ] Complete missions, refresh page - completion status persists

4. **Theming**
   - [ ] Click theme toggle - hyperspace animation plays
   - [ ] After animation - theme switches (colors, background)
   - [ ] Cursor changes color (blue → red or red → blue)
   - [ ] All UI elements adapt to theme

5. **Droid Assistant Parsing**
   - [ ] "Rebel Master: Fix hyperdrive" → Rebel, Master, "Fix hyperdrive"
   - [ ] "Empire: Patrol sector" → Empire, Padawan, "Patrol sector"
   - [ ] "Jedi: Meditate" → Neutral, Jedi, "Meditate"
   - [ ] "Buy crystals" → Neutral, Padawan, "Buy crystals"

6. **Completion Toasts**
   - [ ] Complete Rebel mission → orange toast "Mission accomplished, Commander."
   - [ ] Complete Empire mission → red toast "The Emperor will be pleased."
   - [ ] Complete Neutral mission → blue toast "Another job done, no questions asked."
   - [ ] Toast auto-dismisses after ~2s

7. **UI/UX**
   - [ ] Lightsaber cursor visible throughout app
   - [ ] Empty state shows when no missions
   - [ ] Mission counter updates correctly
   - [ ] Responsive on mobile (test at 375px width)
   - [ ] Glow effects on hover
   - [ ] Smooth transitions

8. **Edge Cases**
   - [ ] Submit empty form - does nothing
   - [ ] Very long mission title - wraps properly
   - [ ] Many missions (20+) - scrollable, performant
   - [ ] Rapid theme toggling - animation doesn't break

---

## File-by-File Summary

**Critical Files to Create:**

1. `src/types.ts` - Type definitions (50 lines)
2. `src/App.tsx` - Main app logic (200 lines)
3. `src/App.css` - All styling (400 lines)
4. `src/components/FilterBar.tsx` (30 lines)
5. `src/components/MissionForm.tsx` (100 lines)
6. `src/components/MissionItem.tsx` (70 lines)
7. `src/components/MissionList.tsx` (40 lines)
8. `src/components/DroidAssistant.tsx` (80 lines)
9. `src/components/ThemeToggle.tsx` (50 lines)
10. `src/components/CompletionToast.tsx` (30 lines)

**Files to Modify:**

1. `index.html` - Update title
2. `src/index.css` - Basic reset
3. `src/main.tsx` - Standard Vite entry (likely no changes)

**Total Implementation:** ~1,150 lines of code across 13 files.

---

## Git Workflow

Since this is a from-scratch rebuild:

1. **Option A: Fresh start**
   - Delete `.git` directory
   - `git init`
   - `git remote add origin https://github.com/semani01/star-wars-todo.git`
   - Build everything
   - `git add .`
   - `git commit -m "Complete Star Wars Mission Tracker MVP"`
   - `git branch -M main`
   - `git push -u origin main --force`

2. **Option B: New branch from current state**
   - `git checkout master`
   - `git checkout -b feat/complete-rebuild`
   - Delete all src files
   - Rebuild everything
   - Commit and push
   - Open PR for review

Recommend **Option A** for true from-scratch approach.

---

## Notes

- **No external dependencies** needed beyond Vite + React
- **No asset files** needed - cursors and icons use emoji + SVG data URIs
- **Single CSS file** keeps styling simple and scannable
- **~1,150 lines total** - achievable in one implementation session
- **All features integrated** from the start, no phased approach needed
- **Fully self-contained** - works offline, no API calls
