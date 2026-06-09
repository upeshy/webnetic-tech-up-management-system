const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ======================================
// TEST ROUTE
// ======================================
router.get("/test", (req, res) => {

  console.log("🔍 Auth Test Route Hit");

  return res.status(200).json({
    success: true,
    step: "TEST_ROUTE",
    message: "✅ Auth Route Working Successfully"
  });
});

// ======================================
// LOGIN ROUTE (FINAL STRONG VERSION)
// ======================================
router.post("/login", async (req, res) => {

  console.log("🚀 LOGIN REQUEST RECEIVED");

  try {

    // ======================================
    // STEP 1: GET DATA
    // ======================================
    const { email, password } = req.body;

    console.log("📩 EMAIL:", email);

    // ======================================
    // STEP 2: VALIDATION
    // ======================================
    if (!email || !password) {

      console.log("❌ VALIDATION FAILED");

      return res.status(400).json({
        success: false,
        step: "VALIDATION_ERROR",
        message: "Email and password are required"
      });
    }

    console.log("✅ STEP 1 PASSED: Validation success");

    // ======================================
    // STEP 3: ROLE DETECTION
    // ======================================
    let role = "student";

    if (email.includes("admin")) {
      role = "admin";
    }
    else if (email.includes("teacher")) {
      role = "teacher";
    }
    else if (email.includes("student")) {
      role = "student";
    }
    else if (email.includes("parent")) {
      role = "parent";
    }

    console.log("✅ STEP 2 PASSED: Role =", role);

    // ======================================
    // STEP 4: USER OBJECT
    // ======================================
    const user = {
      id: "123",
      name: email.split("@")[0],
      email,
      role
    };

    console.log("✅ STEP 3 PASSED: User object created");

    // ======================================
    // STEP 5: GENERATE JWT TOKEN
    // ======================================
    const token = jwt.sign(
      user,
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    console.log("✅ STEP 4 PASSED: JWT Token generated");

    // ======================================
    // STEP 6: SUCCESS RESPONSE
    // ======================================
    console.log("🎉 LOGIN SUCCESSFUL");

    return res.status(200).json({

      success: true,

      step: "LOGIN_SUCCESS",

      message: "✅ Login Successful",

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }

    });

  } catch (error) {

    console.log("❌ LOGIN SERVER ERROR");
    console.log(error);

    return res.status(500).json({
      success: false,
      step: "SERVER_ERROR",
      message: "Internal Server Error",
      error: error.message
    });
  }
});

// ======================================
// VERIFY TOKEN ROUTE
// ======================================
router.get("/me", (req, res) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      user: decoded
    });

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message
    });
  }
});

module.exports = router;
