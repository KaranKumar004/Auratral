import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import DashboardProvider from "./pages/DashboardProvider";
import DashboardBuyer from "./pages/DashboardBuyer";
import Datasets from "./pages/Datasets";
import UploadDataset from "./pages/Datasets";
import APIManagement from "./pages/APIManagement";
import TeamAccess from "./pages/TeamAccess";
import Revenue from "./pages/Revenue";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="flex bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 min-h-screen text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<DashboardProvider />} />
              <Route path="/dashboard-buyer" element={<DashboardBuyer />} />
              <Route path="/datasets" element={<Datasets />} />
              <Route path="/upload" element={<UploadDataset />} />
              <Route path="/api" element={<APIManagement />} />
              <Route path="/team" element={<TeamAccess />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;