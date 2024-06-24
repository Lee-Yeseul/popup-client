import { imageAPI } from '../../api/image'
import { popUpAPI } from '../../api/pop-up'
import { PopUp } from '../../type/pop-up'

import ImageCarousel from '../common/ImageCarousel'

export default async function Banner() {
  const getPopular3PopUpList = async () => {
    const { data } = await popUpAPI.getPopularPopUp(3)
    return data
  }

  const getImageSource = async (imagePathList: PopUp[]) => {
    try {
      const imageSourceList = []
      for (let i = 0; i < imagePathList.length; i++) {
        const s3ImageUrl = await imageAPI.getImagePresignedUrl(
          `pop-up/${imagePathList[i].imageList[0]}`,
        )
        imageSourceList.push({
          id: i,
          url: s3ImageUrl,
          link: `pop-up/${imagePathList[i].id}`,
        })
      }

      return imageSourceList
    } catch (error) {
      console.log(error)
    }
  }
  const popular3PopUpImageList = await getPopular3PopUpList()

  const imageSourceList2 = await getImageSource([...popular3PopUpImageList])

  return (
    <div className="w-full">
      <div className="bg-neutral-100">
        {imageSourceList2 && (
          <ImageCarousel
            height={320}
            imageList={imageSourceList2}
            objectFit="object-fill"
            autoPlay
          />
        )}
      </div>
    </div>
  )
}
