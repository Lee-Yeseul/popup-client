'use client'

import Link from 'next/link'

export default function ErrorPage() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center text-white">
      <h2 className="text-center font-bold">
        <div>
          <span className="mr-4 text-5xl text-red-500">500</span>
          <span className="text-5xl">Sorry, Something Error!</span>
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
