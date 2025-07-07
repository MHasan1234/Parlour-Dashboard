# 👨‍💼 Parlour Management System (Admin Dashboard)

This is a full-stack **Parlour Admin Dashboard** project that includes features for managing **employees**, **tasks**, and **attendance tracking** in real-time. It supports two user roles: `super-admin` and `admin`.

---

## 🚀 Features

### 👥 User Roles

1. **Super Admin**
   - Can log in and access the entire dashboard
   - Can add, view, update, and delete **employees**
   - Can add, view, update, and delete **tasks**
   - Can view **live attendance logs**
   - Can delete **any data**

2. **Admin**
   - Can log in and access the dashboard
   - Can only view **employees** and **tasks**
   - Can view **live attendance logs**
   - Cannot create, update, or delete anything

---

## 🧪 Test Credentials

You can use the following credentials for demo purposes:

| Role           | Email                       | Password           |
|-------------- |--------------------         |--------------------|
| Super Admin   | super-admin@example.com     | superPassword123    |
| Admin          | admin@example.com          | securePassword123  |

---

## 🧩 Tech Stack

- **Frontend**: React, Axios, Bootstrap, WebSocket (Socket.IO)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS + Bootstrap

---

## 🖥️ Pages

### 1. `Login Page`
- JWT-based login
- Redirects to dashboard based on role

### 2. `Dashboard` (`/dashboard`)
- Employee Section
  - Super Admin: Add / Edit / Delete employees
  - Admin: View only

- Task Section
  - Super Admin: Add / Edit / Delete tasks
  - Admin: View only

- Attendance Section
  - View real-time punch-in / punch-out logs
  - Updates automatically using WebSocket

### 3. `Attendance Page` (`/attendance`)
- Public page for punching in/out
- Employees can punch in/out
- Admin dashboards reflect live updates via WebSocket

---

## 🔐 Authentication

- JWT-based token handling
- Tokens stored in `Authorization` header
- Middleware restricts routes based on user roles (`super-admin` or `admin`)

---
Screenshots
![image](https://github.com/user-attachments/assets/8f6d1784-f600-44b5-b31f-205ecfc585d7)
![image](https://github.com/user-attachments/assets/5b1203b9-bd70-4eb4-90c1-6900efc0cedc)
![image](https://github.com/user-attachments/assets/9bebf934-bf47-416d-bfc6-713f39ef4a9e)
![image](https://github.com/user-attachments/assets/8427a1e7-0d5b-453e-b262-5c2298296424)
![image](https://github.com/user-attachments/assets/653018e7-d384-4cd8-9440-4b570a34365a)
![image](https://github.com/user-attachments/assets/006385fa-725d-4ca8-884b-35c0e4c92635)


