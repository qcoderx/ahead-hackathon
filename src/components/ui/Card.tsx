import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { BaseComponentProps } from '@/types'

interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

/**
 * Flexible Card component with multiple variants and hover effects
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = false, children, ...props }, ref) => {
    const baseClasses = 'rounded-xl transition-all duration-200'
    
    const variants = {
      default: 'bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700',
      elevated: 'bg-white dark:bg-gray-800/50 shadow-lg border border-gray-200 dark:border-gray-700',
      outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700'
    }
    
    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-6'
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          paddings[padding],
          hover && 'hover:shadow-md hover:scale-[1.01] cursor-pointer',
          className
        )}
        whileHover={hover ? { y: -2 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card