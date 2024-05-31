import { ChangeEvent, useContext, useState } from 'react'
import { FormContext } from '.'
import { encodeFileToBase64 } from '@/app/src/util'

export default function ImageInput({ name }: { name: string }) {
  const { setValue } = useContext(FormContext)
  const [previewImageList, setPreviewImageList] = useState<string[]>([])
  const [fileList, setFileList] = useState<File[]>([])

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]

    const imageURL = await encodeFileToBase64(file)
    setPreviewImageList((prev) => [...prev, imageURL])
    setFileList((prev) => [...prev, file])
    setValue(name, [...fileList, file])
  }

  const onRemoveImage = (index: number) => {
    setPreviewImageList((prev) => prev.filter((_, i) => i !== index))
    setFileList((prev) => prev.filter((_, i) => i !== index))
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
            <div className="h-32 w-32 shrink-0 bg-yellow-100" key={index}>
              <img
                src={image}
                alt="preview image"
                className="rounded-lg"
                onClick={() => onRemoveImage(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
