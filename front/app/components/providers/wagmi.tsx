'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiConfig as WagmiProvider, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

const metadata = {
  name: 'L3ARN Certificates',
  description: 'ESGI Academic Certificates Platform',
  url: 'https://l3arn.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, sepolia]
const wagmiConfig = createConfig({
  chains,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, metadata } })
  ],
})

createWeb3Modal({ wagmiConfig, projectId, chains })

export function WagmiConfig({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
}
