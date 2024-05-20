import classes from './main-screen.module.scss'
import { CatalogMenu } from '@widgets/CatalogMenu/ui/CatalogMenu'
import { MainSlider } from '@widgets/MainSlider'
import { Wrapper } from '@shared/ui/Wrapper'
import { ICategory } from '@modules/catalog'
import { IBanner } from '@shared/interfaces/IBanner'

interface Props {
  categories: ICategory[] | null
  slides: IBanner[] | null
}

function MainScreen({slides, categories}: Props) {
  return (
    <Wrapper className={classes.screen}>
      <CatalogMenu categories={categories}/>
      <MainSlider slides={slides}/>
    </Wrapper>
  )
}

export { MainScreen }