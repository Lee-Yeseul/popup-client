export class HTTPError extends Error {
  status: number

  constructor(status: number, message: string) {
    super()
    this.status = status
    this.name = 'HTTPError'
    this.message = message
  }
}
export class AuthError extends HTTPError {
  constructor() {
    super(401, 'Unauthorized user')
    this.name = 'AuthError'
  }
}
