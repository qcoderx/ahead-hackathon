import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { User, NavigationItem } from '@/types'
import Button from '@/components/ui/Button'

interface SidebarProps {
  user: User
  navigationItems: NavigationItem[]
  onNavigate?: (href: string) => void
  onNewPatient?: () => void
  onHelp?: () => void
  onLogout?: () => void
}

const iconMap: Record<string, string> = {
  LayoutDashboard: 'dashboard',
  Users: 'groups',
  FlaskConical: 'science',
  FileText: 'summarize',
  Settings: 'settings',
  HelpCircle: 'help',
  LogOut: 'logout',
  UserPlus: 'person_add'
}

/**
 * Sidebar navigation component with user profile and navigation items
 * Includes smooth animations and hover effects
 */
const Sidebar: React.FC<SidebarProps> = ({
  user,
  navigationItems,
  onNavigate,
  onNewPatient,
  onHelp,
  onLogout
}) => {
  const containerVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  }

  return (
    <motion.aside
      className="flex h-screen min-h-[700px] flex-col justify-between bg-[#112217] p-4 w-64 sticky top-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-4">
        {/* User Profile */}
        <motion.div 
          className="flex gap-3 items-center"
          variants={itemVariants}
        >
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{ backgroundImage: `url("${user.avatar}")` }}
            role="img"
            aria-label={`Profile picture of ${user.name}`}
          />
          <div className="flex flex-col">
            <h1 className="text-white text-base font-medium leading-normal">
              {user.name}
            </h1>
            <p className="text-[#92c9a4] text-sm font-normal leading-normal">
              {user.clinic}
            </p>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item) => {
            const iconName = iconMap[item.icon as keyof typeof iconMap]
            
            return (
              <motion.a
                key={item.id}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200',
                  item.isActive
                    ? 'bg-[#23482f] text-white'
                    : 'text-white hover:bg-[#23482f]'
                )}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate?.(item.href)
                }}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span 
                  className="material-symbols-outlined"
                  style={item.isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {iconName}
                </span>
                <p className="text-sm font-medium leading-normal">
                  {item.label}
                </p>
              </motion.a>
            )
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <motion.div 
        className="flex flex-col gap-4"
        variants={itemVariants}
      >
        <button 
          className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#112217] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
          onClick={onNewPatient}
        >
          <span className="truncate">New Patient</span>
        </button>

        <div className="flex flex-col gap-1">
          <motion.a
            className="flex items-center gap-3 px-3 py-2 text-white hover:bg-[#23482f] rounded-lg transition-colors duration-200"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onHelp?.()
            }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-symbols-outlined">help</span>
            <p className="text-sm font-medium leading-normal">Help</p>
          </motion.a>

          <motion.a
            className="flex items-center gap-3 px-3 py-2 text-white hover:bg-[#23482f] rounded-lg transition-colors duration-200"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onLogout?.()
            }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="material-symbols-outlined">logout</span>
            <p className="text-sm font-medium leading-normal">Logout</p>
          </motion.a>
        </div>
      </motion.div>
    </motion.aside>
  )
}

export default Sidebar