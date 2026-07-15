import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import ApplicationCard from "../components/ApplicationCard";
import AddApplicationModal from "../components/AddApplicationModal";
import StatusPieChart from "../components/charts/StatusPieChart";

function DashboardPage({
  applications,
  appliedCount,
  oaCount,
  interviewCount,
  offerCount,
  rejectedCount,
  showAddForm,
  setShowAddForm,
  formData,
  setFormData,
  handleSaveApplication,
  setIsLoggedIn,
  setEmail,
  setPassword,
  getStatusColor,
  handleDeleteApplication,
  handleEditApplication,
  editingApplication,
  setEditingApplication,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar
        setIsLoggedIn={setIsLoggedIn}
        setEmail={setEmail}
        setPassword={setPassword}
      />

      <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="🔍 Search company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 w-72"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="ALL">All Status</option>
            <option value="APPLIED">Applied</option>
            <option value="OA">OA</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-semibold"
          >
            + Add Application
          </button>
        </div>
      </div>

        <StatsCards
          appliedCount={appliedCount}
          oaCount={oaCount}
          interviewCount={interviewCount}
          offerCount={offerCount}
        />

        <div className="mt-6">
            <StatusPieChart
                appliedCount={appliedCount}
                oaCount={oaCount}
                interviewCount={interviewCount}
                offerCount={offerCount}
                rejectedCount={rejectedCount}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {applications.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6">
              No applications yet.
            </div>
          ) : (
            applications.map((app) => (
                <ApplicationCard
                key={app.id}
                app={app}
                getStatusColor={getStatusColor}
                handleDeleteApplication={handleDeleteApplication}
                handleEditApplication={handleEditApplication}
              />
            ))
          )}
        </div>

        <AddApplicationModal
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          formData={formData}
          setFormData={setFormData}
          handleSaveApplication={handleSaveApplication}
        />
      </main>
    </div>
  );
}

export default DashboardPage;