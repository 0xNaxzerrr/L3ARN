import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from '@reown/appkit/networks'


const customNetwork = defineChain({
  id: 43112,
  caipNetworkId: 'eip155:43112',
  chainNamespace: 'eip155',
  name: 'ESGI',
  nativeCurrency: {
    decimals: 18,
    name: 'ESGI',
    symbol: 'ESGI',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:62330/ext/bc/iM5F4iHYu1im6cTxS1pDTiCaqBeGq5AhSxMDYMvJtg3Ynx9Pc/rpc'],
      webSocket: ['WS_RPC_URL'],
    },
  },
  blockExplorers: {
    default: { name: 'Local ESGI Explorer', url: 'http://127.0.0.1:62330' },
  },
  contracts: {
    programNFT: { address: '0xFcDe4c93666f8F05CE08E937Dae7Bd8aC831d3D8'},
    performanceNFT: { address: '0xFB7B9b84BB91Ce70427ef29e17176596E7D1715e'}
  }
})

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = 'YOUR_PROJECT_ID'

// 2. Create a metadata object - optional
const metadata = {
  name: 'L3ARN',
  description: 'Blockchain certifications platforms',
  url: 'https://example.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [customNetwork],
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [customNetwork],
  projectId,
  metadata,
  features: {
    analytics: true
  }
})


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}