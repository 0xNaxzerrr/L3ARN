import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MyCertificates = () => {
  // TODO: Implement wallet connection and NFT fetching using wagmi hooks
  const mockCertificates = [
    {
      id: '1',
      title: 'Blockchain Development',
      student: 'John Doe',
      date: '2024-02-09',
      grade: 'A+'
    },{
      id: '1',
      title: 'Blockchain Development',
      student: 'John Doe',
      date: '2024-02-09',
      grade: 'A+'
    },{
      id: '1',
      title: 'Blockchain Development',
      student: 'John Doe',
      date: '2024-02-09',
      grade: 'A+'
    },
    // Add more mock data as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">

    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">My certificates</h1>
      <p className="text-xl text-gray-600">Connect your wallet and see your NFT's Certificates</p>
    </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCertificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <CardTitle>{cert.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Certificate ID:</strong> {cert.id}</p>
                <p><strong>Student:</strong> {cert.student}</p>
                <p><strong>Issue Date:</strong> {cert.date}</p>
                <p><strong>Grade:</strong> {cert.grade}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCertificates;