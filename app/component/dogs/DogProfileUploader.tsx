'use client'
import { ChangeEvent, useState } from 'react'
import Avatar from '../common/Avatar'
import { encodeFileToBase64 } from '@/app/util'

interface DogProfileProps {
  imageUrl: string
  setImageFile: (data: File) => void
}
export default function DogProfileUploader({
  imageUrl,
  setImageFile,
}: DogProfileProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState(imageUrl)

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newImageURL = await encodeFileToBase64(e.target.files[0])
    setPreviewImageUrl(newImageURL)
    setImageFile(e.target.files[0])
  }

  return (
    <div className="mx-10 flex flex-col items-center gap-5">
      <label htmlFor="image-file" className="cursor-pointer">
        <Avatar
          alt="dog_profile"
          width="w-40"
          height="h-40"
          src={previewImageUrl}
        />
        <input
          id="image-file"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageUpload}
        />
      </label>
    </div>
  )
}
