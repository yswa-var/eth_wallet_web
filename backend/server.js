const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const bip39 = require('bip39');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Solana connection (using devnet for testing)
const solanaConnection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Wallet creation endpoints
app.post('/api/wallet/create', async (req, res) => {
  try {
    const { blockchain } = req.body;
    
    if (!blockchain || !['solana', 'ethereum'].includes(blockchain)) {
      return res.status(400).json({ error: 'Blockchain must be either "solana" or "ethereum"' });
    }

    // Generate mnemonic
    const mnemonic = bip39.generateMnemonic(256); // 24 words for better security
    
    let walletData = {
      mnemonic,
      blockchain,
      createdAt: new Date().toISOString()
    };

    if (blockchain === 'ethereum') {
      // Create Ethereum wallet
      const wallet = ethers.Wallet.fromPhrase(mnemonic);
      walletData = {
        ...walletData,
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey,
        address: wallet.address,
        derivationPath: "m/44'/60'/0'/0/0"
      };
    } else if (blockchain === 'solana') {
      // Create Solana wallet
      const seed = bip39.mnemonicToSeedSync(mnemonic);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));
      
      walletData = {
        ...walletData,
        privateKey: Buffer.from(keypair.secretKey).toString('hex'),
        publicKey: keypair.publicKey.toString(),
        address: keypair.publicKey.toString(),
        derivationPath: "m/44'/501'/0'/0'"
      };
    }

    res.json({
      success: true,
      wallet: walletData
    });
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ error: 'Failed to create wallet' });
  }
});

// Get wallet balance
app.get('/api/wallet/balance/:blockchain/:address', async (req, res) => {
  try {
    const { blockchain, address } = req.params;
    
    if (!blockchain || !['solana', 'ethereum'].includes(blockchain)) {
      return res.status(400).json({ error: 'Invalid blockchain' });
    }

    let balance = '0';

    if (blockchain === 'ethereum') {
      // For Ethereum, you'd typically use an RPC provider like Infura
      // For demo purposes, returning 0
      balance = '0';
    } else if (blockchain === 'solana') {
      try {
        const publicKey = new PublicKey(address);
        balance = await solanaConnection.getBalance(publicKey);
        balance = balance.toString();
      } catch (error) {
        balance = '0';
      }
    }

    res.json({
      success: true,
      balance,
      blockchain,
      address
    });
  } catch (error) {
    console.error('Error getting balance:', error);
    res.status(500).json({ error: 'Failed to get balance' });
  }
});

// Validate mnemonic
app.post('/api/wallet/validate-mnemonic', (req, res) => {
  try {
    const { mnemonic } = req.body;
    
    if (!mnemonic) {
      return res.status(400).json({ error: 'Mnemonic is required' });
    }

    const isValid = bip39.validateMnemonic(mnemonic);
    
    res.json({
      success: true,
      isValid
    });
  } catch (error) {
    console.error('Error validating mnemonic:', error);
    res.status(500).json({ error: 'Failed to validate mnemonic' });
  }
});

// Import wallet from mnemonic
app.post('/api/wallet/import', async (req, res) => {
  try {
    const { mnemonic, blockchain } = req.body;
    
    if (!mnemonic || !blockchain) {
      return res.status(400).json({ error: 'Mnemonic and blockchain are required' });
    }

    if (!bip39.validateMnemonic(mnemonic)) {
      return res.status(400).json({ error: 'Invalid mnemonic' });
    }

    let walletData = {
      mnemonic,
      blockchain,
      importedAt: new Date().toISOString()
    };

    if (blockchain === 'ethereum') {
      const wallet = ethers.Wallet.fromPhrase(mnemonic);
      walletData = {
        ...walletData,
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey,
        address: wallet.address,
        derivationPath: "m/44'/60'/0'/0/0"
      };
    } else if (blockchain === 'solana') {
      const seed = bip39.mnemonicToSeedSync(mnemonic);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));
      
      walletData = {
        ...walletData,
        privateKey: Buffer.from(keypair.secretKey).toString('hex'),
        publicKey: keypair.publicKey.toString(),
        address: keypair.publicKey.toString(),
        derivationPath: "m/44'/501'/0'/0'"
      };
    }

    res.json({
      success: true,
      wallet: walletData
    });
  } catch (error) {
    console.error('Error importing wallet:', error);
    res.status(500).json({ error: 'Failed to import wallet' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Wallet backend server running on port ${PORT}`);
}); 