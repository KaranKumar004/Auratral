import { Bell } from 'lucide-react';
import React, { useState } from 'react';
import {
    Archive, Database, DollarSign, Download, Zap, Upload, AlertTriangle, Shield, Search, Settings, LogOut, User, Key, ChevronDown, CheckCircle, ExternalLink, X, ShoppingCart, BarChart, Code, Plus, Server, Home, Edit, Trash2, MessageSquare, ClipboardCheck, Lock, LayoutDashboard, Menu, Activity, Layers, Filter, MoreVertical, RefreshCw, Eye
} from 'lucide-react';

// --- CONSTANTS ---
const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/auratral/',
    facebook: 'https://www.facebook.com/people/Auratral-India/pfbid02et6LJJn1HgPbr3PmR6Nv1vCtU9GvrwCjoreot5PbtaXjYv6W4pCrZjAmg2F2Udacl/',
    linkedin: 'https://www.linkedin.com/company/auratral/',
};

// --- MOCK DATA ---
const buyerMetrics = {
    totalDatasets: { value: 24, trend: '-3 this month', color: 'text-green-400', icon: <Archive className="w-5 h-5" /> },
    dataUsage: { value: '1.2 TB', trend: '78% of limit', color: 'text-yellow-400', usagePercent: 78, icon: <Database className="w-5 h-5" /> },
    apiCalls: { value: '45.2K', trend: 'Last 30 days', color: 'text-purple-400', icon: <Zap className="w-5 h-5" /> },
    activeLicenses: { value: 18, trend: '3 expiring soon', color: 'text-red-400', icon: <Shield className="w-5 h-5" /> },
};
const partnerMetrics = {
    totalDatasets: { value: 156, trend: '+12% this month', color: 'text-green-400', icon: <Archive className="w-5 h-5" /> },
    totalRecords: { value: '2.4M', trend: '+8% from last month', color: 'text-blue-400', icon: <Database className="w-5 h-5" /> },
    storageUsed: { value: '856 GB', trend: '62.5% of limit', color: 'text-yellow-400', usagePercent: 62.5, icon: <Server className="w-5 h-5" /> },
    monthlyRevenue: { value: '$12,845', trend: '+18% vs last month', color: 'text-green-400', icon: <DollarSign className="w-5 h-5" /> },
};
const buyerDatasets = [
    { name: 'NeuroScan MRI 2025', size: '2.3 GB', format: 'DICOM, NIFTI', status: 'Active', expires: '2026-05-01' },
    { name: 'OncoVision Pathology', size: '4.1 GB', format: 'JSON, DICOM', status: 'Active', expires: '2025-12-15' },
    { name: 'CardioHealth Study', size: '3.1 GB', format: 'DICOM, CSV', status: 'Expired', expires: '2025-04-01' },
];
const publishedDatasets = [
    { name: 'Cardiology ECG Set V3', status: 'Active', size: '1.5 GB', downloads: '1,200', revenue: '$4,500' },
    { name: 'Neurology Stroke Case Studies', status: 'Active', size: '2.8 GB', downloads: '540', revenue: '$2,100' },
    { name: 'Oncology Tissue Samples V2', status: 'Review', size: '5.2 GB', downloads: '0', revenue: '$0' },
];
const categories = ['All', 'Cardiology', 'Neurology', 'Oncology', 'Endocrinology', 'Pulmonology', 'Dermatology'];
const datasets = [
    { name: 'CardioPulse ECG Database', description: 'Comprehensive database of 15,000 anonymized ECG recordings from various demographics.', records: '15,000', size: '7.8 GB', price: '$$$', category: 'Cardiology' },
    { name: 'NeuroScan Stroke Study V2', description: 'Longitudinal data on stroke patient recovery, medication, and neurological function.', records: '10,500', size: '5.1 GB', price: '$$', category: 'Neurology' },
    { name: 'Indian Cancer Registry Data 2024', description: 'Anonymized registry data on common Indian cancer types, staging, and treatment responses.', records: '45,000', size: '22 GB', price: '$$$$', category: 'Oncology' },
    { name: 'Diabetes & Metabolism Panel', description: 'Cohort study on Type 2 Diabetes, including genetics, lab results, and lifestyle factors.', records: '8,000', size: '3.5 GB', price: '$$$', category: 'Endocrinology' },
    { name: 'Common Skin Diseases Images (De-Identified)', description: 'Image data for training AI models on common Indian dermatological conditions.', records: '25,000', size: '18 GB', price: '$$$$', category: 'Dermatology' },
    { name: 'Pulmonary Function Test Results', description: 'Spirometry and lung volume data for patients with various respiratory illnesses.', records: '12,000', size: '2.8 GB', price: '$$', category: 'Pulmonology' },
];

// --- REUSABLE COMPONENTS ---

