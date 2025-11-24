import React from 'react'
import { motion } from 'framer-motion'
import { Download, Smartphone } from 'lucide-react'
import { usePWA } from '../../hooks/usePWA'

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, installApp } = usePWA()

  if (isInstalled || !isInstallable) {
    return null
  }

  const handleInstall = async () => {
    const success = await installApp()
    if (success) {
      console.log('App installed successfully!')
    }
  }

  return (
    <motion.button
      onClick={handleInstall}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Download className="h-5 w-5" />
      <span className="font-medium">Install App</span>
    </motion.button>
  )
}