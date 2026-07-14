function AddApplicationModal({
    showAddForm,
    setShowAddForm,
    formData,
    setFormData,
    handleSaveApplication,
  }) {
    if (!showAddForm) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-[600px] max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">
            Add Application
          </h2>
  
          <div className="space-y-4">
            <input
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  companyName: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
  
            <input
              placeholder="Role"
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
  
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            >
              <option>APPLIED</option>
              <option>OA</option>
              <option>INTERVIEW</option>
              <option>REJECTED</option>
              <option>OFFER</option>
            </select>
  
            <input
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
  
            <input
              placeholder="Salary"
              value={formData.salary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salary: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
  
            <input
              placeholder="Job URL"
              value={formData.jobUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  jobUrl: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
  
            <input
              type="date"
              value={formData.appliedDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  appliedDate: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
            />
  
            <textarea
              placeholder="Notes"
              maxLength={1000}
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-3"
              rows="4"
            />
  
            <p className="text-sm text-gray-500">
              {formData.notes.length}/1000 characters
            </p>
          </div>
  
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 hover:bg-gray-600 transition text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
  
            <button
              onClick={handleSaveApplication}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default AddApplicationModal;