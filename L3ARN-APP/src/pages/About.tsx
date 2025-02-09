import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About L3ARN</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            L3ARN is an innovative blockchain-based platform designed to revolutionize academic certification through decentralized, 
            verifiable, and immutable digital certificates. Built on Avalanche subnet technology, our platform provides a secure and 
            transparent solution for issuing, managing, and validating academic credentials.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Decentralized Academic Certificates</li>
              <li>Immutable and Verifiable Credentials</li>
              <li>Avalanche Subnet Integration</li>
              <li>NFT-Based Certificate Management</li>
              <li>Role-Based Access Control</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Avalanche Blockchain</li>
              <li>Smart Contracts</li>
              <li>NFT Technology</li>
              <li>React Frontend</li>
              <li>Web3 Integration</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;