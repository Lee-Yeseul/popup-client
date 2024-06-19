import { imageAPI } from '../../api/image'
import { popUpAPI } from '../../api/pop-up'

import ImageCarousel from '../common/ImageCarausel'

export default async function Banner() {
  const imageList = ['banner/banner_1.png']

  const getPopular3PopUpThumbnailImageList = async () => {
    const { data } = await popUpAPI.getPopularPopUp(3)

    return data.map(({ imageList }) => `pop-up/${imageList[0]}`)
  }

  const getImageSource = async (imagePathList: string[]) => {
    try {
      const imageSourceList = []
      for (let i = 0; i < imagePathList.length; i++) {
        const s3ImageUrl = await imageAPI.getImagePresignedUrl(
          `${imagePathList[i]}`,
        )
        imageSourceList.push({
          id: i,
          url: s3ImageUrl,
        })
      }
      return imageSourceList
    } catch (error) {
      console.log(error)
    }
  }

  const popular3PopUpThumbnailImageList =
    await getPopular3PopUpThumbnailImageList()

  const imageSourceList = await getImageSource([
    ...imageList,
    ...popular3PopUpThumbnailImageList,
  ])

  return (
    <div className="w-full">
      <div className=" bg-neutral-100">
        {imageSourceList && (
          <ImageCarousel
            height={280}
            imageList={imageSourceList}
            objectFit="object-fill"
            autoPlay
          />
        )}
      </div>
    </div>
  )
}
