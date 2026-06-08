# Installation Guide - Smart School ERP

## Prerequisites

Before starting, ensure you have installed:

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **MongoDB** (v4.0 or higher)
   - Option A: Local Installation
     - Download: https://www.mongodb.com/try/download/community
     - Install and start MongoDB service
   - Option B: MongoDB Atlas (Cloud)
     - Create account: https://www.mongodb.com/cloud/atlas
     - Create cluster and get connection string

3. **Git**
   - Download: https://git-scm.com/
   - Verify: `git --version`

4. **Code Editor** (VSCode recommended)
   - Download: https://code.visualstudio.com/

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/upeshy/webnetic-tech-up-management-system.git
cd webnetic-tech-up-management-system
```

### 2. Backend Setup

#### 2.1 Navigate to server directory
```bash
cd server
```

#### 2.2 Install dependencies
```bash
npm install
```

#### 2.3 Create environment file
```bash
cp .env.example .env
```

#### 2.4 Configure .env file

Edit `server/.env` file with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/smart_school_erp

# For MongoDB Atlas (Cloud):
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smart_school_erp?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_very_secret_key_min_32_chars_long_for_security_purposes
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_EXTENSIONS=pdf,jpg,jpeg,png,doc,docx
```

#### 2.5 Create directories for uploads
```bash
node scripts/createDirectories.js
```

#### 2.6 Seed database (optional - adds dummy data)
```bash
node scripts/seedDatabase.js
```

This will create:
- 1 Admin user
- 2 Teachers
- 5 Students
- Sample exams, results, attendance, and fees

#### 2.7 Verify installation
```bash
npm start
```

You should see:
```
╔═══════════════════════════════════════╗
║   Smart School ERP - Backend Server   ║
║   Server running on port 5000         ║
║   Environment: development            ║
╚═══════════════════════════════════════╝
✓ MongoDB Connected: localhost
```

**Stop the server** (Press Ctrl+C) and proceed to frontend setup.

### 3. Frontend Setup

Open a **new terminal** in the project root:

#### 3.1 Navigate to client directory
```bash
cd client
```

#### 3.2 Install dependencies
```bash
npm install
```

#### 3.3 Create environment file
```bash
cp .env.example .env
```

#### 3.4 Configure .env file

Edit `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Smart School ERP
VITE_APP_VERSION=1.0.0
```

#### 3.5 Verify installation
```bash
npm run dev
```

You should see:
```
VITE v4.2.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

## Running the Application

### Terminal 1 - Backend Server

```bash
cd server
npm start
```

Expected output:
```
✓ MongoDB Connected: localhost
Server running on port 5000
```

### Terminal 2 - Frontend Server

```bash
cd client
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5173/
```

### Open in Browser

Go to: **http://localhost:5173**

## Login Credentials

The database is pre-seeded with test accounts:

### Admin
- Email: `admin@smartschool.com`
- Password: `admin@123`

### Teacher
- Email: `teacher@smartschool.com`
- Password: `teacher@123`

### Student
- Email: `student1@smartschool.com`
- Password: `student@123`

## Verification Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Backend server running on port 5000
- [ ] Frontend dependencies installed
- [ ] Frontend .env configured
- [ ] Frontend server running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Can login with test credentials
- [ ] Dashboard loads successfully

## Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
```bash
# Check if MongoDB is running
# Update MONGODB_URI in .env
# For MongoDB Atlas, whitelist your IP
```

**Error: Port 5000 already in use**
```bash
# Change port in .env
PORT=5001
```

**Error: Module not found**
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

**Error: Cannot connect to backend**
```bash
# Check VITE_API_BASE_URL in client/.env
# Ensure backend is running on http://localhost:5000
```

**Error: Port 5173 already in use**
```bash
cd client
npm run dev -- --port 5174
```

**Error: Blank page or not loading**
```bash
# Clear browser cache (Ctrl+Shift+Delete)
# Check browser console for errors (F12)
# Restart frontend server
```

## File Upload Configuration

Uploads are stored in `server/uploads/` directory:

```
server/uploads/
├── students/      # Student photos
└── teachers/      # Teacher documents
```

Files are automatically created by the system.

## Database Backup/Restore

### Export data (MongoDB)
```bash
mongodump --db smart_school_erp --out ./backup
```

### Import data
```bash
mongorestore --db smart_school_erp ./backup/smart_school_erp
```

## Production Checklist

- [ ] Update JWT_SECRET in production
- [ ] Set NODE_ENV=production
- [ ] Configure MongoDB for production
- [ ] Enable HTTPS
- [ ] Set up proper CORS
- [ ] Add rate limiting
- [ ] Configure logging
- [ ] Set up monitoring
- [ ] Backup database regularly

## Getting Help

If you encounter issues:

1. Check the error message carefully
2. Review the troubleshooting section above
3. Check the API documentation
4. Search existing GitHub issues
5. Create a new GitHub issue with error details

## Next Steps

- Read `API_DOCUMENTATION.md` for API details
- Explore the codebase
- Customize styling with Tailwind CSS
- Add new features
- Deploy to production

---

**Installation complete! Happy coding! 🚀**
