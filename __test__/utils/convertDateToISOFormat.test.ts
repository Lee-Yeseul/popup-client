import { convertDateToISOFormat } from '@/app/src/util/date'

describe('convertDateToISOFormat', () => {
  test('converts a Date object to ISO format', () => {
    const date = new Date('2023-01-01')
    const expectedISOFormat = '2023-01-01'
    expect(convertDateToISOFormat(date)).toBe(expectedISOFormat)
  })

  test('converts a string date to ISO format', () => {
    const date = '2023-01-01'
    const expectedISOFormat = '2023-01-01'
    expect(convertDateToISOFormat(date)).toBe(expectedISOFormat)
  })

  test('handles different date formats correctly', () => {
    const date = 'January 1, 2023'
    const expectedISOFormat = '2023-01-01'
    expect(convertDateToISOFormat(date)).toBe(expectedISOFormat)
  })

  test('pads month and day with leading zeros if necessary', () => {
    const date = new Date('2023-03-05')
    const expectedISOFormat = '2023-03-05'
    expect(convertDateToISOFormat(date)).toBe(expectedISOFormat)
  })
})
