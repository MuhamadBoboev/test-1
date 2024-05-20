import { IProductAttribute } from '@modules/product/model/IProductAttribute'
import { IAttributeGroup } from '@modules/product/model/IAttributeGroup'
import { getAttributeTypes } from '@modules/product/lib/getAttributeTypes'

export function getSortedAttributesByGroup(productAttributes: IProductAttribute[]) {
  const attributes: IAttributeGroup[] = []
  const sortedAttributes = getAttributeTypes(productAttributes)
  sortedAttributes.forEach(attribute => {
    attributes.push({
      ...attribute,
      product_attributes: productAttributes
        .filter(productAttribute => productAttribute.attribute.id === attribute.id)
    })
  })
  return attributes
}