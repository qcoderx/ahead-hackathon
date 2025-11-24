import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  onClick?: () => void
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <motion.nav
      className="flex items-center space-x-2 text-sm text-gray-600 mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Home className="w-4 h-4" />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <motion.button
            className={`hover:text-primary transition-colors ${
              item.active ? 'text-primary font-medium' : 'text-gray-600'
            }`}
            onClick={item.onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
          </motion.button>
        </React.Fragment>
      ))}
    </motion.nav>
  )
}

export default Breadcrumb