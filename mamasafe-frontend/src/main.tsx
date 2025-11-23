import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TranslationProvider } from './contexts/TranslationContext'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TranslationProvider>
    <div className="bg-white dark:bg-background-dark font-display">
      <App />
    </div>
  </TranslationProvider>
)