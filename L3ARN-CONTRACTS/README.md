# L3ARN - Blockchain Academic Certification Platform

## Project Overview

L3ARN is an innovative blockchain-based platform designed to revolutionize academic certification through decentralized, verifiable, and immutable digital certificates. By leveraging Avalanche subnet technology and smart contracts, L3ARN provides a secure and transparent solution for issuing, managing, and validating academic credentials.

## Key Features

- 🎓 Decentralized Academic Certificates
- 🔒 Immutable and Verifiable Credentials
- 🌐 Avalanche Subnet Integration
- 🚀 NFT-Based Certificate Management
- 🔐 Role-Based Access Control

## Prerequisites

### Software Requirements
- [Avalanche CLI](https://docs.avax.network/subnets/install-avalanche-cli)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/) (v16+)
- [Cast](https://book.getfoundry.sh/reference/cast)

### System Requirements
- 8GB RAM
- 4 CPU Cores
- 50GB SSD Storage
- macOS, Linux, or Windows (WSL2)

## Installation Steps

### 1. Install Avalanche CLI
```bash
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

### 2. Install Foundry
```bash
curl -L https://foundry.paradigm.xyz | bash
source ~/.bashrc
foundryup
```

### 3. Clone the L3ARN Repository
```bash
git clone https://github.com/your-username/L3ARN.git
cd L3ARN
```

## Blockchain and Subnet Setup

### Create Subnet Configuration
```bash
# Create a new subnet
avalanche subnet create l3arn-subnet

# Follow the interactive prompts:
# - Choose SubnetEVM
# - Configure custom chain parameters
# - Set native token details
```

### Deploy Subnet Locally
```bash
# Deploy the subnet to local network
avalanche subnet deploy l3arn-subnet

# Select "Local" deployment option
# Note the RPC URL and blockchain details
```

## Smart Contract Development

### Install Dependencies
```bash
# Initialize Foundry project
forge init

# Install OpenZeppelin contracts
forge install OpenZeppelin/openzeppelin-contracts
```

### Compile Smart Contract
```bash
forge build
```

### Deploy Smart Contract
```bash
# Set your private key
export PRIVATE_KEY=your_private_key_here

# Deploy to local subnet
forge script script/DeployESGICertificate.s.sol:DeployESGICertificate \
  --rpc-url [LOCAL_SUBNET_RPC_URL] \
  --broadcast
```

## Interacting with the Contract

### Issue a Certificate
```bash
cast send [CONTRACT_ADDRESS] "issueCertificate(address,string,uint256,string,string,string)" \
  [RECIPIENT_ADDRESS] \
  "John Doe" \
  123456 \
  "Blockchain Development" \
  "A+" \
  "ipfs://metadata_uri" \
  --rpc-url [LOCAL_SUBNET_RPC_URL] \
  --private-key [YOUR_PRIVATE_KEY]
```

### Retrieve Certificate Details
```bash
# Get certificate data
cast call [CONTRACT_ADDRESS] "getCertificateData(uint256)(tuple)" 0

# Get student certificates
cast call [CONTRACT_ADDRESS] "getStudentCertificates(uint256)(uint256[])" 123456
```

## Subnet Management

### Stop Subnet
```bash
avalanche subnet stop l3arn-subnet
```

### Start Subnet
```bash
avalanche subnet start l3arn-subnet
```

## Security Considerations

- Never commit private keys to version control
- Use environment variables for sensitive data
- Implement proper access controls
- Regularly audit smart contract code

## Roadmap

- [ ] IPFS Integration
- [ ] Multi-Signature Certificate Issuance
- [ ] Cross-Subnet Verification
- [ ] Web Interface Development

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.