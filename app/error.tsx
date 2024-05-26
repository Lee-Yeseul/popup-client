'use client'

import Link from 'next/link'

export const metadata = {
  title: 'Error',
}

export default function ErrorPage() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center text-white">
      <h2 className="text-center font-bold">
        <div>
          <span className="mr-4 text-5xl text-red-500">500</span>
          <span className="text-5xl">
            죄송합니다. 알 수 없는 에러가 발생했습니다.
          </span>
        </div>
        <div className="mt-4 text-xl">
          {"sorry, we couldn't find this page"}
        </div>
      </h2>
      <div className="mt-8 rounded-md bg-red-500 px-6 py-3 text-xl font-bold text-white transition duration-200 ease-in-out hover:translate-y-0.5 hover:scale-105">
        <Link href={'/'}>Back to Home</Link>
      </div>
    </section>
  )
}
