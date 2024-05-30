'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
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
}

export default function ImageBox({ imagePath, objectFit }: ImageBoxProps) {
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
          console.log('why?', imageUrl)
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
        <Image
          src={imageUrl}
          alt={'pop_up_thumbnail'}
          fill
          className={`bg-black ${objectFit ?? 'object-contain'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="h-full w-full rounded-md bg-neutral-100"></div>
      )}
    </div>
  )
}
