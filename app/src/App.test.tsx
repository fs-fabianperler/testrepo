import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

function pressCounter(times: number) {
  for (let i = 0; i < times; i++) {
    fireEvent.click(screen.getByRole('button', { name: /^Count is/ }))
  }
}

function counterText() {
  return screen.getByRole('button', { name: /^Count is/ }).textContent
}

describe('App', () => {
  it('renders the starter page heading', () => {
    render(<App showResetButton={false} />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Get started' }),
    ).toBeDefined()
  })

  describe('with the reset flag on', () => {
    it('shows the Reset button', () => {
      render(<App showResetButton />)
      expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined()
    })

    it('resets the counter from 5 to 0', () => {
      render(<App showResetButton />)
      pressCounter(5)
      expect(counterText()).toBe('Count is 5')
      fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
      expect(counterText()).toBe('Count is 0')
    })

    it('keeps the counter at 0 when it is already 0', () => {
      render(<App showResetButton />)
      fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
      expect(counterText()).toBe('Count is 0')
    })

    it('counts up from 0 again after a reset', () => {
      render(<App showResetButton />)
      pressCounter(3)
      fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
      pressCounter(1)
      expect(counterText()).toBe('Count is 1')
    })
  })

  describe('with the reset flag off', () => {
    it('hides the Reset button and keeps counting', () => {
      render(<App showResetButton={false} />)
      expect(screen.queryByRole('button', { name: 'Reset' })).toBeNull()
      pressCounter(2)
      expect(counterText()).toBe('Count is 2')
    })
  })
})
