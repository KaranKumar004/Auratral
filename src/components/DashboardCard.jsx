// src/components/DatasetCard.jsx

import React from 'react';
import { Database, Download, Tag, DollarSign, Layers } from 'lucide-react';

const DatasetCard = ({ data }) => {
    // Destructure properties from the 'data' prop, providing fallbacks
    const title = data?.title || "Placeholder Dataset Title";
    const records = data?.records || "N/A";
    const price = data?.price || "Contact for Price";
    const domain = data?.domain || "General";
    const types = data?.types || ["N/A"];
    
    // Convert price string to display nicely
    const displayPrice = price.startsWith('$') ? price : `$${price}`;

    return (
        <div className="bg-[#3D1A78] p-6 rounded-xl shadow-lg border-2 border-[#5B21B6] transition hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]">
            
            {/* Title and Domain */}
            <div className="flex items-start justify-between mb-3">
                <div className='flex items-center'>
                    <Database className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" />
                    <h3 className="text-xl font-semibold leading-snug">{title}</h3>
                </div>
            </div>
            <span className="text-xs font-medium text-white px-2 py-0.5 rounded-full bg-purple-600/70">{domain}</span>

            <p className="text-gray-300 text-sm my-4">
                This high-quality dataset offers detailed records for advanced {domain} research, suitable for academic and commercial use.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm mb-4 pt-4 border-t border-purple-800">
                <div className="flex items-center text-gray-400">
                    <Tag className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>**{records}** Records</span>
                </div>
                <div className="flex items-center text-gray-400">
                    <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                    <span>**Price:** {displayPrice}</span>
                </div>
            </div>

            {/* Data Types / Tags */}
            <div className='flex items-center flex-wrap gap-2 text-xs border-t border-purple-800 pt-3'>
                <Layers className='w-4 h-4 text-purple-400 flex-shrink-0' />
                {types.map((type, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full">
                        {type}
                    </span>
                ))}
            </div>

            {/* Action Button */}
            <button className="w-full mt-4 flex items-center justify-center space-x-2 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
                <Download className='w-4 h-4' />
                <span>View Details & License</span>
            </button>
        </div>
    );
};

export default DatasetCard;