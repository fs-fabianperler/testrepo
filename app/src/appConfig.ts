export type AppConfig = {
  resetCounterEnabled: boolean
}

// Anything but a strict boolean true leaves the feature off.
export function parseAppConfig(raw: unknown): AppConfig {
  const resetCounterEnabled =
    typeof raw === 'object' &&
    raw !== null &&
    !Array.isArray(raw) &&
    (raw as Record<string, unknown>).resetCounterEnabled === true
  return { resetCounterEnabled }
}
