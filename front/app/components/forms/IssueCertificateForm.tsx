'use client';

import { useState } from 'react';
import { useContract } from '@/lib/hooks/useContract';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function IssueCertificateForm() {
  const { contract } = useContract();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    studentName: '',
    studentId: '',
    courseName: '',
    grade: '',
    uri: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const tx = await contract.write.issueCertificate([
        formData.address,
        formData.studentName,
        BigInt(formData.studentId),
        formData.courseName,
        formData.grade,
        formData.uri
      ]);

      await tx.wait();
      setSuccess(true);
      setFormData({
        address: '',
        studentName: '',
        studentId: '',
        courseName: '',
        grade: '',
        uri: ''
      });
    } catch (error) {
      console.error('Error issuing certificate:', error);
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Certificate issued successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Address
          </label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="0x..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name
            </label>
            <Input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <Input
              type="number"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="12345"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <Input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Advanced Programming"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <Input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="A+"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IPFS URI
            </label>
            <Input
              type="text"
              name="uri"
              value={formData.uri}
              onChange={handleChange}
              placeholder="ipfs://..."
              required
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Processing...
          </>
        ) : (
          'Issue Certificate'
        )}
      </Button>
    </form>
  );
}
