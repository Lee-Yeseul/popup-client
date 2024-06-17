export type SignInResponse = {
  message: string
  accessToken: string
  refreshToken: string
}

export type RenewAccessToken = {
  newAccessToken: string
}
