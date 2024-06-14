import localFont from 'next/font/local'

export const pretendard = localFont({
  src: [
    {
      path: '../../../public/assets/font/Pretendard-Thin.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/assets/font/Pretendard-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/assets/font/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/assets/font/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
})
