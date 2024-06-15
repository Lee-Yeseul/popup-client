import ImageBox from '../common/ImageBox'

export default function Banner() {
  return (
    <div className="w-full">
      <div className="h-64 bg-neutral-100">
        <ImageBox
          imagePath="banner/banner_1.png"
          alt="banner"
          objectFit="object-contain"
        />
      </div>
    </div>
  )
}
