export class HTTPError extends Error {
  status: number

  constructor(status: number, message: string) {
    super()
    this.status = status
    this.name = 'HTTPError'
    this.message = message
  }
}
export class APIError extends Error {
  redirectUrl: string = ''
  notFound: boolean = false
}

export class NotFoundError extends APIError {
  name = 'NotFoundError'
  message = '찾을 수 없습니다.'
  notFound = true
}

export class AuthError extends APIError {
  name = 'AuthError'
  message = '인증되지 않은 사용자입니다.'
  redirectUrl = '/login'
}

export class ServerError extends APIError {
  name = 'serverError'
  message = 'server error'
}
