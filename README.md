# Subnet ESGI - Configuration et Installation

Ce subnet est conçu pour la gestion des certificats académiques de l'ESGI utilisant des NFTs dynamiques.

## Configuration du Subnet

### Paramètres Principaux
- **Nom du Subnet** : ESGI
- **Virtual Machine** : Subnet-EVM v0.7.0
- **Mode de Validation** : Proof of Authority
- **Chain ID** : 43113
- **Token Symbol** : AVAX

### Adresses Importantes
1. **Comptes Principaux**
   - Main Account (ewoq): `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`
     - Balance: 1,000,000 AVAX
     - Private Key: `56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`
   
   - Validator Manager Owner: `0x5c652596dbe51ed3d5DDA47f2790236FB6c77537`
     - Balance: 10 AVAX

2. **Smart Contracts**
   - PoA Validator Manager: `0x0C0DEbA5E0000000000000000000000000000000`
   - Transparent Proxy: `0x0Feedc0de0000000000000000000000000000000`
   - Proxy Admin: `0xC0fFEE1234567890aBCdeF1234567890abcDef34`

## Installation et Déploiement

1. **Prérequis**
   ```bash
   # Installation du CLI Avalanche
   curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh
   ```

2. **Création du Subnet**
   ```bash
   avalanche subnet create ESGI
   ```

3. **Déploiement Local**
   ```bash
   avalanche subnet deploy ESGI --local
   ```

4. **Vérification de la Configuration**
   ```bash
   avalanche blockchain describe ESGI
   ```

## Configuration de Core Wallet
- Installer Core depuis : https://core.app/
- Connecter Core à Avalanche
- Pour le développement local:
  - Réseau: Local Network
  - RPC URL: [À remplir après déploiement]
  - Chain ID: 43113
  - Symbol: AVAX
- RPC URL: [À remplir après déploiement]
- Chain ID: 43113
- Symbol: AVAX
- Explorer: [À remplir après déploiement]

## Configuration du Wallet

### Core Wallet (Recommandé pour Avalanche)
1. **Installation**
   - Télécharger Core depuis https://core.app/
   - Installer l'extension du navigateur
   - Créer ou importer un wallet

2. **Import des comptes de test**
   - Ouvrir Core Wallet
   - Cliquer sur les paramètres > "Manage Keys"
   - Importer la clé privée : `56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027`

3. **Connexion au Subnet Local**
   - Ajouter un nouveau réseau
   - Utiliser les paramètres du déploiement local
   - Vérifier la connexion avec le solde de test

## Notes Importantes
- Le subnet utilise Proof of Authority pour la validation
- Les transactions sont validées par des validateurs autorisés
- Le gas est configuré pour un débit faible (12 mil gas par bloc)
- L'interopérabilité avec d'autres blockchains est activée

## Développement
- Les smart contracts peuvent être déployés par n'importe quel utilisateur
- Les frais de transaction sont brûlés
- L'approvisionnement du token natif est plafonné

## Commandes Utiles
```bash
# Déploiement local
avalanche subnet deploy ESGI --local

# Description du blockchain
avalanche blockchain describe ESGI

# Status du subnet
avalanche subnet status ESGI
```