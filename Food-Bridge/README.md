# 🍽️ Food-Bridge Marketplace  
### Reduce Waste. Feed Lives.

> A modern, frontend-only marketplace connecting restaurants with surplus food to NGOs in need — built with scalable React architecture, strict TypeScript, and a premium SaaS-level UI.

---

## 🌐 Live Demo

🔗 **Deployed Application:**  
👉 https://kamal574-foodbridge.vercel.app/

---

## 🎯 Core Vision

Food-Bridge Marketplace is designed to reduce food waste and maximize social impact by connecting:

### 👨‍🍳 Restaurants (Donors)

- Add surplus food listings
- Set preparation & expiry times
- Track active listings
- View donation history
- Monitor impact statistics

### 🏢 NGOs (Receivers)

- Browse available food listings
- Filter by expiry, type, quantity, and distance
- Request pickup
- Track request status in real-time (mocked logic)

This project simulates a real-world donation coordination platform using frontend-only architecture.

---

# 🏗️ Tech Stack

Built exclusively with:

- React 18+
- TypeScript (Strict Mode ON)
- Vite
- TailwindCSS (Advanced Configuration)
- React Router v6
- React Context API
- useReducer (Global State Management)
- Custom Hooks



---

# 🧠 Architecture Overview

Feature-Based Scalable Architecture:

```

src/
├── app/
├── components/
├── features/
│ ├── auth/
│ ├── listings/
│ ├── restaurant/
│ ├── ngo/
├── hooks/
├── context/
├── types/
├── utils/
├── pages/
├── assets/

```


### Architecture Principles

- Clean separation of concerns
- Feature-first organization
- Strict typing across application
- No prop drilling (Context + Reducer)
- Modular & scalable folder structure
- Reusable UI components

---

# 🖥️ Application Pages

## 1️⃣ Landing Page

- Hero: **“Reduce Waste. Feed Lives.”**
- CTA: Donate Food / Find Food
- 3-Step Workflow Section
- Animated impact statistics counters
- Mock testimonials
- Professional footer

---

## 2️⃣ Authentication Page (Mock)

- Role selection (Restaurant / NGO)
- Fake login simulation
- Role stored in localStorage
- Redirect to respective dashboard
- Form validation
- Clean, modern UI

---

## 3️⃣ Restaurant Dashboard

### Overview Cards

- Total Donations
- Active Listings
- Food Claimed
- Expired Items

### Add Food Modal

Fields:

- Food Name
- Quantity
- Unit (kg / plates)
- Type (Veg / Non-Veg)
- Prepared Time
- Expiry Time
- Pickup Location
- Image Upload (Preview Only)

### Listings Table

Columns:

- Food Name
- Quantity
- Expiry Countdown (Live auto-updating timer)
- Status Badge:
  - Available
  - Requested
  - Picked
  - Expired

⏳ Countdown updates every second using custom hook.

---

## 4️⃣ NGO Dashboard

### Available Food Grid

Each card displays:

- Food image
- Restaurant name
- Mock distance
- Expiry countdown
- Quantity
- Request Pickup button

### Dynamic Filter Panel

- Veg / Non-Veg
- Expiry < 2 hours
- Quantity range
- Distance slider (mocked logic)

Filters update results instantly.

---

## 5️⃣ My Requests Page (NGO)

Status types:

- Pending
- Approved
- Completed

Includes:

- Progress status UI
- Timeline view
- Clean status indicators

---

# 🎨 Premium UI & Design System

Inspired by funded startup products.

Includes:

- Glassmorphism panels
- Gradient backgrounds
- Soft shadows
- Smooth hover animations
- Transition effects
- Animated counters
- Status badges
- Skeleton loaders
- Fully responsive layouts
- Dark mode toggle (persisted in localStorage)

### Advanced Tailwind Usage

- Custom theme configuration
- Extended color palette
- Custom animations
- Utility composition
- Responsive grid systems

UI feels modern, polished, and production-ready.

---

# 🧩 State Management Strategy

Global Contexts:

- AuthContext
- ListingsContext

State handled using:

- useReducer for predictable updates
- Fully typed actions
- Centralized business logic

Custom Hooks:

- useAuth()
- useListings()
- useCountdown()
- useLocalStorage()

✅ No prop drilling  
✅ Persistent data via localStorage  

---

# 📊 TypeScript Data Models

Strict interfaces defined for:

- `User`
- `Listing`
- `Request`
- `Location`

Enums used for:

- ListingStatus
- RequestStatus
- UserRole

🚫 No `any` types  
🚫 No loosely typed state  

---

# ⚡ UX Standards

- Fully responsive (mobile-first)
- Accessible buttons & labels
- Keyboard-friendly modals
- Smooth transitions
- Empty states
- Error states
- Loading skeletons
- Live updating expiry countdown
- Clear status feedback

---

# 🧪 Code Quality Standards

- Strict TypeScript enforcement
- No `any`
- Reusable components
- Clean naming conventions
- Separation of UI & business logic
- No duplicated code
- Well-commented logic
- Scalable architecture

---

# 📦 Performance Optimizations

- Lazy-loaded routes (code splitting)
- Memoization where necessary
- Efficient reducer updates
- Avoid unnecessary re-renders
- Optimized image previews
- Efficient countdown updates

---

