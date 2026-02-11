
# IT342_G4_Ramirez_Lab1 - MiniApp

A full-stack authentication system with user management capabilities built for IT342 lab coursework.

## 📋 Project Description

MiniApp is a secure user authentication and profile management application that demonstrates modern full-stack development practices. Users can register with validated credentials, log in securely, view their personalized dashboard, and manage their profile information. The application features JWT-based authentication, password validation, session persistence, and a clean, responsive user interface.

**Key Features:**
- User registration with strong password requirements
- Secure login with JWT token-based authentication
- Persistent sessions across page refreshes
- User dashboard with personalized welcome message
- Profile management page
- Logout functionality with confirmation
- Password validation (uppercase, lowercase, special characters, minimum length)
- Protected routes requiring authentication

## 🛠️ Tech Stack

### Backend (Dual Architecture)
- **Node.js Backend** (Primary - Port 3001)
  - Express.js 4.18.2
  - MySQL2 3.6.5 (database driver)
  - bcryptjs 2.4.3 (password hashing)
  - jsonwebtoken 9.0.2 (JWT authentication)
  - CORS support
  - Nodemon (development)

- **Spring Boot Backend** (Secondary - Port 8080)
  - Spring Boot 4.0.2
  - Java 17 (JDK 17 required)
  - Spring Data JPA
  - Hibernate 7.2.1.Final
  - MySQL Connector
  - Maven build tool

### Frontend
- React 18.3.1
- Vite 5.4.10 (build tool & dev server)
- React Router DOM 7.1.1 (routing)
- Modern CSS with responsive design

### Database
- MySQL 8.0+ (tested with MySQL Community Server)

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ and npm
- **Java JDK 17** (for Spring Boot backend)
- **MySQL 8.0+** installed and running
- Git

### Database Setup

