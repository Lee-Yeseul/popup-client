'use client'
import { useRouter } from 'next/navigation'

import { dogAPI } from '@/app/api/dog'
import useToast from '@/app/component/common/toast/useToast'
import CreateDogForm from '@/app/component/dogs/CreateDogForm'
import { CreateDogSchema } from '@/app/schema/dogs'

export default function DogCreatePage() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (data: CreateDogSchema) => {
    try {
      const {
        data: { id },
      } = await dogAPI.postDog(data)

      toast('반려견이 등록되었습니다.', 'success')
      router.push(`/dogs/${id}`)
    } catch (error) {
      toast('반려견 등록에 실패했습니다.', 'error')
    }
  }
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <CreateDogForm onSubmit={handleSubmit} type="create" />
    </div>
  )
}
