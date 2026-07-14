import { useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  getAllApplications,
  createApplication,
  deleteApplication,
  updateApplication,
} from "./services/api";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  

  const [isRegistering, setIsRegistering] = useState(false);

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

  const filteredApplications = applications.filter((app) => {
    const search = searchTerm.toLowerCase();
  
    const matchesSearch =
      app.companyName.toLowerCase().includes(search) ||
      app.role.toLowerCase().includes(search);
  
    const matchesStatus =
      statusFilter === "ALL" || app.status === statusFilter;
  
    return matchesSearch && matchesStatus;
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
      await registerUser({
        name,
        email: email.trim(),
        password,
      });

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
      if (editingApplication) {
        await updateApplication(editingApplication.id, formData);
      } else {
        await createApplication(formData);
      }
  
      setShowAddForm(false);
      setEditingApplication(null);
  
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

  const handleDeleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );
  
    if (!confirmDelete) return;
  
    try {
      await deleteApplication(id);
      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditApplication = (application) => {
    setEditingApplication(application);
  
    setFormData({
      companyName: application.companyName,
      role: application.role,
      status: application.status,
      location: application.location,
      salary: application.salary,
      jobUrl: application.jobUrl,
      appliedDate: application.appliedDate,
      notes: application.notes || "",
    });
  
    setShowAddForm(true);
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
      <DashboardPage
        applications={filteredApplications}
        appliedCount={appliedCount}
        oaCount={oaCount}
        interviewCount={interviewCount}
        offerCount={offerCount}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        formData={formData}
        setFormData={setFormData}
        handleSaveApplication={handleSaveApplication}
        setIsLoggedIn={setIsLoggedIn}
        setEmail={setEmail}
        setPassword={setPassword}
        getStatusColor={getStatusColor}
        handleDeleteApplication={handleDeleteApplication}
        editingApplication={editingApplication}
        setEditingApplication={setEditingApplication}
        handleEditApplication={handleEditApplication}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    );
  }

  if (isRegistering) {
    return (
      <RegisterPage
        name={name}
        email={email}
        password={password}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleRegister={handleRegister}
        setIsRegistering={setIsRegistering}
      />
    );
  }

  return (
    <LoginPage
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
      setIsRegistering={setIsRegistering}
    />
  );
}

export default App;