"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVerifyESGICertificates } from "@/hooks/useVerifyESGICertificates";
import useGetProgramDetailsByTokenId from "@/hooks/useGetProgramDetailsByTokenId";
import useGetPerformanceDetailsByTokenId from "@/hooks/useGetPerformanceDetailsByTokenId";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Type definitions to improve type safety
type AcademicProgress = {
  year: string;
  studentId: string;
};

type Course = {
  courseName: string;
  grade: string;
  result: string;
  comments: string;
};

const Verify = () => {
  const [certificateId, setCertificateId] = useState<string>("");
  const [certificateType, setCertificateType] = useState<
    "program" | "performance"
  >("program");
  const [certificateIdToVerify, setCertificateIdToVerify] = useState<
    number | undefined
  >(undefined);

  const {
    tokenExists,
    isLoading: isVerifyLoading,
    isError: isVerifyError,
  } = useVerifyESGICertificates(certificateType, certificateIdToVerify);

  const {
    programDetails,
    isLoading: isProgramLoading,
    isError: isProgramError,
  } = useGetProgramDetailsByTokenId(
    certificateType === "program" &&
      tokenExists &&
      certificateIdToVerify !== undefined
      ? certificateIdToVerify
      : undefined
  );

  const {
    performanceDetails,
    isLoading: isPerformanceLoading,
    isError: isPerformanceError,
  } = useGetPerformanceDetailsByTokenId(
    certificateType === "performance" &&
      tokenExists &&
      certificateIdToVerify !== undefined
      ? certificateIdToVerify
      : undefined
  );

  const handleVerify = () => {
    const parsedId = Number(certificateId);
    if (!isNaN(parsedId) && parsedId >= 0) {
      setCertificateIdToVerify(parsedId);
    } else {
      alert("Please enter a valid certificate ID");
    }
  };

  const renderVerificationResult = (): ReactNode => {
    if (certificateIdToVerify === undefined) return null;
    if (isVerifyLoading) return <p className="text-gray-600">Verifying...</p>;
    if (isVerifyError)
      return <p className="text-red-500">Error during verification</p>;

    return (
      <Badge variant={tokenExists ? "success" : "destructive"}>
        {tokenExists ? "Certificate exists" : "Certificate not found"}
      </Badge>
    );
  };

  const renderProgramDetails = (): ReactNode => {
    if (!tokenExists || certificateType !== "program") return null;
    if (isProgramLoading)
      return <p className="text-gray-600">Loading details...</p>;
    if (isProgramError)
      return <p className="text-red-500">Error loading details</p>;

    const program = programDetails?.[0];
    if (!program) return <p>No details available</p>;

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">{program.programName}</h3>
          <Badge
            variant={
              program.programStatus.status === 0
                ? "default"
                : program.programStatus.status === 1
                  ? "success"
                  : "destructive"
            }
          >
            {program.programStatus.status === 0
              ? "ACTIVE"
              : program.programStatus.status === 1
                ? "SUCCESS"
                : "REVOKED"}
          </Badge>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Period:</strong> {program.startYear.toString()} -{" "}
            {program.endYear.toString()}
          </p>
          <p>
            <strong>Issuer:</strong> {program.issuer}
          </p>
          <Separator />
          <div>
            <strong>Academic Progress:</strong>
            {program.academicProgresses.map(
              (progress: AcademicProgress, idx: number) => (
                <div key={idx} className="ml-2 mt-1 text-sm">
                  <p>
                    {progress.year} - {progress.studentId}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPerformanceDetails = (): ReactNode => {
    if (!tokenExists || certificateType !== "performance") return null;
    if (isPerformanceLoading)
      return <p className="text-gray-600">Loading details...</p>;
    if (isPerformanceError)
      return <p className="text-red-500">Error loading details</p>;

    const performance = performanceDetails?.[0];
    if (!performance) return <p>No details available</p>;

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">{performance.year}</h3>
          <Badge
            variant={
              performance.academicStatus.status === 0
                ? "success"
                : "destructive"
            }
          >
            {performance.academicStatus.status === 0 ? "SUCCESS" : "FAILED"}
          </Badge>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Student:</strong> {performance.studentName}
          </p>
          <p>
            <strong>ID:</strong> {performance.studentId}
          </p>
          <Separator />
          <div>
            <strong>Courses:</strong>
            {performance.courses.map((course: Course, idx: number) => (
              <div key={idx} className="ml-2 mt-2 p-2 bg-gray-50 rounded">
                <p className="font-medium">{course.courseName}</p>
                <p className="text-sm">
                  Grade: {course.grade} ({course.result})
                </p>
                <p className="text-sm text-gray-600">{course.comments}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log("Token Exists:", tokenExists);
    console.log("Certificate Type:", certificateType);
    console.log("Certificate ID to Verify:", certificateIdToVerify);
    console.log("Program Details:", programDetails);
    console.log("Program Loading:", isProgramLoading);
    console.log("Program Error:", isProgramError);

    // Add this to get more error context
    if (isProgramError) {
      console.error("Detailed error information");
    }
  }, [tokenExists, certificateType, certificateIdToVerify, programDetails]);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Verify Certificate</h1>
        <p className="text-xl text-gray-600">
          Enter a certificate ID to verify its authenticity
        </p>
      </div>

      <Card className="max-w-md w-full mx-auto mb-8">
        <CardHeader>
          <CardTitle>Certificate Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={certificateType === "program" ? "default" : "outline"}
              onClick={() => setCertificateType("program")}
            >
              Program
            </Button>
            <Button
              variant={
                certificateType === "performance" ? "default" : "outline"
              }
              onClick={() => setCertificateType("performance")}
            >
              Performance
            </Button>
          </div>
          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Enter certificate ID"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
            />
            <Button onClick={handleVerify}>Verify</Button>
          </div>
        </CardContent>
      </Card>

      {certificateIdToVerify !== undefined && (
        <div className="w-full max-w-md space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Result</CardTitle>
            </CardHeader>
            <CardContent>{renderVerificationResult()}</CardContent>
          </Card>

          {tokenExists && (
            <Card>
              <CardHeader>
                <CardTitle>Certificate Details</CardTitle>
              </CardHeader>
              <CardContent>
                {certificateType === "program"
                  ? renderProgramDetails()
                  : renderPerformanceDetails()}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
