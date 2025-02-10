import { useReadContract } from "wagmi";
import { ESGICertificatesAbi } from "@/utils/abis/ESGICertificates";
import {
  ProgramDetails,
  PerformanceDetails,
} from "@/utils/interfaces/interfaces";

const PROGRAM_NFT_ADDRESS = process.env.NEXT_PUBLIC_ESGIPROGRAMNFT_ADDRESS;

type NFTDataType = readonly [string[], ProgramDetails[]];
type PerformanceDataType = readonly [string[], PerformanceDetails[]];

const useGetESGICertificates = (address?: `0x${string}`) => {
  const {
    data: nftData,
    isError,
    isLoading,
  } = useReadContract({
    abi: ESGICertificatesAbi,
    address: PROGRAM_NFT_ADDRESS as `0x${string}`,
    functionName: "getStudentNFTs",
    args: address ? [address] : undefined,
  } as const);

  const {
    data: performanceData,
    isError: isPerformanceError,
    isLoading: isPerformanceLoading,
  } = useReadContract({
    abi: ESGICertificatesAbi,
    address: process.env
      .NEXT_PUBLIC_ESGIPERFORMANCENFT_ADDRESS as `0x${string}`,
    functionName: "getStudentNFTs",
    args: address ? [address] : undefined,
  } as const);

  // Vérifiez le type des données avant de les utiliser
  const typedNftData = nftData as NFTDataType | undefined;
  const typedPerformanceData = performanceData as
    | PerformanceDataType
    | undefined;

  return {
    programDetails: typedNftData ? typedNftData[1] : [],
    performanceDetails: typedPerformanceData ? typedPerformanceData[1] : [],
    isLoading: isLoading || isPerformanceLoading,
    isError: isError || isPerformanceError,
  };
};

export default useGetESGICertificates;
