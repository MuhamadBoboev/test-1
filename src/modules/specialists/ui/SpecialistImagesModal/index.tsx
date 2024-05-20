import { ISpecialistImage } from '@modules/specialists/model/ISpecialistImage'
import { IGalleryPicture } from '@shared/interfaces/IGalleryPicture'
import GalleryModal from '@shared/ui/GalleryModal'

interface Props {
  open: boolean
  activeSlide: number
  images: ISpecialistImage[]

  close(): void
}

function SpecialistImagesModal({images, open, activeSlide, close}: Props) {
  const pictures: IGalleryPicture[] = images.map(({id, image}, index) => ({id: index + 1, image}))

  return (
    <GalleryModal
      open={open}
      activeId={activeSlide}
      pictures={pictures}
      close={close}
    />
  )
}

export { SpecialistImagesModal }