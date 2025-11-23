import React from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/sections/Sidebar'
import { MOCK_USER, NAVIGATION_ITEMS } from '@/constants'
import { BaseComponentProps } from '@/types'

interface AppLayoutProps extends BaseComponentProps {
  title?: string
  subtitle?: string
}

/**
 * Main application layout with sidebar and content area
 * Provides consistent structure across all pages
 */
const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  title = "Multi-Drug Interaction Analysis",
  subtitle = "Analyze potential interactions between multiple medications for a patient.",
  className 
}) => {
  const handleNavigation = (href: string) => {
    console.log('Navigate to:', href)
    // In a real app, this would use React Router or Next.js router
  }

  const handleNewPatient = () => {
    console.log('New patient clicked')
    // Handle new patient creation
  }

  const handleHelp = () => {
    console.log('Help clicked')
    // Handle help/support
  }

  const handleLogout = () => {
    console.log('Logout clicked')
    // Handle user logout
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        user={MOCK_USER}
        navigationItems={NAVIGATION_ITEMS}
        onNavigate={handleNavigation}
        onNewPatient={handleNewPatient}
        onHelp={handleHelp}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 p-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            className="flex flex-wrap justify-between gap-3 pb-6 border-b border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-gray-800 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                {title}
              </h1>
              <p className="text-gray-500 dark:text-[#92c9a4] text-base font-normal leading-normal">
                {subtitle}
              </p>
            </div>
          </motion.div>

          {/* Page Content */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default AppLayout