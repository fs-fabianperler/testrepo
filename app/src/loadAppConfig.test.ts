import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadAppConfig } from './loadAppConfig'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('loadAppConfig', () => {
  it('fetches /config.json uncached and parses it', async () => {
    const fetchMock = vi.fn(async () =>
      Response.json({ resetCounterEnabled: true }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(loadAppConfig()).resolves.toEqual({
      resetCounterEnabled: true,
    })
    expect(fetchMock).toHaveBeenCalledWith('/config.json', {
      cache: 'no-store',
    })
  })

  it('falls back to off when the response is not OK', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        Response.json({ resetCounterEnabled: true }, { status: 404 }),
      ),
    )
    await expect(loadAppConfig()).resolves.toEqual({
      resetCounterEnabled: false,
    })
  })

  it('falls back to off when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('network error')
      }),
    )
    await expect(loadAppConfig()).resolves.toEqual({
      resetCounterEnabled: false,
    })
  })

  it('falls back to off when the body is not valid JSON', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('{ not json')),
    )
    await expect(loadAppConfig()).resolves.toEqual({
      resetCounterEnabled: false,
    })
  })
})
