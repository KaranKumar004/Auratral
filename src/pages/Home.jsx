// src/pages/Home.jsx

import React from 'react';
import Header from '../components/Header'; 
import { ArrowRight } from 'lucide-react'; 

// DashboardGraphic component/image placeholder
const DashboardGraphic = () => (
  <div className="mx-auto my-12 p-8 bg-purple-900/40 rounded-3xl shadow-2xl border-2 border-purple-700 max-w-5xl">
    {/* Placeholder for the complex dashboard image */}
    <div className="text-center text-gray-400 py-20">
            <p className="mt-4">Placeholder for the Interactive Dashboard Graphic</p>
    </div>
  </div>
);

// Metrics Bar Component
const MetricsBar = () => {
  const stats = [
    { value: '500+', label: 'Premium Datasets' },
    { value: '120+', label: 'Data Providers' },
    { value: '50M+', label: 'Records Available' },
    { value: '98.9%', label: 'Service Uptime' },
  ];
  return (
    <div className="flex justify-center items-center py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl">
        {stats.map((stat, index) => (
          <div key={index} className="text-white">
            <h3 className="text-3xl font-bold text-purple-400">{stat.value}</h3>
            <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="p-8 bg-purple-900/60 rounded-xl border border-purple-700 transition hover:scale-[1.02] duration-300">
    <Icon className="w-8 h-8 text-purple-400 mb-4" />
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-300 text-sm">{description}</p>
    <a href="#" className="flex items-center text-purple-400 mt-4 text-sm font-medium hover:text-purple-300">
        Learn More <ArrowRight className="w-4 h-4 ml-1"/>
    </a>
  </div>
);


const Home = () => {
  return (
    <div className="bg-[#1D0845] min-h-screen text-white">
      {/* Header is outside of the main container */}
      <Header /> 
      
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Empowering Research with <span className="text-purple-400">Premium Data Solutions</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
            Access high-quality datasets that drive insights and innovation. Whether you're buying or providing data, Auratral connects you to the resources you need.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="/datasets" className="px-8 py-3 bg-white text-[#1D0845] font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
              Explore Datasets
            </a>
            <a href="#" className="px-8 py-3 border border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-900 transition duration-300">
              Become a Provider
            </a>
          </div>
        </section>
        
        <DashboardGraphic />

        <MetricsBar />

        <hr className="border-purple-800 my-10"/>

        {/* Services Section */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Comprehensive data solutions built to accelerate research, unlock insights, and drive high-impact outcomes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2zM15 12c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"/></svg>} // Placeholder for Premium Dataset Marketplace
              title="Premium Dataset Marketplace"
              description="Access high-quality, vetted datasets across various domains for advanced research needs."
            />
            <ServiceCard 
              icon={({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M14.7 18.3c-.4.4-1 .4-1.4 0l-5-5c-.4-.4-.4-1 0-1.4l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.4 13l4.3 4.3c.4.4.4 1 0 1.4zM9 13.7c-.4.4-1 .4-1.4 0l-5-5c-.4-.4-.4-1 0-1.4l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L4.4 8l4.3 4.3c.4.4.4 1 0 1.4z"/></svg>} // Placeholder for API Integration
              title="API Integration Solutions"
              description="Seamlessly stream data directly into your research environment using our robust API."
            />
            <ServiceCard 
              icon={({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M21 15H3v-2h18v2zM21 11H3V9h18v2zM21 7H3V5h18v2z"/></svg>} // Placeholder for Data Analytics Tools
              title="Data Analytics Tools"
              description="Utilize built-in or integrated analytics tools to gain deep, actionable insights from your purchased data."
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;