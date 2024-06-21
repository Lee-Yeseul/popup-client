'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MDEditor from '@uiw/react-md-editor'
import Form from '@/app/src/component/common/form'
import { CreatePopUpSchema, createPopUpSchema } from '@/app/src/schema/pop-up'
import { popUpAPI } from '@/app/src/api/pop-up'
import { imageAPI } from '@/app/src/api/image'
import { useUserStore } from '@/app/src/store/userStore'
import useToast from '../common/toast/useToast'
import { HTTPError } from '../../util/customError'
import { getGeoCoordinates } from '../../util'

interface PopUpCreateFormProps {
  categoryOptions: any
}
export default function PopUpCreateForm({
  categoryOptions,
}: PopUpCreateFormProps) {
  const { isLogin } = useUserStore()
  const { toast } = useToast()
  const [content, setContent] = useState('')
  const router = useRouter()

  const onSubmit = async (submitData: CreatePopUpSchema) => {
    try {
      const { imageList } = submitData
      delete submitData['imageList']

      const {
        data: { id },
      } = await popUpAPI.postPopUp({ ...submitData, content })

      if (!imageList) return
      const imagePathList = []

      for (let i = 0; i < imageList.length; i++) {
        const path = 'pop-up'
        const { body } = await imageAPI.createPreSignedUrl({
          path,
          filename: `${id}_${i}`,
        })

        const { url, fields } = body

        await imageAPI.uploadImage({
          url,
          fields,
          file: imageList[i],
        })

        imagePathList.push(`${id}_${i}`)
      }

      const { latitude, longitude } = await getGeoCoordinates(
        submitData.fullAddress,
      )

      await popUpAPI.putPopUpById(id, {
        imageList: imagePathList,
        latitude,
        longitude,
      })
      toast('팝업이 성공적으로 생성되었습니다.', 'success')
      router.push(`/pop-up/${id}`)
    } catch (error) {
      if (error instanceof HTTPError) {
        toast(error.message, 'error')
        return
      }
    }
  }

  return (
    <div className="mx-6">
      {isLogin && (
        <Form<CreatePopUpSchema>
          schema={createPopUpSchema}
          handleSubmit={(data) => onSubmit(data)}
        >
          <div className="mt-4">
            <Form.TextInput
              name="title"
              label="제목*"
              placeholder=""
              className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            />
          </div>
          <div className="mt-4">
            <Form.TextInput
              label="부제목(브랜드)*"
              name="subTitle"
              placeholder=""
              className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            />
          </div>
          <div className="mt-4">
            <Form.Select
              label="카테고리*"
              name="category"
              className="h-12 w-full rounded-md border-1 border-solid border-gray-300 pe-5 ps-5"
              options={categoryOptions}
            />
          </div>
          <div className="mt-4">
            <Form.TagListInput
              label="해시태그*"
              name="tags"
              placeholder=""
              className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            />
          </div>
          <div className="mt-4">
            <Form.TextInput
              label="주소(구)*"
              name="address"
              placeholder=""
              className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            />
          </div>
          <div className="mt-4">
            <Form.TextInput
              label="전체 주소*"
              name="fullAddress"
              placeholder=""
              className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            />
          </div>
          <div className="mt-4">
            <Form.TextInput
              label="상세 주소"
              name="addressDetail"
              placeholder=""
              className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Form.DatePicker
              label="시작일*"
              name="startDate"
              className="h-12 rounded-md border-gray-300 p-2 ps-5"
            />
            <Form.DatePicker
              label="종료일*"
              name="endDate"
              className="h-12 rounded-md border-gray-300 p-2 ps-5"
            />
          </div>

          <div className="mt-4">
            <Form.ImageInput name="imageList" />
          </div>
          <div className="mt-10">
            <div>
              <MDEditor
                value={content}
                onChange={(e) => setContent(String(e))}
              />
            </div>
            <div className="my-4 border-1 border-solid border-gray-300 p-2">
              <MDEditor.Markdown source={content} />
            </div>
          </div>
          <Form.SubmitButton
            type="button"
            className="mt-10 w-full bg-secondary-100 py-2.5 text-xl font-bold"
          >
            기본정보 작성 완료
          </Form.SubmitButton>
        </Form>
      )}
    </div>
  )
}
