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

    // Get recent activities
    const recentUsers = await User.find().sort('-createdAt').limit(5);
    const recentStudents = await Student.find().sort('-createdAt').limit(5).populate('userId', 'firstName lastName');

    // Fee statistics
    const feesData = await Fees.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    res.status(200).json({
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
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data: ' + error.message,
    });
  }
};

/**
 * Get student dashboard data
 * GET /api/dashboard/student
 */
const getStudentDashboard = async (req, res) => {
  try {
    // Get student details
    const student = await Student.findOne({ userId: req.userId }).populate('userId');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found',
      });
    }

    // Get attendance summary
    const currentMonth = new Date().getMonth();
    const attendanceSummary = await Attendance.getAttendanceSummary(student._id, currentMonth);

    // Get upcoming exams for student's class
    const upcomingExams = await Exam.find({
      className: student.className,
      section: student.section,
      examDate: { $gte: new Date() },
    }).sort({ examDate: 1 });

    // Get recent results
    const recentResults = await Result.find({ studentId: student._id }).sort('-createdAt').limit(5).populate('examId');

    // Get fees due
    const feesDue = await Fees.find({
      studentId: student._id,
      status: { $in: ['Pending', 'Partial'] },
    });

    res.status(200).json({
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
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data: ' + error.message,
    });
  }
};

/**
 * Get teacher dashboard data
 * GET /api/dashboard/teacher
 */
const getTeacherDashboard = async (req, res) => {
  try {
    // Get teacher details
    const teacher = await Teacher.findOne({ userId: req.userId }).populate('userId');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher profile not found',
      });
    }

    // Get classes assigned
    const classes = teacher.classesAssigned;

    // Get exams created by teacher
    const createdExams = await Exam.find({ createdBy: teacher._id }).sort('-createdAt').limit(5);

    // Get total students under teacher
    const totalStudents = await Student.countDocuments({
      $or: classes.map((c) => ({
        className: c.className,
        section: c.section,
      })),
    });

    // Get attendance statistics
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

    res.status(200).json({
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
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data: ' + error.message,
    });
  }
};

/**
 * Get system statistics
 * GET /api/dashboard/statistics
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

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics: ' + error.message,
    });
  }
};

module.exports = {
  getAdminDashboard,
  getStudentDashboard,
  getTeacherDashboard,
  getStatistics,
};
