import { IProductAttribute } from '@modules/product/model/IProductAttribute'

type Props = {
  base_price: number
  productAttributes: IProductAttribute[]
  selectedAttributes: {
    [key: number]: number
  }
}

export function getInitialProductPrice({base_price, productAttributes, selectedAttributes}: Props): number {
  if (productAttributes.length === 0) {
    return base_price
  }
  const selected = Object.keys(selectedAttributes).map(attributeId => {
    return productAttributes.find(({attribute, quantity}) => (attribute.id === +attributeId) && quantity > 0)!
  }).reduce((a, b) => a + b.price, 0)
  return +(base_price + selected).toFixed(2)
}