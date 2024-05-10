'use client'

import { useEffect, useState } from 'react'
import { dogAPI } from '@/app/api/dog'
import { imageAPI } from '@/app/api/image'
import useToast from '@/app/component/common/toast/useToast'
import CreateDogForm from '@/app/component/dogs/CreateDogForm'
import DogProfileUploader from '@/app/component/dogs/DogProfileUploader'
import { CreateDogSchema } from '@/app/schema/dogs'
import { useRouter } from 'next/navigation'

export default function DogEditPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { toast } = useToast()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [image, setImage] = useState<File>()
  const [dogInfo, setDogInfo] = useState<CreateDogSchema>()

  const handleSubmit = async (dogData: CreateDogSchema) => {
    const time = new Date().getTime()
    const path = 'dog/profile'
    const filename = `dog_${id}_${time}`
    try {
      await dogAPI.putDog(Number(id), dogData)

      if (image) {
        const { data } = await imageAPI.createPreSignedUrl({
          path,
          filename,
        })
        const { body } = data
        const { url, fields } = body
        await imageAPI.uploadImage({ url, fields, file: image })
        await dogAPI.putDogProfile(Number(id), {
          imagePath: `${path}/${filename}`,
        })
      }

      router.push(`/dogs/${id}`)
    } catch (error) {
      toast('반려견 등록에 실패했습니다.', 'error')
    }
  }

  const getDogInfo = async () => {
    const { data } = await dogAPI.getDog(Number(id))
    const { imagePath, name, age, breed } = data

    if (imagePath) {
      const { body } = await imageAPI.getImagePresignedUrl(imagePath)
      setImageUrl(body)
    }

    setDogInfo({ name, age, breed })
  }

  useEffect(() => {
    getDogInfo()
  }, [])

  return (
    <>
      {dogInfo && (
        <div className="mt-20 flex w-full flex-col items-center justify-center">
          <DogProfileUploader
            imageUrl={imageUrl}
            setImageFile={(data) => setImage(data)}
          />
          <CreateDogForm
            type="edit"
            onSubmit={handleSubmit}
            defaultValue={dogInfo}
          />
        </div>
      )}
    </>
  )
}
