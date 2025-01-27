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
- **RPC URL**: http://127.0.0.1:42835/ext/bc/2uaYY41AUuYD6tWMUkF8e8tnqN4LRd2ByhjMKE3vcUDYRQJ4gG/rpc
- **Chain ID**: 43113
- **Symbol**: AVAX
- **Token Name**: AVAX Token

#### Identifiants du Subnet
- **Subnet ID**: GEieSy2doZ96bpMo5CuHPaX1LvaxpKZ9C72L22j94t6YyUb6X
- **Blockchain ID (CB58)**: 2uaYY41AUuYD6tWMUkF8e8tnqN4LRd2ByhjMKE3vcUDYRQJ4gG
- **Blockchain ID (HEX)**: 0xfb14e6e3b8f6032369f7f4b90d40023911857fb7741f58a01ba38dccf7e79d1c
- **VM ID**: XXpfuQdvmhZiZ128E1bXJsiR4JJHGLpw5YSvVRWtgHGUv1osd

#### Comptes de Test
1. **Compte Principal (ewoq)**
   - Adresse: 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
   - Clé Privée: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
   - Balance: 1,000,000 AVAX

2. **Validator Manager Owner**
   - Adresse: 0x5c652596dbe51ed3d5DDA47f2790236FB6c77537
   - Balance: 10 AVAX

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
```

2. **Déployer localement**
```bash
avalanche subnet deploy ESGI --local
```

### Configuration de Core Wallet

1. Ouvrir Core Wallet et ajouter un nouveau réseau:
   - Nom du réseau: ESGI
   - URL RPC: http://127.0.0.1:42835/ext/bc/2uaYY41AUuYD6tWMUkF8e8tnqN4LRd2ByhjMKE3vcUDYRQJ4gG/rpc
   - Chain ID: 43113
   - Symbol: AVAX
   - Nom du Token: AVAX Token

2. Importer le compte de test:
   - Dans Core Wallet, aller dans Paramètres > "Manage Keys"
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
forge script script/Deploy.s.sol --rpc-url http://127.0.0.1:42835/ext/bc/2uaYY41AUuYD6tWMUkF8e8tnqN4LRd2ByhjMKE3vcUDYRQJ4gG/rpc
```

### Frontend
```bash
cd front

# Démarrer en mode développement
npm run dev

# Build pour la production
npm run build
```

## Tests

### Smart Contracts
```bash
cd contracts
forge test
```

### Frontend
```bash
cd front
npm test
```

## Notes Importantes
- Le nœud local doit rester actif pour interagir avec le subnet
- Les données sont réinitialisées à chaque redémarrage du subnet
- Pour redémarrer le subnet: `avalanche subnet deploy ESGI --local`

## Logs et Debugging
- Logs des nœuds: `/home/naxzerrr/.avalanche-cli/local/ESGI-local-node-local-network/node1/logs`
- Backend controller: `/home/naxzerrr/.avalanche-cli/runs/server_20250127_121231/avalanche-cli-backend.log`

## License
[MIT](LICENSE)