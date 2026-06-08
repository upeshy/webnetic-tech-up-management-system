/**
 * Seed database with dummy data
 * Run: node scripts/seedDatabase.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');
const Fees = require('../models/Fees');
const Exam = require('../models/Exam');
const Result = require('../models/Result');

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await Attendance.deleteMany({});
    await Fees.deleteMany({});
    await Exam.deleteMany({});
    await Result.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@smartschool.com',
      password: 'admin@123',
      role: 'admin',
      phone: '9876543210'
    });

    // Create teacher users
    const teacher1 = await User.create({
      name: 'Mr. Smith',
      email: 'teacher@smartschool.com',
      password: 'teacher@123',
      role: 'teacher',
      phone: '9876543211'
    });

    const teacher2 = await User.create({
      name: 'Ms. Johnson',
      email: 'teacher2@smartschool.com',
      password: 'teacher@123',
      role: 'teacher',
      phone: '9876543212'
    });

    // Create student users
    const studentUsers = [];
    for (let i = 1; i <= 5; i++) {
      const user = await User.create({
        name: `Student ${i}`,
        email: `student${i}@smartschool.com`,
        password: 'student@123',
        role: 'student',
        phone: `987654321${i}`
      });
      studentUsers.push(user);
    }

    // Create teachers
    await Teacher.create([
      {
        userId: teacher1._id,
        firstName: 'Mr.',
        lastName: 'Smith',
        subject: 'Mathematics',
        qualification: 'B.Tech Mathematics',
        experience: '5 years',
        classes: ['10A', '10B'],
        salary: 50000,
        joiningDate: new Date('2020-06-01'),
        phoneNumber: '9876543211'
      },
      {
        userId: teacher2._id,
        firstName: 'Ms.',
        lastName: 'Johnson',
        subject: 'English',
        qualification: 'MA English',
        experience: '3 years',
        classes: ['10A', '11A'],
        salary: 45000,
        joiningDate: new Date('2021-06-01'),
        phoneNumber: '9876543212'
      }
    ]);

    // Create students
    const students = [];
    for (let i = 0; i < 5; i++) {
      const student = await Student.create({
        userId: studentUsers[i]._id,
        firstName: `John`,
        lastName: `Doe${i + 1}`,
        dateOfBirth: new Date('2008-05-15'),
        gender: i % 2 === 0 ? 'Male' : 'Female',
        class: '10',
        section: i < 3 ? 'A' : 'B',
        rollNumber: `${i + 1}`,
        parentInfo: {
          name: `Parent ${i + 1}`,
          email: `parent${i + 1}@email.com`,
          phone: `987654321${i}`
        },
        address: `Address ${i + 1}`,
        city: 'City',
        state: 'State'
      });
      students.push(student);
    }

    // Create exams
    const exams = await Exam.create([
      {
        name: 'Mid Term Exam',
        class: '10',
        subject: 'Mathematics',
        date: new Date('2025-02-15'),
        totalMarks: 100,
        passingMarks: 40,
        term: '1'
      },
      {
        name: 'Mid Term Exam',
        class: '10',
        subject: 'English',
        date: new Date('2025-02-16'),
        totalMarks: 100,
        passingMarks: 40,
        term: '1'
      }
    ]);

    // Create results
    for (let i = 0; i < students.length; i++) {
      for (let j = 0; j < exams.length; j++) {
        const marksObtained = 60 + Math.random() * 40;
        const percentage = (marksObtained / exams[j].totalMarks) * 100;
        let grade = 'F';
        if (percentage >= 90) grade = 'A';
        else if (percentage >= 80) grade = 'B';
        else if (percentage >= 70) grade = 'C';
        else if (percentage >= 60) grade = 'D';

        await Result.create({
          examId: exams[j]._id,
          studentId: students[i]._id,
          marksObtained: Math.round(marksObtained),
          percentage: parseFloat(percentage.toFixed(2)),
          grade
        });
      }
    }

    // Create attendance
    for (let i = 0; i < students.length; i++) {
      for (let day = 1; day <= 20; day++) {
        const date = new Date(2025, 0, day);
        const status = Math.random() > 0.1 ? 'present' : 'absent';
        
        await Attendance.create({
          studentId: students[i]._id,
          class: students[i].class,
          section: students[i].section,
          date,
          status,
          markedBy: teacher1._id
        });
      }
    }

    // Create fees
    for (let i = 0; i < students.length; i++) {
      const months = ['January', 'February', 'March', 'April', 'May'];
      for (let month of months) {
        await Fees.create({
          studentId: students[i]._id,
          month,
          year: 2025,
          amount: 5000,
          dueDate: new Date('2025-05-31'),
          status: Math.random() > 0.3 ? 'paid' : 'pending'
        });
      }
    }

    console.log('✓ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();