# 🏋️‍♂️ AI-Powered Fitness Web App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Groq](https://img.shields.io/badge/AI-Groq-orange)

An intelligent, full-stack fitness application that utilizes **Groq AI (Llama 3.3)** to generate personalized, 7-day workout and meal plans tailored to your specific physical profile, goals, and dietary preferences.

---

## ✨ Features

- **🔐 Secure Authentication**: User registration and login powered by JSON Web Tokens (JWT) and bcrypt.
- **🤖 Lightning-Fast AI Generation**: Integrated with **Groq's** `llama-3.3-70b-versatile` model for near-instantaneous AI responses.
- **🏃‍♂️ Custom Workout Plans**: Input your age, weight, height, and fitness goals to receive a highly detailed weekly workout schedule (sets, reps, and focus areas).
- **🥗 Custom Meal Plans**: Tell the app your calorie target and dietary restrictions to get a fully structured 7-day meal plan (breakfast, lunch, dinner, snacks).
- **💾 Local Database**: Uses a lightweight SQLite database out of the box via Sequelize ORM, with full support for PostgreSQL.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: For building a dynamic and responsive user interface.
- **Vite**: Next-generation frontend tooling for rapid development.
- **Axios**: Handling secure HTTP requests to the backend API.

### Backend
- **Node.js & Express**: Fast, scalable server architecture.
- **Groq SDK**: Connecting to Groq's high-speed inference engine for LLM processing.
- **Sequelize (SQLite / PostgreSQL)**: Robust database ORM for managing user accounts and data.
- **JWT**: Stateless, secure user session management.

---

## 🚀 How It's Built

1. **Authentication Flow**: When a user registers, their password is encrypted. A JWT token is generated on login, which must be attached to the headers of subsequent requests to verify identity.
2. **AI Integration**: The Node.js server takes the user's profile data (weight, goals, diet) and constructs an optimized prompt. This prompt is sent to the **Groq API**.
3. **Structured Data Parsing**: The AI is instructed to return *only* raw JSON. The backend sanitizes this JSON and parses it into a structured format before sending it back to the React frontend.
4. **Dynamic Rendering**: The React frontend loops through the returned 7-day JSON objects and beautifully renders the day-by-day workout and meal cards.

---

## ⚙️ Local Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/NSBunny/AI-powered-fitness-webapp.git
cd AI-powered-fitness-webapp
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add your secret keys:
```env
PORT=5000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key
GROQ_API_KEY=your_groq_api_key_here
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```

The application will now be running at `http://localhost:5173`! 🎉

---

## 🔒 Security Note
This project uses `.gitignore` to strictly hide `.env` files and local `*.sqlite` databases, ensuring that API keys and user data are never accidentally exposed to version control.

---

Made with ❤️ and AI.
