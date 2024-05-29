'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { imageAPI } from '@/app/src/api/image'

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

  useEffect(() => {
    getImageByImagePath(imagePath)
  }, [imagePath])

  return (
    <>
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
    </>
  )
}
