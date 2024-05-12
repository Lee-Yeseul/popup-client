'use client'
import { imageAPI } from '@/app/api/image'
import { Suspense, useEffect, useState } from 'react'
import Spinner from './Spinner'
import Image from 'next/image'

export default function ImageBox({ imagePath }: { imagePath: string }) {
  const [imageUrl, setImageUrl] = useState('')
  const getImageByImagePath = async (imagePath: string) => {
    try {
      if (!imagePath) return
      console.log(imagePath)
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
    <div>
      <Suspense fallback={<Spinner />}>
        <Image src={imageUrl} alt={'asd'} fill />
      </Suspense>
    </div>
  )
}
