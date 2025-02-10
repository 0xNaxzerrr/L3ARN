import { useReadContract } from "wagmi";
import { ESGICertificatesAbi } from "@/utils/abis/ESGICertificates";

const PROGRAM_NFT_ADDRESS = process.env.NEXT_PUBLIC_ESGIPROGRAMNFT_ADDRESS;

/**
 * Hook to verify ESGI certificates
 * @param tokenId - Token ID of the certificate
 * @param address - Student wallet address (optional)
 */
const useVerifyESGICertificates = (tokenId?: number, address?: string) => {
  const {
    data: tokenExists,
    isError,
    isLoading,
  } = useReadContract({
    abi: ESGICertificatesAbi,
    address: PROGRAM_NFT_ADDRESS as `0x${string}`,
    functionName: "doesTokenExist",
    args: tokenId !== undefined ? [BigInt(tokenId)] : undefined,
  });

  return {
    tokenExists: tokenExists as boolean | undefined, // Typage explicite
    isLoading,
    isError,
  };
};

export { useVerifyESGICertificates };
