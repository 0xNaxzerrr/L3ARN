import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Verify = () => {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState(null);

  const handleVerify = async () => {
    // TODO: Implement certificate verification logic using smart contract
    console.log('Verifying certificate:', certificateId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Verify Certificate</h1>

      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle>Enter Certificate ID</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter certificate ID"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
            />
            <Button onClick={handleVerify}>Verify</Button>
          </div>
        </CardContent>
      </Card>

      {certificate && (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Certificate Details</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Display certificate details here */}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Verify;