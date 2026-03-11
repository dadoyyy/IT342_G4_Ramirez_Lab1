package com.csit284.mobile

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.csit284.mobile.api.RetrofitClient
import com.csit284.mobile.databinding.ActivityRegisterBinding
import com.csit284.mobile.models.RegisterRequest
import com.csit284.mobile.utils.SessionManager
import com.google.gson.Gson
import com.google.gson.JsonObject
import kotlinx.coroutines.launch
import java.util.regex.Pattern

class RegisterActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityRegisterBinding
    private lateinit var sessionManager: SessionManager
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        sessionManager = SessionManager(this)
        
        setupClickListeners()
    }
    
    private fun setupClickListeners() {
        binding.registerButton.setOnClickListener {
            val firstName = binding.firstNameInput.text.toString().trim()
            val lastName = binding.lastNameInput.text.toString().trim()
            val email = binding.emailInput.text.toString().trim()
            val password = binding.passwordInput.text.toString()
            
            if (validateInput(firstName, lastName, email, password)) {
                performRegister(firstName, lastName, email, password)
            }
        }
        
        binding.loginLink.setOnClickListener {
            finish() // Go back to login
        }
    }
    
    private fun validateInput(firstName: String, lastName: String, email: String, password: String): Boolean {
        if (firstName.isEmpty()) {
            showError("Please enter your first name")
            return false
        }
        
        if (lastName.isEmpty()) {
            showError("Please enter your last name")
            return false
        }
        
        if (email.isEmpty()) {
            showError("Please enter your email")
            return false
        }
        
        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            showError("Please enter a valid email address")
            return false
        }
        
        if (password.isEmpty()) {
            showError("Please enter a password")
            return false
        }
        
        // Validate password requirements
        val passwordErrors = validatePassword(password)
        if (passwordErrors.isNotEmpty()) {
            showError(passwordErrors.joinToString("\n"))
            return false
        }
        
        return true
    }
    
    private fun validatePassword(password: String): List<String> {
        val errors = mutableListOf<String>()
        
        if (password.length <= 8) {
            errors.add("• Password must be more than 8 characters")
        }
        
        if (!Pattern.compile("[A-Z]").matcher(password).find()) {
            errors.add("• Password must contain at least one uppercase letter")
        }
        
        if (!Pattern.compile("[a-z]").matcher(password).find()) {
            errors.add("• Password must contain at least one lowercase letter")
        }
        
        if (!Pattern.compile("[!@#\$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]").matcher(password).find()) {
            errors.add("• Password must contain at least one special character")
        }
        
        return errors
    }
    
    private fun performRegister(firstName: String, lastName: String, email: String, password: String) {
        lifecycleScope.launch {
            try {
                showLoading(true)
                hideError()
                
                val request = RegisterRequest(firstName, lastName, email, password)
                val response = RetrofitClient.apiService.register(request)
                
                if (response.isSuccessful && response.body() != null) {
                    val registerResponse = response.body()!!
                    
                    // Save user data and token
                    sessionManager.saveAuthToken(registerResponse.token)
                    sessionManager.saveUser(registerResponse.user)
                    
                    Toast.makeText(this@RegisterActivity, "Registration successful!", Toast.LENGTH_SHORT).show()
                    navigateToDashboard()
                } else {
                    val errorBody = response.errorBody()?.string()
                    val errorMessage = try {
                        val jsonObject = Gson().fromJson(errorBody, JsonObject::class.java)
                        val message = jsonObject.get("message")?.asString ?: "Registration failed"
                        val errors = jsonObject.get("errors")?.asJsonArray
                        if (errors != null && errors.size() > 0) {
                            val errorList = mutableListOf<String>()
                            for (error in errors) {
                                errorList.add("• ${error.asString}")
                            }
                            errorList.joinToString("\n")
                        } else {
                            message
                        }
                    } catch (e: Exception) {
                        "Registration failed"
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
        binding.registerButton.isEnabled = !show
        binding.firstNameInput.isEnabled = !show
        binding.lastNameInput.isEnabled = !show
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
