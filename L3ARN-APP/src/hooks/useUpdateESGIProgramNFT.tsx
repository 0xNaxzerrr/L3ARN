// hooks/useUpdateESGIProgramNFT.ts
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ESGICertificatesAbi } from "@/utils/abis/ESGICertificates";

export const useUpdateESGIProgramNFT = () => {
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

  async function updateESGIProgramNFT(
    tokenId: number,
    newStatus: number,
    comments: string
  ) {
    try {
      const result = await writeContract({
        abi: ESGICertificatesAbi,
        address: process.env
          .NEXT_PUBLIC_ESGIPROGRAMNFT_ADDRESS as `0x${string}`,
        functionName: "updateProgramStatus",
        args: [
          BigInt(tokenId),
          newStatus, // Doit correspondre à l'enum Status du contrat
          comments,
        ],
      });
      console.log("Mise à jour du NFT initiée:", result);
      return result;
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
      throw error;
    }
  }

  return {
    updateESGIProgramNFT,
    isError: isWriteError || isReceiptError,
    isPending: isWritePending || isWaiting,
    isSuccess,
    transactionHash: hash,
    receipt,
  };
};
