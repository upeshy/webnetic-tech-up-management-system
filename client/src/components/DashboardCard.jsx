/**
 * Dashboard Card Component
 * Reusable card for displaying statistics
 */

const DashboardCard = ({ title, value, icon: Icon, color = 'primary', trend = null }) => {
  const colors = {
    primary: 'bg-blue-100 text-blue-600',
    secondary: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    danger: 'bg-red-100 text-red-600'
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-dark mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colors[color]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;