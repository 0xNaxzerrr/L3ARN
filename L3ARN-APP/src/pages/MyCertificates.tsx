"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetProgramNFTs from "@/hooks/useGetProgramNFTs";
import useGetPerformanceNFTs from "@/hooks/useGetPerformanceNFTs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAccount } from "wagmi";

const MyCertificates = () => {
  const { address, isConnected } = useAccount();

  const {
    programDetails,
    isLoading: isProgramLoading,
    isError: isProgramError,
  } = useGetProgramNFTs(isConnected ? address : undefined);

  const {
    performanceDetails,
    isLoading: isPerformanceLoading,
    isError: isPerformanceError,
  } = useGetPerformanceNFTs(isConnected ? address : undefined);

  const isLoading = isProgramLoading || isPerformanceLoading;
  const isError = isProgramError || isPerformanceError;

  // Debug logging
  useEffect(() => {
    console.log("Connected Address:", address);
    console.log("Is Connected:", isConnected);
    console.log("Program Details:", programDetails);
    console.log("Performance Details:", performanceDetails);
    console.log("Is Loading:", isLoading);
    console.log("Is Error:", isError);
  }, [
    address,
    isConnected,
    programDetails,
    performanceDetails,
    isLoading,
    isError,
  ]);

  if (!isConnected) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">
          Please connect your wallet to view your certificates
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading your certificates...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error loading certificates</p>
        <p className="mt-2 text-gray-600">
          Please check your connection and try again
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">My Certificates</h1>
        <p className="text-xl text-gray-600">
          View your Program and Performance Certificates
        </p>
      </div>

      {/* Program Certificates Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Program Certificates</h2>
        {!programDetails || programDetails.length === 0 ? (
          <p className="text-center text-gray-500">
            No program certificates found
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programDetails.map((program: any, index: any) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{program.programName}</CardTitle>
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
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Period:</strong> {program.startYear.toString()} -{" "}
                      {program.endYear.toString()}
                    </p>
                    <Separator className="my-2" />
                    <div>
                      <strong>Academic Progress:</strong>
                      {program.academicProgresses.map(
                        (progress: any, idx: any) => (
                          <div key={idx} className="ml-2 mt-1 text-sm">
                            <p>
                              {progress.year} - {progress.studentId}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Performance Certificates Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Performance Certificates</h2>
        {!performanceDetails || performanceDetails.length === 0 ? (
          <p className="text-center text-gray-500">
            No performance certificates found
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceDetails.map((performance: any, index: any) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{performance.year}</CardTitle>
                  <Badge
                    variant={
                      performance.academicStatus.status === 0
                        ? "success"
                        : "destructive"
                    }
                  >
                    {performance.academicStatus.status === 0
                      ? "SUCCESS"
                      : "FAILED"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Student:</strong> {performance.studentName}
                    </p>
                    <p>
                      <strong>ID:</strong> {performance.studentId}
                    </p>
                    <Separator className="my-2" />
                    <div>
                      <strong>Courses:</strong>
                      {performance.courses.map((course: any, idx: any) => (
                        <div
                          key={idx}
                          className="ml-2 mt-2 p-2 bg-gray-50 rounded"
                        >
                          <p className="font-medium">{course.courseName}</p>
                          <p className="text-sm">
                            Grade: {course.grade} ({course.result})
                          </p>
                          <p className="text-sm text-gray-600">
                            {course.comments}
                          </p>
                        </div>
                      ))}
                    </div>
                    {performance.academicStatus.comments && (
                      <>
                        <Separator className="my-2" />
                        <p className="text-sm italic">
                          {performance.academicStatus.comments}
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCertificates;
