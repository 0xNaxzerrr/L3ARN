# L3ARN Frontend

Frontend application for the L3ARN Certificate Management System. This application allows students and administrators to manage academic certificates stored on the blockchain.

## Features

- Connect with Web3 wallet (WalletConnect)
- View and verify academic certificates
- Issue new certificates (admin only)
- Revoke existing certificates (admin only)
- Modern and responsive UI

## Prerequisites

- Node.js 18+
- Yarn or npm
- MetaMask or any WalletConnect compatible wallet

## Installation

1. Clone the repository:
```bash
git clone https://github.com/0xNaxzerrr/L3ARN.git
cd L3ARN/front
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address
```

4. Start the development server:
```bash
yarn dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
app/
├── layout.tsx           # Root layout with providers
├── page.tsx             # Home page
├── admin/               # Admin section
├── student/             # Student certificate view
├── verify/              # Certificate verification
├── components/          # Reusable components
├── lib/                 # Utilities and configurations
└── hooks/               # Custom React hooks
```

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- wagmi
- WalletConnect
- Lucide Icons

## Contributing

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git commit -m "Add some feature"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

## License

MIT
