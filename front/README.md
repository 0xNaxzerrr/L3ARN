# L3ARN Frontend Application

Interface utilisateur pour la plateforme de gestion des certificats académiques NFT de l'ESGI.

## Technologies Utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Pour un développement typé et plus sûr
- **Tailwind CSS** - Pour le styling et le design system
- **shadcn/ui** - Composants UI réutilisables
- **ethers.js** - Interaction avec la blockchain
- **Core Wallet** - Gestion des wallets et connexion blockchain

## Configuration Requise

- Node.js >= 18.x
- npm >= 9.x
- Core Wallet installé dans le navigateur

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/0xNaxzerrr/L3ARN.git
cd L3ARN/front
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer le fichier de configuration :
```bash
cp .env.example .env.local
```

4. Configurer les variables d'environnement dans `.env.local` :
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=votre_adresse_de_contrat
NEXT_PUBLIC_RPC_URL=url_de_votre_subnet
```

## Développement

Lancer le serveur de développement :
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## Structure du Projet

```
front/
├── app/                  # Routes et pages de l'application
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base (shadcn/ui)
│   └── ...             # Autres composants
├── hooks/              # Custom hooks React
├── lib/                # Utilitaires et configurations
├── types/              # Types TypeScript
└── public/             # Assets statiques
```

## Fonctionnalités Principales

- **Connexion Wallet** - Intégration avec Core Wallet
- **Dashboard Admin** - Gestion des certificats
- **Interface Étudiant** - Visualisation des certificats
- **Système de Rôles** - Différents niveaux d'accès
- **Gestion des NFTs** - Interface pour mint et révoquer des certificats

## Tests

Lancer les tests :
```bash
npm run test
```

## Build de Production

Créer une build de production :
```bash
npm run build
```

Lancer la version de production :
```bash
npm start
```

## Convention de Code

- **Commits** : Suivre la convention [Conventional Commits](https://www.conventionalcommits.org/)
- **Style de Code** : Configuration ESLint et Prettier fournie
- **TypeScript** : Strict mode activé

## Notes de Développement

- Toujours connecter le wallet au bon subnet (ChainID: 99999)
- Utiliser les composants shadcn/ui pour la cohérence du design
- Suivre les patterns de state management établis

## Connexion au Subnet

Pour connecter Core Wallet au subnet ESGI :

1. Ouvrir Core Wallet
2. Ajouter un nouveau réseau :
   - Name: ESGI
   - RPC URL: http://127.0.0.1:40679/ext/bc/2jD94QhBWwFPfjgKkDjqZdXMAmPvnzC75UVAUxU4iGmsT8MSmT/rpc
   - Chain ID: 99999
   - Symbol: AVAX

## Problèmes Courants

1. **Erreur de connexion au wallet**
   - Vérifier que Core Wallet est installé
   - Vérifier la configuration du réseau

2. **Transactions échouées**
   - Vérifier le solde AVAX
   - Vérifier la connexion au bon subnet

## Support et Contact

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement