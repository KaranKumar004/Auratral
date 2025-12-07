// src/pages/UploadDataset.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
import DashboardCard from '../components/DashboardCard';
import { FileUp, Info, Package, DollarSign, UploadCloud, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  { id: 1, name: 'Metadata', icon: Info },
  { id: 2, name: 'File Details', icon: Package },
  { id: 3, name: 'Pricing & Terms', icon: DollarSign },
  { id: 4, name: 'Review & Submit', icon: UploadCloud },
];

const UploadDataset = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({}); // State to hold all form data

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleFormChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
      e.preventDefault();
      // Final submission logic here
      console.log('Dataset Submitted:', formData);
      alert('Dataset submitted for validation!');
      // Navigate to Dashboard upon success
  };

  const renderStepContent = () => {
    // --- STEP 1: Metadata ---
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <input type="text" name="title" placeholder="Dataset Title (e.g., Neurological MRI Scans 2025)" onChange={handleFormChange} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg" required />
          <textarea name="description" placeholder="Detailed description of the dataset, methodology, and contents" rows="5" onChange={handleFormChange} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg" required />
          <input type="text" name="domain" placeholder="Domain (e.g., Neurological, Oncology)" onChange={handleFormChange} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg" />
          <input type="number" name="recordCount" placeholder="Estimated Record Count (e.g., 350000)" onChange={handleFormChange} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg" />
        </div>
      );
    }
    
    // --- STEP 2: File Details ---
    if (currentStep === 2) {
        return (
            <div className="space-y-6">
                <p className="text-gray-400">Select the primary file format and upload method.</p>
                <select name="format" onChange={handleFormChange} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg">
                    <option value="">Select Primary Format</option>
                    <option value="DICOM">DICOM (Imaging)</option>
                    <option value="CSV">CSV (Tabular)</option>
                    <option value="JSON">JSON (Unstructured)</option>
                    <option value="API">API Endpoint</option>
                </select>
                
                {/* Simulated File Drop Zone */}
                <div className="border-2 border-dashed border-purple-600 p-12 text-center rounded-lg cursor-pointer hover:bg-purple-900/30 transition">
                    <FileUp className="w-8 h-8 mx-auto text-purple-400 mb-2" />
                    <p className="text-sm">Drag & drop files here, or <span className="text-purple-400 font-medium">click to browse</span></p>
                    <p className="text-xs text-gray-500 mt-1">Max size: 5GB. For larger files, please provide an API endpoint in the metadata.</p>
                </div>
                
                <textarea name="sampleDescription" placeholder="Description of the included sample data" rows="3" onChange={handleFormChange} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg" />
            </div>
        );
    }

    // --- STEP 3: Pricing & Terms ---
    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <p className="text-gray-400">Define your pricing structure and licensing terms.</p>
          <input type="number" name="basePrice" placeholder="Base Price (e.g., $1500 per license)" onChange={handleFormChange} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg" required />
          <input type="number" name="recordUnit" placeholder="Unit Size (e.g., 1000 records)" onChange={handleFormChange} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg" />
          
          <label className="flex items-center space-x-3 text-gray-300">
              <input type="checkbox" name="exclusive" className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded" />
              <span>Offer an Exclusive License option?</span>
          </label>
          <textarea name="customTerms" placeholder="Add custom usage or licensing terms" rows="3" onChange={handleFormChange} className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg" />
        </div>
      );
    }

    // --- STEP 4: Review & Submit ---
    if (currentStep === 4) {
      return (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">Review Submission</h3>
          <DashboardCard title="Summary">
              <ul className="text-sm space-y-2 text-gray-300">
                  <li><strong>Title:</strong> {formData.title || 'N/A'}</li>
                  <li><strong>Domain:</strong> {formData.domain || 'N/A'}</li>
                  <li><strong>Record Count:</strong> {formData.recordCount || 'N/A'}</li>
                  <li><strong>Base Price:</strong> ${formData.basePrice || 'N/A'} / {formData.recordUnit || 'unit'}</li>
              </ul>
          </DashboardCard>
          <div className="p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg text-yellow-300 flex items-start">
            <Info className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
            <p className="text-sm">By clicking 'Submit for Validation', you confirm that the data is accurate, you have the right to share it, and it adheres to Auratral's Data Policy.</p>
          </div>
          <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition">
            Submit for Validation
          </button>
        </div>
      );
    }
  };

  return (
    <div className="bg-[#1D0845] min-h-screen text-white">
      <Header isLoggedIn={true} userName="Partner Corp" /> 
      
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold mb-8 flex items-center">
            <FileUp className="w-8 h-8 mr-3 text-purple-400" />
            Upload New Dataset
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Step Indicator (1/4 width) */}
            <div className="lg:col-span-1">
                <DashboardCard title="Submission Progress">
                    <ol className="space-y-4">
                        {steps.map(step => (
                            <li key={step.id} className={`flex items-center space-x-3 transition-colors ${step.id === currentStep ? 'text-purple-400 font-bold' : 'text-gray-500'}`}>
                                <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step.id <= currentStep ? 'border-purple-400' : 'border-gray-600'}`}>
                                    <step.icon className="w-4 h-4" />
                                </div>
                                <span>{step.name}</span>
                            </li>
                        ))}
                    </ol>
                </DashboardCard>
            </div>

            {/* Form Content (3/4 width) */}
            <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <DashboardCard title={steps[currentStep - 1].name}>
                        {renderStepContent()}
                    </DashboardCard>
                    
                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-6">
                        <button 
                            type="button" 
                            onClick={prevStep} 
                            disabled={currentStep === 1}
                            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition ${currentStep === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span>Previous</span>
                        </button>
                        
                        {currentStep < steps.length && (
                            <button 
                                type="button" 
                                onClick={nextStep} 
                                className="flex items-center space-x-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                            >
                                <span>Next</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
      </main>
    </div>
  );
};

export default UploadDataset;