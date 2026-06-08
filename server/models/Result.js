const mongoose = require('mongoose');

/**
 * Result Schema - Stores exam results for students
 * References Student, Exam, and Teacher models
 */
const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID is required'],
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: [true, 'Exam ID is required'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
    },
    marksObtained: {
      type: Number,
      required: [true, 'Marks obtained is required'],
      min: [0, 'Marks cannot be negative'],
    },
    totalMarks: {
      type: Number,
      required: [true, 'Total marks is required'],
    },
    percentage: {
      type: Number,
      default: 0,
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'],
      default: null,
    },
    status: {
      type: String,
      enum: ['Pass', 'Fail'],
      default: null,
    },
    remarks: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    evaluatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    evaluationDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

/**
 * Pre-save hook to calculate percentage and grade
 */
resultSchema.pre('save', function (next) {
  // Calculate percentage
  if (this.totalMarks > 0) {
    this.percentage = (this.marksObtained / this.totalMarks) * 100;
  }

  // Assign grade based on percentage
  if (this.percentage >= 90) {
    this.grade = 'A+';
  } else if (this.percentage >= 80) {
    this.grade = 'A';
  } else if (this.percentage >= 70) {
    this.grade = 'B+';
  } else if (this.percentage >= 60) {
    this.grade = 'B';
  } else if (this.percentage >= 50) {
    this.grade = 'C+';
  } else if (this.percentage >= 40) {
    this.grade = 'C';
  } else if (this.percentage >= 30) {
    this.grade = 'D';
  } else {
    this.grade = 'F';
  }

  // Determine pass/fail (assuming 35% is passing)
  this.status = this.percentage >= 35 ? 'Pass' : 'Fail';

  next();
});

/**
 * Index for efficient querying
 */
resultSchema.index({ studentId: 1 });
resultSchema.index({ examId: 1 });
resultSchema.index({ className: 1, section: 1 });

/**
 * Static method to get student transcript
 */
resultSchema.statics.getStudentTranscript = async function (studentId) {
  return await this.find({ studentId }).populate('examId').sort('-createdAt');
};

module.exports = mongoose.model('Result', resultSchema);
