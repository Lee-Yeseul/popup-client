import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-4 flex h-44 items-center bg-neutral-100 pb-16 text-primary-500">
      <div className="mx-6 flex gap-5">
        <Link href={'mailto:popupnow365@gmail.com'}>메일</Link>
        <Link href={'https://www.instagram.com/pop_up__now/'}>인스타그램</Link>
      </div>
    </footer>
  )
}
