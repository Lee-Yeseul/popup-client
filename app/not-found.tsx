import Link from 'next/link'

export const metadata = {
  title: 'Not Found',
}

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-center">
      <h2 className="text-center font-bold">
        <div>
          <span className="mr-4 text-5xl text-red-500">404</span>
          <span className="text-5xl">Not Found</span>
        </div>
        <div className="mt-4 text-xl">해당 페이지를 찾을 수 없습니다.</div>
      </h2>
      <div className="mt-8 rounded-md bg-red-500 px-6 py-3 text-xl font-bold text-white transition duration-200 ease-in-out hover:translate-y-0.5 hover:scale-105">
        <Link href={'/'}>Back to Home</Link>
      </div>
    </main>
  )
}
