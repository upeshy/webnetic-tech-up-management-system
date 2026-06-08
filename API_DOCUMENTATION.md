# Smart School ERP - API Documentation

## 📚 Complete REST API Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User

**Endpoint:** `POST /auth/register`

**Description:** Register new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "student",
  "phone": "9876543210"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### 2. Login User

**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "admin@smartschool.com",
  "password": "admin@123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@smartschool.com",
    "role": "admin"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. Get Current User

**Endpoint:** `GET /auth/me`

**Description:** Get authenticated user details

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@smartschool.com",
    "role": "admin",
    "phone": "9876543210"
  }
}
```

---

### 4. Logout

**Endpoint:** `POST /auth/logout`

**Description:** Logout user (frontend handling)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 👨‍🎓 Student Management Endpoints

### 1. Get All Students

**Endpoint:** `GET /students`

**Description:** Retrieve all students with pagination

**Query Parameters:**
```
page=1&limit=10&class=10&section=A&search=john
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "admissionNumber": "ADM001",
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "2008-05-15",
      "gender": "Male",
      "class": "10",
      "section": "A",
      "parentInfo": {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "9876543210"
      },
      "photoUrl": "uploads/students/photo.jpg",
      "status": "active",
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-01T10:00:00Z"
    }
  ],
  "total": 50,
  "pages": 5,
  "currentPage": 1
}
```

---

### 2. Get Student by ID

**Endpoint:** `GET /students/:id`

**Description:** Get detailed student information

**Parameters:**
```
id = 507f1f77bcf86cd799439011
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "admissionNumber": "ADM001",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "2008-05-15",
    "gender": "Male",
    "class": "10",
    "section": "A",
    "parentInfo": {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "9876543210"
    },
    "photoUrl": "uploads/students/photo.jpg",
    "status": "active",
    "enrollmentDate": "2024-04-01",
    "createdAt": "2025-01-01T10:00:00Z",
    "updatedAt": "2025-01-01T10:00:00Z"
  }
}
```

---

### 3. Create Student

**Endpoint:** `POST /students`

**Description:** Add new student

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
```
firstName: John
lastName: Doe
dateOfBirth: 2008-05-15
gender: Male
class: 10
section: A
parentName: Jane Doe
parentEmail: jane@example.com
parentPhone: 9876543210
photo: [file]
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "admissionNumber": "ADM001",
    "firstName": "John",
    "lastName": "Doe",
    "photoUrl": "uploads/students/photo-timestamp.jpg"
  }
}
```

---

### 4. Update Student

**Endpoint:** `PUT /students/:id`

**Description:** Update student information

**Parameters:**
```
id = 507f1f77bcf86cd799439011
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
```
firstName: Jonathan
lastName: Doe
class: 11
section: B
photo: [file] (optional)
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Jonathan",
    "lastName": "Doe",
    "class": "11",
    "section": "B"
  }
}
```

---

### 5. Delete Student

**Endpoint:** `DELETE /students/:id`

**Description:** Delete student record

**Parameters:**
```
id = 507f1f77bcf86cd799439011
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

---

## 👨‍🏫 Teacher Management Endpoints

### 1. Get All Teachers

**Endpoint:** `GET /teachers`

**Description:** Retrieve all teachers

**Query Parameters:**
```
page=1&limit=10&subject=Math&search=john
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439013",
      "firstName": "Mr.",
      "lastName": "Smith",
      "email": "smith@smartschool.com",
      "phone": "9876543210",
      "subject": "Mathematics",
      "classes": ["10A", "10B", "11A"],
      "qualification": "B.Tech Mathematics",
      "experience": "5 years",
      "salary": 50000,
      "joiningDate": "2020-06-01",
      "status": "active",
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-01T10:00:00Z"
    }
  ],
  "total": 20,
  "pages": 2,
  "currentPage": 1
}
```

---

### 2. Create Teacher

**Endpoint:** `POST /teachers`

**Description:** Add new teacher

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "Mr.",
  "lastName": "Smith",
  "email": "smith@smartschool.com",
  "password": "teacher@123",
  "phone": "9876543210",
  "subject": "Mathematics",
  "qualification": "B.Tech Mathematics",
  "experience": "5 years",
  "salary": 50000,
  "joiningDate": "2025-06-01"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Teacher created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "firstName": "Mr.",
    "lastName": "Smith",
    "email": "smith@smartschool.com",
    "subject": "Mathematics"
  }
}
```

---

### 3. Update Teacher

**Endpoint:** `PUT /teachers/:id`

**Description:** Update teacher information

**Parameters:**
```
id = 507f1f77bcf86cd799439012
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "salary": 55000,
  "classes": ["10A", "10B", "11A", "11B"]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Teacher updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "salary": 55000,
    "classes": ["10A", "10B", "11A", "11B"]
  }
}
```

---

## ���� Attendance Endpoints

### 1. Get Attendance Records

**Endpoint:** `GET /attendance`

**Description:** Retrieve attendance records

**Query Parameters:**
```
studentId=507f1f77bcf86cd799439011&date=2025-01-01&class=10&month=01
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "studentId": "507f1f77bcf86cd799439011",
      "date": "2025-01-06",
      "status": "present",
      "remarks": "",
      "class": "10",
      "section": "A",
      "createdAt": "2025-01-06T10:00:00Z"
    }
  ],
  "presentDays": 18,
  "absentDays": 2,
  "totalDays": 20,
  "attendancePercentage": 90
}
```

---

### 2. Mark Attendance

**Endpoint:** `POST /attendance`

