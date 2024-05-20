import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-4 flex h-44 items-center bg-neutral-100 pb-16 text-secondary-500">
      <div className="mx-6 flex gap-5">
        <Link href={'/'}>메일</Link>
        <Link href={'/'}>트위터</Link>
        <Link href={'/'}>인스타그램</Link>
      </div>
    </footer>
  )
}
