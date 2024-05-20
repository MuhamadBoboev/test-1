import { SelectedAttributesType } from '@modules/product/ui/ProductInfo'
import { IProductAttribute } from '@modules/product/model/IProductAttribute'
import { getSelectedProductAttributes } from '@modules/product/lib/getSelectedProductAttributes'

type Props = {
  productQuantity: number
  selectedAttributes: SelectedAttributesType
  productAttributes: IProductAttribute[]
}

export function getMaxQuantity({productQuantity, selectedAttributes, productAttributes}: Props) {
  if (productAttributes.length === 0) {
    return productQuantity
  }
  const selected = getSelectedProductAttributes({selectedAttributes, productAttributes})
    .map(({quantity}) => quantity).concat(productQuantity)

  return Math.min(...selected)
}