// --- FAQ ITEM COMPONENT ---
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-[#2d0a4e]/60 backdrop-blur-sm rounded-2xl border border-purple-700/30 overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left hover:bg-purple-800/20 transition" >
                <h3 className="text-lg font-semibold text-white pr-8">{question}</h3>
                <ChevronDown size={24} className={`text-purple-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-6 pt-2 text-purple-300 leading-relaxed border-t border-purple-800/30">
                    {answer}
                </div>
            </div>
        </div>
    );
};

// --- MODAL COMPONENT ---
const Modal = ({ isOpen, onClose, children, maxWidth = 'max-w-md' }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className={`relative bg-gradient-to-br from-[#2d0a4e] to-[#1a0033] rounded-2xl shadow-2xl ${maxWidth} w-full border border-purple-700/30 animate-scaleIn`}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-purple-800/50" >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>
    );
};

// --- BUYER CONSENT MODAL ---
const BuyerConsentModal = ({ isOpen, onClose, onAccept }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
            <div className="p-8">
                <div className="flex items-center space-x-3 text-red-400 mb-6 pb-4 border-b border-purple-700/30">
                    <AlertTriangle size={32} />
                    <h2 className="text-2xl font-bold text-white">Data Usage Consent Required</h2>
                </div>
                
                <div className="space-y-4 text-purple-200 text-sm max-h-96 overflow-y-auto pr-2">
                    <p>By proceeding as a **Data Buyer**, you agree to the following mandatory terms and conditions to ensure ethical and compliant data usage:</p>
                    
                    <div className="bg-purple-900/40 p-4 rounded-xl space-y-3 border border-purple-700/40">
                        <p className="font-semibold text-white flex items-center"><ClipboardCheck size={20} className="mr-2 text-green-400"/> Non-Disclosure Agreement (NDA):</p>
                        <p>You agree not to disclose, share, or redistribute the licensed data to any third party not explicitly authorized in your license agreement.</p>
                        
                        <p className="font-semibold text-white flex items-center"><Lock size={20} className="mr-2 text-yellow-400"/> Anonymization Compliance:</p>
                        <p>You acknowledge that the data is **de-identified and anonymized**. You must not attempt to re-identify any individual from the data, which is strictly prohibited by ICMR guidelines.</p>
                        
                        <p className="font-semibold text-white flex items-center"><ExternalLink size={20} className="mr-2 text-purple-400"/> Research Purpose Only:</p>
                        <p>The data must be used solely for the research, academic, or non-commercial purposes specified in your data licensing form.</p>
                    </div>

                    <p className="font-bold text-lg text-white pt-2">I understand and accept these terms.</p>
                </div>

                <button 
                    onClick={onAccept}
                    className="mt-6 w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold text-white transition shadow-lg shadow-purple-600/30"
                >
                    I Accept & Continue as Data Buyer
                </button>
            </div>
        </Modal>
    );
};

