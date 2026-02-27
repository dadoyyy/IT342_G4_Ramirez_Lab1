package com.csit284.mobile.models

import com.google.gson.annotations.SerializedName

data class User(
    @SerializedName("userId")
    val userId: Int? = null,
    @SerializedName("user_id")
    val user_id: Int? = null,
    @SerializedName("firstName")
    val firstName: String = "",
    @SerializedName("lastName")
    val lastName: String = "",
    @SerializedName("first_name")
    val first_name: String? = null,
    @SerializedName("last_name")
    val last_name: String? = null,
    @SerializedName("email")
    val email: String = ""
) {
    @JvmName("getFirstNameValue")
    fun getFirstName(): String {
        return firstName.ifEmpty { first_name ?: "" }
    }
    
    @JvmName("getLastNameValue")
    fun getLastName(): String {
        return lastName.ifEmpty { last_name ?: "" }
    }
    
    @JvmName("getUserIdValue")
    fun getUserId(): Int {
        return userId ?: user_id ?: 0
    }
    
    fun getInitials(): String {
        val first = getFirstName().firstOrNull()?.uppercase() ?: ""
        val last = getLastName().firstOrNull()?.uppercase() ?: ""
        return "$first$last"
    }
}
