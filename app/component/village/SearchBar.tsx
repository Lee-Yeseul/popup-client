import { SearchKeywordSchema, searchKeywordSchema } from '@/app/schema/village'
import Form from '../common/Form'
import MyLocation from '@/public/assets/icons/myLocation.svg'
import Search from '@/public/assets/icons/search.svg'
import Tag from '../common/Tag'

export default function SearchBar() {
  const onSubmit = (data: SearchKeywordSchema) => {
    console.log('data', data)
  }
  const tempTagList = ['반려견 놀이터', '반려견 동반 식당', '미용', '수제 간식']
  return (
    <div className="absolute left-0 top-3 z-10 flex w-full flex-col items-center justify-center px-4">
      <div className="w-full rounded-full border-1 border-solid border-gray-300 bg-white">
        <Form<SearchKeywordSchema>
          schema={searchKeywordSchema}
          handleSubmit={(data) => onSubmit(data)}
        >
          <div className="relative flex h-12 w-full">
            <Form.CustomInput
              name="keyword"
              inputProps={{
                className: 'w-full px-14 rounded-full',
              }}
            >
              <div className="absolute left-3 top-0 flex h-full items-center">
                <MyLocation width="30" height="30" fill="#6b7280" />
              </div>
              <Form.SubmitButton className="absolute right-3 top-0 flex h-full items-center">
                <Search width="30" height="30" fill="#6b7280" />
              </Form.SubmitButton>
            </Form.CustomInput>
          </div>
        </Form>
      </div>
      <div className="my-2 flex w-full gap-2">
        {tempTagList.map((tag) => (
          <Tag
            key={tag}
            value={tag}
            className="bg-lime-500 text-base/7 text-green-50"
          />
        ))}
      </div>
    </div>
  )
}
