import { useState } from 'react'
import axios from 'axios'
import { Plus, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const WalletCreator = ({ onWalletCreated }) => {
  const [blockchain, setBlockchain] = useState('ethereum')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const createWallet = async () => {
    setIsCreating(true)
    setError('')
    setSuccess('')

    try {
      const response = await axios.post('http://localhost:3001/api/wallet/create', {
        blockchain
      })

      if (response.data.success) {
        const wallet = response.data.wallet
        onWalletCreated(wallet)
        setSuccess(`New ${blockchain} wallet created successfully!`)
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create wallet')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Blockchain Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Blockchain
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setBlockchain('ethereum')}
            className={`p-3 rounded-lg border-2 transition-all ${
              blockchain === 'ethereum'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="font-medium">Ethereum</span>
            </div>
          </button>
          
          <button
            onClick={() => setBlockchain('solana')}
            className={`p-3 rounded-lg border-2 transition-all ${
              blockchain === 'solana'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span className="font-medium">Solana</span>
            </div>
          </button>
        </div>
      </div>

      {/* Create Button */}
      <button
        onClick={createWallet}
        disabled={isCreating}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isCreating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Creating Wallet...</span>
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            <span>Create {blockchain} Wallet</span>
          </>
        )}
      </button>

      {/* Success Message */}
      {success && (
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 text-sm">{success}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 text-sm">{error}</span>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium mb-1">What you'll get:</p>
        <ul className="space-y-1">
          <li>• 24-word mnemonic phrase</li>
          <li>• Private key (keep secure!)</li>
          <li>• Public key & address</li>
          <li>• Derivation path</li>
        </ul>
      </div>
    </div>
  )
}

export default WalletCreator 