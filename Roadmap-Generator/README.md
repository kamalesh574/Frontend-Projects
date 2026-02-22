# 🧭 Interactive Learning Roadmap Generator  
### Design. Structure. Master.

> A modern SaaS-style frontend application that generates structured, interactive learning roadmaps based on skill, difficulty level, and duration — built with advanced React architecture and strict TypeScript.

---

## 🌐 Live Demo

🔗 **Deployed Application:**  
👉 https://kamal574-roadmap.vercel.app/

---

## 🎯 Core Vision

The **Interactive Learning Roadmap Generator** empowers users to design structured, goal-oriented learning journeys in seconds.

Users can:

- Enter a skill (e.g., *Frontend Development*)
- Select difficulty (Beginner / Intermediate / Advanced)
- Choose duration (30 / 60 / 90 days)
- Generate a structured roadmap
- Visualize roadmap interactively
- Track learning progress
- View analytics insights
- Save multiple roadmaps
- Export roadmap as JSON

All powered entirely on the frontend using intelligent template-driven logic.

---

# 🌍 Supported Skills

The generator supports modern, in-demand domains including:

- Frontend Development
- Backend Development
- Full Stack Development
- Java Developer
- Python Developer
- Data Science
- Machine Learning
- DevOps Engineering
- UI/UX Design
- Mobile App Development
- React Developer
- Node.js Developer
- Cloud Engineering
- Cybersecurity
- Blockchain Development
- Product Management
- System Design
- Software Testing
- DSA Preparation
- AI Engineering

Each roadmap is generated using structured, adaptive template logic that scales complexity based on selected difficulty.

---

# ✨ Core Features

## 🧠 Smart Roadmap Generation Engine (Frontend Only)

`generateRoadmap(skill, difficulty, duration)`

The logic:

- Breaks skill into structured modules
- Divides content into weekly phases
- Assigns estimated learning hours
- Generates milestones
- Adapts complexity by difficulty level
- Includes mock curated resources
- Produces a roadmap that feels AI-generated

No APIs. No backend. Fully client-side.

---

## 🗺 Interactive Roadmap Visualization

Roadmaps are displayed as:

- Vertical timeline  
OR  
- Interactive expandable node-based structure  

Each node includes:

- Topic name
- Description
- Estimated hours
- Suggested resources (mock)
- Completion checkbox
- Expandable details
- Completion animation

All transitions powered by **Framer Motion**.

---

## 📊 Progress Dashboard

Users can track:

- Completion percentage
- Total hours completed
- Weekly learning trends
- Skill mastery breakdown
- Learning streak tracker (mock logic)
- Animated circular progress indicators
- Confetti celebration at 100% completion 🎉

Built using **Recharts**.

---

## 💾 Saved Roadmaps

Users can:

- View saved roadmaps
- Edit
- Delete
- Duplicate
- Export as JSON
- Auto-save progress

All data persisted in **localStorage**.

---

# 🏗️ Tech Stack

Strictly built using:

- React 18+
- TypeScript (Strict Mode ON)
- Vite
- TailwindCSS (Advanced Configuration)
- React Router v6
- React Context API
- useReducer
- Custom Hooks
- Framer Motion
- Recharts

🚫 No Redux  
🚫 No Backend  
🚫 No API calls  

---

# 🧠 Architecture Overview

Feature-Based Scalable Architecture:

```
src/
├── app/
├── components/
├── features/
│ ├── generator/
│ ├── roadmap/
│ ├── progress/
│ ├── analytics/
├── context/
├── hooks/
├── types/
├── utils/
├── pages/
├── assets/

```


### Architecture Principles

- Feature-first organization
- Clean separation of logic & UI
- No prop drilling (Global Context)
- useReducer for predictable updates
- Strict typing across entire app
- Scalable folder structure

---

# 📐 TypeScript Models (Strict)

Fully typed domain models:

- `Roadmap`
- `RoadmapModule`
- `RoadmapNode`
- `Progress`
- `AnalyticsData`
- `DifficultyLevel` (Enum)

✅ No `any` types  
✅ Enums over string literals  
✅ Strong type safety enforced  

---

