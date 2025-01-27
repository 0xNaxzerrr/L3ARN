'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Certificate, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Welcome to L3ARN</h1>
        <p className="text-lg text-gray-300 mb-8">
          Secure and verifiable academic certificates on the blockchain
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      {/* Featured Certificates Section */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Les cartes de certificats seront ajoutées ici dynamiquement */}
        </div>
      </section>

      {/* Features Section */}
      <section className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Why Choose L3ARN?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-700 hover:border-gray-600 transition-all duration-300">
            <Shield className="w-8 h-8 mb-4 text-blue-400" />
            <h3 className="text-lg font-semibold mb-2 text-white">Secure Verification</h3>
            <p className="text-gray-300">
              Instantly verify the authenticity of any academic certificate on the blockchain
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-700 hover:border-gray-600 transition-all duration-300">
            <Certificate className="w-8 h-8 mb-4 text-purple-400" />
            <h3 className="text-lg font-semibold mb-2 text-white">Easy Management</h3>
            <p className="text-gray-300">
              Issue and manage certificates with a simple and intuitive interface
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 border border-gray-700 hover:border-gray-600 transition-all duration-300">
            <Clock className="w-8 h-8 mb-4 text-green-400" />
            <h3 className="text-lg font-semibold mb-2 text-white">Always Accessible</h3>
            <p className="text-gray-300">
              Access your certificates anytime, anywhere with blockchain technology
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
