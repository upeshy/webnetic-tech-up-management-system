const Attendance = require('../models/Attendance');

/**
 * Get attendance records
 * GET /api/attendance
 */
const getAttendance = async (req, res) => {
  try {
    const { studentId, className, section, date } = req.query;
    let query = {};

    if (studentId) query.studentId = studentId;
    if (className) query.className = className;
    if (section) query.section = section;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    const records = await Attendance.find(query).populate('studentId', 'rollNumber').populate('teacherId', 'firstName lastName');

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance: ' + error.message,
    });
  }
};

/**
 * Get attendance by ID
 * GET /api/attendance/:id
 */
const getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id).populate('studentId').populate('teacherId');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found',
      });
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance: ' + error.message,
    });
  }
};

/**
 * Create attendance record
 * POST /api/attendance
 */
const createAttendance = async (req, res) => {
  try {
    const { studentId, teacherId, className, section, date, status, remarks, subjectName } = req.body;

    if (!studentId || !teacherId || !className || !section || !date || !status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const attendance = await Attendance.create({
      studentId,
      teacherId,
      className,
      section,
      date,
      status,
      remarks,
      subjectName,
    });

    res.status(201).json({
      success: true,
      message: 'Attendance record created successfully',
      data: attendance,
    });
  } catch (error) {
    console.error('Create attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating attendance: ' + error.message,
    });
  }
};

/**
 * Bulk create attendance for a class
 * POST /api/attendance/bulk
 */
const createBulkAttendance = async (req, res) => {
  try {
    const { attendanceRecords } = req.body;

    if (!attendanceRecords || !Array.isArray(attendanceRecords)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid attendance records array',
      });
    }

    const records = await Attendance.insertMany(attendanceRecords);

    res.status(201).json({
      success: true,
      message: `${records.length} attendance records created successfully`,
      data: records,
    });
  } catch (error) {
    console.error('Bulk create attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating attendance records: ' + error.message,
    });
  }
};

/**
 * Update attendance record
 * PUT /api/attendance/:id
 */
const updateAttendance = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const record = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance updated successfully',
      data: record,
    });
  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating attendance: ' + error.message,
    });
  }
};

/**
 * Get student attendance summary
 * GET /api/attendance/summary/:studentId
 */
const getAttendanceSummary = async (req, res) => {
  try {
    const { month = new Date().getMonth() } = req.query;
    const summary = await Attendance.getAttendanceSummary(req.params.studentId, month);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error('Get attendance summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance summary: ' + error.message,
    });
  }
};

/**
 * Delete attendance record
 * DELETE /api/attendance/:id
 */
const deleteAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance record deleted successfully',
    });
  } catch (error) {
    console.error('Delete attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting attendance: ' + error.message,
    });
  }
};

module.exports = {
  getAttendance,
  getAttendanceById,
  createAttendance,
  createBulkAttendance,
  updateAttendance,
  getAttendanceSummary,
  deleteAttendance,
};
