const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');
const Exam = require('../models/Exam');
const Result = require('../models/Result');
const Fees = require('../models/Fees');

/**
 * Get admin dashboard data
 * GET /api/dashboard/admin
 */
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalExams = await Exam.countDocuments();

    const recentUsers = await User.find()
      .sort('-createdAt')
      .limit(5);

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

    return res.status(200).json({
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
  } catch (error) {
    console.error('Get admin dashboard error:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Student Dashboard
 */
const getStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId }).populate('userId');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found',
      });
    }

    const currentMonth = new Date().getMonth();

    const attendanceSummary = await Attendance.getAttendanceSummary(
      student._id,
      currentMonth
    );

    const upcomingExams = await Exam.find({
      className: student.className,
      section: student.section,
      examDate: { $gte: new Date() },
    }).sort({ examDate: 1 });

    const recentResults = await Result.find({ studentId: student._id })
      .sort('-createdAt')
      .limit(5)
      .populate('examId');

    const feesDue = await Fees.find({
      studentId: student._id,
      status: { $in: ['Pending', 'Partial'] },
    });

    return res.status(200).json({
      success: true,
      data: {
        student,
        attendanceSummary,
        upcomingExams,
        recentResults,
        feesDue,
      },
    });
  } catch (error) {
    console.error('Get student dashboard error:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Teacher Dashboard
 */
const getTeacherDashboard = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.userId }).populate('userId');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher profile not found',
      });
    }

    const classes = teacher.classesAssigned || [];

    const createdExams = await Exam.find({ createdBy: teacher._id })
      .sort('-createdAt')
      .limit(5);

    const totalStudents = await Student.countDocuments({
      $or: classes.map((c) => ({
        className: c.className,
        section: c.section,
      })),
    });

    const attendanceStats = await Attendance.aggregate([
      {
        $match: { teacherId: teacher._id },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        teacher,
        classes,
        createdExams,
        totalStudents,
        attendanceStats,
      },
    });
  } catch (error) {
    console.error('Get teacher dashboard error:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * System Statistics
 */
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

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAdminDashboard,
  getStudentDashboard,
  getTeacherDashboard,
  getStatistics,
};
