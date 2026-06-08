# API Documentation - Smart School ERP

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

## Response Format

All responses follow this format:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": { /* data object */ }
}
```

---

## Authentication Endpoints

### 1. User Login

**POST** `/auth/login`

**Request:**
```json
{
  "email": "admin@smartschool.com",
  "password": "admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@smartschool.com",
    "role": "admin",
    "phone": "9876543210",
    "status": "active"
  }
}
```

### 2. User Registration

**POST** `/auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { /* user object */ }
}
```

### 3. Get Current User

**GET** `/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "user": { /* user object */ }
}
```

---

## Student Endpoints

### 1. Get All Students

**GET** `/students?page=1&limit=10&class=10&search=John`

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Records per page (default: 10)
- `class` - Filter by class
- `section` - Filter by section
- `search` - Search by name or admission number

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "admissionNumber": "ADM0001",
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "2008-05-15",
      "gender": "Male",
      "class": "10",
      "section": "A",
      "rollNumber": "1",
      "parentInfo": {
        "name": "Parent Name",
        "email": "parent@email.com",
        "phone": "9876543210"
      },
      "status": "active"
    }
  ],
  "pagination": {
    "total": 50,
    "pages": 5,
    "currentPage": 1,
    "perPage": 10
  }
}
```

### 2. Get Student by ID

**GET** `/students/:id`

**Response:**
```json
{
  "success": true,
  "data": { /* student object */ }
}
```

### 3. Create Student

**POST** `/students`

**Headers:** `Authorization: Bearer <admin_token>`

**Request (multipart/form-data):**
```
firstName: John
lastName: Doe
dateOfBirth: 2008-05-15
gender: Male
class: 10
section: A
parentName: Parent Name
parentEmail: parent@email.com
parentPhone: 9876543210
photo: [file]
```

**Response:**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": { /* student object */ }
}
```

### 4. Update Student

**PUT** `/students/:id`

**Headers:** `Authorization: Bearer <admin_token>`

**Request:** Same as create (with only fields to update)

### 5. Delete Student

**DELETE** `/students/:id`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

---

## Teacher Endpoints

### 1. Get All Teachers

**GET** `/teachers?page=1&limit=10&subject=Mathematics&search=Smith`

**Query Parameters:**
- `page` - Page number
- `limit` - Records per page
- `subject` - Filter by subject
- `search` - Search by name

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "Mr.",
      "lastName": "Smith",
      "subject": "Mathematics",
      "qualification": "B.Tech",
      "experience": "5 years",
      "classes": ["10A", "10B"],
      "salary": 50000,
      "joiningDate": "2020-06-01",
      "status": "active"
    }
  ],
  "pagination": { /* pagination object */ }
}
```

### 2. Get Teacher by ID

**GET** `/teachers/:id`

### 3. Create Teacher

**POST** `/teachers`

**Headers:** `Authorization: Bearer <admin_token>`

**Request:**
```json
{
  "firstName": "Mr.",
  "lastName": "Smith",
  "email": "smith@example.com",
  "phone": "9876543210",
  "subject": "Mathematics",
  "qualification": "B.Tech",
  "experience": "5 years",
  "salary": 50000
}
```

### 4. Update Teacher

**PUT** `/teachers/:id`

**Headers:** `Authorization: Bearer <admin_token>`

### 5. Delete Teacher

**DELETE** `/teachers/:id`

**Headers:** `Authorization: Bearer <admin_token>`

---

## Attendance Endpoints

### 1. Get Attendance Records

**GET** `/attendance?studentId=507f1f77bcf86cd799439011&date=2025-01-15&month=01`

