import { decodeJWT } from '@/app/src/util'

describe('decodeJWT', () => {
  test('decodes a valid JWT token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE2MjU2Mzg0MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    const expectedPayload = {
      username: 'johndoe',
      iat: 1625638400,
    }
    expect(decodeJWT(token)).toEqual(expectedPayload)
  })

  test('throws an error for an invalid JWT token', () => {
    const token = 'invalid.token'
    expect(() => decodeJWT(token)).toThrow()
  })

  test('handles a JWT token with special characters', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzcGVjaWFsIjoiQGNoYXJhY3RlcnMifQ.w-8aaKb6O_zT4ZKJLtKP5gIvN4JPA3U_ML0QCFoSwIY'
    const expectedPayload = {
      special: '@characters',
    }
    expect(decodeJWT(token)).toEqual(expectedPayload)
  })
})
