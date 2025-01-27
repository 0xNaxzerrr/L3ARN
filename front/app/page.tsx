'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <section className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Welcome to L3ARN</h1>
        <p className="text-xl text-gray-800 mb-8">
          Secure and verifiable academic certificates on the blockchain
        </p>
        <Button size="lg" className="animate-slide-up">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      {/* Featured Certificates Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
        {/* Cette section sera remplie avec les cartes de certificats */}
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-2">Secure Verification</h3>
          <p className="text-gray-600">
            Instantly verify the authenticity of any academic certificate on the blockchain
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-2">Easy Management</h3>
          <p className="text-gray-600">
            Issue and manage certificates with a simple and intuitive interface
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-2">Always Accessible</h3>
          <p className="text-gray-600">
            Access your certificates anytime, anywhere with blockchain technology
          </p>
        </div>
      </section>
    </main>
  );
}
