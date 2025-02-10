import { useReadContract } from "wagmi";
import { ESGIAnnualPerformanceAbi } from "@/utils/abis/ESGIAnnualPerformance";

const PERFORMANCE_NFT_ADDRESS =
  process.env.NEXT_PUBLIC_ESGIPERFORMANCENFT_ADDRESS;

const useGetPerformanceDetailsByTokenId = (tokenId?: number) => {
  const {
    data: nftData,
    isError,
    isLoading,
    error,
  } = useReadContract({
    abi: ESGIAnnualPerformanceAbi,
    address: PERFORMANCE_NFT_ADDRESS as `0x${string}`,
    functionName: "getAnnualPerformanceDetails",
    args: tokenId !== undefined ? [BigInt(tokenId)] : undefined,
  });

  console.log("Performance Details by Token ID:", nftData);
  console.log("Performance Error:", error);

  return {
    performanceDetails: nftData ? [nftData] : [],
    isLoading,
    isError,
  };
};

export default useGetPerformanceDetailsByTokenId;
