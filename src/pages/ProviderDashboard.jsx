// src/pages/ProviderDashboard.jsx

import React from 'react';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';
import { CloudUpload, DollarSign, CheckCircle, Clock, BarChart3, TrendingUp, XCircle } from 'lucide-react'; 

// --- Sub-Component: Provider Stat Card ---
const ProviderStatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-[#3D1A78] p-6 rounded-xl shadow-xl flex flex-col items-start border-2 border-purple-700">
    <Icon className={`w-8 h-8 mb-3 ${colorClass}`} />
    <p className="text-gray-300 text-sm font-medium">{title}</p>
    <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
  </div>
);

const ProviderDashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '$12,500', icon: DollarSign, color: 'text-green-400' },
    { title: 'Datasets Uploaded', value: '7', icon: CloudUpload, color: 'text-yellow-400' },
    { title: 'Datasets Validated', value: '5', icon: CheckCircle, color: 'text-blue-400' },
    { title: 'Pending Review', value: '2', icon: Clock, color: 'text-red-400' },
  ];

  const recentUploads = [
    { name: 'Oncology Dataset V2', status: 'Validated', icon: CheckCircle, color: 'text-green-400' },
    { name: 'Cardio Data 2025 Q1', status: 'In Review', icon: Clock, color: 'text-yellow-400' },
    { name: 'Neurological Scans', status: 'Needs Update', icon: XCircle, color: 'text-red-400' },
  ];
  
  const salesActivity = [
    { time: '1 hour ago', description: 'License sold: Oncology V2 (Single User)', amount: '+$800' },
    { time: '4 hours ago', description: 'API Key issued for Cardio Data', amount: '+$50' },
    { time: 'Yesterday', description: 'Monthly commission processed', amount: '+$4,200' },
  ];
  
  const recentPayouts = [
    { date: '01/10/25', description: 'Monthly Commission', amount: '$4,200', status: 'Processed' },
    { date: '15/09/25', description: 'Bonus Payout (Q3)', amount: '$500', status: 'Processed' },
  ];

  return (
    <div className="bg-[#1D0845] min-h-screen text-white">
      <Header isLoggedIn={true} userName="Partner Corp" /> 
      
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold mb-8">Partner Dashboard</h1>

        {/* 1. Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <ProviderStatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} colorClass={stat.color} />
          ))}
        </div>

        {/* 2. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Sales Performance Chart (Placeholder) */}
            <DashboardCard title="Sales Performance (30 Days)" className="h-96">
                <div className="flex items-center justify-center h-full text-gray-500">
                    <BarChart3 className='w-12 h-12 mr-3' />
                    [Chart Placeholder: Revenue and Sales Volume]
                </div>
            </DashboardCard>

            {/* Recent Payouts (Table) */}
            <DashboardCard title="Recent Payouts">
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
                    {recentPayouts.map((payout, index) => (
                      <tr key={index} className="border-b border-purple-800 hover:bg-purple-900/20 transition">
                        <td className="px-4 py-3">{payout.date}</td>
                        <td className="px-4 py-3">{payout.description}</td>
                        <td className="px-4 py-3 text-right text-green-400 font-semibold">{payout.amount}</td>
                        <td className="px-4 py-3 text-center">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-600/20 text-green-400">
                                {payout.status}
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
            
            {/* Dataset Status */}
            <DashboardCard title="Dataset Status">
              <ul className="space-y-4">
                {recentUploads.map((item, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-purple-900/40 rounded-lg">
                    <span className='flex items-center space-x-2'>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span>{item.name}</span>
                    </span>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full text-white ${
                        item.status === 'Validated' ? 'bg-green-600/50' : item.status === 'In Review' ? 'bg-yellow-600/50' : 'bg-red-600/50'
                    }`}>{item.status}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-4 py-2 border border-purple-600 text-purple-400 rounded-lg hover:bg-purple-900/50 transition">
                View All Datasets
              </button>
            </DashboardCard>
            
            {/* Recent Sales Activity */}
            <DashboardCard title="Recent Sales Activity">
              <ul className="space-y-4">
                {salesActivity.map((activity, index) => (
                  <li key={index} className="flex justify-between items-start text-sm border-b border-purple-900 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex-grow">
                        <p className="text-gray-300 font-medium">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    <span className="text-sm font-semibold text-green-400 flex-shrink-0">{activity.amount}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-4 py-2 border border-purple-600 text-purple-400 rounded-lg hover:bg-purple-900/50 transition">
                View Full Revenue Report
              </button>
            </DashboardCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;