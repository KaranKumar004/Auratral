// src/pages/Datasets.jsx

import React from 'react';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import DatasetFilter from '../components/DatasetFilter';
import DatasetCard from '../components/DatasetCard'; // Assumed component structure
import EmailSubscribe from '../components/EmailSubscribe'; // Assumed component structure

// Dummy Data to render the cards (matching your image examples)
const mockDatasets = [
  { title: 'Cardiovascular Health Record', records: '1.2M', price: '$1,200', types: ['Clinical', 'Imaging', 'CSV'], domain: 'Cardiovascular' },
  { title: 'Neurological MRI Imaging', records: '350K', price: '$2,500', types: ['Imaging', 'DICOM'], domain: 'Neurological' },
  { title: 'Longitudinal Diabetes Monitoring', records: '780K', price: '$1,800', types: ['Time-Series', 'JSON'], domain: 'Diabetes' },
  { title: 'Oncology Pathology Imaging', records: '190K', price: '$3,000', types: ['Imaging', 'TIFF'], domain: 'Cancer' },
  { title: 'Pulmonary Function and Imaging', records: '440K', price: '$1,600', types: ['Clinical', 'Imaging'], domain: 'Respiratory' },
];


const Datasets = () => {
    // State to hold the active filter and search term
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Logic to filter the datasets based on state
    const filteredDatasets = mockDatasets.filter(dataset => {
        const matchesFilter = filter === 'All' || dataset.domain === filter;
        const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

  return (
    <div className="bg-[#1D0845] min-h-screen text-white">
      {/* Assuming logged-in state for the dataset page as per requirement */}
      <Header isLoggedIn={true} userName="John Doe" /> 
      
      <main className="container mx-auto px-4 pt-10 pb-20">
        
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Explore Datasets</h2>
        <p className="text-gray-400 max-w-2xl mb-6">
            Search, or request high-quality datasets organized by domain, tailored to your specific research needs.
        </p>

        {/* Search Bar and Custom Request Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search datasets, keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 bg-purple-900/50 border border-purple-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-white"
                />
            </div>
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold whitespace-nowrap">
                + Request Custom Dataset
            </button>
        </div>

        {/* Domain Filters (Tabs) */}
        <DatasetFilter onFilterChange={setFilter} />

        {/* Dataset Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredDatasets.map((data, index) => (
                // DatasetCard component would need to be imported and mapped here
                <DatasetCard key={index} data={data} /> 
            ))}
            {filteredDatasets.length === 0 && (
                <div className="lg:col-span-3 text-center py-10 text-gray-400">
                    No datasets found matching your criteria.
                </div>
            )}
        </div>
        
        {/* Pagination goes here */}
        <div className="flex justify-center mt-10">
            {/* Simple Pagination Placeholder */}
            <div className="flex space-x-2 text-sm">
                <button className="px-3 py-1 border border-purple-700 text-purple-400 rounded hover:bg-purple-900/50">&lt;</button>
                <button className="px-3 py-1 bg-purple-600 rounded">1</button>
                <button className="px-3 py-1 border border-purple-700 text-purple-400 rounded hover:bg-purple-900/50">2</button>
                <button className="px-3 py-1 border border-purple-700 text-purple-400 rounded hover:bg-purple-900/50">3</button>
                <span className="px-3 py-1">...</span>
                <button className="px-3 py-1 border border-purple-700 text-purple-400 rounded hover:bg-purple-900/50">12</button>
                <button className="px-3 py-1 border border-purple-700 text-purple-400 rounded hover:bg-purple-900/50">&gt;</button>
            </div>
        </div>
        
      </main>

      {/* Stay Updated with New Datasets Footer */}
      <EmailSubscribe />
    </div>
  );
};

export default Datasets;