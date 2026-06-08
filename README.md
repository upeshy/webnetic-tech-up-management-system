# Smart School ERP - Complete Setup Guide

## Project Overview

**Smart School ERP** is a modern, full-stack School Management System built with:
- **Frontend:** React.js + Vite + Tailwind CSS + React Router
- **Backend:** Node.js + Express.js + MongoDB + JWT
- **Authentication:** Role-based JWT authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas Cloud)
- Git
- npm or yarn

## Quick Start

### Step 1: Clone Repository

```bash
git clone https://github.com/upeshy/webnetic-tech-up-management-system.git
cd webnetic-tech-up-management-system
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI and JWT Secret
# Edit the .env file and add your configuration

# Create upload directories
node scripts/createDirectories.js

# Seed database with dummy data (optional)
node scripts/seedDatabase.js

# Start backend server
npm start
# Server will run on http://localhost:5000
```

### Step 3: Frontend Setup

In a new terminal:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
# Frontend will run on http://localhost:5173
```

### Step 4: Access Application

Open your browser and go to: **http://localhost:5173**

## Default Login Credentials

### Admin Account
- **Email:** admin@smartschool.com
- **Password:** admin@123
- **Role:** Admin (Full Access)

### Teacher Account
- **Email:** teacher@smartschool.com
- **Password:** teacher@123
- **Role:** Teacher (Limited Access)

### Student Account
- **Email:** student1@smartschool.com
- **Password:** student@123
- **Role:** Student (View Only)

## Environment Configuration

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smart_school_erp?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters_required_for_security
JWT_EXPIRE=7d
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Smart School ERP
VITE_APP_VERSION=1.0.0
```

## Project Structure

```
webnetic-tech-up-management-system/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable Components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── FormInput.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/                   # Page Components
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Students.jsx
│   │   │   ├── Teachers.jsx
│   │   │   ├── Attendance.jsx
│   │   │   ├── Fees.jsx
│   │   │   ├── Exams.jsx
│   │   │   └── NotFound.jsx
│   │   ├── layouts/                 # Layout Components
│   │   │   └── MainLayout.jsx
│   │   ├── services/                # API Services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── studentService.js
│   │   │   ├── teacherService.js
│   │   │   ├── attendanceService.js
│   │   │   ├── feesService.js
│   │   │   └── examService.js
│   │   ├── context/                 # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/                   # Custom Hooks
│   │   │   └── useAuth.js
│   │   ├── config.js                # Configuration
│   │   ├── App.jsx                  # Main App Component
│   │   ├── main.jsx                 # Entry Point
│   │   └── index.css                # Global Styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
├── server/                          # Node.js Backend
│   ├── models/                      # MongoDB Models
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Attendance.js
│   │   ├── Fees.js
│   │   ├── Exam.js
│   │   └── Result.js
│   ├── routes/                      # Express Routes
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── teachers.js
│   │   ├── attendance.js
│   │   ├── fees.js
│   │   ├── exams.js
│   │   └── dashboard.js
│   ├── controllers/                 # Route Controllers
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   │   ├── attendanceController.js
│   │   ├── feesController.js
│   │   ├── examController.js
│   │   └── dashboardController.js
│   ├── middleware/                  # Express Middleware
│   │   └── auth.js
│   ├── utils/                       # Utility Functions
│   │   ├── tokenGenerator.js
│   │   └── validators.js
│   ├── scripts/                     # Helper Scripts
│   │   ├── seedDatabase.js
│   │   └── createDirectories.js
│   ├── uploads/                     # File Uploads Directory
│   ├── reports/                     # Reports Directory
│   ├── server.js                    # Main Server File
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── README.md
├── INSTALLATION.md
├── API_DOCUMENTATION.md
└── .gitignore
```

## Available Features

### 1. Authentication System
- ✅ User Login/Logout
- ✅ Role-based Access Control
- ✅ JWT Token Management
- ✅ Protected Routes
- ✅ Session Management

