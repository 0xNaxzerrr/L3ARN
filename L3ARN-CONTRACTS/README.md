# L3ARN 🎓

A blockchain-based academic certification system that issues and manages both Program NFTs and Annual Performance NFTs for ESGI students.

## Overview 📋

This project consists of two main smart contracts:
- `ESGIProgramNFT`: Manages overall program certificates
- `ESGIAnnualPerformanceNFT`: Handles annual academic performance certificates

## Features ✨

### Program NFT
- Represents the complete academic program
- Tracks program status (ACTIVE/SUCCESS/REVOKED)
- Stores academic progress records
- Links to IPFS metadata

### Annual Performance NFT
- Records detailed course performance
- Tracks individual grades and comments
- Stores course-specific achievements
- Links academic performance to program NFTs

## Contract Addresses 🏠

**ESGI Test Network**
- Program NFT: `0x1d453b35cd5b105Dbf040ccf030c79E56B278ca9`
- Performance NFT: `0x2a330a7D678D549c9F88aAA518F458bD2F4FDf12`

## Prerequisites 🛠

- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Node.js](https://nodejs.org/) (>= 14.0.0)
- Git

## Installation 📦

```bash
# Clone the repository
git clone <your-repo-url>
cd L3ARN-CONTRACTS

# Install dependencies
forge install
```


## Configuration ⚙️ 

1. Create a .env file:

```bash
RPC_URL=your_rpc_url
PRIVATE_KEY=your_private_key
CHAIN_ID=your_chain_id
```

2. Configure foundry.toml

```bash
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
remappings = [
    "@openzeppelin/=lib/openzeppelin-contracts/",
    "ds-test/=lib/forge-std/lib/ds-test/src/",
    "forge-std/=lib/forge-std/src/",
]
viaIr = true
optimizer = true
optimizer_runs = 200

[rpc_endpoints]
esgi = "${RPC_URL}"
```

## Deployment 🚀

```bash
# Deploy contracts
forge script script/Deploy.s.sol:DeployESGICertificates \
    --rpc-url $RPC_URL \
    --private-key $PRIVATE_KEY \
    --broadcast \
    -vvvv
```

## Testing 🧪
```bash
# Run all tests
forge test

# Run tests with gas reporting
forge test --gas-report

# Run tests with specific verbosity
forge test -vvvv

# Run coverage
forge coverage --via-ir
```

## Reference

### ESGIProgramNFT Methods

- mintProgramNFT: Mint a new program certificate
- updateProgramStatus: Update program status
- getProgramDetails: Get program details
- getStudentNFTs: Get all NFTs owned by a student

### ESGIAnnualPerformanceNFT Methods

- mintAnnualPerformanceNFT: Mint a new performance certificate
- updateAcademicStatus: Update academic status
- getAnnualPerformanceDetails: Get performance details
- getStudentNFTCount: Get number of NFTs owned by a student

## License 📜
MIT