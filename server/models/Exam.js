const mongoose = require('mongoose');

/**
 * Exam Schema - Stores exam information
 * References Teacher model for exam creators
 */
const examSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: [true, 'Exam name is required'],
    },
    examType: {
      type: String,
      enum: ['Unit Test', 'Midterm', 'Final', 'Practical', 'Project'],
      required: [true, 'Exam type is required'],
    },
    subject: {
      type: String,
      enum: [
        'Mathematics',
        'English',
        'Science',
        'Social Studies',
        'Hindi',
        'Computer',
      ],
      required: [true, 'Subject is required'],
    },
    className: {
      type: String,
      required: [true, 'Class is required'],
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
    },
    totalMarks: {
      type: Number,
      required: [true, 'Total marks is required'],
      min: [1, 'Total marks must be greater than 0'],
    },
    passingMarks: {
      type: Number,
      required: [true, 'Passing marks is required'],
    },
    examDate: {
      type: Date,
      required: [true, 'Exam date is required'],
    },
    examTime: {
      type: String,
      required: [true, 'Exam time is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration (in minutes) is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, 'Teacher ID is required'],
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
  },
  { timestamps: true }
);

/**
 * Index for efficient querying
 */
examSchema.index({ className: 1, section: 1 });
examSchema.index({ examDate: 1 });
examSchema.index({ subject: 1 });

module.exports = mongoose.model('Exam', examSchema);
