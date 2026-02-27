package com.csit284.mobile.models

// Request models
data class LoginRequest(
    val email: String,
    val password: String
)

data class RegisterRequest(
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String
)

// Response models
data class LoginResponse(
    val message: String,
    val user: User,
    val token: String
)

data class RegisterResponse(
    val message: String,
    val user: User,
    val token: String
)

data class LogoutResponse(
    val message: String
)

data class ErrorResponse(
    val message: String,
    val errors: List<String>? = null
)
