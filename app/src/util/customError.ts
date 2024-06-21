export class InternalError extends Error {
  status: number

  constructor(status: number, message: string) {
    super()
    this.status = status
    this.name = 'HTTPError'
    this.message = message
  }
}
export class AuthError extends InternalError {
  constructor() {
    super(401, 'Unauthorized user')
    this.name = 'AuthError'
  }
}

export class HTTPError extends InternalError {
  constructor(status: number, message: string) {
    super(status, message)
    this.status = status
    this.name = 'HTTPError'
    this.message = message
  }
}
