import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MintForm } from "@/utils/interfaces/interfaces";
import { MintFormProps } from "@/utils/interfaces/interfaces";

const MintFormComponent: React.FC<MintFormProps> = ({
  mintForm,
  handleFormChange,
  handleSubmit,
  isUploading,
  isReadyToMint,
  isPending,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit("mint", e)} className="space-y-4">
      {["studentAddress", "programName", "startYear", "endYear"].map(
        (field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              id={field}
              name={field}
              type={field.includes("Year") ? "number" : "text"}
              value={
                field === "file"
                  ? undefined
                  : (mintForm[field as keyof MintForm] as string)
              }
              disabled={isUploading}
              onChange={(e) => handleFormChange("mint", e)}
              required
            />
          </div>
        )
      )}
      <div className="space-y-2">
        <Label htmlFor="file">Fichier</Label>
        <Input
          id="file"
          name="file"
          type="file"
          onChange={(e) => handleFormChange("mint", e)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {isUploading
          ? "Uploading..."
          : isPending
            ? "Minting..."
            : "Mint NFT"}
      </Button>
    </form>
  );
};

export default MintFormComponent;
