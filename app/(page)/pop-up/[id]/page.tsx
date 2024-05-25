import PopUpChat from '@/app/src/component/pop-up/PopUpChat'
import MarkdownViewer from '@/app/src/component/common/MarkdownViewer'
import PopUpCard from '@/app/src/component/pop-up/PopUpCard'
import Divider from '@/app/src/component/common/Divider'
import PopUpDetailMap from '@/app/src/component/pop-up/PopUpDetailMap'
import { popUpAPI } from '@/app/src/api/pop-up'
import { PopUpDetail } from '@/app/src/type/pop-up'

interface PopupDetailPageProps {
  params: { id: string }
}

export async function generateMetadata({
  params: { id },
}: PopupDetailPageProps) {
  const { data } = await popUpAPI.getPopUpDetail(id)
  const { title } = data

  return {
    title,
    openGraph: {
      title,
      description: `${title}에 대한 상세 정보 페이지입니다.`,
      // images: [
      //   { url: 'https://i.imgur.com/dI5n9zc.png', width: 400, height: 300 },
      // ],
    },
  }
}

export default async function PopupDetailPage({
  params: { id },
}: PopupDetailPageProps) {
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
