"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const mintFormSchema = z.object({
  studentAddress: z.string().min(42, 'Invalid Ethereum address'),
  studentName: z.string().min(2, 'Name is required'),
  studentId: z.string().min(1, 'Student ID is required'),
  courseName: z.string().min(2, 'Course name is required'),
  grade: z.string().min(1, 'Grade is required'),
  metadataUri: z.string().min(1, 'Metadata URI is required')
});

const modifyFormSchema = z.object({
  certificateId: z.string().min(1, 'Certificate ID is required'),
  newGrade: z.string().min(1, 'New grade is required'),
  newMetadataUri: z.string().min(1, 'New metadata URI is required')
});

type MintFormValues = z.infer<typeof mintFormSchema>;
type ModifyFormValues = z.infer<typeof modifyFormSchema>;

export default function Admin() {
  const mintForm = useForm<MintFormValues>({
    defaultValues: {
      studentAddress: '',
      studentName: '',
      studentId: '',
      courseName: '',
      grade: '',
      metadataUri: ''
    },
    resolver: zodResolver(mintFormSchema)
  });

  const modifyForm = useForm<ModifyFormValues>({
    defaultValues: {
      certificateId: '',
      newGrade: '',
      newMetadataUri: ''
    },
    resolver: zodResolver(modifyFormSchema)
  });

  const handleMint = async (data: MintFormValues) => {
    try {
      // TODO: Implement minting logic using smart contract
      console.log('Minting certificate:', data);
    } catch (error) {
      console.error('Error minting certificate:', error);
    }
  };

  const handleModify = async (data: ModifyFormValues) => {
    try {
      // TODO: Implement modification logic using smart contract
      console.log('Modifying certificate:', data);
    } catch (error) {
      console.error('Error modifying certificate:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Mint New Certificate</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...mintForm}>
              <form onSubmit={mintForm.handleSubmit(handleMint)} className="space-y-4">
                <FormField
                  control={mintForm.control}
                  name="studentAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Wallet Address</FormLabel>
                      <FormControl>
                        <Input placeholder="0x..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={mintForm.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter student name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={mintForm.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter student ID" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={mintForm.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={mintForm.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter grade" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={mintForm.control}
                  name="metadataUri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metadata URI</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter metadata URI" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit">Mint Certificate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modify Certificate</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...modifyForm}>
              <form onSubmit={modifyForm.handleSubmit(handleModify)} className="space-y-4">
                <FormField
                  control={modifyForm.control}
                  name="certificateId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter certificate ID" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={modifyForm.control}
                  name="newGrade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Grade</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter new grade" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={modifyForm.control}
                  name="newMetadataUri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Metadata URI</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter new metadata URI" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit">Modify Certificate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
