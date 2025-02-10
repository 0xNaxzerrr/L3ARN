// src/app/api/url/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@/utils/ipfs/config";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Récupérer le nom du fichier depuis le corps de la requête
    const { filename } = await request.json();

    console.log("Attempting to create signed upload URL for file:", filename);

    const url = await pinata.upload.createSignedURL({
      expires: 30, // Expiration en secondes
      name: filename || "Uploaded File", // Utilisez le nom du fichier ou un nom par défaut
    });

    console.log("Signed URL created successfully");
    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("URL Creation Detailed Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create upload URL",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
