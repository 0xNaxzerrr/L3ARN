"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  MintForm,
  UploadResult,
  UpdateForm,
} from "@/utils/interfaces/interfaces";
import { uploadFile as uploadFileService } from "@/services/ipfs/uploadService";
import MintingForm from "@/components/form/mintForm";
import UpdateFormComponent from "@/components/form/updateForm";
import { useMintESGIProgramNFT } from "@/hooks/useMintESGIProgramNFT";
import { useUpdateESGIProgramNFT } from "@/hooks/useUpdateESGIProgramNFT";
import { toast } from "@/hooks/use-toast";

export default function NFTManagementComponent() {
  const [mintForm, setMintForm] = useState<MintForm>({
    studentAddress: "",
    programName: "",
    startYear: 0,
    endYear: 0,
    file: null,
  });
  const [updateForm, setUpdateForm] = useState<UpdateForm>({
    tokenId: "",
    newStatus: "",
  });

  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isReadyToMint, setIsReadyToMint] = useState(false);

  const {
    mintESGIProgramNFT,
    isError: isMintError,
    isPending: isMintPending,
    isSuccess: isMintSuccess,
    transactionHash: mintTransactionHash,
  } = useMintESGIProgramNFT();

  const {
    updateESGIProgramNFT,
    isError: isUpdateError,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    transactionHash: updateTransactionHash,
  } = useUpdateESGIProgramNFT();

  useEffect(() => {
    if (isMintSuccess) {
      toast({
        title: "Succès",
        description: `Le NFT a été créé avec succès. Hash de transaction: ${mintTransactionHash}`,
        duration: 5000,
      });
    } else if (isMintError) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création du NFT.",
        duration: 5000,
      });
    }
  }, [isMintSuccess, isMintError, mintTransactionHash]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast({
        title: "Succès",
        description: `Le NFT a été mis à jour avec succès. Hash de transaction: ${updateTransactionHash}`,
        duration: 5000,
      });
    } else if (isUpdateError) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour du NFT.",
        duration: 5000,
      });
    }
  }, [isUpdateSuccess, isUpdateError, updateTransactionHash]);

  const handleFormChange = (
    formName: "mint" | "update",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, files } = e.target;
    if (formName === "mint") {
      setMintForm((prev) => ({
        ...prev,
        [name]: name.includes("Year")
          ? Number(value)
          : files
            ? files[0]
            : value,
      }));

      if (name === "file" && files && files[0]) {
        handleFileUpload(files[0]);
      }
    } else {
      setUpdateForm((prev) => ({
        ...prev,
        [name]: name === "tokenId" ? Number(value) : value,
      }));
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setIsReadyToMint(false);
    setError(null);
    try {
      const result = await uploadFileService(file);
      console.log("Upload result:", result);
      setUploadResult(result);
      setIsReadyToMint(true);
    } catch (error) {
      setError((error as any).message);
    } finally {
      setIsUploading(false);
    }
  };

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (
    formName: "mint" | "update",
    e: HandleSubmitEvent
  ) => {
    e.preventDefault();
    if (formName === "mint" && isReadyToMint) {
      try {
        console.log("Minting NFT with data:", {
          ...mintForm,
          ipfsUrl: uploadResult!.ipfsUrl,
        });
        await mintESGIProgramNFT(
          mintForm.studentAddress,
          mintForm.programName,
          mintForm.startYear,
          mintForm.endYear,
          uploadResult!.ipfsUrl
        );
      } catch (error) {
        setError((error as any).message);
      }
    } else if (formName === "update") {
      try {
        console.log("Updating NFT with data:", updateForm);
        await updateESGIProgramNFT(
          Number(updateForm.tokenId),
          updateForm.newStatus
        );
      } catch (error) {
        setError((error as any).message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-8">Gestion des NFTs ESGI</h1>
      <Card className="w-[400px]">
        <CardContent className="pt-6">
          <Tabs defaultValue="mint" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="mint">Minter un NFT</TabsTrigger>
              <TabsTrigger value="update">Modifier un NFT</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="mint">
                <MintingForm
                  mintForm={mintForm}
                  handleFormChange={handleFormChange}
                  handleSubmit={handleSubmit}
                  isUploading={isUploading}
                  isReadyToMint={isReadyToMint}
                  isPending={isMintPending}
                />
              </TabsContent>
              <TabsContent value="update">
                <UpdateFormComponent
                  updateForm={updateForm}
                  handleFormChange={handleFormChange}
                  handleSubmit={handleSubmit}
                  isPending={isUpdatePending}
                />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
