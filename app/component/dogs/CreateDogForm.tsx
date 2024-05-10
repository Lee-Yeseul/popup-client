'use client'
import { CreateDogSchema, createDogSchema } from '@/app/schema/dogs'
import Form from '../common/form'

interface CreateDogFormProps {
  type: 'create' | 'edit'
  onSubmit: (data: CreateDogSchema) => void
  defaultValue?: CreateDogSchema
}
export default function CreateDogForm({
  onSubmit,
  type,
  defaultValue,
}: CreateDogFormProps) {
  const breedOptions = [
    { label: '소형견(7kg 이하)', value: '소형견' },
    { label: '대형견(7kg 초과)', value: '대형견' },
  ]

  return (
    <div className="mt-10 w-4/5">
      <Form<CreateDogSchema>
        defaultValues={defaultValue}
        schema={createDogSchema}
        handleSubmit={(data) => onSubmit(data)}
        className="flex w-full flex-col gap-2"
      >
        <Form.TextInput
          name="name"
          label="반려견 이름"
          className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
          placeholder="초코"
        />
        <Form.TextInput
          name="age"
          label="나이"
          className="h-12 w-full rounded-md border-gray-300 p-2 ps-5"
          placeholder="3"
          type="number"
        />
        <Form.Select
          name="breed"
          label="견종"
          className="h-12 w-full rounded-md border-1 border-solid border-gray-300 pe-5 ps-5"
          options={breedOptions}
        />
        <Form.SubmitButton className="mt-5 h-12 w-full rounded-md border-1 border-solid border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-500">
          {type === 'create' ? '등록하기' : '수정하기'}
        </Form.SubmitButton>
      </Form>
    </div>
  )
}
