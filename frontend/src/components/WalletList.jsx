import { Trash2, Wallet, ExternalLink } from 'lucide-react'

const WalletList = ({ wallets, onSelectWallet, onDeleteWallet, selectedWallet }) => {
  if (wallets.length === 0) {
    return (
      <div className="text-center py-8">
        <Wallet className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">No wallets created yet</p>
        <p className="text-sm text-gray-400 mt-1">Create your first wallet to get started</p>
      </div>
    )
  }

  const getBlockchainColor = (blockchain) => {
    return blockchain === 'ethereum' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
  }

  const getBlockchainIcon = (blockchain) => {
    return blockchain === 'ethereum' ? '🔵' : '🟣'
  }

  const formatAddress = (address) => {
    if (!address) return 'N/A'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="space-y-3">
      {wallets.map((wallet) => (
        <div
          key={wallet.id}
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
            selectedWallet?.id === wallet.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onSelectWallet(wallet)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getBlockchainColor(wallet.blockchain)}`}>
                {getBlockchainIcon(wallet.blockchain)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800 capitalize">
                    {wallet.blockchain} Wallet
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBlockchainColor(wallet.blockchain)}`}>
                    {wallet.blockchain}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-mono">
                  {formatAddress(wallet.address)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteWallet(wallet.id)
                }}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete wallet"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {wallet.createdAt && (
            <div className="mt-2 text-xs text-gray-400">
              Created: {new Date(wallet.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default WalletList 