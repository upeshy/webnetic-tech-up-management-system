const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ============================
// TEST ROUTE
// ============================
router.get("/test", (req, res) => {
  console.log("🔍 Auth Test Route Hit");

  res.status(200).json({
    success: true,
    step: "TEST_ROUTE",
    message: "Auth Route Working Successfully"
  });
});

// ============================
// LOGIN ROUTE (STRONG VERSION)
// ============================
router.post("/login", (req, res) => {
  console.log("🚀 LOGIN REQUEST RECEIVED");

  const { email, password } = req.body;

  // STEP 1: Input validation
  if (!email || !password) {
    console.log("❌ LOGIN FAILED: Missing fields");

    return res.status(400).json({
      success: false,
      step: "VALIDATION_ERROR",
      message: "Email or password missing"
    });
  }

  console.log("✅ STEP 1 PASSED: Input received");

  try {
    // STEP 2: Fake DB user (later replace with DB)
    const user = {
      id: "123",
      email,
      role: "admin"
    };

    console.log("✅ STEP 2 PASSED: User created");

    // STEP 3: JWT creation
    const token = jwt.sign(
      user,
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ STEP 3 PASSED: Token generated");

    // STEP 4: SUCCESS RESPONSE
    console.log("🎉 LOGIN SUCCESS");

    return res.status(200).json({
      success: true,
      step: "LOGIN_SUCCESS",
      message: "Login Successful",
      token,
      user
    });

  } catch (error) {
    console.log("❌ LOGIN ERROR:", error.message);

    return res.status(500).json({
      success: false,
      step: "SERVER_ERROR",
      message: "Internal Server Error",
      error: error.message
    });
  }
});

module.exports = router;
