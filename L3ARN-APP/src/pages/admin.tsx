import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const Admin = () => {
  const mintForm = useForm({
    defaultValues: {
      studentAddress: '',
      studentName: '',
      studentId: '',
      courseName: '',
      grade: '',
      metadataUri: ''
    }
  });

  const modifyForm = useForm({
    defaultValues: {
      certificateId: '',
      newGrade: '',
      newMetadataUri: ''
    }
  });

  const handleMint = async (data: any) => {
    // TODO: Implement minting logic using smart contract
    console.log('Minting certificate:', data);
  };

  const handleModify = async (data: any) => {
    // TODO: Implement modification logic using smart contract
    console.log('Modifying certificate:', data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-xl text-gray-600">Here you can mint NFTs and update them</p>
    </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Mint New Certificate</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...mintForm}>
              <form onSubmit={mintForm.handleSubmit(handleMint)} className="space-y-4">
                <FormField
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
                {/* Add other form fields similarly */}
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
                {/* Add other form fields similarly */}
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