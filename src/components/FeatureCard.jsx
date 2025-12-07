// src/components/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ title, subtitle, description, icon: Icon }) => (
    <div className="p-6 bg-[#3D1A78] rounded-xl shadow-lg border border-purple-700/50 hover:border-purple-500 transition duration-300">
        <div className="flex items-center space-x-3 mb-3">
            {/* The icon here is a simplified placeholder for the 3D graphics */}
            <Icon className="w-8 h-8 text-purple-400" /> 
            <h3 className="text-sm font-light text-gray-400 uppercase">{subtitle}</h3>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-300 text-sm">{description}</p>
    </div>
);

export default FeatureCard;