'use client'

import BottomBox from '@/app/component/common/BottomBox'
import Form from '@/app/component/common/form'
import Tag from '@/app/component/common/Tag'
import { CreateDogSchema, createDogSchema } from '@/app/schema/dog-posts'
import { CreateHistorySchema, createHistorySchema } from '@/app/schema/village'
import ClockIcon from '@/public/assets/icons/clock.svg'
import LocationOn from '@/public/assets/icons/locationOn.svg'

export default function CreateHistoryPage() {
  const handleSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <>
      <div className="mx-4 py-4">
        <div className="flex flex-col gap-2 rounded-lg border-1 border-solid border-gray-300 p-4 shadow-sm">
          <div className="text-xl font-bold">어린이 대공원</div>
          <Tag
            value="반려견 놀이터"
            className="w-fit bg-green-500 text-base/6 text-green-50"
          />
          <div className="flex items-center gap-1">
            <LocationOn width="24" height="24" fill="#6b7280" />
            서울시 광진구 능동로 216(구의문 주차장 옆)
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon width="23" height="23" fill="#6b7280" />
            24시간 상시 개방
          </div>
        </div>
      </div>
      <Form<CreateHistorySchema>
        schema={createHistorySchema}
        handleSubmit={(data) => handleSubmit(data)}
        className="w-full"
      >
        <div className="flex flex-col gap-2 px-4">
          <Form.ImageInput />
          <Form.DatePicker className="w-1/3" name="date" />
          <Form.TextareaInput
            label=""
            name="description"
            placeholder=""
            className="w-full rounded-md border-gray-300 p-2 ps-5"
          />
        </div>
        <BottomBox>
          <div className="flex h-full w-full items-center">
            <button className="h-full w-1/6">취소</button>
            <Form.SubmitButton className="h-full w-full bg-yellow-100 text-xl font-bold">
              작성 완료
            </Form.SubmitButton>
          </div>
        </BottomBox>
      </Form>
    </>
  )
}
