import React, { useState } from 'react';
import Modal from 'react-modal';
import {
    Home, User, X, Edit, Trash2, MessageSquare, ClipboardCheck, Lock, Menu, Activity, LayoutDashboard, Layers, Filter, MoreVertical, RefreshCw, Eye,
    Archive, Database, DollarSign, Download, Zap, Upload, AlertTriangle, Shield, Search, Settings, LogOut, Key, ChevronDown, CheckCircle, ExternalLink, ShoppingCart, BarChart, Code, Plus, Server, Bell,
    Info, Sliders ,FileText
} from 'lucide-react';

// --- I. CONSTANTS AND MOCK DATA ---

const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/auratral/',
    facebook: 'https://www.facebook.com/people/Auratral-India/pfbid02et6LJJn1HgPbr3PmR6Nv1vCtU9GvrwCjoreot5PbtaXjYv6W4pCrZjAmg2F2Udacl/',
    linkedin: 'https://www.linkedin.com/company/auratral/',
};
const categories = [
    'Cardiology', 'Oncology', 'Neurology', 'Genomics', 'Radiology', 'Clinical Trials'
];
const pricingPlans = [
    { title: 'Bronze Tier', price: '$99 / month', features: ['1 dataset license', '1k API calls/day', 'Standard support'], color: 'text-yellow-400', ring: 'ring-yellow-400', tier: 'Bronze' },
    { title: 'Silver Tier', price: '$499 / month', features: ['5 datasets licenses', '10k API calls/day', 'Priority support'], color: 'text-purple-400', ring: 'ring-purple-400', tier: 'Silver' },
    { title: 'Gold Tier (Pro)', price: '$999 / month', features: ['Unlimited licenses', 'Unlimited API calls', 'Dedicated research analyst'], color: 'text-pink-400', ring: 'ring-pink-400', tier: 'Gold' },
];
const mockNewDataset = {
    name: 'NeuroScan MRI 2026',
    size: '150 GB',
    format: 'DICOM',
    rows: '500k scans',
    licenseType: 'Annual',
    price: '$3,200',
    description: 'High-resolution medical image data for advanced neurological analysis.',
};
const buyerMetrics = {
    totalDatasets: { value: 3, trend: '-3 this month', color: 'text-green-400', icon: <Archive className="w-5 h-5" /> },
    dataUsage: { value: '1.2 TB', trend: '78% of limit', color: 'text-yellow-400', usagePercent: 78, icon: <Database className="w-5 h-5" /> },
    apiCalls: { value: '15k', trend: '+5% daily', color: 'text-pink-400', icon: <Zap className="w-5 h-5" /> },
    totalSpend: { value: '$8,500', trend: '+12% YTD', color: 'text-purple-400', icon: <DollarSign className="w-5 h-5" /> },
};
const partnerMetrics = {
    totalDatasets: { value: 12, trend: '+2 this month', color: 'text-green-400', icon: <Layers className="w-5 h-5" /> },
    totalRecords: { value: '80M', trend: 'Largest yet!', color: 'text-purple-400', icon: <Database className="w-5 h-5" /> },
    storageUsed: { value: '5.6 TB', trend: '35% capacity', color: 'text-yellow-400', usagePercent: 35, icon: <Server className="w-5 h-5" /> },
    monthlyRevenue: { value: '$4,200', trend: '+18% MoM', color: 'text-pink-400', icon: <DollarSign className="w-5 h-5" /> },
};
const buyerDatasets = [
    { name: 'Global Consumer Trends Q4', size: '5 GB', format: 'JSON, CSV', status: 'Active', expires: '2026-06-01', rows: '1.5M' },
    { name: 'Financial Market Data 2024', size: '20 GB', format: 'Parquet', status: 'Active', expires: '2027-01-15', rows: '10M' },
    { name: 'Regional Demographics Survey', size: '500 MB', format: 'CSV', status: 'Expired', expires: '2025-01-01', rows: '500k' },
];
const partnerDatasets = [
    { name: 'India Clinical Trial Data V3', category: 'Clinical Trials', status: 'Active', downloads: '1.2k', revenue: '$1,500', date: '2025-09-10' },
    { name: 'Mumbai Radiology Scans', category: 'Radiology', status: 'In Review', downloads: 'N/A', revenue: 'N/A', date: '2025-11-20' },
    { name: 'South India Genomic Sequences', category: 'Genomics', status: 'Active', downloads: '500', revenue: '$2,700', date: '2025-05-15' },
    { name: 'National Diabetes Outcomes 2024', category: 'Cardiology', status: 'Active', downloads: '3.1k', revenue: '$6,500', date: '2025-01-01' },
];
const marketplaceDatasets = [
    { name: 'Indian Cardio Health Study', category: 'Cardiology', provider: 'Apex Research', size: '10 GB', records: '2M', price: '$1,500', description: 'Comprehensive study on common cardiac conditions in South Asian populations.', licensePrice: 1500, format: 'CSV'
},
    { name: 'Pan-India Oncology Registry', category: 'Oncology', provider: 'MediData Corp', size: '50 GB', records: '5M', price: '$5,000', description: 'Longitudinal data from cancer patients across major Indian cities.', licensePrice: 5000, format: 'Parquet, CSV'
},
    { name: 'NeuroScan MRI Data 2026', category: 'Neurology', provider: 'TechNeuro Labs', size: '150 GB', records: '500k scans', price: mockNewDataset.price, description: mockNewDataset.description, licensePrice: 3200, format: mockNewDataset.format },
    { name: 'COVID-19 Patient Data 2024', category: 'Clinical Trials', provider: 'National Health Inst.', size: '5 GB', records: '800k', price: '$800', description: 'Detailed clinical outcomes of COVID-19 patients, including vaccination status.', licensePrice: 800, format: 'JSON'
},
    { name: 'Radiology Image Bank Pune', category: 'Radiology', provider: 'Pune Med Labs', size: '200 GB', records: '1.2M scans', price: '$8,000', description: 'Large-scale radiological image data focusing on musculoskeletal conditions.', licensePrice: 8000, format: 'DICOM'
},
    { name: 'Genomic Variant Frequency (North)', category: 'Genomics', provider: 'Genomix India', size: '30 GB', records: '10M variants', price: '$4,200', description: 'Frequency data on genetic variants specific to North Indian populations.', licensePrice: 4200, format: 'TSV'
},
];
const companyDetails = [
    { title: 'Founded', detail: '2025' },
    { title: 'Mission', detail: 'To democratize ethical, compliant healthcare data for AI innovation in India.'
},
    { title: 'Compliance', detail: 'ICMR Guidelines, Indian Data Privacy Acts' },
    { title: 'Headquarters', detail: 'Bengaluru, India' },
];
const faqs = [
    { question: "Is the data fully anonymized and compliant with Indian regulations?", answer: "Yes, all datasets undergo rigorous de-identification and anonymization processes compliant with ICMR guidelines and Indian data privacy laws to ensure zero risk of re-identification."
},
    { question: "What are the typical use cases for the data?", answer: "The data is primarily used for academic research, AI/ML model training, clinical decision support system development, and public health policy research."
},
    { question: "Can I use the data for commercial purposes?", answer: "This depends on the license tier purchased. The Gold Tier Pro typically allows for specific commercial use cases, subject to a detailed review and supplementary agreement."
},
    { question: "How is data quality ensured?", answer: "Our platform performs automated cleansing, structuring, and validation checks. All data submissions are also manually reviewed by our data governance board before listing."
},
];

