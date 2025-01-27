'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Certificate, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-full bg-gray-50">
      <section className="text-center py-12 px-4">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Welcome to L3ARN</h1>
        <p className="text-xl text-gray-600 mb-8">
          Secure and verifiable academic certificates on the blockchain
        </p>
        <Button 
          size="lg" 
          className="animate-slide-up bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      {/* Featured Certificates Section */}
      <section className="px-4 py-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Certificates will be added here dynamically */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose L3ARN?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <Shield className="w-8 h-8 mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Secure Verification</h3>
              <p className="text-gray-600">
                Instantly verify the authenticity of any academic certificate on the blockchain
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <Certificate className="w-8 h-8 mb-4 text-purple-600" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Easy Management</h3>
              <p className="text-gray-600">
                Issue and manage certificates with a simple and intuitive interface
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <Clock className="w-8 h-8 mb-4 text-indigo-600" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Always Accessible</h3>
              <p className="text-gray-600">
                Access your certificates anytime, anywhere with blockchain technology
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
