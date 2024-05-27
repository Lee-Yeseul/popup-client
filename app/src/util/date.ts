export const calculateDateDifference = (date1: Date, date2: Date) => {
  const timeDifference = date1.getTime() - date2.getTime()
  return Math.ceil(timeDifference / (1000 * 3600 * 24))
}
export const convertDateToISOFormat = (date: Date | string) => {
  const originalDate = new Date(date)

  const year = originalDate.getFullYear()
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0')
  const day = originalDate.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const convertDateToKor = (date: Date | string) => {
  const originalDate = new Date(date)
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
  })

  return formatter.format(originalDate)
}
