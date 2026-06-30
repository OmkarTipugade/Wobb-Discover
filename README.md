# Wobb Influencer Discovery Dashboard

Wobb Influencer Discovery Dashboard is a high-performance, modern client-side web application designed for marketing and outreach teams. It enables users to explore, search, filter, and shortlist top influencers across three major social media platforms: **Instagram**, **YouTube**, and **TikTok**. 

This application offers an intuitive interface to build outreach campaign teams, analyze detailed creator metrics, and export shortlists for downstream outreach workflows.

---

## Core Features

### 1. Unified Search & Platform Filtering
- **Multi-Platform Navigation**: Seamlessly toggle index views between Instagram, YouTube, and TikTok with visual branding badges and custom gradient accents.
- **Accurate Search Indexing**: Filter creators in real-time by their handle, username, or full name. The search engine is fully case-insensitive and robust against missing metadata.

### 2. Influencer Detail Analytics
- **Dynamic Profile Loading**: Clicking a creator card dynamically loads in-depth audience metrics from localized JSON files on demand, optimizing initial network loads.
- **Key Metrics Displayed**: Check verification status, follower count, engagement rates, average views, posts count, average comments, and demographic constraints.

### 3. Persistent Campaign Shortlist (Cart System)
- **Zustand-powered Global State**: Shortlist creators into a global campaign list that persists across page refreshes using browser `localStorage` syncing.
- **Outreach Shortlist Panel**: A slide-out side drawer with a backdrop blur overlay to review current team members, view total counts, and easily delete entries or clear the shortlist.

### 4. CSV Shortlist Export
- **One-click Spreadsheet Download**: Compile the campaign team's details (User ID, Username, Full Name, Followers count) directly into a standardized CSV file for upload into CRM or outreach platforms.

### 5. Premium UI/UX & Dark Mode
- **System-preferred Dark Mode**: Responsive light and dark modes customized with Outfit and Plus Jakarta Sans typography.
- **Responsive Layout**: Designed with fluid Tailwind CSS v4 grids and flex layouts, optimized for mobile screens, tablets, and high-resolution desktop monitors.
- **Micro-animations**: Enhanced with smooth hover elevations, slide transitions, page entry fades, and loading spinners.

---

### Data Pipeline
1. **Initial Load**: Platform index files (`search/*.json`) are loaded synchronously inside `dataHelpers.ts` to power instant dashboard search.
2. **On-Demand Resolution**: Granular user profiles (`profiles/*.json`) are code-split and loaded asynchronously inside `profileLoader.ts` using Vite's `import.meta.glob` path resolver when navigating to `/profile/:username`.

---

## Technical Stack

- **React 19**: Modern component-based view engine.
- **TypeScript**: Complete compile-time type-safety.
- **Vite 8**: Ultra-fast build toolchain and bundling.
- **Tailwind CSS v4 & Vanilla CSS Variables**: Fluid modern styles, custom scrollbars, transitions, and theme variables.
- **Zustand 5**: Minimal, reactive, and persistent state management store.
- **React Router v7**: Client-side routing.
- **React Icons**: Premium SVG iconography.

---

## Getting Started

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Local Development
Start the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
Compile and type-check the application for distribution:
```bash
npm run build
```

### 4. Linting
Verify stylistic and programming constraints:
```bash
npm run lint
```

### 5. Running Tests
Execute the unit test suite using Vitest:
```bash
npm run test
```
