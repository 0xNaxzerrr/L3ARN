# L3ARN APP

## 🎓 Overview
The ESGI NFT Platform is a comprehensive web application designed to manage and verify academic certificates as Non-Fungible Tokens (NFTs) on the blockchain. This platform provides a seamless interface for minting, updating, and verifying academic program and performance certificates.

## 🚀 Features

1. Certificate Management

Program NFT Minting: Create NFTs for academic programs
Performance NFT Minting: Generate NFTs for annual academic performance
Status Updates: Modify certificate statuses with comments
Verification System: Validate certificates using unique token IDs

2. User Interfaces

Admin Dashboard: Comprehensive management of NFTs
My Certificates: Personal certificate gallery
Certificate Verification: Easy certificate authentication

## 🛠 Technologies

1. Frontend

Next.js 14
React
TypeScript
Tailwind CSS
Shadcn/UI Components
Wagmi (Web3 Hooks)

2. Blockchain Integration

Solidity Smart Contracts
OpenZeppelin
IPFS (InterPlanetary File System)

## 📦 Prerequisites

Node.js (v18+)
pnpm or npm
Web3 Wallet (MetaMask recommended)

## 🔧 Installation

1. Clone the repository

```bash
git clone https://github.com/0xNaxzerrr/L3ARN
cd esgi-nft-platform
```

2. Install dependencies

```
pnpm install
# or
npm install
```

3. Set up environment variables. Create a .env.local file with:

```bash
#CONTRACT_ADDRESS
NEXT_PUBLIC_ESGIPROGRAMNFT_ADDRESS=
NEXT_PUBLIC_ESGIPERFORMANCENFT_ADDRESS=
NEXT_PUBLIC_ADMIN_WALLET_ADDRESS=

#PINATA
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_API_SECRET=
NEXT_PUBLIC_JWT=
NEXT_PUBLIC_GATEAWAY_URL=
```

4. Run the development server

```
pnpm dev
# or
npm run dev
```

## 🌐 Blockchain Contracts

- Program NFT Contract

Manages academic program certificates
Tracks program status
Supports academic progress records

- Performance NFT Contract

Tracks annual academic performance
Manages course-level details
Supports status updates

- Security

Ownership-based minting
Status updates restricted to contract owner
IPFS metadata storage
Immutable blockchain records

- Usage Workflow

1. Admin

Mint new Program or Performance NFTs
Update NFT statuses
Manage certificate lifecycle


2. Student

View personal certificates
Authenticate certificates


3. Verifier

Validate certificates using token ID
Check certificate authenticity

## 📄 License
Distributed under the MIT License. See LICENSE for more information.