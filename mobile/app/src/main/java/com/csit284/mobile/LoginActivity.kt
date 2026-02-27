package com.csit284.mobile

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.csit284.mobile.api.RetrofitClient
import com.csit284.mobile.databinding.ActivityLoginBinding
import com.csit284.mobile.models.LoginRequest
import com.csit284.mobile.utils.SessionManager
import com.google.gson.Gson
import com.google.gson.JsonObject
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityLoginBinding
    private lateinit var sessionManager: SessionManager
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        sessionManager = SessionManager(this)
        
        // Check if user is already logged in
        if (sessionManager.isLoggedIn()) {
            navigateToDashboard()
            return
        }
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        binding.loginButton.setOnClickListener {
            val email = binding.emailInput.text.toString().trim()
            val password = binding.passwordInput.text.toString()
            
            if (validateInput(email, password)) {
                performLogin(email, password)
            }
        }
        
        binding.registerLink.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }
    
    private fun validateInput(email: String, password: String): Boolean {
        if (email.isEmpty()) {
            showError("Please enter your email")
            return false
        }
        
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            showError("Please enter a valid email address")
            return false
        }
        
        if (password.isEmpty()) {
            showError("Please enter your password")
            return false
        }
        
        return true
    }
    
    private fun performLogin(email: String, password: String) {
        lifecycleScope.launch {
            try {
                showLoading(true)
                hideError()
                
                val request = LoginRequest(email, password)
                val response = RetrofitClient.apiService.login(request)
                
                if (response.isSuccessful && response.body() != null) {
                    val loginResponse = response.body()!!
                    
                    // Save user data and token
                    sessionManager.saveAuthToken(loginResponse.token)
                    sessionManager.saveUser(loginResponse.user)
                    
                    Toast.makeText(this@LoginActivity, "Login successful!", Toast.LENGTH_SHORT).show()
                    navigateToDashboard()
                } else {
                    val errorBody = response.errorBody()?.string()
                    val errorMessage = try {
                        val jsonObject = Gson().fromJson(errorBody, JsonObject::class.java)
                        jsonObject.get("message")?.asString ?: "Login failed"
                    } catch (e: Exception) {
                        "Login failed"
                    }
                    showError(errorMessage)
                }
            } catch (e: Exception) {
                showError("Network error: ${e.message}")
            } finally {
                showLoading(false)
            }
        }
    }
    
    private fun showLoading(show: Boolean) {
        binding.progressBar.visibility = if (show) View.VISIBLE else View.GONE
        binding.loginButton.isEnabled = !show
        binding.emailInput.isEnabled = !show
        binding.passwordInput.isEnabled = !show
    }
    
    private fun showError(message: String) {
        binding.errorText.text = message
        binding.errorText.visibility = View.VISIBLE
    }
    
    private fun hideError() {
        binding.errorText.visibility = View.GONE
    }
    
    private fun navigateToDashboard() {
        val intent = Intent(this, DashboardActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
}
