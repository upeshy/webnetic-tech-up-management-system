/**
 * Sidebar Component
 * Main navigation sidebar
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUsers, FiBook, FiCalendar, FiDollarSign, FiAward, FiLogOut } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: FiHome },
    { path: '/students', label: 'Students', icon: FiUsers },
    { path: '/teachers', label: 'Teachers', icon: FiBook },
    { path: '/attendance', label: 'Attendance', icon: FiCalendar },
    { path: '/fees', label: 'Fees', icon: FiDollarSign },
    { path: '/exams', label: 'Exams', icon: FiAward },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-dark text-white transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-0 lg:w-64'
        } overflow-hidden`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-primary">SmartERP</h1>
          <p className="text-xs text-gray-400 mt-1">School Management</p>
        </div>

        {/* Menu Items */}
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-6 py-3 transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary border-l-4 border-primary'
                    : 'hover:bg-gray-800'
                }`}
              >
                <Icon className="mr-3" size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700">
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full flex items-center px-6 py-3 hover:bg-gray-800 transition-colors text-red-400"
          >
            <FiLogOut className="mr-3" size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;