# 🚀 Installation & Setup


# Navigate into project
cd food-bridge-marketplace

# Install dependencies
npm install

# Run development server
npm run dev


### Architecture Principles

- Clean separation of concerns
- Feature-first organization
- Strict typing across application
- No prop drilling (Context + Reducer)
- Modular & scalable folder structure
- Reusable UI components

---

# 🖥️ Application Pages

## 1️⃣ Landing Page

- Hero: **“Reduce Waste. Feed Lives.”**
- CTA: Donate Food / Find Food
- 3-Step Workflow Section
- Animated impact statistics counters
- Mock testimonials
- Professional footer

---

## 2️⃣ Authentication Page (Mock)

- Role selection (Restaurant / NGO)
- Fake login simulation
- Role stored in localStorage
- Redirect to respective dashboard
- Form validation
- Clean, modern UI

---

## 3️⃣ Restaurant Dashboard

### Overview Cards

- Total Donations
- Active Listings
- Food Claimed
- Expired Items

### Add Food Modal

Fields:

- Food Name
- Quantity
- Unit (kg / plates)
- Type (Veg / Non-Veg)
- Prepared Time
- Expiry Time
- Pickup Location
- Image Upload (Preview Only)

### Listings Table

Columns:

- Food Name
- Quantity
- Expiry Countdown (Live auto-updating timer)
- Status Badge:
  - Available
  - Requested
  - Picked
  - Expired

⏳ Countdown updates every second using custom hook.

---

## 4️⃣ NGO Dashboard

### Available Food Grid

Each card displays:

- Food image
- Restaurant name
- Mock distance
- Expiry countdown
- Quantity
- Request Pickup button

### Dynamic Filter Panel

- Veg / Non-Veg
- Expiry < 2 hours
- Quantity range
- Distance slider (mocked logic)

Filters update results instantly.

---

## 5️⃣ My Requests Page (NGO)

Status types:

- Pending
- Approved
- Completed

Includes:

- Progress status UI
- Timeline view
- Clean status indicators

---

# 🎨 Premium UI & Design System

Inspired by funded startup products.

Includes:

- Glassmorphism panels
- Gradient backgrounds
- Soft shadows
- Smooth hover animations
- Transition effects
- Animated counters
- Status badges
- Skeleton loaders
- Fully responsive layouts
- Dark mode toggle (persisted in localStorage)

### Advanced Tailwind Usage

- Custom theme configuration
- Extended color palette
- Custom animations
- Utility composition
- Responsive grid systems

UI feels modern, polished, and production-ready.

---

# 🧩 State Management Strategy

Global Contexts:

- AuthContext
- ListingsContext

State handled using:

- useReducer for predictable updates
- Fully typed actions
- Centralized business logic

Custom Hooks:

- useAuth()
- useListings()
- useCountdown()
- useLocalStorage()

✅ No prop drilling  
✅ Persistent data via localStorage  

---

# 📊 TypeScript Data Models

Strict interfaces defined for:

- `User`
- `Listing`
- `Request`
- `Location`

Enums used for:

- ListingStatus
- RequestStatus
- UserRole

🚫 No `any` types  
🚫 No loosely typed state  

---

# ⚡ UX Standards

- Fully responsive (mobile-first)
- Accessible buttons & labels
- Keyboard-friendly modals
- Smooth transitions
- Empty states
- Error states
- Loading skeletons
- Live updating expiry countdown
- Clear status feedback

---

# 🧪 Code Quality Standards

- Strict TypeScript enforcement
- No `any`
- Reusable components
- Clean naming conventions
- Separation of UI & business logic
- No duplicated code
- Well-commented logic
- Scalable architecture

---

# 📦 Performance Optimizations

- Lazy-loaded routes (code splitting)
- Memoization where necessary
- Efficient reducer updates
- Avoid unnecessary re-renders
- Optimized image previews
- Efficient countdown updates

---

# 🛠 Future Upgrades

## 🚀 Planned Enhancements

- 🔗 Backend integration (Node.js / Spring Boot)  
- 🔐 Real authentication & role-based access control  
- ☁️ Cloud database integration  
- ⚡ Real-time request tracking  
- 🗺 Google Maps API integration  
- 🔔 Push notifications  
- 📊 Donation analytics dashboard with advanced charts  
- 📩 SMS / Email pickup notifications  
- 🛡 Admin monitoring panel  
- ✅ NGO verification system  
- 🤖 AI-based expiry prediction  
- 📈 Impact reporting system  
- 📱 Progressive Web App (PWA) support  
- 🌍 Multi-city expansion logic  

The current architecture is designed to scale seamlessly into a full-stack, production-grade platform.

---

# 🎯 Why This Project Stands Out

## 💡 Technical Highlights

**Food-Bridge Marketplace demonstrates:**

- 🏗 Advanced React architecture  
- 📦 Feature-based scalable structure  
- 🔄 Complex state management without Redux  
- ⏳ Real-time countdown logic implementation  
- 🎯 Dynamic filtering system  
- 🔒 Strict TypeScript discipline (no `any`)  
- ✨ SaaS-level UI engineering  
- 🌱 Social impact-focused product thinking  

---

📄 License

MIT License

---

👨‍💻 Author

Kamalesh P
Aspiring Java Developer | React + TypeScript Developer

