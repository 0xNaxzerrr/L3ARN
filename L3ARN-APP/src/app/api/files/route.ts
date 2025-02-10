import { NextRequest, NextResponse } from "next/server";
import { PinataSDK } from "pinata";

export async function POST(request: NextRequest) {
  try {
    // Initialiser Pinata
    const pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_JWT,
    });

    // Récupérer le fichier
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Uploader sur Pinata
    const uploadResult = await pinata.pinFileToIPFS(buffer, {
      pinataMetadata: {
        name: file.name,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    });

    // Retourner l'URL IPFS
    return NextResponse.json({
      ipfsHash: uploadResult.IpfsHash,
      ipfsUrl: `https://gateway.pinata.cloud/ipfs/${uploadResult.IpfsHash}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "File upload failed", details: error },
      { status: 500 }
    );
  }
}
