import { axiosInstance } from '@shared/api/axiosInstance'

export async function getFetcher(url: string) {
  try {
    const response = await axiosInstance.get(url, {
      headers: {
        // Authorization: getBearerToken()
      },
    })
    return response.data
  } catch (e) {
    throw e
  }
}
