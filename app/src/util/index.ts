import { InternalError } from './customError'

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

const base64UrlDecode = (str: string) => {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  )
}

export const decodeJWT = (token: string) => {
  const [_, payload] = token.split('.')
  const decodedPayload = JSON.parse(base64UrlDecode(payload))
  return { ...decodedPayload }
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

export const getGeoCoordinates = (
  address: string,
): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder()
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({
            latitude: Number(result[0].y),
            longitude: Number(result[0].x),
          })
        } else {
          reject(new InternalError(500, 'Failed to get geo coordinates'))
        }
      })
    })
  })
}

export const keywordSearch = (
  keyword: string,
): Promise<{ centerLat: number; centerLng: number }> => {
  return new Promise((resolve, reject) => {
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const centerLng = Number(data[0].x)
        const centerLat = Number(data[0].y)
        resolve({ centerLat, centerLng })
      } else {
        reject(new InternalError(500, 'Failed to perform keyword search'))
      }
    })
  })
}