**Description:** Record student attendance

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439011",
  "date": "2025-01-06",
  "status": "present",
  "remarks": ""
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "studentId": "507f1f77bcf86cd799439011",
    "date": "2025-01-06",
    "status": "present"
  }
}
```

---

### 3. Mark Bulk Attendance

**Endpoint:** `POST /attendance/bulk`

**Description:** Mark attendance for multiple students

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "date": "2025-01-06",
  "class": "10",
  "section": "A",
  "attendance": [
    {
      "studentId": "507f1f77bcf86cd799439011",
      "status": "present"
    },
    {
      "studentId": "507f1f77bcf86cd799439012",
      "status": "absent"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Attendance marked for 40 students",
  "count": 40
}
```

---

## 💰 Fees Management Endpoints

### 1. Get Fee Records

**Endpoint:** `GET /fees`

**Description:** Retrieve fee records

**Query Parameters:**
```
studentId=507f1f77bcf86cd799439011&status=pending&month=01
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "studentId": "507f1f77bcf86cd799439011",
      "month": "January",
      "year": 2025,
      "amount": 5000,
      "dueDate": "2025-02-05",
      "status": "pending",
      "paidDate": null,
      "receiptNumber": "",
      "createdAt": "2025-01-01T10:00:00Z"
    }
  ],
  "totalPending": 15000,
  "totalCollected": 50000
}
```

---

### 2. Record Fee Payment

**Endpoint:** `POST /fees/payment`

**Description:** Record fee payment

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "feeId": "507f1f77bcf86cd799439015",
  "studentId": "507f1f77bcf86cd799439011",
  "amount": 5000,
  "paymentMethod": "cash",
  "transactionId": ""
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Payment recorded successfully",
  "receiptNumber": "REC-2025-001",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "status": "paid",
    "paidDate": "2025-01-06",
    "receiptNumber": "REC-2025-001"
  }
}
```

---

## 📊 Exam & Results Endpoints

### 1. Get Exams

**Endpoint:** `GET /exams`

**Description:** Retrieve exam records

**Query Parameters:**
```
class=10&subject=Mathematics&term=1
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "name": "Mid Term Exam",
      "class": "10",
      "subject": "Mathematics",
      "date": "2025-01-15",
      "totalMarks": 100,
      "passingMarks": 40,
      "createdAt": "2025-01-01T10:00:00Z"
    }
  ]
}
```

---

### 2. Add Marks

**Endpoint:** `POST /exams/marks`

**Description:** Record student marks

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "examId": "507f1f77bcf86cd799439016",
  "studentId": "507f1f77bcf86cd799439011",
  "marksObtained": 85
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Marks added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439017",
    "examId": "507f1f77bcf86cd799439016",
    "studentId": "507f1f77bcf86cd799439011",
    "marksObtained": 85,
    "grade": "A",
    "percentage": 85
  }
}
```

---

### 3. Get Results

**Endpoint:** `GET /exams/results`

**Description:** Retrieve student results

**Query Parameters:**
```
studentId=507f1f77bcf86cd799439011&term=1
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "studentId": "507f1f77bcf86cd799439011",
    "class": "10",
    "term": "1",
    "results": [
      {
        "examId": "507f1f77bcf86cd799439016",
        "subject": "Mathematics",
        "marksObtained": 85,
        "totalMarks": 100,
        "percentage": 85,
        "grade": "A"
      }
    ],
    "totalPercentage": 85,
    "overallGrade": "A"
  }
}
```

---

### 4. Generate Report Card

**Endpoint:** `GET /exams/report-card/:studentId`

**Description:** Generate PDF report card

**Parameters:**
```
studentId = 507f1f77bcf86cd799439011
term = 1
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** PDF file download

---

## 📊 Dashboard Endpoints

### Get Dashboard Stats

**Endpoint:** `GET /dashboard/stats`

**Description:** Get dashboard overview statistics

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalStudents": 450,
    "totalTeachers": 25,
    "totalClasses": 12,
    "attendancePercentage": 92,
    "feesCollected": 225000,
    "pendingFees": 75000,
    "totalExams": 8,
    "recentNotifications": [
      {
        "id": 1,
        "title": "Fee Due Reminder",
        "message": "Please pay pending fees",
        "date": "2025-01-06T10:00:00Z",
        "read": false
      }
    ]
  }
}
```

---

## 🔍 Search Endpoints

### Global Search

**Endpoint:** `GET /search`

**Description:** Search across students and teachers

**Query Parameters:**
```
q=john&type=student
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "results": {
    "students": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "John",
        "lastName": "Doe",
        "admissionNumber": "ADM001",
        "class": "10"
      }
    ],
    "teachers": []
  }
}
```

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be at least 6 characters"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required",
  "code": "AUTH_REQUIRED"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin role required",
  "code": "PERMISSION_DENIED"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Student not found",
  "code": "NOT_FOUND"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "code": "SERVER_ERROR"
}
```

---

## 📝 Status Codes

| Code | Meaning |
|------|----------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Auth required |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error |

---

## 🔄 Pagination

All list endpoints support pagination:

**Query Parameters:**
```
page=1        # Page number (default: 1)
limit=10      # Items per page (default: 10, max: 50)
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 50,
    "pages": 5,
    "currentPage": 1,
    "perPage": 10
  }
}
```

---

## 🔐 Role-Based Access

| Endpoint | Admin | Teacher | Student | Parent |
|----------|-------|---------|---------|--------|
| Students (all) | ✅ | ❌ | ❌ | ✅ |
| Student (own) | ✅ | ❌ | ✅ | ✅ |
| Teachers (all) | ✅ | ❌ | ❌ | ❌ |
| Attendance | ✅ | ✅ | ✅ | ✅ |
| Fees | ✅ | ❌ | ✅ | ✅ |
| Exams | ✅ | ✅ | ✅ | ✅ |
| Dashboard | ✅ | ✅ | ✅ | ✅ |

---

**Last Updated:** January 2025
