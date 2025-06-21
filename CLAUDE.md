# PolyMathAI Development Guidelines

## Project Overview
PolyMathAI is a Next.js application for personalized skill learning and development. The project helps users select skills, prioritize them, and create personalized learning schedules.

## Tech Stack Requirements
- **Framework**: Next.js 15+ with App Router
- **Language**: JavaScript (NO TypeScript)
- **Styling**: Traditional CSS with CSS modules (NO Tailwind CSS)
- **Database**: Supabase
- **State Management**: React hooks (useState, useEffect)
- **Package Manager**: npm

## Project Structure
```
src/app/
├── layout.js                 # Root layout with global styles
├── page.js                   # Landing/homepage
├── globals.css              # Global styles and variables
├── [route]/                 # Each route in its own directory
│   ├── page.js             # Main component for the route
│   └── [route].css         # Route-specific styles
```

## Coding Conventions

### JavaScript Patterns
```javascript
"use client";
import { useState } from "react";
import "./componentName.css";

export default function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);
  
  const handleAction = () => {
    // Handler logic
  };
  
  return (
    <div className="component-wrapper">
      {/* JSX content */}
    </div>
  );
}
```

### Key Rules
- Use `"use client"` directive for interactive components
- Arrow function exports for components
- Destructured props in parameters
- camelCase for file names (e.g., `skillSelect.js`)
- Use `className` attribute (not `class`)

### CSS Conventions
- Each component has its own CSS file with matching name
- Use descriptive class names (BEM-like approach)
- Mobile-first responsive design
- Breakpoints: 768px (tablet), 480px (mobile)

### Color Palette
```css
/* Primary Colors */
--primary-gradient: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
--primary-purple: #8b5cf6;
--primary-purple-dark: #a855f7;

/* Text Colors */
--text-primary: #1f2937;
--text-secondary: #374151;
--text-muted: #6b7280;

/* Background */
--background-gradient: linear-gradient(135deg, #f8f7ff 0%, #f0efff 100%);
--white: #ffffff;
```

### Layout Patterns
- Container max-width: 1200px
- Consistent padding: 2rem
- Header pattern: Purple gradient background with white text
- Button styles: Purple gradient with hover effects

## File Organization
- Route-based organization using Next.js App Router
- Colocation: Each route has its own directory with page.js and CSS
- Static assets in `/public/`
- Global styles in `src/app/globals.css`

## Development Workflow
1. Create new routes in `src/app/[routeName]/`
2. Add `page.js` with component
3. Add `[routeName].css` for styles
4. Import CSS in component
5. Test across mobile and desktop
6. Run linting: `npm run lint`

## Application Flow
1. Landing page (`/`) - Marketing introduction
2. Onboarding flow (`/onboarding`) - Multi-step process
3. Skill selection (`/skillSelect`) - Choose from 6 categories
4. Skill prioritization (`/skillPriority`) - Rank selected skills
5. Preferences (`/preferences`) - Set learning schedule

## Common Components Structure
- Header with navigation
- Main content area with consistent padding
- Responsive grid layouts
- Form elements with purple theming
- Progress indicators for multi-step flows

## Best Practices
- Use semantic HTML elements
- Implement proper accessibility
- Ensure mobile responsiveness
- Follow React best practices
- Keep components focused and reusable
- Use consistent naming conventions
- Test functionality before committing

## Testing Commands
- Lint: `npm run lint`
- Build: `npm run build`
- Dev server: `npm run dev`