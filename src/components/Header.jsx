import React from "react";

function Header() {
  return (
    <div className="bg-gray-900 bg-opacity-60 px-6 py-3 shadow flex justify-between items-center">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="text-sm text-gray-300">Welcome, User 👋</div>
    </div>
  );
}

export default Header;
