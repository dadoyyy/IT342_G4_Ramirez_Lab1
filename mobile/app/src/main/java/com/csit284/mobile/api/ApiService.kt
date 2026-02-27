package com.csit284.mobile.api

import com.csit284.mobile.models.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    
    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<RegisterResponse>
    
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>
    
    @GET("auth/profile")
    suspend fun getProfile(@Header("Authorization") token: String): Response<User>
    
    @POST("auth/logout")
    suspend fun logout(@Header("Authorization") token: String): Response<LogoutResponse>
}
