import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-10 flex h-44 items-center bg-gray-100 pb-16">
      <div className="mx-6 flex gap-5">
        <Link href={'/'}>메일</Link>
        <Link href={'/'}>트위터</Link>
        <Link href={'/'}>인스타그램</Link>
      </div>
    </footer>
  )
}
