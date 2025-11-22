import React, { useState } from 'react';
import {
  Archive, Database, TrendingUp, DollarSign, Download, Clock, Zap, 
  BookOpen, FileText, AlertTriangle, Shield, LayoutDashboard, Search, 
  Settings, LogOut, CreditCard, Lock, User, Key, ChevronDown, 
  RefreshCw, CheckCircle, ExternalLink, Upload, X, ShoppingCart, 
  BarChart, Code, Users, Plus, Activity, Server, Eye, Bell, Menu,
  Home, Layers, Filter, Edit, Trash2, MoreVertical, Package
} from 'lucide-react';

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

const partnerActivity = [
  { description: 'Customer Behavior Q1 2025', details: 'Dataset downloaded', time: '2 hours ago', icon: <Download className="w-4 h-4" />, status: 'success' },
  { description: 'Updated authentication tokens', details: 'Security enhancement completed', time: '5 hours ago', icon: <Key className="w-4 h-4" />, status: 'info' },
  { description: 'Sarah Johnson (Added)', details: 'New team member with Developer role', time: '1 day ago', icon: <Users className="w-4 h-4" />, status: 'success' },
  { description: 'March 2025 Analytics', details: 'Monthly performance report generated', time: '2 days ago', icon: <BarChart className="w-4 h-4" />, status: 'info' },
];

const teamMembers = [
  { name: 'John Smith', role: 'Admin', access: 'Full Access', avatar: 'JS', status: 'online' },
  { name: 'Sarah Chen', role: 'Developer', access: 'API & Datasets', avatar: 'SC', status: 'online' },
  { name: 'Amit Patel', role: 'Developer', access: 'API Only', avatar: 'AP', status: 'offline' },
  { name: 'Priya Kumar', role: 'Analyst', access: 'Read Only', avatar: 'PK', status: 'offline' },
];

const galleryDatasets = [
  { 
    id: 1, 
    title: 'Cardiovascular Health Record', 
    records: '1.2M', 
    price: '$1,950',
    size: '2.3 GB',
    format: ['CSV', 'JSON'], 
    category: 'Cardiology',
    badges: ['New', 'API'],
    description: 'Clinical data including ECG readings, patient history, and diagnostic data.',
    rating: 4.8,
    buyers: 234
  },
  { 
    id: 2, 
    title: 'Neurological MRI Imaging', 
    records: '300K', 
    price: '$2,500',
    size: '1.9 GB',
    format: ['DICOM', 'NIFTI'], 
    category: 'Neurology',
    badges: ['Popular'],
    description: 'High-resolution brain scans paired with neurological assessments.',
    rating: 4.9,
    buyers: 189
  },
  { 
    id: 3, 
    title: 'Longitudinal Diabetes Monitoring', 
    records: '850K', 
    price: '$1,600',
    size: '4.1 GB',
    format: ['CSV', 'Excel'], 
    category: 'Endocrinology',
    badges: ['Updated'],
    description: 'Multi-year tracking of blood glucose levels, health outcomes.',
    rating: 4.7,
    buyers: 156
  },
  { 
    id: 4, 
    title: 'Oncology Pathology Imaging', 
    records: '425K', 
    price: '$3,200',
    size: '950 MB',
    format: ['DICOM'], 
    category: 'Oncology',
    badges: ['Premium', 'API'],
    description: 'Digitized histopathology slides images with detailed cancer analysis.',
    rating: 4.9,
    buyers: 98
  },
  { 
    id: 5, 
    title: 'Pulmonary Function and Imaging', 
    records: '560K', 
    price: '$1,800',
    size: '3.5 GB',
    format: ['DICOM', 'CSV'], 
    category: 'Pulmonology',
    badges: ['New'],
    description: 'Routine samples of lung scans paired with respiratory conditions.',
    rating: 4.6,
    buyers: 134
  },
];

const categories = ['All', 'Cardiology', 'Neurology', 'Oncology', 'Endocrinology', 'Pulmonology', 'Dermatology'];