// --- NEW MOCK DATA FOR PLACEHOLDERS ---

const mockLicenseHistory = [
    { id: 'LIC005', dataset: 'India Clinical Trial Data V3', tier: 'Gold Tier (Pro)', cost: '$6,500', purchaseDate: '2025-11-20', status: 'Active' },
    { id: 'LIC004', dataset: 'Pan-India Oncology Registry', tier: 'Silver Tier', cost: '$5,500', purchaseDate: '2025-09-15', status: 'Active' },
    { id: 'LIC003', dataset: 'COVID-19 Patient Data 2024', tier: 'Bronze Tier', cost: '$900', purchaseDate: '2025-07-01', status: 'Expired' },
    { id: 'LIC002', dataset: 'Indian Cardio Health Study', tier: 'Silver Tier', cost: '$2,000', purchaseDate: '2024-12-10', status: 'Expired' },
];

const mockRevenueTransactions = [
    { id: 'TRX101', dataset: 'National Diabetes Outcomes 2024', amount: '$1,200', date: '2025-11-30', status: 'Paid', buyer: 'Pharma Research Ltd.' },
    { id: 'TRX102', dataset: 'South India Genomic Sequences', amount: '$2,700', date: '2025-10-15', status: 'Paid', buyer: 'AI Health Startups' },
    { id: 'TRX103', dataset: 'Mumbai Radiology Scans', amount: '$300', date: '2025-09-01', status: 'Pending', buyer: 'Academic Institute' },
    { id: 'TRX104', dataset: 'India Clinical Trial Data V3', amount: '$1,500', date: '2025-08-01', status: 'Paid', buyer: 'Global Pharma Inc.' },
];

// --- II. REUSABLE COMPONENTS ---

// Simple Mock Bar Chart for Revenue
const BarChartMock = () => {
    const data = [1000, 1500, 2200, 3000, 4200, 4800];
    const maxVal = Math.max(...data) * 1.1;
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return (
        <div className="flex justify-between items-end h-48 w-full p-2 bg-purple-900/30 rounded-lg">
            {data.map((val, index) => (
                <div key={index} className="flex flex-col items-center w-1/6 h-full relative">
                    <div
                        className="w-4/5 bg-gradient-to-t from-pink-500 to-purple-600 rounded-t-sm transition-all duration-700 hover:scale-y-105 relative group shadow-lg shadow-purple-900"
                        style={{ height: `${(val / maxVal) * 100}%` }}
                    >
                        <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-purple-300 opacity-0 group-hover:opacity-100 transition duration-300">
                            ${(val / 1000).toFixed(1)}K
                        </span>
                    </div>
                    <span className="text-xs text-purple-400 mt-1">{labels[index]}</span>
                </div>
            ))}
        </div>
    );
};

// Simple Mock Line Chart for Usage/API Calls
const LineChartMock = () => {
    const points = [10, 20, 15, 25, 30, 22, 35];
    const maxVal = Math.max(...points) * 1.1;
    const width = 300;
    const height = 100;
    const getPathData = (points, width, height) => {
        const xStep = width / (points.length - 1);
        const yRatio = height / maxVal;
       
        let path = points.map((val, i) => {
            const x = i * xStep;
            const y = height - (val * yRatio);
            return `${x},${y}`;
        }).join(' L ');
        return `M 0,${height} L 0,${height - (points[0] * yRatio)} ${path} L ${width},${height} Z`;
    };

    return (
        <div className="relative p-2" style={{ width: '100%' }}>
            <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height: `${height}px` }}>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor:"#EC4899", stopOpacity:0.3}} />
                        <stop offset="100%" style={{stopColor:"#9333EA", stopOpacity:0.05}} />
                    </linearGradient>
                </defs>
                <path
                    d={getPathData(points, width, height)}
                    fill="url(#gradient)"
                    stroke="#EC4899"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

// Component for API Key management
const ApiKeyItem = ({ apiKey }) => {
    const [showKey, setShowKey] = useState(false);
    return (
        <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-700/30">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="text-white font-semibold">{apiKey.name}</h4>
                    <p className="text-sm text-purple-300 font-mono mt-1">
                        {showKey ? apiKey.key : '********************'}
                    </p>
                </div>
                <button
                    type="button"
                    title={showKey ? "Hide Key" : "Show Key"}
                    onClick={() => setShowKey(!showKey)}
                    className="p-2 text-purple-400 hover:text-white hover:bg-purple-800/50 rounded-lg transition"
                >
                    <Eye size={18} />
                </button>
            </div>
            <div className="flex justify-between items-center text-xs text-purple-400 mt-3">
                <span>Created: {apiKey.created}</span>
                <span>Last used: {apiKey.lastUsed}</span>
            </div>
        </div>
    );
};

