// src/components/EmailSubscribe.jsx

import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const EmailSubscribe = () => {
  return (
    <div className="bg-purple-900/50 py-12 border-t border-purple-700 mt-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-3 flex items-center justify-center">
            <Mail className="w-6 h-6 mr-3 text-purple-400" />
            Stay Updated with New Datasets
        </h2>
        <p className="text-gray-300 mb-6">
          Be the first to know when new domain-specific datasets are available on the marketplace.
        </p>
        <form className="max-w-xl mx-auto flex gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow p-3 bg-purple-900 border border-purple-700 rounded-lg text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
            required
          />
          <button type="submit" className="px-5 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition flex items-center">
            Subscribe <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailSubscribe;