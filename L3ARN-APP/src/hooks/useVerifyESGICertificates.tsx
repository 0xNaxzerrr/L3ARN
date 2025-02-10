import { useReadContract } from "wagmi";
import { ESGICertificatesAbi } from "@/utils/abis/ESGICertificates";
import { ESGIAnnualPerformanceAbi } from "@/utils/abis/ESGIAnnualPerformance";

const PROGRAM_NFT_ADDRESS = process.env.NEXT_PUBLIC_ESGIPROGRAMNFT_ADDRESS;
const PERFORMANCE_NFT_ADDRESS =
  process.env.NEXT_PUBLIC_ESGIPERFORMANCENFT_ADDRESS;

export const useVerifyESGICertificates = (
  type: "program" | "performance",
  tokenId?: number
) => {
  const {
    data: tokenExists,
    isError,
    isLoading,
  } = useReadContract({
    abi: type === "program" ? ESGICertificatesAbi : ESGIAnnualPerformanceAbi,
    address: (type === "program"
      ? PROGRAM_NFT_ADDRESS
      : PERFORMANCE_NFT_ADDRESS) as `0x${string}`,
    functionName: "doesTokenExist",
    args: tokenId !== undefined ? [BigInt(tokenId)] : undefined,
  });

  return {
    tokenExists: tokenExists as boolean,
    isLoading,
    isError,
  };
};
