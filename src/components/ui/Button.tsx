import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import { ButtonProps } from '@/types'

/**
 * Reusable Button component with multiple variants and states
 * Supports loading states, different sizes, and accessibility features
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    loading = false, 
    children, 
    onClick,
    type = 'button',
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-mama-blue text-white hover:bg-mama-blue/90 focus:ring-mama-blue',
      secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500',
      ghost: 'bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
      danger: 'bg-mama-critical text-white hover:bg-mama-critical/90 focus:ring-mama-critical'
    }
    
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-12 px-8 text-lg'
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button