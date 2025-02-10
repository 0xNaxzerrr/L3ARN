import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@/utils/ipfs/config";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { cid } = await request.json();
    const signedUrl = await pinata.gateways.createSignedURL({
      cid,
      expires: 3600, // URL valide 1 heure
    });
    return NextResponse.json(signedUrl, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating signed URL" },
      { status: 500 }
    );
  }
}
