import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">L3ARN Platform</h1>
        <p className="text-xl text-gray-600">The Future of Academic Certification</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Decentralized Certificates</CardTitle>
            <CardDescription>Secure and immutable academic credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Store your academic achievements on the blockchain with unmatched security and transparency.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Easy Verification</CardTitle>
            <CardDescription>Instant certificate validation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Verify academic credentials instantly with our blockchain-based verification system.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>NFT Technology</CardTitle>
            <CardDescription>Unique digital certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Each certificate is a unique NFT, providing proof of authenticity and ownership.</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12">
        <Button size="lg" className="mr-4">Get Started</Button>
        <Button size="lg" variant="outline">Learn More</Button>
      </div>
    </div>
  );
};

export default Home;