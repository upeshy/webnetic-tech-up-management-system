const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const { generateToken } = require('../utils/tokenGenerator');
const { validateEmail, validatePassword } = require('../utils/validators');

/**

* Register User

* POST /api/auth/register
  */
  const register = async (req, res) => {
  try {
  const {
  email,
  password,
  firstName,
  lastName,
  role,
  phone
  } = req.body;
  
  // Validation
  if (!email || !password || !firstName || !lastName) {
  return res.status(400).json({
  success: false,
  message: 'Please provide all required fields'
  });
  }
  
  // Email Validation
  if (!validateEmail(email)) {
  return res.status(400).json({
  success: false,
  message: 'Please provide valid email'
  });
  }
  
  // Password Validation
  const passwordValidation = validatePassword(password);
  
  if (!passwordValidation.valid) {
  return res.status(400).json({
  success: false,
  message: passwordValidation.message
  });
  }
  
  // Check Existing User
  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
  return res.status(400).json({
  success: false,
  message: 'User already exists'
  });
  }
  
  // Create User
  const user = await User.create({
  email,
  password,
  firstName,
  lastName,
  role: role || 'student',
  phone
  });
  
  // Generate JWT Token
  const token = generateToken(
  user._id,
  user.role,
  user.email
  );
  
  res.status(201).json({
  success: true,
  message: 'User registered successfully',
  token,
  user: {
  id: user._id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role
  }
  });

} catch (error) {
console.error('Register Error:', error);

res.status(500).json({
  success: false,
  message: error.message
});

}
};

/**

* Login User

* POST /api/auth/login
  */
  const login = async (req, res) => {
  try {
  const { email, password } = req.body;
  
  // Validation
  if (!email || !password) {
  return res.status(400).json({
  success: false,
  message: 'Please provide email and password'
  });
  }
  
  // Find User
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
  return res.status(401).json({
  success: false,
  message: 'Invalid credentials'
  });
  }
  
  // Check Active Status
  if (!user.isActive) {
  return res.status(401).json({
  success: false,
  message: 'Account is deactivated'
  });
  }
  
  // Match Password
  const isMatch = await user.matchPassword(password);
  
  if (!isMatch) {
  return res.status(401).json({
  success: false,
  message: 'Invalid credentials'
  });
  }
  
  // Update Last Login
  user.lastLogin = new Date();
  await user.save();
  
  // Generate Token
  const token = generateToken(
  user._id,
  user.role,
  user.email
  );
  
  res.status(200).json({
  success: true,
  message: 'Login successful',
  token,
  user: {
  id: user._id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role
  }
  });

} catch (error) {
console.error('Login Error:', error);

res.status(500).json({
  success: false,
  message: error.message
});

}
};

/**

* Get Logged In User Profile

* GET /api/auth/me
  */
  const getProfile = async (req, res) => {
  try {
  
  const user = await User.findById(req.userId);
  
  if (!user) {
  return res.status(404).json({
  success: false,
  message: 'User not found'
  });
  }
  
  let profileData = {
  user
  };
  
  // Student Data
  if (user.role === 'student') {
  const student = await Student.findOne({
  userId: user._id
  });
  
  profileData.studentData = student;
  }
  
  // Teacher Data
  if (user.role === 'teacher') {
  const teacher = await Teacher.findOne({
  userId: user._id
  });
  
  profileData.teacherData = teacher;
  }
  
  res.status(200).json({
  success: true,
  data: profileData
  });

} catch (error) {
console.error('Profile Error:', error);

res.status(500).json({
  success: false,
  message: error.message
});

}
};

/**

* Change Password

* PUT /api/auth/change-password
  */
  const changePassword = async (req, res) => {
  try {
  
  const {
  currentPassword,
  newPassword
  } = req.body;
  
  // Validation
  if (!currentPassword || !newPassword) {
  return res.status(400).json({
  success: false,
  message: 'Please provide passwords'
  });
  }
  
  // Find User
  const user = await User.findById(req.userId)
  .select('+password');
  
  // Check Current Password
  const isMatch = await user.matchPassword(currentPassword);
  
  if (!isMatch) {
  return res.status(401).json({
  success: false,
  message: 'Current password incorrect'
  });
  }
  
  // Validate New Password
  const passwordValidation =
  validatePassword(newPassword);
  
  if (!passwordValidation.valid) {
  return res.status(400).json({
  success: false,
  message: passwordValidation.message
  });
  }
  
  // Update Password
  user.password = newPassword;
  
  await user.save();
  
  res.status(200).json({
  success: true,
  message: 'Password changed successfully'
  });

} catch (error) {
console.error('Change Password Error:', error);

res.status(500).json({
  success: false,
  message: error.message
});

}
};

module.exports = {
register,
login,
getProfile,
changePassword
};
