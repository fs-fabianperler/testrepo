import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { loadAppConfig } from './loadAppConfig'

void loadAppConfig().then((config) => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App showResetButton={config.resetCounterEnabled} />
    </StrictMode>,
  )
})
