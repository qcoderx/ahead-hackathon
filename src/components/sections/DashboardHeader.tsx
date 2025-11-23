import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Clock } from 'lucide-react'

interface DashboardHeaderProps {
  clinicName: string
  location: string
  userAvatar: string
  notificationCount?: number
  onNotificationClick?: () => void
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  clinicName,
  location,
  userAvatar,
  notificationCount = 0,
  onNotificationClick
}) => {
  const [currentTime, setCurrentTime] = useState(new Date())


  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)

    
    return () => {
      clearInterval(timer)

    }
  }, [])

  return (
    <motion.div
      className="relative flex items-center bg-gradient-to-r from-white via-gray-50 to-white p-4 pb-3 justify-between shadow-lg border-b border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      {/* Animated background particles */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #10b77f 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, #10b77f 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, #10b77f 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* User Avatar with status ring */}
      <motion.div 
        className="flex size-12 shrink-0 items-center justify-start relative"
        whileHover={{ scale: 1.1 }}
      >
        <motion.div 
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/30 shadow-lg"
          style={{ backgroundImage: `url("${userAvatar}")` }}
          animate={{ 
            boxShadow: [
              '0 0 0 0 rgba(16, 183, 127, 0.4)',
              '0 0 0 10px rgba(16, 183, 127, 0)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

      </motion.div>
      
      {/* Clinic Info with floating animation */}
      <motion.div 
        className="flex flex-col items-center flex-1 relative z-10"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.h2 
          className="text-gray-900 text-base font-bold leading-tight tracking-[-0.01em]"
        >
          {clinicName}
        </motion.h2>
        <p className="text-gray-600 text-sm font-normal">{location}</p>
        
        {/* Live time display */}
        <motion.div 
          className="flex items-center gap-1 text-xs text-gray-500 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Clock className="w-3 h-3" />
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </motion.div>
      </motion.div>
      
      {/* Notifications */}
      <div className="flex items-center gap-2 relative z-10">
        {/* Notification bell */}
        <motion.button
          className="relative flex cursor-pointer items-center justify-center rounded-full h-10 w-10 bg-gradient-to-br from-primary/10 to-primary/20 text-gray-900 hover:from-primary/20 hover:to-primary/30 transition-all"
          onClick={onNotificationClick}
          whileHover={{ 
            scale: 1.15,
            rotate: [0, -10, 10, -10, 0],
            transition: { rotate: { duration: 0.5 } }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Bell className="h-5 w-5" />
          </motion.div>
          
          <AnimatePresence>
            {notificationCount > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold shadow-lg"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -2, 0]
                }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ 
                  scale: { type: 'spring', stiffness: 500 },
                  y: { duration: 1, repeat: Infinity }
                }}
              >
                {notificationCount}
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* Notification pulse rings */}
          {notificationCount > 0 && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-500"
              animate={{
                scale: [1, 2, 2],
                opacity: [1, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default DashboardHeader