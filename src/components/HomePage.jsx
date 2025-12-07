import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Shield, 
  Layers, 
  ChevronDown, 
  Instagram, 
  Facebook, 
  Linkedin 
} from 'lucide-react';

const HomePage = ({ setCurrentPage }) => {
  const faqData = [
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
      question: 'Who can use Auratral’s services?',
      answer: 'Auratral’s services are available to a wide audience, including students, researchers, healthcare startups, companies, and universities. Whether you are a student looking for datasets to support academic research, a researcher conducting groundbreaking studies, or a company seeking data for market analysis, Auratral can provide the datasets you need.'
    },
    {
      question: 'How can I access datasets through Auratral?',
      answer: 'To access datasets, users need to fill out an online form specifying their data requirements and submit the necessary copyright and NDA forms. Once approved, the datasets can be purchased or accessed through a subscription plan, depending on the user\'s needs. We offer flexible pricing based on the type, volume, and sensitivity of the datasets.'
    },
    {
      question: 'Can I request a custom dataset for my research?',
      answer: 'Yes, Auratral offers the option to request personalized datasets tailored to your specific research needs. You can submit a request detailing the type of data, research objectives, and any specific requirements through our platform. We will work with our data acquisition team to source and provide a custom dataset that aligns with your research goals, ensuring both data privacy and compliance with ethical guidelines.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2e005f] to-[#4c1d95] text-white font-sans">
      {/* Header */}
      <header className="bg-[#240a3d] p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-400">Auratral</div>
          <nav className="space-x-6 text-purple-300">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="space-x-4">
            <button onClick={() => setCurrentPage('Login')} className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800">Login</button>
            <button onClick={() => setCurrentPage('Register')} className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">Register</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto p-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Empowering Research with Premium Data Solutions
        </h1>
        <p className="text-purple-200 mb-6">
          Access high-quality datasets that fuel insights and innovation. Whether you're buying or providing data, Auratral connects you with the resources you need.
        </p>
        <div className="space-x-4">
          <button onClick={() => setCurrentPage('Gallery')} className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700">Explore Datasets</button>
          <button className="px-6 py-3 bg-purple-700 rounded-lg hover:bg-purple-800">Become a Provider</button>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="max-w-7xl mx-auto p-6 text-center">
        <img
          src="https://via.placeholder.com/800x400.png?text=Dashboard+Preview"
          alt="Dashboard Preview"
          className="mx-auto rounded-lg shadow-lg"
        />
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div className="bg-[#2e005f] p-4 rounded-lg shadow-md">
          <p className="text-2xl font-bold">500+</p>
          <p className="text-purple-300">Premium Datasets</p>
        </div>
        <div className="bg-[#2e005f] p-4 rounded-lg shadow-md">
          <p className="text-2xl font-bold">120+</p>
          <p className="text-purple-300">Data Providers</p>
        </div>
        <div className="bg-[#2e005f] p-4 rounded-lg shadow-md">
          <p className="text-2xl font-bold">50M+</p>
          <p className="text-purple-300">Records Available</p>
        </div>
        <div className="bg-[#2e005f] p-4 rounded-lg shadow-md">
          <p className="text-2xl font-bold">98.9%</p>
          <p className="text-purple-300">Service Uptime</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="max-w-7xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <p className="text-purple-200 mb-6">
          Comprehensive data solutions to boost research, unlock insights, and drive high-impact outcomes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#2e005f] p-6 rounded-lg shadow-md">
            <LayoutDashboard className="mx-auto mb-4 text-purple-400" size={40} />
            <h3 className="text-xl font-semibold mb-2">Premium Dataset Marketplace</h3>
            <p className="text-purple-300">Access a vast collection of high-quality, curated datasets for your research needs.</p>
          </div>
          <div className="bg-[#2e005f] p-6 rounded-lg shadow-md">
            <LayoutDashboard className="mx-auto mb-4 text-purple-400" size={40} />
            <h3 className="text-xl font-semibold mb-2">API Integration Solutions</h3>
            <p className="text-purple-300">Seamlessly integrate our data into your platform with robust API support.</p>
          </div>
          <div className="bg-[#2e005f] p-6 rounded-lg shadow-md">
            <LayoutDashboard className="mx-auto mb-4 text-purple-400" size={40} />
            <h3 className="text-xl font-semibold mb-2">Data Analytics Tools</h3>
            <p className="text-purple-300">Powerful analytics tools to derive insights from your datasets.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto p-6 bg-gradient-to-b from-[#240a3d] to-[#2e005f] text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-purple-200">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-[#2e005f] p-6 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-shadow">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Healthcare Data Accessibility</h3>
            <p className="text-purple-300 leading-relaxed">
              Centralized platform for acquiring de-identified and anonymized healthcare datasets from across India, tailored to meet the needs of students, researchers, scholars, and businesses.
            </p>
          </div>

          <div className="bg-[#2e005f] p-6 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-shadow">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Personalized Research Data</h3>
            <p className="text-purple-300 leading-relaxed">
              Users can request personalized datasets to meet specific research objectives, ensuring that the data aligns with unique project requirements.
            </p>
          </div>

          <div className="bg-[#2e005f] p-6 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-shadow">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Ethical and Regulatory Compliance</h3>
            <p className="text-purple-300 leading-relaxed">
              In accordance with ethical guidelines for data acquisition and usage, including non-disclosure agreements and compliance with Indian Council for Medical Research (ICMR) standards.'
            </p>
          </div>

          <div className="bg-[#2e005f] p-6 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-shadow">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Robust Data Security & Privacy</h3>
            <p className="text-purple-300 leading-relaxed">
              With cutting-edge encryption and adherence to the latest cybersecurity protocols, ensuring the highest standards of data protection and complying with India's Digital Personal Data Protection Act (DPDP) and CERT-In guidelines.'
            </p>
          </div>

          <div className="bg-[#2e005f] p-6 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-shadow md:col-span-2">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">AI-Ready Dataset for Innovation</h3>
            <p className="text-purple-300 leading-relaxed">
              The platform's datasets are optimized for AI research, helping businesses and scholars innovate and make informed decisions, especially in alignment with initiatives like the IndiaAI Datasets Platform and Digital India.'
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-7xl mx-auto p-6 bg-gradient-to-b from-[#240a3d] to-[#2e005f]">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/4 flex-shrink-0">
            <h2 className="text-4xl font-extrabold text-purple-200 rotate-[-5deg] tracking-wide">Popular<br />Questions</h2>
          </div>
          <div className="lg:w-3/4">
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div key={index} className="bg-[#2e005f] rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-purple-700/50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-purple-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 pt-0 border-t border-purple-700">
                      <p className="text-purple-300 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Footer */}
      <footer className="max-w-7xl mx-auto p-6 text-center bg-[#240a3d]">
        <h3 className="text-xl font-semibold text-purple-200 mb-4">Connect with Us</h3>
        <div className="flex justify-center space-x-6">
          <a href="https://www.instagram.com/auratral/" target="_blank" rel="noopener noreferrer" className="p-3 bg-purple-700 rounded-lg hover:bg-purple-600 transition">
            <Instagram className="w-6 h-6 text-white" />
          </a>
          <a href="https://www.facebook.com/people/Auratral-India/pfbid02et6LJJn1HgPbr3PmR6Nv1vCtU9GvrwCjoreot5PbtaXjYv6W4pCrZjAmg2F2Udacl/" target="_blank" rel="noopener noreferrer" className="p-3 bg-purple-700 rounded-lg hover:bg-purple-600 transition">
            <Facebook className="w-6 h-6 text-white" />
          </a>
          <a href="https://www.linkedin.com/company/auratral/" target="_blank" rel="noopener noreferrer" className="p-3 bg-purple-700 rounded-lg hover:bg-purple-600 transition">
            <Linkedin className="w-6 h-6 text-white" />
          </a>
        </div>
        <p className="text-purple-400 mt-4 text-sm">Follow us for updates on healthcare datasets and research innovations.</p>
      </footer>
    </div>
  );
};

export default HomePage;