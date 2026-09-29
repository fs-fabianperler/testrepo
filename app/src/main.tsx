import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { isFlagEnabled } from './featureFlags.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App
      showResetButton={isFlagEnabled(
        import.meta.env.VITE_RESET_COUNTER_ENABLED,
      )}
    />
  </StrictMode>,
)
