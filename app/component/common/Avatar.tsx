import Image from 'next/image'
interface AvartarProps {
  src: string
  alt: string
  width?: string
  height?: string
}
export default function Avatar({
  src,
  alt,
  width = 'w-16',
  height = 'h-16',
}: AvartarProps) {
  return (
    <div className={`relative ${width} ${height}`}>
      <Image src={src} alt={alt} fill className="rounded-full" />
    </div>
  )
}