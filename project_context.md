# Project Context: Sports+ Admin Dashboard

This project is a React-based Admin Dashboard for "Sports+", exported from Figma Make and configured for a modern development workflow.

## Tech Stack
- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with [CSS Variables](src/styles/default_theme.css)
- **UI Components**: Custom components based on [shadcn/ui](https://ui.shadcn.com/) patterns (using Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React `useState` (Local)
- **Animations**: [Motion](https://www.framer.com/motion/)

## Project Structure
```text
/
├── index.html            # Vite entry HTML
├── package.json          # Dependencies and scripts (npm run dev)
├── vite.config.ts        # Vite & Tailwind configuration
├── src/
│   ├── main.tsx          # React application entry point
│   ├── app/
│   │   ├── App.tsx       # Root component with sidebar navigation and routing logic
│   │   └── components/
│   │       ├── dashboard/# Feature-specific components (Overview, Users, Reports, etc.)
│   │       └── ui/       # Reusable primitive UI components (Button, Input, Sidebar, etc.)
│   └── styles/
│       ├── index.css     # Tailwind entry and global imports
│       ├── globals.css   # Base styles and Tailwind utilities
│       └── default_theme.css # CSS variables for colors, spacing, and theming
```

## Key Features
1. **Dynamic Navigation**: Sidebar-based navigation between different administrative sections.
2. **Dashboard Overview**: Metrics, quick actions, user growth charts, and report distribution.
3. **User Management**: Table-based view for managing users, roles, and account status.
4. **Report Management**: Interface for reviewing and acting on user-submitted reports.
5. **AI Verification**: specialized dashboard for managing AI-verified player statuses.
6. **Dark Mode Support**: Built-in toggle for switching between light and dark themes.

## Setup & Development
- **Install Dependencies**: `npm install`
- **Start Dev Server**: `npm run dev`
- **Build for Production**: `npm run build`

## Notable Implementations
- **Import Suffix Fix**: The project was originally exported with pnpm-specific versioned imports (e.g., `package@version`). These have been stripped to standard npm imports for compatibility.
- **Path Aliasing**: `@` is configured in `vite.config.ts` to point to `./src/app`, though current imports use relative paths for stability.
