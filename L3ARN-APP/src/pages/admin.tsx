"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Définition des schémas de validation
const mintFormSchema = z.object({
  studentAddress: z.string().min(1, "L'adresse est requise"),
  studentName: z.string().min(1, "Le nom est requis"),
  studentId: z.string().min(1, "L'ID est requis"),
  courseName: z.string().min(1, "Le nom du cours est requis"),
  grade: z.string().min(1, "La note est requise"),
  metadataUri: z.string().min(1, "L'URI des métadonnées est requise")
});

const modifyFormSchema = z.object({
  certificateId: z.string().min(1, "L'ID du certificat est requis"),
  newGrade: z.string().min(1, "La nouvelle note est requise"),
  newMetadataUri: z.string().min(1, "La nouvelle URI est requise")
});

type MintFormValues = z.infer<typeof mintFormSchema>;
type ModifyFormValues = z.infer<typeof modifyFormSchema>;

const Admin = () => {
  const mintForm = useForm<MintFormValues>({
    resolver: zodResolver(mintFormSchema),
    defaultValues: {
      studentAddress: '',
      studentName: '',
      studentId: '',
      courseName: '',
      grade: '',
      metadataUri: ''
    }
  });

  const modifyForm = useForm<ModifyFormValues>({
    resolver: zodResolver(modifyFormSchema),
    defaultValues: {
      certificateId: '',
      newGrade: '',
      newMetadataUri: ''
    }
  });

  const handleMint = async (data: MintFormValues) => {
    console.log('Minting certificate:', data);
  };

  const handleModify = async (data: ModifyFormValues) => {
    console.log('Modifying certificate:', data);
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
                        <Input {...field} placeholder="0x..." />
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
                        <Input {...field} placeholder="Enter student name" />
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
                        <Input {...field} placeholder="Enter student ID" />
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
                        <Input {...field} placeholder="Enter course name" />
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
                        <Input {...field} placeholder="Enter grade" />
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
                        <Input {...field} placeholder="Enter metadata URI" />
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
                        <Input {...field} placeholder="Enter certificate ID" />
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
                        <Input {...field} placeholder="Enter new grade" />
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
                        <Input {...field} placeholder="Enter new metadata URI" />
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
};

export default Admin;