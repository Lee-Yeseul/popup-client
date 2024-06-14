import { MetadataRoute } from 'next'
import { PopUp } from './src/type/pop-up'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceURL = 'https://popup-now.site'
  const baseURL = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_HOST_NAME}${process.env.NODE_ENV === 'development' ? `:${process.env.NEXT_PUBLIC_SERVER_PORT}` : ''}/api`

  const response = await fetch(`${baseURL}/pop-up/list`)
  const popUpList = await response.json()

  const popUpURLs = popUpList.map((popUp: PopUp) => ({
    url: `${serviceURL}/pop-up/${popUp.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [
    {
      url: serviceURL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${serviceURL}/pop-up/map`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${serviceURL}/auth/sign-in`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${serviceURL}/auth/sign-up`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...popUpURLs,
  ]
}
