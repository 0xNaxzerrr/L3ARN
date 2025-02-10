import { useReadContract } from "wagmi";
import { ESGICertificatesAbi } from "@/utils/abis/ESGICertificates";

const PROGRAM_NFT_ADDRESS = process.env.NEXT_PUBLIC_ESGIPROGRAMNFT_ADDRESS;

const useGetProgramNFTs = (address?: `0x${string}`) => {
  const {
    data: nftData,
    isError,
    isLoading,
    error,
  } = useReadContract({
    abi: ESGICertificatesAbi,
    address: PROGRAM_NFT_ADDRESS as `0x${string}`,
    functionName: "getStudentNFTs",
    args: address ? [address] : undefined,
  });

  console.log("Program NFT Data:", nftData);
  console.log("Program Error:", error);

  return {
    programDetails: nftData ? (nftData as any)[1] : [],
    isLoading,
    isError,
  };
};

export default useGetProgramNFTs;
