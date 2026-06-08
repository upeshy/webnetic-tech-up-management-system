/**
 * Request validators
 * Validates incoming request data
 */

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

const validateRegistration = (data) => {
  const errors = {};

  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.password || !validatePassword(data.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!data.role || !['admin', 'teacher', 'student', 'parent'].includes(data.role)) {
    errors.role = 'Valid role is required';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Phone must be 10 digits';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateStudentData = (data) => {
  const errors = {};

  if (!data.firstName) errors.firstName = 'First name is required';
  if (!data.lastName) errors.lastName = 'Last name is required';
  if (!data.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
  if (!data.gender) errors.gender = 'Gender is required';
  if (!data.class) errors.class = 'Class is required';
  if (!data.section) errors.section = 'Section is required';
  if (!data.parentName) errors.parentName = 'Parent name is required';
  if (!data.parentEmail || !validateEmail(data.parentEmail)) {
    errors.parentEmail = 'Valid parent email is required';
  }
  if (!data.parentPhone || !validatePhone(data.parentPhone)) {
    errors.parentPhone = 'Valid parent phone is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRegistration,
  validateStudentData
};