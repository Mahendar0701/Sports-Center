import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  console.log(userData.id); // "1"
  console.log(userData.name); // "Avishek Jana"
  console.log(userData.email); // "avishek@example.com"
  const logoutHandle = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    return navigate("/signin");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg text-gray-600">User Name : {userData.name}</p>
          <p className="text-lg text-gray-600">Email id: {userData.email}.</p>
          <a
            href=""
            id="logout-link"
            className="px-3 py-1 my-3 bg-red-200 hover:bg-red-300 rounded"
            onClick={logoutHandle}
          >
            Logout
          </a>
        </div>
      </h1>
    </div>
  );
};

export default Dashboard;