const SidebarNavLink = ({ icon, text, isActive, onClick, badge }) => (
    <button
        type="button"
        className={`w-full flex items-center p-3 rounded-lg font-semibold transition duration-200 justify-between
            ${isActive
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                : 'text-purple-300 hover:bg-purple-800/50 hover:text-white'
    }`}
        onClick={onClick}
    >
        <div className="flex items-center space-x-3">
            {React.cloneElement(icon, { size: 20 })}
            <span>{text}</span>
        </div>
        {badge && (
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-pink-500 text-white">
                {badge}
            </span>
        )}
    </button>
);
const DashboardCard = ({ title, value, trend, icon, color, usagePercent }) => (
    <div className="bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-xl border border-purple-700/30 shadow-2xl space-y-3">
        <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-purple-300 uppercase">{title}</h3>
            <div className={`p-2 rounded-full bg-purple-900/50 ${color}`}>{icon}</div>
        </div>
        <p className="text-3xl font-bold text-white">{value}</p>
        {usagePercent ? (
            <div className="pt-2">
                <div className="w-full bg-purple-900 rounded-full h-2.5">
                    <div className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${usagePercent}%` }}></div>
                </div>
                <p className="text-xs text-purple-400 mt-1">{trend}</p>
            </div>
        ) : (
            <p className={`text-sm ${color} font-semibold flex items-center space-x-1`}>
                <RefreshCw size={12} /> <span>{trend}</span>
            </p>
        )}
    </div>
);
const DatasetCard = ({ dataset, onClick }) => (
    <div
        className="bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-xl border border-purple-700/30 hover:border-pink-500/50 transition-all shadow-xl space-y-4 cursor-pointer"
        onClick={() => onClick(dataset)}
    >
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white">{dataset.name}</h3>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-900 text-purple-400 border border-purple-600/50">{dataset.category}</span>
        </div>
        <p className="text-purple-300 text-sm h-10 overflow-hidden text-ellipsis">{dataset.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-purple-400 border-t border-b border-purple-800/50 py-3">
            <p className="flex items-center space-x-2"><Layers size={16} /> <span className="font-semibold">Provider:</span> <span className="text-white truncate">{dataset.provider}</span></p>
            <p className="flex items-center space-x-2"><Server size={16} /> <span className="font-semibold">Size:</span> <span className="text-white">{dataset.size}</span></p>
            <p className="flex items-center space-x-2"><BarChart size={16} /> <span className="font-semibold">Records:</span> <span className="text-white">{dataset.records}</span></p>
            <p className="flex items-center space-x-2"><DollarSign size={16} /> <span className="font-semibold">Price:</span> <span className="text-green-400 font-bold">{dataset.price}</span></p>
        </div>
        <button
            onClick={(e) => { e.stopPropagation(); onClick(dataset); }}
            className="w-full p-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-bold text-white transition flex items-center justify-center space-x-2"
        >
            <Eye size={20} /> <span>View Details</span>
        </button>
    </div>
);
// Consolidated Dataset Row for both dashboards
const DatasetRow = ({ dataset, isPartner }) => (
    <tr className="border-b border-purple-800/50 hover:bg-purple-900/30 transition">
        <td className="p-4 text-white font-medium">{dataset.name}</td>
        <td className="p-4 text-purple-300">{isPartner ? dataset.category : dataset.size}</td>
        <td className="p-4 text-purple-300">{isPartner ? dataset.date : dataset.format}</td>
       
        {isPartner && (
            <>
                <td className="p-4 text-purple-300">{dataset.downloads}</td>
                <td className="p-4 text-green-400 font-semibold">{dataset.revenue}</td>
            </>
        )}

        <td className="p-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full
                ${dataset.status === 'Active' ? 'text-green-400 bg-green-900/30' :
                    dataset.status === 'In Review' ? 'text-yellow-400 bg-yellow-900/30' :
                  'text-red-400 bg-red-900/30'}`
            }>
                {dataset.status}
            </span>
        </td>

        <td className="p-4 space-x-2 flex items-center">
            {isPartner ?
            (
                <>
                    <button type="button" title="Edit" className="p-1 bg-purple-700 hover:bg-purple-600 rounded-md text-white">
                        <Edit size={18} />
                    </button>
                    <button type="button" title="Delete" className="p-1 bg-red-700 hover:bg-red-600 rounded-md text-white">
                        <Trash2 size={18} />
                    </button>
                </>
            ) : (
                <>
                    <button type="button" title="Download" className="p-1 bg-purple-700 hover:bg-purple-600 rounded-md text-white">
                        <Download size={18} />
                    </button>
                    <button type="button" title="API Docs" className="p-1 bg-pink-700 hover:bg-pink-600 rounded-md text-white">
                        <Code size={18} />
                    </button>
                </>
            )}
        </td>
    </tr>
);
const PricingCard = ({ title, price, features, color, ring, isSelected, onClick }) => (
    <div
        className={`bg-[#2d0a4e]/60 backdrop-blur-sm p-8 rounded-2xl border-4 ${ring} border-opacity-50 shadow-2xl space-y-6 text-white text-center cursor-pointer
            ${isSelected ? 'border-pink-500 ring-4 ring-pink-500 ring-opacity-70' : 'hover:border-purple-500'}`}
        onClick={onClick}
    >
        <h3 className={`text-3xl font-bold ${color}`}>{title}</h3>
        <p className="text-5xl font-extrabold">{price}</p>
        <ul className="text-sm space-y-3 text-purple-200 text-left">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center space-x-3">
                    <CheckCircle size={18} className={color.replace('text', 'text-white')} />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button className={`w-full p-3 rounded-lg font-semibold transition ${isSelected ? 'bg-pink-600 hover:bg-pink-700' : 'bg-purple-700 hover:bg-purple-600'}`}>
            {isSelected ? 'Selected' : 'Select Tier'}
        </button>
    </div>
);
const Footer = () => (
    <footer className="bg-[#1a0033]/80 border-t border-purple-800/50 p-8 text-purple-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Database size={16} className="text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">Auratral</span>
                </div>
                <p className="text-sm">Ethical Data for AI Research.</p>
                <p className="text-xs mt-2">© 2025 Auratral. All rights reserved.</p>
            </div>
            <div>
                <h4 className="font-semibold text-white mb-4">Platform</h4>
                <ul className="space-y-2 text-sm">
                    <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-pink-400 transition">Marketplace</button></li>
                    <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-pink-400 transition">API Documentation</button></li>
                    <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-pink-400 transition">For Data Providers</button></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                    <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-pink-400 transition">Privacy Policy</button></li>
                    <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-pink-400 transition">Terms of Service</button></li>
                    <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-pink-400 transition">License Agreement</button></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-white mb-4">Connect</h4>
                <div className="flex space-x-4">
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><ExternalLink size={20} /></a>
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><ExternalLink size={20} /></a>
                    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><ExternalLink size={20} /></a>
                </div>
            </div>
        </div>
    </footer>
);
const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 bg-[#2d0a4e]/60 backdrop-blur-sm rounded-xl border border-purple-700/50 shadow-2xl space-y-3">
        <div className="text-pink-500">{icon}</div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-purple-300 text-sm">{description}</p>
    </div>
);
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-purple-700/50">
            <button
                className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg hover:text-pink-400 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-white">{question}</span>
                <ChevronDown size={20} className={`transform transition-transform ${isOpen ? 'rotate-180 text-pink-500' : 'rotate-0 text-purple-400'}`} />
            </button>
            {isOpen && (
                <div className="pb-4 pr-6 text-purple-300">
                    {answer}
                </div>
            )}
        </div>
    );
};

// --- NEW COMPONENTS FOR PLACEHOLDER REPLACEMENT ---

