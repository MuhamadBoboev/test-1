import GalleryModal from '@shared/ui/GalleryModal'
import { IGalleryPicture } from '@shared/interfaces/IGalleryPicture'
import { IServiceImage } from '@modules/service/model/IServiceImage'

interface Props {
  open: boolean
  activeSlide: number
  image: string
  images: IServiceImage[]

  close(): void
}

function ServiceImagesModal({open, activeSlide, image, images, close}: Props) {
  const pictures: IGalleryPicture[] = [{id: 0, image}].concat(
    images.map(({id, image}, index) => ({id: index + 1, image}))
  )
  return (
    <GalleryModal
      open={open}
      activeId={activeSlide}
      pictures={pictures}
      close={close}
    />
  )
}

export { ServiceImagesModal }