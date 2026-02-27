# MiniApp Mobile - Quick Setup Guide

## Quick Start (3 Steps)

### 1. Open in Android Studio
```
- File -> Open -> Select the 'mobile' folder
- Wait for Gradle sync to complete
```

### 2. Configure Backend URL
Open: `app/src/main/java/com/csit284/mobile/api/RetrofitClient.kt`

**For Android Emulator:**
```kotlin
private const val BASE_URL = "http://10.0.2.2:8080/api/"
```

**For Physical Device:**
```kotlin
private const val BASE_URL = "http://YOUR_COMPUTER_IP:8080/api/"
```
*Replace YOUR_COMPUTER_IP with your actual IP address (e.g., 192.168.1.100)*

### 3. Run the App
```
- Click the green "Run" button in Android Studio
- Select your emulator or connected device
- App will launch with the Login screen
```

## Finding Your Computer's IP Address

**Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address" under your active network adapter

**Mac/Linux:**
```bash
ifconfig
```
Look for "inet" address under your active network interface

## Backend Setup (If Not Running)

```bash
cd backend
npm install
npm start
```

Backend should be running at: `http://localhost:8080`

## Testing the App

### Register a New Account
1. Click "Don't have an account? Register"
2. Fill in:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: Password123!
3. Click Register

### Login
1. Enter your email and password
2. Click Login
3. You'll be redirected to Dashboard

### Navigate
- Use the menu icon (☰) to open navigation drawer
- Switch between Dashboard and Profile
- Quick actions on Dashboard

### Logout
- Click Logout button
- Confirm in the dialog

## Common Issues

### "Unable to connect to server"
✓ Check backend is running (`npm start` in backend folder)
✓ Verify BASE_URL is correct
✓ For physical device, ensure same WiFi network

### "Build Failed"
✓ File -> Sync Project with Gradle Files
✓ Build -> Clean Project
✓ Build -> Rebuild Project

### "Password validation failed"
Password must have:
- More than 8 characters
- One uppercase letter
- One lowercase letter
- One special character

Example valid password: `MyPass123!`

## App Features Overview

**Login Screen**
- Email and password fields
- Form validation
- Error messages
- Link to Register

**Register Screen**
- First name, last name, email, password
- Password requirements display
- Real-time validation
- Link to Login

**Dashboard**
- Welcome message with user's first name
- Account status card
- User ID card
- Profile information summary
- Quick actions (View Profile, Logout)
- Navigation drawer

**Profile**
- Large avatar with initials
- Full name and email
- Detailed user information
- Account status
- Logout button
- Navigation drawer

## Design Features

✓ Purple gradient background (matching web app)
✓ Material Design 3 components
✓ Smooth animations
✓ Card-based layouts
✓ User avatars with initials
✓ Responsive design
✓ Portrait orientation locked

## Next Steps

After successful login:
1. Explore the Dashboard
2. Check your Profile
3. Test logout functionality
4. Try registering another account

## Need Help?

Check the full [README.md](README.md) for detailed documentation.

---

**Happy Testing! 🚀**
