import ImageBox from '../common/ImageBox'

export default function Banner() {
  return (
    <div className="w-full">
      <div className="relative h-64 w-full bg-gray-300">
        <ImageBox
          imagePath="banner/banner_1.png"
          alt="banner"
          objectFit="object-fill"
        />
      </div>
    </div>
  )
}
