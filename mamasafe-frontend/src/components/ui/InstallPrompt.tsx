import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X } from 'lucide-react'
import { usePWA } from '../../hooks/usePWA'

interface InstallPromptProps {
  onDismiss?: () => void
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ onDismiss }) => {
  const { isInstallable, installApp } = usePWA()
  const [dismissed, setDismissed] = React.useState(false)

  const handleInstall = () => {
    installApp()
    setDismissed(true)
    onDismiss?.()
  }

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      {isInstallable && !dismissed && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Install MamaSafe</h3>
                <p className="text-sm text-gray-600">Get quick access and work offline</p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Later
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InstallPrompt