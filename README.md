# Nova Service Cloud UI

Nova Service Cloud is a front-end only experience built with **React**, **TypeScript**, and **Vite**. It delivers a modern ticketing mission control that surfaces live incident metrics, service requests, change calendars, knowledge recommendations, and role management in a polished, themeable workspace.

> ℹ️ This repository currently exposes UI/UX only—no backend or API integrations are wired yet.

## Highlights

- **Mission Control Dashboard** – Overview cards, major incident table, queue watch, knowledge signals, change timeline, and agent activity feed.
- **Operational Modules** – Dedicated views for incidents, service requests, changes, knowledge, users & roles, and approvers.
- **Authentication Surfaces** – Login, signup, and recovery flows with storytelling and testimonials.
- **Themes & Layouts** – Switch between multiple color themes and layout presets (classic, compact, crisp) from the settings page.
- **Persistent Nav Collapse** – Left rail can collapse/expand, remembering the user preference.
- **Componentized System** – Reusable layout, theme, and pagination utilities keep the UI consistent.

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Lint the project
npm run lint

# Build for production
npm run build
```

Open the dev server URL printed in your terminal (usually <http://localhost:5173>) to explore the UI.

## Project Structure

```
src/
├─ layouts/            # Application shell (sidebar, header)
├─ pages/              # Route-based pages (dashboard, incidents, settings, auth, etc.)
├─ context/            # Theme and layout providers
├─ styles/             # Shared color + layout tokens
├─ components/         # Reusable building blocks (pagination, etc.)
├─ hooks/              # Hooks such as layout application
├─ App.tsx             # Route configuration
├─ main.tsx            # App bootstrap with providers
└─ index.css           # Global base styles
```

## Customisation

- **Themes** – Update `src/styles/colors.css` to add or adjust palettes.
- **Layouts** – Modify `src/styles/layouts.css` to tweak radii, navigation widths, or layout presets.
- **Navigation** – Update `workspaceNav` in `src/layouts/WorkspaceLayout.tsx` to add/remove sections.

## Roadmap

- Wire up backend APIs for real ticket data
- Implement authentication and authorization flows
- Add accessibility audits and end-to-end tests

Feel free to fork and adapt the UI to fit your support workflows. If you run into issues or have suggestions, open an issue or drop a note.✨
