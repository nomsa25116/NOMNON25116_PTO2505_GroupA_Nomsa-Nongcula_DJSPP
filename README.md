# DJSPP -🎧 Podcast Explorer App (React Routing, Context API, Audio Player)

# 📌👉 Live Demo: https://nomnon-25116-pto-2505-group-a-nomsa.vercel.app/

This project is a React-based podcast explorer application that builds on core frontend development concepts such as routing, global state management, dynamic rendering, and UI persistence.

It enhances user experience by introducing episode favourites, a global audio player, dark mode toggle, and improved navigation flow between podcast content.

## ✨ Key Features
**🧭 Routing (React Router DOM)**

Uses react-router-dom for navigation between pages:
/ – Home page with all podcasts, search, filters, and sorting
/show/:id – Dynamic podcast detail page showing seasons and episodes

# 🎧 Global Audio Player
Persistent audio player across all pages
Continuous playback while navigating the app

# ⭐ Favourites System
-Mark episodes as favourites
-Stored globally using Context API

# 🌗 Dark Mode Toggle
-Light / dark theme switching
-Saved in localStorage
-Applies globally across the app

# 🔍 Search & Filtering
-Case-insensitive podcast search
-Dynamic filtering of results
-Improves content discovery

# 📺 Show Detail View
-Dynamic route /show/:id
-Displays seasons and episodes

# 🧠 State Management (Context API)
The application uses PodcastContext for global state:
-Podcast data management
-Search and filter logic
-Shared state across components

# 🔁 Application Flow
-Podcast data loads into global context on app start
-Home page displays all podcasts with search and filters
-Clicking a podcast opens /show/:id
-Users can favourite episodes from show pages
-Audio player continues working across all routes

# 🚀 How to Run the Project

1. Clone the repository - git clone <your-repo-link>

2. Navigate into the project - cd podcast-explorer

3. Install dependencies - npm install
   
4. Start development server - npm run dev
   
5. Open in browser - http://localhost:5173

# 🌐 Deployment

This project is deployed using Vercel:

**Steps**:
1. Push project to GitHub
2. Import repository into Vercel
3. Deploy using default React/Vite settings

# 🎯 Key Learning Outcomes
-Component-based React architecture
-React Router DOM navigation
-Context API global state management
-Persistent UI state using localStorage
-Audio player integration across routes
-Real-world frontend UX design patterns
-Deployment workflow using Vercel