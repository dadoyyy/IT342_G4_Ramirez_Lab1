package com.csit284.mobile.utils

import android.content.Context
import android.content.SharedPreferences
import com.csit284.mobile.models.User
import com.google.gson.Gson

class SessionManager(context: Context) {
    
    private val prefs: SharedPreferences = 
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    
    private val gson = Gson()
    
    companion object {
        private const val PREFS_NAME = "miniapp_prefs"
        private const val KEY_TOKEN = "token"
        private const val KEY_USER = "user"
        private const val KEY_IS_LOGGED_IN = "is_logged_in"
    }
    
    fun saveAuthToken(token: String) {
        prefs.edit().putString(KEY_TOKEN, token).apply()
        prefs.edit().putBoolean(KEY_IS_LOGGED_IN, true).apply()
    }
    
    fun getAuthToken(): String? {
        return prefs.getString(KEY_TOKEN, null)
    }
    
    fun saveUser(user: User) {
        val userJson = gson.toJson(user)
        prefs.edit().putString(KEY_USER, userJson).apply()
    }
    
    fun getUser(): User? {
        val userJson = prefs.getString(KEY_USER, null)
        return if (userJson != null) {
            gson.fromJson(userJson, User::class.java)
        } else {
            null
        }
    }
    
    fun isLoggedIn(): Boolean {
        return prefs.getBoolean(KEY_IS_LOGGED_IN, false) && getAuthToken() != null
    }
    
    fun clearSession() {
        prefs.edit().clear().apply()
    }
    
    fun getBearerToken(): String {
        val token = getAuthToken()
        return if (token != null) "Bearer $token" else ""
    }
}
