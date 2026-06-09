const express = require("express");
const router = express.Router();

// TEST ROUTE
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working Successfully"
  });
});

// LOGIN ROUTE (DUMMY EXAMPLE)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email or password missing"
    });
  }

  res.json({
    success: true,
    token: "dummy-jwt-token",
    user: {
      email
    }
  });
});

module.exports = router;
