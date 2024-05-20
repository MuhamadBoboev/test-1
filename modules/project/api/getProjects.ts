import { IProject } from '@modules/project'
import { axiosInstance } from '@shared/api/axiosInstance'

export async function getProjects(): Promise<IProject[] | null> {
  try {
    const response = await axiosInstance.get(`/projects`)
    return response.data.data
  } catch (e) {
    console.log(e)
    return null
  }
}