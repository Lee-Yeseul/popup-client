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
    return await fetch(`${awsURL}/${stage}/image/create-image-presigned-url`, {
      method: 'POST',
      body: JSON.stringify({
        fileKey: `${path}/${filename}`,
      }),
    })
  },

  uploadImage: async ({ url, fields, file }: UploadImage) => {
    const formData = new FormData()

    formData.append('Content-Type', file.type)
    for (const x in fields) {
      formData.append(x, fields[x])
    }

    formData.append('file', file)

    await fetch(url, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  getImagePresignedUrl: async (path: string): Promise<string> => {
    const response = await fetch(
      `${awsURL}/${stage}/image/get-image-presigned-url`,
      {
        method: 'POST',
        body: JSON.stringify({
          fileKey: path,
        }),
      },
    )
    const data = await response.json()
    return data.body
  },
}
