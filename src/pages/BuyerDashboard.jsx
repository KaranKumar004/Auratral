// src/pages/BuyerDashboard.jsx

import React from 'react';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';
import { Database, TrendingUp, Zap, Key, FileText, Download, Clock } from 'lucide-react'; 

// --- Sub-Component: Stat Card ---
const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-[#3D1A78] p-6 rounded-xl shadow-xl flex flex-col items-start border-2 border-purple-700">
    <Icon className={`w-8 h-8 mb-3 ${colorClass}`} />
    <p className="text-gray-300 text-sm font-medium">{title}</p>
    <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
  </div>
);

const BuyerDashboard = () => {
  const stats = [
    { title: 'Total Datasets', value: '3', icon: Database, color: 'text-green-400' },
    { title: 'Data Usage', value: '1.3 TB', icon: TrendingUp, color: 'text-yellow-400' },
    { title: 'API Calls (30 Days)', value: '45.2K', icon: Zap, color: 'text-red-400' },
    { title: 'Active Licenses', value: '18', icon: Key, color: 'text-blue-400' },
  ];

  const recentDatasets = [
    { name: 'Neuroscan MRI 2025', status: 'Active', color: 'text-green-400' },
    { name: 'Oncovision Pathology', status: 'Active', color: 'text-green-400' },
    { name: 'RespitalData Lung', status: 'Expired', color: 'text-red-400' },
  ];
  
  const recentActivity = [
    { time: '5 mins ago', description: 'Dataset downloaded: Oncovision Pathology', action: 'Downloaded' },
    { time: '2 hours ago', description: 'API key generated for Project Alpha', action: 'API Key Generated' },
    { time: 'Yesterday', description: 'Payment processed for Neuroscan MRI', action: 'Payment Processed' },
  ];
  
  const transactions = [
    { date: '01/10/25', description: 'License Renewal', amount: '$450', status: 'Paid' },
    { date: '25/09/25', description: 'API Credits Purchase', amount: '$100', status: 'Paid' },
    { date: '15/09/25', description: 'Initial Dataset License', amount: '$1,200', status: 'Paid' },
  ];
  
  const documents = [
    { name: 'Data License Agreement', icon: FileText },
    { name: 'API Documentation', icon: FileText },
    { name: 'Usage Report Q1 2025', icon: FileText },
  ];

  return (
    <div className="bg-[#1D0845] min-h-screen text-white">
      {/* Header showing the user is logged in */}
      <Header isLoggedIn={true} userName="John Anderson" /> 
      
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold mb-8">Buyer Dashboard</h1>

        {/* 1. Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} colorClass={stat.color} />
          ))}
        </div>

        {/* 2. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Recent Datasets */}
            <DashboardCard title="Recent Datasets">
              <ul className="space-y-3">
                {recentDatasets.map((item, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-purple-900/40 rounded-lg">
                    <span>{item.name}</span>
                    <span className={`text-sm font-medium ${item.color} px-3 py-1 rounded-full bg-current bg-opacity-10`}>{item.status}</span>
                  </li>
                ))}
              </ul>
            </DashboardCard>

            {/* Recent Transactions (Full Table) */}
            <DashboardCard title="Recent Transactions">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-300">
                  <thead className="text-xs text-purple-200 uppercase bg-purple-900/50">
                    <tr>
                      <th scope="col" className="px-4 py-3">Date</th>
                      <th scope="col" className="px-4 py-3">Description</th>
                      <th scope="col" className="px-4 py-3 text-right">Amount</th>
                      <th scope="col" className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr key={index} className="border-b border-purple-800 hover:bg-purple-900/20 transition">
                        <td className="px-4 py-3">{tx.date}</td>
                        <td className="px-4 py-3">{tx.description}</td>
                        <td className="px-4 py-3 text-right text-purple-400 font-semibold">{tx.amount}</td>
                        <td className="px-4 py-3 text-center">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tx.status === 'Paid' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                                {tx.status}
                            </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashboardCard>

          </div>
          
          {/* RIGHT COLUMN (1/3 width on large screens) */}
          <div className="space-y-8">
            
            {/* Recent Activity */}
            <DashboardCard title="Recent Activity" className="lg:h-full">
              <ul className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm border-b border-purple-900 pb-4 last:border-b-0 last:pb-0">
                    <span className='pt-1'><Clock className="w-4 h-4 text-purple-400 flex-shrink-0" /></span>
                    <div className="flex-grow">
                        <p className="text-gray-300 font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                        <p className="text-xs text-purple-400 mt-1">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </DashboardCard>
            
            {/* Important Documents */}
            <DashboardCard title="Important Documents">
              <ul className="space-y-3">
                {documents.map((doc, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-purple-900/40 rounded-lg cursor-pointer hover:bg-purple-900 transition">
                    <span className="flex items-center space-x-2">
                        <doc.icon className="w-4 h-4 text-purple-400"/>
                        <span>{doc.name}</span>
                    </span>
                    <Download className="w-4 h-4 text-gray-500 hover:text-white"/>
                  </li>
                ))}
              </ul>
            </DashboardCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;