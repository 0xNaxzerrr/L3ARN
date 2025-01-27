'use client';

import { useState } from 'react';
import { useContract } from '@/lib/hooks/useContract';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle } from 'lucide-react';

export function RevokeCertificateForm() {
  const { contract } = useContract();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    tokenId: '',
    reason: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to revoke this certificate? This action cannot be undone.'
    );
    
    if (!confirmed) return;

    setLoading(true);
    setSuccess(false);

    try {
      const tx = await contract.write.revokeCertificate([
        BigInt(formData.tokenId),
        formData.reason
      ]);

      await tx.wait();
      setSuccess(true);
      setFormData({
        tokenId: '',
        reason: ''
      });
    } catch (error) {
      console.error('Error revoking certificate:', error);
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-amber-800">
                Certificate has been revoked successfully
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certificate ID
          </label>
          <Input
            type="number"
            name="tokenId"
            value={formData.tokenId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Revocation
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows={3}
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        variant="destructive"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Processing...
          </>
        ) : (
          'Revoke Certificate'
        )}
      </Button>
    </form>
  );
}
