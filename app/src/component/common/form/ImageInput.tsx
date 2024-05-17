import Image from 'next/image'
import { ChangeEvent, useContext, useState } from 'react'
import { FormContext } from '.'
import { encodeFileToBase64 } from '@/app/src/util'

export default function ImageInput({ name }: { name: string }) {
  const { setValue } = useContext(FormContext)
  const [previewImageList, setPreviewImageList] = useState<string[]>([])
  const [fileList, setFileList] = useState<File[]>([])

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const imageURL = await encodeFileToBase64(e.target.files[0])
    setPreviewImageList((prev) => [...prev, imageURL])
    setFileList((prev) => [...prev, e.target.files[0]])
    setValue(name, [...fileList, e.target.files[0]])
  }

  return (
    <div className="flex w-full items-center gap-4">
      <div>
        <label
          htmlFor="dropzone-file"
          className="flex h-32 w-32 cursor-pointer flex-col  items-center justify-center rounded-lg border-1 border-solid border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-5 pt-5">
            <div className="text-2xl">➕</div>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onImageUpload}
          />
        </label>
      </div>
      <div className="overflow-x-scroll">
        <div className="flex gap-3">
          {previewImageList.map((image, index) => (
            <div
              className="relative h-32 w-32 shrink-0 bg-yellow-100"
              key={index}
            >
              <Image
                src={image}
                alt="preview image"
                fill
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
