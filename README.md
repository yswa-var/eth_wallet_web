# Web Wallet - Solana & Ethereum

A modern web-based wallet application that supports creating and managing Solana and Ethereum wallets. Built with React, Vite, Express.js, and blockchain libraries.

[]

## Features

- 🪙 **Multi-Blockchain Support**: Create wallets for both Solana and Ethereum
- 🔐 **Secure Key Generation**: Generate 24-word mnemonic phrases using BIP39
- 📱 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- 🔑 **Key Management**: View and copy private keys, public keys, and addresses
- 💾 **Local Storage**: Wallets are saved locally in your browser
- 🛡️ **Security Features**: Private key masking and security warnings

## Tech Stack

### Backend

- **Express.js** - Node.js web framework
- **@solana/web3.js** - Solana blockchain integration
- **ethers** - Ethereum blockchain integration
- **bip39** - Mnemonic phrase generation
- **crypto-js** - Cryptographic utilities

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd eth_wallet_web
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on `http://localhost:3001`

2. **Start the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to use the wallet application

## Usage

### Creating a Wallet

1. **Select Blockchain**: Choose between Ethereum or Solana
2. **Click "Create Wallet"**: This will generate a new wallet with:
   - 24-word mnemonic phrase
   - Private key
   - Public key
   - Wallet address
   - Derivation path

### Managing Wallets

- **View Wallets**: All created wallets are displayed in the middle panel
- **Select Wallet**: Click on any wallet to view its details
- **Delete Wallet**: Use the trash icon to remove wallets
- **Copy Information**: Use the copy buttons to copy addresses, keys, and phrases

### Security Features

- **Private Key Masking**: Private keys are hidden by default
- **Copy to Clipboard**: Secure copying of sensitive information
- **Security Warnings**: Clear warnings about keeping keys safe
- **Local Storage**: Wallets are stored locally in your browser

## API Endpoints

### Backend API (Port 3001)

- `POST /api/wallet/create` - Create a new wallet
- `GET /api/wallet/balance/:blockchain/:address` - Get wallet balance
- `POST /api/wallet/validate-mnemonic` - Validate mnemonic phrase
- `POST /api/wallet/import` - Import wallet from mnemonic
- `GET /api/health` - Health check

## Project Structure

```
eth_wallet_web/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletCreator.jsx
│   │   │   ├── WalletList.jsx
│   │   │   └── WalletDetails.jsx
│   │   ├── App.jsx        # Main application
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
└── README.md
```

## Security Considerations

⚠️ **Important Security Notes**:

1. **This is a demo application** - Do not store real funds in wallets created by this app
2. **Private keys are stored in browser** - They are not encrypted by default
3. **Local storage** - Wallets persist in your browser's localStorage
4. **No server-side storage** - All wallet data is client-side only
5. **Use hardware wallets** - For real funds, consider using hardware wallets

## Development

### Backend Development

```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend
npm run dev  # Starts Vite dev server
```

### Building for Production

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Use at your own risk.

## Support

For issues or questions, please open an issue in the repository.
