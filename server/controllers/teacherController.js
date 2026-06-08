const Teacher = require('../models/Teacher');
const User = require('../models/User');

/**
 * Get all teachers
 * GET /api/teachers
 */
const getAllTeachers = async (req, res) => {
  try {
    const { department } = req.query;
    let query = {};

    if (department) query.department = department;

    const teachers = await Teacher.find(query).populate('userId', 'email firstName lastName phone');

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching teachers: ' + error.message,
    });
  }
};

/**
 * Get teacher by ID
 * GET /api/teachers/:id
 */
const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('userId', 'email firstName lastName phone');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found',
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error) {
    console.error('Get teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching teacher: ' + error.message,
    });
  }
};

/**
 * Create new teacher
 * POST /api/teachers
 */
const createTeacher = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, employeeId, qualification, specialization, subjectsTeaching, dateOfBirth, gender, department, experience } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName || !employeeId || !department) {
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
      role: 'teacher',
      phone,
    });

    // Create teacher record
    const teacher = await Teacher.create({
      userId: user._id,
      employeeId,
      qualification,
      specialization,
      subjectsTeaching,
      dateOfBirth,
      gender,
      department,
      experience,
      phone,
    });

    res.status(201).json({
      success: true,
      message: 'Teacher created successfully',
      data: teacher,
    });
  } catch (error) {
    console.error('Create teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating teacher: ' + error.message,
    });
  }
};

/**
 * Update teacher
 * PUT /api/teachers/:id
 */
const updateTeacher = async (req, res) => {
  try {
    const { qualification, specialization, subjectsTeaching, classesAssigned, experience, department, employmentType } = req.body;

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        qualification,
        specialization,
        subjectsTeaching,
        classesAssigned,
        experience,
        department,
        employmentType,
      },
      { new: true, runValidators: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Teacher updated successfully',
      data: teacher,
    });
  } catch (error) {
    console.error('Update teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating teacher: ' + error.message,
    });
  }
};

/**
 * Delete teacher
 * DELETE /api/teachers/:id
 */
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found',
      });
    }

    // Delete associated user
    await User.findByIdAndDelete(teacher.userId);

    res.status(200).json({
      success: true,
      message: 'Teacher deleted successfully',
    });
  } catch (error) {
    console.error('Delete teacher error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting teacher: ' + error.message,
    });
  }
};

module.exports = {
  getAllTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
