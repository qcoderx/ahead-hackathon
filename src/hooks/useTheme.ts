import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

/**
 * Custom hook for managing theme state with system preference detection
 * Persists theme preference in localStorage
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system'
    }
    return 'system'
  })

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    
    const updateTheme = () => {
      let newResolvedTheme: 'light' | 'dark'
      
      if (theme === 'system') {
        newResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? 'dark' 
          : 'light'
      } else {
        newResolvedTheme = theme
      }
      
      setResolvedTheme(newResolvedTheme)
      
      root.classList.remove('light', 'dark')
      root.classList.add(newResolvedTheme)
      
      // Store the theme preference
      localStorage.setItem('theme', theme)
    }

    updateTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return 'light'
    })
  }

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme
  }
}