import { useReadContract } from "wagmi";
import { ESGIAnnualPerformanceAbi } from "@/utils/abis/ESGIAnnualPerformance";

const PERFORMANCE_NFT_ADDRESS =
  process.env.NEXT_PUBLIC_ESGIPERFORMANCENFT_ADDRESS;

const useGetPerformanceNFTs = (address?: `0x${string}`) => {
  const {
    data: nftData,
    isError,
    isLoading,
    error,
  } = useReadContract({
    abi: ESGIAnnualPerformanceAbi,
    address: PERFORMANCE_NFT_ADDRESS as `0x${string}`,
    functionName: "getStudentNFTs",
    args: address ? [address] : undefined,
  });

  console.log("Performance NFT Data:", nftData);
  console.log("Performance Error:", error);

  return {
    performanceDetails: nftData ? (nftData as any)[1] : [],
    isLoading,
    isError,
  };
};

export default useGetPerformanceNFTs;
