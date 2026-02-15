# ⭐ Star Wars Mission Tracker

A Star Wars-themed to-do application built with React, TypeScript, and Vite. Track your missions with style, featuring lightsaber cursors, hyperspace theme transitions, and faction-specific styling.

## ✨ Features

### Core Functionality
- **CRUD Operations**: Add, edit, delete, and complete missions
- **Smart Filtering**: View all missions, active only, or completed only
- **Persistent Storage**: Missions and theme preferences saved to localStorage
- **Mission Counter**: Real-time count of remaining missions

### Star Wars Theme
- **🗡️ Lightsaber Cursors**: Red cursor in dark mode, blue in light mode
- **🌌 Hyperspace Animation**: Stunning transition effect when switching themes
- **⭐ Faction System**: Three sides with unique colors
  - Rebel (Orange/Gold)
  - Empire (Red)
  - Neutral (Blue)
- **🎖️ Priority Levels**: Padawan, Jedi, Master

### Special Features
- **🤖 Droid Assistant**: Quick-add missions with smart command parsing
  - `"Rebel Master: Fix hyperdrive"` → Rebel faction, Master priority
  - `"Empire: Patrol sector"` → Empire faction, default Padawan priority
  - `"Jedi: Meditate"` → Default Neutral faction, Jedi priority
  - `"Buy crystals"` → Default Neutral faction, Padawan priority

- **🎊 Completion Toasts**: Side-specific messages when completing missions
  - Rebel: "Mission accomplished, Commander."
  - Empire: "The Emperor will be pleased."
  - Neutral: "Another job done, no questions asked."

### Themes
- **🌙 Dark Side** (default): GitHub-inspired dark theme with red accents
- **☀️ Light Side**: GitHub-inspired light theme with blue accents
- Smooth theme transitions with hyperspace animation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/semani01/do-or-do-not.git
cd do-or-do-not
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Plain CSS with CSS Variables
- **Storage**: localStorage API
- **Linting**: ESLint

## 📁 Project Structure

```
src/
├── components/
│   ├── CompletionToast.tsx    # Side-specific toast notifications
│   ├── DroidAssistant.tsx     # Smart command parser for quick-add
│   ├── FilterBar.tsx          # Mission filter buttons
│   ├── MissionForm.tsx        # Add/Edit mission form
│   ├── MissionItem.tsx        # Individual mission component
│   ├── MissionList.tsx        # Mission list renderer
│   └── ThemeToggle.tsx        # Theme switcher with animation
├── App.tsx                    # Main application logic
├── App.css                    # Complete styling (~535 lines)
├── types.ts                   # TypeScript type definitions
├── main.tsx                   # Application entry point
└── index.css                  # Global CSS reset
```

## 🎮 Usage

### Adding Missions

**Via Mission Form:**
1. Enter mission title
2. Select faction (Rebel/Empire/Neutral)
3. Select priority (Padawan/Jedi/Master)
4. Click "Add Mission"

**Via Droid Assistant (Quick Add):**
Type commands like:
- `Rebel Master: Destroy the Death Star`
- `Empire Jedi: Interrogate the prisoner`
- `Fix the Millennium Falcon` (defaults to Neutral Padawan)

### Managing Missions
- ✅ **Complete**: Click the checkbox
- ✏️ **Edit**: Click the edit button, modify, and submit
- 🗑️ **Delete**: Click the delete button

### Filtering
- **All Missions**: View everything
- **Active**: Only incomplete missions
- **Completed**: Only finished missions

### Theme Switching
Click the theme toggle button and watch the hyperspace animation!

## 🧪 Testing Checklist

- [x] Add missions via form
- [x] Add missions via Droid Assistant
- [x] Edit existing missions
- [x] Delete missions
- [x] Toggle mission completion
- [x] Filter missions (All/Active/Completed)
- [x] Theme toggle with hyperspace animation
- [x] localStorage persistence
- [x] Completion toasts display correctly
- [x] Lightsaber cursor changes with theme
- [x] Responsive design on mobile
- [x] Empty state displays correctly
- [x] Mission counter updates correctly

## 🎨 Design Features

- **Monospace Font**: Retro sci-fi aesthetic
- **Glow Effects**: Hover effects on interactive elements
- **Smooth Transitions**: 0.2s ease on all animations
- **Responsive Design**: Mobile-friendly at 640px breakpoint
- **Faction Colors**: Distinct borders and badges per faction
- **Button Animations**: Press effect on click

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

This is a personal project, but feel free to fork and modify for your own use!

## 📄 License

MIT License - feel free to use this project however you'd like.

## 👨‍💻 Author

**Sai Srikar Emani**

---

*May the Force be with you! 🌟*
