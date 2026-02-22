# 🗂️ Advanced Drag & Drop Kanban Board

A professional, production-grade SaaS-style Kanban board built with React, TypeScript, and Tailwind CSS. This application features a fluid drag-and-drop interface, real-time analytics, and persistent storage.

## 🚀 Features

- **Multi-Board Management**: Create, rename, and organize multiple project boards.
- **Fluid Drag & Drop**: Seamlessly move tasks between columns and reorder columns with smooth animations powered by `@dnd-kit`.
- **Rich Task Management**:
  - Priority levels (Low, Medium, High, Urgent)
  - Color-coded labels
  - Interactive checklists with progress tracking
  - Due dates and time estimates
  - Detailed descriptions
- **Analytics Dashboard**: Visualize team productivity with interactive charts (Recharts), including task distribution, priority breakdown, and completion trends.
- **Premium UI/UX**:
  - Modern "SaaS" aesthetic with glassmorphism and soft shadows.
  - Dark Mode support with persistence.
  - Micro-interactions and smooth transitions using Framer Motion.
  - Fully responsive design.
- **Offline-First**: All data is persisted in `localStorage`, ensuring your workflow is never interrupted.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS 4.0
- **Drag & Drop**: @dnd-kit
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API + useReducer
- **Date Handling**: date-fns

## 📁 Project Structure

```text
src/
 ├── app/             # Application entry and routing
 ├── components/      # Reusable UI components
 ├── features/        # Feature-based modules
 │    ├── boards/     # Board management and Kanban logic
 │    ├── lists/      # Column/List components
 │    ├── tasks/      # Task cards and detail modals
 │    └── analytics/  # Dashboard and charts
 ├── context/         # Global state (BoardContext)
 ├── hooks/           # Custom hooks (useBoards, useTasks, etc.)
 ├── types/           # TypeScript interfaces and enums
 ├── utils/           # Helper functions and constants
 └── pages/           # Main route views
```

## 🧠 Architecture Highlights

### Drag & Drop Logic
The application uses `@dnd-kit` for its modularity and performance. It implements a custom collision detection strategy to handle both task-to-task and task-to-column interactions, ensuring a natural "drop" feel even in complex layouts.

### State Persistence
A robust `useReducer` pattern manages the complex board state. The state is automatically synchronized with `localStorage` via a `useEffect` hook in the `BoardProvider`, allowing for a seamless offline experience without a backend.

### Analytics Logic
The analytics dashboard dynamically calculates metrics from the board state. It derives completion rates, priority distributions, and column densities on-the-fly, providing immediate feedback as tasks move through the workflow.

## 🚀 Getting Started

1. **Install Dependencies**: `npm install`
2. **Run Development Server**: `npm run dev`
3. **Build for Production**: `npm run build`

## 📄 License

This project is licensed under the Apache-2.0 License.
