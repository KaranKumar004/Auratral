// src/layouts/PublicLayout.jsx

import React from 'react';
import Header from '../components/Header';
// ⚠️ CRITICAL: Must import Outlet from react-router-dom for nested routing
import { Outlet } from 'react-router-dom'; 

const PublicLayout = ({ onLoginClick, onRegisterClick }) => {
    // Note: The PublicLayout component receives the handlers from App.js
    
    return (
        // Wrapper for main styling
        <div className="min-h-screen bg-[#1D0845] text-white"> 
            
            {/* 1. Header is rendered and receives the click handlers */}
            <Header onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} /> 
            
            {/* 2. CRITICAL FIX: Add padding-top (pt-24 or pt-32) to the main tag
                 to push content down below the fixed header. */}
            <main className="pt-24"> 
                {/* 3. Outlet renders the matched route component (Home, etc.) */}
                <Outlet /> 
            </main>
            
            {/* Add a Footer if needed */}
        </div>
    );
};

export default PublicLayout;