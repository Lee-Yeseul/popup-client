'use client'

import { useRef, useState } from 'react'
import useInterval from '../../hook/useInterval'

interface CardProps {
  imageList: { id: number; url: string }[]
  bgColor?: string
  objectFit?:
    | 'object-contain'
    | 'object-cover'
    | 'object-cover'
    | 'object-fill'
    | 'scale-down'
  height?: number
  autoPlay?: boolean
}

type MoveToNthSlide = (
  targetImageIndex: number,
  translateNumber: number,
) => void

export default function ImageCarousel({
  imageList: data,
  bgColor,
  objectFit,
  height,
  autoPlay,
}: CardProps) {
  const imageList = [data[data.length - 1], ...data, data[0]]
  const ref = useRef<HTMLDivElement>(null)

  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  })
  const [currentImageIndex, setCurrentImageIndex] = useState(1)
  const [style, setStyle] = useState({
    transform: `translateX(-${currentImageIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  })

  const moveToNthSlide: MoveToNthSlide = (
    targetImageIndex = 1,
    translateNumber = 1,
  ) => {
    setCurrentImageIndex(targetImageIndex)
    setStyle({
      transform: `translateX(-${translateNumber}00%)`,
      transition: `0s`,
    })
  }

  const handleSwife = (direction: number) => {
    setCurrentImageIndex((prev) => prev + direction)
    setStyle({
      transform: `translateX(-${currentImageIndex + direction}00%)`,
      transition: `all 0.4s ease-in-out`,
    })
    if (currentImageIndex === 1 && direction < 0) {
      setTimeout(
        () => moveToNthSlide(imageList.length - 1, imageList.length - 2),
        500,
      )
      return
    }
    if (currentImageIndex === imageList.length - 2 && direction > 0) {
      setTimeout(() => moveToNthSlide(1, 1), 500)
      return
    }
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouch((prev) => {
      return {
        ...prev,
        start: e.touches[0].pageX,
      }
    })
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (ref.current) {
      const current = ref.current.clientWidth * currentImageIndex
      const result = -current + (e.targetTouches[0].pageX - touch.start)
      setStyle({
        transform: `translate3d(${result}px, 0px, 0px)`,
        transition: '0ms',
      })
    }
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const end = e.changedTouches[0].pageX
    if (touch.start > end) {
      handleSwife(1)
    } else {
      handleSwife(-1)
    }
    setTouch((prev) => {
      return {
        ...prev,
        end,
      }
    })
  }

  useInterval(
    () => {
      handleSwife(1)
    },
    autoPlay ? 2000 : null,
  )

  return (
    <div>
      <div
        className="group relative overflow-hidden rounded-sm"
        style={{
          width: '100%',
          minWidth: '350px',
          maxWidth: '550px',
          height: height ? height : '350px',
        }}
      >
        <div
          className="flex h-full w-full items-center"
          ref={ref}
          style={style}
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchMove={(e) => handleTouchMove(e)}
          onTouchEnd={(e) => handleTouchEnd(e)}
        >
          {imageList.map((image, index) => (
            <div className="relative h-full w-full shrink-0" key={index}>
              <img
                key={index}
                className={`${bgColor ? bgColor : 'bg-black'} ${objectFit ? objectFit : ' object-contain'} h-full w-full`}
                src={image.url}
                alt={image.url}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => handleSwife(-1)}
          className="invisible absolute left-2 top-1/2 h-8 w-8 rounded-full bg-gray-100 p-2 text-primary-500 opacity-75 shadow-lg hover:opacity-90 hover:shadow-sm group-hover:visible"
        >
          {'<'}
        </button>
        <button
          onClick={() => handleSwife(1)}
          className="invisible absolute right-2 top-1/2 h-8 w-8 rounded-full bg-gray-100 p-2 text-primary-500 opacity-75 shadow-lg hover:opacity-90 hover:shadow-sm group-hover:visible"
        >
          {'>'}
        </button>
        <div className="absolute bottom-2 w-full">
          <div className="flex items-center justify-center gap-1.5">
            {data.map((image, index) => (
              <div
                key={index}
                className={`rounded-full ${
                  image.id === currentImageIndex - 1
                    ? 'h-2.5 w-2.5 bg-white'
                    : 'h-2 w-2 bg-gray-400'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
