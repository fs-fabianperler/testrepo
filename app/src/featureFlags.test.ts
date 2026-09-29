import { describe, expect, it } from 'vitest'
import { isFlagEnabled } from './featureFlags'

describe('isFlagEnabled', () => {
  it('is on only for the exact value "true"', () => {
    expect(isFlagEnabled('true')).toBe(true)
  })

  it.each([undefined, '', 'false', 'TRUE', '1', ' true', true])(
    'is off for %j',
    (value) => {
      expect(isFlagEnabled(value)).toBe(false)
    },
  )
})
