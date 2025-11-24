import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { InputProps } from '@/types'

/**
 * Reusable Input component with label, error states, and animations
 * Fully accessible with proper ARIA attributes
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    id, 
    name, 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    onFocus, 
    onBlur, 
    disabled = false, 
    error, 
    label, 
    required = false,
    ...props 
  }, ref) => {
    const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-gray-700 dark:text-white text-base font-medium leading-normal"
          >
            {label}
            {required && <span className="text-mama-critical ml-1">*</span>}
          </label>
        )}
        
        <motion.input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId}
          className={cn(
            'flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-mama-blue border bg-white dark:bg-[#193322] focus:border-mama-blue dark:focus:border-mama-blue h-14 placeholder:text-gray-400 dark:placeholder:text-[#92c9a4] p-4 text-base font-normal leading-normal transition-all duration-200',
            error 
              ? 'border-mama-critical focus:ring-mama-critical' 
              : 'border-gray-300 dark:border-[#326744]',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        
        {error && (
          <motion.p
            id={errorId}
            className="text-mama-critical text-sm font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input