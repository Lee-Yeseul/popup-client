'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MDEditor from '@uiw/react-md-editor'
import Form from '@/app/src/component/common/form'
import { CreatePopUpSchema, createPopUpSchema } from '@/app/src/schema/pop-up'
import { popUpAPI } from '@/app/src/api/pop-up'
import useToast from '@/app/src/component/common/toast/useToast'
import { PopUpDetail } from '@/app/src/type/pop-up'
import { convertDateToISOFormat } from '@/app/src/util/date'
import { userAPI } from '../../api/user'
import { HTTPError } from '../../util/customError'

interface PopUpUpdateFormProps {
  categoryOptions: any
  popUpDetail: PopUpDetail
  id: string
}
export default function PopUpUpdateForm({
  categoryOptions,
  popUpDetail,
  id,
}: PopUpUpdateFormProps) {
  const { toast } = useToast()
  const [content, setContent] = useState(popUpDetail.content)

  const router = useRouter()

  const onsubmit = async (submitData: CreatePopUpSchema) => {
    try {
      await popUpAPI.putPopUpById(id, {
        ...submitData,
        content,
      })
      toast('수정 완료되었습니다.', 'success')
      router.push(`/pop-up/${id}`)
    } catch (error) {
      if (error instanceof HTTPError) {
        toast(error.message, 'error')
        return
      }
    }
  }

  const checkAuthority = async () => {
    try {
      const { data } = await userAPI.getUserInfo()
      if (data.id !== popUpDetail.authorId) {
        toast('수정 권한이 없습니다.', 'error')
        router.push(`/pop-up/${id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuthority()
  }, [])

  return (
    <div className="mx-6">
      <Form<CreatePopUpSchema>
        schema={createPopUpSchema}
        handleSubmit={(data) => onsubmit(data)}
        defaultValues={{
          ...popUpDetail,
          startDate: convertDateToISOFormat(popUpDetail.startDate),
          endDate: convertDateToISOFormat(popUpDetail.endDate),
        }}
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

        <div className="mt-10">
          <div>
            <MDEditor value={content} onChange={(e) => setContent(String(e))} />
          </div>
          <div className="my-4 border-1 border-solid border-gray-300 p-2">
            <MDEditor.Markdown source={content} />
          </div>
        </div>
        <Form.SubmitButton className="mt-10 w-full bg-secondary-100 py-2.5 text-xl font-bold">
          기본정보 작성 완료
        </Form.SubmitButton>
      </Form>
    </div>
  )
}
