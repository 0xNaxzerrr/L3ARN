"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pinata } from "@/utils/ipfs/config";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setFile(selectedFile || null)
    setSignedUrl(null)
    setError(null)
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Aucun fichier sélectionné");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Obtenir l'URL de téléchargement temporaire
      const urlResponse = await fetch("/api/url");
      const { url: uploadUrl } = await urlResponse.json();

      // Télécharger le fichier
      const upload = await pinata.upload
        .file(file)
        .url(uploadUrl);

      // Obtenir l'URL signée
      const signResponse = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cid: upload.cid })
      });

      const signedUrl = await signResponse.json();
      setSignedUrl(signedUrl);
    } catch (e) {
      console.error(e);
      setError("Erreur lors du téléchargement");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Télécharger sur IPFS</CardTitle>
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
              {uploading ? "Téléchargement..." : "Télécharger sur IPFS"}
            </Button>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {signedUrl && (
              <div className="mt-4">
                <p className="font-semibold">URL IPFS :</p>
                <a 
                  href={signedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 break-words"
                >
                  {signedUrl}
                </a>
                {/* Affichage conditionnel pour les images */}
                {file?.type.startsWith('image/') && (
                  <img 
                    src={signedUrl} 
                    alt="Fichier téléchargé" 
                    className="mt-4 max-w-full rounded"
                  />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}