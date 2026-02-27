package com.csit284.mobile

import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.lifecycle.lifecycleScope
import com.csit284.mobile.api.RetrofitClient
import com.csit284.mobile.databinding.ActivityDashboardBinding
import com.csit284.mobile.utils.SessionManager
import com.google.android.material.navigation.NavigationView
import kotlinx.coroutines.launch

class DashboardActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {
    
    private lateinit var binding: ActivityDashboardBinding
    private lateinit var sessionManager: SessionManager
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
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
            binding.welcomeText.text = "Welcome back, ${user.getFirstName()}!"
            binding.userAvatar.text = user.getInitials()
            binding.nameValue.text = "${user.getFirstName()} ${user.getLastName()}"
            binding.emailValue.text = user.email
            binding.userIdValue.text = "#${user.getUserId()}"
            binding.userIdDisplay.text = "#USR-${user.getUserId()}"
        }
    }
    
    private fun setupClickListeners() {
        binding.viewProfileButton.setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
        }
        
        binding.logoutButton.setOnClickListener {
            showLogoutDialog()
        }
        
        binding.userAvatar.setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
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
                // Already on dashboard
            }
            R.id.nav_profile -> {
                startActivity(Intent(this, ProfileActivity::class.java))
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
