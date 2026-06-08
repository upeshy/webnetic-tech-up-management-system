const mongoose = require('mongoose');

/**
 * Teacher Schema - Stores teacher information
 * References User model for authentication
 */
const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    employeeId: {
      type: String,
      required: [true, 'Employee ID is required'],
      unique: true,
    },
    qualification: {
      type: String,
      required: [true, 'Qualification is required'],
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
    },
    subjectsTeaching: [
      {
        type: String,
        enum: [
          'Mathematics',
          'English',
          'Science',
          'Social Studies',
          'Hindi',
          'Computer',
          'Physical Education',
          'Art',
          'Music',
        ],
      },
    ],
    classesAssigned: [
      {
        className: String,
        section: String,
      },
    ],
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [true, 'Gender is required'],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    dateOfJoining: {
      type: Date,
      default: Date.now,
    },
    experience: {
      type: Number,
      default: 0,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract'],
      default: 'Full-time',
    },
    documents: {
      aadhar: String,
      pan: String,
      certificateOfEducation: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/**
 * Index for efficient querying
 */
teacherSchema.index({ employeeId: 1 });
teacherSchema.index({ userId: 1 });
teacherSchema.index({ department: 1 });

module.exports = mongoose.model('Teacher', teacherSchema);