const LicenseHistoryTable = ({ history }) => (
    <div className="bg-[#2d0a4e]/60 backdrop-blur-sm rounded-xl border border-purple-700/30 shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2"><ShoppingCart size={24} /> <span>License History</span></h2>
        <div className="overflow-x-auto">
            <table className="min-w-full text-left">
                <thead>
                    <tr className="uppercase text-sm text-purple-400 border-b border-purple-700/50">
                        <th className="p-4 font-semibold">License ID</th>
                        <th className="p-4 font-semibold">Dataset</th>
                        <th className="p-4 font-semibold">Tier</th>
                        <th className="p-4 font-semibold">Cost</th>
                        <th className="p-4 font-semibold">Purchase Date</th>
                        <th className="p-4 font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item, i) => (
                        <tr key={i} className="border-b border-purple-800/50 hover:bg-purple-900/30 transition">
                            <td className="p-4 text-purple-300">{item.id}</td>
                            <td className="p-4 text-white font-medium">{item.dataset}</td>
                            <td className={`p-4 font-semibold ${item.tier.includes('Gold') ? 'text-pink-400' : 'text-purple-300'}`}>{item.tier}</td>
                            <td className="p-4 text-green-400 font-semibold">{item.cost}</td>
                            <td className="p-4 text-purple-300">{item.purchaseDate}</td>
                            <td className="p-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full
                                    ${item.status === 'Active' ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'}`
                                }>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const RevenueTransactionTable = ({ transactions }) => (
    <div className="bg-[#2d0a4e]/60 backdrop-blur-sm rounded-xl border border-purple-700/30 shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2"><DollarSign size={24} /> <span>Recent Revenue Transactions</span></h2>
        <div className="overflow-x-auto">
            <table className="min-w-full text-left">
                <thead>
                    <tr className="uppercase text-sm text-purple-400 border-b border-purple-700/50">
                        <th className="p-4 font-semibold">Transaction ID</th>
                        <th className="p-4 font-semibold">Dataset</th>
                        <th className="p-4 font-semibold">Buyer</th>
                        <th className="p-4 font-semibold">Amount</th>
                        <th className="p-4 font-semibold">Date</th>
                        <th className="p-4 font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item, i) => (
                        <tr key={i} className="border-b border-purple-800/50 hover:bg-purple-900/30 transition">
                            <td className="p-4 text-purple-300">{item.id}</td>
                            <td className="p-4 text-white font-medium">{item.dataset}</td>
                            <td className="p-4 text-purple-300">{item.buyer}</td>
                            <td className="p-4 text-green-400 font-semibold">{item.amount}</td>
                            <td className="p-4 text-purple-300">{item.date}</td>
                            <td className="p-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full
                                    ${item.status === 'Paid' ? 'text-green-400 bg-green-900/30' : 'text-yellow-400 bg-yellow-900/30'}`
                                }>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const SettingsContent = ({ userRole }) => (
    <div className="bg-[#2d0a4e]/60 backdrop-blur-sm rounded-xl border border-purple-700/30 shadow-2xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Settings size={28} className="text-pink-400" /> <span>{userRole} Profile Settings</span>
        </h2>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-pink-400 border-b border-purple-800/50 pb-2">Account Information</h3>
                <input type="text" defaultValue={`John Doe (${userRole})`} placeholder="Full Name" className="w-full p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white" />
                <input type="email" defaultValue="john.doe@example.com" placeholder="Email Address" className="w-full p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white" />
                <input type="password" placeholder="Change Password" className="w-full p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white" />
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-pink-400 border-b border-purple-800/50 pb-2">Preferences</h3>
                <div className="flex items-center space-x-3 p-3 bg-purple-900/50 rounded-lg border border-purple-700/50">
                    <input type="checkbox" defaultChecked className="h-5 w-5 text-pink-600 bg-purple-900 border-purple-700 rounded focus:ring-pink-500" />
                    <label className="text-white">Receive weekly platform updates</label>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-900/50 rounded-lg border border-purple-700/50">
                    <input type="checkbox" className="h-5 w-5 text-pink-600 bg-purple-900 border-purple-700 rounded focus:ring-pink-500" />
                    <label className="text-white">Enable two-factor authentication</label>
                </div>
            </div>
        </div>

        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-white transition flex items-center space-x-2 mt-6">
            <CheckCircle size={20} /> <span>Save Changes</span>
        </button>
    </div>
);


// --- III. MODAL COMPONENTS ---

const LoginModal = ({ isOpen, onClose, onSelectRole }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-[#2d0a4e] p-8 rounded-2xl shadow-purple-900/80 shadow-2xl w-full max-w-md border border-purple-700/50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Select Role</h2>
                    <button onClick={onClose} className="text-purple-300 hover:text-white transition"><X size={24} /></button>
                </div>
                <p className="text-purple-300 mb-6">Choose your profile type to continue to the dashboard.</p>
                <div className="space-y-4">
                    <button
                        onClick={() => onSelectRole('BuyerDashboard')}
                        className="w-full flex items-center justify-center space-x-3 p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition"
                    >
                        <ShoppingCart size={20} /> <span>Data Buyer</span>
                    </button>
                    <button
                        onClick={() => onSelectRole('PartnerDashboard')}
                        className="w-full flex items-center justify-center space-x-3 p-4 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold transition"
                    >
                        <Server size={20} /> <span>Data Provider (Partner)</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const CustomDatasetModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-[#2d0a4e] p-8 rounded-2xl shadow-purple-900/80 shadow-2xl w-full max-w-lg border border-purple-700/50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">Request Custom Dataset</h2>
                    <button onClick={onClose} className="text-purple-300 hover:text-white transition"><X size={24} /></button>
                </div>
                <div className="space-y-4 text-white">
                    <input type="text" placeholder="Research Area (e.g., Oncology)" className="w-full p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg" />
                    <textarea placeholder="Required Data Fields (e.g., Age, Gender, Diagnosis Date)" rows="3" className="w-full p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg"></textarea>
                    <input type="number" placeholder="Target Patient Count (e.g., 10,000)" className="w-full p-3 bg-purple-900/50 border border-purple-700/50 rounded-lg" />
                    <button className="w-full p-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition">Submit Request</button>
                </div>
            </div>
        </div>
    );
};
const BuyerConsentModal = ({ isOpen, onClose, dataset, config, finalPrice, onAccept }) => {

  const agreementsList = [
    { key: 'dataProtection', icon: <Shield className="w-5 h-5 text-green-400" />, title: 'Data Protection & Privacy Compliance',
      description: 'I acknowledge that this dataset contains sensitive health information and agree to comply with all applicable data protection regulations including GDPR, HIPAA, and local privacy laws.' },
    { key: 'nonDisclosure', icon: <Lock className="w-5 h-5 text-yellow-400" />, title: 'Non-Disclosure Agreement',
      description: 'I agree to maintain strict confidentiality regarding all data received and will not disclose, share, or distribute any portion of this dataset to third parties.' },
    { key: 'usageRestrictions', icon: <Activity className="w-5 h-5 text-pink-400" />, title: 'Usage Restrictions & Compliance',
      description: 'I understand that this data is for legitimate research, analysis, or business purposes only. I will not attempt to re-identify anonymized individuals.' },
    { key: 'dataSecurity', icon: <Key className="w-5 h-5 text-blue-400" />, title: 'Data Security Requirements',
      description: 'I commit to implementing industry-standard security measures including encryption at rest and in transit and regular security audits.' },
    { key: 'liability', icon: <AlertTriangle className="w-5 h-5 text-red-400" />, title: 'Liability & Indemnification',
      description: 'I accept full liability for any misuse of the data and agree to indemnify Auratral against any claims or legal actions.' },
  ];

  // ✅ Hooks ALWAYS at top level
  const [agreements, setAgreements] = useState(
    agreementsList.reduce((acc, curr) => ({ ...acc, [curr.key]: false }), {})
  );

  const allAccepted = Object.values(agreements).every(Boolean);

  // ✅ Conditional render AFTER hooks
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden
                      bg-[#2d0a4e] rounded-2xl
                      border border-purple-700/50
                      shadow-purple-900/80 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-purple-700/30">
          <h2 className="text-2xl font-bold text-white">Legal Documentation & Compliance</h2>
          <button onClick={onClose} className="text-purple-300 hover:text-white transition">
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[65vh] space-y-5">
          {agreementsList.map((agreement) => (
            <label
              key={agreement.key}
              className="flex items-start space-x-4 p-5 bg-purple-900/30
                         border border-purple-700/30 rounded-xl cursor-pointer
                         hover:border-purple-600/50 transition"
            >
              <input
                type="checkbox"
                checked={agreements[agreement.key]}
                onChange={(e) =>
                  setAgreements({ ...agreements, [agreement.key]: e.target.checked })
                }
                className="mt-1 w-5 h-5 rounded border-purple-600
                           bg-purple-900 checked:bg-purple-600"
              />
              <div>
                <h3 className="font-semibold text-white">{agreement.title}</h3>
                <p className="text-sm text-purple-300">{agreement.description}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-purple-700/30">
          <span className="text-sm text-purple-300">
            {Object.values(agreements).filter(Boolean).length} / {agreementsList.length} accepted
          </span>

          <button
            disabled={!allAccepted}
            onClick={() => allAccepted && onAccept()}
            className={`px-8 py-3 rounded-xl font-semibold transition
              ${allAccepted
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
          >
            Agree & Proceed

          </button>
        </div>
      </div>
    </div>
  );
};

// --- IV. PAGE COMPONENTS ---

const HomePage = ({ handleNavigate, setLoginModalOpen, setCustomDatasetModalOpen }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white">
            <header className="sticky top-0 z-10 bg-[#1a0033]/90 backdrop-blur-md border-b border-purple-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Database size={20} />
                        </div>
                        <span className="text-2xl font-bold">Auratral</span>
                    </div>
                    <nav className="hidden md:flex space-x-6 text-purple-300 font-medium">
                        <button onClick={() => handleNavigate('Home')} className="hover:text-white transition">Home</button>
                        <button onClick={() => handleNavigate('DatasetGallery')} className="hover:text-white transition">Marketplace</button>
                        <button onClick={() => setCustomDatasetModalOpen(true)} className="hover:text-white transition">Custom Data</button>
                        <button onClick={() => setLoginModalOpen(true)} className="hover:text-white transition">Partner</button>
                    </nav>
                    <button
                        onClick={() => setLoginModalOpen(true)}
                        className="px-5 py-2 bg-pink-600 hover:bg-pink-700 rounded-full font-semibold transition shadow-lg shadow-pink-900/50"
                    >
                        Sign In
                    </button>
                </div>
            </header>

            <main>
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                        Ethical Data for <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">AI Innovation</span> in India
                    </h1>
                    <p className="text-xl text-purple-200 mb-10 max-w-3xl mx-auto">
                        A curated marketplace of compliant, de-identified healthcare and research datasets powering the next generation of Indian AI.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => handleNavigate('DatasetGallery')}
                            className="px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-full font-bold text-white transition transform hover:scale-105 shadow-xl shadow-pink-900/50 flex items-center space-x-2"
                        >
                            <ShoppingCart size={20} /> <span>Explore Marketplace</span>
                        </button>
                        <button
                            onClick={() => setCustomDatasetModalOpen(true)}
                            className="px-8 py-3 border border-purple-500 text-purple-200 hover:bg-purple-700/50 rounded-full font-semibold transition transform hover:scale-105 flex items-center space-x-2"
                        >
                            <Plus size={20} /> <span>Custom Data Request</span>
                        </button>
                    </div>
                </section>
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Auratral?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield size={30} />}
                            title="Regulatory Compliance"
                            description="All data adheres strictly to ICMR guidelines and Indian data privacy laws, ensuring ethical and legal use."
                        />
                        <FeatureCard
                            icon={<Activity size={30} />}
                            title="De-identified Datasets"
                            description="Rigorous anonymization techniques ensure patient privacy while maintaining data utility for advanced research."
                        />
                        <FeatureCard
                            icon={<Filter size={30} />}
                            title="Curated Quality"
                            description="Every dataset is manually reviewed and structured by our data governance board before listing on the platform."
                        />
                    </div>
                </section>
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Auratral</span>
                    </h2>
                    <div className="bg-[#2d0a4e]/60 backdrop-blur-sm p-10 rounded-xl border border-purple-700/30 shadow-2xl">
                        <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto text-center">
                            Auratral is the first platform dedicated to creating a transparent, ethical data marketplace for Indian healthcare and research data.
                            We bridge the gap between data providers (hospitals, labs, research institutes) and global innovators.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {companyDetails.map((item, i) => (
                                <div key={i} className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-700/50">
                                    <p className="text-sm font-medium text-purple-300">{item.title}</p>
                                    <p className="text-xl font-bold text-white mt-1">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-bold text-center mb-12">Flexible Pricing Plans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, i) => (
                            <PricingCard key={i} {...plan} />
                        ))}
                    </div>
                </section>
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};
const DatasetGalleryPage = ({ handleNavigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeTab, setActiveTab] = useState('Marketplace');
    const [sortCriteria, setSortCriteria] = useState('Name (A-Z)');

    const sortDatasets = (datasets) => {
        let sorted = [...datasets];
        switch (sortCriteria) {
            case 'Price (Low to High)':
                return sorted.sort((a, b) => a.licensePrice - b.licensePrice);
            case 'Price (High to Low)':
                return sorted.sort((a, b) => b.licensePrice - a.licensePrice);
            case 'Name (Z-A)':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case 'Name (A-Z)':
            default:
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
    };

    const filteredDatasets = marketplaceDatasets.filter(dataset => {
        const matchesCategory = selectedCategory === 'All' || dataset.category === selectedCategory;
        const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              dataset.provider.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleViewDetails = (dataset) => {
        handleNavigate('DatasetDetail', dataset);
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white overflow-hidden">
            <div className="w-64 flex-shrink-0 bg-[#1a0033]/80 border-r border-purple-800/50 p-6 flex flex-col">
                <div className="flex items-center space-x-2 mb-10">
                    <span className="text-xl font-bold">Auratral</span>
                </div>
                <nav className="space-y-3 flex-grow">
                    <SidebarNavLink icon={<Home size={20} />} text="Home" isActive={activeTab === 'Home'} onClick={() => handleNavigate('Home')} />
                    <SidebarNavLink icon={<Layers size={20} />} text="Marketplace" isActive={activeTab === 'Marketplace'} onClick={() => setActiveTab('Marketplace')} />
                    <SidebarNavLink icon={<LayoutDashboard size={20} />} text="My Dashboard" isActive={activeTab === 'Dashboard'} onClick={() => handleNavigate('BuyerDashboard')} />
                </nav>
                <div className="mt-8 pt-4 border-t border-purple-800/50">
                    <SidebarNavLink icon={<LogOut size={20} />} text="Logout" isActive={false} onClick={() => handleNavigate('Home')} />
                </div>
            </div>

            <div className="flex-grow p-8 overflow-y-auto">
                <h1 className="text-4xl font-bold mb-10">Data Marketplace Gallery</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                    <div className="relative md:col-span-2">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <input
                            type="text"
                            placeholder="Search datasets by name or provider..."
                            className="w-full p-3 pl-10 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white placeholder-purple-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <select
                            className="w-full p-3 pl-10 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white appearance-none"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option>All</option>
                            {categories.map(cat => <option key={cat}>{cat}</option>)}
                        </select>
                        <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                        <Sliders size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                        <select
                            className="w-full p-3 pl-10 bg-purple-900/50 border border-purple-700/50 rounded-lg text-white appearance-none"
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.target.value)}
                        >
                            <option>Name (A-Z)</option>
                            <option>Name (Z-A)</option>
                            <option>Price (Low to High)</option>
                            <option>Price (High to Low)</option>
                        </select>
                        <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 pointer-events-none" />
                    </div>
                </div>

                {filteredDatasets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortDatasets(filteredDatasets).map((dataset, i) => (
                            <DatasetCard key={i} dataset={dataset} onClick={handleViewDetails} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#2d0a4e]/60 backdrop-blur-sm rounded-xl border border-purple-700/30">
                        <h2 className="text-2xl font-bold text-purple-300">No Datasets Found</h2>
                        <p className="text-purple-400 mt-2">Try adjusting your search and filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const DatasetDetailPage = ({ handleNavigate, dataset }) => {
    if (!dataset) return <div className="text-center p-20 text-white">Dataset not found. <button onClick={() => handleNavigate('DatasetGallery')} className="text-pink-400">Go back to Gallery</button></div>;
   
    const specs = [
        { label: 'Provider', value: dataset.provider, icon: <User size={18} /> },
        { label: 'Category', value: dataset.category, icon: <Filter size={18} /> },
        { label: 'Total Records', value: dataset.records, icon: <BarChart size={18} /> },
        { label: 'File Size', value: dataset.size, icon: <Server size={18} /> },
        { label: 'Format(s)', value: dataset.format, icon: <Code size={18} /> },
        { label: 'Initial Price', value: dataset.price, icon: <DollarSign size={18} /> },
    ];

    const handleSelectTier = (tier) => {
        handleNavigate('PurchaseConfiguration', { dataset: dataset, licenseTier: tier });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => handleNavigate('DatasetGallery')}
                    className="flex items-center space-x-2 text-purple-300 hover:text-pink-400 mb-8 transition"
                >
                    <ChevronDown size={20} className="transform rotate-90" /> <span>Back to Marketplace</span>
                </button>

                <div className="bg-[#2d0a4e]/60 backdrop-blur-sm rounded-xl border border-purple-700/30 shadow-2xl p-10 space-y-8">
                    <div className="flex justify-between items-start border-b border-purple-800/50 pb-6">
                        <div>
                            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-pink-900 text-pink-400 border border-pink-600/50 mb-2 inline-block">{dataset.category}</span>
                            <h1 className="text-5xl font-extrabold text-white">{dataset.name}</h1>
                            <p className="text-purple-300 text-lg mt-3">Provided by: <span className="text-white font-semibold">{dataset.provider}</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-pink-400 mb-4">Detailed Overview</h2>
                            <p className="text-purple-200 leading-relaxed">{dataset.description} This dataset is critical for researchers focused on the demographic trends and clinical outcomes associated with this specific medical condition in the Indian subcontinent. Data is updated quarterly.</p>
                           
                            <h3 className="text-xl font-bold text-purple-400 mt-6 mb-3">Key Features</h3>
                            <ul className="list-disc list-inside space-y-2 text-purple-300 ml-4">
                                <li>Longitudinal patient records spanning 5 years.</li>
                                <li>100% de-identified medical codes (ICD-10, SNOMED-CT).</li>
                                <li>Metadata includes geo-location at the state level (anonymized).</li>
                                <li>Dedicated API access with 99.9% uptime.</li>
                            </ul>
                        </div>
                        <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2"><Info size={24} className="text-yellow-400"/> <span>Data Specifications</span></h2>
                            <div className="space-y-3">
                                {specs.map((spec, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        {spec.icon}
                                        <p className="text-sm font-semibold text-purple-300 flex-grow">{spec.label}:</p>
                                        <p className="text-white font-medium">{spec.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-purple-800/50">
                        <h2 className="text-3xl font-bold text-center mb-8">Select Your License Tier</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {pricingPlans.map((plan, i) => (
                                <PricingCard
                                    key={i}
                                    {...plan}
                                    onClick={() => handleSelectTier(plan)}
                                />
                            ))}
                        </div>
                        <p className="text-center text-sm text-purple-400 mt-6">Prices shown are for the standard annual license for this dataset. Monthly options available upon request.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PurchaseConfigurationPage = ({ handleNavigate, dataset, licenseTier }) => {
    if (!dataset || !licenseTier) {
        return <div className="text-center p-20 text-white">Missing purchase details. <button onClick={() => handleNavigate('DatasetGallery')} className="text-pink-400">Go back to Gallery</button></div>;
    }

    const { tier, title, price: tierPrice, features, color } = licenseTier;
    const { name, provider, size, price: basePrice } = dataset;
   
    let finalLicenseCost = dataset.licensePrice;
    let tierAdjustment = 0;
    if (tier === 'Silver') tierAdjustment = 500;
    if (tier === 'Gold') tierAdjustment = 1000;
    finalLicenseCost += tierAdjustment;


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => handleNavigate('DatasetDetail', dataset)}
                    className="flex items-center space-x-2 text-purple-300 hover:text-pink-400 mb-8 transition"
                >
                    <ChevronDown size={20} className="transform rotate-90" /> <span>Back to Tier Selection</span>
                </button>

                <h1 className="text-4xl font-bold mb-8 flex items-center space-x-3">
                    <ShoppingCart size={30} className="text-pink-400"/> <span>Purchase Configuration</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#2d0a4e]/60 backdrop-blur-sm rounded-xl border border-purple-700/30 shadow-2xl p-6 space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-purple-800/50 pb-3">Dataset Details</h2>
                        <div className="space-y-3 text-purple-200">
                            <p className="text-xl font-bold text-pink-400">{name}</p>
                            <p><span className="font-semibold">Provider:</span> {provider}</p>
                            <p><span className="font-semibold">Base Price:</span> {basePrice}</p>
                            <p><span className="font-semibold">Size:</span> {size}</p>
                        </div>
                    </div>

                    <div className={`bg-[#2d0a4e]/60 backdrop-blur-sm rounded-xl border border-pink-500/50 shadow-2xl p-6 space-y-4`}>
                        <h2 className="text-2xl font-bold text-white border-b border-purple-800/50 pb-3">License Tier: <span className={color}>{title}</span></h2>
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white">Tier Features:</h3>
                            <ul className="text-sm space-y-2 text-purple-200">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-center space-x-3">
                                        <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t border-purple-700/50 pt-3 mt-4">
                                <p className="text-lg font-semibold text-purple-300">Monthly Tier Cost:</p>
                                <p className="text-3xl font-extrabold text-white">{tierPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-purple-900/50 p-6 rounded-xl border border-pink-700/50 flex justify-between items-center">
                    <div>
                        <p className="text-lg font-semibold text-purple-300">Total License Cost (Annual):</p>
                        <p className="text-5xl font-extrabold text-green-400">${finalLicenseCost.toLocaleString()}</p>
                        <p className="text-sm text-purple-400 mt-1">Includes dataset cost and {tier} tier features.</p>
                    </div>
                    <button
                        onClick={() => handleNavigate('Consent', { dataset: dataset, licenseTier: licenseTier })}
                        className="px-8 py-4 bg-pink-600 hover:bg-pink-700 rounded-lg font-bold text-white transition transform hover:scale-105 shadow-xl shadow-pink-900/50 flex items-center space-x-2"
                    >
                        <CheckCircle size={24} /> <span>Review Consent & Pay</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

// FULLY DEFINED BUYER DASHBOARD PAGE
const BuyerDashboardPage = ({ handleNavigate }) => {
    const userName = 'Data Scientist';
    const [activeTab, setActiveTab] = useState('Dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                            {Object.entries(buyerMetrics).map(([key, metric]) => (
                                <DashboardCard key={key} title={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={metric.value} trend={metric.trend} icon={metric.icon} color={metric.color} usagePercent={metric.usagePercent} />
                            ))}
                        </div>
                        <div className="bg-[#2d0a4e]/60 rounded-xl border border-purple-700/30 shadow-2xl p-6">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2"><BarChart size={24} /> <span>API Usage Over 7 Days</span></h2>
                            <LineChartMock />
                        </div>
                    </>
                );
            case 'My Datasets':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">My Licensed Datasets</h2>
                            <button
                                onClick={() => handleNavigate('DatasetGallery')}
                                className="px-5 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold text-white transition flex items-center space-x-2"
                            >
                                <ShoppingCart size={20} />
                                <span>Explore Marketplace</span>
                            </button>
                        </div>
                        <div className="bg-[#2d0a4e]/60 rounded-xl border border-purple-700/30 shadow-2xl p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead>
                                        <tr className="uppercase text-sm text-purple-400 border-b border-purple-700/50">
                                            <th className="p-4 font-semibold">Name</th>
                                            <th className="p-4 font-semibold">Size</th>
                                            <th className="p-4 font-semibold">Format</th>
                                            <th className="p-4 font-semibold">Status</th>
                                            <th className="p-4 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {buyerDatasets.map((dataset, i) => (<DatasetRow key={i} dataset={dataset} isPartner={false} />))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'License History':
                return <LicenseHistoryTable history={mockLicenseHistory} />;
            case 'API Management':
                return (
                    <div className="bg-[#2d0a4e]/60 rounded-xl border border-purple-700/30 shadow-2xl p-6">
                         <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2"><Key size={24} /> <span>API Keys</span></h2>
                         <p className="text-purple-300 mb-4">Manage your authentication keys for API access to your licensed data streams.</p>
                         <div className="space-y-4">
                             <ApiKeyItem apiKey={{name: 'Primary Key', key: 'atrl-4k5j-9w0y-2q1p', created: '2025-10-01', lastUsed: '2025-12-08'}} />
                             <ApiKeyItem apiKey={{name: 'Secondary Key (Staging)', key: 'atrl-stg-3r7x-8m2v', created: '2025-11-15', lastUsed: 'N/A'}} />
                         </div>
                         <button className="mt-6 p-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold text-white flex items-center space-x-2"><Plus size={20} /> <span>Generate New Key</span></button>
                    </div>
                );
            case 'Settings':
                return <SettingsContent userRole="Buyer" />;
            default:
                return <div className="p-6 text-xl text-purple-300 bg-[#2d0a4e]/60 rounded-xl border border-purple-700/30">Select a navigation item.</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white overflow-hidden">
            <div className="w-64 flex-shrink-0 bg-[#1a0033]/80 border-r border-purple-800/50 p-6 flex flex-col">
                <div className="flex items-center space-x-2 mb-10">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Database size={20} />
                    </div>
                    <span className="text-xl font-bold">Auratral</span>
                </div>
                <nav className="space-y-3 flex-grow">
                    <SidebarNavLink icon={<LayoutDashboard size={20} />} text="Dashboard" isActive={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
                    <SidebarNavLink icon={<Archive size={20} />} text="My Datasets" isActive={activeTab === 'My Datasets'} badge={buyerMetrics.totalDatasets.value} onClick={() => setActiveTab('My Datasets')} />
                    <SidebarNavLink icon={<ShoppingCart size={20} />} text="License History" isActive={activeTab === 'License History'} onClick={() => setActiveTab('License History')} />
                    <SidebarNavLink icon={<Key size={20} />} text="API Management" isActive={activeTab === 'API Management'} onClick={() => setActiveTab('API Management')} />
                    <SidebarNavLink icon={<Settings size={20} />} text="Settings" isActive={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
                </nav>
                <div className="mt-8 pt-4 border-t border-purple-800/50">
                    <SidebarNavLink icon={<LogOut size={20} />} text="Logout" isActive={false} onClick={() => handleNavigate('Home')} />
                </div>
            </div>

            <div className="flex-grow p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold">Welcome back, {userName}!</h1>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-full transition" title="Notifications">
                            <Bell size={24} />
                        </button>
                        <div className="flex items-center space-x-2 bg-[#2d0a4e]/60 p-2 pr-4 rounded-full border border-purple-700/30">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold text-sm"> DS </div>
                            <span className="text-sm text-white">{userName}</span>
                            <ChevronDown size={16} className="text-purple-400" />
                        </div>
                    </div>
                </header>
                {renderContent()}
            </div>
        </div>
    );
};
// FULLY DEFINED PARTNER DASHBOARD PAGE
const PartnerRevenueAnalytics = () => (
    <div className="bg-[#2d0a4e]/60 rounded-xl border border-purple-700/30 shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2"><DollarSign size={24} /> <span>Monthly Revenue Overview</span></h2>
        <BarChartMock />
    </div>
);

const PartnerDashboardPage = ({ handleNavigate }) => {
    const userName = "Health Provider";
    const [activeTab, setActiveTab] = useState('Dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                            {Object.entries(partnerMetrics).map(([key, metric]) => (
                                <DashboardCard key={key} title={key.replace(/([A-Z])/g, ' $1').toUpperCase()} value={metric.value} trend={metric.trend} icon={metric.icon} color={metric.color} usagePercent={metric.usagePercent} />
                            ))}
                        </div>
                        <PartnerRevenueAnalytics />
                    </>
                );
            case 'Published Data':
                return (
                    <div className="bg-[#2d0a4e]/60 rounded-xl border border-purple-700/30 shadow-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center space-x-2"><Layers size={24} /> <span>My Published Datasets</span></h2>
                            <button type="button" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold text-white flex items-center space-x-2"><Plus size={20} /> <span>Upload New Data</span></button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead>
                                    <tr className="uppercase text-sm text-purple-400 border-b border-purple-700/50">
                                        <th className="p-4 font-semibold">Dataset Name</th>
                                        <th className="p-4 font-semibold">Category</th>
                                        <th className="p-4 font-semibold">Date Uploaded</th>
                                        <th className="p-4 font-semibold">Downloads</th>
                                        <th className="p-4 font-semibold">Revenue</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {partnerDatasets.map((dataset, i) => (<DatasetRow key={i} dataset={dataset} isPartner={true} />))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'Revenue':
                return <RevenueTransactionTable transactions={mockRevenueTransactions} />; // Replaced Placeholder
            case 'Settings':
                return <SettingsContent userRole="Partner" />; // Replaced Placeholder
            default:
                return <div className="p-6 text-xl text-purple-300 bg-[#2d0a4e]/60 rounded-xl border border-purple-700/30">Select a navigation item.</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white overflow-hidden">
            <div className="w-64 flex-shrink-0 bg-[#1a0033]/80 border-r border-purple-800/50 p-6 flex flex-col">
                <div className="flex items-center space-x-2 mb-10">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Database size={20} />
                    </div>
                    <span className="text-xl font-bold">Auratral</span>
                </div>
                <nav className="space-y-3 flex-grow">
                    <SidebarNavLink icon={<LayoutDashboard size={20} />} text="Dashboard" isActive={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
                    <SidebarNavLink icon={<Archive size={20} />} text="Published Data" isActive={activeTab === 'Published Data'} badge={partnerMetrics.totalDatasets.value} onClick={() => setActiveTab('Published Data')} />
                    <SidebarNavLink icon={<DollarSign size={20} />} text="Revenue" isActive={activeTab === 'Revenue'} onClick={() => setActiveTab('Revenue')} />
                    <SidebarNavLink icon={<Settings size={20} />} text="Settings" isActive={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
                </nav>
                <div className="mt-8 pt-4 border-t border-purple-800/50">
                    <SidebarNavLink icon={<LogOut size={20} />} text="Logout" isActive={false} onClick={() => handleNavigate('Home')} />
                </div>
            </div>

            <div className="flex-grow p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold">Welcome back, {userName}!</h1>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-pink-300 hover:text-white hover:bg-pink-800/50 rounded-full transition" title="Notifications">
                            <Bell size={24} />
                        </button>
                        <div className="flex items-center space-x-2 bg-[#2d0a4e]/60 p-2 pr-4 rounded-full border border-pink-700/30">
                            <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center font-bold text-sm"> HP </div>
                            <span className="text-sm text-white">{userName}</span>
                            <ChevronDown size={16} className="text-pink-400" />
                        </div>
                    </div>
                </header>
                {renderContent()}
            </div>
        </div>
    );
};


// --- V. MAIN APP COMPONENT ---

const App = () => {
    const [currentPage, setCurrentPage] = useState('Home');
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [customDatasetModalOpen, setCustomDatasetModalOpen] = useState(false);
    const [consentModalOpen, setConsentModalOpen] = useState(false);

    const [datasetToView, setDatasetToView] = useState(null);
    const [licenseTier, setLicenseTier] = useState(null);

    const handleNavigate = (page, data = null) => {
        if (page === 'DatasetDetail') {
            setDatasetToView(data);
            setCurrentPage('DatasetDetail');
        } else if (page === 'PurchaseConfiguration') {
            setDatasetToView(data.dataset);
            setLicenseTier(data.licenseTier);
            setCurrentPage('PurchaseConfiguration');
        } else if (page === 'Consent') {
            setDatasetToView(data.dataset);
            setLicenseTier(data.licenseTier);
            setConsentModalOpen(true);
        } else {
            setCurrentPage(page);
            setDatasetToView(null);
            setLicenseTier(null);
        }
    };

    const handleSelectRole = (role) => {
        setLoginModalOpen(false);
        handleNavigate(role);
    };

    const handleAcceptConsent = () => {
        setConsentModalOpen(false);
        handleNavigate('PaymentPage');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'DatasetGallery':
                return <DatasetGalleryPage handleNavigate={handleNavigate} />;
            case 'DatasetDetail':
                return <DatasetDetailPage handleNavigate={handleNavigate} dataset={datasetToView} />;
            case 'PurchaseConfiguration':
                return <PurchaseConfigurationPage handleNavigate={handleNavigate} dataset={datasetToView} licenseTier={licenseTier} />;
            case 'BuyerDashboard':
                return <BuyerDashboardPage handleNavigate={handleNavigate} />;
            case 'PartnerDashboard':
                return <PartnerDashboardPage handleNavigate={handleNavigate} />;
            case 'PaymentPage':
                const finalLicenseCost = licenseTier ? datasetToView.licensePrice + (licenseTier.tier === 'Silver' ? 500 : licenseTier.tier === 'Gold' ? 1000 : 0) : 'N/A';
                return (
                    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#1a0033] via-[#2d0a4e] to-[#4a1575] text-white">
                        <div className="text-center bg-[#2d0a4e]/60 p-10 rounded-xl border border-purple-700/30 shadow-2xl">
                            <h1 className="text-5xl font-bold text-pink-400 mb-4">Payment Successful!</h1>
                            <p className="text-xl text-purple-300 mb-6">License for **{datasetToView?.name || 'Dataset'}** (${finalLicenseCost.toLocaleString()}) purchased successfully. You can now access your data from the dashboard.</p>
                            <button
                                onClick={() => handleNavigate('BuyerDashboard')}
                                className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-white transition flex items-center justify-center space-x-2"
                            >
                                <LayoutDashboard size={20} /> <span>Go to Dashboard</span>
                            </button>
                        </div>
                    </div>
                );
            case 'Home':
            default:
                return (
                    <HomePage
                        handleNavigate={handleNavigate}
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
            />
            <BuyerConsentModal
                isOpen={consentModalOpen}
                onClose={() => setConsentModalOpen(false)}
                onAccept={handleAcceptConsent}
                dataset={datasetToView}
                licenseTier={licenseTier}
            />
            <CustomDatasetModal
                isOpen={customDatasetModalOpen}
                onClose={() => setCustomDatasetModalOpen(false)}
            />
        </div>
    );
};

export default App;