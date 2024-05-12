'use client'

import { dogAPI } from '@/app/api/dog'
import { dogPostAPI } from '@/app/api/dog-posts'
import { imageAPI } from '@/app/api/image'
import useToast from '@/app/component/common/toast/useToast'
import CreateDogPostForm from '@/app/component/dog-posts/CreateDogPostForm'
import DogCard from '@/app/component/dog-posts/DogCard'
import { CreateDogPostSchema } from '@/app/schema/dog-posts'
import { CreateDogSchema } from '@/app/schema/dogs'
import { DogResponse } from '@/app/type/dogs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DogPostCreatePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [dogInfo, setDogInfo] = useState<DogResponse>()
  const [imageUrl, setImageUrl] = useState<string>('')

  const getDogInfo = async () => {
    const { data } = await dogAPI.getMyDogs()
    const { imagePath } = data[0]

    if (imagePath) {
      const { body } = await imageAPI.getImagePresignedUrl(imagePath)
      setImageUrl(body)
    }
    setDogInfo(data[0])
  }

  const handleSubmit = async (dogData: CreateDogPostSchema) => {
    console.log('his')
    try {
      if (!dogInfo?.id) return
      const { data } = await dogPostAPI.postDogPost({
        dogId: dogInfo.id,
        ...dogData,
      })
      router.push(`/dog-posts/${data.id}`)
    } catch (error) {
      toast('포스트 등록에 실패했습니다.', 'error')
    }
  }

  useEffect(() => {
    getDogInfo()
  }, [])

  return (
    <>
      {dogInfo && (
        <div className="mt-20">
          <DogCard dogInfo={dogInfo} imageUrl={imageUrl} />
          <CreateDogPostForm type="create" onSubmit={handleSubmit} />
        </div>
      )}
    </>
  )
}
