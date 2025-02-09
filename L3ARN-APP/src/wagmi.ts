import { Chain } from "@rainbow-me/rainbowkit";
import { createConfig, http } from 'wagmi'
import { mainnet, avalanche } from 'wagmi/chains'


export const ESGI = {
  id: 43112,
  name: "ESGI",
  nativeCurrency: { name: "ESGI", symbol: "ESGI", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "http://127.0.0.1:62330/ext/bc/iM5F4iHYu1im6cTxS1pDTiCaqBeGq5AhSxMDYMvJtg3Ynx9Pc/rpc",
      ],
    },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  contracts: {
    programNFT: {
      address: "0xFcDe4c93666f8F05CE08E937Dae7Bd8aC831d3D8",
    },
    performanceNFT: {
      address: "0xFB7B9b84BB91Ce70427ef29e17176596E7D1715e",
    },
  },
} as const satisfies Chain;

export const config = createConfig({
  chains: [ESGI],
  transports: {
    [ESGI.id]: http(ESGI.rpcUrls.default.http[0]),
  },
})