const mongoose = require('mongoose');

/**
 * Attendance Schema - Tracks attendance records
 * References Student and Teacher models
 */
const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID is required'],
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, 'Teacher ID is required'],
    },
    className: {
      type: String,
      required: [true, 'Class is required'],
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late', 'Excused'],
      required: [true, 'Attendance status is required'],
    },
    remarks: {
      type: String,
      default: '',
    },
    subjectName: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

/**
 * Compound index for efficient querying
 */
attendanceSchema.index({ studentId: 1, date: 1 });
attendanceSchema.index({ className: 1, section: 1, date: 1 });
attendanceSchema.index({ teacherId: 1, date: 1 });

/**
 * Static method to get attendance summary
 */
attendanceSchema.statics.getAttendanceSummary = async function (studentId, month) {
  const startDate = new Date(new Date().getFullYear(), month, 1);
  const endDate = new Date(new Date().getFullYear(), month + 1, 0);

  const records = await this.find({
    studentId,
    date: { $gte: startDate, $lte: endDate },
  });

  const summary = {
    total: records.length,
    present: records.filter((r) => r.status === 'Present').length,
    absent: records.filter((r) => r.status === 'Absent').length,
    late: records.filter((r) => r.status === 'Late').length,
    excused: records.filter((r) => r.status === 'Excused').length,
  };

  return summary;
};

module.exports = mongoose.model('Attendance', attendanceSchema);