**Query Parameters:**
- `studentId` - Filter by student
- `class` - Filter by class
- `section` - Filter by section
- `date` - Filter by specific date
- `month` - Filter by month (01-12)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "studentId": { /* student object */ },
      "class": "10",
      "section": "A",
      "date": "2025-01-15",
      "status": "present",
      "remarks": ""
    }
  ],
  "presentDays": 18,
  "absentDays": 2,
  "totalDays": 20,
  "attendancePercentage": "90.00"
}
```

### 2. Mark Attendance

**POST** `/attendance`

**Headers:** `Authorization: Bearer <teacher_token>`

**Request:**
```json
{
  "studentId": "507f1f77bcf86cd799439011",
  "date": "2025-01-15",
  "status": "present",
  "remarks": ""
}
```

### 3. Mark Bulk Attendance

**POST** `/attendance/bulk`

**Headers:** `Authorization: Bearer <teacher_token>`

**Request:**
```json
{
  "date": "2025-01-15",
  "class": "10",
  "section": "A",
  "attendance": [
    {
      "studentId": "507f1f77bcf86cd799439011",
      "status": "present"
    },
    {
      "studentId": "507f1f77bcf86cd799439012",
      "status": "absent",
      "remarks": "Sick"
    }
  ]
}
```

### 4. Update Attendance

**PUT** `/attendance/:id`

**Headers:** `Authorization: Bearer <teacher_token>`

**Request:**
```json
{
  "status": "absent",
  "remarks": "Medical leave"
}
```

---

## Fees Endpoints

### 1. Get Fees Records

**GET** `/fees?studentId=507f1f77bcf86cd799439011&status=pending&month=01&year=2025`

**Query Parameters:**
- `studentId` - Filter by student
- `status` - Filter by status (pending, paid, overdue)
- `month` - Filter by month
- `year` - Filter by year

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "studentId": { /* student object */ },
      "month": "January",
      "year": 2025,
      "amount": 5000,
      "dueDate": "2025-01-31",
      "status": "pending",
      "paymentMethod": null,
      "paidDate": null
    }
  ],
  "totalPending": 50000,
  "totalCollected": 100000,
  "totalOverdue": 10000
}
```

### 2. Create Fee

**POST** `/fees`

**Headers:** `Authorization: Bearer <admin_token>`

**Request:**
```json
{
  "studentId": "507f1f77bcf86cd799439011",
  "month": "February",
  "year": 2025,
  "amount": 5000,
  "dueDate": "2025-02-28"
}
```

### 3. Record Payment

**POST** `/fees/payment`

**Headers:** `Authorization: Bearer <admin_token>`

**Request:**
```json
{
  "feeId": "507f1f77bcf86cd799439011",
  "amount": 5000,
  "paymentMethod": "online",
  "transactionId": "TXN123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment recorded successfully",
  "receiptNumber": "REC-1234567890",
  "data": { /* fee object */ }
}
```

---

## Exam Endpoints

### 1. Get Exams

**GET** `/exams?class=10&subject=Mathematics&term=1`

**Query Parameters:**
- `class` - Filter by class
- `subject` - Filter by subject
- `term` - Filter by term (1, 2, annual)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Mid Term Exam",
      "class": "10",
      "subject": "Mathematics",
      "date": "2025-02-15",
      "totalMarks": 100,
      "passingMarks": 40,
      "term": "1"
    }
  ]
}
```

### 2. Create Exam

**POST** `/exams`

**Headers:** `Authorization: Bearer <teacher_token>`

**Request:**
```json
{
  "name": "Mid Term Exam",
  "class": "10",
  "subject": "Mathematics",
  "date": "2025-02-15",
  "totalMarks": 100,
  "passingMarks": 40,
  "term": "1"
}
```

### 3. Add Marks

**POST** `/exams/marks`

**Headers:** `Authorization: Bearer <teacher_token>`

**Request:**
```json
{
  "examId": "507f1f77bcf86cd799439011",
  "studentId": "507f1f77bcf86cd799439012",
  "marksObtained": 85
}
```

**Response:**
```json
{
  "success": true,
  "message": "Marks added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "examId": "507f1f77bcf86cd799439011",
    "studentId": "507f1f77bcf86cd799439012",
    "marksObtained": 85,
    "percentage": 85.0,
    "grade": "A"
  }
}
```

### 4. Get Results

**GET** `/exams/results?studentId=507f1f77bcf86cd799439011&examId=507f1f77bcf86cd799439012`

**Query Parameters:**
- `studentId` - Filter by student
- `examId` - Filter by exam

---

## Dashboard Endpoints

### 1. Get Dashboard Statistics

**GET** `/dashboard/stats`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalStudents": 150,
    "totalTeachers": 25,
    "attendancePercentage": 85.5,
    "feesCollected": 500000,
    "pendingFees": 100000,
    "totalExams": 12,
    "todayPresent": 140,
    "todayTotal": 150,
    "recentNotifications": [
      {
        "id": 1,
        "title": "Fee Reminder",
        "message": "Monthly fees are due",
        "date": "2025-01-15",
        "read": false
      }
    ]
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## Rate Limiting

Currently no rate limiting is configured. For production, implement rate limiting to prevent abuse.

## Pagination

All list endpoints support pagination:

```
GET /endpoint?page=1&limit=10
```

**Response includes:**
```json
{
  "pagination": {
    "total": 100,
    "pages": 10,
    "currentPage": 1,
    "perPage": 10
  }
}
```

---

**Last Updated:** 2025-01-15
