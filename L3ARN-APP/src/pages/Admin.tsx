"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminRoute } from "@/components/AdminRoute";
import { ipfsService } from "@/services/ipfsService";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [isClient, setIsClient] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    setIpfsUrl(null);
  };

  const uploadFile = async () => {
    if (!file) {
      toast({
        title: "Aucun fichier selectionné",
      });
      return;
    }

    try {
      setUploading(true);

      const uploadResult = await ipfsService.uploadFile(file);

      // Supposons que le résultat contient une URL ou un hash
      const url =
        uploadResult.ipfsUrl ||
        (await ipfsService.getFileUrl(uploadResult.ipfsHash));

      setIpfsUrl(url);
      toast({
        title: "Fichier uploadé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur lors du téléchargement du fichier",
      });
      console.error(error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <AdminRoute>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload File to IPFS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <Button
                onClick={uploadFile}
                disabled={uploading || !file}
                className="w-full"
              >
                {uploading
                  ? "Téléchargement en cours..."
                  : "Télécharger sur IPFS"}
              </Button>

              {ipfsUrl && (
                <div className="mt-4">
                  <p className="font-semibold">URL IPFS :</p>
                  <a
                    href={ipfsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 break-words"
                  >
                    {ipfsUrl}
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminRoute>
  );
};

export default Admin;
