// hooks/useMintESGIPerformanceNFT.ts
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ESGIAnnualPerformanceAbi } from "@/utils/abis/ESGIAnnualPerformance";

export const useMintESGIPerformanceNFT = () => {
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

  async function mintESGIPerformanceNFT(
    studentAddress: string,
    programTokenId: number,
    year: string,
    studentId: string,
    studentName: string,
    courses: any[], // Ajustez le type selon votre structure
    yearStartDate: number,
    yearEndDate: number,
    status: number, // 0 pour SUCCESS, 1 pour FAILED
    statusComments: string,
    ipfsCID: string,
    issuer: string,
    tokenURI: string
  ) {
    try {
      const result = await writeContract({
        abi: ESGIAnnualPerformanceAbi,
        address: process.env
          .NEXT_PUBLIC_ESGIPERFORMANCENFT_ADDRESS as `0x${string}`,
        functionName: "mintAnnualPerformanceNFT",
        args: [
          studentAddress,
          BigInt(programTokenId),
          year,
          studentId,
          studentName,
          courses,
          BigInt(yearStartDate),
          BigInt(yearEndDate),
          status,
          statusComments,
          ipfsCID,
          issuer,
          tokenURI,
        ],
      });
      return result;
    } catch (error) {
      console.error("Minting error:", error);
      throw error;
    }
  }

  return {
    mintESGIPerformanceNFT,
    isError: isWriteError || isReceiptError,
    isPending: isWritePending || isWaiting,
    isSuccess,
    transactionHash: hash,
    receipt,
  };
};
