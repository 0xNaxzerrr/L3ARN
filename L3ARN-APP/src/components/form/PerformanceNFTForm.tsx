// components/PerformanceNFTForm.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useMintESGIPerformanceNFT } from "@/hooks/useMintESGIPerformanceNFT";
import { uploadFile } from "@/services/ipfs/uploadService";
import { toast } from "@/hooks/use-toast";

// Interface pour définir la structure d'un cours
interface Course {
  courseName: string;
  grade: string;
  result: string;
  comments: string;
}

export const PerformanceNFTForm = () => {
  const [formData, setFormData] = useState({
    studentAddress: "",
    programTokenId: "",
    year: "",
    studentId: "",
    studentName: "",
    yearStartDate: "",
    yearEndDate: "",
    status: "0", // Par défaut SUCCESS
    statusComments: "",
    issuer: "",
    file: null as File | null,
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const { mintESGIPerformanceNFT, isPending } = useMintESGIPerformanceNFT();

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

  const handleAddCourse = () => {
    setCourses([
      ...courses,
      {
        courseName: "",
        grade: "",
        result: "",
        comments: "",
      },
    ]);
  };

  const handleCourseChange = (
    index: number,
    field: keyof Course,
    value: string
  ) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]: value,
    };
    setCourses(updatedCourses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (!formData.studentAddress || !uploadResult) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    try {
      await mintESGIPerformanceNFT(
        formData.studentAddress,
        parseInt(formData.programTokenId),
        formData.year,
        formData.studentId,
        formData.studentName,
        courses,
        parseInt(formData.yearStartDate),
        parseInt(formData.yearEndDate),
        parseInt(formData.status), // 0 pour SUCCESS, 1 pour FAILED
        formData.statusComments,
        uploadResult.ipfsCID,
        formData.issuer,
        uploadResult.ipfsUrl // tokenURI
      );

      toast({
        title: "Succès",
        description: "Le NFT de performance a été créé avec succès",
        duration: 3000,
      });

      // Réinitialisation du formulaire
      setFormData({
        studentAddress: "",
        programTokenId: "",
        year: "",
        studentId: "",
        studentName: "",
        yearStartDate: "",
        yearEndDate: "",
        status: "0",
        statusComments: "",
        issuer: "",
        file: null,
      });
      setCourses([]);
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
          <Label>ID du token du programme</Label>
          <Input
            name="programTokenId"
            type="number"
            placeholder="ID du token du programme"
            value={formData.programTokenId}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Année académique</Label>
          <Input
            name="year"
            placeholder="Ex: 3ème année"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>ID étudiant</Label>
          <Input
            name="studentId"
            placeholder="Identifiant de l'étudiant"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Nom de l'étudiant</Label>
          <Input
            name="studentName"
            placeholder="Nom complet de l'étudiant"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date de début de l'année</Label>
          <Input
            name="yearStartDate"
            type="date"
            value={formData.yearStartDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Date de fin de l'année</Label>
          <Input
            name="yearEndDate"
            type="date"
            value={formData.yearEndDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Statut académique</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Succès</SelectItem>
              <SelectItem value="1">Échec</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Commentaires sur le statut</Label>
          <Input
            name="statusComments"
            placeholder="Commentaires additionnels"
            value={formData.statusComments}
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
        <Label>Cours</Label>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddCourse}
          className="ml-4 mb-4"
        >
          Ajouter un cours
        </Button>

        {courses.map((course, index) => (
          <div key={index} className="grid grid-cols-5 gap-2 mb-2 items-center">
            <Input
              placeholder="Nom du cours"
              value={course.courseName}
              onChange={(e) =>
                handleCourseChange(index, "courseName", e.target.value)
              }
            />
            <Input
              placeholder="Note"
              value={course.grade}
              onChange={(e) =>
                handleCourseChange(index, "grade", e.target.value)
              }
            />
            <Input
              placeholder="Résultat"
              value={course.result}
              onChange={(e) =>
                handleCourseChange(index, "result", e.target.value)
              }
            />
            <Input
              placeholder="Commentaires"
              value={course.comments}
              onChange={(e) =>
                handleCourseChange(index, "comments", e.target.value)
              }
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => {
                const updatedCourses = [...courses];
                updatedCourses.splice(index, 1);
                setCourses(updatedCourses);
              }}
              className="ml-2"
            >
              Supprimer
            </Button>
          </div>
        ))}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Création en cours..." : "Créer le NFT de Performance"}
      </Button>
    </form>
  );
};
