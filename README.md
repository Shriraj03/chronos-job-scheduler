# Chronos - Job Scheduler System

Chronos is a full-stack distributed job scheduling system built using Node.js, Express.js, React, MySQL, Redis, and BullMQ.

The system allows users to create, manage, monitor, and track scheduled jobs with retry handling, execution analytics, and recurring cron-based scheduling.

---

# 🚀 Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

---

## Job Scheduling
- Create One-Time Jobs
- Create Recurring Cron Jobs
- Cron Presets
- Timezone Support

---

## Job Management
- View All Jobs
- Edit Jobs
- Delete Jobs
- Pause/Resume Jobs
- Job Status Tracking

---

## Execution Monitoring
- Execution Timeline UI
- Execution History
- Retry Count Tracking
- Error Logging
- Real-Time Updates

---

## Analytics Dashboard
- Total Jobs
- Successful Executions
- Failed Executions
- Pie Chart Analytics
- Search & Filter Jobs

---

## Failure Handling
- Automatic Retry Mechanism
- BullMQ Retry Support
- Failed Execution Logs

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Recharts
- React Hot Toast

---

## Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- BullMQ
- Redis
- Cron Parser

---

# 🏗️ System Architecture

Frontend (React)
↓
REST APIs (Express.js)
↓
MySQL Database
↓
BullMQ Queue
↓
Redis Queue Engine
↓
Worker Processes

---

# 📂 Folder Structure

## Frontend
```bash
src/
├── components/
├── pages/
├── routes/
├── services/
```

## Backend
```bash
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── queues/
├── routes/
├── scheduler/
├── services/
├── workers/
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-github-repo-url>
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd Frontend
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd Backend
npm install
```

---

## 4️⃣ Configure Environment Variables

Create `.env` inside Backend:

```env
PORT=3000

DB_NAME=your_database_name
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost

JWT_SECRET=YOUR_SECRET_KEY

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

## 5️⃣ Start Redis Server

```bash
redis-server
```

---

## 6️⃣ Run Backend

```bash
npm run dev
```

---

## 7️⃣ Run Frontend

```bash
cd Frontend
npm run dev
```

---

# 🔑 API Endpoints

## Authentication

### Register
```http
POST /api/auth/register
```

### Login
```http
POST /api/auth/login
```

---

## Jobs

### Create Job
```http
POST /api/jobs
```

### Get Jobs
```http
GET /api/jobs
```

### Update Job
```http
PUT /api/jobs/:jobId
```

### Delete Job
```http
DELETE /api/jobs/:jobId
```

### Pause/Resume Job
```http
PATCH /api/jobs/:jobId/toggle
```

---

## Executions

### Get Executions
```http
GET /api/jobs/:jobId/executions
```

---

# 📊 Core Functionalities

## One-Time Jobs
Users can schedule jobs for a specific future time.

---

## Recurring Jobs
Users can schedule recurring jobs using cron expressions.

---

## Retry Handling
Failed jobs are automatically retried using BullMQ retry mechanisms.

---

## Monitoring
Execution history and analytics help monitor system health and job execution performance.

---

# 🔒 Authentication Flow

1. User logs in
2. JWT token generated
3. Token stored in localStorage
4. Protected APIs use Authorization header

---

# 🚀 Future Improvements

- Google OAuth
- Email Notifications
- Docker Deployment
- Kubernetes Scaling
- Live WebSocket Monitoring
- Advanced Cron Builder
- Role-Based Access Control

---

# 📸 Screenshots

Add screenshots here:
- Login Page
- Dashboard
- Create Job
- Execution Timeline
- Analytics

---

# 🎥 Demo Video

Add your explainer/demo video link here.

---

# 👨‍💻 Author

Shriraj Lakeshri

Backend Engineering Launchpad - Capstone Project