// src/components/DatasetFilter.jsx

import React, { useState } from 'react';

const domainFilters = [
  'All', 
  'Cancer', 
  'Diabetes', 
  'Cardiovascular', 
  'Neurological', 
  'Respiratory', 
  'Mental Health'
];

const DatasetFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilterClick = (filterName) => {
    setActiveFilter(filterName);
    // Optionally call a parent function to update the dataset list
    if (onFilterChange) {
      onFilterChange(filterName);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-purple-900/30 rounded-lg border border-purple-800">
      {domainFilters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          // Conditional Tailwind classes for the active state
          className={`
            px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
            ${activeFilter === filter
              ? 'bg-purple-600 text-white shadow-md' // Active state
              : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/70 hover:text-white' // Inactive state
            }
          `}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default DatasetFilter;