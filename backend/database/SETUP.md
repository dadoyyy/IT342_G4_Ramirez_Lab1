# MySQL Database Setup Guide

## Step 1: Start XAMPP

1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** modules
3. Click **Admin** button next to MySQL (opens phpMyAdmin)

## Step 2: Create Database in phpMyAdmin

1. In phpMyAdmin, click **New** in the left sidebar
2. Database name: `miniapp_db`
3. Collation: `utf8mb4_general_ci`
4. Click **Create**

## Step 3: Run SQL Schema

1. Select the `miniapp_db` database
2. Click the **SQL** tab
3. Copy the contents of `backend/database/schema.sql`
4. Paste into the SQL query box
5. Click **Go**

This will create the `users` table with these fields:
- `user_id` (Primary Key, Auto Increment)
- `first_name`
- `last_name`
- `email` (Unique)
- `password` (Hashed)
- `created_at`
- `updated_at`
- `status` (enum: pending/active/locked)

## Step 4: Configure Backend

The `.env` file is already configured with default XAMPP settings:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=miniapp_db
```

**If you have a MySQL password**, update `DB_PASSWORD` in `.env`

## Step 5: Install MySQL Package

```bash
cd backend
npm install
```

## Step 6: Restart Backend Server

Stop the current server (Ctrl+C) and restart:

```bash
npm run dev
```

You should see: **✅ MySQL Database connected successfully**

## Verify Connection

1. Register a new user in the frontend
2. Check phpMyAdmin → `miniapp_db` → `users` table
3. You should see the new user record

## Troubleshooting

**Connection failed?**
- Make sure MySQL is running in XAMPP
- Verify database name is `miniapp_db`
- Check if port 3306 is available
- Verify credentials in `.env`

**Table doesn't exist?**
- Run the SQL schema again in phpMyAdmin
- Make sure you selected the `miniapp_db` database first