### 2. Dashboard
- ✅ Total Students Count
- ✅ Total Teachers Count
- ✅ Attendance Percentage
- ✅ Pending Fees Overview
- ✅ Fees Collection Stats
- ✅ Quick Actions
- ✅ Recent Notifications

### 3. Student Management
- ✅ View All Students
- ✅ Search Students
- ✅ Pagination
- ✅ Add New Student
- ✅ Edit Student Details
- ✅ Delete Student
- ✅ Student Profile

### 4. Teacher Management
- ✅ View All Teachers
- ✅ Search Teachers
- ✅ Add New Teacher
- ✅ Edit Teacher Info
- ✅ Delete Teacher
- ✅ Subject Assignment

### 5. Attendance System
- ✅ Mark Daily Attendance
- ✅ Bulk Attendance Marking
- ✅ Attendance Reports
- ✅ Monthly Attendance Stats
- ✅ Search by Date

### 6. Fees Management
- ✅ Track Student Fees
- ✅ Payment Recording
- ✅ Fee Status (Pending/Paid)
- ✅ Payment History
- ✅ Pending Fees Alert

### 7. Exam & Results
- ✅ Create Exams
- ✅ Add Student Marks
- ✅ Generate Results
- ✅ Grade Calculation
- ✅ Report Card View

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `POST /api/attendance/bulk` - Bulk mark attendance
- `PUT /api/attendance/:id` - Update attendance

### Fees
- `GET /api/fees` - Get fees records
- `POST /api/fees` - Create fee
- `POST /api/fees/payment` - Record payment

### Exams
- `GET /api/exams` - Get exams
- `POST /api/exams` - Create exam
- `POST /api/exams/marks` - Add marks
- `GET /api/exams/results` - Get results

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Troubleshooting

### MongoDB Connection Issues

```bash
# Check MongoDB is running
# Update MONGODB_URI in .env with correct credentials
# For MongoDB Atlas, ensure IP whitelist includes your IP
```

### Port Already in Use

```bash
# Backend (Port 5000)
lsof -i :5000
kill -9 <PID>

# Frontend (Port 5173)
lsof -i :5173
kill -9 <PID>
```

### Module Not Found Errors

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues

```bash
# Ensure backend is running on http://localhost:5000
# Check VITE_API_BASE_URL in frontend .env
```

## Development Commands

### Backend

```bash
cd server

# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Create directories
node scripts/createDirectories.js

# Seed database
node scripts/seedDatabase.js
```

### Frontend

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies Used

### Frontend
- React 18.2
- Vite 4.2
- Tailwind CSS 3.2
- React Router DOM 6.10
- Axios 1.3
- React Icons 4.8

### Backend
- Node.js
- Express 4.18
- MongoDB
- Mongoose 7.0
- JWT (jsonwebtoken) 9.0
- bcryptjs 2.4
- CORS 2.8
- Multer 1.4
- dotenv 16.0

## Performance Tips

1. **Use React.memo()** for frequently re-rendered components
2. **Lazy load routes** using React.lazy() for better performance
3. **Optimize images** before uploading
4. **Use pagination** for large datasets
5. **Cache API responses** using React Query or SWR

## Security Considerations

1. ✅ Password hashing with bcryptjs
2. ✅ JWT token authentication
3. ✅ Protected API routes with middleware
4. ✅ CORS configuration
5. ✅ Input validation
6. ✅ Environment variables for sensitive data

## Production Deployment

### Frontend (Vercel/Netlify)

```bash
# Build production bundle
npm run build

# Deploy 'dist' folder
```

### Backend (Heroku/Railway)

```bash
# Add Procfile
echo "web: npm start" > Procfile

# Deploy
git push heroku main
```

## Support & Documentation

- See `API_DOCUMENTATION.md` for detailed API docs
- See `INSTALLATION.md` for installation steps
- Check GitHub Issues for common problems

## License

MIT License - Feel free to use this project

## Contributors

- Upesh Yadav (upeshy)

---

**Happy coding! 🚀**
