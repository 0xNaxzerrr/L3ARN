import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ESGICertificatesAbi } from "@/utils/abis/ESGICertificates";
import { useState, useEffect } from "react";

export const useMintESGIProgramNFT = () => {
  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    isError: isWriteError,
  } = useWriteContract();
  const [isMinting, setIsMinting] = useState(false);

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
    tokenURI: string
  ) {
    setIsMinting(true);
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
          tokenURI,
        ],
      });
      console.log("Minting initiated:", result);
      return result;
    } catch (error) {
      console.error("Minting error:", error);
      setIsMinting(false);
      throw error;
    }
  }

  useEffect(() => {
    if (isSuccess || isReceiptError) {
      setIsMinting(false);
    }
  }, [isSuccess, isReceiptError]);

  return {
    mintESGIProgramNFT,
    isError: isWriteError || isReceiptError,
    isPending: isWritePending || isWaiting,
    isSuccess,
    transactionHash: hash,
    receipt,
    isMinting,
  };
};
