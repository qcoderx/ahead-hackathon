import React, { useState, useEffect } from 'react'
import { Download, Smartphone } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setIsInstallable(false)
    }
  }

  if (!isInstallable) {
    return (
      <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4" />
          <span>Add to Home Screen available in browser menu</span>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-4 right-4 bg-primary text-white px-4 py-3 rounded-lg shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
    >
      <Download className="w-5 h-5" />
      <span className="font-medium">Install MamaSafe</span>
    </button>
  )
}

export default PWAInstallButton