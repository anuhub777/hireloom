function ApplicationCard({
    app,
    getStatusColor,
    handleDeleteApplication,
    handleEditApplication,
}) {
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

            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={() => handleEditApplication(app)}
                    className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-3 py-2 rounded-lg text-sm"
                >
                    Edit
                </button>

                <button
                    onClick={() => handleDeleteApplication(app.id)}
                    className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-2 rounded-lg text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
      </div>
    );
  }
  
  export default ApplicationCard;