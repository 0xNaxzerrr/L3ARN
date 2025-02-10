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
import { toast } from "@/hooks/use-toast";
import { useUpdateESGIPerformanceNFT } from "@/hooks/useUpdateESGIPerformanceNFT";

export const UpdatePerformanceNFTForm = () => {
  const [formData, setFormData] = useState({
    tokenId: "",
    status: "0", // Par défaut SUCCESS
    comments: "",
  });

  const { updateESGIPerformanceNFT, isPending } = useUpdateESGIPerformanceNFT();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation de base
    if (!formData.tokenId) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un ID de token",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateESGIPerformanceNFT(
        parseInt(formData.tokenId),
        parseInt(formData.status), // Convertir en nombre pour correspondre à l'enum
        formData.comments
      );

      toast({
        title: "Succès",
        description: "Le statut du NFT de performance a été mis à jour",
        duration: 3000,
      });

      // Réinitialisation du formulaire
      setFormData({
        tokenId: "",
        status: "0",
        comments: "",
      });
    } catch (error) {
      toast({
        title: "Erreur de mise à jour",
        description: "Une erreur s'est produite lors de la mise à jour du NFT",
        variant: "destructive",
      });
      console.error("Update error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>ID du Token</Label>
        <Input
          name="tokenId"
          type="number"
          placeholder="Saisissez l'ID du token"
          value={formData.tokenId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Nouveau Statut</Label>
        <Select value={formData.status} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">SUCCESS</SelectItem>
            <SelectItem value="1">FAILED</SelectItem>
            <SelectItem value="2">REVOKED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Commentaires</Label>
        <Input
          name="comments"
          placeholder="Commentaires sur la mise à jour du statut"
          value={formData.comments}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Mise à jour en cours..." : "Mettre à jour le NFT"}
      </Button>
    </form>
  );
};
