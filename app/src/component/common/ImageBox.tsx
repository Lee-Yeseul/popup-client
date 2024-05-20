'use client'

import { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import Spinner from './Spinner'
import { imageAPI } from '@/app/src/api/image'

export default function ImageBox({ imagePath }: { imagePath: string }) {
  const [imageUrl, setImageUrl] = useState('')
  const getImageByImagePath = async (imagePath: string) => {
    try {
      if (!imagePath) return

      const { body } = await imageAPI.getImagePresignedUrl(imagePath)
      setImageUrl(body)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getImageByImagePath(imagePath)
  }, [imagePath])

  return (
    <>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={'pop_up_thumbnail'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </>
  )
}
