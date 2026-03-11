# MiniApp Backend API

Authentication API for the MiniApp application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run dev
```

The API will run on `http://localhost:3001`

## API Endpoints

### Authentication

#### Register
- **POST** `/api/auth/register`
- Body: `{ firstName, lastName, email, password }`
- Response: `{ message, user, token }`

#### Login
- **POST** `/api/auth/login`
- Body: `{ email, password }`
- Response: `{ message, user, token }`

#### Get Profile (Protected)
- **GET** `/api/auth/profile`
- Headers: `Authorization: Bearer <token>`
- Response: `{ user }`

#### Logout (Protected)
- **POST** `/api/auth/logout`
- Headers: `Authorization: Bearer <token>`
- Response: `{ message }`

## Technology Stack

- Node.js + Express
- JWT for authentication
- bcryptjs for password hashing
- In-memory storage (replace with database in production)

## Environment Variables

Create a `.env` file:
```
PORT=3001
JWT_SECRET=your_secret_key
NODE_ENV=development
```
