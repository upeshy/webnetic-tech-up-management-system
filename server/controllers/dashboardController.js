const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');
const Exam = require('../models/Exam');
const Result = require('../models/Result');
const Fees = require('../models/Fees');

/* ================= ADMIN DASHBOARD ================= */
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalExams = await Exam.countDocuments();

    const recentUsers = await User.find().sort('-createdAt').limit(5);
    const recentStudents = await Student.find()
      .sort('-createdAt')
      .limit(5)
      .populate('userId', 'firstName lastName');

    const feesData = await Fees.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalStudents,
        totalTeachers,
        totalExams,
        recentUsers,
        recentStudents,
        feesData,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= STUDENT DASHBOARD ================= */
const getStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id }).populate('userId');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    const upcomingExams = await Exam.find({
      className: student.className,
      section: student.section,
      examDate: { $gte: new Date() },
    }).sort('examDate');

    const recentResults = await Result.find({ studentId: student._id })
      .sort('-createdAt')
      .limit(5);

    const feesDue = await Fees.find({
      studentId: student._id,
      status: { $in: ['Pending', 'Partial'] },
    });

    res.json({
      success: true,
      data: {
        student,
        upcomingExams,
        recentResults,
        feesDue,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= TEACHER DASHBOARD ================= */
const getTeacherDashboard = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id }).populate('userId');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found',
      });
    }

    const createdExams = await Exam.find({ createdBy: teacher._id })
      .sort('-createdAt')
      .limit(5);

    res.json({
      success: true,
      data: {
        teacher,
        createdExams,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= STATISTICS ================= */
const getStatistics = async (req, res) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      students: await Student.countDocuments(),
      teachers: await Teacher.countDocuments(),
      exams: await Exam.countDocuments(),
      results: await Result.countDocuments(),
      attendanceRecords: await Attendance.countDocuments(),
      feeRecords: await Fees.countDocuments(),
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAdminDashboard,
  getStudentDashboard,
  getTeacherDashboard,
  getStatistics,
};
