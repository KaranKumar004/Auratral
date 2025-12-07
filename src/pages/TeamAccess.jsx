// src/pages/TeamAccess.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';
import { Users, UserPlus, Trash2, Settings, Mail, Shield } from 'lucide-react';

const mockTeamMembers = [
    { id: 1, name: 'Alex Johnson', email: 'alex@project.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Sarah Lee', email: 'sarah@project.com', role: 'Researcher', status: 'Active' },
    { id: 3, name: 'Mark Davis', email: 'mark@project.com', role: 'Analyst', status: 'Pending Invitation' },
];

const teamRoles = ['Admin', 'Researcher', 'Analyst', 'Viewer'];

const TeamAccess = ({ isPartner = false }) => {
    const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
    const [emailToInvite, setEmailToInvite] = useState('');
    const [roleToAssign, setRoleToAssign] = useState('Viewer');
    
    const accountType = isPartner ? 'Partner' : 'Buyer';

    const inviteMember = (e) => {
        e.preventDefault();
        if (!emailToInvite) return;
        
        const newMember = {
            id: teamMembers.length + 1,
            name: 'New User',
            email: emailToInvite,
            role: roleToAssign,
            status: 'Pending Invitation',
        };
        setTeamMembers([...teamMembers, newMember]);
        setEmailToInvite('');
        alert(`Invitation sent to ${emailToInvite} with role: ${roleToAssign}`);
    };

    const removeMember = (id) => {
        if (window.confirm("Are you sure you want to remove this team member?")) {
            setTeamMembers(teamMembers.filter(member => member.id !== id));
        }
    };

    return (
        <div className="bg-[#1D0845] min-h-screen text-white">
            <Header isLoggedIn={true} userName="Admin User" /> 
            
            <main className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-extrabold mb-8 flex items-center">
                    <Users className="w-8 h-8 mr-3 text-purple-400" />
                    Team Access & Roles ({accountType} Account)
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN (2/3 width on large screens) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Member Table */}
                        <DashboardCard title="Current Team Members">
                            <p className="text-sm text-gray-400 mb-4">Manage access and permissions for all users under your organization.</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm text-gray-300">
                                    <thead className="text-xs text-purple-200 uppercase bg-purple-900/50">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Name</th>
                                            <th scope="col" className="px-4 py-3">Email</th>
                                            <th scope="col" className="px-4 py-3">Role</th>
                                            <th scope="col" className="px-4 py-3">Status</th>
                                            <th scope="col" className="px-4 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teamMembers.map((member) => (
                                            <tr key={member.id} className="border-b border-purple-800 hover:bg-purple-900/20 transition">
                                                <td className="px-4 py-3 font-medium">{member.name}</td>
                                                <td className="px-4 py-3 text-xs text-gray-400 flex items-center space-x-2">
                                                    <Mail className="w-3 h-3 text-purple-400" /> 
                                                    <span>{member.email}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-600/20 text-blue-400">
                                                        {member.role}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                        member.status === 'Active' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                                                    }`}>
                                                        {member.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right space-x-3">
                                                    <button className="text-purple-400 hover:text-purple-300 transition" title="Edit Role">
                                                        <Settings className='w-4 h-4 inline-block' />
                                                    </button>
                                                    <button 
                                                        onClick={() => removeMember(member.id)}
                                                        className="text-red-500 hover:text-red-400 transition" 
                                                        title="Remove Member"
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
                        
                        {/* Role Permissions Key (Placeholder) */}
                        <DashboardCard title="Role Permissions Key">
                            <div className="space-y-3 text-sm text-gray-300">
                                <p className='flex items-center space-x-2'><Shield className='w-4 h-4 text-red-400'/> **Admin:** Full control (billing, key generation, user management).</p>
                                <p className='flex items-center space-x-2'><Shield className='w-4 h-4 text-blue-400'/> **Researcher:** Can view data, generate API keys, and download licensed data.</p>
                                <p className='flex items-center space-x-2'><Shield className='w-4 h-4 text-green-400'/> **Analyst:** Can view data and run reports, but cannot generate API keys or manage licenses.</p>
                            </div>
                        </DashboardCard>
                    </div>

                    {/* RIGHT COLUMN (1/3 width on large screens) */}
                    <div className="space-y-8">
                        
                        {/* Invite New Member Form */}
                        <DashboardCard title="Invite New Team Member">
                            <form onSubmit={inviteMember} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={emailToInvite}
                                        onChange={(e) => setEmailToInvite(e.target.value)}
                                        placeholder="user@organization.com"
                                        className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg text-white" 
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Assign Role</label>
                                    <select 
                                        value={roleToAssign}
                                        onChange={(e) => setRoleToAssign(e.target.value)}
                                        className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg text-white"
                                    >
                                        {teamRoles.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition flex items-center justify-center space-x-2">
                                    <UserPlus className="w-5 h-5" />
                                    <span>Send Invitation</span>
                                </button>
                            </form>
                        </DashboardCard>
                        
                        {/* Workspace Limits */}
                        <DashboardCard title="Workspace Limits">
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li className="flex justify-between">
                                    <span>Current Members:</span>
                                    <span className='font-semibold text-purple-400'>{teamMembers.length}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Max Members Allowed:</span>
                                    <span className='font-semibold text-white'>10</span>
                                </li>
                                <li className="flex justify-between pt-2 border-t border-purple-800">
                                    <span>License Tier:</span>
                                    <span className='font-semibold text-yellow-400'>Enterprise</span>
                                </li>
                            </ul>
                            <button className="w-full mt-4 py-2 border border-purple-600 text-purple-400 rounded-lg hover:bg-purple-900/50 transition">
                                Upgrade Team Access
                            </button>
                        </DashboardCard>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeamAccess;