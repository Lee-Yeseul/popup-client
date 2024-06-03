import { convertDateToKor } from '@/app/src/util/date'

describe('convertDateToKor', () => {
  test('converts a Date object to Korean date format', () => {
    const date = new Date('2023-01-01')
    const expectedKorFormat = '1월 1일'
    expect(convertDateToKor(date)).toBe(expectedKorFormat)
  })

  test('converts a string date to Korean date format', () => {
    const date = '2023-01-01'
    const expectedKorFormat = '1월 1일'
    expect(convertDateToKor(date)).toBe(expectedKorFormat)
  })

  test('handles different date formats correctly', () => {
    const date = 'January 1, 2023'
    const expectedKorFormat = '1월 1일'
    expect(convertDateToKor(date)).toBe(expectedKorFormat)
  })

  test('pads month and day with leading zeros if necessary', () => {
    const date = new Date('2023-03-05')
    const expectedKorFormat = '3월 5일'
    expect(convertDateToKor(date)).toBe(expectedKorFormat)
  })
})
