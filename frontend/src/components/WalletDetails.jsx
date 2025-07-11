import { Copy, Eye, EyeOff, Shield, Key, Wallet, ExternalLink } from 'lucide-react'

const WalletDetails = ({ wallet, showPrivateKey, onTogglePrivateKey, onCopyToClipboard }) => {
  const formatMnemonic = (mnemonic) => {
    if (!mnemonic) return 'N/A'
    const words = mnemonic.split(' ')
    return words.map((word, index) => (
      <span key={index} className="inline-block bg-gray-100 px-2 py-1 rounded mr-1 mb-1 text-sm">
        {index + 1}. {word}
      </span>
    ))
  }

  const copyToClipboard = (text) => {
    onCopyToClipboard(text)
    // You could add a toast notification here
  }

  const getBlockchainColor = (blockchain) => {
    return blockchain === 'ethereum' ? 'text-blue-600' : 'text-purple-600'
  }

  const getBlockchainIcon = (blockchain) => {
    return blockchain === 'ethereum' ? '🔵' : '🟣'
  }

  return (
    <div className="space-y-4">
      {/* Wallet Header */}
      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${getBlockchainColor(wallet.blockchain)}`}>
          {getBlockchainIcon(wallet.blockchain)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 capitalize">
            {wallet.blockchain} Wallet
          </h3>
          <p className="text-sm text-gray-500">
            {wallet.createdAt ? new Date(wallet.createdAt).toLocaleDateString() : 'Unknown date'}
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <span className="font-mono text-sm flex-1">{wallet.address}</span>
          <button
            onClick={() => copyToClipboard(wallet.address, 'Address')}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy address"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Public Key */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Public Key</label>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <span className="font-mono text-sm flex-1">{wallet.publicKey}</span>
          <button
            onClick={() => copyToClipboard(wallet.publicKey, 'Public key')}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy public key"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Private Key */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Private Key</label>
          <button
            onClick={onTogglePrivateKey}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
          >
            {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showPrivateKey ? 'Hide' : 'Show'}</span>
          </button>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <span className="font-mono text-sm flex-1">
            {showPrivateKey ? wallet.privateKey : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
          </span>
          {showPrivateKey && (
            <button
              onClick={() => copyToClipboard(wallet.privateKey, 'Private key')}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy private key"
            >
              <Copy className="w-4 h-4" />
            </button>
          )}
        </div>
        {!showPrivateKey && (
          <p className="text-xs text-red-600 flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Keep your private key secure and never share it!</span>
          </p>
        )}
      </div>

      {/* Derivation Path */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Derivation Path</label>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <span className="font-mono text-sm flex-1">{wallet.derivationPath}</span>
          <button
            onClick={() => copyToClipboard(wallet.derivationPath, 'Derivation path')}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy derivation path"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mnemonic Phrase */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Mnemonic Phrase</label>
          <button
            onClick={() => copyToClipboard(wallet.mnemonic, 'Mnemonic phrase')}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
            title="Copy mnemonic phrase"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>
        </div>
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm">
            {formatMnemonic(wallet.mnemonic)}
          </div>
        </div>
        <p className="text-xs text-yellow-700 flex items-center space-x-1">
          <Key className="w-3 h-3" />
          <span>Write down these 24 words and keep them safe!</span>
        </p>
      </div>

      {/* Security Warning */}
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Shield className="w-5 h-5 text-red-600 mt-0.5" />
          <div className="text-sm text-red-800">
            <p className="font-medium mb-1">Security Warning</p>
            <ul className="space-y-1 text-xs">
              <li>• Never share your private key or mnemonic phrase</li>
              <li>• Store your mnemonic phrase in a secure location</li>
              <li>• This is a demo wallet - don't store real funds</li>
              <li>• Consider using hardware wallets for large amounts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletDetails 