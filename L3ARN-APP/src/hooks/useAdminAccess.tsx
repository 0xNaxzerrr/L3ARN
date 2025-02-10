// hooks/useAdminAccess.ts
import { useAccount } from "wagmi";

const ADMIN_ADDRESS =
  process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS ||
  "0x3095Bfe8173C3290525688aF4Cd15D9EA127f311";

export const useAdminAccess = () => {
  const { address } = useAccount();

  const isAdmin = address
    ? address.toLowerCase() === ADMIN_ADDRESS.toLowerCase()
    : false;

  return { isAdmin };
};
