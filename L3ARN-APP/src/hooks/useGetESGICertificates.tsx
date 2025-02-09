import { useReadContract } from 'wagmi'
import { erc721ABI } from 'wagmi'

const PROGRAM_NFT_ADDRESS = '0xc3d9a5b0ccCf41595357578829ffd8b043b04870'
const PERFORMANCE_NFT_ADDRESS = '0xbA334A26f2d8302B56963f385Cf96d823E0AC70D'

// ABI pour les fonctions spécifiques de nos contrats
const programABI = [
  ...erc721ABI,
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'getProgramDetails',
    outputs: [{
      components: [
        { name: 'programName', type: 'string' },
        { name: 'startYear', type: 'uint256' },
        { name: 'endYear', type: 'uint256' },
        { name: 'status', type: 'string' }
      ],
      type: 'tuple'
    }],
    stateMutability: 'view',
    type: 'function'
  }
] as const

const performanceABI = [
  ...erc721ABI,
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'getAnnualPerformanceDetails',
    outputs: [{
      components: [
        { name: 'programTokenId', type: 'uint256' },
        { name: 'year', type: 'uint256' },
        { name: 'academicStatus', type: 'string' }
      ],
      type: 'tuple'
    }],
    stateMutability: 'view',
    type: 'function'
  }
] as const

type ProgramDetails = {
  programName: string
  startYear: number
  endYear: number
  status: string
  tokenId: number
}

type PerformanceDetails = {
  programTokenId: number
  year: number
  academicStatus: string
  tokenId: number
}

export function useGetESGICertificates(address: string | undefined) {
  // Récupérer les Program NFTs
  const { data: programBalance } = useReadContract({
    address: PROGRAM_NFT_ADDRESS,
    abi: programABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: !!address
  })

  const { data: performanceBalance } = useReadContract({
    address: PERFORMANCE_NFT_ADDRESS,
    abi: performanceABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: !!address
  })

  // Fonction pour récupérer les détails d'un Program NFT
  const useProgramDetails = (tokenId: number) => {
    return useReadContract({
      address: PROGRAM_NFT_ADDRESS,
      abi: programABI,
      functionName: 'getProgramDetails',
      args: [BigInt(tokenId)],
      enabled: tokenId !== undefined
    })
  }

  // Fonction pour récupérer les détails d'un Performance NFT
  const usePerformanceDetails = (tokenId: number) => {
    return useReadContract({
      address: PERFORMANCE_NFT_ADDRESS,
      abi: performanceABI,
      functionName: 'getAnnualPerformanceDetails',
      args: [BigInt(tokenId)],
      enabled: tokenId !== undefined
    })
  }

  return {
    programBalance: programBalance ? Number(programBalance) : 0,
    performanceBalance: performanceBalance ? Number(performanceBalance) : 0,
    useProgramDetails,
    usePerformanceDetails
  }
}
