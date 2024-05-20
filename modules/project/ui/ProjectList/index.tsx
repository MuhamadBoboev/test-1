import classes from './project-list.module.scss'
import { IProject } from '@modules/project/model/IProject'
import { ProjectCard } from '@modules/project/ui/ProjectCard'

interface Props {
  projects: IProject[]
}

function ProjectList({projects}: Props) {

  if (!projects.length) {
    return (
      <p className={classes.emptyTitle}>Нет готовых проектов</p>
    )
  }

  return (
    <ul className={classes.list}>
      {projects.map(({id, title, image, slug}) => (
        <li key={id}>
          <ProjectCard
            title={title}
            image={image}
            slug={slug}
          />
        </li>
      ))}
    </ul>
  )
}

export { ProjectList }