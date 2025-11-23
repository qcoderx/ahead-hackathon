import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, Calendar, FileText } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'

interface DashboardShortcutsProps {
  onNewPatient?: () => void
  onAppointments?: () => void
  onReports?: () => void
}

const DashboardShortcuts: React.FC<DashboardShortcutsProps> = ({
  onNewPatient,
  onAppointments,
  onReports
}) => {
  const { t } = useTranslation()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  const shortcuts = [
    {
      icon: UserPlus,
      label: t('dashboard.newPatient'),
      onClick: onNewPatient,
      delay: 0.6,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      icon: Calendar,
      label: t('dashboard.appointments'),
      onClick: onAppointments,
      delay: 0.7,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100'
    },
    {
      icon: FileText,
      label: t('dashboard.reports'),
      onClick: onReports,
      delay: 0.8,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100'
    }
  ]

  const handleClick = (index: number, onClick?: () => void) => {
    setClickedIndex(index)
    setTimeout(() => setClickedIndex(null), 300)
    onClick?.()
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
    >
      <motion.h3 
        className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em] px-0 pb-3 pt-2"
        animate={{ 
          background: [
            'linear-gradient(45deg, #111827, #10b77f)',
            'linear-gradient(45deg, #10b77f, #111827)'
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text' }}
      >
        {t('dashboard.shortcuts')}
      </motion.h3>
      
      <div className="grid grid-cols-3 gap-4 text-center p-3">
        {shortcuts.map((shortcut, index) => (
          <motion.div
            key={shortcut.label}
            className="relative flex flex-col items-center space-y-3"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: shortcut.delay, 
              duration: 0.6,
              type: 'spring',
              stiffness: 100
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >

            
            <motion.button
              className="relative flex items-center justify-center h-12 w-12 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mx-auto"
              onClick={() => handleClick(index, shortcut.onClick)}
              whileHover={{ 
                scale: 1.05
              }}
              whileTap={{ 
                scale: 0.95
              }}
            >
              {/* Background shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: hoveredIndex === index ? [-100, 100] : -100
                }}
                transition={{
                  duration: 1.5,
                  repeat: hoveredIndex === index ? Infinity : 0,
                  ease: 'linear'
                }}
              />
              
              <shortcut.icon className="h-5 w-5" />
              
              {/* Click ripple effect */}
              <AnimatePresence>
                {clickedIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-white/30 rounded-2xl"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
              

            </motion.button>
            
            <span className="text-gray-600 text-xs font-medium mt-2">
              {shortcut.label}
            </span>
            
            {/* Floating label effect */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  Click to {shortcut.label.toLowerCase()}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default DashboardShortcuts