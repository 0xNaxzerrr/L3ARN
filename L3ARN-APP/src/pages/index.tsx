"use client";
import type { NextPage } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8 px-2">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">L3ARN Platform</h1>
        <p className="text-xl text-gray-600">
          The Future of Academic Certification
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Decentralized Certificates</CardTitle>
            <CardDescription>
              Secure and immutable academic credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Store your academic achievements on the blockchain with unmatched
              security and transparency.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Easy Verification</CardTitle>
            <CardDescription>Instant certificate validation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Verify academic credentials instantly with our blockchain-based
              verification system.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>NFT Technology</CardTitle>
            <CardDescription>Unique digital certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Each certificate is a unique NFT, providing proof of authenticity
              and ownership.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
