import { useContract as useWagmiContract, useAccount } from 'wagmi';
import { CERTIFICATE_CONTRACT_ADDRESS, CERTIFICATE_CONTRACT_ABI } from '@/lib/contract';

export function useContract() {
  const { address } = useAccount();

  const contract = useWagmiContract({
    address: CERTIFICATE_CONTRACT_ADDRESS as `0x${string}`,
    abi: CERTIFICATE_CONTRACT_ABI,
  });

  return { contract, address };
}
