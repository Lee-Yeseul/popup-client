import { CreateDogSchema } from '@/app/schema/dogs'
import Avatar from '../common/Avatar'

interface DogCardProps {
  dogInfo: CreateDogSchema
  imageUrl: string
}
export default function DogCard({ dogInfo, imageUrl }: DogCardProps) {
  const { name, breed, age } = dogInfo
  return (
    <div className="mx-10 flex w-fit items-center gap-5 rounded-lg border-1 border-solid border-gray-300 p-5">
      <Avatar alt="dog_profile" width="w-24" height="h-24" src={imageUrl} />
      <div className="flex flex-col gap-2">
        <div className="font-bold">
          {name}({age}살)
        </div>
        <div>{breed}</div>
      </div>
    </div>
  )
}