1. **Install MySQL** (if not already installed):
   - Download from [MySQL Community Downloads](https://dev.mysql.com/downloads/mysql/)
   - Install and set up root user (no password for development, or remember your password)

2. **Create Database and Tables**:
   
   Open MySQL command line or MySQL Workbench and run:
   ```sql
   -- Create the database
   CREATE DATABASE IF NOT EXISTS miniapp_db;
   
   -- Use the database
   USE miniapp_db;
   
   -- Create users table
   CREATE TABLE IF NOT EXISTS users (
     user_id INT AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(100) NOT NULL,
     last_name VARCHAR(100) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     status ENUM('pending', 'active', 'locked') DEFAULT 'active'
   );
   
   -- Create index for faster email lookups
   CREATE INDEX idx_email ON users(email);
   ```

   **OR** Import the schema file:
   ```bash
   # Navigate to database folder
   cd backend/database
   
   # Import schema
   mysql -u root -p < schema.sql
   ```

3. **Verify Database**:
   ```sql
   SHOW DATABASES;
   USE miniapp_db;
   SHOW TABLES;
   DESCRIBE users;
   ```

## 🎯 How to Run

### 1. Run Node.js Backend (Port 3001) - REQUIRED for Web App

The Node.js backend is the primary backend used by the React frontend.

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Configure Environment Variables**:
   
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=3001
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=miniapp_db
   ```

3. **Install dependencies** (first time only):
   ```bash
   npm install
   ```

4. **Start the server**:
   
   **Development mode** (with auto-restart):
   ```bash
   npm run dev
   ```
   
   **Production mode**:
   ```bash
   npm start
   ```

5. **Verify it's running**:
   - You should see: `🚀 MiniApp Backend API running on http://localhost:3001`
   - Test the status endpoint: `http://localhost:3001/api/status`

**Troubleshooting**:
- If port 3001 is already in use:
  ```bash
  # Windows
  netstat -ano | findstr :3001
  taskkill /F /PID <process_id>
  
  # macOS/Linux
  lsof -i :3001
  kill -9 <process_id>
  ```

### 2. Run Spring Boot Backend (Port 8080) - OPTIONAL

The Spring Boot backend is a secondary backend for Java/JPA demonstrations.

1. **Navigate to Spring Boot directory**:
   ```bash
   cd backend/mini-app
   ```

2. **Configure Database**:
   
   Edit `src/main/resources/application.properties`:
   ```properties
   spring.application.name=mini-app
   
   # MySQL Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/miniapp_db
   spring.datasource.username=root
   spring.datasource.password=
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   
   # JPA/Hibernate
   spring.jpa.show-sql=true
   spring.jpa.hibernate.ddl-auto=update
   
   # Server Port
   server.port=8080
   ```

3. **Set Java 17** (CRITICAL):
   
   **Windows**:
   ```powershell
   $env:JAVA_HOME='C:\Program Files\Java\jdk-17'
   ```
   
   **macOS/Linux**:
   ```bash
   export JAVA_HOME=/path/to/jdk-17
   ```

4. **Run the application**:
   
   **Using Maven wrapper (Windows)**:
   ```bash
   mvnw.cmd spring-boot:run
   ```
   
   **Using Maven wrapper (macOS/Linux)**:
   ```bash
   ./mvnw spring-boot:run
   ```
   
   **Or build and run JAR**:
   ```bash
   mvnw.cmd clean package
   java -jar target/mini-app-0.0.1-SNAPSHOT.jar
   ```

5. **Verify**: Visit `http://localhost:8080`

### 3. Run Web Frontend (Port 5173)

1. **Navigate to web directory**:
   ```bash
   cd web
   ```

2. **Install dependencies** (first time only):
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Open browser to: `http://localhost:5173`
   - Default Vite dev server runs on port 5173

5. **Build for production** (optional):
   ```bash
   npm run build
   npm run preview
   ```

**Note**: The web app connects to the **Node.js backend on port 3001**, not the Spring Boot backend.

### 4. Run Mobile App

The `mobile/` folder is currently a placeholder for future mobile development.

**To add mobile support**:
1. Choose a framework (React Native, Flutter, etc.)
2. Create project in `mobile/` directory
3. Update this README with mobile setup instructions

## ⚙️ Configuration & Environment Variables

### Backend (Node.js) - `backend/.env`
```env
PORT=3001                    # Server port
JWT_SECRET=your-secret-key   # Secret for JWT token signing (CHANGE IN PRODUCTION!)
DB_HOST=localhost            # MySQL host
DB_USER=root                 # MySQL username
DB_PASSWORD=                 # MySQL password (empty for development)
DB_NAME=miniapp_db          # Database name
```

**Security Note**: Never commit `.env` file to version control. Change `JWT_SECRET` before deploying to production.

### Backend (Spring Boot) - `backend/mini-app/src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/miniapp_db
spring.datasource.username=root
spring.datasource.password=
server.port=8080
spring.jpa.hibernate.ddl-auto=update
```

### Frontend - API Configuration

The frontend API base URL is configured in `web/src/services/api.js`:
```javascript
const API_URL = 'http://localhost:3001/api/auth'
```

To change the backend URL (e.g., for production), edit this constant.

## 📡 API Endpoints

All Node.js backend endpoints are prefixed with `/api/auth` and run on port **3001**.

### Public Endpoints (No Authentication Required)

#### `POST /api/auth/register`
Create a new user account.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Password Requirements**:
- More than 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one special character

**Success Response** (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "user_id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "status": "active",
    "created_at": "2026-02-11T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (400):
```json
{
  "message": "Password does not meet requirements",
  "errors": [
    "Password must be more than 8 characters",
    "Password must contain at least one uppercase letter"
  ]
}
```

#### `POST /api/auth/login`
Authenticate user and receive JWT token.

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Success Response** (200):
```json
{
  "message": "Login successful",
  "user": {
    "user_id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "status": "active"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (401):
```json
{
  "message": "Invalid credentials"
}
```

### Protected Endpoints (Requires Authentication)

**Authentication**: Include JWT token in request header:
```
Authorization: Bearer <your-jwt-token>
```

#### `GET /api/auth/profile`
Get current user's profile information.

**Success Response** (200):
```json
{
  "user": {
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "status": "active",
    "created_at": "2026-02-11T10:30:00.000Z",
    "updated_at": "2026-02-11T10:30:00.000Z"
  }
}
```

**Error Response** (401):
```json
{
  "message": "Invalid or expired token"
}
```

#### `POST /api/auth/logout`
Log out current user (invalidates session on client side).

**Success Response** (200):
```json
{
  "message": "Logged out successfully"
}
```

### Status Endpoint

#### `GET /api/status`
Check if the backend server is running.

**Success Response** (200):
```json
{
  "status": "OK",
  "message": "MiniApp Backend API is running",
  "timestamp": "2026-02-11T10:30:00.000Z"
}
```

## 🗂️ Project Structure

```
IT342_G4_Ramirez_Lab1/
├── backend/                    # Node.js backend (PRIMARY)
│   ├── config/
│   │   └── database.js        # MySQL connection pool
│   ├── database/
│   │   ├── schema.sql         # Database schema
│   │   └── SETUP.md           # Database setup guide
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   └── User.js            # User data access layer
│   ├── routes/
│   │   └── auth.js            # Authentication routes
│   ├── mini-app/              # Spring Boot backend (SECONDARY)
│   │   ├── src/main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   ├── pom.xml
│   │   └── mvnw.cmd
│   ├── .env                   # Environment variables (create this)
│   ├── package.json
│   └── server.js              # Node.js entry point
├── web/                       # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── LogoutConfirm.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Profile.jsx
│   │   ├── services/
│   │   │   └── api.js         # API communication
│   │   ├── App.jsx            # Main app with routing
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   └── vite.config.js
├── mobile/                    # Placeholder for mobile app
├── docs/                      # Documentation
└── README.md                  # This file
```

## 🧪 Testing the Application

### Manual Testing Flow

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd web && npm run dev`
3. **Open Browser**: `http://localhost:5173`

**Test Registration**:
1. Click "Register" link
2. Fill in form with valid data (remember password requirements!)
3. Submit - should redirect to Dashboard

**Test Login**:
1. Use registered credentials
2. Submit - should redirect to Dashboard
3. See personalized welcome message

**Test Protected Routes**:
1. Navigate to Profile page
2. Refresh browser - should stay logged in
3. Open new tab with same URL - should remain authenticated

**Test Logout**:
1. Click Logout button
2. Confirm in modal
3. Should redirect to Login page

## 🔒 Security Notes

- Passwords are hashed with bcrypt (salt rounds: 10)
- JWT tokens expire after 24 hours
- Protected routes require valid JWT token
- Email addresses are unique (enforced at database level)
- CORS is enabled for development (configure for production)
- **IMPORTANT**: Change `JWT_SECRET` before production deployment
- Never commit `.env` files to version control

## 🐛 Troubleshooting

### Backend won't start
- Check if MySQL is running: `mysql -u root -p`
- Verify database exists: `SHOW DATABASES;`
- Check port 3001 is not in use
- Ensure `.env` file exists with correct values

### Frontend connection refused
- Verify Node.js backend is running on port 3001
- Check API_URL in `web/src/services/api.js`
- Check browser console for CORS errors

### Password validation errors
- Ensure password is MORE than 8 characters (minimum 9)
- Include at least one uppercase letter (A-Z)
- Include at least one lowercase letter (a-z)
- Include at least one special character (!@#$%^&*()_+-=[]{};':"\\|,.<>/?)

### Spring Boot won't compile
- Verify Java 17 is installed: `java -version`
- Set JAVA_HOME to JDK 17 path
- Run `mvnw.cmd clean install` to rebuild

### Session lost on refresh
- Check browser localStorage for 'token' and 'user' keys
- Verify AuthContext is loading from localStorage
- Check browser console for authentication errors

## 👥 Contributors

IT342 Group 4 - Ramirez Lab Team

## 📄 License

This project is created for educational purposes as part of IT342 coursework.
