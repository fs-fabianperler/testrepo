import { parseAppConfig, type AppConfig } from './appConfig'

export async function loadAppConfig(): Promise<AppConfig> {
  try {
    const response = await fetch('/config.json', { cache: 'no-store' })
    if (!response.ok) {
      return parseAppConfig(undefined)
    }
    return parseAppConfig(await response.json())
  } catch {
    return parseAppConfig(undefined)
  }
}
