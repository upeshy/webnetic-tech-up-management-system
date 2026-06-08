const mongoose = require('mongoose');

/**
 * Student Schema - Stores student information
 * References User model for authentication
 */
const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      unique: true,
    },
    className: {
      type: String,
      required: [true, 'Class is required'],
      enum: [
        'Class 1',
        'Class 2',
        'Class 3',
        'Class 4',
        'Class 5',
        'Class 6',
        'Class 7',
        'Class 8',
        'Class 9',
        'Class 10',
        'Class 11',
        'Class 12',
      ],
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      enum: ['A', 'B', 'C', 'D'],
    },
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
    guardianName: {
      type: String,
      required: [true, 'Guardian name is required'],
    },
    guardianPhone: {
      type: String,
      required: [true, 'Guardian phone is required'],
    },
    guardianEmail: {
      type: String,
      required: [true, 'Guardian email is required'],
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    enrollmentStatus: {
      type: String,
      enum: ['active', 'inactive', 'graduated'],
      default: 'active',
    },
    documents: {
      aadhar: String,
      pan: String,
      birthCertificate: String,
    },
    parentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

/**
 * Index for efficient querying
 */
studentSchema.index({ rollNumber: 1 });
studentSchema.index({ className: 1, section: 1 });
studentSchema.index({ userId: 1 });

module.exports = mongoose.model('Student', studentSchema);
