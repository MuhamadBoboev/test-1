import { IProject } from '@modules/project'
import { ProjectBanner } from '@modules/project/ui/ProjectBanner'
import { ProjectDescription } from '@modules/project/ui/ProjectDescription'
import { Wrapper } from '@shared/ui/Wrapper'
import { ProjectGallery } from '@modules/project/ui/ProjectGallery'
import { SimilarProjects } from '@modules/project/ui/SimilarProjects'

interface Props {
  project: IProject
  projects: IProject[] | null
}

function Project({project, projects}: Props) {
  const {
    title,
    image,
    short_description,
    description,
    images,
  } = project

  return (
    <>
      <ProjectBanner
        image={image}
        title={title}
        shortDescription={short_description}
      />
      <Wrapper>
        <ProjectDescription
          description={description}
          image={image}
        />
        <ProjectGallery images={images}/>
      </Wrapper>
      <SimilarProjects
        projects={projects?.filter(({id}) => project.id !== id)}
      />
    </>
  )
}

export { Project }