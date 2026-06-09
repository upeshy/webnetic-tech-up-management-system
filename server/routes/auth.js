const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working Successfully"
  });
});

// LOGIN ROUTE (REAL JWT)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email or password missing"
    });
  }

  // TODO: yahan DB check hona chahiye (abhi demo)
  const user = {
    id: "123",
    email,
    role: "admin"
  };

  const token = jwt.sign(
    user,
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    success: true,
    token,
    user
  });
});

module.exports = router;
