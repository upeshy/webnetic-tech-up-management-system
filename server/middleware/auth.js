const jwt = require('jsonwebtoken');

/**

* Middleware to verify JWT token

* Extracts token from Authorization header and validates it
  */
  const verifyToken = async (req, res, next) => {
  try {
  
  // Get token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  
  // Check token exists
  if (!token) {
  return res.status(401).json({
  success: false,
  message: 'No token provided. Please login first.'
  });
  }
  
  // Verify token
  const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
  );
  
  // Save user data in request
  req.userId = decoded.id;
  req.userRole = decoded.role;
  req.userEmail = decoded.email;
  
  next();

} catch (error) {

console.error('JWT Error:', error.message);

// Token expired
if (error.name === 'TokenExpiredError') {
  return res.status(401).json({
    success: false,
    message: 'Token has expired. Please login again.'
  });
}

// Invalid token
return res.status(401).json({
  success: false,
  message: 'Invalid token. Please login again.'
});

}
};

/**

* Middleware to check role authorization
* Example:
* authorizeRole('admin')
* authorizeRole('admin', 'teacher')
  */
  const authorizeRole = (...roles) => {

return (req, res, next) => {

// Check role access
if (!roles.includes(req.userRole)) {

  return res.status(403).json({
    success: false,
    message: `Access denied. Required role: ${roles.join(' or ')}`
  });

}

next();

};

};

/**

* Global Error Handler Middleware
  */
  const errorHandler = (err, req, res, next) => {

console.error('Server Error:', err);

// Mongoose Validation Error
if (err.name === 'ValidationError') {

return res.status(400).json({
  success: false,
  message: 'Validation error',
  errors: Object.values(err.errors).map(
    (e) => e.message
  )
});

}

// Mongo Duplicate Key Error
if (
err.name === 'MongoServerError' &&
err.code === 11000
) {

return res.status(400).json({
  success: false,
  message: 'Duplicate field value entered'
});

}

// Default Server Error
res.status(err.statusCode || 500).json({
success: false,
message: err.message || 'Internal server error'
});

};

module.exports = {
verifyToken,
authorizeRole,
errorHandler
};