// --- CUSTOM DATASET REQUEST MODAL ---
const CustomDatasetModal = ({ isOpen, onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to a backend API
        setIsSubmitted(true);
        setTimeout(() => {
            onClose();
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl">
            <div className="p-8">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
                        <MessageSquare size={32} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 text-center">Request Custom Dataset</h2>
                    <p className="text-purple-300 text-center">Tell us exactly what you need for your research.</p>
                </div>

                {isSubmitted ? (
                    <div className="text-center py-12">
                        <CheckCircle size={64} className="text-green-500 mx-auto mb-4 animate-bounce" />
                        <h3 className="text-xl font-semibold text-white">Request Submitted Successfully!</h3>
                        <p className="text-purple-300 mt-2">We will review your requirements and contact you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-purple-300 mb-1">Research Area / Category</label>
                            <select className="w-full p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white focus:ring-purple-500 focus:border-purple-500">
                                <option>Cardiology</option>
                                <option>Neurology</option>
                                <option>Oncology</option>
                                <option>Multi-Specialty</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-purple-300 mb-1">Required Data Fields (E.g., Age, Gender, Diagnosis)</label>
                            <input type="text" placeholder="e.g., Blood Pressure, Treatment Protocol, MRI Scan Type" required className="w-full p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white focus:ring-purple-500 focus:border-purple-500" />
                        </div>

                        <div>
                            <label className="block text-purple-300 mb-1">Target Patient Count / Volume</label>
                            <input type="number" placeholder="Minimum 10,000 records" required className="w-full p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white focus:ring-purple-500 focus:border-purple-500" />
                        </div>

                        <div>
                            <label className="block text-purple-300 mb-1">Specific Research Objectives</label>
                            <textarea placeholder="Describe your project and why this data is critical..." rows="4" required className="w-full p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white focus:ring-purple-500 focus:border-purple-500"></textarea>
                        </div>

                        <button type="submit" className="w-full p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold text-white transition">
                            Submit Request
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};


// --- LOGIN MODAL ---
const LoginModal = ({ isOpen, onClose, onSelectRole, onOpenConsentModal }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-8 text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
                        <User size={32} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome to Auratral</h2>
                    <p className="text-purple-300">Select your role to continue</p>
                </div>
                <div className="space-y-4">
                    <button type="button" onClick={() => onSelectRole('Buyer')} className="w-full p-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl transition-all transform hover:scale-105 border border-purple-500/30 group" >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-900/50 transition">
                                <ShoppingCart size={24} className="text-purple-200" />
                            </div>
                            <div className="text-left flex-grow">
                                <h3 className="text-xl font-bold text-white">Data Buyer</h3>
                                <p className="text-sm text-purple-200">Access and license datasets</p>
                            </div>
                            <ChevronDown size={24} className="text-purple-300 transform -rotate-90" />
                        </div>
                    </button>
                    <button type="button" onClick={() => onSelectRole('Partner')} className="w-full p-6 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 rounded-xl transition-all transform hover:scale-105 border border-pink-500/30 group" >
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-pink-800/50 rounded-lg flex items-center justify-center group-hover:bg-pink-900/50 transition">
                                <Upload size={24} className="text-pink-200" />
                            </div>
                            <div className="text-left flex-grow">
                                <h3 className="text-xl font-bold text-white">Data Provider</h3>
                                <p className="text-sm text-pink-200">Publish and manage datasets</p>
                            </div>
                            <ChevronDown size={24} className="text-pink-300 transform -rotate-90" />
                        </div>
                    </button>
                </div>
                <div className="mt-6 pt-6 border-t border-purple-800/30">
                    <p className="text-sm text-purple-400"> Don't have an account?{' '}
                        <button type="button" className="text-purple-300 hover:text-white font-semibold transition"> Sign up </button>
                    </p>
                </div>
            </div>
        </Modal>
    );
};

// --- DASHBOARD CARD ---
const DashboardCard = ({ title, value, trend, icon, color, usagePercent }) => (
    <div className="bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-xl border border-purple-700/30 hover:border-purple-600/50 transition-all shadow-lg hover:shadow-purple-500/20">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-xs font-medium text-purple-300 uppercase tracking-wider mb-2">{title}</p>
                <p className="text-3xl font-bold text-white">{value}</p>
            </div>
            <div className="p-3 bg-purple-800/30 rounded-lg text-purple-400">
                {icon}
            </div>
        </div>
        {usagePercent !== undefined && (
            <div className="mb-2">
                <div className="w-full bg-purple-900/30 rounded-full h-2">
                    <div className="h-2 rounded-full transition-all duration-500" style={{
                        width: `${usagePercent}%`,
                        backgroundColor: usagePercent > 90 ? '#ef4444' : usagePercent > 70 ? '#facc15' : '#22c55e'
                    }}
                    ></div>
                </div>
            </div>
        )}
        <p className={`text-sm ${color} flex items-center`}>
            {usagePercent > 70 && <AlertTriangle size={14} className="mr-1" />}
            {trend}
        </p>
    </div>
);

// --- SIDEBAR NAV LINK ---
const SidebarNavLink = ({ icon, text, isActive, onClick, badge }) => (
    <button type="button" onClick={onClick} className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
        isActive
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
            : 'text-purple-300 hover:bg-purple-800/30 hover:text-white'
    }`}
    >
        <div className="flex items-center space-x-3">
            {icon}
            <span className="font-medium">{text}</span>
        </div>
        {badge && (
            <span className="px-2 py-1 text-xs font-bold bg-pink-600 text-white rounded-full">
                {badge}
            </span>
        )}
    </button>
);

// --- HOME PAGE ---
const HomePage = ({ handleNavigate, setLoginModalOpen, setCustomDatasetModalOpen }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#1a0033]/80 backdrop-blur-xl border-b border-purple-700/30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Database size={24} />
                        </div>
                        <span className="text-2xl font-bold">Auratral</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8 text-sm">
                        <a href="#home" className="text-purple-300 hover:text-white transition font-medium">Home</a>
                        <a href="#services" className="text-purple-300 hover:text-white transition font-medium">Services</a>
                        <a href="#features" className="text-purple-300 hover:text-white transition font-medium">Features</a>
                        <a href="#faq" className="text-purple-300 hover:text-white transition font-medium">FAQ</a>
                        <button type="button" onClick={() => handleNavigate('DatasetGallery')} className="text-purple-300 hover:text-white transition font-medium" >
                            Explore Datasets
                        </button>
                    </nav>
                    <div className="flex items-center space-x-3">
                        <button type="button" onClick={() => setLoginModalOpen(true)} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition shadow-lg shadow-purple-600/30" >
                            Login
                        </button>
                        <button type="button" onClick={() => setLoginModalOpen(true)} className="px-6 py-2.5 border border-purple-600 hover:bg-purple-600/20 rounded-xl font-semibold transition" >
                            Register
                        </button>
                    </div>
                </div>
            </header>
            {/* Hero Section */}
            <section id="home" className="max-w-7xl mx-auto px-6 py-24 text-center">
                <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
                    Empowering Research <br />
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent"> with Premium Data Solutions </span>
                </h1>
                <p className="text-xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Access high-quality, clinical, and research-grade datasets from India. Provider samples and receive customized data solutions tailored to your specific research needs.
                </p>
                <div className="flex justify-center space-x-4 mb-20">
                    <button type="button" onClick={() => handleNavigate('DatasetGallery')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition shadow-xl shadow-purple-600/40 transform hover:scale-105 flex items-center space-x-2" >
                        <Search size={20} /> <span>Explore Datasets</span>
                    </button>
                    <button type="button" onClick={() => setCustomDatasetModalOpen(true)} className="px-8 py-4 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl font-semibold text-lg hover:from-pink-700 hover:to-pink-800 transition shadow-xl shadow-pink-600/40 transform hover:scale-105 flex items-center space-x-2" >
                        <Upload size={20} /> <span>Request Custom Dataset</span>
                    </button>
                </div>
                {/* Dashboard Mockup - (Omitted for brevity, but included in full code) */}
                <div className="relative max-w-6xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-3xl"></div>
                    <div className="relative bg-[#2d0a4e]/40 backdrop-blur-2xl border border-purple-700/30 rounded-3xl p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-700/30">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-purple-400 text-sm font-medium">Dashboard Preview</span>
                        </div>
                        {/* Metrics Cards */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            {[
                                { label: 'Total Datasets', value: '24', icon: <Archive size={20} /> },
                                { label: 'Data Usage', value: '1.2 TB', icon: <Database size={20} /> },
                                { label: 'API Calls', value: '45.2K', icon: <Zap size={20} /> },
                                { label: 'Licenses', value: '18', icon: <Shield size={20} /> },
                            ].map((metric, i) => (
                                <div key={i} className="bg-purple-900/30 p-4 rounded-xl border border-purple-700/20">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-purple-400">{metric.icon}</div>
                                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                                    </div>
                                    <div className="text-xs text-purple-300">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                        {/* Charts and Activity */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {/* Chart Area */}
                            <div className="col-span-2 bg-purple-900/20 rounded-xl border border-purple-700/20 p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-purple-300">Usage Analytics</span>
                                    <div className="flex space-x-2">
                                        {['1W', '1M', '3M', '1Y'].map(period => (
                                            <button type="button" key={period} className="px-2 py-1 text-xs bg-purple-800/30 text-purple-400 rounded">
                                                {period}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* Simulated Chart */}
                                <div className="flex items-end justify-between h-32 space-x-2">
                                    {[40, 65, 45, 80, 60, 75, 55, 90, 70, 85, 65, 95].map((height, i) => (
                                        <div key={i} className="flex-1 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t" style={{ height: `${height}%` }}></div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-purple-400">
                                    <span>Jan</span> <span>Feb</span> <span>Mar</span> <span>Apr</span> <span>May</span> <span>Jun</span>
                                </div>
                            </div>
                            {/* Activity Feed */}
                            <div className="bg-purple-900/20 rounded-xl border border-purple-700/20 p-4">
                                <span className="text-sm font-medium text-purple-300 mb-3 block">Recent Activity</span>
                                <div className="space-y-3">
                                    {[
                                        { icon: <Download size={14} />, text: 'Dataset Download' },
                                        { icon: <Key size={14} />, text: 'API Key Generated' },
                                        { icon: <DollarSign size={14} />, text: 'Payment Processed' },
                                        { icon: <Upload size={14} />, text: 'Dataset Published' },
                                    ].map((activity, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <div className="w-6 h-6 bg-purple-800/50 rounded flex items-center justify-center text-purple-400">
                                                {activity.icon}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="text-xs text-purple-300">{activity.text}</div>
                                                <div className="w-full bg-purple-800/30 h-1 rounded mt-1">
                                                    <div className="bg-purple-500 h-1 rounded" style={{ width: `${Math.random() * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Bottom Section */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Datasets List */}
                            <div className="bg-purple-900/20 rounded-xl border border-purple-700/20 p-4">
                                <span className="text-sm font-medium text-purple-300 mb-3 block">Recent Datasets</span>
                                <div className="space-y-2">
                                    {['NeuroScan MRI', 'CardioHealth V3', 'OncoVision Data'].map((name, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 bg-purple-800/20 rounded">
                                            <div className="flex items-center space-x-2">
                                                <Database size={14} className="text-purple-400" />
                                                <span className="text-xs text-purple-300">{name}</span>
                                            </div>
                                            <CheckCircle size={12} className="text-green-400" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Team Members */}
                            <div className="bg-purple-900/20 rounded-xl border border-purple-700/20 p-4">
                                <span className="text-sm font-medium text-purple-300 mb-3 block">Team Members</span>
                                <div className="flex -space-x-2">
                                    {['JS', 'AP', 'SC', 'PK'].map((initials, i) => (
                                        <div key={i} className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-2 border-[#2d0a4e] flex items-center justify-center text-xs font-bold">
                                            {initials}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 bg-purple-800/50 rounded-full border-2 border-[#2d0a4e] flex items-center justify-center text-xs font-bold text-purple-400">
                                        +5
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    <div className="bg-purple-800/30 rounded p-2">
                                        <div className="text-lg font-bold text-white">156</div>
                                        <div className="text-xs text-purple-400">Datasets</div>
                                    </div>
                                    <div className="bg-purple-800/30 rounded p-2">
                                        <div className="text-lg font-bold text-white">2.4M</div>
                                        <div className="text-xs text-purple-400">Records</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Key Metrics */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: '500+', label: 'Premium Datasets' },
                        { value: '120+', label: 'Data Providers' },
                        { value: '50M+', label: 'Records Available' },
                        { value: '99.9%', label: 'Service Uptime' },
                    ].map((metric, i) => (
                        <div key={i} className="bg-[#2d0a4e]/60 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/30 text-center hover:border-purple-600/50 transition-all shadow-lg hover:shadow-purple-500/30 transform hover:scale-105">
                            <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                {metric.value}
                            </p>
                            <p className="text-purple-300 font-medium">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* Service Cards */}
            <section id="services" className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Our Services </h2>
                    <p className="text-xl text-purple-300 max-w-2xl mx-auto"> Comprehensive data solutions to boost research, unlock insights, and drive high-impact outcomes. </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Database size={48} />, title: 'Premium Dataset Marketplace', description: 'Access a vast collection of high-quality, curated datasets for your research needs.', },
                        { icon: <Code size={48} />, title: 'API Integration Solutions', description: 'Seamlessly integrate our data into your platform with robust API support.', },
                        { icon: <BarChart size={48} />, title: 'Data Analytics Tools', description: 'Powerful analytics tools to derive insights from your datasets.', },
                    ].map((service, i) => (
                        <div key={i} className="bg-[#2d0a4e]/60 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/30 hover:border-purple-600/50 transition-all shadow-lg hover:shadow-purple-500/30">
                            <div className="text-purple-400 mb-4">{service.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-purple-300">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Why Choose Auratral? </h2>
                    <p className="text-xl text-purple-300 max-w-2xl mx-auto"> Our commitment to quality, ethics, and innovation sets us apart. </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <ExternalLink size={40} />, title: 'Localized Data for Indian Research', description: 'Specialized datasets focusing on the Indian demographic, which are often underrepresented in global research data pools.', label: 'Localized Focus' },
                        { icon: <Shield size={40} />, title: 'Ethical and Regulatory Compliance', description: 'In accordance with ethical guidelines for data acquisition and usage, including non-disclosure agreements and compliance with Indian Council for Medical Research (ICMR) standards.', label: 'Compliance' },
                        { icon: <Lock size={40} />, title: 'Robust Data Security & Privacy', description: "With cutting-edge encryption and adherence to the latest cybersecurity protocols ensuring the highest standards of data protection, complying with India's National Data Guidelines.", label: 'Data Security' },
                        { icon: <Zap size={40} />, title: 'AI-Ready Dataset for Innovation', description: 'The platform\'s datasets are optimized for AI research, helping businesses and scholars innovate and make informed decisions, especially in alignment with initiatives like "Make AI for India" and "Digital India".', label: 'AI & Innovation' },
                        { icon: <Archive size={40} />, title: 'Rigorous Data Curation', description: 'All datasets undergo stringent quality checks, de-identification processes, and annotation to ensure accuracy and readiness for immediate research use.', label: 'Quality Assurance' },
                        { icon: <Plus size={40} />, title: 'Custom Dataset Provisioning', description: 'We procure and curate bespoke datasets based on your unique and specific research requirements through our network of verified data partners.', label: 'Custom Solutions' },
                    ].map((feature, i) => (
                        <div key={i} className="bg-[#2d0a4e]/60 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/30 hover:border-purple-600/50 transition-all shadow-lg hover:shadow-purple-500/30">
                            <div className="flex items-start space-x-4 mb-4">
                                <div className="w-14 h-14 bg-purple-800/30 rounded-xl flex items-center justify-center text-purple-400 flex-shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">{feature.label}</span>
                                    <h3 className="text-xl font-bold text-white mt-1">{feature.title}</h3>
                                </div>
                            </div>
                            <p className="text-purple-300 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* FAQ Section */}
            <section id="faq" className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Popular Questions </h2>
                </div>
                <div className="max-w-4xl mx-auto space-y-4">
                    <FAQItem 
                        question="What is Auratral & what services do you offer?"
                        answer="Auratral is a pioneering platform that provides access to de-identified and anonymized research datasets from India, primarily focusing on the healthcare sector. Our platform serves researchers, students, businesses, and organizations by offering high-quality, localized datasets for research, analysis, and innovation purposes. Users can either purchase available datasets or request custom datasets tailored to their specific needs."
                    />
                    <FAQItem 
                        question="Is the data anonymized and compliant with Indian regulations?"
                        answer="Yes. All datasets available on the platform are rigorously de-identified and anonymized according to the latest Indian Council for Medical Research (ICMR) guidelines and the national data protection standards. Re-identification attempts are strictly prohibited and violations are subject to legal action. We maintain the highest ethical and regulatory standards."
                    />
                    <FAQItem 
                        question="How do I purchase a dataset?"
                        answer="To purchase a dataset, you must first register as a 'Data Buyer' and accept the Data Usage Consent and NDA. Once logged in, you can browse the Dataset Gallery, select the dataset that meets your needs, review the licensing terms, and complete the purchase process. You will immediately gain access to download or integrate the data via API."
                    />
                    <FAQItem 
                        question="What is a 'Custom Dataset Request'?"
                        answer="If you cannot find a pre-existing dataset that fits your exact research criteria, you can submit a 'Custom Dataset Request'. In the request, you can specify your exact research parameters, including data fields, target patient volume, and research area, and we will work with our network of Data Providers to procure and curate a specialized dataset for you, ensuring it meets all ethical and quality standards."
                    />
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-[#1a0033] border-t border-purple-700/30">
                <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-purple-800/30 pb-12">
                        <div className="col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <Database size={24} />
                                </div>
                                <span className="text-2xl font-bold">Auratral</span>
                            </div>
                            <p className="text-purple-300 max-w-sm">Empowering research and innovation with ethical, high-quality data from India's healthcare ecosystem.</p>
                            <div className="flex space-x-4 mt-6">
                                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white transition">
                                    <ExternalLink size={20} />
                                </a>
                                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white transition">
                                    <ExternalLink size={20} />
                                </a>
                                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white transition">
                                    <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-3">
                                <li><a href="#services" className="text-purple-300 hover:text-white transition text-sm">Our Services</a></li>
                                <li><a href="#features" className="text-purple-300 hover:text-white transition text-sm">Platform Features</a></li>
                                <li><button type="button" onClick={() => handleNavigate('DatasetGallery')} className="text-purple-300 hover:text-white transition text-sm">Explore Datasets</button></li>
                                <li><a href="#faq" className="text-purple-300 hover:text-white transition text-sm">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4">Support</h4>
                            <ul className="space-y-3">
                                <li><button type="button" className="text-purple-300 hover:text-white transition text-sm">Contact Us</button></li>
                                <li><button type="button" className="text-purple-300 hover:text-white transition text-sm">Documentation</button></li>
                                <li><button type="button" className="text-purple-300 hover:text-white transition text-sm">Privacy Policy</button></li>
                                <li><button type="button" className="text-purple-300 hover:text-white transition text-sm">Terms of Service</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
                            <ul className="space-y-3">
                                <li><a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white transition text-sm">LinkedIn</a></li>
                                <li><a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white transition text-sm">Instagram</a></li>
                                <li><a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white transition text-sm">Facebook</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm text-purple-400">
                        &copy; {new Date().getFullYear()} Auratral. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

// --- DATASET GALLERY PAGE ---
const DatasetCard = ({ dataset }) => (
    <div className="bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-xl border border-purple-700/30 hover:border-purple-600/50 transition-all shadow-lg hover:shadow-purple-500/20 flex flex-col justify-between">
        <div>
            <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-pink-600/50 text-pink-200">{dataset.category}</span>
                <span className="text-xl font-bold text-green-400">{dataset.price}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{dataset.name}</h3>
            <p className="text-purple-300 text-sm mb-4 line-clamp-3">{dataset.description}</p>
            <div className="flex items-center space-x-4 text-purple-400 text-sm mb-6">
                <div className="flex items-center space-x-1">
                    <Archive size={16} /> <span>{dataset.records} Records</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Server size={16} /> <span>{dataset.size}</span>
                </div>
            </div>
        </div>
        <button type="button" className="w-full p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold text-white transition mt-4">
            View Details & License
        </button>
    </div>
);

const DatasetGalleryPage = ({ handleNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price_asc', 'price_desc'

    const filteredDatasets = datasets
        .filter(d => selectedCategory === 'All' || d.category === selectedCategory)
        .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.description.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'newest') return 0; // Mock: no actual date to sort by
            if (sortBy === 'price_asc') return a.price.length - b.price.length;
            if (sortBy === 'price_desc') return b.price.length - a.price.length;
            return 0;
        });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white">
            <header className="sticky top-0 z-40 bg-[#1a0033]/80 backdrop-blur-xl border-b border-purple-700/30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <button type="button" onClick={() => handleNavigate('Home')} className="flex items-center space-x-2 text-2xl font-bold hover:text-purple-300 transition">
                            <Home size={24} /> <span>Home</span>
                        </button>
                    </div>
                    <button type="button" onClick={() => handleNavigate('Home')} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition shadow-lg shadow-purple-600/30" >
                        Back to Home
                    </button>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-16">
                <h1 className="text-5xl font-extrabold mb-4 text-center">Dataset Gallery</h1>
                <p className="text-xl text-purple-300 mb-12 text-center">Browse high-quality, research-ready healthcare datasets.</p>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-12 bg-[#2d0a4e]/60 p-6 rounded-xl border border-purple-700/30">
                    {/* Search Bar */}
                    <div className="relative flex-grow w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                            type="text"
                            placeholder="Search by dataset name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>
                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full md:w-48 p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white focus:ring-purple-500 focus:border-purple-500"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat} ({datasets.filter(d => cat === 'All' || d.category === cat).length})</option>
                        ))}
                    </select>
                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full md:w-40 p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white focus:ring-purple-500 focus:border-purple-500"
                    >
                        <option value="newest">Sort By: Newest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>

                {/* Dataset Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDatasets.length > 0 ? (
                        filteredDatasets.map((dataset, i) => (
                            <DatasetCard key={i} dataset={dataset} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-[#2d0a4e]/60 rounded-xl border border-purple-700/30">
                            <Search size={48} className="text-purple-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-white">No Datasets Found</h3>
                            <p className="text-purple-300 mt-2">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// --- BUYER DASHBOARD PAGE ---
const DatasetRow = ({ dataset }) => {
    const statusColor = dataset.status === 'Active' ?
        'text-green-400 bg-green-900/30' : dataset.status === 'Review' ? 'text-yellow-400 bg-yellow-900/30' : 'text-red-400 bg-red-900/30';
    return (
        <tr className="border-b border-purple-800/50 hover:bg-purple-900/30 transition">
            <td className="p-4 font-medium text-white flex items-center space-x-2">
                <Database size={18} className="text-purple-400" /> <span>{dataset.name}</span>
            </td>
            <td className="p-4 text-purple-300">{dataset.size}</td>
            <td className="p-4 text-purple-300">{dataset.format}</td>
            <td className="p-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                    {dataset.status}
                </span>
            </td>
            <td className="p-4 text-purple-300">{dataset.expires}</td>
            <td className="p-4">
                <div className="flex space-x-2">
                    <button type="button" className="p-2 text-purple-400 hover:text-white hover:bg-purple-800/50 rounded-lg transition" title="Download">
                        <Download size={18} />
                    </button>
                    <button type="button" className="p-2 text-purple-400 hover:text-white hover:bg-purple-800/50 rounded-lg transition" title="API Docs">
                        <Code size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

const BuyerDashboardPage = ({ handleNavigate }) => {
    const userName = 'Data Scientist'; // Mock User Name
    return (
        <div className="flex h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 bg-[#1a0033]/80 border-r border-purple-800/50 p-6 flex flex-col">
                <div className="flex items-center space-x-2 mb-10">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Database size={20} />
                    </div>
                    <span className="text-xl font-bold">Auratral</span>
                </div>
                <nav className="space-y-3 flex-grow">
                    <SidebarNavLink icon={<LayoutDashboard size={20} />} text="Dashboard" isActive={true} onClick={() => {}} />
                    <SidebarNavLink icon={<Archive size={20} />} text="My Datasets" isActive={false} badge={buyerMetrics.totalDatasets.value} onClick={() => {}} />
                    <SidebarNavLink icon={<ShoppingCart size={20} />} text="License History" isActive={false} onClick={() => {}} />
                    <SidebarNavLink icon={<Key size={20} />} text="API Management" isActive={false} onClick={() => {}} />
                    <SidebarNavLink icon={<Settings size={20} />} text="Settings" isActive={false} onClick={() => {}} />
                </nav>
                <div className="mt-8 pt-4 border-t border-purple-800/50">
                    <SidebarNavLink icon={<LogOut size={20} />} text="Logout" isActive={false} onClick={() => handleNavigate('Home')} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold">Welcome back, {userName}</h1>
                    <div className="flex items-center space-x-4">
                        <button type="button" className="p-3 text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-full transition" title="Notifications">
                            <Bell size={24} />
                        </button>
                        <div className="flex items-center space-x-2 bg-[#2d0a4e]/60 p-2 pr-4 rounded-full border border-purple-700/30">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold text-sm"> DS </div>
                            <span className="text-sm text-white">Buyer Profile</span>
                            <ChevronDown size={16} className="text-purple-400" />
                        </div>
                    </div>
                </header>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {Object.entries(buyerMetrics).map(([key, metric]) => (
                        <DashboardCard
                            key={key}
                            title={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                            value={metric.value}
                            trend={metric.trend}
                            icon={metric.icon}
                            color={metric.color}
                            usagePercent={metric.usagePercent}
                        />
                    ))}
                </div>

                {/* Purchased Datasets Table */}
                <div className="bg-[#2d0a4e]/60 backdrop-blur-sm rounded-xl border border-purple-700/30 shadow-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                        <Archive size={24} className="text-purple-400" /> <span>My Licensed Datasets</span>
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="uppercase text-sm text-purple-400 border-b border-purple-700/50">
                                    <th className="p-4 font-semibold">Dataset Name</th>
                                    <th className="p-4 font-semibold">Size</th>
                                    <th className="p-4 font-semibold">Format</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold">Expires</th>
                                    <th className="p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buyerDatasets.map((dataset, i) => (
                                    <DatasetRow key={i} dataset={dataset} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- PARTNER DASHBOARD PAGE ---
const PartnerDatasetRow = ({ dataset }) => {
    const statusColor = dataset.status === 'Active' ?
        'text-green-400 bg-green-900/30' : dataset.status === 'Review' ? 'text-yellow-400 bg-yellow-900/30' : 'text-red-400 bg-red-900/30';
    return (
        <tr className="border-b border-purple-800/50 hover:bg-purple-900/30 transition">
            <td className="p-4 font-medium text-white flex items-center space-x-2">
                <Database size={18} className="text-purple-400" /> <span>{dataset.name}</span>
            </td>
            <td className="p-4 text-purple-300">{dataset.size}</td>
            <td className="p-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                    {dataset.status}
                </span>
            </td>
            <td className="p-4 text-purple-300">{dataset.downloads}</td>
            <td className="p-4 font-semibold text-green-400">{dataset.revenue}</td>
            <td className="p-4">
                <div className="flex space-x-2">
                    <button type="button" className="p-2 text-purple-400 hover:text-white hover:bg-purple-800/50 rounded-lg transition" title="Edit">
                        <Edit size={18} />
                    </button>
                    <button type="button" className="p-2 text-red-400 hover:text-white hover:bg-red-800/50 rounded-lg transition" title="Delete">
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

const PartnerDashboardPage = ({ handleNavigate }) => {
    const userName = 'Dr. Sharma'; // Mock User Name
    return (
        <div className="flex h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 bg-[#1a0033]/80 border-r border-purple-800/50 p-6 flex flex-col">
                <div className="flex items-center space-x-2 mb-10">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Database size={20} />
                    </div>
                    <span className="text-xl font-bold">Auratral</span>
                </div>
                <nav className="space-y-3 flex-grow">
                    <SidebarNavLink icon={<LayoutDashboard size={20} />} text="Dashboard" isActive={true} onClick={() => {}} />
                    <SidebarNavLink icon={<Archive size={20} />} text="My Datasets" isActive={false} badge={partnerMetrics.totalDatasets.value} onClick={() => {}} />
                    <SidebarNavLink icon={<DollarSign size={20} />} text="Revenue" isActive={false} onClick={() => {}} />
                    <SidebarNavLink icon={<Upload size={20} />} text="Data Submission" isActive={false} onClick={() => {}} />
                    <SidebarNavLink icon={<Settings size={20} />} text="Settings" isActive={false} onClick={() => {}} />
                </nav>
                <div className="mt-8 pt-4 border-t border-purple-800/50">
                    <SidebarNavLink icon={<LogOut size={20} />} text="Logout" isActive={false} onClick={() => handleNavigate('Home')} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold">Welcome back, {userName}</h1>
                    <div className="flex items-center space-x-4">
                        <button type="button" className="p-3 text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-full transition" title="Notifications">
                            <Bell size={24} />
                        </button>
                        <div className="flex items-center space-x-2 bg-[#2d0a4e]/60 p-2 pr-4 rounded-full border border-purple-700/30">
                            <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center font-bold text-sm"> DS </div>
                            <span className="text-sm text-white">Provider Profile</span>
                            <ChevronDown size={16} className="text-purple-400" />
                        </div>
                    </div>
                </header>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {Object.entries(partnerMetrics).map(([key, metric]) => (
                        <DashboardCard
                            key={key}
                            title={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                            value={metric.value}
                            trend={metric.trend}
                            icon={metric.icon}
                            color={metric.color}
                            usagePercent={metric.usagePercent}
                        />
                    ))}
                </div>

                {/* Published Datasets Table */}
                <div className="bg-[#2d0a4e]/60 backdrop-blur-sm rounded-xl border border-purple-700/30 shadow-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                            <Archive size={24} className="text-purple-400" /> <span>My Published Datasets</span>
                        </h2>
                        <button type="button" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold text-white flex items-center space-x-2">
                            <Plus size={20} /> <span>Upload New Data</span>
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="uppercase text-sm text-purple-400 border-b border-purple-700/50">
                                    <th className="p-4 font-semibold">Dataset Name</th>
                                    <th className="p-4 font-semibold">Size</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold">Downloads</th>
                                    <th className="p-4 font-semibold">Revenue</th>
                                    <th className="p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {publishedDatasets.map((dataset, i) => (
                                    <PartnerDatasetRow key={i} dataset={dataset} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex justify-between items-center text-sm text-purple-400">
                        <span>Showing 1 to {publishedDatasets.length} of {partnerMetrics.totalDatasets.value} Datasets</span>
                        <div className="flex space-x-2">
                            <button type="button" disabled className="px-3 py-1 bg-purple-800/50 rounded-lg">Previous</button>
                            <button type="button" className="px-3 py-1 bg-purple-600 rounded-lg text-white">1</button>
                            <button type="button" className="px-3 py-1 bg-purple-800/50 rounded-lg">2</button>
                            <button type="button" className="px-3 py-1 bg-purple-800/50 rounded-lg">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
const App = () => {
    // Current page state
    const [currentPage, setCurrentPage] = useState('Home'); // Can be 'Home', 'DatasetGallery', 'BuyerDashboard', 'PartnerDashboard'
    
    // Modal states
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [consentModalOpen, setConsentModalOpen] = useState(false);
    const [customDatasetModalOpen, setCustomDatasetModalOpen] = useState(false);

    const handleOpenConsentModal = () => {
        setLoginModalOpen(false);
        setConsentModalOpen(true);
    };

    /**
     * Centralized navigation function to set the current page and close all modals.
     * This replaces the old setCurrentPage prop being passed directly.
     */
    const handleNavigate = (page) => {
        setLoginModalOpen(false);
        setConsentModalOpen(false);
        setCustomDatasetModalOpen(false);
        setCurrentPage(page);
    };


    const handleSelectRole = (selectedRole) => {
        setLoginModalOpen(false);
        setCustomDatasetModalOpen(false);
        
        if (selectedRole === 'Buyer') {
            handleOpenConsentModal();
        } else {
            handleNavigate('PartnerDashboard');
        }
    };

    const handleAcceptConsent = () => {
        handleNavigate('BuyerDashboard');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'DatasetGallery':
                // Pass handleNavigate
                return <DatasetGalleryPage handleNavigate={handleNavigate} />;
            case 'BuyerDashboard':
                // Pass handleNavigate
                return <BuyerDashboardPage handleNavigate={handleNavigate} />;
            case 'PartnerDashboard':
                // Pass handleNavigate
                return <PartnerDashboardPage handleNavigate={handleNavigate} />;
            case 'Home':
            default:
                return (
                    <HomePage
                        handleNavigate={handleNavigate} // Pass handleNavigate
                        setLoginModalOpen={setLoginModalOpen}
                        setCustomDatasetModalOpen={setCustomDatasetModalOpen}
                    />
                );
        }
    };

    return (
        <div className="App">
            {renderPage()}
            <LoginModal
                isOpen={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                onSelectRole={handleSelectRole}
                onOpenConsentModal={handleOpenConsentModal}
            />
            <BuyerConsentModal
                isOpen={consentModalOpen}
                onClose={() => setConsentModalOpen(false)}
                onAccept={handleAcceptConsent}
            />
            <CustomDatasetModal
                isOpen={customDatasetModalOpen}
                onClose={() => setCustomDatasetModalOpen(false)}
            />
        </div>
    );
};

export default App;