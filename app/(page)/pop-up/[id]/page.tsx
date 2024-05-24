import PopUpChat from '@/app/src/component/pop-up/PopUpChat'
import MarkdownViewer from '@/app/src/component/common/MarkdownViewer'
import PopUpCard from '@/app/src/component/pop-up/PopUpCard'
import Divider from '@/app/src/component/common/Divider'
import PopUpDetailMap from '@/app/src/component/pop-up/PopUpDetailMap'
import { popUpAPI } from '@/app/src/api/pop-up'
import { PopUpDetail } from '@/app/src/type/pop-up'

export default async function PopupDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const getPopUpDetail = async (popUpId: string) => {
    try {
      const { data } = await popUpAPI.getPopUpDetail(popUpId)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const popUpDetail = await getPopUpDetail(id)

  const { chatRoomId, content } = popUpDetail as PopUpDetail

  return (
    <>
      <main className="mt-16">
        {popUpDetail && <PopUpCard popUpDetail={popUpDetail} />}
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
          {popUpDetail && <PopUpDetailMap popUpDetail={popUpDetail} />}
        </div>
      </main>
    </>
  )
}
