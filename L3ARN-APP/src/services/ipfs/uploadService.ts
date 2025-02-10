import { UploadResult } from "@/utils/interfaces/interfaces";

export const uploadFile = async (file: File | null): Promise<UploadResult | null> => {
  if (!file) {
    throw new Error("Aucun fichier sélectionné");
  }

  try {
    const urlResponse = await fetch("/api/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name }),
    });

    if (!urlResponse.ok) {
      throw new Error(await urlResponse.text());
    }

    const { url: signedUploadUrl } = await urlResponse.json();

    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await fetch(signedUploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Upload failed");
    }

    const uploadResult = await uploadResponse.json();

    const signResponse = await fetch("/api/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cid: uploadResult.cid }),
    });

    const signedUrl = await signResponse.json();

    return {
      ipfsHash: uploadResult.cid,
      ipfsUrl: signedUrl,
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Erreur lors du téléchargement");
  }
};