# 🧭 Interactive Learning Roadmap Generator

A professional, production-grade SaaS-level frontend application for generating structured, interactive learning roadmaps for modern career skills.

## 🚀 Features

- **Smart Roadmap Generation**: Intelligent template-based logic to create personalized learning paths based on skill, difficulty, and duration.
- **Interactive Roadmap Visualization**: Vertical timeline structure with expandable nodes, progress tracking, and resource curation.
- **Progress Dashboard**: Deep analytics with charts (Recharts) showing completion rates, weekly activity, and skill mastery.
- **Library Management**: Save, duplicate, delete, and export roadmaps.
- **Dark Mode**: Fully integrated and persisted dark mode support.
- **Responsive Design**: Mobile-first approach with elegant UI components.
- **Micro-interactions**: Smooth animations and transitions powered by Framer Motion.
- **JSON Export**: Export your roadmaps to share or back up.

## 🛠️ Tech Stack

- **React 18+** with **TypeScript**
- **Vite** for fast development and bundling
- **TailwindCSS** for advanced utility-first styling
- **Framer Motion** for production-grade animations
- **Recharts** for data visualization
- **Lucide React** for consistent iconography
- **React Router v6** for client-side routing
- **React Context API + useReducer** for robust state management

## 📁 Folder Structure

```text
src/
 ├── app/           # App-wide configurations
 ├── components/    # Reusable UI components (Navbar, Layout, etc.)
 ├── features/      # Feature-specific logic (generator, roadmap, progress, analytics)
 ├── context/       # State management using Context API
 ├── hooks/         # Custom React hooks
 ├── types/         # TypeScript interfaces and enums
 ├── utils/         # Helper functions and roadmap generation logic
 ├── pages/         # Page components
 └── assets/        # Static assets
```

## 🧠 How It Works

### Roadmap Generation
The `generateRoadmap` utility uses structured templates for various modern skills (Frontend, Backend, Data Science, etc.). It calculates the number of modules based on the requested duration and adapts the complexity and estimated hours based on the selected difficulty level.

### Persistence
The application uses a custom `RoadmapProvider` that synchronizes the application state with `localStorage`. This ensures that all your roadmaps and progress are saved locally in your browser.

## 📦 Deployment

The application is optimized for production. Run the following command to build:

```bash
npm run build
```

The output will be in the `dist/` directory, ready to be hosted on any static site hosting service.

## 🔮 Future Enhancements

- **AI Integration**: Connect to real LLM APIs for even more personalized roadmaps.
- **Community Sharing**: A public gallery of user-generated roadmaps.
- **Calendar Integration**: Sync learning milestones with Google Calendar or Outlook.
- **Gamification**: Badges and achievements for completing modules.

## 📄 License

SPDX-License-Identifier: Apache-2.0
