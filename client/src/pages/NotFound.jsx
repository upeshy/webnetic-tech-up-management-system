/**
 * Not Found Page
 * 404 error page
 */

import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-light p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-dark mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, the page you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary inline-flex items-center gap-2"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;