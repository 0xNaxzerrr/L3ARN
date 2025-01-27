'use client';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig as WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// Vérifie si nous sommes côté client avant d'accéder à process.env
const projectId = typeof window !== 'undefined' 
  ? process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''
  : ''

const metadata = {
  name: 'L3ARN Certificates',
  description: 'ESGI Academic Certificates Platform',
  url: 'https://l3arn.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, sepolia]

// Créer la configuration uniquement côté client
const wagmiConfig = typeof window !== 'undefined'
  ? defaultWagmiConfig({ chains, projectId, metadata })
  : null

// Initialiser Web3Modal uniquement côté client
if (typeof window !== 'undefined' && wagmiConfig && projectId) {
  createWeb3Modal({ wagmiConfig, projectId, chains })
}

export function WagmiConfig({ children }: { children: React.ReactNode }) {
  // Rendu côté serveur sans WagmiProvider
  if (!wagmiConfig) {
    return <>{children}</>
  }

  // Rendu côté client avec WagmiProvider
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
}
