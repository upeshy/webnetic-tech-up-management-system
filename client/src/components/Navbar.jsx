/**
 * Navbar Component
 * Top navigation bar
 */

import { FiBell, FiUser, FiChevronDown } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left side - Title */}
      <div className="ml-64 lg:ml-0">
        <h2 className="text-xl font-semibold text-dark">Welcome back, {user?.name}!</h2>
        <p className="text-sm text-gray-500 capitalize">Role: {user?.role}</p>
      </div>

      {/* Right side - Icons */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative text-gray-600 hover:text-primary transition-colors">
          <FiBell size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-dark">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <FiChevronDown size={20} className="text-gray-600" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;