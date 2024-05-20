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

export const convertDateToISOFormat = (date: Date | string) => {
  const originalDate = new Date(date)

  // 년, 월, 일 추출
  const year = originalDate.getFullYear()
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0')
  const day = originalDate.getDate().toString().padStart(2, '0')
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
  })

  return `${year}.${month}.${day}`
  // return formatter.format(originalDate)
}

export const convertDateToKor = (date: Date | string) => {
  const originalDate = new Date(date)
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
  })

  return formatter.format(originalDate)
}
