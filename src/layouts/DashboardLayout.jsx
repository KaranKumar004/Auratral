import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-purple-100">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
