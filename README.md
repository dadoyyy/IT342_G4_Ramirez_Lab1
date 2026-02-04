# IT342_G4_Ramirez_Lab1 - MediGo Authentication System

Full-stack authentication mini-app with React frontend and Node.js backend.

## Project Structure

```
IT342_G4_Ramirez_Lab1/
├── web/          # React frontend (Vite)
├── backend/      # Node.js + Express API
├── mobile/       # Mobile app (future)
├── docs/         # Documentation
└── README.md
```

## Quick Start

### 1. Start Backend (Terminal 1)

```cmd
cd backend
npm install
npm run dev
```

Backend runs on: **http://localhost:3001**

### 2. Start Frontend (Terminal 2)

```cmd
cd web
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173** (or 5174)

## Features

✅ User Registration with validation  
✅ User Login with JWT authentication  
✅ Protected Dashboard route  
✅ Profile information display  
✅ Logout functionality  
✅ Modern web app layout with sidebar navigation  
✅ Real-time error handling  
✅ Token-based session management

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/logout` - Logout user (protected)

## Tech Stack

**Frontend:**
- React 19
- React Router DOM
- Vite
- CSS3

**Backend:**
- Node.js + Express
- JWT (jsonwebtoken)
- bcryptjs
- CORS enabled

## Development

Both servers support hot reload during development.

For more details, see:
- [Backend README](backend/README.md)
- [Frontend README](web/README.md)

## How to Use

1. Start both backend and frontend servers
2. Open http://localhost:5173 in your browser
3. Register a new account
4. Login with your credentials
5. View your dashboard with profile info and stats
6. Logout when done
