import { useState, useEffect } from "react";
import {
    loginUser,
    registerUser,
    getAllApplications,
    createApplication,
  } from "./services/api";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [applications, setApplications] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    status: "APPLIED",
    location: "",
    salary: "",
    jobUrl: "",
    appliedDate: "",
    notes: "",
  });

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        email: email.trim(),
        password,
      });

      localStorage.setItem("token", response.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser({
        name,
        email: email.trim(),
        password,
      });

      console.log("Registered user:", response);

      setIsRegistering(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const data = await getAllApplications();
      setApplications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveApplication = async () => {
    try {
      await createApplication(formData);
  
      setShowAddForm(false);
  
      setFormData({
        companyName: "",
        role: "",
        status: "APPLIED",
        location: "",
        salary: "",
        jobUrl: "",
        appliedDate: "",
        notes: "",
      });
  
      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchApplications();
    }
  }, [isLoggedIn]);

  const appliedCount = applications.filter(
    (app) => app.status === "APPLIED"
  ).length;
  
  const oaCount = applications.filter(
    (app) => app.status === "OA"
  ).length;
  
  const interviewCount = applications.filter(
    (app) => app.status === "INTERVIEW"
  ).length;
  
  const offerCount = applications.filter(
    (app) => app.status === "OFFER"
  ).length;

  const getStatusColor = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-700";
      case "OA":
        return "bg-yellow-100 text-yellow-700";
      case "INTERVIEW":
        return "bg-purple-100 text-purple-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "OFFER":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100">
        <nav className="bg-white shadow px-8 py-4 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">HireLoom</h1>
            <p className="text-gray-500">Weave your career path</p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              setEmail("");
              setPassword("");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </nav>

        <main className="p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Dashboard</h2>

            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              + Add Application
            </button>
          </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {applications.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-6">
                No applications yet.
              </div>
            ) : (
              applications.map((app) => (
                <div
                key={app.id}
                className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
                >
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
                    <p>📍 {app.location}</p>
                    <p>💰 {app.salary}</p>

                    {app.appliedDate && (
                    <p>📅 Applied on: {app.appliedDate}</p>
                    )}
                </div>
                </div>
              ))
            )}
          </div>

          {showAddForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-xl p-8 w-[600px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Add Application</h2>

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

                    <p className="text-sm text-gray-500 mt-1">
                    {formData.notes.length}/1000 characters
                    </p>

                </div>   {/* closes div.space-y-4 */}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveApplication}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  if (isRegistering) {
    return (
      <div className="min-h-screen bg-slate-100 flex">
        <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center px-16">
          <h1 className="text-5xl font-bold mb-4">HireLoom</h1>
          <p className="text-xl text-blue-100">Weave your career path</p>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px]">
            <h2 className="text-3xl font-bold mb-6">Register</h2>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-6"
            />

            <button
              onClick={handleRegister}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              Register
            </button>

            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setIsRegistering(false)}
                className="text-blue-600 cursor-pointer font-semibold"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center px-16">
        <h1 className="text-5xl font-bold mb-4">HireLoom</h1>
        <p className="text-xl text-blue-100">Weave your career path</p>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px]">
          <h2 className="text-3xl font-bold mb-6">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-6"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => setIsRegistering(true)}
              className="text-blue-600 cursor-pointer font-semibold"
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;