import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
})

function counterButton() {
  return screen.getByRole('button', { name: /^Count is/ })
}

function resetButton() {
  return screen.getByRole('button', { name: 'Reset counter' })
}

describe('App', () => {
  it('renders the starter page heading', () => {
    render(<App showResetButton={false} />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Get started' }),
    ).toBeDefined()
  })

  describe('with the reset counter flag off', () => {
    it('does not show the reset button', () => {
      render(<App showResetButton={false} />)
      expect(screen.queryByRole('button', { name: 'Reset counter' })).toBeNull()
    })

    it('still increases the counter', () => {
      render(<App showResetButton={false} />)
      fireEvent.click(counterButton())
      expect(counterButton().textContent).toBe('Count is 1')
    })
  })

  describe('with the reset counter flag on', () => {
    it('shows the reset button labeled Reset', () => {
      render(<App showResetButton={true} />)
      expect(resetButton().textContent).toBe('Reset')
    })

    it('resets the counter to 0', () => {
      render(<App showResetButton={true} />)
      fireEvent.click(counterButton())
      fireEvent.click(counterButton())
      fireEvent.click(counterButton())
      expect(counterButton().textContent).toBe('Count is 3')

      fireEvent.click(resetButton())
      expect(counterButton().textContent).toBe('Count is 0')
    })

    it('keeps the counter at 0 when it is already 0', () => {
      render(<App showResetButton={true} />)
      fireEvent.click(resetButton())
      expect(counterButton().textContent).toBe('Count is 0')
    })

    it('counts up from 0 again after a reset', () => {
      render(<App showResetButton={true} />)
      fireEvent.click(counterButton())
      fireEvent.click(resetButton())
      fireEvent.click(counterButton())
      expect(counterButton().textContent).toBe('Count is 1')
    })
  })
})
