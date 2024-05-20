import { getProject, getProjects, Project } from '@modules/project'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { removeTags } from '@shared/lib/removeTags'

export async function generateMetadata({params: {slug}}: { params: { slug: string } }): Promise<Metadata> {
  try {
    const project = await getProject(slug)
    const description = removeTags(project?.description || '')

    return {
      title: `${project?.title} | PRO Mebel`,
      description: description.slice(0, 255).concat('...')
    }
  } catch (e) {
    return {}
  }
}

async function Page({params: {slug}}: { params: { slug: string } }) {
  const project = await getProject(slug)
  const projects = await getProjects()

  if (!project) {
    notFound()
  }

  return (
    <Project
      project={project}
      projects={projects}
    />
  )
}

export default Page