import { SelectedAttributesType } from '@modules/product/ui/ProductInfo'
import { IProductAttribute } from '@modules/product/model/IProductAttribute'
import { getSelectedProductAttributes } from '@modules/product/lib/getSelectedProductAttributes'

type Props = {
  base_price: number
  selectedAttributes: SelectedAttributesType
  productAttributes: IProductAttribute[]
}

export function getProductPrice({base_price, productAttributes, selectedAttributes}: Props) {
  if (productAttributes.length === 0) {
    return base_price
  }

  const selected = getSelectedProductAttributes({productAttributes, selectedAttributes})
    .reduce((a, b) => a + b.price, 0)
  return +(base_price + selected).toFixed(2)
}