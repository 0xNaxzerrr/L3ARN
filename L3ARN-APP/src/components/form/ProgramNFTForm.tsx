import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMintESGIProgramNFT } from "@/hooks/useMintESGIProgramNFT";
import { uploadFile } from "@/services/ipfs/uploadService";
import { toast } from "@/hooks/use-toast";

// Interface pour AcademicProgress
interface AcademicProgress {
  studentId: string;
  tokenId: string;
  year: string;
  nftId: string;
  ipfsCid: string;
}

export const ProgramNFTForm = () => {
  const [formData, setFormData] = useState({
    studentAddress: "",
    programName: "",
    startYear: "",
    endYear: "",
    issuer: "",
    comments: "",
    file: null as File | null,
  });

  const [academicProgresses, setAcademicProgresses] = useState<
    AcademicProgress[]
  >([]);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [programStatus, setProgramStatus] = useState<string>("0"); // ACTIVE par défaut

  const { mintESGIProgramNFT, isPending } = useMintESGIProgramNFT();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (name === "file" && files) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadFile(file);
      setUploadResult(result);
      toast({
        title: "Fichier uploadé",
        description: "Le fichier a été uploadé avec succès sur IPFS",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erreur d'upload",
        description: "Une erreur s'est produite lors de l'upload du fichier",
        variant: "destructive",
      });
      console.error("Upload error:", error);
    }
  };

  const handleAddProgress = () => {
    setAcademicProgresses([
      ...academicProgresses,
      {
        studentId: "",
        tokenId: "",
        year: "",
        nftId: "",
        ipfsCid: "",
      },
    ]);
  };

  const handleProgressChange = (
    index: number,
    field: keyof AcademicProgress,
    value: string
  ) => {
    const updatedProgresses = [...academicProgresses];
    updatedProgresses[index] = {
      ...updatedProgresses[index],
      [field]: value,
    };
    setAcademicProgresses(updatedProgresses);
  };

  const handleRemoveProgress = (index: number) => {
    const updatedProgresses = [...academicProgresses];
    updatedProgresses.splice(index, 1);
    setAcademicProgresses(updatedProgresses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation de base
    if (!formData.studentAddress || !uploadResult) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    try {
      await mintESGIProgramNFT(
        formData.studentAddress,
        formData.programName,
        parseInt(formData.startYear),
        parseInt(formData.endYear),
        JSON.stringify(academicProgresses),
        uploadResult.ipfsCID,
        formData.issuer,
        uploadResult.ipfsUrl, // tokenURI
        [formData.comments]
      );

      toast({
        title: "Succès",
        description: "Le NFT de programme a été créé avec succès",
        duration: 3000,
      });

      // Réinitialisation du formulaire
      setFormData({
        studentAddress: "",
        programName: "",
        startYear: "",
        endYear: "",
        issuer: "",
        comments: "",
        file: null,
      });
      setAcademicProgresses([]);
      setUploadResult(null);
    } catch (error) {
      toast({
        title: "Erreur de minting",
        description: "Une erreur s'est produite lors de la création du NFT",
        variant: "destructive",
      });
      console.error("Minting error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Adresse de l'étudiant</Label>
          <Input
            name="studentAddress"
            placeholder="Adresse wallet de l'étudiant"
            value={formData.studentAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Nom du programme</Label>
          <Input
            name="programName"
            placeholder="Nom du programme académique"
            value={formData.programName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Année de début</Label>
          <Input
            name="startYear"
            type="number"
            placeholder="Année de début du programme"
            value={formData.startYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Année de fin</Label>
          <Input
            name="endYear"
            type="number"
            placeholder="Année de fin du programme"
            value={formData.endYear}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Établissement</Label>
          <Input
            name="issuer"
            placeholder="Nom de l'établissement"
            value={formData.issuer}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Commentaires</Label>
          <Input
            name="comments"
            placeholder="Commentaires additionnels"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <Label>Fichier métadonnées</Label>
        <Input name="file" type="file" onChange={handleChange} required />
        {uploadResult && (
          <p className="text-sm text-green-600 mt-2">
            Fichier uploadé : {uploadResult.ipfsCID}
          </p>
        )}
      </div>

      <div>
        <Label>Progressions académiques</Label>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddProgress}
          className="mb-4"
        >
          Ajouter une progression académique
        </Button>

        {academicProgresses.map((progress, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 mb-2 items-center">
            <Input
              placeholder="ID étudiant"
              value={progress.studentId}
              onChange={(e) =>
                handleProgressChange(index, "studentId", e.target.value)
              }
            />
            <Input
              placeholder="Année"
              value={progress.year}
              onChange={(e) =>
                handleProgressChange(index, "year", e.target.value)
              }
            />
            <Input
              placeholder="Token ID"
              value={progress.tokenId}
              onChange={(e) =>
                handleProgressChange(index, "tokenId", e.target.value)
              }
            />
            <Input
              placeholder="NFT ID"
              value={progress.nftId}
              onChange={(e) =>
                handleProgressChange(index, "nftId", e.target.value)
              }
            />
            <Input
              placeholder="IPFS CID"
              value={progress.ipfsCid}
              onChange={(e) =>
                handleProgressChange(index, "ipfsCid", e.target.value)
              }
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveProgress(index)}
            >
              Supprimer
            </Button>
          </div>
        ))}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Création en cours..." : "Créer le NFT de Programme"}
      </Button>
    </form>
  );
};
