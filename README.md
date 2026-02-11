
# IT342_G4_Ramirez_Lab1

Project repository for the IT342 group lab work. This project contains a Java "mini-app" backend, a React web frontend, and a placeholder for a mobile app.

**Project Description**: A small full-stack sample application used for the course lab. The backend is a Maven-based Java application (Spring Boot), the web frontend is a React app bootstrapped with Vite, and a `mobile/` folder is reserved for mobile code.

**Technologies Used**
- **Backend**: Java, Spring Boot, Maven
- **Web**: React, Vite, JavaScript
- **Build tools**: Maven (backend), npm + Vite (web)
- **Platform**: JVM (OpenJDK 11+ recommended)

**Run the backend**
- Open a terminal and change directory:

	`cd backend\mini-app`

- On Windows (using the included wrapper):

	`mvnw.cmd spring-boot:run`

- On macOS / Linux (if needed):

	`./mvnw spring-boot:run`

- Alternatively, run the built JAR (requires a Java runtime):

	`java -jar target\mini-app-0.0.1-SNAPSHOT.jar`

- Default server address: `http://localhost:8080` (confirm in `application.properties`)

**Run the web app (frontend)**
- Change directory to the web frontend:

	`cd web`

- Install dependencies (one-time):

	`npm install`

- Start the dev server (Vite):

	`npm run dev`

- The dev server usually opens at `http://localhost:5173` (check the terminal output).

**Run the mobile app**
- The `mobile/` folder currently contains no app. Add your mobile project (React Native, Flutter, or similar) under `mobile/` and include platform-specific start instructions.

**List of API endpoints**
The repository currently does not expose a machine-readable list of controller routes. Below are common endpoints used by the project frontends — treat these as examples and update them to match the actual controllers in `backend/mini-app`.

- `POST /api/auth/login` — authenticate user and return token/session
- `POST /api/auth/register` — create a new user
- `GET /api/users` — list users (protected)
- `GET /api/profile` — get the current user profile (protected)
-- `GET /api/status` — status endpoint

To discover the real endpoints for this backend:
- Start the backend (`mvnw spring-boot:run` or run the JAR)
- Visit `http://localhost:8080` and test endpoints with `curl` or Postman
- If the source controllers are present, inspect `src/main/java/.../controller` or search for `@RestController` annotations in the backend source.

If you'd like, I can:
- search the repo for references to specific endpoints and update this list, or
- run the backend and probe for endpoints, then update the README with exact routes.

---

If you want me to commit and push this `README.md` change, tell me and I'll run the git commit + push commands for you.
