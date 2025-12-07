import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelector() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800">
      <h1 className="text-5xl font-bold mb-10">Welcome to Auratral</h1>
      <p className="text-lg mb-8 text-gray-700">Select your role to continue</p>

      <div className="flex gap-8">
        <button
          onClick={() => navigate("/buyer")}
          className="px-8 py-4 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          I’m a Buyer
        </button>

        <button
          onClick={() => navigate("/provider")}
          className="px-8 py-4 bg-purple-600 text-white rounded-2xl shadow-lg hover:bg-purple-700 transition transform hover:scale-105"
        >
          I’m a Provider
        </button>
      </div>

      <p className="mt-10 text-gray-600 text-sm">
        Access structured and unstructured datasets for AI & ML projects.
      </p>
    </div>
  );
}
