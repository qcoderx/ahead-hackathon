import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WifiOff, Wifi } from 'lucide-react'
import { usePWA } from '../../hooks/usePWA'

const OfflineIndicator: React.FC = () => {
  const { isOnline } = usePWA()

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">Offline Mode</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OfflineIndicator