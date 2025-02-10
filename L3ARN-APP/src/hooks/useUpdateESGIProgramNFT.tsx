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

  async function updateESGIProgramNFT(tokenId: number, newStatus: string) {
    try {
      const result = await writeContract({
        abi: ESGICertificatesAbi,
        address: process.env
          .NEXT_PUBLIC_ESGIPROGRAMNFT_ADDRESS as `0x${string}`,
        functionName: "updateProgramStatus",
        args: [BigInt(tokenId), newStatus],
      });
      console.log("Minting initiated:", result);
      return result;
    } catch (error) {
      console.error("Minting error:", error);
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

export default useUpdateESGIProgramNFT;
