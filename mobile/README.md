# MiniApp - Android Mobile Application

This is the Android mobile application for MiniApp, built with Kotlin. It replicates all functionality from the web application with a mobile-optimized design.

## Features

### Authentication
- **User Registration**: Create new accounts with validation
  - First Name, Last Name, Email, Password fields
  - Password requirements validation:
    - More than 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one special character
  
- **User Login**: Secure login with JWT token authentication
  - Email and password validation
  - Persistent session management
  
- **Logout**: Secure logout with confirmation dialog

### User Dashboard
- **Profile Information Display**
  - Name, Email, User ID
  - Account status indicator
  
- **Stats Cards**
  - Account Status (Active)
  - User ID display
  
- **Quick Actions**
  - View Full Profile button
  - Logout button
  
- **Navigation Drawer**
  - Dashboard
  - Profile
  - Logout

### Profile Page
- **Detailed User Information**
  - Large profile avatar with user initials
  - Full name and email
  - Active Member badge
  
- **Personal Information Section**
  - First Name
  - Last Name
  - Email Address
  - Account Status
  - User ID
  
- **Action Button**
  - Logout with confirmation

## Technical Implementation

### Architecture
- **MVVM-inspired Architecture**: Separation of concerns with Activities, ViewModels, and Data Models
- **Kotlin Coroutines**: For asynchronous operations
- **ViewBinding**: Type-safe view binding
- **Material Design 3**: Modern UI components

### Dependencies
- **Retrofit 2.9.0**: REST API communication
- **Gson**: JSON serialization/deserialization
- **OkHttp Logging Interceptor**: Network request/response logging
- **Kotlin Coroutines 1.7.3**: Asynchronous programming
- **AndroidX Lifecycle Components**: ViewModel and LiveData
- **Material Components**: Material Design UI components
- **CardView**: Card-based layouts

### Project Structure
```
mobile/app/src/main/
├── java/com/csit284/mobile/
│   ├── api/
│   │   ├── ApiService.kt          # API endpoints interface
│   │   └── RetrofitClient.kt      # Retrofit configuration
│   ├── models/
│   │   ├── User.kt                # User data model
│   │   └── AuthModels.kt          # Auth request/response models
│   ├── utils/
│   │   └── SessionManager.kt      # Session & token management
│   ├── LoginActivity.kt           # Login screen
│   ├── RegisterActivity.kt        # Registration screen
│   ├── DashboardActivity.kt       # Dashboard screen
│   ├── ProfileActivity.kt         # Profile screen
│   └── MainActivity.kt            # (Legacy, kept for reference)
└── res/
    ├── layout/
    │   ├── activity_login.xml
    │   ├── activity_register.xml
    │   ├── activity_dashboard.xml
    │   ├── activity_profile.xml
    │   └── nav_header.xml         # Navigation drawer header
    ├── drawable/
    │   ├── auth_gradient_background.xml   # Purple gradient background
    │   ├── avatar_background.xml          # User avatar background
    │   ├── error_background.xml           # Error message background
    │   ├── badge_background.xml           # Badge styling
    │   ├── info_item_background.xml       # Info item background
    │   └── ic_menu.xml                    # Menu icon
    ├── menu/
    │   └── nav_menu.xml           # Navigation drawer menu
    ├── values/
    │   ├── colors.xml             # Color definitions (matching web app)
    │   ├── strings.xml            # String resources
    │   └── themes.xml             # App themes
    └── AndroidManifest.xml        # App configuration
```

## Design System

### Colors (Matching Web App)
- **Primary**: #6366F1 (Indigo)
- **Primary Dark**: #4F46E5
- **Primary Light**: #818CF8
- **Danger**: #EF4444 (Red)
- **Success**: #10B981 (Green)
- **Info Blue**: #3B82F6
- **Gray Scale**: From #F9FAFB to #111827

### Typography
- **Titles**: 24-32sp, Bold
- **Body**: 14-16sp, Regular
- **Small Text**: 12sp, Regular

### Components
- **Cards**: 12dp corner radius, 4dp elevation
- **Buttons**: 56dp height, 12dp corner radius
- **Avatars**: Circular with gradient background
- **Input Fields**: Material Design text fields with 12dp radius

## API Integration

### Backend Configuration
The app connects to the backend API at:
- **Emulator**: `http://10.0.2.2:8080/api/`
- **Physical Device**: Update BASE_URL in `RetrofitClient.kt` with your computer's IP address

### Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (requires Bearer token)
- `POST /auth/logout` - Logout (requires Bearer token)

### Authentication
- JWT token-based authentication
- Token stored in SharedPreferences
- Automatic token inclusion in API requests via Bearer token
- Session persistence across app restarts

## Setup Instructions

### Prerequisites
1. Android Studio (Latest version recommended)
2. Android SDK API 24 or higher
3. Backend server running (see backend folder)

### Installation
1. Open the `mobile` folder in Android Studio
2. Sync Gradle dependencies
3. Update the API base URL if needed:
   - Open `app/src/main/java/com/csit284/mobile/api/RetrofitClient.kt`
   - Change `BASE_URL` to your backend server address
4. Run the app on an emulator or physical device

### Running the Backend
Before using the mobile app, ensure the backend server is running:
```bash
cd backend
npm install
npm start
```

The backend should be accessible at `http://localhost:8080`

## Testing Credentials
Use the same test accounts created via the web app, or register a new account through the mobile app.

## Features Comparison with Web App

### Implemented ✓
- User Registration with validation
- User Login
- Dashboard with user stats
- Profile page with detailed information
- Logout with confirmation
- Session persistence
- Navigation between screens
- Matching color scheme and design

### Mobile-Specific Enhancements
- Portrait-only orientation for better UX
- Navigation drawer for easy navigation
- Touch-optimized UI elements
- Swipe gestures for drawer
- Mobile-optimized layouts
- Responsive design for different screen sizes

## Known Limitations
1. **Network Configuration**: 
   - Requires `usesCleartextTraffic="true"` for HTTP connections
   - For production, use HTTPS endpoints
   
2. **Emulator Access**:
   - Use `10.0.2.2` to access localhost from Android emulator
   - Physical devices need the computer's IP address

## Security Considerations
- Passwords are hashed on the backend (bcrypt)
- JWT tokens stored securely in SharedPreferences
- Network logging enabled for debugging (disable for production)
- Password visibility toggle for better UX

## Future Enhancements
- [ ] Remember me functionality
- [ ] Biometric authentication
- [ ] Profile picture upload
- [ ] Push notifications
- [ ] Offline mode with data caching
- [ ] Dark mode support
- [ ] Multi-language support

## Troubleshooting

### Cannot connect to backend
- **Emulator**: Ensure backend is running and use `10.0.2.2:8080`
- **Physical Device**: 
  - Ensure device and computer are on the same network
  - Update `BASE_URL` with your computer's IP address
  - Check firewall settings

### Build Errors
- Sync Gradle dependencies: `File -> Sync Project with Gradle Files`
- Clean and rebuild: `Build -> Clean Project` then `Build -> Rebuild Project`
- Invalidate caches: `File -> Invalidate Caches / Restart`

### Login/Registration Fails
- Check backend server is running
- Check BASE_URL configuration
- Check Logcat for network errors
- Verify password meets all requirements

## Dependencies Version Information
- Kotlin: 1.9.0+
- Gradle: 8.0+
- Retrofit: 2.9.0
- Coroutines: 1.7.3
- Material: 1.10.0+
- AndroidX Core: 1.12.0+

## Contact & Support
For issues or questions, please refer to the main project documentation or contact the development team.

## License
This project is part of IT342 course work.
