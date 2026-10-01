export type AppConfig = {
  resetCounterEnabled: boolean
}

export function parseAppConfig(raw: unknown): AppConfig {
  const isObject =
    typeof raw === 'object' && raw !== null && !Array.isArray(raw)
  return {
    resetCounterEnabled:
      isObject &&
      'resetCounterEnabled' in raw &&
      raw.resetCounterEnabled === true,
  }
}
