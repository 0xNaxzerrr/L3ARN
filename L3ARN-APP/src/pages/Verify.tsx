import React, { ReactNode, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVerifyESGICertificates } from "@/hooks/useVerifyESGICertificates";
import useGetESGICertificates from "@/hooks/useGetESGICertificates";

const Verify = () => {
  const [certificateId, setCertificateId] = useState("");
  const [certificateIdToVerify, setCertificateIdToVerify] = useState<number | undefined>(undefined);

  // Typage explicite de tokenExists
  const { 
    tokenExists, 
    isLoading: isVerifyLoading, 
    isError: isVerifyError 
  } = useVerifyESGICertificates(
    certificateIdToVerify !== undefined ? Number(certificateIdToVerify) : undefined
  );

  const { 
    programDetails, 
    isLoading: isDetailsLoading, 
    isError: isDetailsError 
  } = useGetESGICertificates(
    tokenExists ? Number(certificateIdToVerify) : undefined
  );

  const handleVerify = () => {
    const parsedId = Number(certificateId);
    // Vérifiez que l'ID est un nombre valide
    if (!isNaN(parsedId) && parsedId >= 0) {
      setCertificateIdToVerify(parsedId);
    } else {
      // Gérer le cas d'un ID invalide
      alert("Veuillez entrer un ID de certificat valide");
    }
  };

  // Fonction pour rendre le contenu de manière sécurisée
  const renderVerificationResult = (): ReactNode => {
    // Si aucune vérification n'a été effectuée
    if (certificateIdToVerify === undefined) return null;

    if (isVerifyLoading) return <p>Vérification en cours...</p>;
    if (isVerifyError) return <p>Erreur lors de la vérification</p>;
    
    // Gérer explicitement le cas où tokenExists est défini
    if (tokenExists !== undefined) {
      return (
        <p>
          {tokenExists 
            ? "Ce certificat existe" 
            : "Ce certificat n'existe pas"}
        </p>
      );
    }

    return null;
  };

  // Fonction pour rendre les détails du certificat
  const renderCertificateDetails = (): ReactNode => {
    // Ne pas afficher si le token n'existe pas
    if (!tokenExists) return null;
    
    if (isDetailsLoading) return <p>Chargement des détails...</p>;
    if (isDetailsError) return <p>Erreur lors du chargement des détails</p>;
    
    if (programDetails) {
      return (
        <div className="space-y-2">
          <p>
            <strong>Programme :</strong> {programDetails.programName}
          </p>
          <p>
            <strong>Année de début :</strong> {programDetails.startYear.toString()}
          </p>
          <p>
            <strong>Année de fin :</strong> {programDetails.endYear.toString()}
          </p>
          <p>
            <strong>Statut :</strong> {programDetails.status}
          </p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Verify</h1>
        <p className="text-xl text-gray-600">
          Enter the certificate ID to retrieve the associated NFT
        </p>
      </div>
      
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle>Enter Certificate ID</CardTitle>
        </CardHeader>
        <CardContent>
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

      {/* Ne s'affiche que si un ID a été vérifié */}
      {certificateIdToVerify !== undefined && (
        <div className="max-w-md mx-auto space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Result</CardTitle>
            </CardHeader>
            <CardContent>
              {renderVerificationResult()}
            </CardContent>
          </Card>

          {tokenExists && (
            <Card>
              <CardHeader>
                <CardTitle>Certificate Details</CardTitle>
              </CardHeader>
              <CardContent>
                {renderCertificateDetails()}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;