import { describe, expect, it } from 'vitest'
import { parseAppConfig } from './appConfig'

describe('parseAppConfig', () => {
  it('enables the reset counter only for the boolean true', () => {
    expect(parseAppConfig({ resetCounterEnabled: true })).toEqual({
      resetCounterEnabled: true,
    })
  })

  it.each([
    ['false', { resetCounterEnabled: false }],
    ['a missing key', {}],
    ['the string "true"', { resetCounterEnabled: 'true' }],
    ['the string "TRUE"', { resetCounterEnabled: 'TRUE' }],
    ['the number 1', { resetCounterEnabled: 1 }],
    ['null', null],
    ['an array', [true]],
    ['a string', 'resetCounterEnabled'],
    ['undefined', undefined],
  ])('disables the reset counter for %s', (_, raw) => {
    expect(parseAppConfig(raw)).toEqual({ resetCounterEnabled: false })
  })
})
