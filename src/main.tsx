import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TranslationProvider } from './contexts/TranslationContext'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TranslationProvider>
    <AuthProvider>
      <ToastProvider>
        <div className="bg-white dark:bg-background-dark font-display">
          <App />
        </div>
      </ToastProvider>
    </AuthProvider>
  </TranslationProvider>
)