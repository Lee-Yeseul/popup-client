import Avatar from '../common/Avatar'

export default function ReviewCard() {
  return (
    <div className="flex items-center px-4 py-4">
      <div>
        <Avatar src={'https://i.imgur.com/Tp9JfY2.jpeg'} alt={'profile'} />
      </div>
      <div className="px-4 text-base/6">
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold">슈 언니</div>
          <div className="font-normal text-gray-500">2024년 04월 12일</div>
        </div>
        <div className="text-base/5">
          슈랑 다녀옴 울 애기가 뛰어다니기 너무 좋았음 슈랑 다녀옴 울 애기가
          뛰어다니기 너무 좋았음
        </div>
      </div>
    </div>
  )
}
