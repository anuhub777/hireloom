function ApplicationCard({
    app,
    getStatusColor,
    handleDeleteApplication,
    handleEditApplication,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {app.companyName}
          </h2>
  
          <p className="text-gray-500 mt-1">
            {app.role}
          </p>
        </div>
  
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
            app.status
          )}`}
        >
          {app.status}
        </span>
      </div>
  
      {/* Details */}
      <div className="mt-5 space-y-3 text-sm text-gray-700">
  
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{app.location || "Not specified"}</span>
        </div>
  
        <div className="flex items-center gap-2">
          <span>💰</span>
          <span>{app.salary || "Not specified"}</span>
        </div>
  
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>{app.appliedDate || "Not specified"}</span>
        </div>
  
        {app.jobUrl && (
          <div className="flex items-center gap-2">
            <span>🔗</span>
  
            <a
              href={app.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              View Job
            </a>
          </div>
        )}
      </div>
  
      {/* Notes */}
      {app.notes && (
        <div className="mt-5 bg-slate-50 rounded-xl p-3 border">
          <p className="text-xs text-gray-500 mb-1">
            Notes
          </p>
  
          <p className="text-sm text-gray-700 line-clamp-3">
            {app.notes}
          </p>
        </div>
      )}
  
      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => handleEditApplication(app)}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition"
        >
          ✏ Edit
        </button>
  
        <button
          onClick={() => handleDeleteApplication(app.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
  
  export default ApplicationCard;