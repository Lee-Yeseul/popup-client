import { calculateDateDifference } from '@/app/src/util/date'

describe('calculateDateDifference', () => {
  test('calculates the difference in days between two dates', () => {
    const date1 = new Date('2023-01-10')
    const date2 = new Date('2023-01-01')
    const expectedDifference = 9 // 10th Jan - 1st Jan = 9 days
    expect(calculateDateDifference(date1, date2)).toBe(expectedDifference)
  })

  test('returns 0 when the dates are the same', () => {
    const date1 = new Date('2023-01-01')
    const date2 = new Date('2023-01-01')
    expect(calculateDateDifference(date1, date2)).toBe(0)
  })

  test('handles date1 being earlier than date2', () => {
    const date1 = new Date('2023-01-01')
    const date2 = new Date('2023-01-10')
    const expectedDifference = -9 // 1st Jan - 10th Jan = -9 days
    expect(calculateDateDifference(date1, date2)).toBe(expectedDifference)
  })
})
