import axios from 'axios'

type CreatePreSignedUrl = {
  path: string
  filename: string
}

type UploadImage = {
  url: string
  fields: any
  file: File
}

const awsURL = 'https://cydmzeqykh.execute-api.ap-northeast-2.amazonaws.com'
const stage = 'dev'

export const imageAPI = {
  createPreSignedUrl: ({ path, filename }: CreatePreSignedUrl) => {
    return axios.post(`${awsURL}/${stage}/image/create-image-presigned-url`, {
      fileKey: `${path}/${filename}`,
    })
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

  getImagePresignedUrl: (path: string) => {
    return axios.post(`${awsURL}/${stage}/image/get-image-presigned-url`, {
      fileKey: 'dog/test1.png',
    })
  },
}
