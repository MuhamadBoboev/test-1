import { SelectedAttributesType } from '@modules/product/ui/ProductInfo'
import { IProductAttribute } from '@modules/product/model/IProductAttribute'

type Props = {
  selectedAttributes: SelectedAttributesType
  productAttributes: IProductAttribute[]
}

export function getSelectedProductAttributes({selectedAttributes, productAttributes}: Props) {
  return Object.keys(selectedAttributes).map(attributeId => {
    return productAttributes.find(({id}) => id === selectedAttributes[attributeId])!
  })
}