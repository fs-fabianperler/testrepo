import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { parseAppConfig, type AppConfig } from './appConfig.ts'

async function loadAppConfig(): Promise<AppConfig> {
  try {
    const response = await fetch('/config.json', { cache: 'no-store' })
    return parseAppConfig(response.ok ? await response.json() : undefined)
  } catch {
    return parseAppConfig(undefined)
  }
}

const config = await loadAppConfig()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App showResetButton={config.resetCounterEnabled} />
  </StrictMode>,
)
