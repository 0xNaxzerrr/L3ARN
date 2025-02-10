import { useReadContract } from "wagmi";
import { ESGICertificatesAbi } from "@/utils/abis/ESGICertificates";

const PROGRAM_NFT_ADDRESS = process.env.NEXT_PUBLIC_ESGIPROGRAMNFT_ADDRESS;

const useGetProgramDetailsByTokenId = (tokenId?: number) => {
  const {
    data: nftData,
    isError,
    isLoading,
    error,
  } = useReadContract({
    abi: ESGICertificatesAbi,
    address: PROGRAM_NFT_ADDRESS as `0x${string}`,
    functionName: "getProgramDetails",
    args: tokenId !== undefined ? [BigInt(tokenId)] : undefined,
  });

  console.log("Program Details by Token ID:", nftData);
  console.log("Program Error:", error);

  return {
    programDetails: nftData ? [nftData] : [],
    isLoading,
    isError,
  };
};

export default useGetProgramDetailsByTokenId;
