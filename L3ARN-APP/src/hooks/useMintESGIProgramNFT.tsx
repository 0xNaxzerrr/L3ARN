// hooks/useMintESGIProgramNFT.ts
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ESGICertificatesAbi } from "@/utils/abis/ESGICertificates";

export const useMintESGIProgramNFT = () => {
  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    isError: isWriteError,
  } = useWriteContract();

  const {
    data: receipt,
    isLoading: isWaiting,
    isSuccess,
    isError: isReceiptError,
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}` | undefined,
  });

  async function mintESGIProgramNFT(
    studentAddress: string,
    programName: string,
    startYear: number,
    endYear: number,
    ipfsCID: string,
    issuer: string,
    tokenURI: string,
    comments: string,
    academicProgresses: any[] // Ajustez le type selon votre structure
  ) {
    try {
      const result = await writeContract({
        abi: ESGICertificatesAbi,
        address: process.env
          .NEXT_PUBLIC_ESGIPROGRAMNFT_ADDRESS as `0x${string}`,
        functionName: "mintProgramNFT",
        args: [
          studentAddress,
          programName,
          BigInt(startYear),
          BigInt(endYear),
          academicProgresses,
          ipfsCID,
          issuer,
          tokenURI,
          comments,
        ],
      });
      return result;
    } catch (error) {
      console.error("Minting error:", error);
      throw error;
    }
  }

  return {
    mintESGIProgramNFT,
    isError: isWriteError || isReceiptError,
    isPending: isWritePending || isWaiting,
    isSuccess,
    transactionHash: hash,
    receipt,
  };
};
