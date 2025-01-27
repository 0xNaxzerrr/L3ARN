# L3ARN - Certificats Académiques NFT ESGI

Système de gestion des certificats académiques basé sur la blockchain Avalanche utilisant des NFTs dynamiques.

## Structure du Projet

```
L3ARN/
├── contracts/               # Smart contracts Solidity
│   ├── src/                # Code source des contrats
│   ├── test/               # Tests des contrats
│   ├── script/             # Scripts de déploiement
│   └── lib/                # Dépendances Foundry
│
└── front/                  # Application frontend
    ├── src/               
    ├── public/            
    └── components/         
```

## Subnet Avalanche ESGI

### Informations de Déploiement Local

#### Paramètres de Connexion Core Wallet
- **Network Name**: ESGI
- **RPC URL**: http://127.0.0.1:40679/ext/bc/2jD94QhBWwFPfjgKkDjqZdXMAmPvnzC75UVAUxU4iGmsT8MSmT/rpc
- **Chain ID**: 99999
- **Symbol**: AVAX
- **Token Name**: AVAX Token

#### Identifiants du Subnet
- **Subnet ID**: 7ELK83TmkxE17TSALxeQH7mGErDV9kpp1hX4hmvvdcuNBDbS7
- **Blockchain ID (CB58)**: 2jD94QhBWwFPfjgKkDjqZdXMAmPvnzC75UVAUxU4iGmsT8MSmT
- **VM ID**: XXpfuQdvmhZiZ128E1bXJsiR4JJHGLpw5YSvVRWtgHGUv1osd

#### Comptes de Test
1. **Compte Principal (ewoq)**
   - Adresse: 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
   - Clé Privée: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
   - Balance: 1,000,000 AVAX

2. **Validator Manager Owner**
   - Adresse: 0x5c652596dbe51ed3d5DDA47f2790236FB6c77537
   - Balance: 10 AVAX

3. **ICM Account**
   - Adresse: 0x2875618c9bAeE0C1e487f411327396619D7DF0A5
   - Balance: 600 AVAX

#### Smart Contracts Déployés
- **PoA Validator Manager**: 0x0C0DEbA5E0000000000000000000000000000000
- **Transparent Proxy**: 0x0Feedc0de0000000000000000000000000000000
- **Proxy Admin**: 0xC0fFEE1234567890aBCdeF1234567890abcDef34
- **ICM Messenger**: 0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf
- **ICM Registry**: 0xC8dDDA89bd171a19a708cb18E626c68DEDA4BadE

## Installation et Configuration

### Prérequis
1. **Avalanche CLI**
```bash
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh
```

2. **Core Wallet**
- Télécharger depuis https://core.app/
- Installer l'extension du navigateur

3. **Foundry (pour les smart contracts)**
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

4. **Node.js et npm (pour le frontend)**
- Node.js >= 18.x
- npm >= 9.x

### Configuration du Projet

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/L3ARN.git
cd L3ARN
```

2. **Installer les dépendances des smart contracts**
```bash
cd contracts
forge install
cd ..
```

3. **Installer les dépendances frontend**
```bash
cd front
npm install
cd ..
```

### Déploiement du Subnet Local

1. **Créer le subnet**
```bash
avalanche subnet create ESGI
# Choisir Subnet-EVM
# Choisir Proof of Authority
# Chain ID: 99999
```

2. **Déployer localement**
```bash
avalanche subnet deploy ESGI --local
```

### Configuration de Core Wallet

1. Ajouter un nouveau réseau:
   - Network Name: ESGI
   - RPC URL: http://127.0.0.1:40679/ext/bc/2jD94QhBWwFPfjgKkDjqZdXMAmPvnzC75UVAUxU4iGmsT8MSmT/rpc
   - Chain ID: 99999
   - Symbol: AVAX
   - Token Name: AVAX Token

2. Importer le compte de test:
   - Dans Core Wallet, aller dans Settings > "Manage Keys"
   - Importer la clé privée: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027

## Développement

### Smart Contracts
```bash
cd contracts

# Compiler les contrats
forge build

# Exécuter les tests
forge test

# Déployer sur le subnet local
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:40679/ext/bc/2jD94QhBWwFPfjgKkDjqZdXMAmPvnzC75UVAUxU4iGmsT8MSmT/rpc
```

### Frontend
```bash
cd front

# Démarrer en mode développement
npm run dev

# Build pour la production
npm run build
```

## Notes Importantes
- Le nœud local doit rester actif pour interagir avec le subnet
- Les données sont réinitialisées à chaque redémarrage du subnet
- Pour redémarrer le subnet: `avalanche subnet deploy ESGI --local`

## Logs et Debugging
- Logs des nœuds: `/home/naxzerrr/.avalanche-cli/local/ESGI-local-node-local-network/node1/logs`
- Backend controller: `/home/naxzerrr/.avalanche-cli/local/ESGI-local-node-local-network/server.log`

## Nodes Information
### Primary Nodes
- **Node1**: 
  - NodeID: NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg
  - Endpoint: http://127.0.0.1:9650
- **Node2**:
  - NodeID: NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ
  - Endpoint: http://127.0.0.1:9652

### L1 Node
- **Node1**:
  - NodeID: NodeID-7EbpPdPtX3f8m8QuQr8VWCN7dAzB881rx
  - Endpoint: http://127.0.0.1:40679

## License
[MIT](LICENSE)