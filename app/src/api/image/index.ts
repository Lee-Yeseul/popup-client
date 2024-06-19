import axios from 'axios'

type CreatePreSignedUrl = {
  path: string
  filename: string
}

type UploadImage = {
  url: string
  fields: any
  file: any
}

const awsURL = process.env.NEXT_PUBLIC_AWS_URL
const stage = process.env.NEXT_PUBLIC_AWS_STAGE

export const imageAPI = {
  createPreSignedUrl: async ({ path, filename }: CreatePreSignedUrl) => {
    return await axios.post(
      `${awsURL}/${stage}/image/create-image-presigned-url`,
      {
        fileKey: `${path}/${filename}`,
      },
    )
  },

  uploadImage: async ({ url, fields, file }: UploadImage) => {
    const formData = new FormData()

    formData.append('Content-Type', file.type)
    for (const x in fields) {
      formData.append(x, fields[x])
    }

    formData.append('file', file)

    await axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  getImagePresignedUrl: async (path: string): Promise<string> => {
    const { data } = await axios.post(
      `${awsURL}/${stage}/image/get-image-presigned-url`,
      {
        fileKey: path,
      },
    )
    return data.body
  },
}
