/**
 * Main Layout Component
 * Wraps all pages with Sidebar and Navbar
 */

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-light">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="container-custom">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;