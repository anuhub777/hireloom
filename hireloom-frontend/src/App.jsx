import { useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  getAllApplications,
  createApplication,
} from "./services/api";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [applications, setApplications] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);

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
      <DashboardPage
        applications={applications}
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