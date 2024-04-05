type queryObject = {
  [key: string]: string | string[]
}

export function queryStringify(queryObject: queryObject): string {
  const searchParams = new URLSearchParams()
  Object.entries(queryObject).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item))
    } else {
      searchParams.append(key, value)
    }
  })
  return searchParams.toString()
}

export function decodeJWT(token: string) {
  const base64Payload = token.split('.')[1]
  const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/')
  const decodedJWT = JSON.parse(
    decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    ),
  )
  return decodedJWT
}

export function deleteCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
