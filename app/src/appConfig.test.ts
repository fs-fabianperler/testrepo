import { describe, expect, it } from 'vitest'
import { parseAppConfig } from './appConfig'

describe('parseAppConfig', () => {
  it('enables the reset counter when the flag is true', () => {
    expect(parseAppConfig({ resetCounterEnabled: true })).toEqual({
      resetCounterEnabled: true,
    })
  })

  it.each([
    ['false', { resetCounterEnabled: false }],
    ['a missing flag', {}],
    ['the string "true"', { resetCounterEnabled: 'true' }],
    ['a number', { resetCounterEnabled: 1 }],
    ['null', null],
    ['undefined', undefined],
    ['an array', [true]],
    ['a non-object', 'resetCounterEnabled'],
  ])('disables the reset counter for %s', (_, raw) => {
    expect(parseAppConfig(raw)).toEqual({ resetCounterEnabled: false })
  })
})
