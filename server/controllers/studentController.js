const Student = require('../models/Student');
const User = require('../models/User');

/**
 * Get all students
 * GET /api/students
 */
const getAllStudents = async (req, res) => {
  try {
    const { className, section } = req.query;
    let query = {};

    if (className) query.className = className;
    if (section) query.section = section;

    const students = await Student.find(query).populate('userId', 'email firstName lastName phone');

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students: ' + error.message,
    });
  }
};

/**
 * Get student by ID
 * GET /api/students/:id
 */
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('userId', 'email firstName lastName phone');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student: ' + error.message,
    });
  }
};

/**
 * Create new student
 * POST /api/students
 */
const createStudent = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, rollNumber, className, section, dateOfBirth, gender, guardianName, guardianPhone, guardianEmail } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName || !rollNumber || !className || !section) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role: 'student',
      phone,
    });

    // Create student record
    const student = await Student.create({
      userId: user._id,
      rollNumber,
      className,
      section,
      dateOfBirth,
      gender,
      guardianName,
      guardianPhone,
      guardianEmail,
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student,
    });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating student: ' + error.message,
    });
  }
};

/**
 * Update student
 * PUT /api/students/:id
 */
const updateStudent = async (req, res) => {
  try {
    const { className, section, dateOfBirth, gender, guardianName, guardianPhone, guardianEmail, address } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        className,
        section,
        dateOfBirth,
        gender,
        guardianName,
        guardianPhone,
        guardianEmail,
        address,
      },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating student: ' + error.message,
    });
  }
};

/**
 * Delete student
 * DELETE /api/students/:id
 */
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Delete associated user
    await User.findByIdAndDelete(student.userId);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting student: ' + error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