# 🖥️ Pages Overview

## 1️⃣ Landing Page

- Hero: *“Design Your Learning Journey”*
- Generate Roadmap CTA
- Feature overview
- Animated roadmap preview
- Mock testimonials
- Modern footer

---

## 2️⃣ Roadmap Generator Page

Inputs:

- Skill Name (with suggestions)
- Difficulty selector
- Duration selector
- Learning style (Video / Practice / Balanced)
- Goal (Job-ready / Project-focused / Career switch)

On submit → Structured roadmap generated instantly.

---

## 3️⃣ Interactive Roadmap Page

- Animated timeline / node structure
- Expandable modules
- Smooth completion transitions
- Auto-save progress
- Filter completed / pending topics
- Confetti on full completion

---

## 4️⃣ Progress Dashboard

Displays:

- Completion %
- Hours completed
- Weekly chart
- Mastery distribution
- Streak tracking

Animated stats + charts.

---

## 5️⃣ Saved Roadmaps Page

- Manage saved roadmaps
- Edit / Delete / Duplicate
- Export JSON
- Persistent storage via localStorage

---

# 🎨 Premium UI & UX

Inspired by:

**Notion + Linear + roadmap.sh + modern startup dashboards**

Includes:

- Gradient hero sections
- Glassmorphism cards
- Soft shadows
- Hover animations
- Smooth page transitions
- Animated counters
- Circular progress indicators
- Dark mode toggle (persisted)
- Skeleton loaders
- Clean typography
- Micro-interactions with Framer Motion
- Fully responsive layout

Designed to feel like a funded SaaS product.

---

# 🧩 State Management Strategy

Global `RoadmapContext` powered by:

- `useReducer`
- Fully typed action system
- Centralized state logic

Custom Hooks:

- `useRoadmap()`
- `useProgress()`
- `useDarkMode()`
- `useLocalStorage()`

No prop drilling.

---

# ⚡ Advanced Features

- 🌙 Dark mode toggle (persisted)
- 🎬 Framer Motion animations
- 🔄 Expandable animated roadmap nodes
- 💾 Auto-save progress
- 📊 Analytics dashboard
- 📤 Export roadmap JSON
- 🎉 Confetti at 100% completion
- 🔍 Filter completed/pending topics
- 📈 Animated circular progress indicator
- 🧠 Adaptive difficulty logic

---

# 📦 Performance Optimizations

- Lazy-loaded routes
- Memoized components
- Efficient reducer updates
- Optimized re-renders
- Minimal state recalculations
- Smooth animation handling

---

# 🚀 Installation & Setup


# Navigate into project
cd interactive-learning-roadmap

# Install dependencies
npm install

# Run development server
npm run dev

---

# 🛠 Future Upgrades

## 🚀 Planned Enhancements

- 🔗 Backend integration for cloud synchronization  
- 🔐 User authentication system  
- 🤖 Real AI-generated roadmaps (LLM integration)  
- 🤝 Collaborative learning spaces  
- 🌍 Shareable public roadmap links  
- 🎮 Gamification (badges & levels)  
- 📅 Calendar integration  
- ⏱ Pomodoro timer mode  
- 🔖 Resource bookmarking  
- 📊 AI-powered progress insights  
- 📱 Progressive Web App (PWA) support  
- 🌐 Offline-first synchronization  
- 📲 Mobile application version  
- 🏪 Community roadmap marketplace  

The application architecture is intentionally built to support seamless scaling into a full-stack, AI-powered learning platform.

---

# 🎯 Why This Project Stands Out

## 💡 Technical Highlights

This project demonstrates:

- 🏗 Advanced React architecture  
- 📦 Structured, scalable frontend system design  
- 🧠 Intelligent client-side roadmap generation logic  
- 🔄 Complex state management without Redux  
- 🔒 Strict TypeScript discipline (no `any`)  
- ✨ SaaS-level UI engineering  
- 📊 Data visualization expertise  
- 🗂 Production-ready, feature-based folder architecture  

---

📄 License

MIT License

---

👨‍💻 Author

Kamalesh P
Aspiring Java Developer | React + TypeScript Developer
