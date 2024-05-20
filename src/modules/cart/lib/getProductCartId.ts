import { SelectedAttributesType } from '@modules/product'

type Props = {
  productId: number
  selectedAttributes: SelectedAttributesType
}

// получить id товара в корзине
export function getProductCartId({productId, selectedAttributes}: Props): string {
  const attributesIds = Object.values(selectedAttributes).sort().join('-')
  return attributesIds || productId.toString()
}