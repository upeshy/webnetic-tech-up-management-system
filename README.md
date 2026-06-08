# Smart School ERP - Complete Full-Stack School Management System

## 🎓 Project Overview

Smart School ERP is a modern, full-stack school management software built with cutting-edge technologies. It provides comprehensive solutions for managing students, teachers, attendance, fees, and exams in educational institutions.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Usage](#usage)

## ✨ Features

### 1. **Authentication System**
- Multi-role login (Admin, Teacher, Student, Parent)
- JWT-based secure authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt

### 2. **Dashboard**
- Total Students Count
- Total Teachers Count
- Attendance Percentage Overview
- Fees Collection Statistics
- Pending Fees Alert
- Recent Notifications

### 3. **Student Management**
- Add/Edit/Delete Students
- Student Profiles with Photos
- Class & Section Assignment
- Parent Information Management
- Admission Number Tracking

### 4. **Teacher Management**
- Add/Edit/Delete Teachers
- Subject Assignment
- Salary Information
- Attendance Tracking
- Profile Management

### 5. **Attendance Module**
- Daily Attendance Marking
- Present/Absent Status
- Monthly Reports
- Advanced Search

### 6. **Fees Management**
- Monthly Fees Structure
- Fee Receipt Generation
- Pending Fee Alerts
- Online Payment Integration Ready

### 7. **Exam & Results**
- Marks Entry
- Automatic Grade Calculation
- Report Card PDF Generation
- Result Analytics

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI Library
- **Tailwind CSS** - Styling Framework
- **React Router** - Client-side Routing
- **Axios** - HTTP Client
- **Context API** - State Management
- **React Icons** - Icon Library

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - NoSQL Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **multer** - File Uploads
- **dotenv** - Environment Variables
- **cors** - Cross-Origin Resource Sharing

### Database
- **MongoDB** - Cloud Database (MongoDB Atlas)

## 📁 Project Structure

```
webnetic-tech-up-management-system/
│
├── client/                          # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   ├── TeacherForm.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── StudentManagement.jsx
│   │   │   ├── TeacherManagement.jsx
│   │   │   ├── AttendanceModule.jsx
│   │   │   ├── FeesManagement.jsx
│   │   │   ├── ExamModule.jsx
│   │   │   └── NotFound.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── AppContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useApi.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── studentService.js
│   │   │   ├── teacherService.js
│   │   │   ├── attendanceService.js
│   │   │   ├── feesService.js
│   │   │   └── examService.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── config.js
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Express Backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Attendance.js
│   │   ├── Fees.js
│   │   ├── Exam.js
│   │   └── Result.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── teachers.js
│   │   ├── attendance.js
│   │   ├── fees.js
│   │   └── exams.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   │   ├── attendanceController.js
│   │   ├── feesController.js
│   │   └── examController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validators.js
│   ├── config/
│   │   ├── database.js
│   │   └── multer.js
│   ├── utils/
│   │   ├── tokenGenerator.js
│   │   └── validators.js
│   ├── uploads/
│   │   └── .gitkeep
│   ├── reports/
│   │   └── .gitkeep
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── INSTALLATION.md
├── API_DOCUMENTATION.md
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas Account
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone https://github.com/upeshy/webnetic-tech-up-management-system.git
cd webnetic-tech-up-management-system
```

### Step 2: Setup Backend

```bash
cd server
npm install
```

Create `.env` file in server directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Step 3: Setup Frontend

```bash
cd ../client
npm install
```

Create `.env` file in client directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## 🔧 Setup Instructions

### 1. MongoDB Connection

1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/)
2. Create a new cluster
3. Get your connection string
4. Add it to `.env` file

### 2. Run Backend Server

```bash
cd server
npm start
# Server runs on http://localhost:5000
```

### 3. Run Frontend Application

```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Student Endpoints
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

## 💾 Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin, teacher, student, parent),
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Student Schema
```javascript
{
  userId: ObjectId (ref: User),
  admissionNumber: String (unique),
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  class: String,
  section: String,
  parentInfo: {
    name: String,
    email: String,
    phone: String
  },
  photoUrl: String,
  status: String (active, inactive),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Default Test Credentials

### Admin Account
- Email: `admin@smartschool.com`
- Password: `admin@123`
- Role: Admin

### Teacher Account
- Email: `teacher@smartschool.com`
- Password: `teacher@123`
- Role: Teacher

### Student Account
- Email: `student@smartschool.com`
- Password: `student@123`
- Role: Student

## 📖 Usage

1. **Login** with appropriate credentials
2. **Access Dashboard** to view overview
3. **Manage Students/Teachers** using respective modules
4. **Mark Attendance** daily
5. **Manage Fees** and track payments
6. **Record Marks** and generate results

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- Role-based access control
- Protected API routes
- Input validation
- CORS enabled
- Environment variables for sensitive data

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS responsive utilities
- Mobile, Tablet, and Desktop optimization
- Modern UI/UX

## 🚀 Future Enhancements

- SMS notifications
- Email notifications
- Online fee payment integration
- Mobile app (React Native)
- Advanced analytics and reports
- Holiday calendar management
- Timetable generation
- Parent portal
- Student academic progress tracking

## 📝 License

MIT License - feel free to use this project for educational and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please follow the coding standards and create pull requests.

## 📧 Support

For issues and queries, please open an issue on GitHub.

---

**Happy Coding! 🚀**
