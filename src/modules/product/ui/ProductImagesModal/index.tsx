import GalleryModal from '@shared/ui/GalleryModal'
import { IProductImage } from '@modules/product/model/IProductImage'
import { IGalleryPicture } from '@shared/interfaces/IGalleryPicture'

interface Props {
  open: boolean
  activeSlide: number
  image: string
  images: IProductImage[]

  close(): void
}

function ProductImagesModal({open, activeSlide, image, images, close}: Props) {
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

export { ProductImagesModal }