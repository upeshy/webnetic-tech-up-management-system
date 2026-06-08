/**
 * Loader Component
 * Loading spinner
 */

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-light">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;