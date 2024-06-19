type QueryObject = {
  [key: string]: string | string[] | boolean
}

export const queryStringify = (queryObject: QueryObject): string => {
  const searchParams = new URLSearchParams()
  Object.entries(queryObject).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item))
    } else {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}

export const decodeJWT = (token: string) => {
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

export const isTokenExpired = (tokenName: string): boolean => {
  if (typeof document === 'undefined') return true

  const token = getCookie(tokenName)
  if (!token) return true

  const { exp } = decodeJWT(token)
  const now = Date.now()

  return exp * 1000 < now
}

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  )

  return matches ? decodeURIComponent(matches[1]) : null
}

export const deleteCookie = (name: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export const encodeFileToBase64 = async (fileBlob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(fileBlob)
  })
}

export const calculateMapCenter = (coords: any[]) => {
  if (!coords.length) return null

  const sumCoords = coords.reduce(
    (acc, coord) => {
      acc.lat += coord.lat
      acc.lng += coord.lng
      return acc
    },
    { lat: 0, lng: 0 },
  )

  const center = {
    lat: sumCoords.lat / coords.length,
    lng: sumCoords.lng / coords.length,
  }

  return center
}
