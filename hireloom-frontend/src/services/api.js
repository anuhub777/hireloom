import axios from "axios";

const BASE_URL = "http://localhost:9090/api/applications";

export const getAllApplications = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const loginUser = async (loginData) => {
    const response = await axios.post(
        "http://localhost:9090/auth/login",
        loginData
    );
    return response.data;
};

export const registerUser = async (registerData) => {
    const response = await axios.post(
        "http://localhost:9090/auth/register",
        registerData
    );
    return response.data;
};

export const createApplication = async (applicationData) => {
    const token = localStorage.getItem("token");
  
    const response = await axios.post(
      "http://localhost:9090/api/applications",
      applicationData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return response.data;
};