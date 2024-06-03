// calculateMapCenter.test.js

import { calculateMapCenter } from '@/app/src/util'

describe('calculateMapCenter', () => {
  test('returns null for an empty array', () => {
    const coords: number[] = []
    expect(calculateMapCenter(coords)).toBeNull()
  })

  test('calculates the center for a single coordinate', () => {
    const coords = [{ lat: 40.7128, lng: -74.006 }]
    const expectedCenter = { lat: 40.7128, lng: -74.006 }
    expect(calculateMapCenter(coords)).toEqual(expectedCenter)
  })

  test('calculates the center for multiple coordinates', () => {
    const coords = [
      { lat: 40.7128, lng: -74.006 },
      { lat: 34.0522, lng: -118.2437 },
      { lat: 51.5074, lng: -0.1278 },
    ]
    const expectedCenter = {
      lat: (40.7128 + 34.0522 + 51.5074) / 3,
      lng: (-74.006 + -118.2437 + -0.1278) / 3,
    }
    expect(calculateMapCenter(coords)).toEqual(expectedCenter)
  })

  test('calculates the center for coordinates with mixed values', () => {
    const coords = [
      { lat: 10, lng: 20 },
      { lat: -10, lng: -20 },
      { lat: 5, lng: -5 },
    ]
    const expectedCenter = {
      lat: (10 + -10 + 5) / 3,
      lng: (20 + -20 + -5) / 3,
    }
    expect(calculateMapCenter(coords)).toEqual(expectedCenter)
  })
})
