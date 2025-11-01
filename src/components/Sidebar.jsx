import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const menu = [
    { name: "Provider Dashboard", path: "/" },
    { name: "Buyer Dashboard", path: "/dashboard-buyer" },
    { name: "Datasets", path: "/datasets" },
    { name: "Upload Dataset", path: "/upload" },
    { name: "API Management", path: "/api" },
    { name: "Team Access", path: "/team" },
    { name: "Revenue", path: "/revenue" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-purple-800 to-blue-900 p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">Auratral</h1>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="block py-2 px-3 rounded-lg hover:bg-purple-700 transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
