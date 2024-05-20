import PopUpChat from '@/app/src/component/pop-up/PopUpChat'
import MarkdownViewer from '@/app/src/component/common/MarkdownViewer'
import PopUpDetailMap from '@/app/src/component/pop-up/PopUpDetailMap'
import PopUpCard from '@/app/src/component/pop-up/PopUpCard'
import Divider from '@/app/src/component/common/Divider'
import { popUpAPI } from '@/app/src/api/pop-up'

export default async function PopupDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const getPopUpDetail = async () => {
    const { data } = await popUpAPI.getPopUpDetail(id)
    return data
  }

  const popUpDetail = await getPopUpDetail()

  const { chatRoomId, content } = await getPopUpDetail()

  return (
    <>
      <main className="mt-16">
        <PopUpCard popUpDetail={popUpDetail} />
        <Divider />
        <div className="mx-6 mt-2.5">
          <div className="mt-2.5 text-xl font-bold text-secondary-500">
            What's about?
          </div>
          <div className="my-2.5 text-wrap text-base">
            <MarkdownViewer content={content} />
          </div>
        </div>
        <Divider />
        <div className="mt-2.5">
          <PopUpChat roomId={chatRoomId} />
        </div>
        <Divider />
        <div className="mx-6 mt-2.5">
          <PopUpDetailMap />
        </div>
      </main>
    </>
  )
}
