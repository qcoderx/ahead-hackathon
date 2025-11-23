import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, User, Lock, Globe } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useAuth } from '../../hooks/useAuth'

interface AuthScreenProps {
  onLogin: () => void
  onRegister: () => void
  onSMSAccess: () => void
  onLanguageChange?: () => void
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onRegister, onSMSAccess, onLanguageChange }) => {
  const { t, currentLanguage, setLanguage } = useTranslation()
  const { loginUser, loading, error } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const languages = [
    { id: 'en', name: 'English' },
    { id: 'ha', name: 'Hausa' },
    { id: 'yo', name: 'Yoruba' },
    { id: 'ig', name: 'Igbo' }
  ]

  const handleLogin = async () => {
    try {
      await loginUser(username, password)
      onLogin()
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4" style={{ backgroundColor: '#ffffff' }}>
      {/* Language Selector */}
      <div className="absolute top-6 right-6">
        <div className="relative">
          <select 
            className="form-select w-full min-w-0 cursor-pointer appearance-none rounded-lg border-none bg-white/50 py-2 pl-4 pr-10 text-sm font-medium text-[#111816] ring-1 ring-inset ring-black/10 focus:outline-none focus:ring-2 focus:ring-primary"
            value={currentLanguage.id}
            onChange={(e) => {
              const selected = languages.find(lang => lang.id === e.target.value)
              if (selected) setLanguage(selected)
            }}
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Globe className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>

      <motion.div 
        className="flex w-full max-w-md flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mx-auto mb-4">
            <img src="/images/logo.png" alt="MamaSafe" className="h-20 w-20 object-contain mx-auto" />
          </div>
          <h1 className="text-[#111816] tracking-tight text-[32px] font-bold leading-tight">
            {t('auth.providerPortal')}
          </h1>
          <p className="text-gray-600 text-base mt-2">
            {t('auth.welcomeBack')}
          </p>
        </motion.div>

        {/* Login Form Card */}
        <motion.div 
          className="w-full rounded-xl bg-white p-6 sm:p-8 shadow-lg ring-1 ring-black/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col gap-5">
            {/* Username Field */}
            <motion.label 
              className="flex flex-col w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[#111816] text-base font-medium leading-normal pb-2">
                {t('auth.usernameEmail')}
              </p>
              <div className="relative flex w-full items-center">
                <User className="text-gray-500 absolute left-4 h-5 w-5" />
                <input 
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111816] focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary border-none bg-gray-50 h-14 placeholder:text-gray-500 pl-12 pr-4 text-base font-normal leading-normal transition-all"
                  placeholder={t('auth.enterUsername')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </motion.label>

            {/* Password Field */}
            <motion.label 
              className="flex flex-col w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-[#111816] text-base font-medium leading-normal pb-2">
                {t('auth.password')}
              </p>
              <div className="relative flex w-full items-center">
                <Lock className="text-gray-500 absolute left-4 h-5 w-5" />
                <input 
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111816] focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-primary border-none bg-gray-50 h-14 placeholder:text-gray-500 pl-12 pr-12 text-base font-normal leading-normal transition-all"
                  placeholder={t('auth.enterPassword')}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <motion.button 
                  className="text-gray-500 absolute right-4 hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </motion.button>
              </div>
            </motion.label>

            {/* Forgot Password Link */}
            <motion.a 
              className="text-gray-600 text-sm font-medium leading-normal self-end underline transition-colors hover:text-primary"
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t('auth.forgotPassword')}
            </motion.a>

            {/* Error Message */}
            {error && (
              <motion.div 
                className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            {/* Log In Button */}
            <motion.button 
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 w-full bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] transition-all hover:bg-primary/90 disabled:opacity-50"
              onClick={handleLogin}
              disabled={loading || !username.trim() || !password.trim()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="truncate">
                {loading ? 'Logging in...' : t('auth.logIn')}
              </span>
            </motion.button>

            {/* Alternative Access */}
            <motion.button 
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 w-full bg-transparent text-primary text-base font-bold leading-normal tracking-[0.015em] ring-2 ring-inset ring-primary transition-colors hover:bg-primary/10"
              onClick={() => {
                console.log('SMS Access button clicked')
                onSMSAccess()
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="truncate">{t('auth.accessSMS')}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Registration Link */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-600 text-base">
            {t('auth.noAccount')} <button className="font-bold text-primary underline hover:text-primary/80 transition-colors" onClick={onRegister}>{t('auth.registerHere')}</button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AuthScreen