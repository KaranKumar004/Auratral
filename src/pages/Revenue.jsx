// src/pages/Revenue.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';
import { DollarSign, BarChart2, TrendingUp, Download, Settings } from 'lucide-react';

const mockFinancials = {
    currentBalance: 5120.75,
    lastPayout: 4200.00,
    totalLifetimeRevenue: 55800.50,
    q4Projections: 15000.00
};

const mockTransactions = [
    { date: '2025-11-01', description: 'License Sale: Cardio V3 (Enterprise)', amount: 2500.00, type: 'Sale', status: 'Completed' },
    { date: '2025-10-15', description: 'Monthly Payout (October)', amount: -4200.00, type: 'Payout', status: 'Processed' },
    { date: '2025-10-05', description: 'API Subscription Fee: Project Beta', amount: 550.00, type: 'Sale', status: 'Completed' },
    { date: '2025-09-30', description: 'License Sale: Oncology (Academic)', amount: 800.00, type: 'Sale', status: 'Completed' },
    { date: '2025-09-15', description: 'Monthly Payout (September)', amount: -3500.00, type: 'Payout', status: 'Processed' },
];

// --- Sub-Component: Financial Stat Card ---
const FinancialStatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-[#3D1A78] p-6 rounded-xl shadow-xl flex flex-col items-start border-2 border-purple-700">
        <Icon className={`w-8 h-8 mb-3 ${colorClass}`} />
        <p className="text-gray-300 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-white mt-1">
            <span className="text-xl mr-1">$</span>{value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h3>
    </div>
);

const Revenue = () => {
    return (
        <div className="bg-[#1D0845] min-h-screen text-white">
            <Header isLoggedIn={true} userName="Partner Corp" /> 
            
            <main className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-extrabold mb-8 flex items-center">
                    <DollarSign className="w-8 h-8 mr-3 text-purple-400" />
                    Revenue & Payouts
                </h1>

                {/* 1. Financial Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <FinancialStatCard title="Current Balance" value={mockFinancials.currentBalance} icon={DollarSign} colorClass="text-yellow-400" />
                    <FinancialStatCard title="Last Payout" value={mockFinancials.lastPayout} icon={DollarSign} colorClass="text-purple-400" />
                    <FinancialStatCard title="Lifetime Revenue" value={mockFinancials.totalLifetimeRevenue} icon={BarChart2} colorClass="text-green-400" />
                    <FinancialStatCard title="Q4 Projections" value={mockFinancials.q4Projections} icon={TrendingUp} colorClass="text-blue-400" />
                </div>

                {/* 2. Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN (2/3 width on large screens) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Revenue Trends Chart (Placeholder) */}
                        <DashboardCard title="Revenue Trend (Last 6 Months)" className="h-96">
                            <div className="flex items-center justify-center h-full text-gray-500">
                                [Chart Placeholder: Monthly Revenue Line Graph]
                            </div>
                        </DashboardCard>

                        {/* Transaction History Table */}
                        <DashboardCard title="Detailed Transaction History">
                            <div className="flex justify-end mb-4 space-x-3">
                                <button className="flex items-center text-sm text-purple-400 hover:text-purple-300">
                                    <Download className="w-4 h-4 mr-1" />
                                    Export CSV
                                </button>
                                <button className="flex items-center text-sm text-purple-400 hover:text-purple-300">
                                    <Settings className="w-4 h-4 mr-1" />
                                    Filter
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm text-gray-300">
                                    <thead className="text-xs text-purple-200 uppercase bg-purple-900/50">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Date</th>
                                            <th scope="col" className="px-4 py-3">Description</th>
                                            <th scope="col" className="px-4 py-3">Type</th>
                                            <th scope="col" className="px-4 py-3 text-right">Amount</th>
                                            <th scope="col" className="px-4 py-3 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockTransactions.map((tx, index) => (
                                            <tr key={index} className="border-b border-purple-800 hover:bg-purple-900/20 transition">
                                                <td className="px-4 py-3">{tx.date}</td>
                                                <td className="px-4 py-3">{tx.description}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tx.type === 'Sale' ? 'bg-blue-600/20 text-blue-400' : 'bg-pink-600/20 text-pink-400'}`}>
                                                        {tx.type}
                                                    </span>
                                                </td>
                                                <td className={`px-4 py-3 text-right font-semibold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tx.status === 'Completed' || tx.status === 'Processed' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
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
                        
                        {/* Payout Settings */}
                        <DashboardCard title="Payout Settings">
                            <p className="text-sm text-gray-300 mb-4">Current Payout Method: **Bank Transfer (****1234)**</p>
                            <p className="text-xs text-gray-500 mb-4">Payouts are processed on the 15th of every month, minimum threshold: $500.</p>
                            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
                                Manage Payout Details
                            </button>
                        </DashboardCard>

                        {/* Tax Documents */}
                        <DashboardCard title="Tax & Legal Documents">
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between items-center text-gray-300 hover:text-purple-400 cursor-pointer">
                                    <span>2024 Tax Statement (1099)</span> <Download className="w-4 h-4" />
                                </li>
                                <li className="flex justify-between items-center text-gray-300 hover:text-purple-400 cursor-pointer">
                                    <span>Partner Agreement v2.1</span> <Download className="w-4 h-4" />
                                </li>
                                <li className="flex justify-between items-center text-gray-300 hover:text-purple-400 cursor-pointer">
                                    <span>W-9 Form on File</span> <Settings className="w-4 h-4" />
                                </li>
                            </ul>
                        </DashboardCard>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Revenue;