/**
 * Login Page
 * User authentication
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import { DEFAULT_CREDENTIALS } from '../config';

const Login = () => {

  const navigate = useNavigate();

  const { login, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [validationError, setValidationError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setValidationError('');
    setSuccessMsg('');
  };

  // Handle Login Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    setValidationError('');
    setSuccessMsg('');

    // Validation
    if (!formData.email || !formData.password) {

      setValidationError('Please fill in all fields');

      return;
    }

    try {

      console.log("STEP 1: Sending login request");

      const result = await login(
        formData.email,
        formData.password
      );

      console.log("LOGIN RESULT:", result);

      // Success
      if (result?.success) {

        console.log("STEP 2: Login success");

        // Save Token
        localStorage.setItem(
          'token',
          result.token
        );

        console.log(
          "TOKEN SAVED:",
          localStorage.getItem('token')
        );

        // Success Message
        setSuccessMsg("Login Successful 🎉");

        // Redirect
        setTimeout(() => {

  console.log("STEP 3: Redirecting");

  // Save User
  localStorage.setItem(
    "user",
    JSON.stringify(result.user)
  );

  // ROLE BASED REDIRECT
  if (result.user.role === "admin") {

    navigate("/admin");

  }
  else if (result.user.role === "teacher") {

    navigate("/teacher");

  }
  else if (result.user.role === "student") {

    navigate("/student");

  }
  else if (result.user.role === "parent") {

    navigate("/student");

  }
  else {

    navigate("/login");
  }

}, 1000);

      } else {

        setValidationError(
          result?.message || "Login failed"
        );
      }

    } catch (err) {

      console.error("LOGIN ERROR:", err);

      setValidationError(
        "Something went wrong during login"
      );
    }
  };

  // Fill Demo Credentials
  const fillCredentials = (role) => {

    const creds = DEFAULT_CREDENTIALS[role];

    setFormData(creds);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 animate-fadeIn">

          {/* Logo */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-primary mb-2">
              SmartERP
            </h1>

            <p className="text-gray-600">
              School Management System
            </p>

          </div>

          {/* Error Message */}
          {(error || validationError) && (

            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">

              <p className="text-sm">
                {error || validationError}
              </p>

            </div>
          )}

          {/* Success Message */}
          {successMsg && (

            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">

              <p className="text-sm">
                {successMsg}
              </p>

            </div>
          )}

          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Email */}
            <div>

              <label className="label">
                Email
              </label>

              <div className="relative">

                <FiMail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input-field pl-10"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="label">
                Password
              </label>

              <div className="relative">

                <FiLock
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input-field pl-10"
                />

              </div>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {loading
                ? 'Logging in...'
                : 'Login'}

            </button>

          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">

            <p className="text-sm font-semibold text-gray-700 mb-3">
              Demo Credentials:
            </p>

            <div className="space-y-2">

              {Object.entries(DEFAULT_CREDENTIALS).map(
                ([role, creds]) => (

                  <button
                    key={role}
                    onClick={() => fillCredentials(role)}
                    className="w-full text-left text-xs p-2 hover:bg-gray-200 rounded transition-colors capitalize"
                  >

                    <span className="font-medium text-dark">
                      {role}:
                    </span>

                    <br />

                    <span className="text-gray-600">
                      {creds.email}
                    </span>

                  </button>
                )
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
