function StatsCards({
    appliedCount,
    oaCount,
    interviewCount,
    offerCount,
  }) {
    return (
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">Applied</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {appliedCount}
          </h3>
        </div>
  
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">OA</p>
          <h3 className="text-3xl font-bold text-yellow-500">
            {oaCount}
          </h3>
        </div>
  
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">Interview</p>
          <h3 className="text-3xl font-bold text-purple-600">
            {interviewCount}
          </h3>
        </div>
  
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">Offer</p>
          <h3 className="text-3xl font-bold text-green-600">
            {offerCount}
          </h3>
        </div>
      </div>
    );
  }
  
  export default StatsCards;