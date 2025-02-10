"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetESGICertificates from "@/hooks/useGetESGICertificates";

const MyCertificates = () => {
  const [certificates, setCertificates] = React.useState<
    Array<{
      id: string;
      programName: string;
      startYear: string;
      endYear: string;
      status: string;
    }>
  >([]);

  const { programDetails, isLoading, isError } = useGetESGICertificates(0);
  useEffect(() => {
    setCertificates([
      {
        id: "0",
        programName: programDetails?.programName as string,
        startYear: programDetails?.startYear.toString() as string,
        endYear: programDetails?.endYear.toString() as string,
        status: programDetails?.status as string,
      },
    ]);
  }, [programDetails]);
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">My certificates</h1>
        <p className="text-xl text-gray-600">
          Connect your wallet and see your NFT's Certificates
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <CardTitle>{cert.programName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Start Year :</strong> {cert.startYear}
                </p>
                <p>
                  <strong>End Year :</strong> {cert.endYear}
                </p>
                <p>
                  <strong>Status :</strong> {cert.status}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCertificates;
