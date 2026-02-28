# Auth Demo: React + ASP.NET Core (JWT Custom Auth)

A full-stack demonstration of a modern authentication and authorization flow using a **React (TypeScript)** frontend and a **C# (ASP.NET Core)** backend. This project features a custom authentication implementation instead of relying on high-level frameworks like ASP.NET Identity, making it ideal for learning the underlying mechanics of JWT security.

## 🚀 Features

- **Custom JWT Authentication:** Full "from-scratch" implementation of login, registration, and token generation.
- **Role-Based Access Control (RBAC):** Granular authorization using "Admin" and "User" roles.
- **In-Memory Database:** Uses Entity Framework Core with an In-Memory provider for zero-configuration setup.
- **Secure Password Hashing:** Utilizes **BCrypt.Net** for industry-standard password security.
- **Modern UI:** Built with **Material UI (MUI)** for a clean, professional look.
- **Data Seeding:** Automatically initializes an `admin` user on backend startup.

---

## 🏗️ Architecture

### Backend (C# / .NET 10)
The backend follows the **Controller -> Service -> Repository** pattern for clean separation of concerns:
- **Controllers:** Manage HTTP requests and routing.
- **Services:** Contain business logic (Auth, Password Hashing, JWT logic).
- **Repositories:** Abstract database interactions.
- **Interfaces:** Ensure decoupling and facilitate unit testing.

### Frontend (React / Vite)
- **State Management:** Uses local storage for token persistence.
- **Routing:** Managed via `react-router-dom`.
- **API Communication:** Uses `axios` with manual token attachment in headers.
- **Security Logic:** Uses `jwt-decode` to read user roles directly from the token on the client side.

---

## 🛠️ Setup Instructions

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)

### 1. Start the Backend
```bash
cd backend/AuthDemo.Api
dotnet run
```
*The API will start at `http://localhost:5265`.*

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
*The frontend will usually be available at `http://localhost:5173`.*

---

## 🔐 Credentials

| Username | Password | Role |
| :--- | :--- | :--- |
| `admin` | `admin` | **Admin** |
| *New Users* | *Choice* | **User** (Default) |

### Testing the Flow
1. **Login as Admin:** You will see the "Admin Only Section" on the Weather page.
2. **Register a User:** Create a new account. Log in. You will see the weather data but the Admin section will be hidden.
3. **Backend Enforcement:** Try accessing `/api/WeatherForecast/admin-stats` via a tool like Postman using a standard user token; the backend will return a `403 Forbidden`.

---

## 📂 Project Structure
```text
Auth-Demo/
├── backend/
│   └── AuthDemo.Api/
│       ├── Controllers/    # API Endpoints
│       ├── Data/           # DbContext
│       ├── DTOs/           # Request/Response objects
│       ├── Interfaces/     # Service/Repo contracts
│       ├── Models/         # Database entities
│       ├── Repositories/   # Data access logic
│       └── Services/       # Business & Auth logic
└── frontend/
    └── src/
        ├── components/     # UI Components (MUI)
        ├── services/       # API & Auth logic
        └── App.tsx         # Main Routing
```
