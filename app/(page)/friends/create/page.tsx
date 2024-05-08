'use client'

import BottomBox from '@/app/component/common/BottomBox'
import Form from '@/app/component/common/form'
import { CreateDogSchema, createDogSchema } from '@/app/schema/friends'

export default function DogsFriendsCreatePage() {
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <>
      <Form<CreateDogSchema>
        schema={createDogSchema}
        handleSubmit={(data) => onSubmit(data)}
        className="flex w-full flex-col gap-1"
      >
        <div className="mb-16 flex w-full flex-col gap-3 px-10 py-5">
          <div className="my-2">
            <Form.ImageInput />
          </div>

          <Form.TextInput
            label="제목"
            name="title"
            placeholder=""
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
          />

          <div className="flex w-full items-center gap-2">
            <Form.TextInput
              label="반려견 이름"
              name="name"
              placeholder=""
              className="h-12 flex-1 rounded-md border-gray-300 p-2 ps-5"
            />
            <Form.TextInput
              label="반려견 종"
              name="species"
              placeholder=""
              className="h-12 flex-1 rounded-md border-gray-300 p-2 ps-5"
            />
          </div>

          {/* 주소 form으로 변경 */}

          <Form.TextInput
            label="주 활동 영역"
            name="territory"
            placeholder=""
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
          />

          <Form.TextareaInput
            label="반려견 소개 글"
            name="description"
            placeholder=""
            className="w-full rounded-md border-gray-300 p-2 ps-5"
          />

          <Form.TagListInput
            label="해시태그"
            name="tags"
            placeholder=""
            className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
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
