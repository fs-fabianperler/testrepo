import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

function clickTimes(name: RegExp | string, times: number) {
  for (let i = 0; i < times; i++) {
    fireEvent.click(screen.getByRole('button', { name }))
  }
}

describe('App', () => {
  it('renders the starter page heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Get started' }),
    ).toBeDefined()
  })

  it('hides the reset button by default', () => {
    render(<App />)
    expect(screen.queryByRole('button', { name: 'Reset counter' })).toBeNull()
  })

  it('hides the reset button when the feature is off', () => {
    render(<App showResetButton={false} />)
    expect(screen.queryByRole('button', { name: 'Reset counter' })).toBeNull()
  })

  it('shows the reset button when the feature is on', () => {
    render(<App showResetButton />)
    expect(screen.getByRole('button', { name: 'Reset counter' })).toBeDefined()
  })

  it('resets the counter to 0', () => {
    render(<App showResetButton />)
    clickTimes(/^Count is/, 3)
    expect(screen.getByRole('button', { name: 'Count is 3' })).toBeDefined()
    clickTimes('Reset counter', 1)
    expect(screen.getByRole('button', { name: 'Count is 0' })).toBeDefined()
  })

  it('keeps the counter at 0 when reset at 0', () => {
    render(<App showResetButton />)
    clickTimes('Reset counter', 1)
    expect(screen.getByRole('button', { name: 'Count is 0' })).toBeDefined()
  })

  it('counts up from 0 after a reset', () => {
    render(<App showResetButton />)
    clickTimes(/^Count is/, 2)
    clickTimes('Reset counter', 1)
    clickTimes(/^Count is/, 1)
    expect(screen.getByRole('button', { name: 'Count is 1' })).toBeDefined()
  })
})