// --- FAQ ITEM COMPONENT ---
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#2d0a4e]/60 backdrop-blur-sm rounded-2xl border border-purple-700/30 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-purple-800/20 transition"
      >
        <h3 className="text-lg font-semibold text-white pr-8">{question}</h3>
        <ChevronDown 
          size={24} 
          className={`text-purple-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
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
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-gradient-to-br from-[#2d0a4e] to-[#1a0033] rounded-2xl shadow-2xl max-w-md w-full border border-purple-700/30 animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-purple-800/50"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

// --- LOGIN MODAL ---
const LoginModal = ({ isOpen, onClose, onSelectRole }) => {
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
          <button
            onClick={() => onSelectRole('buyer')}
            className="w-full p-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl transition-all transform hover:scale-105 border border-purple-500/30 group"
          >
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

          <button
            onClick={() => onSelectRole('partner')}
            className="w-full p-6 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 rounded-xl transition-all transform hover:scale-105 border border-pink-500/30 group"
          >
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
          <p className="text-sm text-purple-400">
            Don't have an account?{' '}
            <button className="text-purple-300 hover:text-white font-semibold transition">
              Sign up
            </button>
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
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
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
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
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
const HomePage = ({ setCurrentPage, setLoginModalOpen }) => {
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
            <a href="#home" className="text-purple-300 hover:text-white transition font-medium cursor-pointer">Home</a>
            <a href="#services" className="text-purple-300 hover:text-white transition font-medium cursor-pointer">Services</a>
            <a href="#features" className="text-purple-300 hover:text-white transition font-medium cursor-pointer">Features</a>
            <a href="#faq" className="text-purple-300 hover:text-white transition font-medium cursor-pointer">FAQ</a>
            <button 
              onClick={() => setCurrentPage('DatasetGallery')}
              className="text-purple-300 hover:text-white transition font-medium"
            >
              Explore Datasets
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setLoginModalOpen(true)}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition shadow-lg shadow-purple-600/30"
            >
              Login
            </button>
            <button 
              onClick={() => setLoginModalOpen(true)}
              className="px-6 py-2.5 border border-purple-600 hover:bg-purple-600/20 rounded-xl font-semibold transition"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
          Empowering Research
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            with Premium Data Solutions
          </span>
        </h1>
        <p className="text-xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          Access high-quality, clinical, and research-grade datasets from India. 
          Provider samples and receive customized data solutions tailored to your specific research needs.
        </p>
        <div className="flex justify-center space-x-4 mb-20">
          <button 
            onClick={() => setCurrentPage('DatasetGallery')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition shadow-xl shadow-purple-600/40 transform hover:scale-105 flex items-center space-x-2"
          >
            <Search size={20} />
            <span>Explore Datasets</span>
          </button>
          <button 
            onClick={() => setLoginModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl font-semibold text-lg hover:from-pink-700 hover:to-pink-800 transition shadow-xl shadow-pink-600/40 transform hover:scale-105 flex items-center space-x-2"
          >
            <Upload size={20} />
            <span>Request Custom Dataset</span>
          </button>
        </div>

        {/* Dashboard Mockup */}
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
                      <button key={period} className="px-2 py-1 text-xs bg-purple-800/30 text-purple-400 rounded">
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
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
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
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-purple-300 max-w-2xl mx-auto">
            Comprehensive data solutions to boost research, unlock insights, and drive high-impact outcomes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Database size={48} />,
              title: 'Premium Dataset Marketplace',
              description: 'Access a vast collection of high-quality, curated datasets for your research needs.',
            },
            {
              icon: <Code size={48} />,
              title: 'API Integration Solutions',
              description: 'Seamlessly integrate our data into your platform with robust API support.',
            },
            {
              icon: <BarChart size={48} />,
              title: 'Data Analytics Tools',
              description: 'Powerful analytics tools to derive insights from your datasets.',
            },
          ].map((service, i) => (
            <div key={i} className="bg-[#2d0a4e]/60 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/30 hover:border-purple-600/50 transition-all shadow-lg hover:shadow-purple-500/30 group">
              <div className="w-16 h-16 bg-purple-800/30 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-700/40 group-hover:scale-110 transition-all">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-purple-300 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-b from-transparent via-[#2d0a4e]/30 to-transparent">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Features
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: <Database size={40} />,
              title: 'Healthcare Data Accessibility',
              description: 'Centralized platform for acquiring de-identified and anonymized healthcare datasets from across India, tailored to meet the needs of students, researchers, scholars, and businesses.',
              label: 'Data Accessibility'
            },
            {
              icon: <User size={40} />,
              title: 'Personalized Research Data',
              description: 'Users can request personalized datasets to meet specific research objectives, ensuring that the data aligns with unique project requirements.',
              label: 'Customization'
            },
            {
              icon: <Shield size={40} />,
              title: 'Ethical and Regulatory Compliance',
              description: 'In accordance with ethical guidelines for data acquisition and usage, including non-disclosure agreements and compliance with Indian Council for Medical Research (ICMR) standards.',
              label: 'Compliance'
            },
            {
              icon: <Lock size={40} />,
              title: 'Robust Data Security & Privacy',
              description: 'With cutting-edge encryption and adherence to the latest cybersecurity protocols ensuring the highest standards of data protection, complying with India\'s National Data Guidelines.',
              label: 'Data Security'
            },
            {
              icon: <Zap size={40} />,
              title: 'AI-Ready Dataset for Innovation',
              description: 'The platform\'s datasets are optimized for AI research, helping businesses and scholars innovate and make informed decisions, especially in alignment with initiatives like "Make AI for India" and "Digital India".',
              label: 'AI & Innovation'
            },
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
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Popular Questions
          </h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            {
              question: 'What is Auratral & what services do you offer?',
              answer: 'Auratral is a pioneering platform that provides access to de-identified and anonymized research datasets from India, primarily focusing on the healthcare sector. Our platform serves researchers, students, businesses, and organizations by offering high-quality, localized datasets for research, analysis, and innovation purposes. Users can either purchase available datasets or request custom datasets tailored to their specific needs.'
            },
            {
              question: 'How does Auratral ensure data privacy & compliance?',
              answer: 'Auratral adheres to strict data privacy regulations, including the National Ethical Guidelines for Biomedical and Health Research involving human participants. We ensure all datasets are de-identified and anonymized, and we use encryption and blockchain technologies to maintain data security. Additionally, clients must complete copyright and Non-Disclosure Agreements (NDAs) before accessing datasets to ensure compliance with ethical standards.'
            },
            {
              question: 'What kinds of datasets are available on the platform?',
              answer: 'Auratral offers a wide range of healthcare-related datasets, including de-identified and anonymized medical records, patient histories, and treatment outcomes. These datasets span various medical conditions and demographics, supporting research in areas like public health, clinical studies, and AI-based healthcare solutions. Clients can also request customized datasets to meet specific research goals.'
            },
            {
              question: 'Who can use Auratrals services?',
              answer: 'Auratral\'s services are available to a wide audience, including students, researchers, healthcare startups, companies, and universities. Whether you are a student looking for datasets to support academic research, a researcher conducting groundbreaking studies, or a company seeking data for market analysis, Auratral can provide the datasets you need.'
            },
            {
              question: 'How can I access datasets through Auratral?',
              answer: 'To access datasets, users need to fill out an online form specifying their data requirements and submit the necessary copyright and NDA forms. Once approved, the datasets can be purchased or accessed through a subscription plan, depending on the user\'s needs. We offer flexible pricing based on the type, volume, and sensitivity of the datasets.'
            },
            {
              question: 'Can I request a custom dataset for my research?',
              answer: 'Yes, Auratral offers the option to request personalized datasets tailored to your specific research needs. You can submit a request detailing the type of data, research objectives, and any specific requirements through our platform. We will work with our data acquisition team to source and provide a custom dataset that aligns with your research goals, ensuring both data privacy and compliance with ethical guidelines.'
            },
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-700/30 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Database size={24} />
              </div>
              <span className="text-2xl font-bold">Auratral</span>
            </div>
            <p className="text-purple-400 text-sm">© 2025 Auratral. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- BUYER DASHBOARD ---
const BuyerDashboard = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0033] to-[#2d0a4e] text-white">
      {/* Top Navigation */}
      <header className="bg-[#1a0033]/80 backdrop-blur-xl border-b border-purple-700/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Database size={24} />
              </div>
              <span className="text-2xl font-bold">Auratral</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              {[
                { name: 'Dashboard', value: 'dashboard' },
                { name: 'My Datasets', value: 'datasets' },
                { name: 'Transactions', value: 'transactions' },
                { name: 'Documents', value: 'documents' },
                { name: 'Support', value: 'support' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === item.value
                      ? 'bg-purple-600 text-white'
                      : 'text-purple-300 hover:text-white hover:bg-purple-800/30'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-purple-800/30 rounded-lg transition relative">
              <Bell size={20} className="text-purple-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 px-4 py-2 bg-purple-800/30 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-sm">
                JA
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">John Anderson</p>
                <p className="text-xs text-purple-400">Buyer</p>
              </div>
            </div>
            <button 
              onClick={() => setCurrentPage('Home')}
              className="p-2 hover:bg-red-900/30 rounded-lg transition text-red-400 hover:text-red-300"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-purple-300">Here's an overview of your data assets and activities.</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(buyerMetrics).map(([key, metric]) => (
            <DashboardCard 
              key={key}
              title={key.replace(/([A-Z])/g, ' $1').trim()}
              {...metric}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Datasets */}
          <div className="lg:col-span-2 bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-2xl border border-purple-700/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Package className="w-5 h-5 mr-2 text-purple-400" /> Recent Datasets
              </h2>
              <button 
                onClick={() => setCurrentPage('DatasetGallery')}
                className="text-sm text-purple-400 hover:text-purple-300 transition flex items-center space-x-1"
              >
                <span>View All</span>
                <ChevronDown className="transform -rotate-90" size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {buyerDatasets.map((dataset, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-purple-900/20 rounded-xl border border-purple-700/20 hover:border-purple-600/40 transition">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-800/50 rounded-lg flex items-center justify-center">
                      <Database size={24} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{dataset.name}</p>
                      <p className="text-sm text-purple-400">{dataset.size} • {dataset.format}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      dataset.status === 'Active' 
                        ? 'bg-green-600/30 text-green-400' 
                        : 'bg-red-600/30 text-red-400'
                    }`}>
                      {dataset.status}
                    </span>
                    <button className="p-2 hover:bg-purple-700/50 rounded-lg transition">
                      <MoreVertical size={18} className="text-purple-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-2xl border border-purple-700/30">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-400" /> Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Dataset Download', desc: 'Downloaded "CardioCare-3000"', time: '2 hours ago', icon: <Download size={16} /> },
                { title: 'API Key Generated', desc: 'New API key created for production use', time: '1 day ago', icon: <Key size={16} /> },
                { title: 'Payment Processed', desc: 'Monthly subscription renewed', time: '2 days ago', icon: <DollarSign size={16} /> },
              ].map((activity, i) => (
                <div key={i} className="flex space-x-3">
                  <div className="w-10 h-10 bg-purple-800/30 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-400">
                    {activity.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-semibold text-white">{activity.title}</p>
                    <p className="text-xs text-purple-400">{activity.desc}</p>
                    <p className="text-xs text-purple-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-2xl border border-purple-700/30">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-purple-400" /> Recent Transactions
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-700/30 text-left">
                    <th className="pb-3 text-xs font-medium text-purple-400 uppercase">Date</th>
                    <th className="pb-3 text-xs font-medium text-purple-400 uppercase">Description</th>
                    <th className="pb-3 text-xs font-medium text-purple-400 uppercase">Amount</th>
                    <th className="pb-3 text-xs font-medium text-purple-400 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: 'Apr 28, 2025', desc: 'CardioVitals', amount: '$4200.00', status: 'Completed' },
                    { date: 'Apr 25, 2025', desc: 'API Access - Premium', amount: '$149.00', status: 'Completed' },
                    { date: 'Apr 20, 2025', desc: 'MentalWellness', amount: '$479.00', status: 'Completed' },
                  ].map((tx, i) => (
                    <tr key={i} className="border-b border-purple-800/20 hover:bg-purple-900/20 transition">
                      <td className="py-4 text-sm text-purple-300">{tx.date}</td>
                      <td className="py-4 text-sm text-white font-medium">{tx.desc}</td>
                      <td className="py-4 text-sm text-green-400 font-semibold">{tx.amount}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-600/30 text-green-400">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Documents */}
          <div className="bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-2xl border border-purple-700/30">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-400" /> Important Documents
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Data License Agreement', size: 'PDF - 2.4 MB', icon: <FileText size={16} /> },
                { name: 'API Documentation', size: 'DOC - 1.8 MB', icon: <BookOpen size={16} /> },
                { name: 'Usage Reports Q1 2025', size: 'XLSX - 3.2 MB', icon: <TrendingUp size={16} /> },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg border border-purple-700/20 hover:border-purple-600/40 transition cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-800/30 rounded-lg flex items-center justify-center text-purple-400">
                      {doc.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{doc.name}</p>
                      <p className="text-xs text-purple-400">{doc.size}</p>
                    </div>
                  </div>
                  <Download size={16} className="text-purple-500 group-hover:text-purple-300 transition" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PARTNER DASHBOARD ---
const PartnerDashboard = ({ setCurrentPage }) => {
  const [activeNav, setActiveNav] = useState('Dashboard');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#1a0033] to-[#2d0a4e] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a0033]/80 backdrop-blur-xl border-r border-purple-700/30 p-6 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Database size={24} />
            </div>
            <span className="text-2xl font-bold">Auratral</span>
          </div>
          <p className="text-xs text-purple-400 ml-12">Provider Portal</p>
        </div>
        
        <nav className="space-y-2 flex-grow">
          {[
            { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
            { name: 'Datasets', icon: <Database size={20} />, badge: '156' },
            { name: 'API Management', icon: <Code size={20} /> },
            { name: 'Team Access', icon: <Users size={20} /> },
            { name: 'Revenue', icon: <DollarSign size={20} /> },
            { name: 'Settings', icon: <Settings size={20} /> },
          ].map((item) => (
            <SidebarNavLink
              key={item.name}
              icon={item.icon}
              text={item.name}
              isActive={activeNav === item.name}
              onClick={() => setActiveNav(item.name)}
              badge={item.badge}
            />
          ))}
        </nav>

        <button 
          onClick={() => setCurrentPage('Home')}
          className="mt-6 flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-300 hover:bg-red-900/20 hover:text-red-200 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-[#1a0033]/80 backdrop-blur-xl border-b border-purple-700/30 px-8 py-4 flex justify-between items-center sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Data Provider</h1>
            <p className="text-sm text-purple-400">Manage your datasets and track performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-purple-800/30 rounded-lg transition relative">
              <Bell size={20} className="text-purple-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 px-4 py-2 bg-purple-800/30 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold">
                JS
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">John Smith</p>
                <p className="text-xs text-purple-400">Provider</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(partnerMetrics).map(([key, metric]) => (
              <DashboardCard 
                key={key}
                title={key.replace(/([A-Z])/g, ' $1').trim()}
                {...metric}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-2xl border border-purple-700/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-purple-400" /> Recent Activity
                </h2>
                <button className="text-sm text-purple-400 hover:text-purple-300 transition">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {partnerActivity.map((activity, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 bg-purple-900/20 rounded-xl border border-purple-700/20 hover:border-purple-600/40 transition">
                    <div className="w-12 h-12 bg-purple-800/30 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-400">
                      {activity.icon}
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-white">{activity.description}</p>
                      <p className="text-sm text-purple-400 mt-1">{activity.details}</p>
                      <p className="text-xs text-purple-500 mt-2 flex items-center">
                        <Clock size={12} className="mr-1" /> {activity.time}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      activity.status === 'success' 
                        ? 'bg-green-600/30 text-green-400' 
                        : 'bg-blue-600/30 text-blue-400'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Access */}
            <div className="bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-2xl border border-purple-700/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-400" /> Team Members
                </h2>
                <button className="p-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition">
                  <Plus size={18} />
                </button>
              </div>
              <div className="space-y-3">
                {teamMembers.map((member, i) => (
                  <div key={i} className="p-3 bg-purple-900/20 rounded-lg border border-purple-700/20 hover:border-purple-600/40 transition">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-sm">
                          {member.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#2d0a4e] ${
                          member.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-white text-sm">{member.name}</p>
                        <p className="text-xs text-purple-400">{member.role}</p>
                      </div>
                      <button className="p-1 hover:bg-purple-700/50 rounded transition">
                        <MoreVertical size={16} className="text-purple-400" />
                      </button>
                    </div>
                    <p className="text-xs text-purple-500 ml-13">{member.access}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full px-4 py-3 bg-purple-700 hover:bg-purple-600 rounded-xl font-semibold transition flex items-center justify-center space-x-2">
                <Plus size={18} />
                <span>Add Team Member</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- DATASET GALLERY ---
const DatasetGallery = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDatasets = galleryDatasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dataset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0033] to-[#2d0a4e] text-white">
      {/* Header */}
      <header className="bg-[#1a0033]/80 backdrop-blur-xl border-b border-purple-700/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('Home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Database size={24} />
              </div>
              <span className="text-2xl font-bold">Auratral</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={() => setCurrentPage('Home')} className="text-purple-300 hover:text-white transition">Home</button>
              <button className="text-white font-semibold">Services</button>
              <button className="text-purple-300 hover:text-white transition">Features</button>
              <button className="text-purple-300 hover:text-white transition">FAQ</button>
              <button className="text-purple-300 hover:text-white transition">Contact</button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-purple-800/30 rounded-lg transition relative">
              <Bell size={20} className="text-purple-300" />
            </button>
            <div className="flex items-center space-x-3 px-4 py-2 bg-purple-800/30 rounded-xl cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-sm">
                JA
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold">Jane Anderson</p>
                <p className="text-xs text-purple-400">jane@co.in</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">Explore Datasets</h1>
          <p className="text-xl text-purple-300 max-w-3xl">
            Browse our curated collection of high-quality, research-grade datasets organized by domain. Preview samples and receive customized data solutions tailored to your specific research needs.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-2xl border border-purple-700/30">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
              <input
                type="text"
                placeholder="Search datasets, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-purple-900/30 border border-purple-700/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:border-purple-600 transition"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 rounded-xl font-semibold transition flex items-center justify-center space-x-2">
              <Plus size={20} />
              <span>Request Custom Dataset</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-xl font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dataset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => (
            <div key={dataset.id} className="bg-[#2d0a4e]/60 backdrop-blur-sm p-6 rounded-2xl border border-purple-700/30 hover:border-purple-600/50 transition-all shadow-lg hover:shadow-purple-500/20 flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-2">
                    {dataset.badges.map((badge, i) => (
                      <span key={i} className={`px-2 py-1 text-xs font-bold rounded-full ${
                        badge === 'New' ? 'bg-green-600/30 text-green-400' :
                        badge === 'Popular' ? 'bg-blue-600/30 text-blue-400' :
                        badge === 'Premium' ? 'bg-yellow-600/30 text-yellow-400' :
                        badge === 'API' ? 'bg-purple-600/30 text-purple-400' :
                        'bg-pink-600/30 text-pink-400'
                      }`}>
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{dataset.title}</h3>
                  <p className="text-sm text-purple-400">{dataset.category}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-purple-300 mb-4 flex-grow">{dataset.description}</p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-purple-400 mb-4 pb-4 border-b border-purple-700/30">
                <div className="flex items-center space-x-1">
                  <Database size={16} />
                  <span>{dataset.records} records</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Server size={16} />
                  <span>{dataset.size}</span>
                </div>
              </div>

              {/* Formats */}
              <div className="flex flex-wrap gap-2 mb-4">
                {dataset.format.map((fmt, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium bg-purple-800/30 text-purple-300 rounded-lg">
                    {fmt}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-purple-700/30">
                <div>
                  <p className="text-2xl font-bold text-white">{dataset.price}</p>
                  <p className="text-xs text-purple-400">{dataset.buyers} buyers</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg font-semibold transition text-sm">
                    Sample
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition text-sm">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm p-12 rounded-3xl border border-purple-700/30 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with New Datasets</h2>
          <p className="text-purple-300 mb-6 max-w-2xl mx-auto">
            Get notified when new datasets are added or when there are special offers.
          </p>
          <div className="flex max-w-md mx-auto space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-6 py-3 bg-purple-900/30 border border-purple-700/30 rounded-xl text-white placeholder-purple-400 focus:outline-none focus:border-purple-600 transition"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleRoleSelect = (role) => {
    setLoginModalOpen(false);
    if (role === 'buyer') {
      setCurrentPage('BuyerDashboard');
    } else {
      setCurrentPage('PartnerDashboard');
    }
  };

  const pages = {
    Home: <HomePage setCurrentPage={setCurrentPage} setLoginModalOpen={setLoginModalOpen} />,
    BuyerDashboard: <BuyerDashboard setCurrentPage={setCurrentPage} />,
    PartnerDashboard: <PartnerDashboard setCurrentPage={setCurrentPage} />,
    DatasetGallery: <DatasetGallery setCurrentPage={setCurrentPage} />,
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
      
      {pages[currentPage] || pages.Home}
      
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
        onSelectRole={handleRoleSelect}
      />
    </>
  );
}

export default App;