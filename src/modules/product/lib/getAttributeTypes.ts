import { IAttribute } from '@modules/product/model/IAttribute'
import { IProductAttribute } from '@modules/product/model/IProductAttribute'

export function getAttributeTypes(productAttributes: IProductAttribute[]): IAttribute[] {
  const attributes: IAttribute[] = []
  productAttributes.forEach(({attribute}) => {
    if (!!attributes.find(({id}) => attribute.id === id)) {
      return
    }
    attributes.push(attribute)
  })
  return attributes
}