import { useState } from 'react'
import { generateMnemonic } from "bip39";
import './App.css'
import { SolanaWallet } from './SolanaWallet'
import { EthWallet } from './EthWallet'

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <div>
        <h1>Ethereum & Solana Wallet Generator</h1>
        
        <div>
          <button onClick={async function() {
            const mn = await generateMnemonic();
            setMnemonic(mn)
          }}>
            Create Seed Phrase
          </button>
        </div>

        <div>
          <label>Mnemonic Phrase:</label>
          <input 
            type="text" 
            value={mnemonic} 
            readOnly
            style={{ width: '100%', marginTop: '10px', padding: '10px' }}
          />
        </div>

        {mnemonic && (
          <div>
            <div className="wallet-section">
              <h2>Solana Wallets</h2>
              <SolanaWallet mnemonic={mnemonic} />
            </div>
            
            <div className="wallet-section">
              <h2>Ethereum Wallets</h2>
              <EthWallet mnemonic={mnemonic} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
