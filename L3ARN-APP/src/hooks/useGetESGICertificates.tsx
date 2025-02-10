import { useReadContract } from 'wagmi'
import { ESGICertificatesAbi } from '@/utils/abis/ESGICertificates'

const PROGRAM_NFT_ADDRESS = process.env.NEXT_PUBLIC_ESGIPROGRAMNFT_ADDRESS
interface ProgramDetails {
  programName: string
  startYear: bigint
  endYear: bigint
  status: string
}

/**
 * Hook pour récupérer les détails des certificats ESGI
 * @param address - Adresse du wallet de l'étudiant (optionnel)
 */
const useGetESGICertificates = (tokenId?: number, address?: string) => {
  // Récupérer les détails d'un programme spécifique
  const { data: programDetails, isError, isLoading } = useReadContract({
    abi: ESGICertificatesAbi,
    address: PROGRAM_NFT_ADDRESS as `0x${string}`,
    functionName: 'getProgramDetails',
    args: tokenId !== undefined ? [BigInt(tokenId)] : undefined,
  })


  return {
    // Données
    programDetails: programDetails as ProgramDetails | undefined,

    
    // État
    isLoading,
    isError,
  }
}

export default useGetESGICertificates