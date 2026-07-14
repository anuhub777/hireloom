function ApplicationCard({ app, getStatusColor }) {
    return (
      <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {app.companyName}
            </h3>
  
            <p className="text-gray-500 font-medium truncate">
              {app.role}
            </p>
          </div>
  
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
              app.status
            )}`}
          >
            {app.status}
          </span>
        </div>
  
        <div className="space-y-2 text-gray-600">
          <p>📍 {app.location || "N/A"}</p>
  
          <p>💰 {app.salary || "N/A"}</p>
  
          {app.appliedDate && (
            <p>📅 Applied on: {app.appliedDate}</p>
          )}
  
          {app.notes && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {app.notes}
            </p>
          )}
        </div>
      </div>
    );
  }
  
  export default ApplicationCard;