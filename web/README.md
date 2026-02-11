# MediGo Web — User Authentication Frontend

Modern React + Vite frontend demonstrating a complete user authentication flow aligned with the ERD, use cases, activity diagram, and sequence diagram.

## Architecture Overview

This frontend visualizes:
- **ERD**: USERS table with fields (user_id, first_name, last_name, email, password, created_at, updated_at, status)
- **Use Cases**: Register Account, Login, View Profile, Logout
- **Activity Flow**: Guest → Register/Login → Validate → Dashboard → Logout
- **Sequence Diagram**: Registration → Login → Profile Fetch → Logout

## Tech Stack

- **React 19.2** – Component rendering
- **Vite 7.x** – Fast build tooling
- **Space Grotesk font** – Modern typography
- **Gradient-based UI** – Clean, dark theme with accessibility

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

**Option 1: Using cmd (recommended on Windows if PowerShell blocks scripts)**
```cmd
cmd /c "npm run dev"
```

**Option 2: Using PowerShell (if execution policy allows)**
```powershell
npm run dev
```

The app will be available at **http://localhost:5173** (or another port if 5173 is taken).

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
web/
├── src/
│   ├── App.jsx       # Main authentication UI (register/login toggle, ERD, flows)
│   ├── App.css       # Component-level styles (panels, forms, gradients)
│   ├── index.css     # Global theme and typography
│   └── main.jsx      # React entry point
├── package.json
└── vite.config.js
```

## Features

- **Register/Login Toggle**: Switch between flows in the UI
- **ERD Display**: All USERS fields shown with type annotations
- **Use Case Chips**: Visual representation of the four auth use cases
- **Activity Timeline**: Step-by-step flow from Start → Logout
- **Sequence Overview**: High-level API call summary embedded in the form card
- **Modern Gradient UI**: Space Grotesk font, dark background, and radial gradients

## Next Steps

1. Connect to Spring Boot backend (API endpoints: `/register`, `/login`, `/profile`, `/logout`)
2. Add form validation and error states
3. Implement JWT token management
4. Add protected route navigation

## Development Notes

- If you encounter PowerShell execution policy errors, use `cmd /c "npm run dev"` instead
- HMR (Hot Module Replacement) is enabled for rapid iteration
- ESLint is configured for code quality checks
