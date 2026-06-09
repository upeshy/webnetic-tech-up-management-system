/**
 * Smart School ERP - Main App Component
 * Routes and layout management
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Exams from './pages/Exams';
import NotFound from './pages/NotFound';

function App() {

  return (

    <Router>

      <AuthProvider>

        <Routes>

          {/* ===================== */}
          {/* LOGIN */}
          {/* ===================== */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* ===================== */}
          {/* ADMIN */}
          {/* ===================== */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ===================== */}
          {/* STUDENT */}
          {/* ===================== */}

          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />

          {/* ===================== */}
          {/* TEACHER */}
          {/* ===================== */}

          <Route
            path="/teacher"
            element={
              <ProtectedRoute>
                <Teachers />
              </ProtectedRoute>
            }
          />

          {/* ===================== */}
          {/* OTHER ROUTES */}
          {/* ===================== */}

          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fees"
            element={
              <ProtectedRoute>
                <Fees />
              </ProtectedRoute>
            }
          />

          <Route
            path="/exams"
            element={
              <ProtectedRoute>
                <Exams />
              </ProtectedRoute>
            }
          />

          {/* ===================== */}
          {/* DEFAULT */}
          {/* ===================== */}

          <Route
            path="/"
            element={<Login />}
          />

          {/* ===================== */}
          {/* NOT FOUND */}
          {/* ===================== */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </AuthProvider>

    </Router>
  );
}

export default App;
