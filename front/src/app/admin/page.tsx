'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Shield, FileText, AlertTriangle, Check } from 'lucide-react';
import { IssueCertificateForm } from '../../components/forms/IssueCertificateForm';
import { RevokeCertificateForm } from '../../components/forms/RevokeCertificateForm';

export default function Admin() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('issue');
  
  if (!isConnected) {
    return (
      <div className="flex-1 p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <Shield className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Admin Access Required
          </h2>
          <p className="text-gray-600 mb-4">
            Please connect your wallet with admin privileges to access this section
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Certificate Management
        </h1>
        <p className="text-gray-600">
          Issue and manage academic certificates securely on the blockchain
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Certificates</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Actions</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <Check className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Certificates</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`pb-4 px-4 mr-4 text-sm font-medium border-b-2 ${
            activeTab === 'issue'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('issue')}
        >
          Issue Certificate
        </button>
        <button
          className={`pb-4 px-4 text-sm font-medium border-b-2 ${
            activeTab === 'revoke'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('revoke')}
        >
          Revoke Certificate
        </button>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl">
        {activeTab === 'issue' ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Fill in the details below to issue a new academic certificate.
              All certificates are minted as NFTs on the blockchain.
            </p>
            <IssueCertificateForm />
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6">
              Enter the certificate ID and reason to revoke an existing certificate.
              This action cannot be undone.
            </p>
            <RevokeCertificateForm />
          </>
        )}
      </div>
    </div>
  );
}
