import React from 'react'
import { motion } from 'framer-motion'
import { Download, X, Smartphone } from 'lucide-react'
import { usePWA } from '../../hooks/usePWA'
import Button from './Button'

interface PWAInstallPromptProps {
  onClose: () => void
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onClose }) => {
  const { installApp, isInstallable } = usePWA()

  const handleInstall = async () => {
    const success = await installApp()
    if (success) {
      onClose()
    }
  }

  if (!isInstallable) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-t-2xl w-full max-w-md p-6 shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Install MamaSafe</h3>
              <p className="text-sm text-gray-600">Add to home screen</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Install MamaSafe for quick access to medication safety checks, even when offline.
          </p>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Works offline for critical features</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Faster loading and better performance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Push notifications for emergency alerts</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Not Now
          </Button>
          <Button 
            variant="primary" 
            onClick={handleInstall}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Install
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PWAInstallPrompt