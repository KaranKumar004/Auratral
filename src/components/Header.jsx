// src/components/Header.jsx

import React from 'react';
// 1. IMPORT Link for navigation and necessary icons
import { Link } from 'react-router-dom'; 
import { Database, ChevronDown, User, LogIn } from 'lucide-react';

const Header = ({ isLoggedIn = false, userName = "Guest", onLoginClick, onRegisterClick }) => {
    
    // Placeholder for actual logout logic
    const handleLogout = () => {
        alert("Logging out...");
        // In a real app, this would dispatch a logout action
        // For now, we'll just reload or redirect to the home page
    };

    return (
        <header className="bg-[#1D0845] border-b border-purple-800/50 text-white shadow-xl fixed w-full z-20">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                
                {/* --- 1. Logo (Branding Fix) --- */}
                <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
                    <Database className="w-6 h-6 text-purple-400" /> 
                    <span className="text-xl font-bold text-white tracking-wider">Auratral</span>
                </Link>

                {/* --- 2. Main Navigation Links (Routing Fix) --- */}
                <nav className="hidden md:flex space-x-8 text-sm font-medium">
                    <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
                    {/* These will be functional once you set the routes in App.js */}
                    <Link to="/explore-datasets" className="text-gray-300 hover:text-white transition">Explore Datasets</Link>
                    <a href="#" className="text-gray-300 hover:text-white transition">Features</a>
                    <a href="#" className="text-gray-300 hover:text-white transition">FAQ</a>
                    <a href="#" className="text-gray-300 hover:text-white transition">Contact</a>
                </nav>

                {/* --- 3. User Actions (Login/Profile) --- */}
                <div className="flex items-center space-x-4 text-sm">
                    {isLoggedIn ? (
                        // Logged-in State (Buyer or Partner Profile)
                        <div className="flex items-center space-x-4 relative">
                            <Link 
                                to={userName === "Partner Corp" ? "/dashboard/partner" : "/dashboard/buyer"}
                                className="text-yellow-400 hover:text-yellow-300 transition"
                            >
                                Dashboard
                            </Link>

                            <div className="group relative">
                                <button className="flex items-center space-x-2 p-2 rounded-full bg-purple-700 hover:bg-purple-600 transition">
                                    <User className="w-5 h-5" />
                                    <span className='hidden sm:inline'>{userName}</span>
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </button>
                                
                                {/* Dropdown Menu (Placeholder) */}
                                <div className="absolute right-0 mt-2 w-48 bg-[#3D1A78] rounded-lg shadow-xl py-1 hidden group-hover:block transition duration-200 z-30">
                                    <Link 
                                        to="/settings" 
                                        className="block px-4 py-2 text-gray-300 hover:bg-purple-800"
                                    >
                                        Settings
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-purple-800"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Logged-out State
                        <div className="flex space-x-4">
                            <button 
                                onClick={onLoginClick} // Assuming this function opens a Login Modal
                                className="flex items-center text-gray-300 hover:text-white transition"
                            >
                                <LogIn className='w-4 h-4 mr-1' />
                                Login
                            </button>
                            <button 
                                onClick={onRegisterClick} // Assuming this function handles registration flow
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;