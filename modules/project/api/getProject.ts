import { IProject } from '@modules/project'
import { axiosInstance } from '@shared/api/axiosInstance'

export async function getProject(slug: string): Promise<IProject | null> {
  try {
    const response = await axiosInstance.get(`/projects/${slug}`)
    return response.data.data
  } catch (e) {
    console.log(e)
    return null
  }
}