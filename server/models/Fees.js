const mongoose = require('mongoose');

/**
 * Fees Schema - Tracks student fee payments
 * References Student model
 */
const feesSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID is required'],
    },
    className: {
      type: String,
      required: [true, 'Class is required'],
    },
    feeType: {
      type: String,
      enum: ['Tuition', 'Transportation', 'Miscellaneous', 'Sports', 'Books'],
      required: [true, 'Fee type is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be positive'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    paidDate: {
      type: Date,
      default: null,
    },
    amountPaid: {
      type: Number,
      default: 0,
      min: [0, 'Paid amount must be positive'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Partial', 'Paid', 'Overdue'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Check', 'Online Transfer', 'Card', 'UPI'],
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
    },
    remarks: {
      type: String,
      default: '',
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Index for efficient querying
 */
feesSchema.index({ studentId: 1 });
feesSchema.index({ className: 1, month: 1, year: 1 });
feesSchema.index({ status: 1 });

/**
 * Static method to calculate total fees for a student
 */
feesSchema.statics.calculateTotalFees = async function (studentId, month, year) {
  const records = await this.find({ studentId, month, year });
  const total = records.reduce((sum, record) => sum + record.amount, 0);
  const paid = records.reduce((sum, record) => sum + record.amountPaid, 0);
  return { total, paid, pending: total - paid };
};

module.exports = mongoose.model('Fees', feesSchema);
