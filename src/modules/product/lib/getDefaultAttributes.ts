import { IProductAttribute } from '@modules/product/model/IProductAttribute'
import { getSortedAttributesByGroup } from '@modules/product/lib/getSortedAttributesByGroup'
import { SelectedAttributesType } from '@modules/product/ui/ProductInfo'

export function getDefaultAttributes(productAttributes: IProductAttribute[]): SelectedAttributesType {
  const attributesGroup = getSortedAttributesByGroup(productAttributes)
  const selectedAttributes: SelectedAttributesType = {}
  attributesGroup.forEach(attribute => {
    const productAttribute = attribute.product_attributes.find(({quantity}) => quantity > 0)
    if (productAttribute) {
      selectedAttributes[attribute.id] = productAttribute.id
    }
  })

  return selectedAttributes
}