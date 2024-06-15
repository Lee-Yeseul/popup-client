'use client'

import { useCallback, useState } from 'react'

import { imageAPI } from '@/app/src/api/image'
import useDetectElement from '@/app/src/hook/useDetectElement'

interface ImageBoxProps {
  imagePath: string
  objectFit?:
    | 'object-contain'
    | 'object-cover'
    | 'object-cover'
    | 'object-fill'
    | 'scale-down'
  alt?: string
  className?: string
}

export default function ImageBox({
  imagePath,
  objectFit,
  alt,
  className,
}: ImageBoxProps) {
  const [imageUrl, setImageUrl] = useState('')
  const getImageByImagePath = async (imagePath: string) => {
    try {
      if (!imagePath) return

      const s3ImageUrl = await imageAPI.getImagePresignedUrl(imagePath)
      setImageUrl(s3ImageUrl)
    } catch (error) {
      console.log(error)
    }
  }

  const [target] = useDetectElement({
    threshold: 0.5,
    onIntersect: useCallback(
      async ([{ isIntersecting }]) => {
        if (isIntersecting) {
          if (imageUrl) return
          await getImageByImagePath(imagePath)
        } else {
          return
        }
      },
      [imageUrl],
    ),
  })

  return (
    <div ref={target}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt ?? 'pop_up_thumbnail'}
          className={`${objectFit ?? 'object-contain'} ${className}`}
        />
      ) : (
        <div className={`h-full w-full rounded-md bg-black ${className}`}></div>
      )}
    </div>
  )
}
