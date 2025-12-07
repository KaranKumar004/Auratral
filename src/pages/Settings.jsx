// src/pages/Settings.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';
import { User, Lock, Bell, Mail, Zap, X } from 'lucide-react';

const Settings = ({ userRole = 'buyer', userName = 'John Anderson' }) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Dummy data for form states
  const [profile, setProfile] = useState({ name: userName, email: 'john.anderson@research.com', organization: 'Project Alpha' });
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [notifications, setNotifications] = useState({ emailAlerts: true, systemUpdates: true, usageWarnings: true });

  const renderContent = () => {
    // --- PROFILE TAB ---
    if (activeTab === 'profile') {
      return (
        <form className="space-y-6">
          <h3 className="text-xl font-semibold text-purple-200">Personal Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email Address (Read-only)</label>
            <input type="email" value={profile.email} disabled className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Organization</label>
            <input type="text" value={profile.organization} onChange={(e) => setProfile({...profile, organization: e.target.value})} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg text-white" />
          </div>
          
          <button type="submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
            Save Profile
          </button>
        </form>
      );
    }

    // --- SECURITY TAB ---
    if (activeTab === 'security') {
      return (
        <form className="space-y-6">
          <h3 className="text-xl font-semibold text-purple-200">Change Password</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
            <input type="password" value={password.current} onChange={(e) => setPassword({...password, current: e.target.value})} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
            <input type="password" value={password.new} onChange={(e) => setPassword({...password, new: e.target.value})} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
            <input type="password" value={password.confirm} onChange={(e) => setPassword({...password, confirm: e.target.value})} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg text-white" />
          </div>

          <hr className="border-purple-800"/>
          
          <h3 className="text-xl font-semibold text-purple-200">Two-Factor Authentication (2FA)</h3>
          <div className="flex justify-between items-center p-4 bg-purple-900/40 rounded-lg">
            <span className="text-gray-300">2FA Status:</span>
            <span className="text-red-400 font-medium flex items-center"><X className="w-4 h-4 mr-1"/>Disabled</span>
            <button type="button" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition">Enable 2FA</button>
          </div>

          <button type="submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
            Update Security
          </button>
        </form>
      );
    }
    
    // --- NOTIFICATIONS TAB ---
    if (activeTab === 'notifications') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-purple-200">Email Notifications</h3>

          <div className="space-y-4">
            <label className="flex justify-between items-center p-3 bg-purple-900/40 rounded-lg cursor-pointer">
              <span className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-5 h-5"/>
                <span>New License Sales (Partners only)</span>
              </span>
              <input type="checkbox" checked={notifications.emailAlerts} onChange={(e) => setNotifications({...notifications, emailAlerts: e.target.checked})} className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded" />
            </label>
            
            <label className="flex justify-between items-center p-3 bg-purple-900/40 rounded-lg cursor-pointer">
              <span className="flex items-center space-x-2 text-gray-300">
                <Zap className="w-5 h-5"/>
                <span>System Updates and Maintenance</span>
              </span>
              <input type="checkbox" checked={notifications.systemUpdates} onChange={(e) => setNotifications({...notifications, systemUpdates: e.target.checked})} className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded" />
            </label>
            
            <label className="flex justify-between items-center p-3 bg-purple-900/40 rounded-lg cursor-pointer">
              <span className="flex items-center space-x-2 text-gray-300">
                <Bell className="w-5 h-5"/>
                <span>Data Usage Warnings (Buyers only)</span>
              </span>
              <input type="checkbox" checked={notifications.usageWarnings} onChange={(e) => setNotifications({...notifications, usageWarnings: e.target.checked})} className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded" />
            </label>
          </div>
          
          <button type="button" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
            Save Notification Preferences
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#1D0845] min-h-screen text-white">
      <Header isLoggedIn={true} userName={userName} /> 
      
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold mb-8 flex items-center">
            <Lock className="w-8 h-8 mr-3 text-purple-400" />
            Account Settings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Tab Navigation (1/4 width) */}
            <div className="lg:col-span-1">
                <DashboardCard title="Navigation">
                    <ul className="space-y-2">
                        {['profile', 'security', 'notifications'].map((tab) => (
                            <li key={tab}>
                                <button
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left py-3 px-4 rounded-lg flex items-center space-x-3 transition-colors ${
                                        activeTab === tab 
                                        ? 'bg-purple-700/80 text-white font-semibold' 
                                        : 'text-gray-400 hover:bg-purple-900/50'
                                    }`}
                                >
                                    {tab === 'profile' && <User className="w-5 h-5" />}
                                    {tab === 'security' && <Lock className="w-5 h-5" />}
                                    {tab === 'notifications' && <Bell className="w-5 h-5" />}
                                    <span className="capitalize">{tab}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </DashboardCard>
            </div>

            {/* Content Pane (3/4 width) */}
            <div className="lg:col-span-3">
                <DashboardCard title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings`}>
                    {renderContent()}
                </DashboardCard>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;