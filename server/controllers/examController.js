const Exam = require('../models/Exam');

/**
 * Get all exams
 * GET /api/exams
 */
const getExams = async (req, res) => {
  try {
    const { className, section, subject, status } = req.query;
    let query = {};

    if (className) query.className = className;
    if (section) query.section = section;
    if (subject) query.subject = subject;
    if (status) query.status = status;

    const exams = await Exam.find(query).populate('createdBy', 'firstName lastName');

    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams,
    });
  } catch (error) {
    console.error('Get exams error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching exams: ' + error.message,
    });
  }
};

/**
 * Get exam by ID
 * GET /api/exams/:id
 */
const getExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate('createdBy', 'firstName lastName email');

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found',
      });
    }

    res.status(200).json({
      success: true,
      data: exam,
    });
  } catch (error) {
    console.error('Get exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching exam: ' + error.message,
    });
  }
};

/**
 * Create exam
 * POST /api/exams
 */
const createExam = async (req, res) => {
  try {
    const { examName, examType, subject, className, section, totalMarks, passingMarks, examDate, examTime, duration, description } = req.body;

    if (!examName || !examType || !subject || !className || !section || !totalMarks || !passingMarks || !examDate || !examTime || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const exam = await Exam.create({
      examName,
      examType,
      subject,
      className,
      section,
      totalMarks,
      passingMarks,
      examDate,
      examTime,
      duration,
      description,
      createdBy: req.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      data: exam,
    });
  } catch (error) {
    console.error('Create exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating exam: ' + error.message,
    });
  }
};

/**
 * Update exam
 * PUT /api/exams/:id
 */
const updateExam = async (req, res) => {
  try {
    const { examName, examType, subject, totalMarks, passingMarks, examDate, examTime, duration, description, status } = req.body;

    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        examName,
        examType,
        subject,
        totalMarks,
        passingMarks,
        examDate,
        examTime,
        duration,
        description,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Exam updated successfully',
      data: exam,
    });
  } catch (error) {
    console.error('Update exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating exam: ' + error.message,
    });
  }
};

/**
 * Delete exam
 * DELETE /api/exams/:id
 */
const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Exam deleted successfully',
    });
  } catch (error) {
    console.error('Delete exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting exam: ' + error.message,
    });
  }
};

/**
 * Get upcoming exams
 * GET /api/exams/upcoming
 */
const getUpcomingExams = async (req, res) => {
  try {
    const currentDate = new Date();

    const exams = await Exam.find({
      examDate: { $gte: currentDate },
      status: 'Scheduled',
    }).sort({ examDate: 1 });

    res.status(200).json({
      success: true,
      count: exams.length,
      data: exams,
    });
  } catch (error) {
    console.error('Get upcoming exams error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming exams: ' + error.message,
    });
  }
};

module.exports = {
  getExams,
  getExam,
  createExam,
  updateExam,
  deleteExam,
  getUpcomingExams,
};
