package com.csit284.mobile

import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.lifecycle.lifecycleScope
import com.csit284.mobile.api.RetrofitClient
import com.csit284.mobile.databinding.ActivityProfileBinding
import com.csit284.mobile.utils.SessionManager
import com.google.android.material.navigation.NavigationView
import kotlinx.coroutines.launch

class ProfileActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {
    
    private lateinit var binding: ActivityProfileBinding
    private lateinit var sessionManager: SessionManager
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProfileBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        sessionManager = SessionManager(this)
        
        // Check if user is logged in
        if (!sessionManager.isLoggedIn()) {
            navigateToLogin()
            return
        }
        
        setupNavigationDrawer()
        loadUserData()
        setupClickListeners()
    }
    
    private fun setupNavigationDrawer() {
        binding.menuIcon.setOnClickListener {
            binding.drawerLayout.openDrawer(GravityCompat.START)
        }
        
        binding.navigationView.setNavigationItemSelectedListener(this)
    }
    
    private fun loadUserData() {
        val user = sessionManager.getUser()
        
        if (user != null) {
            val fullName = "${user.getFirstName()} ${user.getLastName()}"
            
            binding.userAvatar.text = user.getInitials()
            binding.profileAvatar.text = user.getInitials()
            binding.profileName.text = fullName
            binding.profileEmail.text = user.email
            binding.firstNameValue.text = user.getFirstName()
            binding.lastNameValue.text = user.getLastName()
            binding.emailAddressValue.text = user.email
            binding.userIdValue.text = "#${user.getUserId()}"
        }
    }
    
    private fun setupClickListeners() {
        binding.logoutButton.setOnClickListener {
            showLogoutDialog()
        }
    }
    
    private fun showLogoutDialog() {
        AlertDialog.Builder(this)
            .setTitle("Logout")
            .setMessage("Are you sure you want to logout?")
            .setPositiveButton("Logout") { _, _ ->
                performLogout()
            }
            .setNegativeButton("Cancel", null)
            .show()
    }
    
    private fun performLogout() {
        lifecycleScope.launch {
            try {
                val token = sessionManager.getBearerToken()
                if (token.isNotEmpty()) {
                    RetrofitClient.apiService.logout(token)
                }
            } catch (e: Exception) {
                // Ignore logout API errors
            } finally {
                sessionManager.clearSession()
                navigateToLogin()
            }
        }
    }
    
    private fun navigateToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        startActivity(intent)
        finish()
    }
    
    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.nav_dashboard -> {
                startActivity(Intent(this, DashboardActivity::class.java))
                finish()
            }
            R.id.nav_profile -> {
                // Already on profile
            }
            R.id.nav_logout -> {
                showLogoutDialog()
            }
        }
        binding.drawerLayout.closeDrawer(GravityCompat.START)
        return true
    }
    
    override fun onBackPressed() {
        if (binding.drawerLayout.isDrawerOpen(GravityCompat.START)) {
            binding.drawerLayout.closeDrawer(GravityCompat.START)
        } else {
            super.onBackPressed()
        }
    }
}
