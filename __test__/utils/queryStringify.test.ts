// queryStringify.test.js

import { queryStringify } from '@/app/src/util'

describe('queryStringify', () => {
  test('converts an object with simple key-value pairs to a query string', () => {
    const queryObject = {
      name: 'John',
      age: '30',
      city: 'New York',
    }
    const expected = 'name=John&age=30&city=New+York'
    expect(queryStringify(queryObject)).toBe(expected)
  })

  test('converts an object with array values to a query string', () => {
    const queryObject = {
      name: 'John',
      hobbies: ['reading', 'travelling', 'swimming'],
    }
    const expected =
      'name=John&hobbies=reading&hobbies=travelling&hobbies=swimming'
    expect(queryStringify(queryObject)).toBe(expected)
  })

  test('handles an empty object', () => {
    const queryObject = {}
    const expected = ''
    expect(queryStringify(queryObject)).toBe(expected)
  })

  test('handles an object with mixed simple and array values', () => {
    const queryObject = {
      name: 'John',
      age: '30',
      hobbies: ['reading', 'travelling'],
      city: 'New York',
    }
    const expected =
      'name=John&age=30&hobbies=reading&hobbies=travelling&city=New+York'
    expect(queryStringify(queryObject)).toBe(expected)
  })

  test('handles an object with special characters', () => {
    const queryObject = {
      name: 'John Doe',
      'job title': 'Software Engineer',
      city: 'San Francisco',
    }
    const expected =
      'name=John+Doe&job+title=Software+Engineer&city=San+Francisco'
    expect(queryStringify(queryObject)).toBe(expected)
  })
})
