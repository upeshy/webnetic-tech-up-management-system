# Smart School ERP - Installation Guide

## Complete Setup Instructions

### 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **MongoDB Atlas Account** - [Create Free Account](https://www.mongodb.com/cloud/atlas)
- **Git** for version control
- **Code Editor** (VS Code recommended)

### ✅ Verify Installation

```bash
node --version
npm --version
git --version
```

---

## 🔧 Step-by-Step Installation

### Step 1: Clone Repository

```bash
# Navigate to desired directory
cd path/to/your/projects

# Clone the repository
git clone https://github.com/upeshy/webnetic-tech-up-management-system.git

# Navigate to project
cd webnetic-tech-up-management-system
```

### Step 2: Setup MongoDB Atlas

1. **Create Account** at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**
   - Choose free tier (M0)
   - Select closest region to you
   - Wait for cluster to initialize (5-10 minutes)
3. **Create Database User**
   - Go to Database Access
   - Add new user with username & password
   - Select "Read and write to any database"
4. **Get Connection String**
   - Click "Connect" on cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your user password
   - Replace `<dbname>` with `smart_school_erp`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smart_school_erp?retryWrites=true&w=majority
```

### Step 3: Backend Setup

#### 3.1 Navigate to Server Directory

```bash
cd server
```

#### 3.2 Install Dependencies

```bash
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT authentication)
- bcryptjs (password hashing)
- multer (file uploads)
- cors (cross-origin support)
- dotenv (environment variables)
- nodemon (development tool)

#### 3.3 Create Environment File

Create `.env` file in `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/smart_school_erp?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_use_long_random_string
JWT_EXPIRE=7d

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_EXTENSIONS=pdf,jpg,jpeg,png,doc,docx
```

#### 3.4 Start Backend Server

```bash
npm start
```

Expected output:
```
Server running on port 5000
Database connected successfully
```

✅ Backend is ready at `http://localhost:5000`

### Step 4: Frontend Setup

#### 4.1 Navigate to Client Directory

```bash
cd ../client
```

#### 4.2 Install Dependencies

```bash
npm install
```

This installs:
- react (UI library)
- react-dom (React DOM)
- react-router-dom (routing)
- axios (HTTP client)
- tailwindcss (styling)
- react-icons (icons)
- date-fns (date utilities)

#### 4.3 Create Environment File

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Smart School ERP
```

#### 4.4 Start Frontend Application

```bash
npm run dev
```

Expected output:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Frontend is ready at `http://localhost:5173`

---

## 🎯 Verification

### Check Backend

```bash
curl http://localhost:5000/api/auth/test
```

Expected response:
```json
{"message": "Backend is working"}
```

### Check Frontend

Open browser and navigate to:
```
http://localhost:5173
```

You should see the login page.

---

## 🔑 Default Test Credentials

Use these credentials to test the application:

### Admin Account
```
Email: admin@smartschool.com
Password: admin@123
```

### Teacher Account
```
Email: teacher@smartschool.com
Password: teacher@123
```

### Student Account
```
Email: student@smartschool.com
Password: student@123
```

### Parent Account
```
Email: parent@smartschool.com
Password: parent@123
```

---

## 📂 Project Structure After Setup

```
webnetic-tech-up-management-system/
├── client/                    # React Frontend
│   ├── node_modules/          # Dependencies
│   ├── public/
│   ├── src/
│   ├── .env.local             # Environment variables
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Express Backend
│   ├── node_modules/          # Dependencies
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── .env                   # Environment variables
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Development Workflow

### Terminal 1 - Backend

```bash
cd server
npm start
# Server runs with auto-reload via nodemon
```

### Terminal 2 - Frontend

```bash
cd client
npm run dev
# React dev server with HMR (Hot Module Replacement)
```

### Terminal 3 - MongoDB Connection (Optional)

Test MongoDB connection:

```bash
mongosh
# In mongosh shell
use smart_school_erp
db.users.find()
```

---

## 🐛 Troubleshooting

### Issue: Port 5000 already in use

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process (macOS/Linux)
kill -9 <PID>

# Or change PORT in .env
PORT=5001
```

### Issue: MongoDB Connection Error

**Solution:**
1. Verify connection string in `.env`
2. Check MongoDB Atlas IP whitelist (Add 0.0.0.0/0 for development)
3. Ensure database user has correct permissions
4. Test with mongosh:
   ```bash
   mongosh "mongodb+srv://username:password@cluster.mongodb.net/smart_school_erp"
   ```

### Issue: CORS Error

**Solution:**
CORS is already configured in backend. If still getting errors:
1. Check server is running on port 5000
2. Check `.env` has correct API_BASE_URL in frontend
3. Clear browser cache (Cmd+Shift+Delete)

### Issue: Node modules issues

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install
```

### Issue: Hot Reload Not Working

**Solution:**
```bash
# Kill all node processes
pkill -f "node"

# Restart backend
cd server && npm start

# Restart frontend in new terminal
cd client && npm run dev
```

---

## 📦 Package Versions

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "nodemon": "^2.0.20"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.10.0",
  "axios": "^1.3.4",
  "tailwindcss": "^3.2.7",
  "react-icons": "^4.8.0",
  "date-fns": "^2.29.3"
}
```

---

## 🔐 Security Setup

### 1. Generate Strong JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Use the output in `.env` as JWT_SECRET

### 2. Environment Variables Checklist

- ✅ JWT_SECRET - Random 32+ character string
- ✅ MONGODB_URI - Secure connection string
- ✅ NODE_ENV - Set to "development" locally
- ✅ MAX_FILE_SIZE - Limited file upload size

---

## 🧪 Testing the Setup

### Test Login Flow

1. Open `http://localhost:5173`
2. Enter test credentials:
   - Email: `admin@smartschool.com`
   - Password: `admin@123`
3. Should redirect to dashboard
4. Check browser console for any errors

### Test API

```bash
# Test endpoint without authentication
curl http://localhost:5000/api/auth/test

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@smartschool.com","password":"admin@123"}'
```

---

## 📚 Next Steps

1. **Explore Dashboard** - Understand the UI structure
2. **Review API Documentation** - See API_DOCUMENTATION.md
3. **Study Models** - Understand MongoDB schema design
4. **Customize Branding** - Change school name, logo, colors
5. **Add Features** - Extend functionality as needed

---

## 🆘 Getting Help

If you encounter issues:

1. **Check Logs** - Look at server and browser console
2. **Verify Setup** - Re-check all .env variables
3. **Search Issues** - GitHub Issues section
4. **Create Issue** - Provide detailed error information

---

**Setup Complete! 🎉**

Your Smart School ERP is ready for development!
