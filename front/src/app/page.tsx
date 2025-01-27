'use client';

import { useState } from 'react';
import { Search, GraduationCap, BookOpen, Award } from 'lucide-react';
import { ConnectButton } from '../components/ConnectButton';
import { useAccount } from 'wagmi';

const categories = [
  { id: 'all', name: 'All Certificates', icon: Award },
  { id: 'it', name: 'IT & Software', icon: BookOpen },
  { id: 'business', name: 'Business', icon: GraduationCap },
];

export default function Home() {
  const { isConnected } = useAccount();
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Invest in your education
          </h1>
          <p className="text-gray-600">
            Secure and verifiable academic certificates on the blockchain
          </p>
        </div>
        <ConnectButton />
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-4 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center px-4 py-2 rounded-full
                ${selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-600 hover:bg-gray-50'}
                transition-colors duration-200
              `}
            >
              <Icon className="w-4 h-4 mr-2" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search certificates..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {!isConnected ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <GraduationCap className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Connect your wallet to get started
          </h2>
          <p className="text-gray-600 mb-4">
            Access your certificates and manage your academic credentials securely on the blockchain
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Les certificats seront affichés ici */}
        </div>
      )}
    </div>
  );
}
