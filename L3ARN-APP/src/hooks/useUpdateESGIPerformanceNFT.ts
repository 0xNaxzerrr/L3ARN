// hooks/useUpdateESGIPerformanceNFT.ts
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ESGIAnnualPerformanceAbi } from "@/utils/abis/ESGIAnnualPerformance";

export const useUpdateESGIPerformanceNFT = () => {
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

  async function updateESGIPerformanceNFT(
    tokenId: number,
    newStatus: number,
    comments: string
  ) {
    try {
      const result = await writeContract({
        abi: ESGIAnnualPerformanceAbi,
        address: process.env
          .NEXT_PUBLIC_ESGIPERFORMANCENFT_ADDRESS as `0x${string}`,
        functionName: "updateAcademicStatus",
        args: [
          BigInt(tokenId),
          newStatus, // Doit correspondre à l'enum AcademicStatus du contrat
          comments,
        ],
      });
      console.log("Mise à jour du NFT de performance initiée:", result);
      return result;
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
      throw error;
    }
  }

  return {
    updateESGIPerformanceNFT,
    isError: isWriteError || isReceiptError,
    isPending: isWritePending || isWaiting,
    isSuccess,
    transactionHash: hash,
    receipt,
  };
};
