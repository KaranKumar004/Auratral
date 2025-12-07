import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 hidden lg:block border-r border-gray-100 bg-white/50">
      <div className="p-6 space-y-4">
        <div className="text-sm text-gray-500 uppercase">Marketplace</div>
        <nav className="flex flex-col gap-2">
          <Link to="/">Home</Link>
          <Link to="/datasets" className="px-3 py-2 rounded hover:bg-gray-100">Browse Datasets</Link>
          <Link to="/buyer" className="px-3 py-2 rounded hover:bg-gray-100">Buyer Dashboard</Link>
          <Link to="/provider" className="px-3 py-2 rounded hover:bg-gray-100">Provider Dashboard</Link>
          <Link to="/upload" className="px-3 py-2 rounded hover:bg-gray-100">Upload Dataset</Link>
          <a className="px-3 py-2 rounded hover:bg-gray-100" href="#consent">Consent Forms</a>
        </nav>
      </div>
    </aside>
  );
}
