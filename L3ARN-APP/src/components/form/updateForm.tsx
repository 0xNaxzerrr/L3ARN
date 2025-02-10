import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateForm, UpdateFormProps } from "@/utils/interfaces/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UpdateFormComponent: React.FC<UpdateFormProps> = ({
  updateForm,
  handleFormChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit("update", e)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tokenId">ID du Token</Label>
        <Input
          id="tokenId"
          name="tokenId"
          value={updateForm.tokenId}
          onChange={(e) => handleFormChange("update", e)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newStatus">Nouveau statut</Label>
        <Select
          onValueChange={(value: string) =>
            handleFormChange("update", {
              target: { name: "newStatus", value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          value={updateForm.newStatus}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
            <SelectItem value="COMPLETED">COMPLETED</SelectItem>
            <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Mettre à jour le NFT
      </Button>
    </form>
  );
};

export default UpdateFormComponent;
