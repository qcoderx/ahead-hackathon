import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, Wifi } from 'lucide-react'
import { useOffline } from '../../hooks/useOffline'

export const OfflineIndicator: React.FC = () => {
  const { isOnline, wasOffline } = useOffline()

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">Offline - Using cached data</span>
        </motion.div>
      )}
      {isOnline && wasOffline && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          onAnimationComplete={() => {
            setTimeout(() => {
              // Auto-hide after 3 seconds
            }, 3000)
          }}
        >
          <Wifi className="h-4 w-4" />
          <span className="text-sm font-medium">Back online - Syncing data</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}