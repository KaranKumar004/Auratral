// src/pages/APIManagement.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';
import { Key, RotateCw, Trash2, Zap, Monitor, PlusCircle, Copy } from 'lucide-react';

const mockApiKeys = [
  { id: 'proj_alpha_001', name: 'Project Alpha Research', usage: '15.2K calls', lastUsed: '2 hours ago', status: 'Active', created: '2025-09-01' },
  { id: 'neu_beta_002', name: 'Neurological Data Stream', usage: '500 calls', lastUsed: '3 days ago', status: 'Active', created: '2025-10-15' },
  { id: 'depr_key_003', name: 'Legacy Data Access', usage: '0 calls', lastUsed: 'N/A', status: 'Revoked', created: '2025-07-20' },
];

const APIManagement = ({ isPartner = false }) => {
  const [apiKeys, setApiKeys] = useState(mockApiKeys);
  const title = isPartner ? "Partner API Management" : "Buyer API Key Management";
  const subtitle = isPartner ? "Manage and monitor API endpoints for your uploaded datasets." : "Generate, manage, and monitor usage of your access keys.";

  const generateNewKey = () => {
    const newKey = { 
        id: 'new_key_' + Math.floor(Math.random() * 100), 
        name: 'New Key ' + (apiKeys.length + 1), 
        usage: '0 calls', 
        lastUsed: 'Never', 
        status: 'Active', 
        created: new Date().toISOString().slice(0, 10) 
    };
    setApiKeys([newKey, ...apiKeys]);
    alert(`New key generated! ID: ${newKey.id}`);
  };

  const handleAction = (id, action) => {
    // Simulated key action handler
    if (action === 'revoke') {
        setApiKeys(apiKeys.map(key => 
            key.id === id ? { ...key, status: 'Revoked', usage: '0 calls' } : key
        ));
    } else if (action === 'regenerate') {
        alert(`Key ${id} regenerated successfully.`);
    }
  };

  return (
    <div className="bg-[#1D0845] min-h-screen text-white">
      <Header isLoggedIn={true} userName={isPartner ? "Partner Corp" : "John Anderson"} /> 
      
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold mb-2 flex items-center">
            <Key className="w-8 h-8 mr-3 text-purple-400" />
            {title}
        </h1>
        <p className="text-gray-400 mb-8">{subtitle}</p>

        {/* --- Top Actions --- */}
        <div className="flex justify-between items-center mb-6">
            <button 
                onClick={generateNewKey}
                className="flex items-center space-x-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
            >
                <PlusCircle className="w-5 h-5" />
                <span>{isPartner ? 'Define New Endpoint' : 'Generate New Key'}</span>
            </button>
            <div className='flex items-center space-x-4 text-sm text-gray-400'>
                <Monitor className='w-4 h-4 text-purple-400' />
                <a href="#" className="hover:text-purple-300">View API Documentation</a>
            </div>
        </div>

        {/* --- Key List/Endpoints Table --- */}
        <DashboardCard title={isPartner ? "Active Endpoints" : "Current API Keys"}>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-300">
                    <thead className="text-xs text-purple-200 uppercase bg-purple-900/50">
                        <tr>
                            <th scope="col" className="px-4 py-3">Key Name</th>
                            <th scope="col" className="px-4 py-3">ID / Endpoint</th>
                            <th scope="col" className="px-4 py-3">Usage (30D)</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiKeys.map((key) => (
                            <tr key={key.id} className="border-b border-purple-800 hover:bg-purple-900/20 transition">
                                <td className="px-4 py-3 font-medium">{key.name}</td>
                                <td className="px-4 py-3 font-mono text-xs flex items-center space-x-2">
                                    <span>{key.id}</span>
                                    <Copy className='w-3 h-3 text-gray-500 hover:text-purple-400 cursor-pointer' onClick={() => navigator.clipboard.writeText(key.id)} />
                                </td>
                                <td className="px-4 py-3 text-yellow-400 flex items-center space-x-1">
                                    <Zap className='w-4 h-4' />
                                    <span>{key.usage}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                        key.status === 'Active' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                                    }`}>
                                        {key.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <button 
                                        onClick={() => handleAction(key.id, 'regenerate')}
                                        disabled={key.status === 'Revoked'}
                                        className="text-purple-400 hover:text-purple-300 disabled:text-gray-500 transition" 
                                        title="Regenerate Key"
                                    >
                                        <RotateCw className='w-4 h-4 inline-block' />
                                    </button>
                                    <button 
                                        onClick={() => handleAction(key.id, 'revoke')}
                                        disabled={key.status === 'Revoked'}
                                        className="text-red-500 hover:text-red-400 disabled:text-gray-500 transition" 
                                        title="Revoke Key"
                                    >
                                        <Trash2 className='w-4 h-4 inline-block' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardCard>

        {/* --- Usage Monitoring & Documentation Link (Optional Sidebar) --- */}
        <div className="mt-8">
            <DashboardCard title="Key Usage Visualization">
                <div className="h-60 flex items-center justify-center text-gray-500">
                    [Chart Placeholder: API Call Volume Over Time]
                </div>
            </DashboardCard>
        </div>
      </main>
    </div>
  );
};

export default APIManagement;