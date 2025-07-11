import { useState, useEffect } from 'react'
import WalletCreator from './components/WalletCreator'
import WalletList from './components/WalletList'
import WalletDetails from './components/WalletDetails'
import { Wallet, Shield, Key, Copy, Eye, EyeOff } from 'lucide-react'

function App() {
  const [wallets, setWallets] = useState([])
  const [selectedWallet, setSelectedWallet] = useState(null)
  const [showPrivateKey, setShowPrivateKey] = useState(false)

  // Load wallets from localStorage on component mount
  useEffect(() => {
    const savedWallets = localStorage.getItem('wallets')
    if (savedWallets) {
      setWallets(JSON.parse(savedWallets))
    }
  }, [])

  // Save wallets to localStorage whenever wallets state changes
  useEffect(() => {
    localStorage.setItem('wallets', JSON.stringify(wallets))
  }, [wallets])

  const addWallet = (wallet) => {
    setWallets(prev => [...prev, { ...wallet, id: Date.now() }])
  }

  const deleteWallet = (walletId) => {
    setWallets(prev => prev.filter(w => w.id !== walletId))
    if (selectedWallet?.id === walletId) {
      setSelectedWallet(null)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Wallet className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Web Wallet</h1>
          </div>
          <p className="text-gray-600 text-lg">Create and manage Solana & Ethereum wallets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet Creator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Key className="w-6 h-6 mr-2 text-blue-600" />
                Create Wallet
              </h2>
              <WalletCreator onWalletCreated={addWallet} />
            </div>
          </div>

          {/* Middle Column - Wallet List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-600" />
                My Wallets
              </h2>
              <WalletList 
                wallets={wallets}
                onSelectWallet={setSelectedWallet}
                onDeleteWallet={deleteWallet}
                selectedWallet={selectedWallet}
              />
            </div>
          </div>

          {/* Right Column - Wallet Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Wallet className="w-6 h-6 mr-2 text-purple-600" />
                Wallet Details
              </h2>
              {selectedWallet ? (
                <WalletDetails 
                  wallet={selectedWallet}
                  showPrivateKey={showPrivateKey}
                  onTogglePrivateKey={() => setShowPrivateKey(!showPrivateKey)}
                  onCopyToClipboard={copyToClipboard}
                />
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Wallet className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a wallet to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
