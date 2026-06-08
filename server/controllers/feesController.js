const Fees = require('../models/Fees');
const Student = require('../models/Student');

/**
 * Get all fees records
 * GET /api/fees
 */
const getFees = async (req, res) => {
  try {
    const { studentId, status, month, year } = req.query;
    let query = {};

    if (studentId) query.studentId = studentId;
    if (status) query.status = status;
    if (month) query.month = month;
    if (year) query.year = parseInt(year);

    const records = await Fees.find(query).populate('studentId', 'rollNumber className');

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error('Get fees error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching fees: ' + error.message,
    });
  }
};

/**
 * Get fees by ID
 * GET /api/fees/:id
 */
const getFeesById = async (req, res) => {
  try {
    const record = await Fees.findById(req.params.id).populate('studentId');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Fees record not found',
      });
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error('Get fees error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching fees: ' + error.message,
    });
  }
};

/**
 * Create fees record
 * POST /api/fees
 */
const createFees = async (req, res) => {
  try {
    const { studentId, className, feeType, amount, dueDate, month, year } = req.body;

    if (!studentId || !className || !feeType || !amount || !dueDate || !month || !year) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const fees = await Fees.create({
      studentId,
      className,
      feeType,
      amount,
      dueDate,
      month,
      year,
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Fees record created successfully',
      data: fees,
    });
  } catch (error) {
    console.error('Create fees error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating fees: ' + error.message,
    });
  }
};

/**
 * Record fee payment
 * PUT /api/fees/:id/pay
 */
const payFees = async (req, res) => {
  try {
    const { amountPaid, paymentMethod, transactionId, remarks } = req.body;

    if (!amountPaid || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount paid and payment method',
      });
    }

    const fees = await Fees.findById(req.params.id);

    if (!fees) {
      return res.status(404).json({
        success: false,
        message: 'Fees record not found',
      });
    }

    const previouslyPaid = fees.amountPaid;
    fees.amountPaid = previouslyPaid + amountPaid;
    fees.paymentMethod = paymentMethod;
    fees.transactionId = transactionId;
    fees.paidDate = new Date();
    fees.remarks = remarks;

    // Update status
    if (fees.amountPaid >= fees.amount) {
      fees.status = 'Paid';
    } else if (fees.amountPaid > 0) {
      fees.status = 'Partial';
    }

    await fees.save();

    res.status(200).json({
      success: true,
      message: 'Payment recorded successfully',
      data: fees,
    });
  } catch (error) {
    console.error('Pay fees error:', error);
    res.status(500).json({
      success: false,
      message: 'Error recording payment: ' + error.message,
    });
  }
};

/**
 * Get student fee summary
 * GET /api/fees/summary/:studentId
 */
const getFeeSummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    const summary = await Fees.calculateTotalFees(
      req.params.studentId,
      month || new Date().getMonth(),
      year || new Date().getFullYear()
    );

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error('Get fee summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching fee summary: ' + error.message,
    });
  }
};

/**
 * Update fees record
 * PUT /api/fees/:id
 */
const updateFees = async (req, res) => {
  try {
    const { amount, dueDate, feeType, remarks } = req.body;

    const fees = await Fees.findByIdAndUpdate(
      req.params.id,
      { amount, dueDate, feeType, remarks },
      { new: true, runValidators: true }
    );

    if (!fees) {
      return res.status(404).json({
        success: false,
        message: 'Fees record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Fees record updated successfully',
      data: fees,
    });
  } catch (error) {
    console.error('Update fees error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating fees: ' + error.message,
    });
  }
};

/**
 * Delete fees record
 * DELETE /api/fees/:id
 */
const deleteFees = async (req, res) => {
  try {
    const fees = await Fees.findByIdAndDelete(req.params.id);

    if (!fees) {
      return res.status(404).json({
        success: false,
        message: 'Fees record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Fees record deleted successfully',
    });
  } catch (error) {
    console.error('Delete fees error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting fees: ' + error.message,
    });
  }
};

module.exports = {
  getFees,
  getFeesById,
  createFees,
  payFees,
  getFeeSummary,
  updateFees,
  deleteFees,
};
